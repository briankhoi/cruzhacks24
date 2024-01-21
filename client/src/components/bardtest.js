import React, { useState } from 'react';
import config from '../config';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Document, Page } from 'react-pdf';
import * as pdfjs from 'pdfjs-dist';

const apiKey = config.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export default function StudyGenerator() {
    const [activeTab, setActiveTab] = useState('text');
    const [userInput, setUserInput] = useState('');
    const [filePreview, setFilePreview] = useState(null);
    const [model, setModel] = useState('gemini-pro');
    const [isProcessingPDF, setIsProcessingPDF] = useState(false); // Add this line

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleToggleTab = (tab) => {
        setActiveTab(tab);
    };

    const prepareDataForMongoDB = (generatedData) => {
        // Prepare the data structure for MongoDB
        // Example: Save to MongoDB collection 'flashcards' or 'quizzes'
        // You can implement this logic when setting up MongoDB
        console.log("Data prepared for MongoDB:", generatedData);
    };

    const handleGenerate = async (prompt) => {
        try {
            let selectedModel = 'gemini-pro';

            if (activeTab === 'files' && isImageFileType()) {
                selectedModel = 'gemini-pro-vision';
            }
            const genModel = genAI.getGenerativeModel({ model: selectedModel });
            const result = await genModel.generateContent(userInput + prompt);
            const response = await result.response;
            const text = await response.text();
    
            console.log("API Key:", apiKey);
            console.log("Generated Content:", text);
    
            // Prepare data for MongoDB
            prepareDataForMongoDB({ type: 'generatedContent', data: text });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleFileSubmit = async (event) => {
        const fileInput = event.target;
        const files = fileInput.files;
    
        // Process the selected files
        try {
            // Set isProcessingPDF to true when starting PDF processing
            setIsProcessingPDF(true);
    
            await Promise.all(Array.from(files).map(async (file) => {
                let model = "gemini-pro"; // Default model
    
                if (isImageFileType(file)) {
                    model = "gemini-pro-vision"; // Use a different model for images
    
                    // Send raw image data directly to Bard (no encoding needed)
                    const part = {
                        inlineData: {
                            data: file, // Send the File object itself
                            mimeType: file.type,
                        },
                    };
                    setUserInput(part);
                } else {
                    // Process text files
                    const text = await parseFileAsText(file);
                    setUserInput(text);
    
                    // Update filePreview based on file type
                    setFilePreview(file.type === 'application/pdf' ? null : URL.createObjectURL(file));
    
                    // Set model to gemini-pro for text files
                    model = "gemini-pro";
                }
    
                setModel(model); // Set the model based on file type
            }));
    
            // Reset isProcessingPDF to false after processing files
            setIsProcessingPDF(false);
        } catch (error) {
            console.error("Error processing files:", error);
            // Reset isProcessingPDF to false in case of an error
            setIsProcessingPDF(false);
        }
    };
    

    // Inside parseFileAsText function
    const parseFileAsText = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = async () => {
                try {
                    if (file.type === 'application/pdf') {
                        // Set isProcessingPDF to true when starting PDF processing
                        setIsProcessingPDF(true);
                        const typedArray = new Uint8Array(reader.result);

                        // Set the worker source before loading the PDF fill
                        pdfjs.GlobalWorkerOptions.workerSrc = process.env.PUBLIC_URL + '/pdf.worker.mjs';


                        const pdfDocument = await pdfjs.getDocument({ data: typedArray }).promise;
                        const totalPages = pdfDocument.numPages;

                        // Iterate through each page and extract text
                        let pdfText = '';
                        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                            const page = await pdfDocument.getPage(pageNum);
                            const textContent = await page.getTextContent();
                            pdfText += textContent.items.map(item => item.str + ' ').join('\n');
                        }

                        console.log("PDF Text:", pdfText);
                        resolve(pdfText);
                    } else {
                        // For non-PDF files, simply return the text
                        const text = reader.result;
                        //console.log("File Contents:", text); // Log the file contents
                        resolve(text);
                    }
                } catch (error) {
                    reject(error);
                }finally {
                    // Reset isProcessingPDF to false after processing files
                    setIsProcessingPDF(false);
                }
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsArrayBuffer(file);
        });
    };   
    
    const isImageFileType = (file) => {
        // Check if file is defined and has a type
        if (file && file.type) {
            // Get the file type
            const fileType = file.type.toLowerCase();
            // Check if the file type starts with 'image/'
            return fileType.startsWith('image/');
        }
        // Return false if file is undefined or has no type
        return false;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <div style={{ fontSize: '1.5em', marginBottom: '20px' }}>Generate study materials.</div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <button
                    onClick={() => handleToggleTab('text')}
                    style={{ backgroundColor: activeTab === 'text' ? 'blue' : 'gray', color: 'white', marginRight: '10px' }}
                >
                    Enter Text
                </button>
                <button
                    onClick={() => handleToggleTab('files')}
                    style={{ backgroundColor: activeTab === 'files' ? 'blue' : 'gray', color: 'white' }}
                >
                    Upload Files
                </button>
            </div>
            {activeTab === 'text' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', marginBottom: '20px' }}>
                    <textarea
                        id="textInput"
                        onChange={handleInputChange}
                        placeholder="Enter text..."
                        value={userInput} // Bind value to the state
                        style={{ width: '100%', minHeight: '100px', resize: 'vertical', marginBottom: '20px' }}
                    />
                </div>
            )}
            {activeTab === 'files' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', marginBottom: '20px' }}>
                    <div
                        style={{ position: 'relative', width: '100%', minHeight: '100px', border: '2px dashed #aaa', borderRadius: '5px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        {filePreview && <img src={filePreview} alt="File Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }} />}
                        {!filePreview && (
                            <>
                                {isProcessingPDF && (
                                    <div style={{ position: 'absolute', textAlign: 'center', color: '#333', fontSize: '14px' }}>
                                        Processing PDF... Please wait.
                                    </div>
                                )}
                                <input
                                    id="fileInput"
                                    type="file"
                                    onChange={handleFileSubmit}
                                    style={{ display: 'none' }}
                                    multiple
                                />
                                <label htmlFor="fileInput">Click to Upload</label>
                            </>
                        )}
                    </div>
                </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <button onClick={() => handleGenerate("Generate me a list of flashcards from these notes, with the format (term, definition)")} style={{ backgroundColor: 'green', color: 'white', width: '45%', height: '40px' }}>Flashcards</button>
                <button onClick={() => handleGenerate("Create a multiple choice quiz based on these notes. Include questions and answer choices.")} style={{ backgroundColor: 'green', color: 'white', width: '45%', height: '40px', marginLeft: '10px' }}>Quiz</button>
            </div>
            {/* Omitted the display of studyMaterials */}
        </div>
    );            
};

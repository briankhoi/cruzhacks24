import { Modal } from "flowbite-react";
import React, { useState, useEffect } from "react";
import config from "../config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as pdfjs from "pdfjs-dist";
import "./generatemodal.scss";

const apiKey = config.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export default function GenerateModal({
    openGenerateModal,
    setOpenGenerateModal,
}) {
    const [activeTab, setActiveTab] = useState("text");
    const [userInput, setUserInput] = useState("");
    const [filePreview, setFilePreview] = useState(null);
    const [model, setModel] = useState("gemini-pro");
    const [isProcessingPDF, setIsProcessingPDF] = useState(false);
    const [user, setUser] = useState(null);
    // Add the following state variables and setter functions
    const [generationStatus, setGenerationStatus] = useState("ready");
    const [successCooldown, setSuccessCooldown] = useState(false);

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleToggleTab = (tab) => {
        setActiveTab(tab);
    };

    // determine if user is authenticated or not and set state accordingly
    useEffect(() => {
        fetch("http://localhost:5000/api/user", {
            credentials: "include", // include cookies
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.isAuthenticated) {
                    setUser(data.user);
                }
                console.log("bruh");
                console.log(user);
            })
            .catch((error) => {
                console.error("fetch operation error:", error);
            });
    }, []);

    const addFlashcard = (flashcard) => {
        // Update the user
        console.log("bruh2");
        console.log(user);
        fetch("http://localhost:5000/api/user/update/flashcard", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sub: user.sub,
                flashcard: flashcard,
            }),
        })
            .then((response) => response.json())
            .then((data) => setUser(data));
    };

    const addQuiz = (quiz) => {
        console.log("bruh3");
        console.log(user);
        // Update the user
        fetch("http://localhost:5000/api/user/update/quiz", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sub: user.sub,
                quiz: quiz,
            }),
        })
            .then((response) => response.json())
            .then((data) => setUser(data));
    };

    const prepareDataForMongoDB = (generatedData, generationType) => {
        const type = generationType === "flashcards" ? "flashcards" : "quiz";
        console.log(`Data prepared for MongoDB (${type}):`, generatedData);
        let parsedData = JSON.parse(generatedData.data);
        console.log("parsedData");
        console.log(parsedData);
        type === "flashcards" ? addFlashcard(parsedData) : addQuiz(parsedData);
    };

    const handleGenerate = async (prompt, generationType) => {
        try {
            setGenerationStatus("parsing");

            let selectedModel = "gemini-pro";

            if (activeTab === "files" && isImageFileType()) {
                selectedModel = "gemini-pro-vision";
            }
            const genModel = genAI.getGenerativeModel({ model: selectedModel });
            const result = await genModel.generateContent(userInput + prompt);
            const response = result.response;
            const text = response.text();

            // Clear userInput after generating content
            setUserInput("");

            // Prepare data for MongoDB based on the generation type
            prepareDataForMongoDB(
                { type: generationType, data: text },
                generationType
            );

            setGenerationStatus("success");
            setSuccessCooldown(true);

            setTimeout(() => {
                setSuccessCooldown(false);
                setGenerationStatus("ready");
            }, 30000); // 30 seconds cooldown
        } catch (error) {
            console.error("Error fetching data:", error);
            setGenerationStatus("ready");
        }
    };

    const handleFileSubmit = async (event) => {
        const fileInput = event.target;
        const files = fileInput.files;

        // Process the selected files
        try {
            // Set isProcessingPDF to true when starting PDF processing
            setIsProcessingPDF(true);

            await Promise.all(
                Array.from(files).map(async (file) => {
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

                        // Log the text from the image (if applicable)
                        console.log("Text from Image:", part);

                        setUserInput(part);
                    } else {
                        // Process text files
                        const text = await parseFileAsText(file);

                        // Log the text from the file
                        console.log("Text from File:", text);

                        setUserInput(text);

                        // Update filePreview based on file type
                        setFilePreview(
                            file.type === "application/pdf"
                                ? null
                                : URL.createObjectURL(file)
                        );

                        // Set model to gemini-pro for text files
                        model = "gemini-pro";
                    }

                    setModel(model); // Set the model based on file type
                })
            );

            // Reset isProcessingPDF to false after processing files
            setIsProcessingPDF(false);
        } catch (error) {
            console.error("Error processing files:", error);
            // Reset isProcessingPDF to false in case of an error
            setIsProcessingPDF(false);
        }
    };

    const parseFileAsText = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = async () => {
                try {
                    if (file.type === "application/pdf") {
                        setIsProcessingPDF(true);
                        const typedArray = new Uint8Array(reader.result);

                        pdfjs.GlobalWorkerOptions.workerSrc =
                            process.env.PUBLIC_URL + "/pdf.worker.mjs";

                        const pdfDocument = await pdfjs.getDocument({
                            data: typedArray,
                        }).promise;
                        const totalPages = pdfDocument.numPages;

                        let pdfText = "";
                        for (
                            let pageNum = 1;
                            pageNum <= totalPages;
                            pageNum++
                        ) {
                            const page = await pdfDocument.getPage(pageNum);
                            const textContent = await page.getTextContent();
                            pdfText += textContent.items
                                .map((item) => item.str + " ")
                                .join("\n");
                        }

                        //console.log("PDF Text:", pdfText);

                        resolve(pdfText);
                    } else {
                        const text = reader.result;
                        resolve(text);
                    }
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsArrayBuffer(file);
        }).finally(() => {
            setIsProcessingPDF(false);
        });
    };

    const isImageFileType = (file) => {
        // Check if file is defined and has a type
        if (file && file.type) {
            // Get the file type
            const fileType = file.type.toLowerCase();
            // Check if the file type starts with 'image/'
            return fileType.startsWith("image/");
        }
        // Return false if file is undefined or has no type
        return false;
    };

    return (
            <Modal
                // class="bg123"
                show={openGenerateModal}
                size="md"
                onClose={() => setOpenGenerateModal(false)}
            >
                <div
                    class="bg123"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "50px",
                        backgroundColor: "#ecd9ba",
                    }}
                >
                    <div class="title font-bold text-gray-800 text-2xl mb-4" style={{ fontSize: "1.5em", marginBottom: "20px" }}>
                        Generate Study Materials
                    </div>
                    <div style={{ display: "flex", marginBottom: "20px" }}>
                        <button
                            onClick={() => handleToggleTab("text")}
                            style={{
                                backgroundColor:
                                    activeTab === "text" ? "#71906e" : "gray",
                                color: "white",
                                marginRight: "10px",
                                borderRadius: "32px",
                                height: "40px",
                                width: "80px",
                            }}
                        >
                            Enter Text
                        </button>
                        <button
                            onClick={() => handleToggleTab("files")}
                            style={{
                                backgroundColor:
                                    activeTab === "files" ? "blue" : "gray",
                                color: "white",
                                borderRadius: "32px",
                                height: "40px",
                                width: "80px",
                            }}
                        >
                            Upload
                        </button>
                    </div>
                    {activeTab === "text" && (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "80%",
                                marginBottom: "20px",
                            }}
                        >
                            <textarea
                                id="textInput"
                                onChange={handleInputChange}
                                placeholder="Enter text..."
                                value={userInput} // Bind value to the state
                                style={{
                                    width: "100%",
                                    minHeight: "100px",
                                    resize: "vertical",
                                    marginBottom: "20px",
                                }}
                            />
                        </div>
                    )}
                    {activeTab === "files" && (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "80%",
                                marginBottom: "20px",
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    minHeight: "100px",
                                    border: "2px dashed #aaa",
                                    borderRadius: "5px",
                                    marginBottom: "20px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                }}
                                onClick={() =>
                                    document.getElementById("fileInput").click()
                                }
                            >
                                {filePreview && (
                                    <img
                                        src={filePreview}
                                        alt="File Preview"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            borderRadius: "5px",
                                        }}
                                    />
                                )}
                                {!filePreview && (
                                    <>
                                        {isProcessingPDF && (
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    textAlign: "center",
                                                    color: "#333",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Processing PDF... Please wait.
                                            </div>
                                        )}
                                        <input
                                            id="fileInput"
                                            type="file"
                                            onChange={handleFileSubmit}
                                            style={{ display: "none" }}
                                            multiple
                                        />
                                        <label htmlFor="fileInput">
                                            Click to Upload
                                        </label>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <button
                            onClick={() =>
                                handleGenerate(
                                    `Generate a list of flashcards from these notes, strictly formatted for a database as follows:

                - Maintain the exact format: "[["title", "n/a"], ["term1", "definition1"], ["term2", "definition2"], ...]"
                - The first list should contain the title of the flashcards (inferred from the notes).
                - Subsequent lists should contain term-definition pairings, only one pair per list.
                - Ensure clarity and accuracy in terms and definitions.`,
                                    "flashcards"
                                )
                            }
                            style={{
                                backgroundColor: "71906e",
                                color: "white",
                                width: "48%",
                                height: "40px",
                                marginRight: "10px",
                                borderRadius: "32px",
                                height: "40px",
                                width: "80px",
                            }}
                        >
                            Flashcards
                        </button>
                        <button
                            onClick={() =>
                                handleGenerate(
                                    `Generate a multiple-choice quiz from these notes, strictly formatted for a database as follows:

                - The first list should contain the title of the quiz (inferred from the notes).
                - Subsequent lists should represent each question:
                    - Question text at the beginning.
                    - Answer choices (labeled a, b, c, etc.) in the middle.
                    - Correct answer at the end.
                - Maintain the exact format that can work with JSON.parse: "[["title", "na", "na", "na", "na"], ["q1", "a", "b", "c", "d", "ans"], ["q2", "a", "b", "c", "d", "ans"], ...]"
                - Ensure clarity and variety in questions.
                - Randomize the order of answer choices for each question.
                - Include a blend of question types (e.g., factual, conceptual, application-based).`,
                                    "quiz"
                                )
                            }
                            style={{
                                backgroundColor: "#7db6a3",
                                color: "white",
                                width: "48%",
                                height: "40px",
                                borderRadius: "32px",
                                height: "40px",
                                width: "80px",
                            }}
                        >
                            Quiz
                        </button>
                    </div>
                    {/* Omitted the display of studyMaterials */}
                </div>
                <div onClick={() => setOpenGenerateModal(false)}>
                    click to close
                </div>
            </Modal>
    );
}

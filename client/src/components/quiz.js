// import React, { useState, useRef, useEffect } from 'react';
// const Quiz = () => {
//     const quizData = [
//         // Python Strings and Regular Expressions Quiz
//         [
//           "Python Strings and Regular Expressions",
//           ["What is a string?", "a: container data type", "b: primitive data type", "c: collection of data", "d: concatenation of characters", "ans: c"],
//           ["Which of the following is an example of a string method?", "a: string.join()", "b: print(string)", "c: string.replace()", "d: string.upper()", "ans: a"],
//           ["What is the syntax for a string method?", "a: string.methodname()", "b: function(string)", "c: string(methodname)", "d: string.function()", "ans: a"],
//           ["What is the syntax for a regular expression function?", "a: string.methodname()", "b: function(string)", "c: string(methodname)", "d: string.function()", "ans: b"],
//           ["Which of the following is a regular expression pattern?", "a: \\b", "b: \\d", "c: \\w", "d: \\s", "ans: a"],
//           ["What do regular expressions do?", "a: search strings for string patterns", "b: perform mathematical operations on strings", "c: modify the content of strings", "d: convert strings to other data types", "ans: a"],
//           ["True or False: Regular expressions can be used to find specific words within a string.", "ans: True"],
//           ["True or False: String methods can be applied to any type of data.", "ans: False"],
//           ["Give an example of a string method.", "ans: string.join(), string.replace(), string.upper()"],
//           ["Give an example of a regular expression pattern.", "ans: \\b, \\d, \\w, \\s"]
//         ],
//         // Programming Languages and Tools Quiz
//         [
//           "Programming Languages and Tools Quiz",
//           ["1. What is a programming language?", "a) A program that helps find and fix errors in the source code", "b) A method to exchange information between humans and computers", "c) A program that runs a shell terminal and converts the source code into a machine language", "d) A program that transforms the source code into a machine language", "Correct Answer: b) A method to exchange information between humans and computers"],
//           ["2. What is the purpose of an interpreter in programming?", "a) To transform the source code into a machine language", "b) To find and fix errors in the source code", "c) To run a shell terminal and convert the source code into a machine language", "d) To run a machine language program", "Correct Answer: c) To run a shell terminal and convert the source code into a machine language"],
//           ["3. Which of the following is an example of a high-level programming language?", "a) Python", "b) Machine code", "c) Assembly language", "d) C++", "Correct Answer: a) Python"],
//           ["4. What is the difference between a compiler and an interpreter?", "a) A compiler translates the source code into a machine language all at once, while an interpreter translates it one statement at a time.", "b) A compiler translates the source code into a machine language, while an interpreter translates it into an assembly language.", "c) A compiler runs the source code, while an interpreter interprets it.", "d) A compiler is a program, while an interpreter is a language.", "Correct Answer: a) A compiler translates the source code into a machine language all at once, while an interpreter translates it one statement at a time."],
//           ["5. What is a debugger in programming?", "a) A program that helps find and fix errors in the source code", "b) A program that runs a shell terminal and converts the source code into a machine language", "c) A program that transforms the source code written in a high-level language into a machine language", "d) A program that runs a machine language program", "Correct Answer: a) A program that helps find and fix errors in the source code"]
//         ]
//       ];
      

//   const [isQuizPopupOpen, setIsQuizPopupOpen] = useState(false);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const [highestScore, setHighestScore] = useState(0);

//   const quizPopupRef = useRef(null);

// const Quiz = () => {
//     const quizData = [
//         // Python Strings and Regular Expressions Quiz
//         [
//           "Python Strings and Regular Expressions",
//           ["What is a string?", "a: container data type", "b: primitive data type", "c: collection of data", "d: concatenation of characters", "ans: c"],
//           ["Which of the following is an example of a string method?", "a: string.join()", "b: print(string)", "c: string.replace()", "d: string.upper()", "ans: a"],
//           ["What is the syntax for a string method?", "a: string.methodname()", "b: function(string)", "c: string(methodname)", "d: string.function()", "ans: a"],
//           ["What is the syntax for a regular expression function?", "a: string.methodname()", "b: function(string)", "c: string(methodname)", "d: string.function()", "ans: b"],
//           ["Which of the following is a regular expression pattern?", "a: \\b", "b: \\d", "c: \\w", "d: \\s", "ans: a"],
//           ["What do regular expressions do?", "a: search strings for string patterns", "b: perform mathematical operations on strings", "c: modify the content of strings", "d: convert strings to other data types", "ans: a"],
//           ["True or False: Regular expressions can be used to find specific words within a string.", "ans: True"],
//           ["True or False: String methods can be applied to any type of data.", "ans: False"],
//           ["Give an example of a string method.", "ans: string.join(), string.replace(), string.upper()"],
//           ["Give an example of a regular expression pattern.", "ans: \\b, \\d, \\w, \\s"]
//         ],
//         // Programming Languages and Tools Quiz
//         [
//           "Programming Languages and Tools Quiz",
//           ["1. What is a programming language?", "a) A program that helps find and fix errors in the source code", "b) A method to exchange information between humans and computers", "c) A program that runs a shell terminal and converts the source code into a machine language", "d) A program that transforms the source code into a machine language", "Correct Answer: b) A method to exchange information between humans and computers"],
//           ["2. What is the purpose of an interpreter in programming?", "a) To transform the source code into a machine language", "b) To find and fix errors in the source code", "c) To run a shell terminal and convert the source code into a machine language", "d) To run a machine language program", "Correct Answer: c) To run a shell terminal and convert the source code into a machine language"],
//           ["3. Which of the following is an example of a high-level programming language?", "a) Python", "b) Machine code", "c) Assembly language", "d) C++", "Correct Answer: a) Python"],
//           ["4. What is the difference between a compiler and an interpreter?", "a) A compiler translates the source code into a machine language all at once, while an interpreter translates it one statement at a time.", "b) A compiler translates the source code into a machine language, while an interpreter translates it into an assembly language.", "c) A compiler runs the source code, while an interpreter interprets it.", "d) A compiler is a program, while an interpreter is a language.", "Correct Answer: a) A compiler translates the source code into a machine language all at once, while an interpreter translates it one statement at a time."],
//           ["5. What is a debugger in programming?", "a) A program that helps find and fix errors in the source code", "b) A program that runs a shell terminal and converts the source code into a machine language", "c) A program that transforms the source code written in a high-level language into a machine language", "d) A program that runs a machine language program", "Correct Answer: a) A program that helps find and fix errors in the source code"]
//         ]
//       ];
      

//   const [isQuizPopupOpen, setIsQuizPopupOpen] = useState(false);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const [highestScore, setHighestScore] = useState(0);

//   const quizPopupRef = useRef(null);


//   const handleCloseQuizPopup = () => {
//     setSelectedQuiz(null);
//     setIsQuizPopupOpen(false);
//   };

//   // Add functionality to handle quiz submission, calculate score, etc.

//   useEffect(() => {
//     // Fetch and set the highest score for the selected quiz
//     // You can replace this with actual logic to fetch scores from an API or storage
//     const fetchHighestScore = async () => {
//       // Dummy logic: Assume the highest score is stored in localStorage
//       const storedHighestScore = localStorage.getItem(`quiz_${selectedQuiz}_highest_score`);
//       setHighestScore(storedHighestScore ? parseInt(storedHighestScore, 10) : 0);
//     };

//     if (selectedQuiz !== null) {
//       fetchHighestScore();
//     }
//   }, [selectedQuiz]);

//   return (
//     <div>
//       {/* Button to open main quiz popup */}
//       <div
//         style={{
//           position: 'fixed',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '150px',
//           height: '50px',
//           backgroundColor: 'white',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           cursor: 'pointer',
//           color: 'black',
//           fontSize: '1.2em',
//           border: '2px solid black',
//         }}
//         onClick={() => handleQuizSelect(0)}  {/* Change 0 to the index of the quiz you want to show */}
//       >
//         Quiz
//       </div>

//       {/* Popup with multiple-choice quiz */}
//       {isQuizPopupOpen && selectedQuiz !== null && (
//         <div ref={quizPopupRef} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', backgroundColor: 'rgba(255, 255, 255, 0.95)', zIndex: '1000', overflow: 'auto', borderRadius: '10px', padding: '20px' }}>
//           {/* Quiz title and highest score */}
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//             <div>{quizData[selectedQuiz][0]}</div>
//             <div>Highest Score: {highestScore}/100</div>
//           </div>
//           {/* Quiz questions and options */}
//           {quizData[selectedQuiz].slice(1).map((question, questionIndex) => (
//             <div key={questionIndex} style={{ marginBottom: '20px' }}>
//               <div>{question[0]}</div>
//               {/* Add radio buttons or checkboxes for options, handle selection, etc. */}
//               {/* Example using radio buttons */}
//               {question.slice(1, -1).map((option, optionIndex) => (
//                 <div key={optionIndex}>
//                   <input type="radio" id={`q${questionIndex}_opt${optionIndex}`} name={`q${questionIndex}`} />
//                   <label htmlFor={`q${questionIndex}_opt${optionIndex}`}>{option}</label>
//                 </div>
//               ))}
//             </div>
//           ))}
//           {/* Submit button (add functionality to handle quiz submission) */}
//           <div style={{ display: 'flex', justifyContent: 'center' }}>
//             <button onClick={() => {/* Add logic to handle quiz submission */}}>Submit</button>
//           </div>
//           {/* Close button */}
//           <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', color: 'black' }} onClick={handleCloseQuizPopup}>X</div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quiz;

//   const handleCloseQuizPopup = () => {
//     setSelectedQuiz(null);
//     setIsQuizPopupOpen(false);
//   };

//   // Add functionality to handle quiz submission, calculate score, etc.

//   useEffect(() => {
//     // Fetch and set the highest score for the selected quiz
//     // You can replace this with actual logic to fetch scores from an API or storage
//     const fetchHighestScore = async () => {
//       // Dummy logic: Assume the highest score is stored in localStorage
//       const storedHighestScore = localStorage.getItem(`quiz_${selectedQuiz}_highest_score`);
//       setHighestScore(storedHighestScore ? parseInt(storedHighestScore, 10) : 0);
//     };

//     if (selectedQuiz !== null) {
//       fetchHighestScore();
//     }
//   }, [selectedQuiz]);

//   return (
//     <div>
//       {/* Button to open main quiz popup */}
//       <div
//         style={{
//           position: 'fixed',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '150px',
//           height: '50px',
//           backgroundColor: 'white',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           cursor: 'pointer',
//           color: 'black',
//           fontSize: '1.2em',
//           border: '2px solid black',
//         }}
//         onClick={() => handleQuizSelect(0)}  {/* Change 0 to the index of the quiz you want to show */}
//       >
//         Quiz
//       </div>

//       {/* Popup with multiple-choice quiz */}
//       {isQuizPopupOpen && selectedQuiz !== null && (
//         <div ref={quizPopupRef} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', backgroundColor: 'rgba(255, 255, 255, 0.95)', zIndex: '1000', overflow: 'auto', borderRadius: '10px', padding: '20px' }}>
//           {/* Quiz title and highest score */}
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//             <div>{quizData[selectedQuiz][0]}</div>
//             <div>Highest Score: {highestScore}/100</div>
//           </div>
//           {/* Quiz questions and options */}
//           {quizData[selectedQuiz].slice(1).map((question, questionIndex) => (
//             <div key={questionIndex} style={{ marginBottom: '20px' }}>
//               <div>{question[0]}</div>
//               {/* Add radio buttons or checkboxes for options, handle selection, etc. */}
//               {/* Example using radio buttons */}
//               {question.slice(1, -1).map((option, optionIndex) => (
//                 <div key={optionIndex}>
//                   <input type="radio" id={`q${questionIndex}_opt${optionIndex}`} name={`q${questionIndex}`} />
//                   <label htmlFor={`q${questionIndex}_opt${optionIndex}`}>{option}</label>
//                 </div>
//               ))}
//             </div>
//           ))}
//           {/* Submit button (add functionality to handle quiz submission) */}
//           <div style={{ display: 'flex', justifyContent: 'center' }}>
//             <button onClick={() => {/* Add logic to handle quiz submission */}}>Submit</button>
//           </div>
//           {/* Close button */}
//           <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', color: 'black' }} onClick={handleCloseQuizPopup}>X</div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quiz;
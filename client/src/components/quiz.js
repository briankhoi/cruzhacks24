// import React, { useState, useRef, useEffect } from 'react';

<<<<<<< Updated upstream
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
=======
const QuizSelectionMenu = ({ quizzes, onSelectQuiz }) => {
  return (
    <div style={{ display: 'flex', marginBottom: '20px', overflowX: 'auto' }}>
      {quizzes.map((quiz, index) => (
        <div
          key={index}
          style={{
            minWidth: '200px',
            padding: '10px',
            marginRight: '10px',
            backgroundColor: 'white',
            cursor: 'pointer',
            border: '1px solid black',
            borderRadius: '5px',
          }}
          onClick={() => onSelectQuiz(index)}
        >
          {quiz[0]}
        </div>
      ))}
    </div>
  );
};

const QuizQuestion = ({ question, userAnswer, onAnswerSelect, showAnswers }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div>{question[0]}</div>
      {/* Add radio buttons or checkboxes for options, handle selection, etc. */}
      {/* Example using radio buttons */}
      {question.slice(1, -1).map((option, optionIndex) => (
        <div key={optionIndex}>
          <input
            type="radio"
            id={`q_${optionIndex}`}
            name={`q${userAnswer}`}
            checked={userAnswer === optionIndex}
            onChange={() => onAnswerSelect(optionIndex)}
            disabled={showAnswers}
          />
          <label htmlFor={`q_${optionIndex}`} style={{ marginLeft: '5px', display: 'inline-block', cursor: 'pointer' }}>{option}</label>
        </div>
      ))}
    </div>
  );
};


const Quiz = () => {
  const quizData = [
    // Python Strings and Regular Expressions Quiz
    [
      "Python Strings and Regular Expressions",
      ["What is a string?", "a: container data type", "b: primitive data type", "c: collection of data", "d: concatenation of characters", "ans: c"],
      ["Which of the following is an example of a string method?", "a: string.join()", "b: print(string)", "c: string.replace()", "d: string.upper()", "ans: a"],
      ["What is the syntax for a string method?", "a: string.methodname()", "b: function(string)", "c: string(methodname)", "d: string.function()", "ans: a"],
      ["What is the syntax for a regular expression function?", "a: string.methodname()", "b: function(string)", "c: string(methodname)", "d: string.function()", "ans: b"],
      ["Which of the following is a regular expression pattern?", "a: \\b", "b: \\d", "c: \\w", "d: \\s", "ans: a"],
      ["What do regular expressions do?", "a: search strings for string patterns", "b: perform mathematical operations on strings", "c: modify the content of strings", "d: convert strings to other data types", "ans: a"],
      ["True or False: Regular expressions can be used to find specific words within a string.", "ans: True"],
      ["True or False: String methods can be applied to any type of data.", "ans: False"],
      ["Give an example of a string method.", "ans: string.join(), string.replace(), string.upper()"],
      ["Give an example of a regular expression pattern.", "ans: \\b, \\d, \\w, \\s"]
    ],
    // Programming Languages and Tools Quiz
    [
      "Programming Languages and Tools Quiz",
      ["1. What is a programming language?", "a) A program that helps find and fix errors in the source code", "b) A method to exchange information between humans and computers", "c) A program that runs a shell terminal and converts the source code into a machine language", "d) A program that transforms the source code into a machine language", "Correct Answer: b) A method to exchange information between humans and computers"],
      ["2. What is the purpose of an interpreter in programming?", "a) To transform the source code into a machine language", "b) To find and fix errors in the source code", "c) To run a shell terminal and convert the source code into a machine language", "d) To run a machine language program", "Correct Answer: c) To run a shell terminal and convert the source code into a machine language"],
      ["3. Which of the following is an example of a high-level programming language?", "a) Python", "b) Machine code", "c) Assembly language", "d) C++", "Correct Answer: a) Python"],
      ["4. What is the difference between a compiler and an interpreter?", "a) A compiler translates the source code into a machine language all at once, while an interpreter translates it one statement at a time.", "b) A compiler translates the source code into a machine language, while an interpreter translates it into an assembly language.", "c) A compiler runs the source code, while an interpreter interprets it.", "d) A compiler is a program, while an interpreter is a language.", "Correct Answer: a) A compiler translates the source code into a machine language all at once, while an interpreter translates it one statement at a time."],
      ["5. What is a debugger in programming?", "a) A program that helps find and fix errors in the source code", "b) A program that runs a shell terminal and converts the source code into a machine language", "c) A program that transforms the source code written in a high-level language into a machine language", "d) A program that runs a machine language program", "Correct Answer: a) A program that helps find and fix errors in the source code"]
    ]
  ];

  const [isQuizPopupOpen, setIsQuizPopupOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [latestGrade, setLatestGrade] = useState(null);
>>>>>>> Stashed changes

//   const quizPopupRef = useRef(null);

<<<<<<< Updated upstream
//   const handleQuizSelect = (index) => {
//     setSelectedQuiz(index);
//     setIsQuizPopupOpen(true);
//   };

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
=======
  const handleQuizSelect = (index) => {
    setSelectedQuiz(index);
    setIsQuizPopupOpen(true);
    setSelectedQuestion(0);
    setUserAnswers(Array(quizData[index].length - 1).fill(null));
    setShowAnswers(false);
    setLatestGrade(null);
  };

  const handleCloseQuizPopup = () => {
    setSelectedQuiz(null);
    setIsQuizPopupOpen(false);
    setSelectedQuestion(0);
    setUserAnswers([]);
    setShowAnswers(false);
    setLatestGrade(null);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (!showAnswers) {
      const newAnswers = [...userAnswers];
      newAnswers[selectedQuestion] = answerIndex;
      setUserAnswers(newAnswers);
    }
  };

  const handleGradeQuiz = () => {
    const correctAnswers = quizData[selectedQuiz].slice(1).map((question) => parseInt(question[question.length - 1].split(' ')[1], 10));
    const score = userAnswers.reduce((total, answer, index) => {
      return total + (answer === correctAnswers[index] ? 1 : 0);
    }, 0);

    const grade = Math.round((score / correctAnswers.length) * 100);
    setLatestGrade(grade);
    setShowAnswers(true);

    // Save the grade to storage or API
    // For now, let's just log it
    console.log(`Quiz ${selectedQuiz + 1} Grade: ${grade}`);
  };

  const handleClickOutside = (event) => {
    if (quizPopupRef.current && !quizPopupRef.current.contains(event.target)) {
      handleCloseQuizPopup();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Button to open main quiz popup */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '150px',
          height: '50px',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          color: 'black',
          fontSize: '1.2em',
          border: '2px solid black',
        }}
        onClick={() => setIsQuizPopupOpen(true)}
      >
        Quiz
      </div>

      {/* Popup with quiz selection menu */}
      {isQuizPopupOpen && selectedQuiz === null && (
        <div ref={quizPopupRef} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', backgroundColor: 'rgba(255, 255, 255, 0.95)', zIndex: '1000', overflow: 'auto', borderRadius: '10px', padding: '20px' }}>
          {/* Quiz selection menu */}
          <QuizSelectionMenu quizzes={quizData} onSelectQuiz={handleQuizSelect} />

          {/* Close button */}
          <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', color: 'black' }} onClick={handleCloseQuizPopup}>X</div>
        </div>
      )}

      {/* Popup with multiple-choice quiz */}
      {isQuizPopupOpen && selectedQuiz !== null && (
        <div ref={quizPopupRef} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50%', height: '80%', backgroundColor: 'rgba(255, 255, 255, 0.95)', zIndex: '1000', overflow: 'auto', borderRadius: '10px', padding: '20px' }}>
          {/* Quiz title and highest score */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>{quizData[selectedQuiz][0]}</div>
            <div>Highest Score: {latestGrade !== null ? latestGrade : 'N/A'}/100</div>
          </div>
          
          {/* Quiz questions and options */}
          {quizData[selectedQuiz].slice(1).map((question, questionIndex) => (
            <QuizQuestion
              key={questionIndex}
              question={question}
              userAnswer={userAnswers[questionIndex]}
              onAnswerSelect={(answerIndex) => handleAnswerSelect(answerIndex)}
              showAnswers={showAnswers}
            />
          ))}
          {/* Submit button (add functionality to handle quiz submission) */}
          <div style={{ position: 'fixed', bottom: '10px', right: '10px', cursor: 'pointer' }}>
            <button style={{ outline: '1px solid black' }} onClick={handleGradeQuiz}>Submit</button>
          </div>
          {/* Close button */}
          <div style={{ position: 'fixed', top: '10px', right: '10px', cursor: 'pointer', color: 'black' }} onClick={handleCloseQuizPopup}>X</div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
>>>>>>> Stashed changes

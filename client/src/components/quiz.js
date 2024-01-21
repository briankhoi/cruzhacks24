import React, { useState, useRef, useEffect } from 'react';

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

  const quizPopupRef = useRef(null);

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
      {/* Quiz selection menu */}
      <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#eadbb9' }}>
        {quizData.map((quiz, index) => (
          <div
            key={index}
            style={{
              width: 'calc(33.333% - 20px)',
              height: '100px',
              backgroundColor: '#71906e',
              borderRadius: '10px',
              margin: '10px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '1.2em',
              paddingLeft: '10px',
              marginLeft: '10px',
            }}
            onClick={() => handleQuizSelect(index)}
          >
            {quiz[0]}
          </div>
        ))}
      </div>

      {/* Additional content for popup and quiz questions (unchanged) */}
      {/* ... (unchanged) */}
    </div>
  );
};

export default Quiz;


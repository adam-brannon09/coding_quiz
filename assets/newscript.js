const quizData = [
    {
      question: "What is used to layout a website?",
      choices: ["HTML", "Javascript", "CSS"],
      answer: "HTML"
    },
    {
      question: "What is used to style a website?",
      choices: ["HTML", "Javascript", "CSS"],
      answer: "CSS"
    },
    {
      question: "What is used to add functionality to a website?",
      choices: ["HTML", "Javascript", "CSS"],
      answer: "Javascript"
    }
];
  
let currentQuestion = 0;
  let score = 0;
  let timeLeft = 60;
let timerId;
  
const questionElem = document.getElementById("question");
  const choicesElem = document.getElementById("choices");
  const submitButton = document.getElementById("submit");
  const timeElem = document.getElementById("time");
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
  


  //The startTimer function creates a timer starting at 60 seconds. It ends the game when time gets to 0.
  function startTimer() {
      timerId = setInterval(() => {
      timeLeft--;
      timeElem.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerId);
        endQuiz();
      }
    }, 1000);
  }
  
  
  function loadQuestion() {
    questionElem.textContent = quizData[currentQuestion].question;
    choicesElem.innerHTML = "";
    for (let i = 0; i < quizData[currentQuestion].choices.length; i++) {
      const choice = quizData[currentQuestion].choices[i];
      const choiceElem = document.createElement("button");
      choiceElem.textContent = choice;
      // answer button listeners
      choiceElem.addEventListener("click", () => {
        // when a button is clicked check to see if it's correct
        if (choice === quizData[currentQuestion].answer) {
          score++;
          //takes time off of the timer for incorrect answers.
        } else {
          timeLeft = timeLeft - 15;
        }
        // increment by one to the next question
        currentQuestion++;
        
        // evaluate whether or not we're out of questions
        if (currentQuestion < quizData.length) {
          loadQuestion();
        } else {
          endQuiz();
        }
      });
      choicesElem.appendChild(choiceElem);
    }
  }
  
  function endQuiz() {
    clearInterval(timerId);
    questionElem.textContent = `You scored ${score}/${quizData.length}`;
    choicesElem.innerHTML = "";
    
    
  }
  
  submitButton.addEventListener("click", () => {
    if (currentQuestion === 0) {
      submitButton.style.display = "none";
      
      startTimer();
      loadQuestion();
    }
    const selectedChoice = document.querySelector('input[type="radio"]:checked');
    if (selectedChoice) {
      const selectedAnswer = selectedChoice.value;
      if (selectedAnswer === quizData[currentQuestion].answer) {
        score++;
      }
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
        afterQuiz();
      } else {
        endQuiz();
      }
    }
  });
  


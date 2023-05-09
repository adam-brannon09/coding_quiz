//The startTimer function creates a timer starting at 60 seconds. It ends the game when time gets to 0.
//Timer Variables
let timeLeft = 60;
let timerId;
let timeEl = document.getElementById("time");
//Timer Function
function startTimer() {
  timerId = setInterval(() => {
  timeLeft--;
  timeEl.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timerId);
    endQuiz();
  }
}, 1000);
}
//Quiz Elements
  let questionEl = document.getElementById("question"); //Where questions will populate
  let choicesEl = document.getElementById("choices"); //Where choices will populate
  let userScore = document.getElementById("user-score"); //Where the user score will populate
  let startButton = document.getElementById("start-btn"); //Start button
  let saveScore = document.getElementById("save-score");
  let intro = document.getElementById("intro");
  let inputComponents = document.getElementById("input-div");
  let userInitials = document.getElementById("textarea1");
  let submitScore = document.getElementById("submit-score");  
  let score = 0;
  let currentQuestion = 0;
  
  //Hide initials text area and submit btn until after quiz is finished
  inputComponents.style.display = "none";

  
 
  //Function to begin and continue to load questions until all questions are answered or time reaches 0
  function loadQuestion() {
    questionEl.textContent = quizData[currentQuestion].question;
    choicesEl.innerHTML = "";
    for (let i = 0; i < quizData[currentQuestion].choices.length; i++) {
      let choice = quizData[currentQuestion].choices[i];
      let choiceEl = document.createElement("a");
      choiceEl.classList.add("waves-effect", "waves-light", "btn-large")
      
      choiceEl.textContent = choice;
      // answer button listeners
      choiceEl.addEventListener("click", () => {
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
      choicesEl.appendChild(choiceEl);
    }
  }

  function endQuiz() {
    clearInterval(timerId);
    
    questionEl.textContent = `You scored ${score}/${quizData.length}`;
    choicesEl.innerHTML = "";
    inputComponents.style.display = "block";
  
    
};

startButton.addEventListener("click", () => {
  if (currentQuestion === 0) {
    startButton.style.display = "none";
    intro.style.display = "none";

    startTimer();
    loadQuestion();
  }
  let selectedChoice = document.querySelector('input[type="radio"]:checked');
  if (selectedChoice) {
    let selectedAnswer = selectedChoice.value;
    if (selectedAnswer === quizData[currentQuestion].answer) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  }
});


function saveHighScore() {
  let initials = userInitials.value.trim();

  if (initials !== '') {
    let highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];
    
    let newScore = {
      score: score,
      initials: initials,
    };
    //Save to localStorage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));
    
    window.location.href = '/high-score.html';

  }
};

userInitials.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    saveHighScore();
  }
});

submitScore.onclick = saveHighScore;
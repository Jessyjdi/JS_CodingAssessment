
let timerCount;
let timer;
let startButton = document.querySelector(".start-button");
let timerElement = document.querySelector(".timer-count");
let choicesEl = document.querySelector("#choices");
let questionsEl = document.querySelector("#questions");
let feedbackEl = document.querySelector("#feedback")
let currentQI = 0;
let time = questions.length * 10;
function startGame(){
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
  
    // un-hide questions section
    questionsEl.removeAttribute("class");
    timerCount=75;
    startButton.disbled = true;
    document.getElementById('timer').style.display='block';
    startTimer();
    console.log("startgame");

}
function startTimer() {
    // Sets timer on the page
    timer = setInterval(function() {
      
        if(timerCount <= 0){
            clearInterval(downloadTimer);
            timerElement.textContent = timerCount;
          } else {
            timerElement.textContent = timerCount;
          }
          timerCount -= 1;
    }, 1000);

    displayQuestion();
  }
  function displayQuestion(){
    var currentQuestion = questions[currentQI];

    // update title with current question
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
  
    // clear out any old question choices
    choicesEl.innerHTML = "";
  
    // loop over choices
    currentQuestion.choices.forEach(function(choice, i) {
      // create new button for each choice
      var choiceNode = document.createElement("button");
      choiceNode.setAttribute("class", "choice");
      choiceNode.setAttribute("value", choice);
  
      choiceNode.textContent = i + 1 + ". " + choice;
  
      // attach click event listener to each choice
      choiceNode.onclick = questionClick;
  
      // display on the page
      choicesEl.appendChild(choiceNode);
    });
  }
  function questionClick() {
    // user guessed wrong answer
    if (this.value !== questions[currentQI].answer) {
      // penalize/reduce 10 seconds from the remaining time
      time -= 10;
  
      if (time < 0) {
        time = 0;
      }
      // display new time on page
      timerElement.textContent = time;
      feedbackEl.textContent = "Wrong!";
      feedbackEl.style.color = "red";
      feedbackEl.style.fontSize = "100%";
    } else {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
      feedbackEl.style.fontSize = "100%";
    }
  
    // flash right/wrong feedback
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
  
    // next question
    currentQI++;
  
    // time checker
    if (currentQI === questions.length) {
      endGame();
    } else {
      displayQuestion();
    }
  }
  
function endGame(){
  // code to stop / finish the game
  console.log("End Game");
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
}

function saveHighscore(){
  // function that stores the initials and display the highscore (source:Internet)
  var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
  highscores.push(newScore);
  window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
      // redirect to next page
      window.location.href = "score.html";
}

function userOOTime(){
  // write steps if the user is out of the given time
}
function clearHighscores() {
  // clear highscore in the Score.html page
  saveHighscore()
}

startButton.addEventListener("click", startGame);


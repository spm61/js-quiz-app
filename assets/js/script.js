
//global state area
var currentQuestionNum = 0;
var time = 120
var timerInterval;

//DOM Reference Area
var timeElement = document.querySelector("#time");
var beginButton = document.querySelector("#begin-button");
var submitButton = document.querySelector("#submit-button");
var titleArea = document.querySelector("#title-area");
var quizArea = document.querySelector("#quiz-area");
var highScoreArea = document.querySelector("#highscore-area");
var highScoreArea = document.querySelector("#score-display-area");
var intialsInput = document.querySelector("#user-initials");
var rightOrWrongDisplay = document.querySelector("#rightorwrong");
var answerChoices = document.querySelector("#answer-choices");


//function to start the quiz, invoked when the start button is pushed,.
function beginQuiz() {
    //switch the title area and quiz area.
    titleArea.setAttribute("class", "hidden");
    quizArea.setAttribute("class", "shown");

    //set up the timer interval and start the timer.
    timerInterval = setInterval(timeTick, 1000);
    timeElement.textContent = time; 
  
    showQuestion(); //display a question to the user.
  }

  //Tick Tock, Update the Clock!
  function timeTick() {
    //decrements time and displays it.
    time--;
    timeElement.textContent = time;
  
    //Did we run out of time?  If we did the game is over.
    if (time <= 0) {
        time = 0;
        endQuiz();
    }
  }

  function showQuestion() {
    //get the current question frm the array of questions stored in quizquestions.js.
    var currentQuestion = questions[currentQuestionNum];
  
    //Show the question on the display
    var titleArea = document.getElementById("question-name");
    titleArea.textContent = currentQuestion.question;
  
    //throw out the old question choices because we don't need them anymore.
    answerChoices.innerHTML = "";

    //Iterate over each choice and make a button for it,
    currentQuestion.choices.forEach(function(choice, i) {
      //create a button for each choice and set it's value to that choice.
      var singleChoice = document.createElement("button");
      singleChoice.setAttribute("class", "answer-choice");
      singleChoice.setAttribute("value", choice);
  
      singleChoice.textContent = i + 1 + ". " + choice; //number the choices iteratively
      singleChoice.onclick = selectAnswer; //listen for if the button was clicked upon
      answerChoices.appendChild(singleChoice); //render the answer choice on the page. 
    });
  }

// Proccess the selected answer.
  function selectAnswer() {
    // Are we wrong or are we right?  Decrease time if we are not right, setting time back to zero if it goes under.
    if (this.value !== questions[currentQuestionNum].answer) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timeElement.textContent = time; //update the new time.
      rightOrWrongDisplay.textContent = "INCORRECT!";
    } else {

      rightOrWrongDisplay.textContent = "CORRECT!";
    }
  
    // flash right/wrong feedback on page for half a second by showing and hiding it.  
    rightOrWrongDisplay.setAttribute("class", "rightorwrong shown");
    setTimeout(function() { 
      rightOrWrongDisplay.setAttribute("class", "rightorwrong hidden"); //sets it to hidden after the specified timeout time.
    }, 500);

    currentQuestionNum++;
  
    //Did we reach the end of the quiz?
    if (currentQuestionNum === questions.length) {
      endQuiz();
    } else {
      showQuestion(); //if we didn't that means we still have a game to play.
    }
  }


//end the quiz, invoked when time runs out or we answer every question
  function endQuiz() {
    clearInterval(timerInterval); //get rid of the timer, it is no longer necessary.
  
    //show the results and score submission display
    var highscoreSection = document.querySelector("#highscore-area");
    highscoreSection.setAttribute("class", "show");
  
    //show the final score, which is the amount of time remaining.
    var finalScore = document.querySelector("#final-score");
    finalScore.textContent = time;
  
    //put the question area away, its role is complete.
    quizArea.setAttribute("class", "hidden");
  }

//Function that saves the score.  
function saveScore() {
    // get value of input box
    var actualInitials = intialsInput.value.trim(); //remove spaces, since intitials don't typically have those.
  
    if (actualInitials !== "") { //we can't do anything with this if it's empty
      var storedScores =
        JSON.parse(window.localStorage.getItem("scores")) || []; //if it is empty, we either retrieve the score or use an empty array.
  
      //create a new score object to hold the user's information
      var newScore = {
        score: time,
        initials: actualInitials
      };

      //Add the new score in with the other scores and then add to local storage as a JSON String.
      storedScores.push(newScore);
      window.localStorage.setItem("scores", JSON.stringify(storedScores));
  
      //go to the page to see the list of high scores.
      window.location.href = "highscores.html";
    }
  }

  function isEnterPushed(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
      saveScore();
    }
  }
  //Events being listened for.
  // user clicks button to submit initials
  submitButton.addEventListener("click", saveScore);
  
  // user clicks button to start quiz
  beginButton.addEventListener("click", beginQuiz);
   //submit highscores by pressing enter.
  intialsInput.addEventListener("onkeyup", isEnterPushed);






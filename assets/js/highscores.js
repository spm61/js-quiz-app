var clearButton = document.getElementById("clear-button");

function showHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || []; //get the high scores from storage, or an empty array if there aren't any.
  
    //sort the high-scores by the score property, in decending order from top to bottom.
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
        // create a list item for each listing.
        var listItem = document.createElement("li");
        listItem.textContent = score.initials + " - " + score.score; //render the high score to the page.

        //Populate the ordered list and display it to the page.  
        var orderedList = document.getElementById("score-listings");
        orderedList.appendChild(listItem);
    });
  }
  
  //purge the high scores from local storage.
  function clearHighscores() {
    window.localStorage.removeItem("scores");
    window.location.reload();
  }
  
  //invoke the clear function when the button is clicked.
  clearButton.addEventListener("click", clearHighscores);
  
 //get the high-scores as soon as the page loads.
  showHighscores();
  
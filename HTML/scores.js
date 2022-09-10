var scoreBoard = document.getElementById('display-scores');
// var names = JSON.parse(localStorage.getItem('Initials'))
// var scores = JSON.parse(localStorage.getItem('Score'))
var scoreObjs = JSON.parse(localStorage.getItem('scoreObj')) || []
console.log(scoreObjs)
var clearButton = document.getElementById('clear')

addEventListener('load', function () {
    // // render high scores and initials to scores.html
    // // create a new div to print initials
    // var scoresDiv = document.createElement('div');
    // // add class for styling
    // scoresDiv.classList.add('flex');

    // sort scores from high to low
    scoreObjs = scoreObjs.sort(function (a, b) {
        return b.score - a.score
    })

    for (var i = 0; i < scoreObjs.length; i++) {
        // create a div for scores and initials
        var scoreDiv = document.createElement('div');
        // add class for styling
        scoreDiv.classList.add('score-div');
        // add the initials and scores text to the div
        scoreDiv.textContent = scoreObjs[i].name + ": " + scoreObjs[i].score
        // append the div to the scoreBoard element
        scoreBoard.appendChild(scoreDiv)
    }
});

// Clear Scores button
clearButton.addEventListener('click', ()=> {
    localStorage.clear();
    location.reload();
})
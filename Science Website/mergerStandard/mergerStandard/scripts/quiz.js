var duration = 900;             // 90 seconds (in tenths of a second)
var warningThreshold = 600; 	// 60 seconds (in tenths of a second)
var dangerThreshold = 300; 		// 30 seconds (in tenths of a second)
var hidePopupAfter = 15;        // Seconds
		
var durationRemaining = duration;

var score = 0;
var correct = 0;
var incorrect = 0;

var scores = []; 
var totalScore = 0;

startQuiz();
        
var timer;
var popupTimer;  // One second interval.
var popupCountdown = hidePopupAfter;
var timerIsRunning = false;
var popupIsVisible = false;

function popup(htmlText) {
    if (!popupIsVisible) {
        popupCountdown = hidePopupAfter;
        popupTimer = setInterval(popupTick, 1000);

        var popup = document.getElementById("score_popup");
        
        popup.innerHTML = htmlText;

        popup.setAttribute("Class", "PopUp Dark-dark Unhidden");
    }
    //clearInterval(popupTimer);
}

function popupTick() {

    try {
        if (popupCountdown > 0)
            popupCountdown--;
        else {            
            var popup = document.getElementById("score_popup");
            popup.setAttribute("Class", "PopUp Dark-dark");
            clearInterval(popupTimer);
        }
    } catch (e) {
        clearInterval(popupTimer);
    }
}

function timerTick() {
    try{
        if (timerIsRunning) {
            var tDisplay = document.getElementById('TimeDisplay');

            if (durationRemaining >= 1)
                durationRemaining--;
            else 
                endQuiz(true);
        

            if (durationRemaining <= dangerThreshold) {
                tDisplay.className = "Timer TimerDanger";
            } else if (durationRemaining <= warningThreshold) {
                tDisplay.className = "Timer TimerWarning";
            }
            else {
                tDisplay.className = "Timer";
            }

            tDisplay.innerText = (durationRemaining / 10).toFixed(1) + " seconds";
        }
        else {
            
            clearInterval(timer);
        }
    }
    catch(exc){
        clearInterval(timer);
    }
}

function setQuestionScore(question, score) {
    timerIsRunning = true;
    scores[question - 1] = score;
}

function getScore() {
    totalScore = 0;
    for (var i = 0; i < scores.length; i++)
        totalScore += scores[i];

    if (scores.length < 10) {
        var unanswered = 10 - scores.length;
        totalScore += unanswered * -1;
    }

    return totalScore;
}

function startQuiz() {
    
    timerIsRunning = true;
    timer = setInterval(timerTick, 100);
   
}

function restartQuiz(showScores) {
    timerIsRunning = false;
    clearInterval(timer);
    clearAnswers();
    durationRemaining = duration;
    startQuiz();
}

function clearAnswers() {
    for (var q = 1; q <= 10; q++) 
        for (var a = 1; a <= 3; a++) {
            var id = "Q" + q + "A" + a;
            var answer = document.getElementById(id);
            answer.checked = false;
        }

}

function endQuiz(showAlert) {
    timerIsRunning = false;
    clearInterval(timer);
    var s = -10;
    if (showAlert)
        try {
            s = getScore();
        } catch (e) {
           // Do nothing.
        }
        
    popup(getSummary());
}

function getSummary() {

    var questions = document.getElementsByClassName("Question");
    var wrongAnswers = "";
    var rightAnswers = "";
    var timeInSeconds = (duration - durationRemaining)/10;

    for (var i = 0; i < 10; i++) {
        var question = questions[i];
        summary += question.id + "<br />";
        var questionText = question.getElementsByTagName("p")[0].innerText;
        var answers = question.getElementsByTagName("input");

        for (var a = 0; a < 3; a++) {
            var answer = answers[a];
            var value = answer.getAttribute("value");
            var answerText = answer.getAttribute("data-content");
            var isSelected = answer.checked;

            if (isSelected) 
                if (value == 2) {
                    rightAnswers += questionText + "<br /><em color=\"grey\">" + answerText + "</em><br /><br />";

                }
                else {
                    wrongAnswers += questionText + "<br /><em color=\"grey\">" + answerText + "</em><br /><br />";
                }
        }
    }
            // Show correct answers, if any.
            // Show incorrect answers, if any.
            var summary =
                ((rightAnswers != "") ? "<h4>Correct Answers</h4>" + rightAnswers : "") +
                ((wrongAnswers != "") ? "<h4>Incorrect Answers</h4>" + wrongAnswers : "");

            summary += "<table><tr><td>Time taken: </td><td>" + timeInSeconds + " seconds</td></tr>";
   

    return summary;


}



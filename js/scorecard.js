let runs = parseInt(localStorage.getItem("runs")) || 0;
let wickets = parseInt(localStorage.getItem("wickets")) || 0;
let over = parseInt(localStorage.getItem("over")) || 0;
let balls = parseInt(localStorage.getItem("balls")) || 0;
let LastSixBalls = JSON.parse(localStorage.getItem("LastSixBalls")) || [];
let runRate = localStorage.getItem("runRate") || "0.00";
let currentInnings = localStorage.getItem("currentInnings") || "1";
let maxOvers = parseInt(localStorage.getItem("maxOvers")) || 5; // set your overs here
let History = [];

document.addEventListener("DOMContentLoaded", function () {
    let team1 = localStorage.getItem("team1") || "Team A";
    let team2 = localStorage.getItem("team2") || "Team B";
    let tossChoice = localStorage.getItem("tossChoice");
    let tossWinner = localStorage.getItem("tossWinner");

    document.getElementById("team11").textContent = team1;
    document.getElementById("team22").textContent = team2;
    console.log("Team 1: ", team1);
    console.log("Team 2: ", team2);
    console.log("Toss:", tossWinner, " Choose to ", tossChoice);

    let battingteam;
    if (tossChoice == "batting") {
        battingteam = tossWinner;
    } else if (tossChoice == "bowling") {
        battingteam = tossWinner === team1 ? team2 : team1;
    }

    if (currentInnings === "2") {
        battingteam = (battingteam === team1) ? team2 : team1;
    }

    document.getElementById("bat-team").textContent = battingteam;
    localStorage.setItem("battingteam", battingteam);

    updateUI();
});

function calculateRunRate(runs, overs, balls) {
    let totalOvers = overs + (balls / 6);
    if (totalOvers === 0) return "0.00";
    return (runs / totalOvers).toFixed(2);
}

function updateScore(run) {
    History.push({ runs, wickets, balls, over, lastSixBalls: [...LastSixBalls] });

    let ballText = run === "Out" ? 'W' : run;

    if (run === "Out") {
        wickets++;
        balls++;
    } else if (run === "⦁") {
        balls++;
    } else if (run === "wide") {
        runs += 1; 
    } else {
        runs += run;
        balls++;
    }

    if (balls >= 6) {
        over++;
        balls = 0;
    }

    LastSixBalls.push(ballText);
    LastSixBalls = LastSixBalls.slice(-6);

    runRate = calculateRunRate(runs, over, balls);

    localStorage.setItem("runs", runs);
    localStorage.setItem("wickets", wickets);
    localStorage.setItem("over", over);
    localStorage.setItem("balls", balls);
    localStorage.setItem("runRate", runRate);
    localStorage.setItem("LastSixBalls", JSON.stringify(LastSixBalls));

    updateUI();
    console.log("Runs: ", runs);
    console.log("Wickets: ", wickets);
    console.log("Overs: ", over, ".", balls);
    console.log("RR: ", runRate);

    checkMatchEnd();
}

function updateUI() {
    runRate = calculateRunRate(runs, over, balls);
    document.getElementById("runs").innerText = runs;
    document.getElementById("Wickets").textContent = wickets;
    document.getElementById("overs22").innerText = `${over}.${balls}`;
    document.getElementById("prev-ball").innerText = LastSixBalls.join(" | ");
    document.getElementById("nrr").innerText = runRate;
    checkStats();
}

function startSecondInnings() {
    // Save first innings data
    localStorage.setItem("firstInnings_runs", runs);
    localStorage.setItem("firstInnings_wickets", wickets);
    localStorage.setItem("firstInnings_overs", `${over}.${balls}`);
    localStorage.setItem("firstInnings_LastSixBalls", JSON.stringify(LastSixBalls));
    let target = parseInt(localStorage.getItem("firstInnings_runs")) + 1;
    document.getElementById("target").textContent = "Target: " + target;

    //change batting team names in UI
    let team1 = localStorage.getItem("team1");
    let team2 = localStorage.getItem("team2");
    let currentbatting = localStorage.getItem("battingteam");
    let newBatting = (currentbatting === team1) ? team2 : team1;

    document.getElementById("bat-team").textContent = newBatting;

    // Reset values for second innings
    runs = 0;
    wickets = 0;
    over = 0;
    balls = 0;
    LastSixBalls = [];
    currentInnings = "2";
    localStorage.setItem("runs", runs);
    localStorage.setItem("wickets", wickets);
    localStorage.setItem("over", over);
    localStorage.setItem("balls", balls);
    localStorage.setItem("LastSixBalls", JSON.stringify(LastSixBalls));
    localStorage.setItem("currentInnings", currentInnings);

    alert("Second innings started!");
    updateUI();
}
function navigateToWinnerPage(url) {
    // Show the loading screen
    document.getElementById("loading-screen").style.display = "flex";
    setTimeout(() => {
        window.location.href = url;
    }, 1500);
}

function checkMatchEnd() {
    if (currentInnings === "2") {
        let target = parseInt(localStorage.getItem("firstInnings_runs")) + 1;
        let isAllOut = (wickets === 10);
        let isOversDone = (over === maxOvers && balls === 0);
        //chooseing which team is batting now
        let team1 = localStorage.getItem("team1");
        let team2 = localStorage.getItem("team2");
        let currentbatting = localStorage.getItem("battingteam");
        let newBatting = (currentbatting === team1) ? team2 : team1;
        let bowlingteam = (currentbatting === team1) ? team1 : team2;

        if (runs === (target - 1) && (isAllOut || isOversDone)) {
            localStorage.setItem("matchResult", "tied");
            navigateToWinnerPage("winner.html");
            disableButtons();

        } else if (runs > target) {
            localStorage.setItem("won-sec-innings", newBatting);
            navigateToWinnerPage("winner.html");
            disableButtons();
        } else if (isAllOut || isOversDone) {
            localStorage.setItem("won-fir-inning", bowlingteam);
            navigateToWinnerPage("winner.html");
            disableButtons();
        }
    } else {
        // end of first innings
        if (wickets === 10 || (over === maxOvers && balls === 0)) {
            alert("First innings over! Click OK to start second innings.");
            startSecondInnings();
        }
    }
}

function checkStats() {
    if (currentInnings == "2") {
        let target = parseInt(localStorage.getItem("firstInnings_runs")) + 1;
        let runsRemaining = target - runs;
        let ballsRemaining = (maxOvers * 6) - (over * 6 + balls);
        let reqRunRate = (runsRemaining / (ballsRemaining / 6)).toFixed(2);

        if (runsRemaining <= 0 || ballsRemaining <= 0) {
            document.getElementById("update-Stats").textContent = "";
        } else {
            let updateStats = `${runsRemaining} Runs needed from ${ballsRemaining} Balls`
            document.getElementById("update-Stats").textContent = updateStats;
            document.getElementById("req-RR").textContent = `Req RR: ${reqRunRate}`;
        }
    } else {
        document.getElementById("update-Stats").textContent = "";

    }

}

function undoLastAction(){
    if(History.length == 0){
        alert("No Undo");
        return;
    }

    let lastState = History.pop();

    runs = lastState.runs;
    wickets = lastState.wickets;
    over = lastState.over;
    balls = lastState.balls;
    LastSixBalls = lastState.lastSixBalls;

    runRate = calculateRunRate(runs,over,balls);

    localStorage.setItem("runs", runs);
    localStorage.setItem("wickets", wickets);
    localStorage.setItem("over", over);
    localStorage.setItem("balls", balls);
    localStorage.setItem("runRate", runRate);
    localStorage.setItem("LastSixBalls", JSON.stringify(LastSixBalls));

    updateUI();

}

const navToggle = document.querySelector('.nav-Toggle');
const navMenu = document.querySelector('.nav-link');

navToggle.addEventListener('click',() =>{
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');

});

function disableButtons() {
    document.querySelectorAll("button").forEach(btn => btn.disabled = true);
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

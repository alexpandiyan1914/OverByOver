// let runs = parseInt(localStorage.getItem("runs")) || 0;
// let wickets = parseInt(localStorage.getItem("wickets")) || 0;
// let over = parseInt(localStorage.getItem("over")) || 0;
// let balls = parseInt(localStorage.getItem("balls")) || 0;
// let LastSixBalls = JSON.parse(localStorage.getItem("LastSixBalls")) || [];
// let runRate = localStorage.getItem("runRate") || "0.00";
// let History = [];

// document.addEventListener("DOMContentLoaded", function () {
//     let team1 = localStorage.getItem("team1") || "Team A";
//     let team2 = localStorage.getItem("team2") || "Team B";
//     let overs = localStorage.getItem("over") || "0.0";
//     let tossChoice = localStorage.getItem("tossChoice");
//     let tossWinner = localStorage.getItem("tossWinner");

//     document.getElementById("team11").textContent = team1;
//     document.getElementById("team22").textContent = team2;
//     // document.getElementById("overs22").textContent = overs;

//     let battingteam;
//     if (tossChoice == "batting") {
//         battingteam = tossWinner;
//     } else if (tossChoice == "bowling") {
//         battingteam = tossWinner === team1 ? team2 : team1;
//     } else {
//         console.error("Toss not selected properly !");
//     }

//     document.getElementById("bat-team").textContent = battingteam;

//     console.log("Fetched Team 1:", team1);
//     console.log("Fetched Team 2:", team2);
//     console.log("Fetched Overs:", overs);
//     console.log("Toss Winner Chose:", tossChoice);
//     console.log("batting team:", battingteam);
// });

// function calculateRunRate(runs, overs, balls) {
//     let totalOvers = overs + (balls / 6);  
//     if (totalOvers === 0) return "0.00"; 

//     let runRate = runs / totalOvers;
//     return runRate.toFixed(2); 
// }

// function updateScore(run) {
//     History.push({ runs, wickets, balls, over, lastSixBalls: [...LastSixBalls] });

//     let ballText = run === "Out" ? 'W' : run;
//     if (run == "Out") {
//         wickets++;
//         balls++;
//         console.log("Out Bro nee");
//     } else if (run == "⦁") {
//         balls++;
//         console.log("Dokku");
//     }
//     else if (run == "wide") {
//         runs += 1;
//         console.log("wide podama podrah dei");
//     } else {
//         runs += run;
//         balls++;
//     }

//     if (balls >= 6) {
//         over++;
//         balls = 0;
//     }

//     LastSixBalls.push(ballText);
//     LastSixBalls = LastSixBalls.slice(-6);

//     let runRate = calculateRunRate(runs, over, balls);
    
//     localStorage.setItem("runs", runs);
//     localStorage.setItem("wickets", wickets);
//     localStorage.setItem("over", over);
//     localStorage.setItem("balls", balls);
//     localStorage.setItem("runRate", runRate);
//     localStorage.setItem("LastSixBalls", JSON.stringify(LastSixBalls));

//     console.log("values stored in local storage");
//     console.log("Runs: ",runs);
//     console.log("wickets: ",wickets);
//     console.log("over: ",`${over}.${balls}`);
//     console.log("Run Rate: ",runRate);


//     //update UI
//     updateUI();
// }

// function updateUI() {
//     runRate = calculateRunRate(runs, over, balls);
//     document.getElementById("runs").innerText = runs;
//     document.getElementById("Wickets").textContent = wickets;
//     document.getElementById("overs22").innerText = `${over}.${balls}`;
//     document.getElementById("prev-ball").innerText = LastSixBalls.join(" | ");
//     document.getElementById("nrr").innerText = runRate;
// }

// document.addEventListener("DOMContentLoaded", function () {
//     updateUI();
// });


// function logout() {
//     localStorage.clear();
//     window.location.href = "index.html";
// }

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

    let battingteam;
    if (tossChoice == "batting") {
        battingteam = tossWinner;
    } else if (tossChoice == "bowling") {
        battingteam = tossWinner === team1 ? team2 : team1;
    }

    if (currentInnings === "2") {
        // Swap batting team
        battingteam = (battingteam === team1) ? team2 : team1;
    }

    document.getElementById("bat-team").textContent = battingteam;

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
        runs += 1; // wide adds run but no ball
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

    checkMatchEnd(); // check result after each update
}

function updateUI() {
    runRate = calculateRunRate(runs, over, balls);
    document.getElementById("runs").innerText = runs;
    document.getElementById("Wickets").textContent = wickets;
    document.getElementById("overs22").innerText = `${over}.${balls}`;
    document.getElementById("prev-ball").innerText = LastSixBalls.join(" | ");
    document.getElementById("nrr").innerText = runRate;
}

function startSecondInnings() {
    // Save first innings data
    localStorage.setItem("firstInnings_runs", runs);
    localStorage.setItem("firstInnings_wickets", wickets);
    localStorage.setItem("firstInnings_overs", `${over}.${balls}`);
    localStorage.setItem("firstInnings_LastSixBalls", JSON.stringify(LastSixBalls));
    let target = parseInt(localStorage.getItem("firstInnings_runs")) + 1;
    document.getElementById("target").textContent = "Target: "+target;

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

function checkMatchEnd() {
    if (currentInnings === "2") {
        let target = parseInt(localStorage.getItem("firstInnings_runs")) + 1;
        let isAllOut = (wickets === 10);
        let isOversDone = (over === maxOvers && balls === 0);

        if (runs >= target) {
            alert("🎉 Second innings team won!");
            disableButtons();
        } else if (isAllOut || isOversDone) {
            alert("🎉 First innings team won!");
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

function disableButtons() {
    document.querySelectorAll("button").forEach(btn => btn.disabled = true);
}

function logout() {
    // Only clear second innings data
    localStorage.removeItem("runs");
    localStorage.removeItem("wickets");
    localStorage.removeItem("balls");
    localStorage.removeItem("over");
    localStorage.removeItem("runRate");
    localStorage.removeItem("LastSixBalls");
    localStorage.removeItem("currentInnings");
    localStorage.clear();

    // Keep firstInnings_* to show result if needed
    window.location.href = "index.html";
}

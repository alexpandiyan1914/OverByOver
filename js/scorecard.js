let runs = parseInt(localStorage.getItem("runs")) || 0;
let wickets = parseInt(localStorage.getItem("wickets")) || 0;
let over = parseInt(localStorage.getItem("over")) || 0;
let balls = parseInt(localStorage.getItem("balls")) || 0;
let LastSixBalls = JSON.parse(localStorage.getItem("LastSixBalls")) || [];
let runRate = localStorage.getItem("runRate") || "0.00";
let History = [];

document.addEventListener("DOMContentLoaded", function () {
    let team1 = localStorage.getItem("team1") || "Team A";
    let team2 = localStorage.getItem("team2") || "Team B";
    let overs = localStorage.getItem("over") || "0.0";
    let tossChoice = localStorage.getItem("tossChoice");
    let tossWinner = localStorage.getItem("tossWinner");

    document.getElementById("team11").textContent = team1;
    document.getElementById("team22").textContent = team2;
    // document.getElementById("overs22").textContent = overs;

    let battingteam;
    if (tossChoice == "batting") {
        battingteam = tossWinner;
    } else if (tossChoice == "bowling") {
        battingteam = tossWinner === team1 ? team2 : team1;
    } else {
        console.error("Toss not selected properly !");
    }

    document.getElementById("bat-team").textContent = battingteam;

    console.log("Fetched Team 1:", team1);
    console.log("Fetched Team 2:", team2);
    console.log("Fetched Overs:", overs);
    console.log("Toss Winner Chose:", tossChoice);
    console.log("batting team:", battingteam);
});

function calculateRunRate(runs, overs, balls) {
    let totalOvers = overs + (balls / 6);  // Convert balls to overs
    if (totalOvers === 0) return "0.00"; // Avoid division by zero

    let runRate = runs / totalOvers;
    return runRate.toFixed(2); // Round to 2 decimal places
}



function updateScore(run) {
    History.push({ runs, wickets, balls, over, lastSixBalls: [...LastSixBalls] });

    let ballText = run === "Out" ? 'W' : run;
    if (run == "Out") {
        wickets++;
        balls++;
        console.log("Out Bro nee");
    } else if (run == "⦁") {
        balls++;
        console.log("Dokku");
    }
    else if (run == "wide") {
        runs += 1;
        console.log("wide podama podrah dei");
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

    let runRate = calculateRunRate(runs, over, balls);
    
    localStorage.setItem("runs", runs);
    localStorage.setItem("wickets", wickets);
    localStorage.setItem("over", over);
    localStorage.setItem("balls", balls);
    localStorage.setItem("runRate", runRate);
    localStorage.setItem("LastSixBalls", JSON.stringify(LastSixBalls));

    console.log("values stored in local storage");
    console.log("Runs: ",runs);
    console.log("wickets: ",wickets);
    console.log("over: ",`${over}.${balls}`);
    console.log("Run Rate: ",runRate);


    //update UI
    updateUI();
}

function updateUI() {
    runRate = calculateRunRate(runs, over, balls);
    document.getElementById("runs").innerText = runs;
    document.getElementById("Wickets").textContent = wickets;
    document.getElementById("overs22").innerText = `${over}.${balls}`;
    document.getElementById("prev-ball").innerText = LastSixBalls.join(" | ");
    document.getElementById("nrr").innerText = runRate;
}

document.addEventListener("DOMContentLoaded", function () {
    updateUI();
});


function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}
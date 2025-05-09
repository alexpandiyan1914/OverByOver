document.addEventListener("DOMContentLoaded", () => {
    let winAtSec = localStorage.getItem("won-sec-innings");
    let winAtFir = localStorage.getItem("won-fir-inning");
    let firstInng_run = localStorage.getItem("firstInnings_runs");
    let secondInng_run = localStorage.getItem("runs");
    let wonbyDiff = firstInng_run - secondInng_run;
    let wonbyWick = 10 - localStorage.getItem("wickets");
    let firstInng_over = localStorage.getItem("firstInnings_overs");
    let sec_over = localStorage.getItem("over");
    let sec_balls = localStorage.getItem("balls");

    team1 = localStorage.getItem("team1") || "Team A"
    team2 = localStorage.getItem("team2") || "Team B";
    tossWinner = localStorage.getItem("tossWinner");
    tossChoice = localStorage.getItem("tossChoice");

    let firstBattingTeam, secondBattingTeam;

    // Decide who batted first based on toss
    if (tossChoice === "batting") {
        firstBattingTeam = tossWinner;
        secondBattingTeam = (tossWinner === team1) ? team2 : team1;
    } else {
        secondBattingTeam = tossWinner;
        firstBattingTeam = (tossWinner === team1) ? team2 : team1;
    }

    if (winAtSec) {
        document.getElementById("winner").textContent = `${winAtSec} won by ${wonbyWick} wkts`;
        console.log(winAtSec, "Won the match !");
    } else if (winAtFir) {
        document.getElementById("winner").textContent = `${winAtFir} won by ${wonbyDiff} runs`;
        console.log(winAtFir, "Won the match !");
    }else if (firstInng_run === secondInng_run){
        document.getElementById("winner").textContent = "Match result not available.";
        console.log("Match result not available");
    }



    document.getElementById("team_1").innerText = `${secondBattingTeam} - ${secondInng_run} (${sec_over}.${sec_balls})`;
    document.getElementById("team_2").innerText = `${firstBattingTeam} - ${firstInng_run} (${firstInng_over})`;

});

function newMatch() {
    localStorage.clear();
    window.location.href = "index.html";
}
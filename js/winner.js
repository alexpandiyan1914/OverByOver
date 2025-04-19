document.addEventListener("DOMContentLoaded", () => {
    let winAtSec = localStorage.getItem("won-sec-innings");
    let winAtFir = localStorage.getItem("won-fir-inning");
    let firstInng_run = localStorage.getItem("firstInnings_runs");
    let secondInng_run = localStorage.getItem("runs");
    let wonbyDiff = firstInng_run - secondInng_run;
    let wonbyWick = 10-localStorage.getItem("wickets");

    if (winAtSec) {
        document.getElementById("winner").textContent = `${winAtSec} won by ${wonbyWick} wkts`;
        console.log(winAtSec,"Won the match !");
    } else if (winAtFir) {
        document.getElementById("winner").textContent = `${winAtFir} won by ${wonbyDiff} runs`;
        console.log(winAtFir,"Won the match !");
    } else {
        document.getElementById("winner").textContent = "Match result not available.";
        console.log("Match result not available");
    }
});

function newMatch(){
    localStorage.clear();
    window.location.href = "index.html";
}
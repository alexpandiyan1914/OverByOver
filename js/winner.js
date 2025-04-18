document.addEventListener("DOMContentLoaded", () => {
    let winAtSec = localStorage.getItem("won-sec-innings");
    let winAtFir = localStorage.getItem("won-fir-inning");

    if (winAtSec) {
        document.getElementById("winner").textContent = `${winAtSec} Team Won the Match!`;
    } else if (winAtFir) {
        document.getElementById("winner").textContent = `${winAtFir} Team Won the Match!`;
    } else {
        document.getElementById("winner").textContent = "Match result not available.";
    }
});

function newMatch(){
    localStorage.clear();
    window.location.href = "index.html";
}
// function getNames(){
//     let Team2a = localStorage.getItem("team2") || "Team 1";
//     let Team2b = localStorage.getItem("team2") || "Team 2";
//     let Overs2 = localStorage.getItem("overs") || "0";

//     document.getElementById("team11").innerText = Team2a;
//     document.getElementById("team22").innerText = Team2b;
//     document.getElementById("overs22").innerText = Overs2;
// }

// window.onload = function() {
//     getNames();
//     document.getElementById("Log").addEventListener("click",logout);
// };

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
    if(tossChoice == "batting"){
        battingteam = tossWinner;
    }else if(tossChoice == "bowling"){
        battingteam = tossWinner === team1?team2:team1;
    }else{
        console.error("Toss not selected properly !");
    }

    document.getElementById("bat-team").textContent = battingteam;

    console.log("Fetched Team 1:", team1);
    console.log("Fetched Team 2:", team2);
    console.log("Fetched Overs:", overs);
    console.log("Toss Winner Chose:", tossChoice);
    console.log("batting team:",battingteam);
});


function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}
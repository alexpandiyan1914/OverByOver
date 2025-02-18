function getNames(){
    let Team2a = localStorage.getItem("team2") || "Team 1";
    let Team2b = localStorage.getItem("team2") || "Team 2";
    let Overs2 = localStorage.getItem("overs") || "0";

    document.getElementById("team11").innerText = Team2a;
    document.getElementById("team22").innerText = Team2b;
    document.getElementById("overs22").innerText = Overs2;
}

window.onload = function() {
    getNames();
    document.getElementById("Log").addEventListener("click",logout);
};



function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}
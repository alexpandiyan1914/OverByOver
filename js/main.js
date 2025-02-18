function setNames(){
    let Team1a = document.getElementById("team1").value;
    let Team1b = document.getElementById("team2").value;
    let Overs = document.getElementById("over").value;

    if(Team1a == "" || Team1b == ""){
        alert("Enter Team names Properly !");
        return false;
    }
    console.log("Fetched team1:", Team1a);
    console.log("Fetched team2:", Team1b);
    console.log("Fetched over:", Overs2);
    //storing the values in local storage
    localStorage.setItem("team1",Team1a);
    localStorage.setItem("team2",Team1b);
    localStorage.setItem("over",Overs);

    return true;
}



// // Function to store team names and overs before navigating to scorecard.html
// function setTeamNames() {
//     let team111 = document.getElementById("team1").value;
//     let team222 = document.getElementById("team2").value;
//     let overs = document.getElementById("over").value;

//     if (team111 === "" || team222 === "" || overs === "") {
//         alert("Please enter both team names and overs.");
//         return false; // Prevent form submission
//     }

//     // Store values in localStorage
//     localStorage.setItem("team1", team111);
//     localStorage.setItem("team2", team222);
//     localStorage.setItem("overs", overs);

//     return true; // Allow form submission
// }

// // Function to retrieve values and display them on scorecard.html
// function loadScorecard() {
//     let team1 = localStorage.getItem("team1") || "Team A";
//     let team2 = localStorage.getItem("team2") || "Team B";
//     let overs = localStorage.getItem("overs") || "0";

//     document.getElementById("team11").innerText = team1;
//     document.getElementById("team22").innerText = team2;
//     document.getElementById("over").innerText = overs + ".0"; // Display as overs format
// }

// // Ensure `loadScorecard` runs only on `scorecard.html`
// if (window.location.pathname.includes("scorecard.html")) {
//     window.onload = loadScorecard;
// }

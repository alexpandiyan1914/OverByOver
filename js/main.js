document.addEventListener("DOMContentLoaded",function(){
    const images = ["images/dhoni.jpg","images/sachin.jpg","images/kohli.jpg","images/rohit.jpg"]
    let index = 0;

    function changeBackround(){
   

    if(!document.body){
        console.error("document .body is not ready !")
        return;
    }
    document.body.style.backgroundImage=`url('${images[index]}')`;
    index = (index+1)%images.length;
    }

    setInterval(changeBackround,4000);
    changeBackround();

});

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

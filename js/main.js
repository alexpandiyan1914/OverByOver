
function Toss() {
    let team1 = localStorage.getItem("team1");
    let team2 = localStorage.getItem("team2");
    let overs = localStorage.getItem("over");

    if (team1 == " " || team2 == " " || overs ==" ") {
        alert("Please enter team names first!");
        return false;
    }

    var x = document.getElementById("container");
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }

    // Perform coin toss (50-50 chance)
    let tossWinner = Math.random() < 0.5 ? team1 : team2;

    document.getElementById("Toss").innerText = tossWinner + " won the toss!";
    document.getElementById("container").style.display = "none";
    document.getElementById("container-2").style.display = "block";

    localStorage.setItem("tossWinner",tossWinner);
}

function setTeamNames() {
    let team1 = document.getElementById("team1").value.trim();
    let team2 = document.getElementById("team2").value.trim();
    let overs = document.getElementById("over").value.trim();

    if (team1 === "" || team2 === "" || overs === "") {
        alert("Enter team names and overs properly!");
        return false;
    }

    console.log("Fetched Team 1:", team1);
    console.log("Fetched Team 2:", team2);
    console.log("Fetched Overs:", overs);

    // Store values in local storage
    localStorage.setItem("team1", team1);
    localStorage.setItem("team2", team2);
    localStorage.setItem("over", overs);

    Toss();

    return false;
}

document.addEventListener("DOMContentLoaded", function() { 
  document.getElementById("toss-form").addEventListener("submit", function(event) {
      event.preventDefault(); 

      let choice = document.querySelector('input[name="choice"]:checked');

      if (!choice) {
          alert("Please select Batting or Bowling before starting the match!");
          return false;
      }

      localStorage.setItem("tossChoice", choice.value);
      window.location.href = "scorecard.html";
  });
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


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
    localStorage.setItem("maxOvers", overs);

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

function scorecardalrt() {
  let team1 = localStorage.getItem("team1");
    let team2 = localStorage.getItem("team2");
  if(!team1 || !team2){
    alert("Enter Team Names !");
    return false;
  }
  return true;
}
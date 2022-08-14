/**  author: Shubhangi Gupta **/
/**  SER421 Lab1_Part2     **/
/**  Javascript Golf Tournament **/

const EventEmitter = require("events");
const emitter = new EventEmitter();
class Player {
  //Part 2.a : Initialization
  constructor(lastname, firstinitial, score, hole) {
    this.lastname = lastname;
    this.firstinitial = firstinitial;
    this.score = score;
    this.hole = hole;
  }
  //helper function
  holesPlayed() {
    if (this.hole === "finished") {
      return 18;
    } else {
      return this.hole;
    }
  }

  //Part 2.g
  postScore(scr) {
    if (this.hole < 17) {
      this.hole++;
      this.score = scr;
    } else if (this.hole == 17) {
      this.hole = "finished";
      this.score = scr;
      emitter.emit("game completed?");
    } else if (this.hole == "finished") {
      return "player finished game";
    }
    return 'score posted for player : ' + this.lastname + " " + this.firstinitial;
  }
}

class Tournament {
  //Part 2.a : Initialization
  constructor(input) {
    let data = JSON.parse(input);
    let tour = data.tournament;
    let players = data.tournament.players;
    let arrPlayers = new Array();

    for (let i in players) {
      let pObj = new Player(
        players[i].lastname,
        players[i].firstinitial,
        players[i].score,
        players[i].hole
      );
      arrPlayers.push(pObj);
    }

    this.name = tour.name;
    this.year = tour.year;
    this.award = tour.award;
    this.yardage = tour.yardage;
    this.par = tour.par;
    this.players = arrPlayers;

    //Part 2.f : printLeaderboard() function
    Tournament.prototype.printLeaderboard = function () {

      this.leaderboard();
      console.log('--------------Leaderboard---------------');
      for (let p in this.players) {
        console.log("Name :" + this.players[p].lastname + " " + this.players[p].firstinitial + " | Score : " + this.players[p].score + " | Hole : " + this.players[p].hole);
      }
    };

    emitter.on("game completed?", () => {
      this.isTournamentCompleted();
    });

  }

  //Part 2.b : leaderboard() function
  leaderboard() {
    this.players.sort(function (x, y) {
      if (x.score != y.score) {
        return x.score - y.score;
      } else {
        return y.holesPlayed() - x.holesPlayed();
      }
    });
    return JSON.stringify(this.players, null, 2);
  }

  //helper function : uses leaderboard() to return the winner in Part 2.h
  getWinner() {
    this.leaderboard();
    return [this.players[0].lastname, this.players[0].score];
  }

  //Part 2.h : isTournamentCompleted() function
  isTournamentCompleted() {
    let isCompleted = true;

    this.players.forEach(function (player) {
      if (typeof player.hole == 'number') isCompleted = false;
    });

    if (isCompleted) {
      let winner = this.getWinner();
      console.log("Tournament Completed !!");
      console.log("WINNER -> " + winner);
      return true;
    }
    return false;
  }

  //Part 2.h : projectedLeaderboard() function
  projectedLeaderboard(projectScoreByXXX) {
    let tour = this;

    if (projectScoreByXXX == projectScoreByIndividual) {
      for (let index in tour.players) {
        tour.players[index].temp = tour.players[index].score;

        tour.players[index].score = projectScoreByIndividual(
          tour,
          tour.players[index].lastname,
          tour.players[index].firstinitial
        );

      }
    }
    else if (projectScoreByXXX == projectScoreByHole) {
      for (let index in tour.players) {
        tour.players[index].temp = tour.players[index].score;

        tour.players[index].score = projectScoreByHole(
          tour,
          tour.players[index].lastname,
          tour.players[index].firstinitial
        );

      }
    } else {
      console.log("Function not supported");
      return;
    }
    tour.leaderboard();
    for (let index in tour.players) {
      tour.players[index].score = tour.players[index].temp;
      delete tour.players[index].temp;
    }
    return JSON.stringify(tour.players, null, 2);
  }
}

//helper function : returns index if player with given lastname and firstinitial exist in tournament
function findPlayer(tour, lastname, firstinitial) {
  for (let p in tour.players) {
    if (
      tour.players[p].firstinitial === firstinitial &&
      tour.players[p].lastname === lastname
    ) {
      return p;
    }
  }
  return null;
}

//Part 2.c
function projectScoreByIndividual(tour, lastname, firstinitial) {

  try {
    var playerIndex = findPlayer(tour, lastname, firstinitial);
    if (!playerIndex) {
      return console.log(
        "player with name " + lastname + " " + firstinitial + " not found!"
      );
    }

  }

  catch (err) {
    console.log("Error: " + err);
  }

  return Math.round((tour.players[playerIndex].score / tour.players[playerIndex].holesPlayed()) * 18);
}

//helper function
function getAverageOfAllScores(tour) {
  var totalScore = 0;
  var no_of_players = 0;
  let h;

  for (let playerIndex in tour.players) {
    var scorebyHole = tour.players[playerIndex].score / tour.players[playerIndex].holesPlayed();
    totalScore += scorebyHole;

    no_of_players++;
  }

  return totalScore / no_of_players;
}

//PART 2.d
function projectScoreByHole(tour, lastname, firstinitial) {

  try {
    let playerIndex = findPlayer(tour, lastname, firstinitial);
    if (!playerIndex) {
      return console.log(
        "player with name " + lastname + " " + firstinitial + " not found!"
      );
    }

    var averageScore = getAverageOfAllScores(tour);
    var projectedScoreByH =
      tour.players[playerIndex].score + (18 - tour.players[playerIndex].holesPlayed()) * averageScore;

  }

  catch (err) {
    console.log("Error: " + err);
  }
  return Math.round(projectedScoreByH);

}
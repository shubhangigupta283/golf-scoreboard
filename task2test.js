/**  author: Shubhangi Gupta **/
/**  SER421 Lab1 - Part 2.i : Test case file **/


var t1json = '{"tournament":{"name":"British Open","year":2001,"award":840000,"yardage":6905,"par":71,"players":[{"lastname":"Montgomerie","firstinitial":"C","score":-3,"hole":17},{"lastname":"Fulke","firstinitial":"P","score":-5,"hole":"finished"},{"lastname":"Owen","firstinitial":"G","score":-1,"hole":"finished"},{"lastname":"Parnevik","firstinitial":"J","score":0,"hole":12},{"lastname":"Ogilvie","firstinitial":"J","score":-1,"hole":7},{"lastname":"Cejka","firstinitial":"A","score":-2,"hole":15},{"lastname":"Romero","firstinitial":"E","score":-4,"hole":11},{"lastname":"Fasth","firstinitial":"N","score":4,"hole":"finished"}]}}';
var t2json = '{"tournament":{"name":"British Open","year":2001,"award":840000,"yardage":6905,"par":71,"players":[{"lastname":"Taylor","firstinitial":"D","score":1,"hole":12},{"lastname":"Fulke","firstinitial":"P","score":-2,"hole":3},{"lastname":"Owen","firstinitial":"G","score":-1,"hole":7},{"lastname":"Parnevik","firstinitial":"J","score":-3,"hole":"finished"},{"lastname":"Ogilvie","firstinitial":"J","score":1,"hole":"finished"},{"lastname":"Cejka","firstinitial":"A","score":-2,"hole":9},{"lastname":"Romero","firstinitial":"E","score":0,"hole":"finished"},{"lastname":"Fasth","firstinitial":"N","score":-4,"hole":16}]}}';
var t3json = '{"tournament":{"name":"British Open","year":2001,"award":840000,"yardage":6905,"par":71,"players":[{"lastname":"Montgomerie","firstinitial":"C","score":-2,"hole":14},{"lastname":"Fulke","firstinitial":"P","score":3,"hole":17},{"lastname":"Owen","firstinitial":"G","score":0,"hole":18},{"lastname":"Parnevik","firstinitial":"J","score":1,"hole":"finished"},{"lastname":"Ogilvie","firstinitial":"J","score":-1,"hole":-1},{"lastname":"Cejka","firstinitial":"A","score":2,"hole":17},{"lastname":"Romero","firstinitial":"E","score":-1,"hole":"finished"},{"lastname":"Fasth","firstinitial":"N","score":1,"hole":11}]}}';
var t4json = '{"tournament":{"name":"British Open","year":2001,"award":840000,"yardage":6905,"par":71,"round":4,"players":[{"lastname":"Montgomerie","firstinitial":"C","score":0,"hole":"finished"},{"lastname":"Fulke","firstinitial":"P","score":0,"hole":"finished"},{"lastname":"Owen","firstinitial":"G","score":0,"hole":"finished"},{"lastname":"Parnevik","firstinitial":"J","score":0,"hole":"finished"},{"lastname":"Ogilvie","firstinitial":"J","score":0,"hole":"finished"},{"lastname":"Cejka","firstinitial":"A","score":0,"hole":"finished"},{"lastname":"Romero","firstinitial":"E","score":-1,"hole":"finished"},{"lastname":"Fasth","firstinitial":"N","score":0,"hole":"finished"}]}}';
var t5json= '{"tournament":{"name":"British Open","year":2001,"award":840000,"yardage":6905,"par":71,"players":[{"lastname":"Montgomerie","firstinitial":"C","score":0,"hole":17},{"lastname":"Fulke","firstinitial":"P","score":0,"hole":"finished"},{"lastname":"Owen","firstinitial":"G","score":0,"hole":"finished"},{"lastname":"Parnevik","firstinitial":"J","score":0,"hole":12},{"lastname":"Ogilvie","firstinitial":"J","score":0,"hole":7},{"lastname":"Cejka","firstinitial":"A","score":0,"hole":15},{"lastname":"Romero","firstinitial":"E","score":0,"hole":11},{"lastname":"Fasth","firstinitial":"N","score":0,"hole":"finished"}]}}';

var t1 = new Tournament(t1json);
var t2 = new Tournament(t2json);
var t3 = new Tournament(t3json);
var t4 = new Tournament(t4json);
var t5= new Tournament(t5json);

//Test Case to verify initialization of tournament and palyers.
function tc1() {
    console.log("---------------------------------------------------------"); 
    console.log("Test case 1 : Initialize")
    console.log(" "); 
   
    console.log("Tournament Name: " + t1.name);
    console.log("Players participating:");
    for (let p in t1.players) {
        console.log(t1.players[p].firstinitial+ "  " +t1.players[p].lastname);
    }

}

//Test Case to verify leaderboard() function
function tc2() {
    console.log("---------------------------------------------------------"); 
    console.log("Test Case 2 : leaderboard()");
    console.log(" "); 
    console.log("leaderboard: " + t1.leaderboard());

}

//Test Cases to verify projectScoreByIndividual() function
function tc3() {
    console.log("---------------------------------------------------------"); 
    console.log("Test Case 3 : projectScoreByIndividual()");
    console.log(" ");

    //passing valid player name
    console.log("projected Score : " + projectScoreByIndividual(t1, "Owen", "G"));
    console.log(" ");
    //accessing player name with index
    console.log("projected Score  : " + projectScoreByIndividual(t1,t1.players[1].lastname,t1.players[1].firstinitial));
    console.log(" ");

    //Negative testcases ----------------------

    //verify projected score for non-exisitng player name
    console.log("projected Score : " + projectScoreByIndividual(t1,"xyz","abc"));
    console.log(" ");

    //verify projected score for invalid values
    console.log("projected Score  : " + projectScoreByIndividual(t1,0,3));
    console.log(" ");
}

//Test Cases to verify projectScoreByHole() function
function tc4() {
    console.log("---------------------------------------------------------"); 
    console.log("Test Case 4 : projectScoreByHole()");
    console.log(" ");

    //passing valid player name
    console.log("projected Score : " + projectScoreByHole(t1, "Owen", "G"));
    console.log(" ");
     
    //Negative test cases :

    //verify with non-existing player
    console.log("projected Score  : " + projectScoreByHole(t1,"xyz","abc"));
    console.log(" ");

    //verify with different tournament object references passed as arguments in same function call
    console.log("projected Score  : " + projectScoreByHole(t1, t2.players[0].lastname,t2.players[0].firstinitial));
    console.log(" ");
    
    //verify with invalid input
    console.log("projected Score  : " + projectScoreByHole(t1, 0 ,!9));
    console.log(" ");


}

//Test Cases to verify the functionality of projectedLeaderboard() function accepting projectScoreByXXX as argument
function tc5() {
    console.log("---------------------------------------------------------"); 
    console.log("Test Case 5 : projectedLeaderboard()");
    console.log(" ");

    //verify with function argument : projectScoreByIndividual()
    console.log("Verify with projectScoreByIndividual");
    console.log("projected leaderboard : " + t3.projectedLeaderboard(projectScoreByIndividual));
    console.log(" ");
     
    //verify with function argument : projectScoreByHole()
    console.log("Verify with projectScoreByHole");
    console.log("projected leaderboard : " + t3.projectedLeaderboard(projectScoreByHole));
    console.log(" ");
}

//Test Case to verify the functionality of printLeaderboard() function
function tc6() {
    console.log("---------------------------------------------------------"); 
    console.log("Test Case 6 :  printLeaderboard()");
    console.log(" ");

    //verify with different values for score and holes 
    t1.printLeaderboard();
    console.log(" ");

    //to verify when the score values are same for all players
    t5.printLeaderboard();
}

//Test Case to verify the functionality of postScore() function
function tc7() {

    console.log("---------------------------------------------------------"); 
    console.log("Test Case 7 : postScore() ");
    console.log(" ");

    //when holes<17
    console.log(t3.players[0].postScore(-9));
    console.log(" ");

    //when holes=17
    console.log(t3.players[1].postScore(-10));
    console.log(" ");

    //when holes=18
    console.log(t3.players[2].postScore(1));
    console.log(" ");

    //when holes=finished
    console.log(t3.players[3].postScore(-2));
    console.log(" ");

    //when holes=-1
    console.log(t3.players[4].postScore(-3));
    console.log(" ");

    console.log("LeaderBoard after the post scores : ");
    t3.printLeaderboard();
}

//Test Case to verify if the tournament is completed or not
function tc8() {

    console.log("---------------------------------------------------------"); 
    console.log("Test Case 8 : isTournamentCompleted()");

    //verify when not all players have finished
    console.log("isTournamentCompleted: " + t1.isTournamentCompleted());
    console.log(" ");

    //verify when all Players have hole="finished" , should return a winner
    console.log("isTournamentCompleted: " + t4.isTournamentCompleted());
}

tc1();
tc2();
tc3();
tc4();
tc5();
tc6();
tc7();
tc8();
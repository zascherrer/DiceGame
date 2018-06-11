"use strict"; //because javascript

startGame()

function startGame(){
	let playerName = introduction();
	howToPlay();
}

function introduction(){
	let playerName = prompt("Welcome to [GAME_NAME]! What's your name?");

	return playerName;
}

function howToPlay(){
	//Instructions for how to play go here
	//Use alert() for the instructions
}

function rollDie(sides){
	numberOfSidesIsValid = checkValidityOfSides(sides);

	return Math.ceil(Math.random(0,sides));
}

function checkValidityOfSides(sides){
	if(isNaN(sides)){
		alert("Please enter a number.");
		return false;
	}
	switch(true){
		case sides === 4:
			return true;
		case sides === 6:
			return true;
		case sides === 8:
			return true;
		case sides === 10:
			return true;
		case sides === 12:
			return true;
		case sides === 20:
			return true;
		default:
			return false;
	}
}
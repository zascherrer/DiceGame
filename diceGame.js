//"use strict"; //because javascript

startGame()

function startGame(){
	let playerName = introduction();
	let playerCharacter = characterCreation();
	howToPlay(playerCharacter);
}

function introduction(){
	let playerName = prompt("Welcome to Kung Fu Simulator 2018! What's your name?");
	alert("First, we'll have you create your character. Then we'll teach you how to play. No, you shouldn't know how to play before you create your character. Ready? Here we go!");

	return playerName;
}

function characterCreation(){
	let characterStatistics = [];
	let strength;
	let dexterity;
	let health;
	let speed;

	let reroll = "y";

	alert("Your character's stats are randomly generated, but you can reroll them however many times you choose.");

	while(reroll == "y"){
		characterStatistics = generateCharacter();

		strength = characterStatistics[0];
		dexterity = characterStatistics[1];
		health = characterStatistics[2];
		speed = characterStatistics[3];

		reroll = prompt("Your character's stats are: \n\nStrength: " + strength + "\nDexterity: " + dexterity + "\nHealth: " + health + "\nSpeed: " + speed + "\n\nReroll stats? (type 'y' if yes)")
	}

	return(characterStatistics);

}

function howToPlay(characterArray){
	//Instructions for how to play go here
	//Use alert() for the instructions
	let answer = prompt("Would you like to skip the tutorial? (y/n)")
	if(answer == "y"){
		return
	}

	alert("To attack, you first decide where you want to attack someone: the torso, the arm, the leg or the head. Don't worry about remembering those individually, they'll pop up every time you need to choose. The torso is very easy to hit, but is very resilient against attacks. The arms and legs are harder to hit, but can hinder your enemy if you hit them enough. The head is extremely difficult to hit, but the enemy takes massive damage from a head shot!")
	alert("In addition to choosing where to attack, you need to choose how to attack, i.e. whether to make a light attack or a heavy attack.")
	alert("Light attacks are easy to hit, but don't do a lot of damage. Heavy attacks do a lot of damage, but are harder to hit.")
	alert("That's probably a lot of information to read at once, so we'll try it out in practice.")

	enemy = generateCharacter();	//Generating an enemy
	enemy /= 2;						//Making the first enemy the player fights easier to deal with
	enemy = Math.floor(enemy);		//Rounding the stats down to an even number

	alert("Now you'll fight your first enemy. Ready, set, go!");
	fight(characterArray, enemy);

}

function rollDie(sides){
	return Math.ceil(Math.random() * sides);
}

function generateSecondaryStatistics(characterArray){
	let hitPoints = (characterArray[0] + characterArray[2] + rollDie(20)); //(Strength + Health + 20-sided die)
	hitPoints = Math.floor(hitPoints);
	characterArray.push(hitPoints);

	let dodge = (characterArray[2] + characterArray[3]) / 4; //(Health + Speed) / 4
	dodge = Math.floor(dodge);
	characterArray.push(dodge);

	let isAlive = true;
	characterArray.push(isAlive);

	return characterArray;
}

function generateCharacter(){
	let characterStatistics = [];
	let strength;
	let dexterity;
	let health;
	let speed;

	strength = rollThreeSixSidedDice();
	dexterity = rollThreeSixSidedDice();
	health = rollThreeSixSidedDice();
	speed = rollThreeSixSidedDice();


	characterStatistics.push(strength);
	characterStatistics.push(dexterity);
	characterStatistics.push(health);
	characterStatistics.push(speed);

	characterStatistics = generateSecondaryStatistics(characterStatistics);
	//characterStatistics[4] === hit points
	//characterStatistics[5] === dodge
	//characterStatistics[6] === isAlive

	return characterStatistics;
}

function fight(player, enemy){
	let playerTurn;

	if(player[3] >= enemy[3]){ 		//Comparing the characters' speeds
		playerTurn = true;
	}
	else{
		playerTurn = false;
	}

	while(player[6] && enemy[6]){	//i.e. while both the player and the enemy are still alive
		if(playerTurn){
			playerAttack(player, enemy);
		}
		else{
			enemyAttack(player, enemy);
		}
	}

}

function playerAttack(player, enemy){
	let attackLocation = hitLocation();
}

function hitLocation(){
	randomHitChanceHead = 10;
	randomHitChanceLeg = 25;
	randomHitChanceArm = 25;
	randomHitChanceTorso = 40;

	let choice = prompt("Where would you like to attack? Enter the number of your choice: \n\n 1. Torso \n 2. Arm \n 3. Leg \n 4. Head \n 5. Random")

	if(choice === "5"){
		let die100Result = rollDie(100);

		switch(true){
			case dieResult < randomHitChanceHead:
				return "4";
			case dieResult >= randomHitChanceHead && dieResult < randomHitChanceLeg + randomHitChanceHead:
				return "3";
			case dieResult >= randomHitChanceLeg + randomHitChanceHead && dieResult < randomHitChanceLeg + randomHitChanceHead + randomHitChanceArm:
				return "2";
			case dieResult >= randomHitChanceLeg + randomHitChanceHead + randomHitChanceArm && dieResult < randomHitChanceLeg + randomHitChanceHead + randomHitChanceArm + randomHitChanceTorso;
				return "1";
			default:
				return "1";
		}
	}


}

function rollThreeSixSidedDice(){
	return rollDie(6) + rollDie(6) + rollDie(6);
}




function checkValidityOfSides(sides){
	if(isNaN(sides)){
		alert("Please enter a number.");
		return false;
	}
	switch(true){
		case sides === "4":
			return true;
		case sides === "6":
			return true;
		case sides === "8":
			return true;
		case sides === "10":
			return true;
		case sides === "12":
			return true;
		case sides === "20":
			return true;
		default:
			return false;
	}
}
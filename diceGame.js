//"use strict"; //because javascript

startGame()

function startGame(){
	let playerName = introduction();
	let playerCharacter = characterCreation(playerName);
	howToPlay(playerCharacter);
}

function introduction(){
	let playerName = prompt("Welcome to Kung Fu Simulator 2018! What's your name?");
	alert("First, we'll have you create your character. Then we'll teach you how to play. No, you shouldn't know how to play before you create your character. Ready? Here we go!");

	return playerName;
}

function characterCreation(playerName){
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

	characterStatistics.push(playerName);

	return(characterStatistics);

}

function howToPlay(characterArray){
	//Instructions for how to play go here
	//Use alert() for the instructions
	let answer = prompt("Would you like to skip the tutorial? (y/n)")
	if(answer == "y"){
		return;
	}

	alert("To attack, you first decide where you want to attack someone: the torso, the arm, the leg or the head. Don't worry about remembering those individually, they'll pop up every time you need to choose. The torso is very easy to hit, but is very resilient against attacks. The arms and legs are harder to hit, but can hinder your enemy if you hit them enough. The head is extremely difficult to hit, but the enemy takes massive damage from a head shot!")
	alert("In addition to choosing where to attack, you need to choose how to attack, i.e. whether to make a light attack or a heavy attack.")
	alert("Light attacks are easy to hit, but don't do a lot of damage. Heavy attacks do a lot of damage, but are harder to hit.")
	alert("That's probably a lot of information to read at once, so we'll try it out in practice.")

	enemy = generateCharacter();		//Generating an enemy
	//enemy /= 2;						//Making the first enemy the player fights easier to deal with
	//enemy = Math.floor(enemy);		//Rounding the stats down to an even number
	enemy.push("Training_Bot");

	alert("Now you'll fight your first enemy. Ready, set, go!");
	let isVictory = fight(characterArray, enemy);

	if(isVictory){
		alert("Congratulations! You won your first fight! Now to move on to the real game...");
	}
	else{
		alert("You might have lost the battle, but you haven't lost the war! Now to move on to the real game...");
	}

	return;
}

function rollDie(sides){
	return Math.ceil(Math.random() * sides);
}

function generateSecondaryStatistics(characterArray){
	let hitPoints = (characterArray[2] + rollDie(20) / 2); //(Health + 20-sided die) / 2
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
	//characterStatistics[7] === characterName 		//Will be added later

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
			alert("Player turn!");
			enemy = playerAttack(player, enemy);
		}
		else{
			alert("Enemy turn!");
			player = enemyAttack(player, enemy);
		}
		playerTurn = !playerTurn;
	}

	if(player[6] === true){
		return true;
	}
	else{
		return false;
	}
}

function playerAttack(player, enemy){
	let attackLocation = hitLocation();
	let typeOfAttack = attackType();
	let shouldAttackHit = hitOrMiss(attackLocation, typeOfAttack, player);
	let isDefenseSuccessful;

	if(shouldAttackHit){
		isDefenseSuccessful = rollDodge(typeOfAttack, enemy);
	}

	if(shouldAttackHit && !isDefenseSuccessful){
		enemy = applyDamage(player, enemy);
	}

	return enemy;
}

function enemyAttack(player, enemy){
	let attackLocation = randomHitLocation();
	let typeOfAttack = rollDie(2).toString();
	let shouldAttackHit = hitOrMiss(attackLocation, typeOfAttack, enemy);
	let isDefenseSuccessful;

	if(shouldAttackHit){
		isDefenseSuccessful = rollDodge(typeOfAttack, player);
	}

	if(shouldAttackHit && !isDefenseSuccessful){
		player = applyDamage(enemy, player);
	}

	return player;
}

function hitLocation(){
	let choice = prompt("Where would you like to attack? Enter the number of your choice: \n\n 1. Torso \n 2. Arm \n 3. Leg \n 4. Head \n 5. Random")

	if(choice === "5"){
		choice = randomHitLocation();
	}

	return choice;


}

function rollThreeSixSidedDice(){
	return rollDie(6) + rollDie(6) + rollDie(6);
}

function randomHitLocation(){
	let die100Result = rollDie(100);

	randomHitChanceHead = 10;
	randomHitChanceLeg = 20;
	randomHitChanceArm = 20;
	randomHitChanceTorso = 50;

	switch(true){
		case die100Result < randomHitChanceHead:
			return "4";
		case die100Result >= randomHitChanceHead && die100Result < randomHitChanceLeg + randomHitChanceHead:
			return "3";
		case die100Result >= randomHitChanceLeg + randomHitChanceHead && die100Result < randomHitChanceLeg + randomHitChanceHead + randomHitChanceArm:
			return "2";
		case die100Result >= randomHitChanceLeg + randomHitChanceHead + randomHitChanceArm && die100Result < randomHitChanceLeg + randomHitChanceHead + randomHitChanceArm + randomHitChanceTorso:
			return "1";
		default:
			return "1";
		}
}

function attackType(){
	return prompt("What type of attack would you like to do? Enter the number of your choice: \n\n 1. Light Attack \n 2. Heavy Attack");
}

function hitOrMiss(hitLocation, attackType, character){
	let penaltyToHitTorso = 0;
	let penaltyToHitArm = -2;
	let penaltyToHitLeg = -3;
	let penaltyToHitHead = -7;

	let skillToHit = character[1]; //The character's dexterity -- penalties will be applied later

	if(attackType == "1"){
		skillToHit += 2;
	}
	else{
		skillToHit -= 2;
	}

	switch(hitLocation){
		case "1":
			skillToHit += penaltyToHitTorso;
			if(rollThreeSixSidedDice() <= skillToHit){
				return true;
			}
			else{
				alert(character[7] + "'s attack missed!")
				return false;
			}
		case "2":
			skillToHit += penaltyToHitArm;
			if(rollThreeSixSidedDice() <= skillToHit){
				return true;
			}
			else{
				alert(character[7] + "'s attack missed!")
				return false;
			}
		case "3":
			skillToHit += penaltyToHitLeg;
			if(rollThreeSixSidedDice() <= skillToHit){
				return true;
			}
			else{
				alert(character[7] + "'s attack missed!")
				return false;
			}
		case "4":
			skillToHit += penaltyToHitHead;
			if(rollThreeSixSidedDice() <= skillToHit){
				return true;
			}
			else{
				alert(character[7] + "'s attack missed!")
				return false;
			}
		default:
			skillToHit += penaltyToHitTorso;
			if(rollThreeSixSidedDice() <= skillToHit){
				return true;
			}
			else{
				alert(character[7] + "'s attack missed!")
				return false;
			}
	}
}

function rollDodge(attackType, character){
	let penaltyToDodge = 0;
	let skillToHit = character[5] 		//The character's dodge stat

	if(attackType == "1"){
		penaltyToDodge -= 2;
	}
	else{
		penaltyToDodge += 2;
	}

	skillToHit += penaltyToDodge;

	if(rollThreeSixSidedDice() <= skillToHit){
		alert(character[7] + " dodged!")
		return true;
	}
	else{
		alert("The attack hits!")
		return false;
	}
}

function applyDamage(attacker, defender, attackType, hitLocation){
	let damageModifier = attacker[0] - 10;		//Strength - 10
	let damageDone = rollDie(8) + damageModifier;
	let abilityDamage;
	let abilityDamageDivisor = 3;

	if(attackType == "1"){
		damageDone -= 2;
	}
	else{
		damageDone += 2;
	}

	switch(hitLocation){
		case "1":
			damageDone /= 2;
			damageDone = Math.floor(damageDone);
			break;
		case "2":
			abilityDamage = damageDone / abilityDamageDivisor;
			abilityDamage = Math.floor(abilityDamage);
			defender[1] -= abilityDamage;				//Ability damage is applied to dexterity
			break;
		case "3":
			abilityDamage = damageDone / abilityDamageDivisor;
			abilityDamage = Math.floor(abilityDamage);
			defender[3] -= abilityDamage;				//Ability damage is applied to speed
			break;
		case "4":
			damageDone *= 4;
			break;
		default:
			damageDone /= 2;
			damageDone = Math.floor(damageDone);
			break;
	}

	if(damageDone > 0){
		defender[4] -= damageDone;				//Subtracting the damage from the defender's HP
		alert(attacker[7] + " did " + damageDone + " damage!");
	}
	else{
		alert(attacker[7] + " didn't hit hard enough to do damage...");
	}								
	defender = survivalCheck(defender);		//The isAlive boolean

	return defender;
}

function survivalCheck(character){
	let survivalModifierFromHitPoints = character[4] % 10;
	let survivalModifierFromHealth = character[2] - 10;
	let survivalModifierTotal = survivalModifierFromHitPoints + survivalModifierFromHealth;
	let survivalSkill = 12 + survivalModifierTotal;

	if(rollThreeSixSidedDice() > survivalSkill){
		alert(character[7] + " has been defeated!")
		character[6] = false;
	}
	else{
		character[6] = true;
	}

	return character;
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
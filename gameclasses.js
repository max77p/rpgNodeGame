var fs = require('fs');
var inquirer = require('inquirer');


function monster(name, strength, agility, defend, maxHP, maxMP, xptoGive, ability) {
  this.name = name.toString();
  this.strength = parseInt(strength);
  this.agility = parseInt(agility);
  this.defence = defend;
  this.HP = {
    current: maxHP,
    max: maxHP,
  };
  this.MP = {
    curent: maxMP,
    max: maxMP,
  };
  this.level = 1;
  this.xptoGive = xptoGive;
  this.ability = ability;
}

function monsterBoss(name, strength, agility, defend, maxHP, maxMP, xptoGive, ability) {
  this.name = name.toString();
  this.strength = parseInt(strength);
  this.agility = parseInt(agility);
  this.defence = defend;
  this.HP = {
    current: maxHP,
    max: maxHP,
  };
  this.MP = {
    curent: maxMP,
    max: maxMP,
  }
  this.level = 20;
  this.xptoGive = xptoGive;
  this.ability = ability;
  this.attackMulti = (Math.floor(Math.random() * 5 + 1) * this.strength)
}


/********rpg character create when user picks name and class**********************/
function rpgCharacter(name, cClass) {
  this.name = name.toString();
  this.cClass = cClass;
  this.strength = cClass.starting_Strength;
  this.agility = cClass.starting_Agility;
  this.defence = cClass.defence;
  this.HP = {
    current: cClass.starting_HP,
    max: cClass.starting_HP
  };
  this.MP = {
    current: cClass.starting_MP,
    max: cClass.starting_MP
  }
  this.level = 1;
  this.xp = 10;
  this.levelUP = function () {
    if (this.xp >= this.level * 10) {
      this.HP.current = (this.HP.max * this.cClass.HP_Up) + this.HP.max;
      this.HP.max = this.HP.current;
      this.MP.current = (this.MP.max * this.cClass.MP_Up) + this.MP.max;
      this.MP.max = this.MP.current;
      this.level++;
      console.log("******** FANFARE ********");
      console.log(this.name + " gained a level");
      //check class
    }
  }
  this.isAlive = function () {
    if (HP >= 1) {
      console.log(this.name + " is Alive");
      return true;
    } else {
      console.log("he ded");
      return false;
    }
  };
}
/********rpg character create when user picks name and class**********************/

////**********Create Class***********************************/
var cClassList = [];
function cClass(name, starting_HP, starting_MP, starting_Strength, starting_Agility, starting_Defense, ability, HP_Up, MP_Up) {
  // console.log(abilitiesList);
  // console.log(arguments);
  this.name = name.toString();
  this.starting_HP = starting_HP;
  this.starting_MP = starting_MP;
  this.starting_Strength = starting_Strength;
  this.starting_Agility = starting_Agility;
  this.starting_Defense = starting_Defense;
  this.ability = ability;
  this.HP_Up = HP_Up;
  this.MP_Up = MP_Up;
}
////*********Create abilities section***********************////
var abilitiesList = [];
createAbilities();
function ability(name, attack_Points, MP_Required) {
  this.name = name;
  this.attack_Points = attack_Points;
  this.MP_Required = MP_Required;
}
function createAbilities() {
  //*--name, attack_points, mp_required
  var hack = new ability("hack", 9, 6);
  var slash = new ability("slash", 12, 7);
  var mug = new ability("mug", 15, 10);
  var arrow = new ability("arrow", 10, 8);
  var throwRock = new ability("throwRock", 15, 12);

  abilitiesList.push(hack, slash, mug, arrow, throwRock);
  saveAbilityList();
}
////*********Create abilities section***********************////
function createClass() {
  // (playerclass,startingHP,startingMP,startingStrength,startingAgility, startingDefence,ability,HPup,MPup)
  var class1 = new cClass("hacker", 50, 5, 50, 20, .30, abilitiesList[0], 0.7, 0.2);
  var class2 = new cClass("slasher", 70, 6, 50, 20, .40, abilitiesList[1], 0.5, 0.2);
  var class3 = new cClass("mugger", 60, 7, 50, 20, .10, abilitiesList[2], 0.3, 0.6);
  var class4 = new cClass("arrower", 100, 8, 50, 20, .30, abilitiesList[3], 0.2, 0.5);
  var class5 = new cClass("rocker", 85, 6, 50, 20, .20, abilitiesList[4], 0.3, 0.4);
  cClassList.push(class1, class2, class3, class4, class5);
  saveCList();
}
createClass();
////**********Create Class***********************************/

////*********Create Monster*********************************/
var mMonsterList = [];
function createMonsters() {
  //("monster",                   strengh,agility,defence,hp,mp,xptogive,abilities)
  var monster1 = new monster("monster1", 100, 50, 0.20, 100, 5, 10, abilitiesList[0]);
  var monster2 = new monster("monster2", 100, 50, 0.10, 100, 5, 10, abilitiesList[1]);
  var monster3 = new monster("monster3", 100, 50, 0.40, 100, 5, 5, abilitiesList[2]);
  var monster4 = new monster("monster4", 100, 50, 0.30, 100, 5, 12, abilitiesList[3]);
  var monster5 = new monster("monster5", 100, 50, 0.35, 100, 5, 15, abilitiesList[4]);

  mMonsterList.push(monster1, monster2, monster3, monster4, monster5);
  saveMonsterList();
}
createMonsters();

////*********Create Monster*********************************/



function saveAbilityList() {
  fs.writeFile("abilities.txt", JSON.stringify(abilitiesList, null, 2), "UTF-8", function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("abilities file written");
    }
  })
}

function saveCList() {
  fs.writeFile("classList.txt", JSON.stringify(cClassList, null, 2), "UTF-8", function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("class file written");
    }
  })
}

function saveMonsterList() {
  fs.writeFile("monsters.txt", JSON.stringify(mMonsterList, null, 2), "UTF-8", function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("monster file written");
    }
  })
}

function saveUser(elUser) { //save user info in txt file
  fs.writeFile("user.txt", JSON.stringify(elUser, null, 2), "UTF-8", function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("\n User file written \n");
      /*start the battle*/
      
      startBattle(elUser, pickMonster());
    }
  })
}


function loadstuff() {
  var characClassList;
  fs.readFile("abilities.txt", "UTF-8", function (err, data) {
    if (err) {
      if (err.errno == -2) {
        console.log("file doesn't exist");
        // createAbilities();
      } else {
        console.log(err);
      }
    } else {
      abilitiesList = JSON.parse(data);
      // console.log(abilitiesList);
      console.log("abilities loaded\n");
      
      inquire(cClassList);
    }
  })
}

loadstuff();
/*------------------------------pick random monster-------------------------------------------*/
var pastMonsters = [];
var pickMonster = function () {
  var selectedMonster;
  if (pastMonsters.length == 5) {
    var Andrew = new monsterBoss("Andrew", 150, 80, 0.50, 200, 10, 20, abilitiesList[0]);
    selectedMonster = Andrew;
    pastMonsters.push(selectedMonster);
    
  } else {
    var randomMonster = Math.floor(Math.random() * mMonsterList.length);
    selectedMonster = mMonsterList[randomMonster];
    mMonsterList.splice(randomMonster, 1); //remove selected monster from list
    // console.log(mMonsterList.length);
    pastMonsters.push(selectedMonster);
  }
  // console.log(pastMonsters);
  return selectedMonster;
}
/*------------------------------pick random monster-------------------------------------------*/


/*-----------------------------function for start of game------------------------------------*/
function inquire(element) {
  
  inquirer.prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "Pick your character name",
      name: "player"
    },
    {
      type: "list",
      message: "Pick your character class",
      choices: function () {
        var choicesarr = [];
        for (ele in element) {
          choicesarr.push(element[ele].name);
        }
        return choicesarr;
      },
      name: "choice"
    }
  ]).then(function (response) {
    // console.log(response.player);
    // console.log(response.choice)
    for (ele in element) {
      if (response.choice == element[ele].name) {
        var user = new rpgCharacter(response.player, element[ele]);
        saveUser(user);

      }
    }
  });
};


/*-----------------------------function for start of game------------------------------------*/
function startBattle(eluser, elmonster) {
  console.log("******** You are now battling " + elmonster.name + " ********");
  inquirer.prompt([{
    type: "list",
    message: "Do you want to attack or use ability?",
    choices: ["Attack", "Magic Ability"],
    name: "fightChoice"
  }]).then(function (response) {
    battleArena(eluser, elmonster, response);
  });
}

function battleArena(user, monster, response) {
  monsterChoose(user, monster);
  var previousMonsterHP = monster.HP.current;
  if (user.HP.current < 0 && monster.HP.current >= 0) {
    console.log("#####-----------YOU LOST THE BATTLE----------#####");
    restartGame();
    return;
  }
  if (response.fightChoice === "Attack") {
    monster.HP.current -= Math.floor((Math.random() * monster.strength * user.cClass.starting_Defense));
    console.log("*** You hit the Monster! and cause it to lose: " + (previousMonsterHP - monster.HP.current) + " HP points. Monster HP is now at: " + monster.HP.current + " ***\n");
    if (monster.HP.current <= 0 && user.HP.current > 0) { //---------check if user won, then level up and pick new monster
      user.xp += monster.xptoGive;
      user.levelUP();
      console.log("\nYour new XP total: " + user.xp);
      console.log("Your new HP total: " + user.HP.current);
      console.log("Your New level: " + user.level);
      if(pastMonsters.length==6){
        console.log("\n ****** YOU HAVE WON THE WAR ******");
        restartGame();
        return;
      }
      saveUser(user);
      console.log("*******************\n");
      // startBattle(user, pickMonster());
    } else {
      startBattle(user, monster)
    }
  }
  if (response.fightChoice === "Magic Ability") {
    // console.log(monster);
    var previousMonsterHP = monster.HP.current; //set previousmonsterhp for future calculation of difference
    if (user.MP.current >= monster.ability.MP_Required) {
      monster.HP.current -= user.cClass.ability.attack_Points;
      console.log("Your magic worked! Monster HP reduced by: " + (previousMonsterHP - monster.HP.current + ". Monster HP is now at: " + monster.HP.current + ". ***"));
    } else {
      user.MP.current -= monster.ability.MP_Required;
      console.log(user.MP.current);
      console.log("Oh no! you don't have enough magic powers. Your MP reduced by: " + (monster.ability.MP_Required) + ". User MP is now at: " + user.MP.current + ". ***");
    }
    startBattle(user, monster);
  }
  // startBattle(user,monster);
}

function monsterChoose(eluser, elmonster) { //-----------monster attack or magic random function--------//
  var previousHP = eluser.HP.current;
  var random = Math.floor(Math.random() * 2); //0 or 1
  if (random == 0) {
    eluser.HP.current -= Math.floor((Math.random() * eluser.strength * elmonster.defence));
    console.log("\n*** Monster attacked you! Your HP reduced by: " + (previousHP - eluser.HP.current) + ". User HP is now at: " + eluser.HP.current + ".  ***")
  } else {
    eluser.HP.current -= elmonster.ability.attack_Points;
    console.log("*** Monster hit you with magic. Your HP reduced by: " + (previousHP - eluser.HP.current) + ". User HP is now at: " + eluser.HP.current + ". ***")
  }
}

function restartGame() {
  inquirer.prompt([{
    type: "list",
    message: "Do you want to restart game?",
    choices: ["Yes", "No"],
    name: "restart"
  }]).then(function (response) {
    if (response.restart === "Yes") {
      pastMonsters=[];
      createMonsters();
      console.log(pastMonsters);
      loadstuff();
    } else {
      console.log("********** GAME OVER *************")
    }
  });
}


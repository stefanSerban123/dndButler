angular.module('dndHelper', [])
  .controller('MainCtrl', function () {
	  var mainCtrl = this;
	  
	  mainCtrl.calcDisplay = "";
	  mainCtrl.players = [];
	  mainCtrl.monsterTable = [];
	  mainCtrl.toggleNewPlayer = false;
	  mainCtrl.toggleNewMonster = false;
	  mainCtrl.newPlayer = "";
	  mainCtrl.newHp = "";
	  mainCtrl.currentRoll = ""; 
	  mainCtrl.rolled = "";
	  mainCtrl.selectedItem;
	  mainCtrl.selectedId;
	  mainCtrl.encounterCounter = 0;
	  mainCtrl.currentTurn = 0;
	  
	  mainCtrl.newMonsterName = "";
	  mainCtrl.newMonsterHp = "";
	  mainCtrl.newMonsterAc = "";
	  mainCtrl.newMonsterAttack = "";
	  mainCtrl.newMonsterDesc = "";
	  
	  var selected = "selected";
	  var currentTurnSelector = "currentTurn";
	
	  var monster = function (name, hp, ac, attack, desc) {
		  return { name: name, 
				   value:0, 
				   totalHp: hp, 
				   ac: ac, 
				   currentHp: hp, 
				   attack: attack, 
				   desc: desc
			};
	  };
	  
	  var initMonsters = function () {
		  mainCtrl.monsterTable.push(monster("Commoner", 4, 10, 2, "Club. Melee Weapon Attack: 1d4"));
		  mainCtrl.monsterTable.push(monster("Cultist", 9, 12, 3, "Scimitar. Melee Weapon Attack. Dmg (1d6 + 1) "));
		  mainCtrl.monsterTable.push(monster("Gnoll", 22, 15, 4, "Bite: +4 hit, (1d4 + 2) piercing damage, Spear. Melee or Ranged. +4 to hit, Dmg (1d6 + 2) or (1d8 + 2) if used with two hands to make a melee attack."));
		  mainCtrl.monsterTable.push(monster("ZombieDude", 20, 10, 2, "Lunge + BRAAAINS!! Melee, DEX save, -4 INT untill rest, 2dmg"));
		  mainCtrl.monsterTable.push(monster("Thug", 32, 11, 4, "Mace. Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) bludgeoning damage."));
	  };
	
	  var player = function (name, hp) {
		  return { name: name, value: 0, totalHp: hp, currentHp: hp };
	  };
	  
	  // TODO: cookies
	  // TODO: auto sort players + monsters initiative list $watch
	  	  
	  mainCtrl.selecty = function (item, id) {
		var prevEl =  angular.element( document.querySelector('#' + mainCtrl.selectedId) );
		var state = prevEl.hasClass(selected);
		
		prevEl.removeClass(selected); 
		mainCtrl.selectedItem = null;
		
		if (mainCtrl.selectedId != id || !state) {
			var myEl = angular.element( document.querySelector('#' + id) );
			myEl.addClass(selected);
		}
		
		mainCtrl.selectedId = id;
		mainCtrl.selectedItem = item;
	  };
	  
	  mainCtrl.roll = function (val) {
		 if (val == '>>') {
			 mainCtrl.selectedItem.value =  mainCtrl.currentRoll;
			 return;
		 }
		  
		 mainCtrl.currentRoll = Math.floor(Math.random() * val) + 1;
		 mainCtrl.rolled = 'd' + val + ': '
	  };
	  
	  mainCtrl.saveNewPlayer = function () {
		  mainCtrl.players.push(player(mainCtrl.newPlayer, mainCtrl.newHp));
		  mainCtrl.toggleNewPlayer = false;
		  mainCtrl.newPlayer="";
		  
		  mainCtrl.encounterCounter++;
	  };
	  
	  mainCtrl.removePlayer = function (index) {			
		mainCtrl.players.splice(index, 1); 
		mainCtrl.encounterCounter--;
	  };
	    
	mainCtrl.saveNewMonster = function () {
		  mainCtrl.monsterTable.push(monster(mainCtrl.newMonsterName, mainCtrl.newMonsterHp, mainCtrl.newMonsterAc, mainCtrl.newMonsterAttack, mainCtrl.newMonsterDesc));
		  mainCtrl.toggleNewMonster = false;
	
		mainCtrl.newMonsterName = "";
		mainCtrl.newMonsterHp = "";
		mainCtrl.newMonsterAc = "";
		mainCtrl.newMonsterAttack = "";
		mainCtrl.newMonsterDesc = "";
	};
	
	mainCtrl.nextTurn = function () {
		var prevEl =  angular.element( document.querySelector('#u' + ( mainCtrl.currentTurn - 1 )) );
		prevEl.removeClass(currentTurnSelector); 
		
		if (mainCtrl.currentTurn == mainCtrl.encounterCounter) {
			mainCtrl.currentTurn = 0;
			return;
		}
		
		var currentEl = angular.element( document.querySelector('#u' + mainCtrl.currentTurn) );
		currentEl.addClass(currentTurnSelector);
		
		mainCtrl.currentTurn++;
	};
	  
	  
	  mainCtrl.removeMonster = function (name) {
		  for(let i = 0; i < mainCtrl.monsterTable.length; i++){ 
			   if (mainCtrl.monsterTable[i].name === name) {
				  mainCtrl.monsterTable.splice(i, 1); 
			   }
			}
	  };
	  
	  mainCtrl.sortTable = function () {
		  mainCtrl.players = mainCtrl.players.sort(
				function(a, b){
					return +b.value - +a.value;
				});
	  };
	  
	  mainCtrl.addMonsterToEncounter = function (monster) {
		mainCtrl.players.push(angular.copy(monster));  
		mainCtrl.encounterCounter++;
	  };
	  
	  mainCtrl.increaseHp = function (player) {
		if (player.currentHp == player.totalHp) {
			return;
		}  
		
		player.currentHp++;
	  };
	  
	  mainCtrl.decreaseHp = function (player) {
		if (player.currentHp == 0) {
			return;
		}  
		
		player.currentHp--;
	  };
	  
	  mainCtrl.toCalc = function (i) {
		  if (i ==">>") {
			  mainCtrl.selectedItem.value =  mainCtrl.calcDisplay;
			  return;
		  }
		  
		  if (i=="=") {
			  var res = eval(mainCtrl.calcDisplay);
			  
			  mainCtrl.calcDisplay = res;
			  return;
		  }
		  
		  if (i=="C") {
			  mainCtrl.calcDisplay = "";
			  return;
		  }
		  
		  
		  
		  mainCtrl.calcDisplay += i;
		  
	  };
	  
	  initMonsters();
  });
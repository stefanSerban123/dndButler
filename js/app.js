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
		  return { name: name, value:0, totalHp: hp, ac: ac, currentHp: hp, attack: attack, desc: desc, ordinal: 1}
	  };
	  
	  var initMonsters = function () {
		  mainCtrl.monsterTable.push(monster("Human", 10, 8, 4, "Typical human npc. Has shortsword d8+1")); 
		  mainCtrl.monsterTable.push(monster("LockBoss", 20, 15, 4, "Burning Hands: DEX save 3d6 dmg on fail, half on success. Eldritch Blast 1d10 dmg +2Att")); 
		  mainCtrl.monsterTable.push(monster("Zombie", 1, 10, 2, "Lunge: +2Att 1d4?dmg")); 
		  mainCtrl.monsterTable.push(monster("ZombieChief", 20, 10, 2, "Lunge + BRAAAINS!! Melee, DEX save, -4 INT untill rest, 2dmg"));
	  };
	
	  var player = function (name, hp) {
		  return { name: name, value: 0, totalHp: hp, currentHp: hp };
	  };
	  
	  // TODO: cookies
	  // TODO: auto sort players + monsters initiative list $watch
	  // TODO: monster table
	  // TODO: player table becomes encounter table (should be main)
	  // name initiative hp 
	  // same for both players and monsters
	  
	  
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
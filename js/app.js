angular.module('dndHelper', [])
  .controller('MainCtrl', function () {
	  var mainCtrl = this;
	  
	  mainCtrl.calcDisplay = "";
	  mainCtrl.players = [];
	  mainCtrl.toggleNewPlayer = false;
	  mainCtrl.newPlayer = "";
	  mainCtrl.currentRoll = ""; 
	  mainCtrl.rolled = "";
	  mainCtrl.selectedItem;
	  mainCtrl.selectedId;

	  
	  var selected = "selected";
	  
	  var player = function (name) {
		  return { name: name, value: 0 };
	  };
	  
	  // TODO: cookies
	  // TODO: auto sort players + monsters initiative list $watch
	  // TODO: monster table
	  // TODO: player table becomes encounter table (should be main)
	  // name initiative hp 
	  // same for both players and monsters
	  
	  
	  mainCtrl.selecty = function (item, id) {
		var prevEl =  angular.element( document.querySelector('#' + mainCtrl.selectedId) );
		prevEl.removeClass(selected); 
		mainCtrl.selectedItem = null;
		 
		if (mainCtrl.selectedId != id) {
			var myEl = angular.element( document.querySelector('#' + id) );
			myEl.addClass(selected);
		
			mainCtrl.selectedId = id;
			mainCtrl.selectedItem = item;
		}
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
		  mainCtrl.players.push(player(mainCtrl.newPlayer));
		  mainCtrl.toggleNewPlayer = false;
		  mainCtrl.newPlayer="";
	  };
	  
	  mainCtrl.removePlayer = function (name) {
		  for(let i = 0; i < mai.nCtrl.players.length; i++){ 
			   if (mainCtrl.players[i].name === name) {
				  mainCtrl.players.splice(i, 1); 
			   }
			}
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
	  
  });
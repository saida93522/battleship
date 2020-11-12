var view = {
    displayMessage: function(msg){
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg
    },

    displayHit: function(location){
        var cell = document.getElementById(location)
        cell.setAttribute("class", "hit")
    },

    dipslayMiss:function(location){
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss")
    }
}

var model = {
    boardSize: 7,  //size of the grid used for the board
    numShips:3, //number of ships in the game
    shipLength: 3, //the number of location in each ship , 3
    shipsSunk: 0, //keeps the current number of ships that have been sunk by the player

    ships:[ {locations: [0,0,0],hits:["","",""] },
            {locations: [0,0,0],hits:["","",""] },
            {locations: [0,0,0],hits:["","",""]} ],

    fire: function(guess) { //turns a players guess into a hit or miss
        for(var i = 0; i < this.numShips; i++){
            var ship = this.ships[i]
            var index = ship.locations.indexOf(guess)
            if (index >=0) {
               ship.hits[index] = "hit"
               view.displayHit(guess);
               view.displayMessage("HIT!")              
               if (this.isSunk(ship)) {
                   view.displayMessage("You sank my battleship!")
                   this.shipsSunk++
               }
               return true; 
            }
        }
        view.displayMessage(guess);
        view.displayMessage("You missed.")
        return false;
},
    isSunk: function (ship){
        for (let i = 0; i < this.shipLength; i++) {
            if(ship.hits[i]){
                return false;
            }
        }
        return true;
    },

    generateShipLocations: function (){
    var locations;

    for (var i = 0; i < this.numShips; i++) {
        do {
            locations = this.generateShipLocations();
        } while (this.collision(locations));
        this.ships[i].locations = locations        
    }
},
    generateShip:function(){
    var direction = Math.floor(Math.random()* 2);
    var row;
    var col;

    if (direction === 1) {
        // generate a starting location for horizontal ship
        row = Math.floor(Math.random() * this.boardSize)
        col =  Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)))
    } else {
        // generate a starting location for vertical ship
        row = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)))
        col = Math.floor(Math.random() * this.boardSize)

    }
    var newShipLocations = [];

    for (let i = 0; i < this.shipLength; i++) {
        if (direction === 1) {
            newShipLocations.push(row+ "" + (col + i));
            
        } else {
            newShipLocations.push((row + i) + "" + col)
        }
        
        }
        return newShipLocations
    },
    collision: function (locations){
        for (let i = 0; i < this.numShips; i++) {
            var ships = this.ships[i];
            for (let j = 0; j < locations.length; j++) {
                if(ship,locations.indexOf(locations[j]) >= 0){
                    return true;
                }                
            }
        }
        return false;

    }
};

var controller = {
    guesses: 0,

    processGuess: function (guess){
        var location = parseGuess(guess)
        if(location) {
            this.guesses++;
            var hit = model.fire(location);
            if(hit && model.shipsSunk === model.numShips){
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses" )
            }

        }

    }
}

 function parseGuess (guess){
    var alphabet = ['A','B','C','D','E','F','G'] 

    if (guess === null || guess.length !== 2) {
        alert('Oops, please enter a letter and a number on the board.')
    }else{
        var firstChar = guess.charAt(0);
        var row = alphabet.indexOf(firstChar);
        var column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.")
        } else if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
            alert ("Oops, that's off the board!")
        }else{
            return row + column;
        }
    }
    return null;
}

function init(){
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;

    model.generateShipLocations();
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if(e.keyCode === 13){
        fireButton.click();
        return false;
    }
}

function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);

    guessInput.value = ""

}
window.onload = init





// controller.processGuess("A0");

// controller.processGuess("A6");
// controller.processGuess("B6");
// controller.processGuess("C6");

// controller.processGuess("C4");
// controller.processGuess("D4");
// controller.processGuess("E4");

// controller.processGuess("B0");
// controller.processGuess("B1");
// controller.processGuess("B2");


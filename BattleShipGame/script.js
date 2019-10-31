window.onload = initialized;

let view = {
    displayMessage: function (msg) {
        let messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    },
};

let model = {
    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLength: 3,
    ships: [{locations: [0, 0, 0], hits: ["", "", ""]},
            {locations: [0, 0, 0], hits: ["", "", ""]},
            {locations: [0, 0, 0], hits: ["", "", ""]}],
    fire: function (guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (ship.hits[index] === "hit") {
                alert("Вы уже стреляли по этой клетке!");
                return true;
            }
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("Попадание!");
                if (this.isSunk(ship)) {
                    alert("Поздравляю, капитан! Вы потопили корабль!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("Промах");
        return false;
    },
    isSunk: function (ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },
    generateLocationShips: function () {
        let locations;
        for (let i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    },
    generateShip: function () {
        let direction = Math.floor(Math.random() * 2);
        let row, col;
        if (direction === 1) {
            row = Math.floor(Math.random() * (this.boardSize-1));
            col = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
        } else {
            col = Math.floor(Math.random() * (this.boardSize -1));
            row = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
        }
        let newShipLocations = [];
        for (let i = 0; i < this.numShips; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((col + i) + "" + row);
            }
        }
        return newShipLocations;
    },
    collision: function (locations) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = model.ships[i];
            for (let j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }
};

let controller = {
    guesses: 0,
    processGuess: function (guess) {
        let location = parseGuess(guess);
        if (location) {
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                alert("Вы потопили все корабли за " + "<" + this.guesses +">"+ " попыток.");
            }
        }
    }
};

function parseGuess(guess) {
    let alphabet = ["A", "B", "C", "D", "E", "F", "G",];
    if (guess === null || guess.length < 2 || guess.length > 3) {
        alert("Упс! Некорректное значение поля доски.");
    } else {
        let firstChar = guess.charAt(0);
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt(1);
        if (isNaN(row) || isNaN(column) || row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("Упс! Некорректное значение поля доски.");
        } else {
            return row + column;
        }
    }
    return null;
}

function initialized() {
    let fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    model.generateLocationShips();
}

function handleFireButton() {
    let guessInput = document.getElementById("userInput");
    let guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
}


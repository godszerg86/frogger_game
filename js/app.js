//global variables
let level = 1;
let popsUp = false;


// Enemies our player must avoid
var Enemy = function (x, y, level) {
    this.x = x;
    this.y = y;
    this.speed = 50 + (Math.random() * level);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    if (!popsUp) {
        this.x += dt * this.speed;
        if (this.x >= 505) {
            this.x = -101;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


const Player = function () {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';

    this.update = function (newX, newY) {
        if (!popsUp) {
            this.x += newX;
            this.y += newY;
        }

    };
    this.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    };
    this.handleInput = function (keyPressed) {
        let moveY = 87.5; // row width
        let moveX = 100;


        if (keyPressed === 'up') {
            this.update(0, -moveY);
        };
        if (keyPressed === 'down' && player.y !== 400) {
            this.update(0, +moveY);
        };
        if (keyPressed === 'left' && player.x !== 0) {
            this.update(-moveX, 0);
        };
        if (keyPressed === 'right' && player.x !== 400) {
            this.update(moveX, 0);
        };
    };

};


// Now instantiate your objects.
//top bugs
const bug1 = new Enemy(-101, 50, 100);
// middle line bugs
const bug2 = new Enemy(-101, 137.5, 100);
// bottom line bugs
const bug3 = new Enemy(-101, 225, 100);



// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [bug1, bug2, bug3];
const player = new Player();;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// levelUp IIFE, add new bug with a random speed on a line.
const levelUp = (function () {
    let levelDifficulty = 200;
    let x = -101;
    let y = 225;
    let counter = 1;
    return () => {
        level++;
        document.querySelector('#lvl-count').innerText = level;
        allEnemies.push(new Enemy(x, y, levelDifficulty));
        levelDifficulty += 30;
        if (counter === 3) {
            y = 225;
            counter = 1;
        } else
            y -= 87.5;
        counter++;
    }
}());

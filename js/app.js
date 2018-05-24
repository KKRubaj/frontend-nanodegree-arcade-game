// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -101;
    this.y = y;
    //random speed for enemy
    this.speed = Math.floor(Math.random() * (200 - 50)) + 50;
    this.sprite = 'images/enemy-bug.png';
    this.width = 80;
    this.height = 70;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + (this.speed * dt);
    if (this.x > 505) {
        this.x = -101;
    }



     this.y = 60;
     for (var i = 0; i < allEnemies.length; i++) {
         allEnemies[0].y = this.y;
         allEnemies[i].y += 85;

         if (allEnemies[i].y > 230) {
             allEnemies[i].y = 60;
         }
     }

     this.checkCollision(player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function(player) {


    //https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection
    // enemy.width, player.width = 80;
    // enmey.height, player.height = 70;

    // druga wersja niedoskonała
        for ( var i = 0; i < allEnemies.length; i++) {
            if (allEnemies[i].x < player.x + 80 &&
                allEnemies[i].x + 80 > player.x  &&
                allEnemies[i].y < player.y + 70/3 &&
                70/3 + allEnemies[i].y > player.y) {

                player.reset();
            }
        }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.width = 80;
    this.height = 70;
};

Player.prototype.update = function() {
    // this.x = 202;
    // this.y = 400;
};

Player.prototype.reset = function() {
     this.x = 202;
     this.y = 400;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if (this.x > 0) {
                this.x = this.x - 101;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x = this.x + 101;
            }
            break;
        case 'up':
            if (this.y > 60) {
                this.y = this.y - 85;
            }else {
                this.reset();
                // increase score np. score++;
            }
            break;
        case 'down':
            if (this.y < 400) {
                this.y = this.y + 85;
            }
            break;
        default:
            break;
    }

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(202, 400);

var allEnemies = new Array();

 for ( var i = 0; i < 5; i++) {
   var enemy = new Enemy();
   allEnemies.push(enemy);
   console.log(allEnemies);
 }

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

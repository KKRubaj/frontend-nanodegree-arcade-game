// Enemies our player must avoid
var Enemy = function(x, y) {

    this.x = -101;
    this.y = y;
    //random speed for enemy
    this.speed = Math.floor(Math.random() * (160 - 50)) + 50;
    this.sprite = 'images/enemy-bug.png';
    this.width = 80;
    this.height = 70;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x = this.x + (this.speed * dt);
    if (this.x > 505) {
        this.x = -101;
    }

    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.checkCollision = function() {
    if (player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.height + player.y > this.y) {

          player.updateLives();
          player.reset();
    }
};


var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';
    this.width = 80;
    this.height = 70;
    this.score = 0;
    this.lives = 3;
};

Player.prototype.update = function() {

};
// the player returns to the starting field
Player.prototype.reset = function() {
     this.x = 202;
     this.y = 400;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// update the score on the screen
Player.prototype.updateScore = function() {
    this.score += 50;
    document.querySelector('.score strong').textContent = this.score;
};

// update the number of lives on the screen
Player.prototype.updateLives = function() {
    this.lives -= 1;
    this.score -= 10;
    document.querySelector('.lives strong').textContent = this.lives;
    document.querySelector('.score strong').textContent = this.score;

    if (this.lives === 0) {
        this.gameOver();
    }
};

//game over and display the modal
Player.prototype.gameOver = function() {

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that user can play again
    var modalBtn = document.getElementById("modalBtn");

    // Get the <span> element that closes the modal
    var modalSpan = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    //display the result on the modal
    document.querySelector('.modal-score span').textContent = this.score;

    // When the user clicks on <span> (x), close the modal
    modalSpan.addEventListener('click', function() {
        modal.style.display = "none";
        window.location.reload();
    });

    // When the user clicks on button (Play again), close the modal and restart game
    modalBtn.addEventListener('click', function() {
        modal.style.display = "none";
        window.location.reload();
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            window.location.reload();
        }
    });
    //block the player when the modal is displayed
    document.removeEventListener('keyup', keyPress);

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
                this.updateScore();
                this.reset();
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

var allEnemies = [];

    for ( var i = 0; i < 5; i++) {
        var enX = -101;
        var enY = [60,145,230][Math.floor(Math.random() * 3)];
        var enemy = new Enemy(enX, enY);
          console.log(enemy);
        allEnemies.push(enemy);
        console.log(allEnemies);
    }

function keyPress(e) {
   var allowedKeys = {
       37: 'left',
       38: 'up',
       39: 'right',
       40: 'down'
   };

   player.handleInput(allowedKeys[e.keyCode]);
}

document.addEventListener('keyup', keyPress);

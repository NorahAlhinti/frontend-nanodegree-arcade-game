//Enemies Class
//Enemies the player must avoid
var Enemy = function(x , y , speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Updates the Enemy location 
    this.x = this.x + this.speed * dt;
    //Let Enemies move again from start
    if(this.x > 500) {
        this.x = 0;
        this.speed = ( Math.random() * (max - min) + min);
    }
    /*
    if(rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y){
    // collision detected!
    from https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection}
    */
    //Handles collision with the Player and Enemies (this)
    if(player.x < this.x + 70 &&  player.x + 40 > this.x && player.y < this.y + 30 && 40 + player.y > this.y ) {
        player.x = 200;
        player.y = 300;
    }
};

//Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player Class
var Player = function(x , y , score) {
    // Variables applied to each instance
    this.x = x;
    this.y = y;
    this.score = score;
    // The image/sprite for palyer
    this.sprite = 'images/char-pink-girl.png';
};

//Update Player function
Player.prototype.update = function() {
    //Avoid the boundaries
    if(this.y > 400) {
        this.y = 400;
    }
    if(this.x > 400) {
        this.x = 400;
    }
    if(this.x < 0) {
        this.x = 0;
    }

    //If the Player Win (reach the water), Go back to the start point
    if(this.y < 0) {
        this.x = 200;
        this.y = 300;
    }
}
//Render Player function
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//handleInput Player function
Player.prototype.handleInput = function(keyCode) {   
    if(keyCode === 'left')
        this.x -= 100;
    else if(keyCode === 'up')
        this.y -= 80;
    else if(keyCode === 'right')
        this.x += 100;
    else if(keyCode === 'down')
        this.y += 80;
}


//Now instantiate your objects.
//All enemy objects in an array called allEnemies
var allEnemies = [];
//Y posiotions for the three enemies on the canvas
var enemiesYPositions = [50, 130, 230];
var player = new Player(200, 300, 0);
var max = 150;
var min = 50;
for(var i = 0 ; i < 3 ; i++){
    var enemy = new Enemy(0,enemiesYPositions[i],( Math.random() * (max - min) + min) );
    //push to allEnemies array
    allEnemies.push(enemy);
}

//This listens for key presses and sends the keys to your
//Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

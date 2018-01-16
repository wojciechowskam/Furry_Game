var Furry = require('./furry.js');
var Coin = require('./coin.js');


function Game() {
    var self = this;


    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.index = function(x, y) {
        return x + (y * 10);
    }

    this.showFurry = function() {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
    }


    this.showCoin = function() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
    }

    this.startGame = function() {
        this.idSetInterval = setInterval(function() {
            self.moveFurry();
        }, 350);
    }


    this.moveFurry = function() {
        this.hideVisibleFurry(); //zamiast do showFurry bo tam nie ma klasy .furry
        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y + 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y - 1;
        }
        this.gameOver()
        this.showFurry();
        this.checkCoinCollision();

    }

    this.hideVisibleFurry = function() {
        document.querySelector('.furry').classList.remove("furry");
    }

    this.turnFurry = function(event) { //turn furry
        switch (event.which) {
            case 37:
                this.furry.direction = "left";
                break;
            case 38:
                this.furry.direction = "down";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 40:
                this.furry.direction = "up";
                break;
                //default:
        }
    }
    //obserwacja eventu keydown
    document.addEventListener('keydown', function(event) {
        self.turnFurry(event);
    });

    this.checkCoinCollision = function() {
        if (this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
            document.querySelector('.coin').classList.remove('coin');

            var counter = document.querySelector('strong');
            this.score++;
            counter.innerHTML = this.score;

            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = function() {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);

            this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');

            document.querySelector('#board').classList.add('invisible');
            document.querySelector('#score').classList.add('invisible');
            document.querySelector('#over').classList.remove('invisible');

            var pre = document.createElement('pre');
            document.querySelector('#over').appendChild(pre);
            pre.innerHTML = this.score;
            document.querySelector('#over pre').innerHTML ="GAME OVER" + " " + "YOUR SCORE" + " " + this.score;

            this.hideVisibleFurry()

        }
    };
};


var game = new Game();
game.showFurry();
game.showCoin();
game.startGame();

module.exports = Game;

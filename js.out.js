/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Furry = __webpack_require__(1);
var Coin = __webpack_require__(2);


function Game() {
    var self = this;
    this.speed = 350;

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
        }, this.speed);
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
            case 39: //zmiana
                this.furry.direction = "right";
                break;
            case 38: //zmiana
                this.furry.direction = "down";
                break;
            case 40:
                this.furry.direction = "up";
                break;
            default:
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var Furry = function() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}
module.exports = Furry;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var Coin = function () {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}
module.exports = Coin;


/***/ })
/******/ ]);

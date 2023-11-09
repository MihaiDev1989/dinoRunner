const dinno = document.getElementById("dinno");
const dinnoEnemy = document.getElementById("dinnoEnemy");
const background = document.querySelector(".dinno_runner_background");
const scoreElement = document.getElementById("score");
const dinnoDead = document.getElementById("dinnoDead");
const gameOver = document.getElementById("gameOver");
const restart = document.getElementById("restart");
const windowInnerWidth = window.innerWidth;

let imageNumber = 0;
let animationNumber = 0;
let backgroundInterval = 0;
let enemyInterval = 0;
let deadInterval = 0;
let score = 0;

let bottom = 0
let gravity = 0.9
let isJumping = false

document.addEventListener('keyup', control);

window.addEventListener("load", () => {
    animationStart();
    animationBackground();
    animationEnemy();
});

restart.addEventListener("click", function () {
    location.reload();
})

function dinnoJump() {
    if (isJumping) return;
    let upTimerId = setInterval(function () {
        //jump down
        if (bottom > 268) {
            clearInterval(upTimerId)
            let downTimerId = setInterval(function () {
                if (bottom < 0) {
                    clearInterval(downTimerId)
                    isJumping = false
                }
                bottom -= 5
                bottom = bottom * gravity
                dinno.style.bottom = bottom + 'px'
            }, 20)
        }
        //jump up
        isJumping = true
        bottom += 30
        bottom = bottom * gravity
        dinno.style.bottom = bottom + 'px'
    }, 20)
}

function dinnoRunn() {
    imageNumber += 1;
    if (imageNumber === 8) {
        imageNumber = 1;
    }
    dinno.src = "./image/dinno_run_" + imageNumber + ".png";
    updateScore();
}

function animationStart() {
    animationNumber = setInterval(dinnoRunn, 200);
}

function animationBackground() {
    var x = 0;
    backgroundInterval = setInterval(function () {
        x -= 1;
        background.style.backgroundPosition = x + 'px 0';
    }, 10);
}

function animationEnemy() {
    var x = 0;
    enemyInterval = setInterval(function () {
        x += 1;
        dinnoEnemy.style.right = x + 'px';

        const dinnoEnemyPosition = dinnoEnemy.getBoundingClientRect();
        let dinnoEnemyPositionTop = dinnoEnemyPosition.top;
        let dinnoEnemyPositionRight = dinnoEnemyPosition.right;
        let dinnoEnemyPositionBottom = dinnoEnemyPosition.bottom;
        let dinnoEnemyPositionLeft = dinnoEnemyPosition.left;

        const dinnoPosition = dinno.getBoundingClientRect();
        let dinnoPositionTop = dinnoPosition.top;
        let dinnoPositionRight = dinnoPosition.right;
        let dinnoPositionBottom = dinnoPosition.bottom;
        let dinnoPositionLeft = dinnoPosition.left;

        if (dinnoEnemyPositionLeft < dinnoPositionRight - 13 && dinnoEnemyPositionTop < dinnoPositionBottom && dinnoEnemyPositionRight > dinnoPositionLeft + 50 && dinnoEnemyPositionBottom > dinnoPositionTop) {
            clearInterval(animationNumber);
            clearInterval(backgroundInterval);
            clearInterval(enemyInterval);
            dinno.style.display = "none";
            dinnoEnemy.style.display = "none";
            dinnoDead.style.display = "block"
            let enemyNumPhoto = 0;
            deadInterval = setInterval(function () {
                enemyNumPhoto += 1;
                dinnoDead.src = "./image/dino_dead_" + enemyNumPhoto + ".png";
                if (enemyNumPhoto > 7) {
                    clearInterval(deadInterval);
                    gameOver.style.display = "flex";
                }
            }, 100);
        }
        if (windowInnerWidth === x) {
            x = 0
        }
    }, -1);
}

function control(e) {
    if (e.keyCode === 32) {
        dinnoJump()
    }
}

function updateScore() {
    score += 1;
    scoreElement.innerHTML = Math.floor(score)
}
const body = document.querySelector("body");
const leftPaddle = document.querySelector(".left");
const rightPaddle = document.querySelector(".right");
const board = document.querySelector(".board");
const ball = document.querySelector(".ball");
const boardData = board.getBoundingClientRect();
const boardTop = boardData.top;
const boardBottom = boardData.bottom;
const boardRight = boardData.right;
const boardLeft = boardData.left;
let xd = true;
let yd = true;
let leftPlayerLife = 3;
let rightPlayerlife = 3;
body.addEventListener("keydown", function (e) {
    // console.log(e);
    if (e.key == "w") {
        // move left paddle up in bounds
        move(leftPaddle, -60);
    } else if (e.key == "s") {
        move(leftPaddle, 60);
        // move left paddle down in bounds
    }
    else if (e.key == "ArrowUp") {
        move(rightPaddle, -60);
        // move right paddle up in bounds
    } else if (e.key == "ArrowDown") {
        // move right paddle down in bounds
        move(rightPaddle, 60);
    }
})
function move(cPaddle, delta) {
    let { top } = cPaddle.getBoundingClientRect();
    let finalTop = top + delta;
    if (delta > 0 && finalTop >= boardBottom) {
        return;
    }
    else if (finalTop <= boardTop) {
        return;
    }

    cPaddle.style.top = finalTop + "px";

}



function MoveBall() {
    // ******************did ball touched the walls*******************************
    // ***********************************************
    let ballPosCord = ball.getBoundingClientRect();
    let leftPaddleCord = leftPaddle.getBoundingClientRect();
    let rightPaddleCord = rightPaddle.getBoundingClientRect();
    let leftOfBall = ballPosCord.left;
    let bottomOfBall = ballPosCord.bottom;
    let rightOfBall = ballPosCord.right;
    let topOfBall = ballPosCord.top;
    let hasLeftWallTouched = ballPosCord.left < boardLeft;
    let hasrightWallTouched = ballPosCord.right > boardRight;
    if (hasLeftWallTouched || hasrightWallTouched) {
        if (hasrightWallTouched) {
            rightPlayerlife--;
            setColor(rightPlayerlife + 3);
            if (rightPlayerlife == 0) {
                body.style.background = "gray";
                alert("Game Over Player 1️⃣ won 🎉🎉");
                document.location.reload();
                return;
            } else {
                reset(ball);
                return;
            }
        } else {
            leftPlayerLife--;
            setColor(leftPlayerLife);
            if (leftPlayerLife == 0) {
                body.style.background = "gray";
                alert("Game Over Player 2️⃣ won 🎉🎉");
                document.location.reload();
                return;
            } else {
                reset(ball);
                return;
            }
        }
    }
    // 
    if (topOfBall <= boardTop || bottomOfBall >= boardBottom) {
        yd = !yd
    }
    if (leftOfBall <= leftPaddleCord.right && rightOfBall >= leftPaddleCord.left && topOfBall >= leftPaddleCord.top - 15 && bottomOfBall <= leftPaddleCord.bottom + 15) {
        xd = !xd;
    }
    if (leftOfBall <= rightPaddleCord.right && rightOfBall >= rightPaddleCord.left && topOfBall >= rightPaddleCord.top - 15 && bottomOfBall <= rightPaddleCord.bottom + 15) {
        xd = !xd;
    }
    ball.style.top = yd == true ? (topOfBall - 4) + "px" : (topOfBall + 4) + "px";
    ball.style.left = xd == true ? (leftOfBall - 6) + "px" : (leftOfBall + 6) + "px";
    // console.log(ball.style.top,ball.style.left)
    requestAnimationFrame(MoveBall);
}
function reset(ball) {
    ball.style.top = window.innerHeight * 0.45 + "px";
    ball.style.left = window.innerWidth * 0.5 + "px";
    requestAnimationFrame(MoveBall);
    initx = 6;
}
function setColor(idx) {
    let colors = document.querySelectorAll(".fa-circle");
    colors[idx].style.color = "#686de0";
}
alert("Are you Ready🚀🚀");
requestAnimationFrame(MoveBall)
init
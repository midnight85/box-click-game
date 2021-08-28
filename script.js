let startBtn = document.getElementById("start");
let gameArea = document.getElementById("game");
let inputTime = document.getElementById("game-time");
let timeHeader = document.getElementById("time-header");
let resultHeader = document.getElementById("result-header");
// console.log(resultHeader.querySelector('#result').textContent = '323');
let gameTime = document.getElementById("time");
let action = false;
let score = 0;
// console.log(inputTime);

document.addEventListener("DOMContentLoaded", () => {
    setTime();

    inputTime.addEventListener("change", (e) => {
        setTime();
        show(timeHeader);
        hide(resultHeader);
    });
});

function show(elem) {
    elem.classList.remove("hide");
}
function hide(elem) {
    elem.classList.add("hide");
}

if (startBtn) {
    startBtn.addEventListener("click", startGame);
    
}

function startGame() {
    action = true;
    score = 0;
    inputTime.setAttribute("disabled", "true");
    hide(startBtn);
    gameArea.style.backgroundColor = "#fff";
    renderBox(getRandom(20, 100));
    gameArea.addEventListener("click", boxClick);
    gameTimer();
    show(timeHeader);
    hide(resultHeader);
}
function endGame() {
    setTime();
    action = false;
    hide(timeHeader);
    show(resultHeader);
    resultHeader.querySelector("#result").textContent = score;
    gameArea.innerHTML = "";
    gameArea.style.backgroundColor = "#ccc";
    show(startBtn);
    inputTime.removeAttribute("disabled");
}

function gameTimer() {
    let timer = setInterval(() => {
        let time = parseFloat(gameTime.textContent);
        if (time <= 0) {
            clearInterval(timer);
            endGame();
        } else {
            gameTime.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);
}

function setTime() {
    gameTime.textContent = parseFloat(inputTime.value).toFixed(1);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function boxClick(e) {
    if (action) {
        if (e.target.className == "box") {
            score++;
            renderBox(getRandom(20, 100));
        }
    }
}

function renderBox(size) {
    gameArea.innerHTML = "";
    let box = document.createElement("div");
    gameArea.append(box);
    box.className = "box";
    box.style.position = "absolute";
    box.style.cursor = "pointer";
    box.style.height = box.style.width = size + "px";
    box.style.backgroundColor = `rgb(${getRandom(0,255)},${getRandom(0,255)},${getRandom(0,255)}`;
    box.style.top = getRandom(0, gameArea.offsetHeight - size) + "px";
    box.style.left = getRandom(0, gameArea.offsetHeight - size) + "px";
}

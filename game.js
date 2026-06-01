var GAME = {
    width: window.innerWidth,
    height: window.innerHeight,
    background: "./res/background.png",
    score: 0,
    isGameRunning: false,
    lives: 1 //добавила жизни
}

//var BALLS = []; //объединила шарики в массив

var IMAGES = []; //создала массив для хранения изображений вместо шариков

//добавляем пути к изображениям в массиве + добавляем тип элемента - проигрыш или выигрыш
var IMAGE_PATHS = [
    {path: "./res/apple.png", type: "win"},
    {path: "./res/banana.png", type: "win"},
    {path: "./res/bomb.png", type: "lose"},
    {path: "./res/donat.png", type: "win"},
    {path: "./res/gang.png", type: "lose"},
    {path: "./res/purple.png", type: "lose"}
];

var ITEMS = []; //создание массива для хранения миньона

var MINION = {
    color: "#150061",
    x: 0,
    y: 520,
    width: 150,
    height: 120,
    xDirection: 10,
    img: new Image,
}
MINION.img.src = "./res/minion.png"

var canvas = document.getElementById("canvas") //рисовка холста
canvas.width = GAME.width;
canvas.height = GAME.height;

var canvasContext = canvas.getContext('2d')

var isStart = false; //это должно быть стартовое меню

var MENU_BUTTON = {  //добавляем меню
    x: 1500,
    y: 45,
    radius: 25,
 }

 var CONTINUE_BUTTON = {
    x: 650,
    y: 150,
    width: 200,
    height: 50,
 }

 var RESTART_BUTTON = {
    x: 6,
    y: 210,
    width: 200,
    height: 50,
 }
 

//загружаем изображения
IMAGE_PATHS.forEach((path) => {
    var img = new Image();
    img.onload = () => {
        IMAGES.push({img: img, type: path.type});
    };
    img.src = path.path;
});

var drawStatus; //переменная которая хранит состояние отрисовки

var AUDIO = {
    src: new Audio('./audio/soundTrack.mp3'),
    audioIsOn: true,
 }
 
 var STARTMENU = {
    x: 400,
    y: 210,
    width: 200,
    height: 50,
    message: 'START'
}
var RELOADBUTTON = {
    x: 465,
    y: 330,
    width: 70,
    height: 70,
    radius: 70,
    img: new Image,
    
}
RELOADBUTTON.img.src = './res/reload.png'
var drawStatus;
var RESTART_BUTTON = {
    x: 400,
    y: 210,
    width: 200,
    height: 50,
}

function drawMenuButton() {
    // Рисуем окржуность для кнопки
    canvasContext.fillStyle = MINION.color;
    canvasContext.beginPath();
    canvasContext.arc(MENU_BUTTON.x, MENU_BUTTON.y,  MENU_BUTTON.radius, 0, 2 * Math.PI);
    canvasContext.stroke();
 
    // Рисуем левую палочку
    canvasContext.fillRect(MENU_BUTTON.x - 8 , MENU_BUTTON.y - 10, 5 ,20)
    // Рисуем правую палочку
    canvasContext.fillRect(MENU_BUTTON.x + 3 , MENU_BUTTON.y - 10, 5 ,20)
 }

 function drawContinueButton() {
    canvasContext.fillStyle = MINION.color;
    canvasContext.fillRect(CONTINUE_BUTTON.x, CONTINUE_BUTTON.y, CONTINUE_BUTTON.width, CONTINUE_BUTTON.height);
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Continue", 660, 188);
 }

 function drawRestartButton() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(RESTART_BUTTON.x, RESTART_BUTTON.y, RESTART_BUTTON.width, RESTART_BUTTON.height);
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Restart", 679, 250);
 }
 
 function drawMenu() {
    drawContinueButton();
    drawRestartButton();
 }
 

function drawGameover() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    canvasContext.font = "48px serif";
    canvasContext.fillStyle = "red"
    canvasContext.textAlign = 'center'; // Горизонтальное центрирование
    canvasContext.textBaseline = 'middle'; // Вертикальное центрирование
    canvasContext.fillText("GAME OVER", GAME.width/2, GAME.height/2);
}

function drawBackground() {
    canvasContext.drawImage(background, 0, 0, GAME.width, GAME.height);
}

const background = new Image();
background.src = './res/background.png';

//тут удалила функцию drawball, вместо нее drawitem
function drawItem(item) {
    canvasContext.drawImage(item.img, item.x, item.y, item.width, item.height)
}

function drawMinion() {
    canvasContext.drawImage(MINION.img, MINION.x, MINION.y, MINION.width, MINION.height)
}

function drawScore() {
    canvasContext.font = "48px serif";
    canvasContext.fillText("SCORE: " + GAME.score, 10, 50);
    canvasContext.fillStyle = "#000000"
    canvasContext.fillText('LIVES:' + GAME.lives, 10, 100)
}

function drawVictory() {
    console.log(12345)
    canvasContext.clearRect(0, 0, GAME.width, GAME.height)
    drawBackground()
    canvasContext.font = "48px serif";
    canvasContext.fillStyle = "green"
    canvasContext.textAlign = 'center'; // Горизонтальное центрирование
    canvasContext.textBaseline = 'middle'; // Вертикальное центрирование
    canvasContext.fillText("VICTORY", GAME.width/2, GAME.height/2)
}

function drawReloadbution() {
    console.log(12345)
    canvasContext.clearRect(0, 0, GAME.width, GAME.height)
    drawBackground()
    console.log(1111)
    canvasContext.font = "48px serif";
    canvasContext.fillStyle = "green"
    canvasContext.textAlign = 'center'; // Горизонтальное центрирование
    canvasContext.textBaseline = 'middle'; // Вертикальное центрирование
    canvasContext.fillText("./res/reload.png", GAME.width/2, GAME.height/2)
}

function drawMenu() {
    drawContinueButton();
    drawRestartButton();
 }

 function drawStartMenu() {
    drawBackground();
    canvasContext.fillStyle = '#0067ED';
    canvasContext.fillRect(STARTMENU.x, STARTMENU.y, STARTMENU.width, STARTMENU.height);
    canvasContext.font = "52px serif";
    canvasContext.fillStyle = "white";
    canvasContext.fillText(STARTMENU.message, 425, 252);
}

function startGame(event) {
    if (((event.x >= STARTMENU.x) && (event.x <= STARTMENU.x + STARTMENU.width)) &&
        ((event.y >= STARTMENU.y) && (event.y <= STARTMENU.y + STARTMENU.height))) {
        isStart = true;
        console.log('start');
        
    }
}

function drawFrame() {
    if (!GAME.isGameRunning) return;
    canvasContext.clearRect(0, 0, GAME.width, GAME.height)
    drawBackground()

    for (var i = 0; i < ITEMS.length; i++) {     
        drawItem(ITEMS[i]) 
    }
    drawMenuButton();
    drawMinion()
    drawScore()
    console.log(GAME.score)
    if (GAME.score >= 20) {
        console.log(50)        
        drawVictory()
        GAME.isGameRunning = false;
        drawReloadbution()
    }
    if (GAME.lives <= 0) {
        drawReloadbution()
        drawGameover()
        GAME.isGameRunning = false;
        drawReloadbution()
    }
}

function updateItem(item) {
    item.y += item.yDirection

    if ((item.y + item.height > GAME.height)) { // это чтобы удалить элемент, если он вышел за нижнюю границу
        ITEMS.splice(ITEMS.indexOf(item), 1)
    }

    // Проверка столкновения с корзинкой
    if (item.y + item.height > MINION.y &&
        item.x + item.width > MINION.x &&
        item.x < MINION.x + MINION.width) {
        if (item.type === 'win') {   //GAME.score += 1 заменяем на выигрышный или проигрышный предмет
            GAME.score += 1
        console.log('выигрышный предмет')
        } else if(item.type === 'lose') {
        GAME.lives -=1;
        console.log('проигрышный предмет')
    } 
        // удалить шарик после попадания в корзинку
        ITEMS.splice(ITEMS.indexOf(item), 1)
    }
}

function updateItems() {
    for (var i = ITEMS.length - 1; i >= 0; i--) {
        updateItem(ITEMS[i])
    }
}

function addNewItem() {
    if (IMAGES.length === 0) return;
    const randomIndex = Math.floor(Math.random() * IMAGES.length);
    const selected = IMAGES[randomIndex];
    
    var newItem = {
        img: selected.img,
        type: selected.type, // Добавлен тип
        x: Math.random() * (GAME.width - 50),
        y: 0,
        width: 50,
        height: 50,
        yDirection: 5
    };
    ITEMS.push(newItem);
}

function play() {
    if (GAME.lives <= 0)
    {
        drawGameover();
        return
    }
    if (GAME.score >= 20)
        {
            drawVictory();
            return
        }
    if (GAME.isGameRunning === false) {
            drawStartMenu();
            // drawStatus = requestAnimationFrame(play);
            return;
    }
    else {
    drawFrame()
    updateItems()
    drawStatus = requestAnimationFrame(play) //добавление получения статуса
}
    }

function clampMinionPosition() {
    if (MINION.x < 0) {
        MINION.x = 0
    }
    if (MINION.x + MINION.width > GAME.width) {
        MINION.x = GAME.width - MINION.width;
    }
}

function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        MINION.x -= MINION.xDirection;
    }
    if (event.key === "ArrowRight") {
        MINION.x += MINION.xDirection;
    }
    clampMinionPosition()
}

function onCanvasMouseMove(event) {
    var rect = canvas.getBoundingClientRect();
    MINION.x = event.clientX - rect.left - MINION.width / 2;
    clampMinionPosition()
}

function isOnContinueButton(event) { //функция для обработки события клика на кнопку
    if (((event.x >= CONTINUE_BUTTON.x) && (event.x <= CONTINUE_BUTTON.x + CONTINUE_BUTTON.width)) &&
        ((event.y >= CONTINUE_BUTTON.y) && (event.y <= CONTINUE_BUTTON.y + CONTINUE_BUTTON.height))) {
        return true;
    }
 }
 
 function startGame(event) {
    if (((event.x >= STARTMENU.x) && (event.x <= STARTMENU.x + STARTMENU.width)) &&
        ((event.y >= STARTMENU.y) && (event.y <= STARTMENU.y + STARTMENU.height))) {
        isStart = true;
        console.log('start');
        
    }
}

 function openMenu(event) {
    if (isOnMenuButton(event)) {
        cancelAnimationFrame(drawStatus); //добавляем в открытие меню остановку анимации
        cancelEventListeners(); //прекращение обработки событий в функции
        drawMenu();
        // window.addEventListener("click", handleMenuClick); // Добавить обработку кликов в меню);
       
    }
}

function isOnMenuButton(event) {   //для проверки щелчка
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    return (x >= MENU_BUTTON.x - MENU_BUTTON.radius && x <= MENU_BUTTON.x + MENU_BUTTON.radius &&
            y >= MENU_BUTTON.y - MENU_BUTTON.radius && y <= MENU_BUTTON.y + MENU_BUTTON.radius);
}

canvas.addEventListener("click", (event) => { //ограничение области кликов только на канвас
    if (isOnMenuButton(event)) {
        openMenu(event);
    } else {
        // handleMenuClick(event);
    }
});

function isOnRestartButton(event) {  //функция обработки клика перезапуска
    if (((event.x >= RESTART_BUTTON.x) && (event.x <= RESTART_BUTTON.x + RESTART_BUTTON.width)) &&
        ((event.y >= RESTART_BUTTON.y) && (event.y <= RESTART_BUTTON.y + RESTART_BUTTON.height))) {
        return true;
    }
 }
 

function handleMenuClick(event) {
    console.log('mew')
    if (isOnContinueButton(event)) {
        // Продолжить игру
        GAME.isGameRunning = true;
        // initEventsListeners(); // Возобновить слушатели событий
        play(); // Запустить игру
    } else if (isOnRestartButton(event)) {
        // Перезапустить игру
        GAME.score = 0;
        GAME.lives = 3;
        ITEMS = [];
        // initEventsListeners(); // Возобновить слушатели событий
        GAME.isGameRunning = true;
        play(); // Перезапустить игру
    }
}

// function closeMenu(event) {  //функция закрытия меню
//     if (isOnContinueButton(event)) {
//         window.removeEventListener("click", closeMenu); //прекращаем слушать событие на закрытие меню
//     //    initEventsListeners();
//         // play();
//     }
//     if (isOnRestartButton(event)) {       //добавляем обработку в функции
//         BALL.x = 180;
//        BALL.y = 80;
//        BALL.xDirection = 3;
//        BALL.yDirection = 5;
//        RACKET.score = 0;
//         window.removeEventListener("click", closeMenu);
//         // initEventsListeners();
//         // play()
//     }
//  }

 function isOnReloadButton(event) {
    console.log(event.x, event.y);
    if (((event.x >= RELOADBUTTON.x - RELOADBUTTON.radius) && (event.x <= RELOADBUTTON.x + RELOADBUTTON.radius)) &&
        ((event.y >= RELOADBUTTON.y - RELOADBUTTON.radius) && (event.y <= RELOADBUTTON.y + RELOADBUTTON.radius)) &&
        ((MINION.score > 9) || (MINION.score < 0))) {
        return true;
    }
}

function reload(event) {
    if (isOnReloadButton(event)){
        location.reload();
    }
}

 function cancelEventListeners() {  //функция очистки событий
    window.removeEventListener("mousemove", onCanvasMouseMove);
    window.removeEventListener("keydown", onCanvasKeyDown);
    window.removeEventListener("keydown", openMenu)
    window.removeEventListener("click", openMenu)
 }

function initEventsListeners() {
    canvas.addEventListener("mousemove", onCanvasMouseMove)
    window.addEventListener("keydown", onCanvasKeyDown)
    window.addEventListener("click", startGame);
    window.addEventListener("click", (event) => {
        if (isOnMenuButton(event)) { //если произошло событие клика то открывается меню
            drawMenu(); 
        } else {
            handleMenuClick(event);
        }
    });
    window.addEventListener("click", startGame);
    window.addEventListener("click",reload);
}

document.addEventListener('click', () => {
    if (AUDIO.audioIsOn) {
        AUDIO.src.play();
    }
    })
    AUDIO.src.addEventListener('ended', function() {
        AUDIO.currentTime = 0; 
        AUDIO.play();
    });

initEventsListeners()

// первый шарик
addNewItem()

// чтобы новые элементы добавлялись каждые 2 секунды
setInterval(addNewItem, 200)

play()

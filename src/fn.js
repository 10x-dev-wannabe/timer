const fs = require('fs');

let timerIsLive = false;
let t = 0;
let h = 0;
let m = 0;
let s = 0;
let fileName = "";


//get date
standardDate = new Date();
let day = standardDate.getDate();
let month = standardDate.getMonth();
let year = standardDate.getFullYear();

//format date as dd/mm/yyyy
day   = (day < 10)   ? "0" + day   : day;
month = (month < 10) ? "0" + month : month;

date = `${day}/${month}/${year}@`;

// Function to create file
function createFileFunction() {
    //get file name and make the file if it does not exist
    fileName = document.getElementById('fileName').value;    
    let filePath = `${__dirname}/data/${fileName}`;
    fs.appendFileSync(filePath, "",
        function(err) {
        if (err) {
            return console.log(err);
        }
        });
    makeFileSelectButtons();
}

// Function that hanles the save files
function saveTimeFunction(t) {
    let filePath = `${__dirname}/data/${fileName}`;

    let data = fs.readFileSync(filePath, "ascii");

    // Get total time, add curent time
    let totalTime = data.substring(data.lastIndexOf("|") + 1, data.lastIndexOf(" ")) 
    totalTime = Number(totalTime) + t;

    // Add current time of day to date
    let dateTime = new Date().toLocaleTimeString("en-US", {hour12: false,});

    // Write to file
    fs.appendFileSync(filePath, `${date}${dateTime}|${totalTime} ${t};\n`,
        function(err) {
        if (err) {
            return console.log(err);
        }
        });
    console.log(fileName)
}


//Function for starting the timer

function startTimerFunction() {
    if (timerIsLive == false) {
        timerIsLive = true;
        x = setInterval(function timer() {
            t += 1;
            h = Math.trunc(t/3600);
            m = Math.trunc(t%3600 / 60);
            s = Math.trunc(t%60);

            // Making sure the numbers are in 00:00:00 format
            h = (h < 10) ? "0" + h : h;
            m = (m < 10) ? "0" + m : m;
            s = (s < 10) ? "0" + s : s;
            
            // Display
            document.getElementById('time').innerHTML = `${h}:${m}:${s}`;
            
    }, 1000)}
}

//Function that resets the timer.

function resetTimerFunction() {
    // change button to start
    pauseTimerFunction();
    startButton.innerHTML = "start";
    startButton.style.backgroundColor = "#00ff00";

    if (t != 0 && fileName != ""){
        saveTimeFunction(t);
    }
    t = 0;
    document.getElementById('time').innerHTML = "00:00:00";
}

// Pause function
function pauseTimerFunction() {
    clearInterval(x);
    timerIsLive = false;
}

function startAndStopFunction() {
    if (timerIsLive) {
        pauseTimerFunction();
        startButton.innerHTML = "start";
        startButton.style.backgroundColor = "#00ff00"; 
    } else {
        startTimerFunction();
        startButton.innerHTML = "stop";
        startButton.style.backgroundColor = "#ff0000";
    }
}

// Hide and show menu function
function showOrHideMenu() {
    if (saveMenu.style.visibility == "hidden") {
        saveMenu.style.visibility='visible';
        menuButton.style.visibility='hidden';
    } else {
        saveMenu.style.visibility='hidden';
        menuButton.style.visibility='visible';
    }
}

// Get save files
function makeFileSelectButtons() {
    document.getElementById('fileSelector').innerHTML = '';
    fs.readdirSync(__dirname + '/data/').forEach(file => {
    document.getElementById('fileSelector').innerHTML += 
        `<button class="fileButtons" id=${file}File>${file}</button><br>`;
    });
    // Add event listeners
    let fileButtons = document.getElementsByClassName('fileButtons')
    for (let i = 0; i < fileButtons.length; i++) {
        let button = fileButtons[i];
        button.addEventListener('click', () => fileName = button.innerHTML)
    }
}

// Get buttons
startButton = document.getElementById('start');
resetButton = document.getElementById('reset');
menuButton  = document.getElementById('menuButton');
saveMenu    = document.getElementById('saveMenu');
confirmButton = document.getElementById('confirm');

// Make buttons do stuff
startButton.addEventListener('click', startAndStopFunction);
resetButton.addEventListener('click', resetTimerFunction);
menuButton.addEventListener('click', showOrHideMenu);
confirmButton.addEventListener('click', createFileFunction);

// Keyboard shortcuts
document.addEventListener("keypress", (e) => {
    if (e.code === "Space") {
        startAndStopFunction();
}})

document.addEventListener("keydown", (e) =>{
    if (e.key === "R") {
        resetTimerFunction();
}})

document.addEventListener("keydown", (e) =>{
    if (e.key === "M") {
        showOrHideMenu();
    }
})

makeFileSelectButtons();
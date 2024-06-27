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


// Function to set the save file name
function setFn() {
    //get file name and make the file if it does not exist
    fileName = document.getElementById('fileName').value;    
    let filePath = `${__dirname}/data/${fileName}.txt`;
    fs.appendFileSync(filePath, "",
        function(err) {
        if (err) {
            return console.log(err);
        }
        });
    // get data and make it into an array
    let data = fs.readFileSync(filePath, "ascii");
    var dataArray = data.split(/[\s,\n,|]+/);
    //remove the first and last spaces from array
    dataArray.shift();
    dataArray.pop();
    console.log(dataArray);
}

// Function that hanles the save files
function saveTimeFunction(t) {
    let filePath = `${__dirname}/data/${fileName}.txt`;

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
            document.getElementById('time').innerHTML = h +":"+ m +":"+ s;
            
    }, 1000)}
}

//Function that resets the timer.

function resetTimerFunction() {
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

// Get buttons
startButton = document.getElementById('start');
resetButton = document.getElementById('reset');

// Make buttons do stuff
startButton.addEventListener('click', startAndStopFunction);
resetButton.addEventListener('click', resetTimerFunction);

confirmButton = document.getElementById('confirm');
confirmButton.addEventListener('click', setFn);

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        startAndStopFunction();
}})

// Display data
logTable = document.getElementById('logtable');
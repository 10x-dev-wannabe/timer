//const { isUtf8 } = require('buffer');
const {electron, ipcRenderer} = require('electron');
const path = require('path')
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
let month = standardDate.getMonth()+1;
let year = standardDate.getFullYear();

//format date as dd/mm/yyyy
day   = (day < 10)   ? "0" + day   : day;
month = (month < 10) ? "0" + month : month;

date = `${day}/${month}/${year}@`;

//---------------//
//TIMER FUNCTIONS//
//---------------//

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

// Make start and pause into the same button
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

//-----------------------------//
//SAVE FILES AND MENU FUNCTIONS//
//-----------------------------//

// Get path to logs
ipcRenderer.on('whomp', (evt, message) => {
    logPath = `${message}/data/`;
    console.log('log path is:');
    console.log(logPath);
})

// Function that hanles the save files
function saveTimeFunction(t) {
    let filePath = `${logPath}${fileName}`;

    let data = fs.readFileSync(filePath, "ascii");

    // Get total time, add curent time
    let totalTime = data.substring(data.lastIndexOf("|") + 1, data.lastIndexOf(" ")) ;
    totalTime = Number(totalTime) + Math.trunc(t/60);

    // Add current time of day to date
    let dateTime = new Date().toLocaleTimeString("en-US", {hour12: false,});

    // Write to file
    fs.appendFileSync(filePath, `\n${date}${dateTime}|${totalTime} ${Math.trunc(t/60)}`,
        function(err) {
        if (err) {
            return console.log(err);
        }
        });
    // Refresh log    
    logDisplay.innerHTML = makeLogs(fileName);
}

// Function to create file
function createFileFunction() {
    //get file name and make the file if it does not exist
    fileName = document.getElementById('fileName').value;    
    let filePath = `${logPath}${fileName}`;
    fs.appendFileSync(filePath, "",
        function(err) {
        if (err) {
            return console.log(err);
        }
        });
    document.getElementById('fileName').value = '';
    makeFileSelectButtons();
}

// Function to delete file
function deleteFileFunction() {
    let deleteFile = document.getElementById('deleteFileName').value;
    document.getElementById('deleteFileName').value = "";
    let filePath = `${logPath}${deleteFile}`;
    fs.unlink(filePath, makeFileSelectButtons);
}


// Make save file buttons
function makeFileSelectButtons() {
    // Make data dir if it does not exist
    if (!fs.existsSync(logPath)){
        fs.mkdirSync(logPath);
    }
    // Make buttons
    document.getElementById('fileSelector').innerHTML = '';
    fs.readdirSync(`${logPath}`).forEach(file => {
        document.getElementById('fileSelector').innerHTML += 
            `<button class="fileButtons" id=${file}File>${file}</button><br>`
    });
    document.getElementById('fileSelector').innerHTML += '<button id="logButton">Show Logs</button><br>';
    logDisplay = document.getElementById('logDisplay');
    // Add event listeners
    try {
    fs.readdirSync(`${logPath}`).forEach(file => {
        document.getElementById(`${file}File`).addEventListener('click', () => {
            document.getElementById('fileSelector').querySelectorAll('.fileButtons').forEach(button => button.style.backgroundColor = '#bbbbbb');
            if (fileName != file) {
                fileName = file;
                document.getElementById(`${file}File`).style.backgroundColor = '#99ff99';
            } else {
                fileName = '';
                logDisplay.style.visibility = 'hidden';
            };
            // Fill the Log Display
            logDisplay.innerHTML = makeLogs(file);
            makeLogs(file)
    })})
    } catch {}
    // Toggle Log Display
    document.getElementById('logButton').addEventListener('click', () => {
        if (logDisplay.style.visibility != 'visible' && fileName != '') {
            logDisplay.style.visibility = 'visible';   
        } else {
            logDisplay.style.visibility = 'hidden';
        }});
};
function makeLogs(file) {
    let data = fs.readFileSync(`${logPath}${file}`, 'utf8');
    let output = '<table id="logTable"><tr><th>Date</th><th>Time</th><th>Project</th><th>Session</th></tr>';
    data = data.split('\n');
    data.shift();
    data.forEach(sesh => {
        let date    = sesh.split(/[\n@]/)[0];
        let time    = sesh.split(/[@|]/)[1];
        let session = sesh.split(/[\s\n]/)[1];
        let project = sesh.split(/[|\s]/)[1];
        let minutes = project%60;
        project = `${Math.trunc(project/60)}:${(minutes < 10) ? '0' + minutes : minutes}`;
        output += `<tr><td>${date}</td><td>${time}</td><td>${project}</td><td>${session}</td></tr>`;
    });
    output += "</table>";
    return output;
};


// Hide and show menu function
function showOrHideMenu() {
    makeFileSelectButtons();
    if (saveMenu.style.visibility == "hidden") {
        saveMenu.style.visibility='visible';
    } else {
        saveMenu.style.visibility='hidden';
    }
}

//---------------------//
//BUTTONS AND SHORTCUTS//
//---------------------//

// Get buttons
startButton = document.getElementById('start');
resetButton = document.getElementById('reset');
menuButton  = document.getElementById('menuButton');
saveMenu    = document.getElementById('saveMenu');
confirmButton = document.getElementById('confirm');
deleteConfirm = document.getElementById('deleteConfirm');

// Make buttons do stuff
startButton.addEventListener('click', startAndStopFunction);
resetButton.addEventListener('click', resetTimerFunction);
menuButton.addEventListener('click', showOrHideMenu);
confirmButton.addEventListener('click', createFileFunction);
deleteConfirm.addEventListener('click', deleteFileFunction);


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

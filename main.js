const { app, BrowserWindow, ipcRenderer } = require('electron');
//const { globalShortcut } = require('electron');


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: 'src/timerIcon.png'
  })
  //send save dir path to render process
  win.webContents.on('did-finish-load', ()=>{
    win.webContents.send('whomp', app.getPath('userData'));
  });
  win.loadFile('src/index.html')
}

app.whenReady().then(() => {
  createWindow()
})


app.on('window-all-closed', () => { 
  if (process.platform !== 'darwin') { 
    app.quit() 
  } 
})



/*
app.on('browser-window-focus', function () {
  globalShortcut.register("CommandOrControl+R", () => {
      console.log("CommandOrControl+R is pressed: Shortcut Disabled");
  });
  globalShortcut.register("F5", () => {
      console.log("F5 is pressed: Shortcut Disabled");
  });
});


app.on('browser-window-blur', function () {
  globalShortcut.unregister('CommandOrControl+R');
  globalShortcut.unregister('F5');
});
*/
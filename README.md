This project is made using electron js, however due to file size I can't include the node and electron json files.<br>
Packaged app:<br>
.deb: https://mega.nz/file/JK9DUDBC#PLl4JSM7zqhh6nMgmRwn0GPrFJBGdaaElxDPXuqJoIQ <br>
.rpm: https://mega.nz/file/Qbkm0IjY#jvf6z9av8Tu3J5oxooXA2Fmyjr-x89VxHVoHMYD7umg <br>
WARNING: for now the packaged app makes a new data directory in whatever is the current working directory.<br>
If you run the app in ~/Downloads it will create a ~/Downloads/data/ dir. I will fix this asap.<br>
<br>
If you want to run the program in dev mode, install node.js and npm on your machine<br>
inside the timer directory run:
npm install --save-dev electron<br>
npm init<br>
In the package.json file:<br>
-change the description to ""<br>
-add "start": "electron ." (in "scripts")<br>
and make sure "main": "main.js",<br>
And now run $ npm start and follow the instructions there to set up electron.js<br>
now run npm start again and it should work.<br>
This app is still in development, I will package it when I get more features implemented.<br>
<br>
Feel free to share your oppinion, share advice, and suggest new features!<br>
<br>
Keyboard shortcuts:<br>
start/stop timer: space<br>
reset timer     : shift + r<br>
open menu       : shift + m<br>

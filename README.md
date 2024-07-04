This project is made using electron js, however due to file size I can't include the node and electron json files.<br>
If you want to run this program yourself, install node.js and npm on your machine<br>
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

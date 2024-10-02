This project is made using electron js, so due to file size I can't include all files inside this repo.<br>
Packaged app:<br>
.deb: https://mega.nz/file/5OkWlarL#FwsYGa-fA25HsehgrQ6ORAG6sgLqcjBm3TgcOMJoo-k <br>
.rpm: https://mega.nz/file/pCdTjQ4J#lWazjFCQJ3v6gE4hUbXOZ8Q6BNtOX6dl7CjgRAR5Rlw <br>
console command is project-time-tracker<br>
<br>
If you want to run the program in dev mode:<br>
install node.js and npm on your machine<br>
inside the timer directory run:<br>
npm install --save-dev electron<br>
npm init<br>
In the package.json file:<br>
-change the description to ""<br>
-add "start": "electron ." (in "scripts")<br>
and make sure "main": "main.js",<br>
And now run $ npm start and follow the instructions there to set up electron.js<br>
now run npm start again and it should work.<br>
<br>
Feel free to share your oppinion, share advice, and suggest new features!<br>
<br>
Keyboard shortcuts:<br>
start/stop timer: space<br>
reset timer     : shift + r<br>
open menu       : shift + m<br>
NOTE:<br>
I know there is a more normal way of making the file select buttons, but right now I'm learning Svelte, and I plan on re-making this app with that framework. Untill then, feel free to make a pull request and fix it yourself if you so desire. Your effort would be appreciated.<br>
**THIS PROJECT IS NO LONGER MENTAINED**

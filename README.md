This project is made using electron js, however due to file size I can't include the node and electron json files.
If you want to run this program yourself, install node.js, npm, and electron.js on your machine and run npm init.
In the package.json file, add:
"start": "electron .",
(in "scripts")
and make sure "main": "main.js",

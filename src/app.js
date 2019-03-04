import fs from 'fs';

import "./stylesheets/main.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";

// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------

import { remote } from "electron";
import jetpack from "fs-jetpack";
import showdown  from 'showdown';
import { greet } from "./hello_world/hello_world";
import env from "env";
import { renderDocument } from './extensions/ace-editor';

window.showdown = showdown;

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// files from disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read("package.json", "json");

const osMap = {
  win32: "Windows",
  darwin: "macOS",
  linux: "Linux"
};

const ipc = require('electron').ipcRenderer

ipc.on('open-file', function (event, arg) {
  fs.readFile( arg[0], function (err, data) {
    if (err) {
      throw err;
    }
    const text = data.toString();
    renderDocument(text)
  });
})

function loadFile() {
  ipc.send('load-file')
}
window.loadFile = loadFile

console.log(__dirname + "/default.md")
app.mainWindow.send('open-file',["./default.md"]);


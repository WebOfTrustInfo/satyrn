import fs from 'fs';

import "./stylesheets/main.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";
import "./extensions/ace-editor";

import state from './state/satyrnicon'

// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------

import { remote } from "electron";
import showdown  from 'showdown';

const ipc = require('electron').ipcRenderer;


window.showdown = showdown;
window.state = state;

const app = remote.app;

const osMap = {
  win32: "Windows",
  darwin: "macOS",
  linux: "Linux"
};


ipc.on('open-file', function (event, arg) {
  fs.readFile( arg[0], function (err, data) {
    if (err) {
      throw err;
    }
    const text = data.toString();
    renderDocument(text)
  });
});

let isTeacherMode = false;
ipc.on('toggle-teacher-mode', function(event, args) {
  isTeacherMode ? document.querySelector("#teacher").style.display = "none"  :  document.querySelector("#teacher").style.display = "block";
  isTeacherMode = !isTeacherMode;
});


function loadFile() {
  ipc.send('load-file')
}
const converter = new showdown.Converter({extensions: ['aceEditor']});

function handleTextChange() {
  const text = document.getElementById("teacher").value;
  renderDocument(text)
}

function renderDocument(text) {

  const html  = converter.makeHtml(text);
  document.querySelector("#markdown").innerHTML = html;
  document.querySelector("#teacher").innerHTML = text;
  state.initialiseEditors();
}

window.handleTextChange = handleTextChange;
window.loadFile = loadFile

app.mainWindow.send('open-file',["./default.md"]);


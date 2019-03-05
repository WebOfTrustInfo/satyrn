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
let currentFile = "";

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
    currentFile = arg[0];
    const text = data.toString();
    renderDocument(text)
  });
});

ipc.on('save-file', function(event, arg) {
  let fileContent = document.querySelector("#teacher").innerHTML;
  let fileName = arg ? arg : currentFile;
  console.log(fileContent);
  console.log(fileName);
  fs.writeFile(fileName, fileContent, function(err) {
    if(err) {
      return console.log(err);
    }
    currentFile = fileName;
    console.log("The file was saved!");
  });
});

let isEditMode = false;
ipc.on('toggle-edit-mode', function(event, args) {
  isEditMode ? document.querySelector("#teacher").style.display = "none"  :  document.querySelector("#teacher").style.display = "block";
  isEditMode = !isEditMode;
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


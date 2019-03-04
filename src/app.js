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

window.showdown = showdown;
window.state = state;

const app = remote.app;

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
const converter = new showdown.Converter({extensions: ['aceEditor']});


function init() {
  const text = document.getElementById("textarea").value;
  renderDocument(text);
}

function handleTextChange() {
  const text = document.getElementById("textarea").value;
  renderDocument(text)
}

function renderDocument(text) {

  const html  = converter.makeHtml(text);
  document.querySelector("#markdown").innerHTML = html;
  document.querySelector("#teacher").innerHTML = text;
  document.querySelector("#teacher").style.display = "block";
  state.initialiseEditors();
}

window.loadFile = loadFile

app.mainWindow.send('open-file',["./default.md"]);


import fs from 'fs';

import "./stylesheets/main.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";
import "./extensions/ace-editor";
import "./extensions/mailito-email";

import state from './state/satyrnicon'

// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------

import { shell, ipcRenderer, remote, BrowserWindow } from "electron";
import showdown  from 'showdown';

let currentFile = "";

// cache help and about files
const aboutFilename = "src/about.md"
let aboutMd = "";
let aboutHtml = "";
const guideFilename = "src/guide.md"
let guideMd = "";
let guideHtml = "";

window.showdown = showdown;
window.state = state;

const app = remote.app;

const osMap = {
  win32: "Windows",
  darwin: "macOS",
  linux: "Linux"
};



ipcRenderer.on('open-file', function (event, arg) {
  fs.readFile( arg[0], function (err, data) {
    if (err) {
      throw err;
    }
    currentFile = arg[0];
    const text = data.toString();
    renderDocument(text)
    handleTextChange();
  });
});

ipcRenderer.on('save-file', function(event, arg) {
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
ipcRenderer.on('toggle-edit-mode', function(event, args) {
  isEditMode ? document.querySelector("#teacher").style.display = "none"  :  document.querySelector("#teacher").style.display = "block";
  isEditMode = !isEditMode;
});


let shouldRealTimeRender = true;
ipcRenderer.on('toggle-render-mode', (event, args) => {
  shouldRealTimeRender = !shouldRealTimeRender;
});

ipcRenderer.on('show-guide', (event,args) => {
  if(guideHtml==="")
    loadGuide();
  show(guideHtml, '_blank');
});

ipcRenderer.on('show-about', (event,args) => {
 if(aboutHtml==="")
    loadAbout();
  show(aboutHtml, 'about');
});


function show(html, target) {
  var w = window.open("", target, "toolbar=no,scrollbars=yes,resizable=yes,width=800,height=500");
//  var w = window.open("", target, "toolbar=no,scrollbars=yes,resizable=yes,width=800,height=500");
  w.document.write(html);
}

function loadGuide() {
  var md = fs.readFileSync(guideFilename, 'UTF-8');
  guideHtml = converter.makeHtml(md);
}

function loadAbout() {
  var md = fs.readFileSync(aboutFilename, 'UTF-8');
  aboutHtml = converter.makeHtml(md);
}


function loadFile() {
  ipcRenderer.send('load-file')
}
const converter = new showdown.Converter({extensions: ['aceEditor', 'mailitoEmail']});

function handleTextChange() {
  if (shouldRealTimeRender) {
    const text = document.getElementById("teacher").value;
    renderDocument(text)
  }

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


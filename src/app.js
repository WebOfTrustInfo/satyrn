import fs from 'fs';
import path from 'path';

import "./stylesheets/main.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";

import { shell, ipcRenderer, remote, BrowserWindow } from "electron";
const app = remote.app;

import showdown  from 'showdown';
import converter from './helpers/converter';
window.showdown = showdown;


// --------------------- --------------------- ---------------------
// application state
import state from './state/satyrnicon'
window.state = state;


// cache help and about files
const aboutFilename = "src/about.md"
let aboutMd = "";
let aboutHtml = "";
const guideFilename = "src/guide.md"
let guideMd = "";
let guideHtml = "";

// --------------------- --------------------- ---------------------
// respond to events from the main-process
//  open-file -> load a file, and replace it in the browser
//  save-file -> write the current document to a file.
//  toggle-edit-mode -> enable document editing (teacher mode)
//  toggle-render-mode -> flip real time render mode
//  show-guide -> change the display to the 'guide' page
//  show-about -> change the display to the 'about' page
// load-url-> loads a external markdown file from url
ipcRenderer.on('open-file', function (event, arg) {
  loadFile(arg[0]);
});

ipcRenderer.on('save-file', function(event, arg) {
  let fileContent = document.getElementById("teacher").value;
  let fileName = arg ? arg : state.currentFile;
  console.log(fileContent);
  console.log(fileName);
  fs.writeFile(fileName, fileContent, function(err) {
    if(err) {
      return console.log(err);
    }
    state.currentFile = fileName;
    state.renderDocument(fileContent);
    console.log("The file was saved and the name was changed!");
  });
});

ipcRenderer.on('toggle-edit-mode', function(event, args) {
  state.isEditMode ? document.querySelector("#teacher").style.display = "none"  :  document.querySelector("#teacher").style.display = "block";
  state.isEditMode = !state.isEditMode;
});

ipcRenderer.on('toggle-develop-mode', (event, args) => {
  state.shouldRealTimeRender = !state.shouldRealTimeRender;
});

ipcRenderer.on('show-guide', (event,args) => {
  if(guideHtml==="")
    loadGuide();
  show(guideHtml, 'guide');
});

ipcRenderer.on('show-about', (event,args) => {
 if(aboutHtml==="")
    loadAbout();
  show(aboutHtml, 'about');
});

ipcRenderer.on('load-url', (event,url) => {
  loadUrl(url)
})

ipcRenderer.on('reload-window', (event, reloadContents) => {
  if (reloadContents.isFile) {
    loadFile(reloadContents.url)
  } else {
    loadUrl(reloadContents.url)
  }
})

// --------------------- --------------------- ---------------------
// action implementations
// show -> display a styled file like about, guide
// loadGuide - display the guide file
// loadAbout -> display the about file
// loadUrl -> returns contents of http request to a url
// handleTextChanged -> re-render document on change if real-time rendering
// renderDocument -> used by open-file to display a document other
//                   than about and guide, also used during realTime
//                   rendering
function show(html, target) {
  let w = window.open("", target, "toolbar=no,scrollbars=yes,resizable=yes,width=800,height=500");

  // close the old window so we can open with focus
  if (w.document.body.innerHTML) {
  //    console.log(target + ' exists');
    setTimeout(function () {
      w.close();
      show(html, target);
    }, 100);
    return;
  }

  w.document.body.innerHTML = "";
  w.document.write(html)

  let link = document.createElement("link")
  link.type = "text/css";
  link.rel = "stylesheet";
  const cssPath = path.resolve(__dirname, './main.css');
  console.log(cssPath);
  link.href = cssPath;

  w.document.head.appendChild(link);
}

function loadGuide() {
  let md = fs.readFileSync(guideFilename, 'UTF-8');
  guideHtml = converter.makeHtml(md);
}

function loadAbout() {
  let md = fs.readFileSync(aboutFilename, 'UTF-8');
  aboutHtml = converter.makeHtml(md);
}

function loadFile(path) {
  fs.readFile( path, function (err, data) {
    if (err) {
      throw err;
    }

    console.log(data);
    state.openFile(path,data)
  });
}

function loadUrl(url) {
  let request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.send(null);
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      let type = request.getResponseHeader('Content-Type');
      if (type.indexOf("text") !== 1) {
        state.openFile("NEW FILE", request.responseText)

      }
    }
  }
}






// this opens the default file from the browser, rather than from main...
// we should document our thinking here.


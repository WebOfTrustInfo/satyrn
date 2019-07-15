import fs from 'fs';
import path from 'path';

import "./stylesheets/main.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";

import { ipcRenderer, BrowserWindow } from "electron";

import showdown  from 'showdown';
window.showdown = showdown;


// --------------------- --------------------- ---------------------
// application state
import state from './state/state'
window.state = state;

// --------------------- --------------------- ---------------------
// respond to events from the main-process
//  open-file -> load a file, and replace it in the browser
//  save-file -> write the current document to a file.
//  toggle-edit-mode -> enable document editing (teacher mode)
//  toggle-realtime-render -> flip real time render mode
// load-url-> loads a external markdown file from url
ipcRenderer.on('open-file', function (event, arg) {
  console.log("OPEN FILE")


  loadFile(arg[0]);
  setTimeout(function () {
    event.sender.send("set-reload-content", {
      isFile: true,
      url: arg[0]
    })
  }, 1000);

});

ipcRenderer.on('save-file', function(event, arg) {
  let fileContent = document.getElementById("teacher").value;
  let fileName = arg ? arg : state.currentFile;
  console.log("SAVE", fileName, fileContent);
  fs.writeFile(fileName, fileContent, function(err) {
    if(err) {
      return alert(err);
    }
    state.currentFile = fileName;
    console.log("SET RELOAD")


    state.renderDocument(fileContent);
    console.log("The file was saved and the name was changed!");
    event.sender.send("set-reload-content", {
      isFile: true,
      url: fileName
    })

  });
});

ipcRenderer.on('toggle-edit-mode', function(event, args) {
  state.isEditMode ? document.querySelector("#teacher-input").style.display = "none"  :  document.querySelector("#teacher-input").style.display = "block";
  state.isEditMode = !state.isEditMode;
});

ipcRenderer.on('toggle-realtime-render', (event, args) => {
  state.shouldRealTimeRender = !state.shouldRealTimeRender;
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

function loadFile(path) {
  console.log("LOAD", window.reloadContent)
  fs.readFile( path, function (err, data) {
    if (err) {
      alert("Unable to load file " + path);
    }

    console.log(data);
    state.openFile(path,data)
  })
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

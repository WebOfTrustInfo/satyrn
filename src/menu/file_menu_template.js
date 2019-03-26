import {app, BrowserWindow, dialog, remote} from "electron";
import { setApplicationMenu} from "../background";

var path = require('path');
import env from "env";

export const fileMenuTemplate = {
  label: "File",
  submenu: [
    {
      label: "Open",
      accelerator: "CmdOrCtrl+O",
      click: fileOpenDialog
    },
    {
      label: "Reload",
      accelerator: "CmdOrCtrl+R",
      click: reloadPage
    },
    {
      label: "Save",
      accelerator: "CmdOrCtrl+S",
      click: saveFile
    },
    {
      label: "Save As",
      // accelerator: "CmdOrCtrl+O",
      click: saveFileAs
    },
    { type: "separator" },
    {
      label: "Edit Mode",
      type: "checkbox",
      accelerator: "CmdOrCtrl+E",
      click: toggleEditMode,
      checked: false
    },
    {
      label: "Develop Mode",
      type: "checkbox",
      accelerator: "CmdOrCtrl+D",
      click: toggleDevelopMode,
      checked: env.name !== "production",
      visible: env.name !== "production",
    },
    { type: "separator" },
    {
      label: "Quit",
      accelerator: "CmdOrCtrl+Q",
      click: () => {
        app.quit();
      }
    },
  ]
};

function toggleRenderMode() {
  BrowserWindow.getFocusedWindow().send('toggle-render-mode');
}

function reloadPage() {
  let focusedWindow = BrowserWindow.getFocusedWindow();
  // console.log(BrowserWindow.getFocusedWindow().reloadContent)
  BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
  setApplicationMenu()
  focusedWindow.webContents.once('dom-ready', () => {
    focusedWindow.send('reload-window', BrowserWindow.getFocusedWindow().reloadContent);
  })
}


function toggleEditMode() {

  BrowserWindow.getFocusedWindow().send('toggle-edit-mode');

}

function toggleDevelopMode() {

  BrowserWindow.getFocusedWindow().send('toggle-develop-mode');

}

function saveFile() {
  BrowserWindow.getFocusedWindow().send('save-file', null);
}

function saveFileAs() {
  var fileNames;
  const options = {
    title: 'Save Markdown As',
    buttonLabel: 'Save',
    filters: [
      { name: 'markdown', extensions: ['md'] }
    ]
  };
  dialog.showSaveDialog(null, options, (fileNames) => {

    // fileNames is an array that contains all the selected
    if(fileNames === undefined){
      console.log("No file selected");
      return;
    }

    BrowserWindow.getFocusedWindow().send('save-file',fileNames);
  })
}

function fileOpenDialog() {
    var fileNames;
    const options = {
        title: 'Open a markdown file',
        buttonLabel: 'Open',
        filters: [
          { name: 'markdown', extensions: ['md'] }
        ]
    };
 
    dialog.showOpenDialog(null, options, (fileNames) => {

        // fileNames is an array that contains all the selected
        if(fileNames === undefined){
            console.log("No file selected");
            return;
        }

      BrowserWindow.getFocusedWindow().send('open-file',fileNames);
    })
}

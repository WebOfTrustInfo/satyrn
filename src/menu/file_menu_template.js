import {app, BrowserWindow, dialog, remote} from "electron";
import { createMenu} from "../background";

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
      label: "Real-time Render",
      type: "checkbox",
      accelerator: "CmdOrCtrl+T",
      click: toggleRealTimeRender,
      checked: true
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

function reloadPage() {
  let focusedWindow = BrowserWindow.getFocusedWindow();
  BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
  focusedWindow.setMenu(createMenu());

  focusedWindow.webContents.once('dom-ready', () => {
    focusedWindow.send('reload-window', focusedWindow.reloadContent);
  })
}


function toggleEditMode() {

  BrowserWindow.getFocusedWindow().send('toggle-edit-mode');

}

function toggleRealTimeRender() {

  BrowserWindow.getFocusedWindow().send('toggle-realtime-render');

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
  const focusedWindow = BrowserWindow.getFocusedWindow()
  dialog.showSaveDialog(focusedWindow, options, (fileNames) => {

    // fileNames is an array that contains all the selected
    if(fileNames === undefined){
      console.log("No file selected");
      return;
    }

    focusedWindow.send('save-file',fileNames);
    focusedWindow.reloadContent()
  })
}

function fileOpenDialog() {
  const focusedWindow = BrowserWindow.getFocusedWindow();
    var fileNames;
    const options = {
        title: 'Open a markdown file',
        buttonLabel: 'Open',
        filters: [
          { name: 'markdown', extensions: ['md'] }
        ]
    };

    dialog.showOpenDialog(focusedWindow, options, (fileNames) => {

        // fileNames is an array that contains all the selected
        if(fileNames === undefined){
            console.log("No file selected");
            return;
        }

      focusedWindow.send('open-file',fileNames);
      focusedWindow.reloadContent = {
        isFile: true,
        url: fileNames[0]
      }
    })
}

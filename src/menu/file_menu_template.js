import {app, BrowserWindow, dialog} from "electron";
import { setApplicationMenu} from "../background";

var path = require('path');
import env from "env";

export const fileMenuTemplate = {
  label: "File",
  submenu: [
    {
      label: "Edit Mode",
      type: "checkbox",
      accelerator: "CmdOrCtrl+E",
      click: toggleEditMode,
      checked: false
    },
    {
      label: "Render Mode",
      type: "checkbox",
      click: toggleRenderMode,
      checked: true
    },
    {
      label: "Develop Mode",
      type: "checkbox",
      accelerator: "CmdOrCtrl+D",
      click: toggleDevelopMode,
      checked: env.name !== "production",
      visible: env.name !== "production",
    },
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
    {
      label: "Quit",
      accelerator: "CmdOrCtrl+Q",
      click: () => {
        app.quit();
      }
    }
  ]
};

function toggleRenderMode() {
  app.mainWindow.send('toggle-render-mode');
}

function reloadPage() {
  BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
  setApplicationMenu()
}


function toggleEditMode() {

  app.mainWindow.send('toggle-edit-mode');

}

function toggleDevelopMode() {

  app.mainWindow.send('toggle-develop-mode');

}

function saveFile() {
  app.mainWindow.send('save-file', null);
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

    app.mainWindow.send('save-file',fileNames);
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

        app.mainWindow.send('open-file',fileNames);
    })
}

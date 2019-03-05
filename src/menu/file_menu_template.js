import { app, dialog } from "electron";
var path = require('path');

export const fileMenuTemplate = {
  label: "File",
  submenu: [
    {
      label: "Open",
      accelerator: "CmdOrCtrl+O",
      click: fileOpenDialog
    },
    {
      label: "Toggle Teacher Mode",
      accelerator: "CmdOrCtrl+T",
      click: toggleTeacherMode
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

function toggleTeacherMode() {

  app.mainWindow.send('toggle-teacher-mode');

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

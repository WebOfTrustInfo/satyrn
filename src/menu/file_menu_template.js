import { app, BrowserWindow } from "electron";
var path = require('path');

export const fileMenuTemplate = {
  label: "File",
  submenu: [
    {
      label: "Open",
      accelerator: "CmdOrCtrl+O",
      click: () => {
        console.log("app",app.mainWindow)
        var defaultFilename = path.join(app.getAppPath(),'default.md');
        app.mainWindow.send('open-file',defaultFilename);

      }
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

//function fileOpenDialog()
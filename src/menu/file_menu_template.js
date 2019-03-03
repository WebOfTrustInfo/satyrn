import { app, dialog, BrowserWindow } from "electron";
var path = require('path');

export const fileMenuTemplate = {
  label: "File",
  submenu: [
    {
      label: "Open",
      accelerator: "CmdOrCtrl+O",
      click: () => {
        //var defaultFilename = path.join(app.getAppPath(),'default.md');
        var fileName = dialog.showOpenDialog({ defaultPath:app.getAppPath(), properties: ['openFile', 'openDirectory'] });
        app.mainWindow.send('open-file',fileName);

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

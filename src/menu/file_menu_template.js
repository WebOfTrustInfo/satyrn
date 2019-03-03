import { app, BrowserWindow } from "electron";

export const fileMenuTemplate = {
  label: "File",
  submenu: [
    {
      label: "Open",
      accelerator: "CmdOrCtrl+O",
      click: () => {
        console.log("app",app.mainWindow)
        app.mainWindow.send('open-file',"default.md");

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

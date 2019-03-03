import { app, BrowserWindow } from "electron";

export const fileMenuTemplate = {
  label: "File",
  submenu: [
    {
      label: "Open",
      accelerator: "CmdOrCtrl+O",
      click: () => {
        console.log('OPEN');
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
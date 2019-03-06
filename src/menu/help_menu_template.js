import {app, BrowserWindow, dialog} from "electron";
import { setApplicationMenu} from "../background";

var path = require('path');
import env from "env";

export const helpMenuTemplate = {
  label: "Help",
  submenu: [
    {
      label: "Guide",
      click: showGuide
    },
    {
      label: "About",
      click: showAbout
    }
  ]
};

function showGuide() {
  app.mainWindow.send('show-guide');
}

function showAbout() {
  app.mainWindow.send('show-about');
}


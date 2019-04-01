import {app, BrowserWindow, dialog} from "electron";
import { createMenu} from "../background";

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
  BrowserWindow.getFocusedWindow().send('show-guide');
}

function showAbout() {
  BrowserWindow.getFocusedWindow().send('show-about');
}


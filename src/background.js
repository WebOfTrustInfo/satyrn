// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from "path";
import url from "url";
import {app, BrowserWindow, dialog, ipcRenderer, Menu, shell} from "electron";
import { devMenuTemplate } from "./menu/dev_menu_template";
import { editMenuTemplate } from "./menu/edit_menu_template";
import { fileMenuTemplate } from "./menu/file_menu_template";
import { helpMenuTemplate } from "./menu/help_menu_template";
import createWindow from "./helpers/window";
// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from "env";


export const setApplicationMenu = () => {
  const menus = [fileMenuTemplate, editMenuTemplate];
  if (env.name !== "production") {
    menus.push(devMenuTemplate);
  }
  menus.push(helpMenuTemplate); // pushed after dev so it is always right-most menu
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== "production") {
  let reload = require('electron-reload')
  reload(__dirname);
  const userDataPath = app.getPath("userData");
  app.setPath("userData", `${userDataPath} (${env.name})`);
}

app.on("ready", () => {
  setApplicationMenu();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      nativeWindowOpen: true
    }
  });
  app.mainWindow = mainWindow

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "app.html"),
      protocol: "file:",
      slashes: true
    })
  );
  // if (env.name === "development") {
  //   mainWindow.openDevTools();
  // }

  mainWindow.webContents.on('new-window', function(e, url) {
    // about:blank is opened when creating stand-alone helper windows
    // such as for the About page and the Guide
    console.log(url)
    if(url && url !== 'about:blank') {
      e.preventDefault();
      console.log('EXTERNAL')
       shell.openExternal(url);
       return false;
      }
  });
});



app.on("window-all-closed", () => {
  app.quit();
});



const ipc = require('electron').ipcMain

ipc.on('load-file', function (event, arg) {
  var fileName = dialog.showOpenDialog({ defaultPath:app.getAppPath(), properties: ['openFile', 'openDirectory'] });
  console.log("OPEN" + fileName)
  app.mainWindow.send('open-file',fileName);
})



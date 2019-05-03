import {app, BrowserWindow} from "electron";
import {createNewWindow} from "../background";

var path = require('path');

export const helpMenuTemplate = {
  label: "Help",
  submenu: [
    {
      label: "Tutorial",
      click: () => showHelpGuide("Tutorial", "./app/markdown/tutorial.md")
    },
    {
      label: "About",
      click: () => showHelpGuide("About", "./app/markdown/about.md")
    }
  ]
};

function showHelpGuide(name, url) {
  let onReady =  (currentWindow) => {
    currentWindow.reloadContent = {
      isFile: true,
      url
    };
    currentWindow.send('open-file',[url]);
  };

  let window = createNewWindow(name,onReady);
  window.setMenu(null);
}



import {createNewWindow} from "../background";

let aboutWindow = null;
let tutorialWindow = null;
let copyrightWindow = null;

export const helpMenuTemplate = {
  label: "Help",
  submenu: [
    {
      label: "Tutorial",
      click: () => showHelpMenuWindow(tutorialWindow, "Tutorial", "./markdown/tutorial.md")
    },
    {
      label: "About",
      click: () => showHelpMenuWindow(aboutWindow, "About", "./markdown/about.md")
    },
    {
      label: "Copyright",
      click: () => showHelpMenuWindow(copyrightWindow, "Copyright", "./license.md")
    }
  ]
};

function showHelpMenuWindow(helpWindow, name, url) {
  console.log("HELP WINDOW", helpWindow);
  if (helpWindow) {
    helpWindow.focus()
  } else {
    helpWindow = createHelpWindow(name, url);
    helpWindow.on("close", () => {
      helpWindow = null;
    });
    if (name === "About") {
      aboutWindow = helpWindow;
    } else if (name === "Tutorial") {
      tutorialWindow = helpWindow;
    } else if (name === "Copyright") {
      copyrightWindow = helpWindow;
    }
  }

}

function createHelpWindow(name, url) {
  let onReady =  (currentWindow) => {
    currentWindow.reloadContent = {
      isFile: true,
      url
    };
    currentWindow.send('open-file',[url]);
  };

  let window = createNewWindow(name,onReady);
  window.setMenu(null);
  return window;
}



import {createNewWindow} from "../background";

let aboutWindow = null;
let tutorialWindow = null;

export const helpMenuTemplate = {
  label: "Help",
  submenu: [
    {
      label: "Tutorial",
      click: () => showHelpGuide(tutorialWindow, "Tutorial", "./markdown/tutorial.md")
    },
    {
      label: "About",
      click: () => showHelpGuide(aboutWindow, "About", "./markdown/about.md")
    }
  ]
};

function showHelpGuide(helpWindow, name, url) {
  console.log("HELP WINDOW", helpWindow);
  if (helpWindow) {
    helpWindow.focus()
  } else {
    helpWindow = createHelpWindow(name, url);
    helpWindow.on("close", () => {
      helpWindow = null;
    })
  }
  if (name === "About") {
    aboutWindow = helpWindow;
  } else {
    tutorialWindow = helpWindow;
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



/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/state/satyrnicon.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/state/satyrnicon.js":
/*!*********************************!*\
  !*** ./src/state/satyrnicon.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const satyrnicon = {
  editors: {},
  state: {},
  initialiseEditors: () => {
    for (let key in satyrnicon.editors) {
      satyrnicon.addEditor(key);
    }
  },
  getEditor: key => {
    return satyrnicon.editors[key];
  },
  addEditor: key => {
    let editor = ace.edit(key);
    editor.setTheme("ace/theme/twilight");
    editor.session.setMode("ace/mode/javascript");
    satyrnicon.editors[key] = editor;
    satyrnicon.state[key] = editor.getValue();
  },
  reset: key => {
    let editor = satyrnicon.getEditor(key);
    document.querySelector("#output-" + key).innerHTML = "";
    editor.setValue(satyrnicon.state[key]);
  },
  run: key => {
    document.querySelector("#output-" + key).innerHTML = "....";
    let editor = satyrnicon.getEditor(key);
    console.oldLog = console.log;
    let output = '';

    console.log = function (value) {
      console.oldLog(value);
      output += value;
      output += '\n';
      return value;
    };

    const code = editor.getValue();
    eval(code);
    document.querySelector("#output-" + key).innerHTML = output;
    console.log = console.oldLog;
  },
  getEditorHtml: (content, key) => {
    return "<div class=\"showdown-js-editor\">\n" + "    <div>\n" + "    <i class=\"fas fa-play\" onclick=\"state.run('" + key + "')\" value=\"Run\" ></i>\n" + "    <i class=\"fas fa-redo\" onclick=\"state.reset('" + key + "')\" value=\"Refresh\" ></i>\n" + "    </div>\n" + "\n" + "    <pre id=\"" + key + "\" class=\"editor\">" + content + "    </pre>\n" + "    <pre class='editor-output' id=\"output-" + key + "\">\n" + "    </pre>\n" + "  </div>";
  }
};
/* harmony default export */ __webpack_exports__["default"] = (satyrnicon);

/***/ })

/******/ });
//# sourceMappingURL=state.js.map
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/state/state.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/extensions/ace-editor.js":
/*!**************************************!*\
  !*** ./src/extensions/ace-editor.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state/state */ "./src/state/state.js");
const showdown = __webpack_require__(/*! showdown */ "showdown");


showdown.extension('aceEditor', () => {
  let content = [];
  return [{
    type: 'lang',
    regex: /```javascript([^]+?)```/gi,
    replace: function (s, match) {
      content.push(match);
      var n = content.length - 1;
      return '%EDITOR' + n + '%';
    }
  }, {
    type: 'output',
    filter: function (text) {
      for (var i = 0; i < content.length; ++i) {
        let key = "editor-" + i;
        var pat = '<p>%EDITOR' + i + '% *<\/p>';
        text = text.replace(new RegExp(pat, 'gi'), _state_state__WEBPACK_IMPORTED_MODULE_0__["default"].getEditorHtml(content[i], key));
        _state_state__WEBPACK_IMPORTED_MODULE_0__["default"].editors[key] = null;
      } //reset array


      content = [];
      return text;
    }
  }];
});

/***/ }),

/***/ "./src/extensions/anchor-target.js":
/*!*****************************************!*\
  !*** ./src/extensions/anchor-target.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const showdown = __webpack_require__(/*! showdown */ "showdown");

showdown.extension('anchorTarget', () => {
  return [{
    type: 'output',
    regex: /<a(.*?)>(.*?)<\/a>/gi,
    replace: function (anchorTag) {
      if (anchorTag.indexOf("target") === -1 && anchorTag.indexOf("href=\"#") === -1 && anchorTag.indexOf("href=\"mailto") === -1) {
        anchorTag = anchorTag.replace(new RegExp(/<a(.*?)>/), openingTag => {
          let newTag = openingTag.slice(0, -1);
          newTag += " target=\"_blank\">";
          return newTag;
        });
      }

      return anchorTag;
    }
  }];
});

/***/ }),

/***/ "./src/extensions/mailito-email.js":
/*!*****************************************!*\
  !*** ./src/extensions/mailito-email.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const showdown = __webpack_require__(/*! showdown */ "showdown");

showdown.extension('mailitoEmail', () => {
  let content = [];
  return [{
    type: 'lang',
    regex: /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gi,
    replace: function (s, match) {
      content.push(s);
      var n = content.length - 1;
      return '%EMAIL' + n + '%';
    }
  }, {
    type: 'output',
    filter: function (text) {
      for (var i = 0; i < content.length; ++i) {
        var pat = '%EMAIL' + i + '%';
        text = text.replace(new RegExp(pat, 'gi'), "<a href=\"mailto:" + content[i] + "\" >" + content[i] + "</a>");
      } //reset array


      content = [];
      return text;
    }
  }];
});

/***/ }),

/***/ "./src/helpers/converter.js":
/*!**********************************!*\
  !*** ./src/helpers/converter.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var showdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! showdown */ "showdown");
/* harmony import */ var showdown__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(showdown__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _extensions_ace_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../extensions/ace-editor */ "./src/extensions/ace-editor.js");
/* harmony import */ var _extensions_mailito_email__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../extensions/mailito-email */ "./src/extensions/mailito-email.js");
/* harmony import */ var _extensions_mailito_email__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_extensions_mailito_email__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _extensions_anchor_target__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../extensions/anchor-target */ "./src/extensions/anchor-target.js");
/* harmony import */ var _extensions_anchor_target__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_extensions_anchor_target__WEBPACK_IMPORTED_MODULE_3__);




showdown__WEBPACK_IMPORTED_MODULE_0___default.a.setFlavor('github');
const converter = new showdown__WEBPACK_IMPORTED_MODULE_0___default.a.Converter({
  extensions: ['aceEditor', 'mailitoEmail', 'anchorTarget'],
  tables: true,
  simplifiedAutoLink: true,
  smoothLivePreview: true,
  tasklists: true,
  parseImgDimensions: true,
  strikethrough: true,
  ghCodeBlocks: true,
  ghMentions: true,
  splitAdjacentBlockquotes: true
});
/* harmony default export */ __webpack_exports__["default"] = (converter);

/***/ }),

/***/ "./src/state/kernel.js":
/*!*****************************!*\
  !*** ./src/state/kernel.js ***!
  \*****************************/
/*! exports provided: Kernel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Kernel", function() { return Kernel; });
const child_process = __webpack_require__(/*! child_process */ "child_process");

const os = __webpack_require__(/*! os */ "os"); // This handles the state of a single notebook document.


class Kernel {
  constructor(satyrnicon) {
    this.satyrnicon = satyrnicon; //this.nodePath = "/Users/korsimoro/.nvm/versions/node/v8.1.1/bin/node"
    //this.nodePath = "/tmp/wrapper"

    this.nodePath = "node";
    this.proc = undefined;
    this.outputKey = undefined; // https://dzone.com/articles/understanding-execfile-spawn-exec-and-fork-in-node

    const options = {};
    const child = child_process.spawn(this.nodePath, ['-i'], options); //const child = child_process.fork('./test.js',{silent:true})

    console.log("FORKED:", child);
    child.stdin._writableState.highWaterMark = 0;
    child.stdout._readableState.highWaterMark = 1;
    child.stderr._readableState.highWaterMark = 1;
    this.proc = child;
    const kernel = this;
    child.stdout.on('data', data => {
      console.log("KERNEL.js GOT DATA", String(data, 'UTF-8'));
      if (kernel.outputKey) kernel.satyrnicon.receiveTextOutput(data, kernel.outputKey);else kernel.satyrnicon.receiveUnsolicitedTextOutput(data);
    });
    child.stdout.on('close', () => {
      console.log("CLOSE");
    });
    child.stdout.on('end', () => {
      console.log("END");
    });
    child.stdout.on('error', () => {
      console.log("ERROR");
    });
    child.stderr.on('data', data => {
      console.log("ERROR");
      if (kernel.outputKey) kernel.satyrnicon.receiveTextError(data, kernel.outputKey);else kernel.satyrnicon.receiveUnsolicitedTextError(data);
    }); // not sure if we want to handle this differently

    child.on('exit', (code, signal) => {
      kernel.satyrnicon.reportKernelDeath();
    });
    child.on('close', (code, signal) => {
      kernel.satyrnicon.reportKernelDeath();
    }); // TODO - what to do?

    child.on('error', error => {
      console.log("FAILED TO START", error);
    });
  }

  run(key, code) {
    //const escapedCode = code.
    //replace(/"/g, '\\"')
    //replace(/\n/g,'\\\\n')
    const escapedCode = code;
    console.log("eval(\"" + escapedCode + "\")");
    if (code[code.length - 1] != os.EOL) code = code + os.EOL;
    this.proc.stdin.cork();
    const result = this.proc.stdin.write(code);
    this.proc.stdin.uncork();
    console.log("RUN CODE");
    this.outputKey = key;
  }

  quit() {
    this.proc.kill();
  }

}

/***/ }),

/***/ "./src/state/state.js":
/*!****************************!*\
  !*** ./src/state/state.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _kernel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kernel */ "./src/state/kernel.js");
/* harmony import */ var _helpers_converter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/converter */ "./src/helpers/converter.js");

 // This handles the state of a single notebook document.

const state = {
  editors: {},
  state: {},
  isEditMode: false,
  shouldRealTimeRender: true,
  currentFile: "",
  kernel: undefined,
  initialiseEditors: () => {
    for (let key in state.editors) {
      state.addEditor(key);
    }
  },
  getEditor: key => {
    return state.editors[key];
  },
  addEditor: key => {
    let editor = ace.edit(key);
    editor.setTheme("ace/theme/twilight");
    editor.session.setMode("ace/mode/javascript");
    state.editors[key] = editor;
    state.state[key] = editor.getValue();
  },
  reset: key => {
    let editor = state.getEditor(key);
    document.querySelector("#output-" + key).innerHTML = "";
    editor.setValue(state.state[key]);
  },
  toggleRealTimeRender: () => {
    state.shouldRealTimeRender = !state.shouldRealTimeRender;
    state.handleTextChange();
  },
  resetKernel: () => {
    if (state.kernel) {// TODO kill is not a function? Seems to work without killing - probably not good!
      // state.kernel.kill()
    }

    state.kernel = new _kernel__WEBPACK_IMPORTED_MODULE_0__["Kernel"](state);
  },
  openFile: (fname, data) => {
    state.resetKernel();
    state.editors = {};
    state.currentFile = fname;
    const text = data.toString();
    state.renderDocument(text);
    state.handleTextChange();
  },
  run: key => {
    document.querySelector("#output-" + key).innerHTML = "....";
    let editor = state.getEditor(key);
    const code = editor.getValue();
    state.kernel.run(key, code);
    document.querySelector("#output-" + key).innerHTML = "";
  },
  receiveTextOutput: (data, key) => {
    console.log("RECIEVE ", data);
    const current = document.querySelector("#output-" + key).innerHTML;
    const replacement = current + data;
    document.querySelector("#output-" + key).innerHTML = replacement;
  },
  receiveUnsolicitedTextOutput: data => {
    console.log(data);
  },
  receiveTextError: (data, key) => {
    const current = document.querySelector("#output-" + key).innerHTML;
    const replacement = current + data;
    document.querySelector("#output-" + key).innerHTML = replacement;
  },
  receiveUnsolicitedTextError: data => {
    console.log(data);
  },
  reportKernelDeath: () => {
    console.log("Kernel died");
    state.kernel = undefined;
  },
  getEditorHtml: (content, key) => {
    return "<div class=\"showdown-js-editor\">\n" + "    <div>\n" + "    <i class=\"fas fa-play\" onclick=\"state.run('" + key + "')\" value=\"Run\" ></i>\n" + "    <i class=\"fas fa-redo\" onclick=\"state.reset('" + key + "')\" value=\"Refresh\" ></i>\n" + "    </div>\n" + "\n" + "    <pre id=\"" + key + "\" class=\"editor\">" + content + "    </pre>\n" + "    <pre class='editor-output' id=\"output-" + key + "\">\n" + "    </pre>\n" + "  </div>";
  },
  handleTextChange: () => {
    if (state.shouldRealTimeRender) {
      const text = document.getElementById("teacher").value;
      state.renderDocument(text);
    }
  },
  renderDocument: text => {
    const html = _helpers_converter__WEBPACK_IMPORTED_MODULE_1__["default"].makeHtml(text);
    document.querySelector("#markdown").innerHTML = html;
    document.querySelector("#teacher").innerHTML = text;
    state.initialiseEditors();
  }
};
/* harmony default export */ __webpack_exports__["default"] = (state);

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "showdown":
/*!***************************!*\
  !*** external "showdown" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("showdown");

/***/ })

/******/ });
//# sourceMappingURL=state.js.map
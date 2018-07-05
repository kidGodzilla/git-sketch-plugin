var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/commands/Branches.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/mocha-js-delegate/index.js":
/*!*************************************************!*\
  !*** ./node_modules/mocha-js-delegate/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* globals NSUUID MOClassDescription NSObject NSSelectorFromString NSClassFromString */

module.exports = function (selectorHandlerDict, superclass) {
  var uniqueClassName = 'MochaJSDelegate_DynamicClass_' + NSUUID.UUID().UUIDString()

  var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, superclass || NSObject)

  delegateClassDesc.registerClass()

  // Storage Handlers
  var handlers = {}

  // Define interface
  this.setHandlerForSelector = function (selectorString, func) {
    var handlerHasBeenSet = (selectorString in handlers)
    var selector = NSSelectorFromString(selectorString)

    handlers[selectorString] = func

    /*
      For some reason, Mocha acts weird about arguments: https://github.com/logancollins/Mocha/issues/28
      We have to basically create a dynamic handler with a likewise dynamic number of predefined arguments.
    */
    if (!handlerHasBeenSet) {
      var args = []
      var regex = /:/g
      while (regex.exec(selectorString)) {
        args.push('arg' + args.length)
      }

      var dynamicFunction = eval('(function (' + args.join(', ') + ') { return handlers[selectorString].apply(this, arguments); })')

      delegateClassDesc.addInstanceMethodWithSelector_function_(selector, dynamicFunction)
    }
  }

  this.removeHandlerForSelector = function (selectorString) {
    delete handlers[selectorString]
  }

  this.getHandlerForSelector = function (selectorString) {
    return handlers[selectorString]
  }

  this.getAllHandlers = function () {
    return handlers
  }

  this.getClass = function () {
    return NSClassFromString(uniqueClassName)
  }

  this.getClassInstance = function () {
    return NSClassFromString(uniqueClassName).new()
  }

  // Convenience
  if (typeof selectorHandlerDict === 'object') {
    for (var selectorString in selectorHandlerDict) {
      this.setHandlerForSelector(selectorString, selectorHandlerDict[selectorString])
    }
  }
}


/***/ }),

/***/ "./node_modules/sketch-module-fs/index.js":
/*!************************************************!*\
  !*** ./node_modules/sketch-module-fs/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  mkdir: function (path) {
    var error = null
    var result = NSFileManager.defaultManager().createDirectoryAtPath_withIntermediateDirectories_attributes_error(path, true, {}, error)
    if (error != null) {
      throw new Error(error)
    }
    return result
  },

  readFile: function (path, encoding) {
    var error = null
    var result = NSString.stringWithContentsOfFile_encoding_error(path, encoding || NSUTF8StringEncoding, error)
    if (error != null) {
      throw new Error(error)
    }
    return result
  },

  writeFile: function (path, data, encoding) {
    var error = null
    var result
    if (data.TIFFRepresentation) {
      var tiffData = data.TIFFRepresentation()
      var p = NSBitmapImageRep.imageRepWithData(tiffData)
      var data = p.representationUsingType_properties(encoding || NSPNGFileType, null)
      data.writeToFile_atomically(path, true)
    } else {
      result = NSString.stringWithString(data).writeToFile_atomically_encoding_error(path, true, encoding || NSUTF8StringEncoding, error)
    }
    if (error != null) {
      throw new Error(error)
    }
    return result
  },

  rename: function (oldPath, newPath) {
    var error = null
    var result = NSFileManager.defaultManager().moveItemAtPath_toPath_error(oldPath, newPath, error)
    if (error != null) {
      throw new Error(error)
    }
    return result
  },

  rmdir: function (path) {
    var error = null
    var result = NSFileManager.defaultManager().removeItemAtPath_error(path, error)
    if (error != null) {
      throw new Error(error)
    }
    return result
  }
}


/***/ }),

/***/ "./node_modules/sketch-module-google-analytics/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/sketch-module-google-analytics/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var kUUIDKey = 'google.analytics.uuid'
var uuid = NSUserDefaults.standardUserDefaults().objectForKey(kUUIDKey)
if (!uuid) {
  uuid = NSUUID.UUID().UUIDString()
  NSUserDefaults.standardUserDefaults().setObject_forKey(uuid, kUUIDKey)
}

function jsonToQueryString(json) {
  return '?' + Object.keys(json).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
  }).join('&')
}

module.exports = function (context, trackingId, hitType, props) {
  var payload = {
    v: 1,
    tid: trackingId,
    ds: 'Sketch ' + NSBundle.mainBundle().objectForInfoDictionaryKey("CFBundleShortVersionString"),
    cid: uuid,
    t: hitType,
    an: context.plugin.name(),
    aid: context.plugin.identifier(),
    av: context.plugin.version()
  }
  if (props) {
    Object.keys(props).forEach(function (key) {
      payload[key] = props[key]
    })
  }

  var url = NSURL.URLWithString(
    NSString.stringWithFormat("https://www.google-analytics.com/collect%@", jsonToQueryString(payload))
  )

  if (url) {
    NSURLSession.sharedSession().dataTaskWithURL(url).resume()
  }
}


/***/ }),

/***/ "./node_modules/sketch-module-user-preferences/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/sketch-module-user-preferences/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const SUITE_PREFIX = 'plugin.sketch.'

function isPresent (data) {
  return data != null
}

module.exports = {
  getUserPreferences: function (pluginName, defaultPrefs) {
    var prefs = {}
    var store = NSUserDefaults.alloc().initWithSuiteName(SUITE_PREFIX + pluginName)
    Object.keys(defaultPrefs).forEach(function (k) {
      if (typeof defaultPrefs[k] === 'boolean') {
        prefs[k] = isPresent(store.boolForKey(k)) ? Boolean(store.boolForKey(k)) : defaultPrefs[k]
      } else if (typeof defaultPrefs[k] === 'number') {
        prefs[k] = isPresent(store.doubleForKey(k)) ? store.doubleForKey(k) : defaultPrefs[k]
      } else if (typeof defaultPrefs[k] === 'string') {
        prefs[k] = isPresent(store.stringForKey(k)) ? '' + store.stringForKey(k) : defaultPrefs[k]
      } else if (Array.isArray(defaultPrefs[k])) {
        prefs[k] = store.arrayForKey(k) || defaultPrefs[k]
      } else {
        prefs[k] = store.dictionaryForKey(k) || defaultPrefs[k]
      }
    })
    return prefs
  },
  setUserPreferences: function (pluginName, prefs) {
    var store = NSUserDefaults.alloc().initWithSuiteName(SUITE_PREFIX + pluginName)
    Object.keys(prefs).forEach(function (k) {
      if (typeof prefs[k] === 'boolean') {
        store.setBool_forKey(prefs[k], k)
      } else if (typeof prefs[k] === 'number') {
        store.setDouble_forKey(prefs[k], k)
      } else {
        store.setObject_forKey(prefs[k], k)
      }
    })
    store.synchronize()
  }
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals NSUUID NSThread NSPanel NSMakeRect NSTexturedBackgroundWindowMask NSTitledWindowMask NSWindowTitleHidden NSClosableWindowMask NSColor NSWindowMiniaturizeButton NSWindowZoomButton NSFloatingWindowLevel WebView COScript */
var MochaJSDelegate = __webpack_require__(/*! mocha-js-delegate */ "./node_modules/mocha-js-delegate/index.js")
var parseQuery = __webpack_require__(/*! ./parseQuery */ "./node_modules/sketch-module-web-view/lib/parseQuery.js")

var coScript = COScript.currentCOScript()

var LOCATION_CHANGED = 'webView:didChangeLocationWithinPageForFrame:'

function WebUI (context, frameLocation, options) {
  // ColorPicker main window
  var identifier = options.identifier || NSUUID.UUID().UUIDString()
  var threadDictionary = NSThread.mainThread().threadDictionary()
  var backgroundColor = options.background || NSColor.whiteColor()
  var panel = threadDictionary[identifier] ? threadDictionary[identifier] : NSPanel.alloc().init()

  // Window size
  panel.setFrame_display(NSMakeRect(
    options.x || 0,
    options.y || 0,
    options.width || 240,
    options.height || 180
  ), true)

  // Titlebar
  panel.setTitle(options.title || context.plugin.name())
  if (options.hideTitleBar) {
    panel.setTitlebarAppearsTransparent(true)
    panel.setTitleVisibility(NSWindowTitleHidden)
  }

  // Hide minize and zoom buttons
  if (options.onlyShowCloseButton) {
    panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true)
    panel.standardWindowButton(NSWindowZoomButton).setHidden(true)
  }

  // Close window callback
  if (options.onPanelClose) {
    var closeButton = panel.standardWindowButton(NSWindowCloseButton)
    closeButton.setCOSJSTargetFunction(function(sender) {
      options.onPanelClose()
      COScript.currentCOScript().setShouldKeepAround(false)
      threadDictionary.removeObjectForKey(options.identifier)
      panel.close()
    })
    closeButton.setAction("callAction:")
  }

  panel.setStyleMask(options.styleMask || (NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask))
  panel.setBackgroundColor(backgroundColor)
  panel.becomeKeyWindow()
  panel.setLevel(NSFloatingWindowLevel)

  threadDictionary[identifier] = panel

  if (options.shouldKeepAround !== false) { // Long-running script
    coScript.setShouldKeepAround(true)
  }

  // Add Web View to window
  var webView = WebView.alloc().initWithFrame(NSMakeRect(
    0,
    options.hideTitleBar ? -24 : 0,
    options.width || 240,
    (options.height || 180) - (options.hideTitleBar ? 0 : 24)
  ))

  if (options.frameLoadDelegate || options.handlers) {
    var handlers = options.frameLoadDelegate || {}
    if (options.handlers) {
      var lastQueryId
      handlers[LOCATION_CHANGED] = function (webview, frame) {
        var query = webview.windowScriptObject().evaluateWebScript('window.location.hash')
        query = parseQuery(query)
        if (query.pluginAction && query.actionId && query.actionId !== lastQueryId && query.pluginAction in options.handlers) {
          lastQueryId = query.actionId
          try {
            query.pluginArgs = JSON.parse(query.pluginArgs)
          } catch (err) {}
          options.handlers[query.pluginAction].apply(context, query.pluginArgs)
        }
      }
    }
    var frameLoadDelegate = new MochaJSDelegate(handlers)
    webView.setFrameLoadDelegate_(frameLoadDelegate.getClassInstance())
  }
  if (options.uiDelegate) {
    var uiDelegate = new MochaJSDelegate(options.uiDelegate)
    webView.setUIDelegate_(uiDelegate.getClassInstance())
  }

  webView.setOpaque(true)
  webView.setBackgroundColor(backgroundColor)

  // When frameLocation is a file, prefix it with the Sketch Resources path
  if ((/^(?!http|localhost|www|file).*\.html?$/).test(frameLocation)) {
    frameLocation = context.plugin.urlForResourceNamed(frameLocation).path()
  }
  webView.setMainFrameURL_(frameLocation)

  panel.contentView().addSubview(webView)
  panel.center()
  panel.makeKeyAndOrderFront(null)

  return {
    panel: panel,
    eval: webView.stringByEvaluatingJavaScriptFromString,
    webView: webView
  }
}

WebUI.clean = function () {
  coScript.setShouldKeepAround(false)
}

module.exports = WebUI


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/parseQuery.js":
/*!***************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/parseQuery.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (query) {
  query = query.split('?')[1]
  if (!query) { return }
  query = query.split('&').reduce(function (prev, s) {
    var res = s.split('=')
    if (res.length === 2) {
      prev[decodeURIComponent(res[0])] = decodeURIComponent(res[1])
    }
    return prev
  }, {})
  return query
}


/***/ }),

/***/ "./src/analytics.js":
/*!**************************!*\
  !*** ./src/analytics.js ***!
  \**************************/
/*! exports provided: sendEvent, sendError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendEvent", function() { return sendEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendError", function() { return sendError; });
/* harmony import */ var sketch_module_google_analytics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch-module-google-analytics */ "./node_modules/sketch-module-google-analytics/index.js");
/* harmony import */ var sketch_module_google_analytics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_module_google_analytics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preferences__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./preferences */ "./src/preferences.js");


var key = 'UA-ffffff-1';
function sendEvent(context, category, action, label, value) {
  // const { sendAnalytics } = getUserPreferences(context)
  // if (!sendAnalytics) { return }
  // const payload = {}
  // if (category) { payload.ec = category }
  // if (action) { payload.ea = action }
  // if (label) { payload.el = label }
  // if (value) { payload.ev = value }
  return true;
}
function sendError(context, error) {
  // const { sendAnalytics } = getUserPreferences(context)
  // if (!sendAnalytics) { return }
  return true;
}

/***/ }),

/***/ "./src/commands/Branches.js":
/*!**********************************!*\
  !*** ./src/commands/Branches.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../analytics */ "./src/analytics.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common */ "./src/common.js");
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sketch-module-web-view */ "./node_modules/sketch-module-web-view/lib/index.js");
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view__WEBPACK_IMPORTED_MODULE_2__);
// Branches (cmd alt ctrl b)



/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  if (!Object(_common__WEBPACK_IMPORTED_MODULE_1__["checkForFile"])(context)) {
    return;
  }

  Object(_common__WEBPACK_IMPORTED_MODULE_1__["executeSafely"])(context, function () {
    var listBranchesCommand = 'git for-each-ref --format=\'%(refname:short)\' refs/heads/';
    var listBranches = Object(_common__WEBPACK_IMPORTED_MODULE_1__["exec"])(context, listBranchesCommand);

    if (listBranches != null && listBranches != '') {
      listBranches = listBranches.split('\n');
      listBranches.pop(); // last item is always an empty string

      var currentBranch = Object(_common__WEBPACK_IMPORTED_MODULE_1__["getCurrentBranch"])(context);
      var webUI = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_2___default.a(context, 'branches.html', {
        identifier: 'git-sketch-plugin.branches',
        height: 280,
        onlyShowCloseButton: true,
        hideTitleBar: true,
        handlers: {
          checkoutBranch: function checkoutBranch(name) {
            Object(_common__WEBPACK_IMPORTED_MODULE_1__["executeSafely"])(context, function () {
              var command = 'git checkout -q ' + name;
              Object(_common__WEBPACK_IMPORTED_MODULE_1__["exec"])(context, command);
              var app = NSApp.delegate();
              app.refreshCurrentDocument();
              webUI.panel.close();
              context.document.showMessage("Switched to branch '".concat(name, "'"));
            });
          },
          deleteBranch: function deleteBranch(name) {
            Object(_common__WEBPACK_IMPORTED_MODULE_1__["executeSafely"])(context, function () {
              var command = 'git branch -d ' + name;
              Object(_common__WEBPACK_IMPORTED_MODULE_1__["exec"])(context, command);
              context.document.showMessage("Deleted branch '".concat(name, "'"));
            });
          },
          createBranch: function createBranch() {
            Object(_common__WEBPACK_IMPORTED_MODULE_1__["executeSafely"])(context, function () {
              var branchName = Object(_common__WEBPACK_IMPORTED_MODULE_1__["createInput"])(context, 'New branch name', 'Create branch');

              if (branchName.responseCode == 1000 && branchName.message != null) {
                var command = 'git checkout -qb ' + branchName.message;
                Object(_common__WEBPACK_IMPORTED_MODULE_1__["exec"])(context, command);
                context.document.showMessage("Switched to a new branch '" + branchName.message + "'");
                Object(_analytics__WEBPACK_IMPORTED_MODULE_0__["sendEvent"])(context, 'Branch', 'Create branch', 'Did create branch');
                webUI.panel.close();
              }
            });
          }
        }
      });
      webUI.eval('window.branches=["' + listBranches.join('", "') + '"]');
      webUI.eval('window.currentBranch="' + currentBranch + '"');
      webUI.eval('window.ready=true');
    } else {
      Object(_analytics__WEBPACK_IMPORTED_MODULE_0__["sendEvent"])(context, 'Branch', 'Switch branch', 'no branches');
      context.document.showMessage('No branches');
    }
  });
});

/***/ }),

/***/ "./src/common.js":
/*!***********************!*\
  !*** ./src/common.js ***!
  \***********************/
/*! exports provided: setIconForAlert, reloadCurrentSketchDocument, executeSafely, exec, getCurrentDirectory, getGitDirectory, getCurrentFileName, createFailAlert, createInput, createInputWithCheckbox, createSelect, getCurrentBranch, exportArtboards, copyCommandlet, checkForFile, checkForCommandlet, checkForGitRepository */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setIconForAlert", function() { return setIconForAlert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reloadCurrentSketchDocument", function() { return reloadCurrentSketchDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "executeSafely", function() { return executeSafely; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exec", function() { return exec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentDirectory", function() { return getCurrentDirectory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGitDirectory", function() { return getGitDirectory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentFileName", function() { return getCurrentFileName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFailAlert", function() { return createFailAlert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createInput", function() { return createInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createInputWithCheckbox", function() { return createInputWithCheckbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSelect", function() { return createSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentBranch", function() { return getCurrentBranch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportArtboards", function() { return exportArtboards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyCommandlet", function() { return copyCommandlet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkForFile", function() { return checkForFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkForCommandlet", function() { return checkForCommandlet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkForGitRepository", function() { return checkForGitRepository; });
/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./analytics */ "./src/analytics.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Common library of things


var Document = __webpack_require__(/*! sketch/dom */ "sketch/dom").Document;

function setIconForAlert(context, alert) {// alert.setIcon(NSImage.alloc().initWithContentsOfFile(
  //   context.plugin.urlForResourceNamed('icon.png').path()))
}
function reloadCurrentSketchDocument(context) {
  // Reload a sketch document currently open
  var path = context.document.fileURL().path();
  path = path + '';
  context.document.close();
  Document.open(path);
  context.document.showMessage('Sketch file was reloaded with changes.');
}
function executeSafely(context, func) {
  try {
    func(context);
  } catch (e) {
    Object(_analytics__WEBPACK_IMPORTED_MODULE_0__["sendError"])(context, e);
    createFailAlert(context, 'Failed...', e, true);
  }
}
function exec(context, command) {
  var task = NSTask.alloc().init();
  var pipe = NSPipe.pipe();
  var errPipe = NSPipe.pipe();
  var path = getCurrentDirectory(context);
  command = "cd \"".concat(path, "\" && ").concat(command);
  task.setLaunchPath_('/bin/bash');
  task.setArguments_(NSArray.arrayWithArray_(['-c', '-l', command]));
  task.standardOutput = pipe;
  task.standardError = errPipe;
  task.launch();
  var errData = errPipe.fileHandleForReading().readDataToEndOfFile();
  var data = pipe.fileHandleForReading().readDataToEndOfFile();

  if (task.terminationStatus() != 0) {
    var message = 'Unknow error';

    if (errData != null && errData.length()) {
      message = NSString.alloc().initWithData_encoding_(errData, NSUTF8StringEncoding);
    } else if (data != null && data.length()) {
      message = NSString.alloc().initWithData_encoding_(data, NSUTF8StringEncoding);
    }

    return NSException.raise_format_('failed', message);
  }

  return NSString.alloc().initWithData_encoding_(data, NSUTF8StringEncoding);
}
function getCurrentDirectory(context) {
  return context.document.fileURL().URLByDeletingLastPathComponent().path();
}
function getGitDirectory(context) {
  return exec(context, 'git rev-parse --show-toplevel').trim().replace('(B[m', '');
}
function getCurrentFileName(context) {
  return context.document.fileURL().lastPathComponent();
}
function createFailAlert(context, title, error, buttonToReport) {
  console.log(error);
  var alert = NSAlert.alloc().init();
  alert.informativeText = '' + error;
  alert.messageText = title;
  alert.addButtonWithTitle('OK');

  if (buttonToReport) {
    alert.addButtonWithTitle('Report issue');
  }

  setIconForAlert(context, alert);
  var responseCode = alert.runModal();

  if (responseCode == 1001) {
    var errorString = error;

    if (_typeof(error) === 'object') {
      try {
        errorString = JSON.stringify(error, null, '\t');

        if (errorString === '{}') {
          errorString = error;
        }
      } catch (e) {}
    }

    var urlString = "https://github.com/mathieudutour/git-sketch-plugin/issues/new?body=".concat(encodeURIComponent('### How did it happen?\n1.\n2.\n3.\n\n\n### Error log\n\n```\n' + errorString + '\n```'));
    var url = NSURL.URLWithString(urlString);
    NSWorkspace.sharedWorkspace().openURL(url);
  }

  return {
    responseCode: responseCode
  };
}
function createInput(context, msg, okLabel, cancelLabel) {
  var accessory = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 50));
  var input = NSTextField.alloc().initWithFrame(NSMakeRect(0, 25, 300, 25));
  input.editable = true;
  accessory.addSubview(input);
  var alert = NSAlert.alloc().init();
  alert.setMessageText(msg);
  alert.addButtonWithTitle(okLabel || 'OK');
  alert.addButtonWithTitle(cancelLabel || 'Cancel');
  setIconForAlert(context, alert);
  alert.setAccessoryView(accessory);
  var responseCode = alert.runModal();
  var message = input.stringValue();
  return {
    responseCode: responseCode,
    message: message
  };
}
function createInputWithCheckbox(context, msg, checkboxMsg, checked, okLabel, cancelLabel) {
  var accessory = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 100));
  var input = TextArea(0, 25, 300, 75);
  var checkbox = NSButton.alloc().initWithFrame(NSMakeRect(0, 0, 300, 25));
  checkbox.setButtonType(3);
  checkbox.title = checkboxMsg;
  checkbox.state = checked ? 1 : 0;
  accessory.addSubview(input.view);
  accessory.addSubview(checkbox);
  var alert = NSAlert.alloc().init();
  alert.setMessageText(msg);
  alert.addButtonWithTitle(okLabel || 'OK');
  alert.addButtonWithTitle(cancelLabel || 'Cancel');
  setIconForAlert(context, alert);
  alert.setAccessoryView(accessory);
  var responseCode = alert.runModal();
  var message = input.getValue();
  return {
    responseCode: responseCode,
    message: message,
    checked: checkbox.state() == 1
  };
}
function createSelect(context, msg, items, selectedItemIndex, okLabel, cancelLabel) {
  selectedItemIndex = selectedItemIndex || 0;
  var accessory = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 200, 25));
  accessory.addItemsWithObjectValues(items);
  accessory.selectItemAtIndex(selectedItemIndex);
  var alert = NSAlert.alloc().init();
  alert.setMessageText(msg);
  alert.addButtonWithTitle(okLabel || 'OK');
  alert.addButtonWithTitle(cancelLabel || 'Cancel');
  setIconForAlert(context, alert);
  alert.setAccessoryView(accessory);
  var responseCode = alert.runModal();
  var sel = accessory.indexOfSelectedItem();
  return {
    responseCode: responseCode,
    index: sel
  };
}
function getCurrentBranch(context) {
  var path = getCurrentDirectory(context);
  var currentBranchCommand = "cd \"".concat(path, "\" && git rev-parse --abbrev-ref HEAD");
  var branch;

  try {
    branch = exec(context, currentBranchCommand).split('\n')[0];
  } catch (e) {
    branch = 'master';
  }

  return branch;
}
function exportArtboards(context, prefs) {
  var currentFileName = getCurrentFileName(context);
  var path = getCurrentDirectory(context);
  var currentFileNameWithoutExtension = currentFileName.replace(/\.sketch$/, '');
  var exportFolder = prefs.exportFolder,
      exportFormat = prefs.exportFormat,
      exportScale = prefs.exportScale,
      includeOverviewFile = prefs.includeOverviewFile;
  var pluginPath = context.scriptPath.replace(/\/Contents\/Sketch\/(\w*)\.js$/, '').replace(/ /g, '\\ ');
  var bundlePath = NSBundle.mainBundle().bundlePath();
  var fileFolder = exportFolder + '/' + currentFileNameWithoutExtension;
  var command = "".concat(pluginPath, "/exportArtboard.sh \"").concat(path, "\" \"").concat(exportFolder, "\" \"").concat(fileFolder, "\" \"").concat(bundlePath, "\" \"").concat(currentFileName, "\" \"").concat(exportFormat || 'png', "\" \"").concat(exportScale, "\" \"").concat(includeOverviewFile, "\"");
  return exec(context, command);
}
function copyCommandlet(context) {
  var pluginPath = context.scriptPath.replace(/\/Contents\/Sketch\/(\w*)\.js$/, '').replace(/ /g, '\\ ');
  var path = getCurrentDirectory(context);
  var command = "cp ".concat(pluginPath, "/generate-sketch-files.command ").concat(path, "/ && chmod +x ").concat(path, "/generate-sketch-files.command");
  return exec(context, command);
}
function checkForFile(context) {
  try {
    getCurrentFileName(context);
    getCurrentDirectory(context);
    return true;
  } catch (e) {
    Object(_analytics__WEBPACK_IMPORTED_MODULE_0__["sendError"])(context, 'Missing file');
    createFailAlert(context, 'Missing file', 'You need to open a sketch file before doing that');
    return false;
  }
}
function checkForCommandlet(context) {
  try {
    // generate-sketch-files.command
    getCurrentDirectory(context);
    return true;
  } catch (e) {
    Object(_analytics__WEBPACK_IMPORTED_MODULE_0__["sendError"])(context, 'Missing file');
    createFailAlert(context, 'Missing file', 'You need to open a sketch file before doing that');
    return false;
  }
}
function checkForGitRepository(context) {
  try {
    getGitDirectory(context);
    return true;
  } catch (e) {
    Object(_analytics__WEBPACK_IMPORTED_MODULE_0__["sendError"])(context, 'Not a git repository');
    createFailAlert(context, 'Not a git repository', 'You need to init git repository first');
    return false;
  }
}

function TextArea(x, y, width, heigh) {
  var scrollView = NSScrollView.alloc().initWithFrame(NSMakeRect(x, y, width, heigh));
  scrollView.borderStyle = NSLineBorder;
  var contentSize = scrollView.contentSize();
  var input = NSTextView.alloc().initWithFrame(NSMakeRect(0, 0, contentSize.width, contentSize.height));
  input.minSize = NSMakeSize(0, contentSize.height);
  input.maxSize = NSMakeSize(contentSize.width, Infinity);
  scrollView.documentView = input;
  return {
    view: scrollView,
    getValue: function getValue() {
      return input.string();
    }
  };
}

/***/ }),

/***/ "./src/preferences.js":
/*!****************************!*\
  !*** ./src/preferences.js ***!
  \****************************/
/*! exports provided: getUserPreferences, setUserPreferences */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserPreferences", function() { return getUserPreferences; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUserPreferences", function() { return setUserPreferences; });
/* harmony import */ var sketch_module_user_preferences__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch-module-user-preferences */ "./node_modules/sketch-module-user-preferences/index.js");
/* harmony import */ var sketch_module_user_preferences__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_module_user_preferences__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_module_fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch-module-fs */ "./node_modules/sketch-module-fs/index.js");
/* harmony import */ var sketch_module_fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_module_fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "./src/common.js");



var keyPref = 'gitSketch';
var PREFS_FILE = '.gitsketchrc';
var LOCAL_PREFS = {
  exportFolder: '.exportedArtboards',
  exportFormat: 'png',
  exportScale: '1.0',
  includeOverviewFile: true,
  autoExportOnSave: false
};
var GLOBAL_PREFS = {
  terminal: 'Terminal',
  diffByDefault: true,
  sendAnalytics: false
};
function getUserPreferences(context) {
  // let localPrefs = {}
  // try {
  //   var path = getGitDirectory(context)
  //   localPrefs = JSON.parse(fs.readFile(path + '/' + PREFS_FILE))
  // } catch (e) {
  //   console.log(e)
  // }
  // return Object.assign(
  //   {},
  //   LOCAL_PREFS,
  //   prefsManager.getUserPreferences(keyPref, GLOBAL_PREFS),
  //   localPrefs
  // )
  return {
    exportFolder: '.exportedArtboards',
    exportFormat: 'png',
    exportScale: '1.0',
    includeOverviewFile: true,
    autoExportOnSave: false,
    terminal: 'Terminal',
    diffByDefault: true,
    sendAnalytics: false
  };
}
function setUserPreferences(context, prefs) {
  var localPrefs = {};
  var globalPrefs = {};
  Object.keys(prefs).forEach(function (k) {
    if (Object.keys(LOCAL_PREFS).indexOf(k) !== -1) {
      localPrefs[k] = prefs[k];
    } else {
      globalPrefs[k] = prefs[k];
    }
  });

  try {
    var path = Object(_common__WEBPACK_IMPORTED_MODULE_2__["getGitDirectory"])(context);
    sketch_module_fs__WEBPACK_IMPORTED_MODULE_1___default.a.writeFile(path + '/' + PREFS_FILE, JSON.stringify(localPrefs, null, '  '));
    Object(_common__WEBPACK_IMPORTED_MODULE_2__["exec"])(context, 'git add "' + path + '/' + PREFS_FILE + '"');
  } catch (e) {
    console.log(e);
  }

  return sketch_module_user_preferences__WEBPACK_IMPORTED_MODULE_0___default.a.setUserPreferences(keyPref, globalPrefs);
}

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=Branches.js.map
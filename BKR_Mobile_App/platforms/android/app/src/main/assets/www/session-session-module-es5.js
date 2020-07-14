function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["session-session-module"], {
  /***/
  "./node_modules/events/events.js":
  /*!***************************************!*\
    !*** ./node_modules/events/events.js ***!
    \***************************************/

  /*! no static exports found */

  /***/
  function node_modulesEventsEventsJs(module, exports, __webpack_require__) {
    "use strict"; // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.

    var R = typeof Reflect === 'object' ? Reflect : null;
    var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;

    if (R && typeof R.ownKeys === 'function') {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target);
      };
    }

    function ProcessEmitWarning(warning) {
      if (console && console.warn) console.warn(warning);
    }

    var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
      return value !== value;
    };

    function EventEmitter() {
      EventEmitter.init.call(this);
    }

    module.exports = EventEmitter; // Backwards-compat with node 0.10.x

    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._eventsCount = 0;
    EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
    // added to it. This is a useful default which helps finding memory leaks.

    var defaultMaxListeners = 10;

    function checkListener(listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }

    Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
      enumerable: true,
      get: function get() {
        return defaultMaxListeners;
      },
      set: function set(arg) {
        if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
        }

        defaultMaxListeners = arg;
      }
    });

    EventEmitter.init = function () {
      if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
      }

      this._maxListeners = this._maxListeners || undefined;
    }; // Obviously not all Emitters should be limited to 10. This function allows
    // that to be increased. Set to zero for unlimited.


    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
      }

      this._maxListeners = n;
      return this;
    };

    function _getMaxListeners(that) {
      if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }

    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };

    EventEmitter.prototype.emit = function emit(type) {
      var args = [];

      for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      var doError = type === 'error';
      var events = this._events;
      if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.

      if (doError) {
        var er;
        if (args.length > 0) er = args[0];

        if (er instanceof Error) {
          // Note: The comments on the `throw` lines are intentional, they show
          // up in Node's output if this results in an unhandled exception.
          throw er; // Unhandled 'error' event
        } // At least give some kind of context to the user


        var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
        err.context = er;
        throw err; // Unhandled 'error' event
      }

      var handler = events[type];
      if (handler === undefined) return false;

      if (typeof handler === 'function') {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);

        for (var i = 0; i < len; ++i) {
          ReflectApply(listeners[i], this, args);
        }
      }

      return true;
    };

    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;

      if (events === undefined) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
      } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener !== undefined) {
          target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
          // this._events to be assigned to a new object

          events = target._events;
        }

        existing = events[type];
      }

      if (existing === undefined) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === 'function') {
          // Adding the second element, need to change to array.
          existing = events[type] = prepend ? [listener, existing] : [existing, listener]; // If we've already got an array, just append.
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        } // Check for listener leak


        m = _getMaxListeners(target);

        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true; // No error code for this since it is a Warning
          // eslint-disable-next-line no-restricted-syntax

          var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
          w.name = 'MaxListenersExceededWarning';
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }

      return target;
    }

    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };

    EventEmitter.prototype.on = EventEmitter.prototype.addListener;

    EventEmitter.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0) return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }

    function _onceWrap(target, type, listener) {
      var state = {
        fired: false,
        wrapFn: undefined,
        target: target,
        type: type,
        listener: listener
      };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }

    EventEmitter.prototype.once = function once(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };

    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    }; // Emits a 'removeListener' event if and only if the listener was removed.


    EventEmitter.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === undefined) return this;
      list = events[type];
      if (list === undefined) return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0) this._events = Object.create(null);else {
          delete events[type];
          if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0) return this;
        if (position === 0) list.shift();else {
          spliceOne(list, position);
        }
        if (list.length === 1) events[type] = list[0];
        if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

    EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (events === undefined) return this; // not listening for removeListener, no need to emit

      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
        }

        return this;
      } // emit removeListener for all listeners on all events


      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;

        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }

        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === undefined) return [];
      var evlistener = events[type];
      if (evlistener === undefined) return [];
      if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }

    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };

    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };

    EventEmitter.listenerCount = function (emitter, type) {
      if (typeof emitter.listenerCount === 'function') {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };

    EventEmitter.prototype.listenerCount = listenerCount;

    function listenerCount(type) {
      var events = this._events;

      if (events !== undefined) {
        var evlistener = events[type];

        if (typeof evlistener === 'function') {
          return 1;
        } else if (evlistener !== undefined) {
          return evlistener.length;
        }
      }

      return 0;
    }

    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };

    function arrayClone(arr, n) {
      var copy = new Array(n);

      for (var i = 0; i < n; ++i) {
        copy[i] = arr[i];
      }

      return copy;
    }

    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++) {
        list[index] = list[index + 1];
      }

      list.pop();
    }

    function unwrapListeners(arr) {
      var ret = new Array(arr.length);

      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }

      return ret;
    }
    /***/

  },

  /***/
  "./node_modules/freeice/index.js":
  /*!***************************************!*\
    !*** ./node_modules/freeice/index.js ***!
    \***************************************/

  /*! no static exports found */

  /***/
  function node_modulesFreeiceIndexJs(module, exports, __webpack_require__) {
    "use strict";
    /* jshint node: true */

    var normalice = __webpack_require__(
    /*! normalice */
    "./node_modules/normalice/index.js");
    /**
      # freeice
    
      The `freeice` module is a simple way of getting random STUN or TURN server
      for your WebRTC application.  The list of servers (just STUN at this stage)
      were sourced from this [gist](https://gist.github.com/zziuni/3741933).
    
      ## Example Use
    
      The following demonstrates how you can use `freeice` with
      [rtc-quickconnect](https://github.com/rtc-io/rtc-quickconnect):
    
      <<< examples/quickconnect.js
    
      As the `freeice` module generates ice servers in a list compliant with the
      WebRTC spec you will be able to use it with raw `RTCPeerConnection`
      constructors and other WebRTC libraries.
    
      ## Hey, don't use my STUN/TURN server!
    
      If for some reason your free STUN or TURN server ends up in the
      list of servers ([stun](https://github.com/DamonOehlman/freeice/blob/master/stun.json) or
      [turn](https://github.com/DamonOehlman/freeice/blob/master/turn.json))
      that is used in this module, you can feel
      free to open an issue on this repository and those servers will be removed
      within 24 hours (or sooner).  This is the quickest and probably the most
      polite way to have something removed (and provides us some visibility
      if someone opens a pull request requesting that a server is added).
    
      ## Please add my server!
    
      If you have a server that you wish to add to the list, that's awesome! I'm
      sure I speak on behalf of a whole pile of WebRTC developers who say thanks.
      To get it into the list, feel free to either open a pull request or if you
      find that process a bit daunting then just create an issue requesting
      the addition of the server (make sure you provide all the details, and if
      you have a Terms of Service then including that in the PR/issue would be
      awesome).
    
      ## I know of a free server, can I add it?
    
      Sure, if you do your homework and make sure it is ok to use (I'm currently
      in the process of reviewing the terms of those STUN servers included from
      the original list).  If it's ok to go, then please see the previous entry
      for how to add it.
    
      ## Current List of Servers
    
      * current as at the time of last `README.md` file generation
    
      ### STUN
    
      <<< stun.json
    
      ### TURN
    
      <<< turn.json
    
    **/


    var freeice = function freeice(opts) {
      // if a list of servers has been provided, then use it instead of defaults
      var servers = {
        stun: (opts || {}).stun || __webpack_require__(
        /*! ./stun.json */
        "./node_modules/freeice/stun.json"),
        turn: (opts || {}).turn || __webpack_require__(
        /*! ./turn.json */
        "./node_modules/freeice/turn.json")
      };
      var stunCount = (opts || {}).stunCount || 2;
      var turnCount = (opts || {}).turnCount || 0;
      var selected;

      function getServers(type, count) {
        var out = [];
        var input = [].concat(servers[type]);
        var idx;

        while (input.length && out.length < count) {
          idx = Math.random() * input.length | 0;
          out = out.concat(input.splice(idx, 1));
        }

        return out.map(function (url) {
          //If it's a not a string, don't try to "normalice" it otherwise using type:url will screw it up
          if (typeof url !== 'string' && !(url instanceof String)) {
            return url;
          } else {
            return normalice(type + ':' + url);
          }
        });
      } // add stun servers


      selected = [].concat(getServers('stun', stunCount));

      if (turnCount) {
        selected = selected.concat(getServers('turn', turnCount));
      }

      return selected;
    };

    module.exports = freeice;
    /***/
  },

  /***/
  "./node_modules/freeice/stun.json":
  /*!****************************************!*\
    !*** ./node_modules/freeice/stun.json ***!
    \****************************************/

  /*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, default */

  /***/
  function node_modulesFreeiceStunJson(module) {
    module.exports = JSON.parse("[\"stun.l.google.com:19302\",\"stun1.l.google.com:19302\",\"stun2.l.google.com:19302\",\"stun3.l.google.com:19302\",\"stun4.l.google.com:19302\",\"stun.ekiga.net\",\"stun.ideasip.com\",\"stun.schlund.de\",\"stun.stunprotocol.org:3478\",\"stun.voiparound.com\",\"stun.voipbuster.com\",\"stun.voipstunt.com\",\"stun.voxgratia.org\"]");
    /***/
  },

  /***/
  "./node_modules/freeice/turn.json":
  /*!****************************************!*\
    !*** ./node_modules/freeice/turn.json ***!
    \****************************************/

  /*! exports provided: default */

  /***/
  function node_modulesFreeiceTurnJson(module) {
    module.exports = JSON.parse("[]");
    /***/
  },

  /***/
  "./node_modules/hark/hark.js":
  /*!***********************************!*\
    !*** ./node_modules/hark/hark.js ***!
    \***********************************/

  /*! no static exports found */

  /***/
  function node_modulesHarkHarkJs(module, exports, __webpack_require__) {
    var WildEmitter = __webpack_require__(
    /*! wildemitter */
    "./node_modules/wildemitter/wildemitter.js");

    function getMaxVolume(analyser, fftBins) {
      var maxVolume = -Infinity;
      analyser.getFloatFrequencyData(fftBins);

      for (var i = 4, ii = fftBins.length; i < ii; i++) {
        if (fftBins[i] > maxVolume && fftBins[i] < 0) {
          maxVolume = fftBins[i];
        }
      }

      ;
      return maxVolume;
    }

    var audioContextType;

    if (typeof window !== 'undefined') {
      audioContextType = window.AudioContext || window.webkitAudioContext;
    } // use a single audio context due to hardware limits


    var audioContext = null;

    module.exports = function (stream, options) {
      var harker = new WildEmitter(); // make it not break in non-supported browsers

      if (!audioContextType) return harker; //Config

      var options = options || {},
          smoothing = options.smoothing || 0.1,
          interval = options.interval || 50,
          threshold = options.threshold,
          play = options.play,
          history = options.history || 10,
          running = true; // Ensure that just a single AudioContext is internally created

      audioContext = options.audioContext || audioContext || new audioContextType();
      var sourceNode, fftBins, analyser;
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = smoothing;
      fftBins = new Float32Array(analyser.frequencyBinCount);
      if (stream.jquery) stream = stream[0];

      if (stream instanceof HTMLAudioElement || stream instanceof HTMLVideoElement) {
        //Audio Tag
        sourceNode = audioContext.createMediaElementSource(stream);
        if (typeof play === 'undefined') play = true;
        threshold = threshold || -50;
      } else {
        //WebRTC Stream
        sourceNode = audioContext.createMediaStreamSource(stream);
        threshold = threshold || -50;
      }

      sourceNode.connect(analyser);
      if (play) analyser.connect(audioContext.destination);
      harker.speaking = false;

      harker.suspend = function () {
        return audioContext.suspend();
      };

      harker.resume = function () {
        return audioContext.resume();
      };

      Object.defineProperty(harker, 'state', {
        get: function get() {
          return audioContext.state;
        }
      });

      audioContext.onstatechange = function () {
        harker.emit('state_change', audioContext.state);
      };

      harker.setThreshold = function (t) {
        threshold = t;
      };

      harker.setInterval = function (i) {
        interval = i;
      };

      harker.stop = function () {
        running = false;
        harker.emit('volume_change', -100, threshold);

        if (harker.speaking) {
          harker.speaking = false;
          harker.emit('stopped_speaking');
        }

        analyser.disconnect();
        sourceNode.disconnect();
      };

      harker.speakingHistory = [];

      for (var i = 0; i < history; i++) {
        harker.speakingHistory.push(0);
      } // Poll the analyser node to determine if speaking
      // and emit events if changed


      var looper = function looper() {
        setTimeout(function () {
          //check if stop has been called
          if (!running) {
            return;
          }

          var currentVolume = getMaxVolume(analyser, fftBins);
          harker.emit('volume_change', currentVolume, threshold);
          var history = 0;

          if (currentVolume > threshold && !harker.speaking) {
            // trigger quickly, short history
            for (var i = harker.speakingHistory.length - 3; i < harker.speakingHistory.length; i++) {
              history += harker.speakingHistory[i];
            }

            if (history >= 2) {
              harker.speaking = true;
              harker.emit('speaking');
            }
          } else if (currentVolume < threshold && harker.speaking) {
            for (var i = 0; i < harker.speakingHistory.length; i++) {
              history += harker.speakingHistory[i];
            }

            if (history == 0) {
              harker.speaking = false;
              harker.emit('stopped_speaking');
            }
          }

          harker.speakingHistory.shift();
          harker.speakingHistory.push(0 + (currentVolume > threshold));
          looper();
        }, interval);
      };

      looper();
      return harker;
    };
    /***/

  },

  /***/
  "./node_modules/inherits/inherits_browser.js":
  /*!***************************************************!*\
    !*** ./node_modules/inherits/inherits_browser.js ***!
    \***************************************************/

  /*! no static exports found */

  /***/
  function node_modulesInheritsInherits_browserJs(module, exports) {
    if (typeof Object.create === 'function') {
      // implementation from standard node.js 'util' module
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      // old school shim for old browsers
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;

          var TempCtor = function TempCtor() {};

          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
    /***/

  },

  /***/
  "./node_modules/normalice/index.js":
  /*!*****************************************!*\
    !*** ./node_modules/normalice/index.js ***!
    \*****************************************/

  /*! no static exports found */

  /***/
  function node_modulesNormaliceIndexJs(module, exports) {
    /**
      # normalice
    
      Normalize an ice server configuration object (or plain old string) into a format
      that is usable in all browsers supporting WebRTC.  Primarily this module is designed
      to help with the transition of the `url` attribute of the configuration object to
      the `urls` attribute.
    
      ## Example Usage
    
      <<< examples/simple.js
    
    **/
    var protocols = ['stun:', 'turn:'];

    module.exports = function (input) {
      var url = (input || {}).url || input;
      var protocol;
      var parts;
      var output = {}; // if we don't have a string url, then allow the input to passthrough

      if (typeof url != 'string' && !(url instanceof String)) {
        return input;
      } // trim the url string, and convert to an array


      url = url.trim(); // if the protocol is not known, then passthrough

      protocol = protocols[protocols.indexOf(url.slice(0, 5))];

      if (!protocol) {
        return input;
      } // now let's attack the remaining url parts


      url = url.slice(5);
      parts = url.split('@');
      output.username = input.username;
      output.credential = input.credential; // if we have an authentication part, then set the credentials

      if (parts.length > 1) {
        url = parts[1];
        parts = parts[0].split(':'); // add the output credential and username

        output.username = parts[0];
        output.credential = (input || {}).credential || parts[1] || '';
      }

      output.url = protocol + url;
      output.urls = [output.url];
      return output;
    };
    /***/

  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenVidu/Connection.js":
  /*!******************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenVidu/Connection.js ***!
    \******************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduConnectionJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    exports.__esModule = true;

    var Stream_1 = __webpack_require__(
    /*! ./Stream */
    "./node_modules/openvidu-browser/lib/OpenVidu/Stream.js");

    var OpenViduLogger_1 = __webpack_require__(
    /*! ../OpenViduInternal/Logger/OpenViduLogger */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js");
    /**
     * @hidden
     */


    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    /**
     * Represents each one of the user's connection to the session (the local one and other user's connections).
     * Therefore each [[Session]] and [[Stream]] object has an attribute of type Connection
     */

    var Connection =
    /** @class */
    function () {
      /**
       * @hidden
       */
      function Connection(session, opts) {
        this.session = session;
        /**
         * @hidden
         */

        this.disposed = false;
        var msg = "'Connection' created ";

        if (!!opts) {
          // Connection is remote
          msg += "(remote) with 'connectionId' [" + opts.id + ']';
          this.options = opts;
          this.connectionId = opts.id;
          this.creationTime = opts.createdAt;

          if (opts.metadata) {
            this.data = opts.metadata;
          }

          if (opts.streams) {
            this.initRemoteStreams(opts.streams);
          }
        } else {
          // Connection is local
          msg += '(local)';
        }

        logger.info(msg);
      }
      /* Hidden methods */

      /**
       * @hidden
       */


      Connection.prototype.sendIceCandidate = function (candidate) {
        logger.debug((!!this.stream.outboundStreamOpts ? 'Local' : 'Remote') + 'candidate for' + this.connectionId, candidate);
        this.session.openvidu.sendRequest('onIceCandidate', {
          endpointName: this.connectionId,
          candidate: candidate.candidate,
          sdpMid: candidate.sdpMid,
          sdpMLineIndex: candidate.sdpMLineIndex
        }, function (error, response) {
          if (error) {
            logger.error('Error sending ICE candidate: ' + JSON.stringify(error));
          }
        });
      };
      /**
       * @hidden
       */


      Connection.prototype.initRemoteStreams = function (options) {
        var _this = this; // This is ready for supporting multiple streams per Connection object. Right now the loop will always run just once
        // this.stream should also be replaced by a collection of streams to support multiple streams per Connection


        options.forEach(function (opts) {
          var streamOptions = {
            id: opts.id,
            createdAt: opts.createdAt,
            connection: _this,
            hasAudio: opts.hasAudio,
            hasVideo: opts.hasVideo,
            audioActive: opts.audioActive,
            videoActive: opts.videoActive,
            typeOfVideo: opts.typeOfVideo,
            frameRate: opts.frameRate,
            videoDimensions: !!opts.videoDimensions ? JSON.parse(opts.videoDimensions) : undefined,
            filter: !!opts.filter ? opts.filter : undefined
          };
          var stream = new Stream_1.Stream(_this.session, streamOptions);

          _this.addStream(stream);
        });
        logger.info("Remote 'Connection' with 'connectionId' [" + this.connectionId + '] is now configured for receiving Streams with options: ', this.stream.inboundStreamOpts);
      };
      /**
       * @hidden
       */


      Connection.prototype.addStream = function (stream) {
        stream.connection = this;
        this.stream = stream;
      };
      /**
       * @hidden
       */


      Connection.prototype.removeStream = function (streamId) {
        delete this.stream;
      };
      /**
       * @hidden
       */


      Connection.prototype.dispose = function () {
        if (!!this.stream) {
          delete this.stream;
        }

        this.disposed = true;
      };

      return Connection;
    }();

    exports.Connection = Connection; //# sourceMappingURL=Connection.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenVidu/EventDispatcher.js":
  /*!***********************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenVidu/EventDispatcher.js ***!
    \***********************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduEventDispatcherJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    exports.__esModule = true;

    var EventEmitter = __webpack_require__(
    /*! wolfy87-eventemitter */
    "./node_modules/wolfy87-eventemitter/EventEmitter.js");

    var OpenViduLogger_1 = __webpack_require__(
    /*! ../OpenViduInternal/Logger/OpenViduLogger */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js");
    /**
     * @hidden
     */


    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();

    var EventDispatcher =
    /** @class */
    function () {
      function EventDispatcher() {
        /**
         * @hidden
         */
        this.userHandlerArrowHandler = new WeakMap();
        /**
         * @hidden
         */

        this.ee = new EventEmitter();
      }
      /**
       * Removes a `handler` from event `type`. If no handler is provided, all handlers will be removed from the event
       *
       * @returns The object that dispatched the event
       */


      EventDispatcher.prototype.off = function (type, handler) {
        if (!handler) {
          this.ee.removeAllListeners(type);
        } else {
          // Must remove internal arrow function handler paired with user handler
          var arrowHandler = this.userHandlerArrowHandler.get(handler);

          if (!!arrowHandler) {
            this.ee.off(type, arrowHandler);
          }

          this.userHandlerArrowHandler["delete"](handler);
        }

        return this;
      };
      /**
       * @hidden
       */


      EventDispatcher.prototype.onAux = function (type, message, handler) {
        var arrowHandler = function arrowHandler(event) {
          if (event) {
            logger.info(message, event);
          } else {
            logger.info(message);
          }

          handler(event);
        };

        this.userHandlerArrowHandler.set(handler, arrowHandler);
        this.ee.on(type, arrowHandler);
        return this;
      };
      /**
       * @hidden
       */


      EventDispatcher.prototype.onceAux = function (type, message, handler) {
        var _this = this;

        var arrowHandler = function arrowHandler(event) {
          if (event) {
            logger.info(message, event);
          } else {
            logger.info(message);
          }

          handler(event); // Remove handler from map after first and only execution

          _this.userHandlerArrowHandler["delete"](handler);
        };

        this.userHandlerArrowHandler.set(handler, arrowHandler);
        this.ee.once(type, arrowHandler);
        return this;
      };

      return EventDispatcher;
    }();

    exports.EventDispatcher = EventDispatcher; //# sourceMappingURL=EventDispatcher.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenVidu/Filter.js":
  /*!**************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenVidu/Filter.js ***!
    \**************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduFilterJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    exports.__esModule = true;

    var StreamPropertyChangedEvent_1 = __webpack_require__(
    /*! ../OpenViduInternal/Events/StreamPropertyChangedEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamPropertyChangedEvent.js");

    var OpenViduError_1 = __webpack_require__(
    /*! ../OpenViduInternal/Enums/OpenViduError */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/OpenViduError.js");

    var OpenViduLogger_1 = __webpack_require__(
    /*! ../OpenViduInternal/Logger/OpenViduLogger */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js");
    /**
     * @hidden
     */


    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    /**
     * **WARNING**: experimental option. This interface may change in the near future
     *
     * Video/audio filter applied to a Stream. See [[Stream.applyFilter]]
     */

    var Filter =
    /** @class */
    function () {
      /**
       * @hidden
       */
      function Filter(type, options) {
        /**
         * @hidden
         */
        this.handlers = {};
        this.type = type;
        this.options = options;
      }
      /**
       * Executes a filter method. Available methods are specific for each filter
       *
       * @param method Name of the method
       * @param params Parameters of the method
       */


      Filter.prototype.execMethod = function (method, params) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          logger.info('Executing filter method to stream ' + _this.stream.streamId);
          var stringParams;

          if (typeof params !== 'string') {
            try {
              stringParams = JSON.stringify(params);
            } catch (error) {
              var errorMsg = "'params' property must be a JSON formatted object";
              logger.error(errorMsg);
              reject(errorMsg);
            }
          } else {
            stringParams = params;
          }

          _this.stream.session.openvidu.sendRequest('execFilterMethod', {
            streamId: _this.stream.streamId,
            method: method,
            params: stringParams
          }, function (error, response) {
            if (error) {
              logger.error('Error executing filter method for Stream ' + _this.stream.streamId, error);

              if (error.code === 401) {
                reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to execute a filter method"));
              } else {
                reject(error);
              }
            } else {
              logger.info('Filter method successfully executed on Stream ' + _this.stream.streamId);
              var oldValue = Object.assign({}, _this.stream.filter);
              _this.stream.filter.lastExecMethod = {
                method: method,
                params: JSON.parse(stringParams)
              };

              _this.stream.session.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this.stream.session, _this.stream, 'filter', _this.stream.filter, oldValue, 'execFilterMethod')]);

              _this.stream.streamManager.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this.stream.streamManager, _this.stream, 'filter', _this.stream.filter, oldValue, 'execFilterMethod')]);

              resolve();
            }
          });
        });
      };
      /**
       * Subscribe to certain filter event. Available events are specific for each filter
       *
       * @param eventType Event to which subscribe to.
       * @param handler Function to execute upon event dispatched. It receives as parameter a [[FilterEvent]] object
       *
       * @returns A Promise (to which you can optionally subscribe to) that is resolved if the event listener was successfully attached to the filter and rejected with an Error object if not
       */


      Filter.prototype.addEventListener = function (eventType, handler) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          logger.info('Adding filter event listener to event ' + eventType + ' to stream ' + _this.stream.streamId);

          _this.stream.session.openvidu.sendRequest('addFilterEventListener', {
            streamId: _this.stream.streamId,
            eventType: eventType
          }, function (error, response) {
            if (error) {
              logger.error('Error adding filter event listener to event ' + eventType + 'for Stream ' + _this.stream.streamId, error);

              if (error.code === 401) {
                reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to add a filter event listener"));
              } else {
                reject(error);
              }
            } else {
              _this.handlers[eventType] = handler;
              logger.info('Filter event listener to event ' + eventType + ' successfully applied on Stream ' + _this.stream.streamId);
              resolve();
            }
          });
        });
      };
      /**
       * Removes certain filter event listener previously set.
       *
       * @param eventType Event to unsubscribe from.
       *
       * @returns A Promise (to which you can optionally subscribe to) that is resolved if the event listener was successfully removed from the filter and rejected with an Error object in other case
       */


      Filter.prototype.removeEventListener = function (eventType) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          logger.info('Removing filter event listener to event ' + eventType + ' to stream ' + _this.stream.streamId);

          _this.stream.session.openvidu.sendRequest('removeFilterEventListener', {
            streamId: _this.stream.streamId,
            eventType: eventType
          }, function (error, response) {
            if (error) {
              logger.error('Error removing filter event listener to event ' + eventType + 'for Stream ' + _this.stream.streamId, error);

              if (error.code === 401) {
                reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to add a filter event listener"));
              } else {
                reject(error);
              }
            } else {
              delete _this.handlers[eventType];
              logger.info('Filter event listener to event ' + eventType + ' successfully removed on Stream ' + _this.stream.streamId);
              resolve();
            }
          });
        });
      };

      return Filter;
    }();

    exports.Filter = Filter; //# sourceMappingURL=Filter.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenVidu/LocalRecorder.js":
  /*!*********************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenVidu/LocalRecorder.js ***!
    \*********************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduLocalRecorderJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    exports.__esModule = true;

    var LocalRecorderState_1 = __webpack_require__(
    /*! ../OpenViduInternal/Enums/LocalRecorderState */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/LocalRecorderState.js");

    var platform = __webpack_require__(
    /*! platform */
    "./node_modules/platform/platform.js");

    var OpenViduLogger_1 = __webpack_require__(
    /*! ../OpenViduInternal/Logger/OpenViduLogger */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js");
    /**
     * @hidden
     */


    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    /**
     * Easy recording of [[Stream]] objects straightaway from the browser. Initialized with [[OpenVidu.initLocalRecorder]] method
     *
     * > WARNINGS:
     * - Performing browser local recording of **remote streams** may cause some troubles. A long waiting time may be required after calling _LocalRecorder.stop()_ in this case
     * - Only Chrome and Firefox support local stream recording
     */

    var LocalRecorder =
    /** @class */
    function () {
      /**
       * @hidden
       */
      function LocalRecorder(stream) {
        this.stream = stream;
        this.chunks = [];
        this.connectionId = !!this.stream.connection ? this.stream.connection.connectionId : 'default-connection';
        this.id = this.stream.streamId + '_' + this.connectionId + '_localrecord';
        this.state = LocalRecorderState_1.LocalRecorderState.READY;
      }
      /**
       * Starts the recording of the Stream. [[state]] property must be `READY`. After method succeeds is set to `RECORDING`
       *
       * @param mimeType The [MediaRecorder.mimeType](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/mimeType) to be used to record this Stream.
       * Make sure the platform supports it or the promise will return an error. If this parameter is not provided, the MediaRecorder will use the default codecs available in the platform
       *
       * @returns A Promise (to which you can optionally subscribe to) that is resolved if the recording successfully started and rejected with an Error object if not
       */


      LocalRecorder.prototype.record = function (mimeType) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          try {
            if (typeof MediaRecorder === 'undefined') {
              logger.error('MediaRecorder not supported on your browser. See compatibility in https://caniuse.com/#search=MediaRecorder');
              throw Error('MediaRecorder not supported on your browser. See compatibility in https://caniuse.com/#search=MediaRecorder');
            }

            if (_this.state !== LocalRecorderState_1.LocalRecorderState.READY) {
              throw Error('\'LocalRecord.record()\' needs \'LocalRecord.state\' to be \'READY\' (current value: \'' + _this.state + '\'). Call \'LocalRecorder.clean()\' or init a new LocalRecorder before');
            }

            logger.log("Starting local recording of stream '" + _this.stream.streamId + "' of connection '" + _this.connectionId + "'");
            var options = {};

            if (typeof MediaRecorder.isTypeSupported === 'function') {
              if (!!mimeType) {
                if (!MediaRecorder.isTypeSupported(mimeType)) {
                  reject(new Error('mimeType "' + mimeType + '" is not supported'));
                }

                options = {
                  mimeType: mimeType
                };
              } else {
                logger.log('No mimeType parameter provided. Using default codecs');
              }
            } else {
              logger.warn('MediaRecorder#isTypeSupported is not supported. Using default codecs');
            }

            _this.mediaRecorder = new MediaRecorder(_this.stream.getMediaStream(), options);

            _this.mediaRecorder.start(10);
          } catch (err) {
            reject(err);
          }

          _this.mediaRecorder.ondataavailable = function (e) {
            _this.chunks.push(e.data);
          };

          _this.mediaRecorder.onerror = function (e) {
            logger.error('MediaRecorder error: ', e);
          };

          _this.mediaRecorder.onstart = function () {
            logger.log('MediaRecorder started (state=' + _this.mediaRecorder.state + ')');
          };

          _this.mediaRecorder.onstop = function () {
            _this.onStopDefault();
          };

          _this.mediaRecorder.onpause = function () {
            logger.log('MediaRecorder paused (state=' + _this.mediaRecorder.state + ')');
          };

          _this.mediaRecorder.onresume = function () {
            logger.log('MediaRecorder resumed (state=' + _this.mediaRecorder.state + ')');
          };

          _this.mediaRecorder.onwarning = function (e) {
            logger.log('MediaRecorder warning: ' + e);
          };

          _this.state = LocalRecorderState_1.LocalRecorderState.RECORDING;
          resolve();
        });
      };
      /**
       * Ends the recording of the Stream. [[state]] property must be `RECORDING` or `PAUSED`. After method succeeds is set to `FINISHED`
       * @returns A Promise (to which you can optionally subscribe to) that is resolved if the recording successfully stopped and rejected with an Error object if not
       */


      LocalRecorder.prototype.stop = function () {
        var _this = this;

        return new Promise(function (resolve, reject) {
          try {
            if (_this.state === LocalRecorderState_1.LocalRecorderState.READY || _this.state === LocalRecorderState_1.LocalRecorderState.FINISHED) {
              throw Error('\'LocalRecord.stop()\' needs \'LocalRecord.state\' to be \'RECORDING\' or \'PAUSED\' (current value: \'' + _this.state + '\'). Call \'LocalRecorder.start()\' before');
            }

            _this.mediaRecorder.onstop = function () {
              _this.onStopDefault();

              resolve();
            };

            _this.mediaRecorder.stop();
          } catch (e) {
            reject(e);
          }
        });
      };
      /**
       * Pauses the recording of the Stream. [[state]] property must be `RECORDING`. After method succeeds is set to `PAUSED`
       * @returns A Promise (to which you can optionally subscribe to) that is resolved if the recording was successfully paused and rejected with an Error object if not
       */


      LocalRecorder.prototype.pause = function () {
        var _this = this;

        return new Promise(function (resolve, reject) {
          try {
            if (_this.state !== LocalRecorderState_1.LocalRecorderState.RECORDING) {
              reject(Error('\'LocalRecord.pause()\' needs \'LocalRecord.state\' to be \'RECORDING\' (current value: \'' + _this.state + '\'). Call \'LocalRecorder.start()\' or \'LocalRecorder.resume()\' before'));
            }

            _this.mediaRecorder.pause();

            _this.state = LocalRecorderState_1.LocalRecorderState.PAUSED;
          } catch (error) {
            reject(error);
          }
        });
      };
      /**
       * Resumes the recording of the Stream. [[state]] property must be `PAUSED`. After method succeeds is set to `RECORDING`
       * @returns A Promise (to which you can optionally subscribe to) that is resolved if the recording was successfully resumed and rejected with an Error object if not
       */


      LocalRecorder.prototype.resume = function () {
        var _this = this;

        return new Promise(function (resolve, reject) {
          try {
            if (_this.state !== LocalRecorderState_1.LocalRecorderState.PAUSED) {
              throw Error('\'LocalRecord.resume()\' needs \'LocalRecord.state\' to be \'PAUSED\' (current value: \'' + _this.state + '\'). Call \'LocalRecorder.pause()\' before');
            }

            _this.mediaRecorder.resume();

            _this.state = LocalRecorderState_1.LocalRecorderState.RECORDING;
          } catch (error) {
            reject(error);
          }
        });
      };
      /**
       * Previews the recording, appending a new HTMLVideoElement to element with id `parentId`. [[state]] property must be `FINISHED`
       */


      LocalRecorder.prototype.preview = function (parentElement) {
        if (this.state !== LocalRecorderState_1.LocalRecorderState.FINISHED) {
          throw Error('\'LocalRecord.preview()\' needs \'LocalRecord.state\' to be \'FINISHED\' (current value: \'' + this.state + '\'). Call \'LocalRecorder.stop()\' before');
        }

        this.videoPreview = document.createElement('video');
        this.videoPreview.id = this.id;
        this.videoPreview.autoplay = true;

        if (platform.name === 'Safari') {
          this.videoPreview.setAttribute('playsinline', 'true');
        }

        if (typeof parentElement === 'string') {
          var parentElementDom = document.getElementById(parentElement);

          if (parentElementDom) {
            this.videoPreview = parentElementDom.appendChild(this.videoPreview);
          }
        } else {
          this.videoPreview = parentElement.appendChild(this.videoPreview);
        }

        this.videoPreview.src = this.videoPreviewSrc;
        return this.videoPreview;
      };
      /**
       * Gracefully stops and cleans the current recording (WARNING: it is completely dismissed). Sets [[state]] to `READY` so the recording can start again
       */


      LocalRecorder.prototype.clean = function () {
        var _this = this;

        var f = function f() {
          delete _this.blob;
          _this.chunks = [];
          delete _this.mediaRecorder;
          _this.state = LocalRecorderState_1.LocalRecorderState.READY;
        };

        if (this.state === LocalRecorderState_1.LocalRecorderState.RECORDING || this.state === LocalRecorderState_1.LocalRecorderState.PAUSED) {
          this.stop().then(function () {
            return f();
          })["catch"](function () {
            return f();
          });
        } else {
          f();
        }
      };
      /**
       * Downloads the recorded video through the browser. [[state]] property must be `FINISHED`
       */


      LocalRecorder.prototype.download = function () {
        if (this.state !== LocalRecorderState_1.LocalRecorderState.FINISHED) {
          throw Error('\'LocalRecord.download()\' needs \'LocalRecord.state\' to be \'FINISHED\' (current value: \'' + this.state + '\'). Call \'LocalRecorder.stop()\' before');
        } else {
          var a = document.createElement('a');
          a.style.display = 'none';
          document.body.appendChild(a);
          var url = window.URL.createObjectURL(this.blob);
          a.href = url;
          a.download = this.id + '.webm';
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
      };
      /**
       * Gets the raw Blob file. Methods preview, download, uploadAsBinary and uploadAsMultipartfile use this same file to perform their specific actions. [[state]] property must be `FINISHED`
       */


      LocalRecorder.prototype.getBlob = function () {
        if (this.state !== LocalRecorderState_1.LocalRecorderState.FINISHED) {
          throw Error('Call \'LocalRecord.stop()\' before getting Blob file');
        } else {
          return this.blob;
        }
      };
      /**
       * Uploads the recorded video as a binary file performing an HTTP/POST operation to URL `endpoint`. [[state]] property must be `FINISHED`. Optional HTTP headers can be passed as second parameter. For example:
       * ```
       * var headers = {
       *  "Cookie": "$Version=1; Skin=new;",
       *  "Authorization":"Basic QWxhZGpbjpuIHNlctZQ=="
       * }
       * ```
       * @returns A Promise (to which you can optionally subscribe to) that is resolved with the `http.responseText` from server if the operation was successful and rejected with the failed `http.status` if not
       */


      LocalRecorder.prototype.uploadAsBinary = function (endpoint, headers) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          if (_this.state !== LocalRecorderState_1.LocalRecorderState.FINISHED) {
            reject(Error('\'LocalRecord.uploadAsBinary()\' needs \'LocalRecord.state\' to be \'FINISHED\' (current value: \'' + _this.state + '\'). Call \'LocalRecorder.stop()\' before'));
          } else {
            var http_1 = new XMLHttpRequest();
            http_1.open('POST', endpoint, true);

            if (typeof headers === 'object') {
              for (var _i = 0, _a = Object.keys(headers); _i < _a.length; _i++) {
                var key = _a[_i];
                http_1.setRequestHeader(key, headers[key]);
              }
            }

            http_1.onreadystatechange = function () {
              if (http_1.readyState === 4) {
                if (http_1.status.toString().charAt(0) === '2') {
                  // Success response from server (HTTP status standard: 2XX is success)
                  resolve(http_1.responseText);
                } else {
                  reject(http_1.status);
                }
              }
            };

            http_1.send(_this.blob);
          }
        });
      };
      /**
       * Uploads the recorded video as a multipart file performing an HTTP/POST operation to URL `endpoint`. [[state]] property must be `FINISHED`. Optional HTTP headers can be passed as second parameter. For example:
       * ```
       * var headers = {
       *  "Cookie": "$Version=1; Skin=new;",
       *  "Authorization":"Basic QWxhZGpbjpuIHNlctZQ=="
       * }
       * ```
       * @returns A Promise (to which you can optionally subscribe to) that is resolved with the `http.responseText` from server if the operation was successful and rejected with the failed `http.status` if not:
       */


      LocalRecorder.prototype.uploadAsMultipartfile = function (endpoint, headers) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          if (_this.state !== LocalRecorderState_1.LocalRecorderState.FINISHED) {
            reject(Error('\'LocalRecord.uploadAsMultipartfile()\' needs \'LocalRecord.state\' to be \'FINISHED\' (current value: \'' + _this.state + '\'). Call \'LocalRecorder.stop()\' before'));
          } else {
            var http_2 = new XMLHttpRequest();
            http_2.open('POST', endpoint, true);

            if (typeof headers === 'object') {
              for (var _i = 0, _a = Object.keys(headers); _i < _a.length; _i++) {
                var key = _a[_i];
                http_2.setRequestHeader(key, headers[key]);
              }
            }

            var sendable = new FormData();
            sendable.append('file', _this.blob, _this.id + '.webm');

            http_2.onreadystatechange = function () {
              if (http_2.readyState === 4) {
                if (http_2.status.toString().charAt(0) === '2') {
                  // Success response from server (HTTP status standard: 2XX is success)
                  resolve(http_2.responseText);
                } else {
                  reject(http_2.status);
                }
              }
            };

            http_2.send(sendable);
          }
        });
      };
      /* Private methods */


      LocalRecorder.prototype.onStopDefault = function () {
        logger.log('MediaRecorder stopped  (state=' + this.mediaRecorder.state + ')');
        this.blob = new Blob(this.chunks, {
          type: 'video/webm'
        });
        this.chunks = [];
        this.videoPreviewSrc = window.URL.createObjectURL(this.blob);
        this.state = LocalRecorderState_1.LocalRecorderState.FINISHED;
      };

      return LocalRecorder;
    }();

    exports.LocalRecorder = LocalRecorder; //# sourceMappingURL=LocalRecorder.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenVidu/OpenVidu.js":
  /*!****************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenVidu/OpenVidu.js ***!
    \****************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduOpenViduJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    exports.__esModule = true;

    var LocalRecorder_1 = __webpack_require__(
    /*! ./LocalRecorder */
    "./node_modules/openvidu-browser/lib/OpenVidu/LocalRecorder.js");

    var Publisher_1 = __webpack_require__(
    /*! ./Publisher */
    "./node_modules/openvidu-browser/lib/OpenVidu/Publisher.js");

    var Session_1 = __webpack_require__(
    /*! ./Session */
    "./node_modules/openvidu-browser/lib/OpenVidu/Session.js");

    var StreamPropertyChangedEvent_1 = __webpack_require__(
    /*! ../OpenViduInternal/Events/StreamPropertyChangedEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamPropertyChangedEvent.js");

    var OpenViduError_1 = __webpack_require__(
    /*! ../OpenViduInternal/Enums/OpenViduError */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/OpenViduError.js");

    var VideoInsertMode_1 = __webpack_require__(
    /*! ../OpenViduInternal/Enums/VideoInsertMode */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/VideoInsertMode.js");

    var OpenViduLogger_1 = __webpack_require__(
    /*! ../OpenViduInternal/Logger/OpenViduLogger */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js");

    var screenSharingAuto = __webpack_require__(
    /*! ../OpenViduInternal/ScreenSharing/Screen-Capturing-Auto */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/ScreenSharing/Screen-Capturing-Auto.js");

    var screenSharing = __webpack_require__(
    /*! ../OpenViduInternal/ScreenSharing/Screen-Capturing */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/ScreenSharing/Screen-Capturing.js");
    /**
     * @hidden
     */


    var EventEmitter = __webpack_require__(
    /*! wolfy87-eventemitter */
    "./node_modules/wolfy87-eventemitter/EventEmitter.js");
    /**
     * @hidden
     */


    var RpcBuilder = __webpack_require__(
    /*! ../OpenViduInternal/KurentoUtils/kurento-jsonrpc */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/index.js");
    /**
     * @hidden
     */


    var platform = __webpack_require__(
    /*! platform */
    "./node_modules/platform/platform.js");

    platform['isIonicIos'] = (platform.product === 'iPhone' || platform.product === 'iPad') && platform.ua.indexOf('Safari') === -1;
    platform['isIonicAndroid'] = platform.os.family === 'Android' && platform.name == "Android Browser";
    /**
     * @hidden
     */

    var packageJson = __webpack_require__(
    /*! ../../package.json */
    "./node_modules/openvidu-browser/package.json");
    /**
     * @hidden
     */


    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    /**
     * Entrypoint of OpenVidu Browser library.
     * Use it to initialize objects of type [[Session]], [[Publisher]] and [[LocalRecorder]]
     */

    var OpenVidu =
    /** @class */
    function () {
      function OpenVidu() {
        var _this = this;
        /**
         * @hidden
         */


        this.publishers = [];
        /**
         * @hidden
         */

        this.secret = '';
        /**
         * @hidden
         */

        this.recorder = false;
        /**
         * @hidden
         */

        this.advancedConfiguration = {};
        /**
         * @hidden
         */

        this.webrtcStatsInterval = 0;
        /**
         * @hidden
         */

        this.ee = new EventEmitter();
        this.libraryVersion = packageJson.version;
        logger.info("'OpenVidu' initialized");
        logger.info("openvidu-browser version: " + this.libraryVersion);

        if (platform.os.family === 'iOS' || platform.os.family === 'Android') {
          // Listen to orientationchange only on mobile devices
          window.addEventListener('orientationchange', function () {
            _this.publishers.forEach(function (publisher) {
              if (publisher.stream.isLocalStreamPublished && !!publisher.stream && !!publisher.stream.hasVideo && !!publisher.stream.streamManager.videos[0]) {
                var attempts_1 = 0;
                var oldWidth_1 = publisher.stream.videoDimensions.width;
                var oldHeight_1 = publisher.stream.videoDimensions.height;

                var getNewVideoDimensions_1 = function getNewVideoDimensions_1() {
                  return new Promise(function (resolve, reject) {
                    if (platform['isIonicIos']) {
                      // iOS Ionic. Limitation: must get new dimensions from an existing video element already inserted into DOM
                      resolve({
                        newWidth: publisher.stream.streamManager.videos[0].video.videoWidth,
                        newHeight: publisher.stream.streamManager.videos[0].video.videoHeight
                      });
                    } else {
                      // Rest of platforms
                      // New resolution got from different places for Chrome and Firefox. Chrome needs a videoWidth and videoHeight of a videoElement.
                      // Firefox needs getSettings from the videoTrack
                      var firefoxSettings = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings();
                      var newWidth = platform.name.toLowerCase().indexOf('firefox') !== -1 ? firefoxSettings.width : publisher.videoReference.videoWidth;
                      var newHeight = platform.name.toLowerCase().indexOf('firefox') !== -1 ? firefoxSettings.height : publisher.videoReference.videoHeight;
                      resolve({
                        newWidth: newWidth,
                        newHeight: newHeight
                      });
                    }
                  });
                };

                var repeatUntilChange_1 = setInterval(function () {
                  getNewVideoDimensions_1().then(function (newDimensions) {
                    sendStreamPropertyChangedEvent_1(oldWidth_1, oldHeight_1, newDimensions.newWidth, newDimensions.newHeight);
                  });
                }, 75);

                var sendStreamPropertyChangedEvent_1 = function sendStreamPropertyChangedEvent_1(oldWidth, oldHeight, newWidth, newHeight) {
                  attempts_1++;

                  if (attempts_1 > 10) {
                    clearTimeout(repeatUntilChange_1);
                  }

                  if (newWidth !== oldWidth || newHeight !== oldHeight) {
                    publisher.stream.videoDimensions = {
                      width: newWidth || 0,
                      height: newHeight || 0
                    };

                    _this.sendRequest('streamPropertyChanged', {
                      streamId: publisher.stream.streamId,
                      property: 'videoDimensions',
                      newValue: JSON.stringify(publisher.stream.videoDimensions),
                      reason: 'deviceRotated'
                    }, function (error, response) {
                      if (error) {
                        logger.error("Error sending 'streamPropertyChanged' event", error);
                      } else {
                        _this.session.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this.session, publisher.stream, 'videoDimensions', publisher.stream.videoDimensions, {
                          width: oldWidth,
                          height: oldHeight
                        }, 'deviceRotated')]);

                        publisher.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(publisher, publisher.stream, 'videoDimensions', publisher.stream.videoDimensions, {
                          width: oldWidth,
                          height: oldHeight
                        }, 'deviceRotated')]);
                      }
                    });

                    clearTimeout(repeatUntilChange_1);
                  }
                };
              }
            });
          });
        }
      }
      /**
       * Returns new session
       */


      OpenVidu.prototype.initSession = function () {
        this.session = new Session_1.Session(this);
        return this.session;
      };
      /**
       * Returns a new publisher
       *
       * #### Events dispatched
       *
       * The [[Publisher]] object will dispatch an `accessDialogOpened` event, only if the pop-up shown by the browser to request permissions for the camera is opened. You can use this event to alert the user about granting permissions
       * for your website. An `accessDialogClosed` event will also be dispatched after user clicks on "Allow" or "Block" in the pop-up.
       *
       * The [[Publisher]] object will dispatch an `accessAllowed` or `accessDenied` event once it has been granted access to the requested input devices or not.
       *
       * The [[Publisher]] object will dispatch a `videoElementCreated` event once a HTML video element has been added to DOM (only if you
       * [let OpenVidu take care of the video players](/en/stable/cheatsheet/manage-videos/#let-openvidu-take-care-of-the-video-players)). See [[VideoElementEvent]] to learn more.
       *
       * The [[Publisher]] object will dispatch a `streamPlaying` event once the local streams starts playing. See [[StreamManagerEvent]] to learn more.
       *
       * @param targetElement  HTML DOM element (or its `id` attribute) in which the video element of the Publisher will be inserted (see [[PublisherProperties.insertMode]]). If *null* or *undefined* no default video will be created for this Publisher.
       * You can always call method [[Publisher.addVideoElement]] or [[Publisher.createVideoElement]] to manage the video elements on your own (see [Manage video players](/en/stable/cheatsheet/manage-videos) section)
       * @param completionHandler `error` parameter is null if `initPublisher` succeeds, and is defined if it fails.
       *                          `completionHandler` function is called before the Publisher dispatches an `accessAllowed` or an `accessDenied` event
       */


      OpenVidu.prototype.initPublisher = function (targetElement, param2, param3) {
        var properties;

        if (!!param2 && typeof param2 !== 'function') {
          // Matches 'initPublisher(targetElement, properties)' or 'initPublisher(targetElement, properties, completionHandler)'
          properties = param2;
          properties = {
            audioSource: typeof properties.audioSource !== 'undefined' ? properties.audioSource : undefined,
            frameRate: typeof MediaStreamTrack !== 'undefined' && properties.videoSource instanceof MediaStreamTrack ? undefined : typeof properties.frameRate !== 'undefined' ? properties.frameRate : undefined,
            insertMode: typeof properties.insertMode !== 'undefined' ? typeof properties.insertMode === 'string' ? VideoInsertMode_1.VideoInsertMode[properties.insertMode] : properties.insertMode : VideoInsertMode_1.VideoInsertMode.APPEND,
            mirror: typeof properties.mirror !== 'undefined' ? properties.mirror : true,
            publishAudio: typeof properties.publishAudio !== 'undefined' ? properties.publishAudio : true,
            publishVideo: typeof properties.publishVideo !== 'undefined' ? properties.publishVideo : true,
            resolution: typeof MediaStreamTrack !== 'undefined' && properties.videoSource instanceof MediaStreamTrack ? undefined : typeof properties.resolution !== 'undefined' ? properties.resolution : '640x480',
            videoSource: typeof properties.videoSource !== 'undefined' ? properties.videoSource : undefined,
            filter: properties.filter
          };
        } else {
          // Matches 'initPublisher(targetElement)' or 'initPublisher(targetElement, completionHandler)'
          properties = {
            insertMode: VideoInsertMode_1.VideoInsertMode.APPEND,
            mirror: true,
            publishAudio: true,
            publishVideo: true,
            resolution: '640x480'
          };
        }

        var publisher = new Publisher_1.Publisher(targetElement, properties, this);
        var completionHandler;

        if (!!param2 && typeof param2 === 'function') {
          completionHandler = param2;
        } else if (!!param3) {
          completionHandler = param3;
        }

        publisher.initialize().then(function () {
          if (completionHandler !== undefined) {
            completionHandler(undefined);
          }

          publisher.emitEvent('accessAllowed', []);
        })["catch"](function (error) {
          if (completionHandler !== undefined) {
            completionHandler(error);
          }

          publisher.emitEvent('accessDenied', [error]);
        });
        this.publishers.push(publisher);
        return publisher;
      };

      OpenVidu.prototype.initPublisherAsync = function (targetElement, properties) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          var publisher;

          var callback = function callback(error) {
            if (!!error) {
              reject(error);
            } else {
              resolve(publisher);
            }
          };

          if (!!properties) {
            publisher = _this.initPublisher(targetElement, properties, callback);
          } else {
            publisher = _this.initPublisher(targetElement, callback);
          }
        });
      };
      /**
       * Returns a new local recorder for recording streams straight away from the browser
       * @param stream  Stream to record
       */


      OpenVidu.prototype.initLocalRecorder = function (stream) {
        return new LocalRecorder_1.LocalRecorder(stream);
      };
      /**
       * Checks if the browser supports OpenVidu
       * @returns 1 if the browser supports OpenVidu, 0 otherwise
       */


      OpenVidu.prototype.checkSystemRequirements = function () {
        var browser = platform.name;
        var family = platform.os.family;
        var userAgent = !!platform.ua ? platform.ua : navigator.userAgent;

        if (this.isIPhoneOrIPad(userAgent)) {
          if (this.isIOSWithSafari(userAgent)) {
            return 1;
          }

          return 0;
        } // Accept: Chrome (desktop and Android), Firefox (desktop and Android), Opera (desktop and Android),
        // Safari (OSX and iOS), Ionic (Android and iOS), Samsung Internet Browser (Android)


        if (browser === 'Safari' || browser === 'Chrome' || browser === 'Chrome Mobile' || browser === 'Firefox' || browser === 'Firefox Mobile' || browser === 'Opera' || browser === 'Opera Mobile' || browser === 'Android Browser' || browser === 'Electron' || browser === 'Samsung Internet Mobile' || browser === 'Samsung Internet') {
          return 1;
        } // Reject iPhones and iPads if not Safari ('Safari' also covers Ionic for iOS)
        // Reject others browsers not mentioned above


        return 0;
      };
      /**
       * Checks if the browser supports screen-sharing. Desktop Chrome, Firefox and Opera support screen-sharing
       * @returns 1 if the browser supports screen-sharing, 0 otherwise
       */


      OpenVidu.prototype.checkScreenSharingCapabilities = function () {
        var browser = platform.name;
        var version = (platform === null || platform === void 0 ? void 0 : platform.version) ? parseFloat(platform.version) : -1;
        var family = platform.os.family; // Reject mobile devices

        if (family === 'iOS' || family === 'Android') {
          return 0;
        }

        if (browser !== 'Chrome' && browser !== 'Firefox' && browser !== 'Opera' && browser !== 'Electron' && browser === 'Safari' && version < 13) {
          return 0;
        } else {
          return 1;
        }
      };
      /**
       * Collects information about the media input devices available on the system. You can pass property `deviceId` of a [[Device]] object as value of `audioSource` or `videoSource` properties in [[initPublisher]] method
       */


      OpenVidu.prototype.getDevices = function () {
        return new Promise(function (resolve, reject) {
          navigator.mediaDevices.enumerateDevices().then(function (deviceInfos) {
            var _a;

            var devices = []; // Ionic Android  devices

            if (platform['isIonicAndroid'] && typeof cordova != "undefined" && ((_a = cordova === null || cordova === void 0 ? void 0 : cordova.plugins) === null || _a === void 0 ? void 0 : _a.EnumerateDevicesPlugin)) {
              cordova.plugins.EnumerateDevicesPlugin.getEnumerateDevices().then(function (pluginDevices) {
                var pluginAudioDevices = [];
                var videoDevices = [];
                var audioDevices = [];
                pluginAudioDevices = pluginDevices.filter(function (device) {
                  return device.kind === 'audioinput';
                });
                videoDevices = deviceInfos.filter(function (device) {
                  return device.kind === 'videoinput';
                });
                audioDevices = deviceInfos.filter(function (device) {
                  return device.kind === 'audioinput';
                });
                videoDevices.forEach(function (deviceInfo, index) {
                  if (!deviceInfo.label) {
                    var label = "";

                    if (index === 0) {
                      label = "Front Camera";
                    } else if (index === 1) {
                      label = "Back Camera";
                    } else {
                      label = "Unknown Camera";
                    }

                    devices.push({
                      kind: deviceInfo.kind,
                      deviceId: deviceInfo.deviceId,
                      label: label
                    });
                  } else {
                    devices.push({
                      kind: deviceInfo.kind,
                      deviceId: deviceInfo.deviceId,
                      label: deviceInfo.label
                    });
                  }
                });
                audioDevices.forEach(function (deviceInfo, index) {
                  if (!deviceInfo.label) {
                    var label = "";

                    switch (index) {
                      case 0:
                        // Default Microphone
                        label = 'Default';
                        break;

                      case 1:
                        // Microphone + Speakerphone
                        var defaultMatch = pluginAudioDevices.filter(function (d) {
                          return d.label.includes('Built');
                        })[0];
                        label = defaultMatch ? defaultMatch.label : 'Built-in Microphone';
                        break;

                      case 2:
                        // Headset Microphone
                        var wiredMatch = pluginAudioDevices.filter(function (d) {
                          return d.label.includes('Wired');
                        })[0];

                        if (wiredMatch) {
                          label = wiredMatch.label;
                        } else {
                          label = 'Headset earpiece';
                        }

                        break;

                      case 3:
                        var wirelessMatch = pluginAudioDevices.filter(function (d) {
                          return d.label.includes('Bluetooth');
                        })[0];
                        label = wirelessMatch ? wirelessMatch.label : 'Wireless';
                        break;

                      default:
                        label = "Unknown Microphone";
                        break;
                    }

                    devices.push({
                      kind: deviceInfo.kind,
                      deviceId: deviceInfo.deviceId,
                      label: label
                    });
                  } else {
                    devices.push({
                      kind: deviceInfo.kind,
                      deviceId: deviceInfo.deviceId,
                      label: deviceInfo.label
                    });
                  }
                });
                resolve(devices);
              });
            } else {
              // Rest of platforms
              deviceInfos.forEach(function (deviceInfo) {
                if (deviceInfo.kind === 'audioinput' || deviceInfo.kind === 'videoinput') {
                  devices.push({
                    kind: deviceInfo.kind,
                    deviceId: deviceInfo.deviceId,
                    label: deviceInfo.label
                  });
                }
              });
              resolve(devices);
            }
          })["catch"](function (error) {
            logger.error('Error getting devices', error);
            reject(error);
          });
        });
      };
      /**
       * Get a MediaStream object that you can customize before calling [[initPublisher]] (pass _MediaStreamTrack_ property of the _MediaStream_ value resolved by the Promise as `audioSource` or `videoSource` properties in [[initPublisher]])
       *
       * Parameter `options` is the same as in [[initPublisher]] second parameter (of type [[PublisherProperties]]), but only the following properties will be applied: `audioSource`, `videoSource`, `frameRate`, `resolution`
       *
       * To customize the Publisher's video, the API for HTMLCanvasElement is very useful. For example, to get a black-and-white video at 10 fps and HD resolution with no sound:
       * ```
       * var OV = new OpenVidu();
       * var FRAME_RATE = 10;
       *
       * OV.getUserMedia({
       *    audioSource: false,
       *    videoSource: undefined,
       *    resolution: '1280x720',
       *    frameRate: FRAME_RATE
       * })
       * .then(mediaStream => {
       *
       *    var videoTrack = mediaStream.getVideoTracks()[0];
       *    var video = document.createElement('video');
       *    video.srcObject = new MediaStream([videoTrack]);
       *
       *    var canvas = document.createElement('canvas');
       *    var ctx = canvas.getContext('2d');
       *    ctx.filter = 'grayscale(100%)';
       *
       *    video.addEventListener('play', () => {
       *      var loop = () => {
       *        if (!video.paused && !video.ended) {
       *          ctx.drawImage(video, 0, 0, 300, 170);
       *          setTimeout(loop, 1000/ FRAME_RATE); // Drawing at 10 fps
       *        }
       *      };
       *      loop();
       *    });
       *    video.play();
       *
       *    var grayVideoTrack = canvas.captureStream(FRAME_RATE).getVideoTracks()[0];
       *    var publisher = this.OV.initPublisher(
       *      myHtmlTarget,
       *      {
       *        audioSource: false,
       *        videoSource: grayVideoTrack
       *      });
       * });
       * ```
       */


      OpenVidu.prototype.getUserMedia = function (options) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          var askForAudioStreamOnly = function askForAudioStreamOnly(previousMediaStream, constraints) {
            var definedAudioConstraint = constraints.audio === undefined ? true : constraints.audio;
            var constraintsAux = {
              audio: definedAudioConstraint,
              video: false
            };
            navigator.mediaDevices.getUserMedia(constraintsAux).then(function (audioOnlyStream) {
              previousMediaStream.addTrack(audioOnlyStream.getAudioTracks()[0]);
              resolve(previousMediaStream);
            })["catch"](function (error) {
              previousMediaStream.getAudioTracks().forEach(function (track) {
                track.stop();
              });
              previousMediaStream.getVideoTracks().forEach(function (track) {
                track.stop();
              });
              reject(_this.generateAudioDeviceError(error, constraintsAux));
            });
          };

          _this.generateMediaConstraints(options).then(function (myConstraints) {
            var _a, _b;

            if (!!myConstraints.videoTrack && !!myConstraints.audioTrack || !!myConstraints.audioTrack && ((_a = myConstraints.constraints) === null || _a === void 0 ? void 0 : _a.video) === false || !!myConstraints.videoTrack && ((_b = myConstraints.constraints) === null || _b === void 0 ? void 0 : _b.audio) === false) {
              // No need to call getUserMedia at all. Both tracks provided, or only AUDIO track provided or only VIDEO track provided
              resolve(_this.addAlreadyProvidedTracks(myConstraints, new MediaStream()));
            } else {
              // getUserMedia must be called. AUDIO or VIDEO are requesting a new track
              // Delete already provided constraints for audio or video
              if (!!myConstraints.videoTrack) {
                delete myConstraints.constraints.video;
              }

              if (!!myConstraints.audioTrack) {
                delete myConstraints.constraints.audio;
              }

              var mustAskForAudioTrackLater_1 = false;

              if (typeof options.videoSource === 'string') {
                // Video is deviceId or screen sharing
                if (options.videoSource === 'screen' || options.videoSource === 'window' || platform.name === 'Electron' && options.videoSource.startsWith('screen:')) {
                  // Video is screen sharing
                  mustAskForAudioTrackLater_1 = !myConstraints.audioTrack && options.audioSource !== null && options.audioSource !== false;

                  if (navigator.mediaDevices['getDisplayMedia'] && platform.name !== 'Electron') {
                    // getDisplayMedia supported
                    navigator.mediaDevices['getDisplayMedia']({
                      video: true
                    }).then(function (mediaStream) {
                      _this.addAlreadyProvidedTracks(myConstraints, mediaStream);

                      if (mustAskForAudioTrackLater_1) {
                        askForAudioStreamOnly(mediaStream, myConstraints.constraints);
                        return;
                      } else {
                        resolve(mediaStream);
                      }
                    })["catch"](function (error) {
                      var errorName = OpenViduError_1.OpenViduErrorName.SCREEN_CAPTURE_DENIED;
                      var errorMessage = error.toString();
                      reject(new OpenViduError_1.OpenViduError(errorName, errorMessage));
                    });
                    return;
                  } else {// getDisplayMedia NOT supported. Can perform getUserMedia below with already calculated constraints
                  }
                } else {// Video is deviceId. Can perform getUserMedia below with already calculated constraints
                  }
              } // Use already calculated constraints


              var constraintsAux = mustAskForAudioTrackLater_1 ? {
                video: myConstraints.constraints.video
              } : myConstraints.constraints;
              navigator.mediaDevices.getUserMedia(constraintsAux).then(function (mediaStream) {
                _this.addAlreadyProvidedTracks(myConstraints, mediaStream);

                if (mustAskForAudioTrackLater_1) {
                  askForAudioStreamOnly(mediaStream, myConstraints.constraints);
                  return;
                } else {
                  resolve(mediaStream);
                }
              })["catch"](function (error) {
                var errorName;
                var errorMessage = error.toString();

                if (!(options.videoSource === 'screen')) {
                  errorName = OpenViduError_1.OpenViduErrorName.DEVICE_ACCESS_DENIED;
                } else {
                  errorName = OpenViduError_1.OpenViduErrorName.SCREEN_CAPTURE_DENIED;
                }

                reject(new OpenViduError_1.OpenViduError(errorName, errorMessage));
              });
            }
          })["catch"](function (error) {
            reject(error);
          });
        });
      };
      /* tslint:disable:no-empty */

      /**
       * Disable all logging except error level
       */


      OpenVidu.prototype.enableProdMode = function () {
        logger.enableProdMode();
      };
      /* tslint:enable:no-empty */

      /**
       * Set OpenVidu advanced configuration options. Currently `configuration` is an object with the following optional properties (see [[OpenViduAdvancedConfiguration]] for more details):
       * - `iceServers`: set custom STUN/TURN servers to be used by OpenVidu Browser
       * - `screenShareChromeExtension`: url to a custom screen share extension for Chrome to be used instead of the default one, based on ours [https://github.com/OpenVidu/openvidu-screen-sharing-chrome-extension](https://github.com/OpenVidu/openvidu-screen-sharing-chrome-extension)
       * - `publisherSpeakingEventsOptions`: custom configuration for the [[PublisherSpeakingEvent]] feature and the [StreamManagerEvent.streamAudioVolumeChange](/en/stable/api/openvidu-browser/classes/streammanagerevent.html) feature
       *
       * Call this method to override previous values at any moment.
       */


      OpenVidu.prototype.setAdvancedConfiguration = function (configuration) {
        this.advancedConfiguration = configuration;
      };
      /* Hidden methods */

      /**
       * @hidden
       */


      OpenVidu.prototype.generateMediaConstraints = function (publisherProperties) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          var myConstraints = {
            audioTrack: undefined,
            videoTrack: undefined,
            constraints: {
              audio: undefined,
              video: undefined
            }
          };
          var audioSource = publisherProperties.audioSource;
          var videoSource = publisherProperties.videoSource; // CASE 1: null/false

          if (audioSource === null || audioSource === false) {
            // No audio track
            myConstraints.constraints.audio = false;
          }

          if (videoSource === null || videoSource === false) {
            // No video track
            myConstraints.constraints.video = false;
          }

          if (myConstraints.constraints.audio === false && myConstraints.constraints.video === false) {
            // ERROR! audioSource and videoSource cannot be both false at the same time
            reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.NO_INPUT_SOURCE_SET, "Properties 'audioSource' and 'videoSource' cannot be set to false or null at the same time"));
          } // CASE 2: MediaStreamTracks


          if (typeof MediaStreamTrack !== 'undefined' && audioSource instanceof MediaStreamTrack) {
            // Already provided audio track
            myConstraints.audioTrack = audioSource;
          }

          if (typeof MediaStreamTrack !== 'undefined' && videoSource instanceof MediaStreamTrack) {
            // Already provided video track
            myConstraints.videoTrack = videoSource;
          } // CASE 3: Default tracks


          if (audioSource === undefined) {
            myConstraints.constraints.audio = true;
          }

          if (videoSource === undefined) {
            myConstraints.constraints.video = {
              width: {
                ideal: 640
              },
              height: {
                ideal: 480
              }
            };
          } // CASE 3.5: give values to resolution and frameRate if video not null/false


          if (videoSource !== null && videoSource !== false) {
            if (!!publisherProperties.resolution) {
              var widthAndHeight = publisherProperties.resolution.toLowerCase().split('x');
              var idealWidth = Number(widthAndHeight[0]);
              var idealHeight = Number(widthAndHeight[1]);
              myConstraints.constraints.video = {
                width: {
                  ideal: idealWidth
                },
                height: {
                  ideal: idealHeight
                }
              };
            }

            if (!!publisherProperties.frameRate) {
              myConstraints.constraints.video.frameRate = {
                ideal: publisherProperties.frameRate
              };
            }
          } // CASE 4: deviceId or screen sharing


          _this.configureDeviceIdOrScreensharing(myConstraints, publisherProperties, resolve, reject);

          resolve(myConstraints);
        });
      };
      /**
       * @hidden
       */


      OpenVidu.prototype.startWs = function (onConnectSucces) {
        var config = {
          heartbeat: 5000,
          sendCloseMessage: false,
          ws: {
            uri: this.wsUri,
            onconnected: onConnectSucces,
            ondisconnect: this.disconnectCallback.bind(this),
            onreconnecting: this.reconnectingCallback.bind(this),
            onreconnected: this.reconnectedCallback.bind(this)
          },
          rpc: {
            requestTimeout: 10000,
            participantJoined: this.session.onParticipantJoined.bind(this.session),
            participantPublished: this.session.onParticipantPublished.bind(this.session),
            participantUnpublished: this.session.onParticipantUnpublished.bind(this.session),
            participantLeft: this.session.onParticipantLeft.bind(this.session),
            participantEvicted: this.session.onParticipantEvicted.bind(this.session),
            recordingStarted: this.session.onRecordingStarted.bind(this.session),
            recordingStopped: this.session.onRecordingStopped.bind(this.session),
            sendMessage: this.session.onNewMessage.bind(this.session),
            streamPropertyChanged: this.session.onStreamPropertyChanged.bind(this.session),
            filterEventDispatched: this.session.onFilterEventDispatched.bind(this.session),
            iceCandidate: this.session.recvIceCandidate.bind(this.session),
            mediaError: this.session.onMediaError.bind(this.session)
          }
        };
        this.jsonRpcClient = new RpcBuilder.clients.JsonRpcClient(config);
      };
      /**
       * @hidden
       */


      OpenVidu.prototype.closeWs = function () {
        this.jsonRpcClient.close(4102, "Connection closed by client");
      };
      /**
       * @hidden
       */


      OpenVidu.prototype.sendRequest = function (method, params, callback) {
        if (params && params instanceof Function) {
          callback = params;
          params = {};
        }

        logger.debug('Sending request: {method:"' + method + '", params: ' + JSON.stringify(params) + '}');
        this.jsonRpcClient.send(method, params, callback);
      };
      /**
       * @hidden
       */


      OpenVidu.prototype.getWsUri = function () {
        return this.wsUri;
      };
      /**
       * @hidden
       */


      OpenVidu.prototype.getSecret = function () {
        return this.secret;
      };
      /**
       * @hidden
       */


      OpenVidu.prototype.getRecorder = function () {
        return this.recorder;
      };
      /**
       * @hidden
       */


      OpenVidu.prototype.generateAudioDeviceError = function (error, constraints) {
        if (error.name === 'Error') {
          // Safari OverConstrainedError has as name property 'Error' instead of 'OverConstrainedError'
          error.name = error.constructor.name;
        }

        var errorName, errorMessage;

        switch (error.name.toLowerCase()) {
          case 'notfounderror':
            errorName = OpenViduError_1.OpenViduErrorName.INPUT_AUDIO_DEVICE_NOT_FOUND;
            errorMessage = error.toString();
            return new OpenViduError_1.OpenViduError(errorName, errorMessage);

          case 'notallowederror':
            errorName = OpenViduError_1.OpenViduErrorName.DEVICE_ACCESS_DENIED;
            errorMessage = error.toString();
            return new OpenViduError_1.OpenViduError(errorName, errorMessage);

          case 'overconstrainederror':
            if (error.constraint.toLowerCase() === 'deviceid') {
              errorName = OpenViduError_1.OpenViduErrorName.INPUT_AUDIO_DEVICE_NOT_FOUND;
              errorMessage = "Audio input device with deviceId '" + constraints.audio.deviceId.exact + "' not found";
            } else {
              errorName = OpenViduError_1.OpenViduErrorName.PUBLISHER_PROPERTIES_ERROR;
              errorMessage = "Audio input device doesn't support the value passed for constraint '" + error.constraint + "'";
            }

            return new OpenViduError_1.OpenViduError(errorName, errorMessage);

          case 'notreadableerror':
            errorName = OpenViduError_1.OpenViduErrorName.DEVICE_ALREADY_IN_USE;
            errorMessage = error.toString();
            return new OpenViduError_1.OpenViduError(errorName, errorMessage);

          default:
            return new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.INPUT_AUDIO_DEVICE_GENERIC_ERROR, error.toString());
        }
      };
      /**
       * @hidden
       */


      OpenVidu.prototype.addAlreadyProvidedTracks = function (myConstraints, mediaStream) {
        if (!!myConstraints.videoTrack) {
          mediaStream.addTrack(myConstraints.videoTrack);
        }

        if (!!myConstraints.audioTrack) {
          mediaStream.addTrack(myConstraints.audioTrack);
        }

        return mediaStream;
      };
      /**
       * @hidden
       */


      OpenVidu.prototype.configureDeviceIdOrScreensharing = function (myConstraints, publisherProperties, resolve, reject) {
        var _this = this;

        var audioSource = publisherProperties.audioSource;
        var videoSource = publisherProperties.videoSource;

        if (typeof audioSource === 'string') {
          myConstraints.constraints.audio = {
            deviceId: {
              exact: audioSource
            }
          };
        }

        if (typeof videoSource === 'string') {
          if (!this.isScreenShare(videoSource)) {
            this.setVideoSource(myConstraints, videoSource);
          } else {
            // Screen sharing
            if (!this.checkScreenSharingCapabilities()) {
              var error = new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.SCREEN_SHARING_NOT_SUPPORTED, 'You can only screen share in desktop Chrome, Firefox, Opera, Safari (>=13.0) or Electron. Detected client: ' + platform.name);
              logger.error(error);
              reject(error);
            } else {
              if (platform.name === 'Electron') {
                var prefix = "screen:";
                var videoSourceString = videoSource;
                var electronScreenId = videoSourceString.substr(videoSourceString.indexOf(prefix) + prefix.length);
                myConstraints.constraints.video = {
                  mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: electronScreenId
                  }
                };
                resolve(myConstraints);
              } else {
                if (!!this.advancedConfiguration.screenShareChromeExtension && !(platform.name.indexOf('Firefox') !== -1) && !navigator.mediaDevices['getDisplayMedia']) {
                  // Custom screen sharing extension for Chrome (and Opera) and no support for MediaDevices.getDisplayMedia()
                  screenSharing.getScreenConstraints(function (error, screenConstraints) {
                    if (!!error || !!screenConstraints.mandatory && screenConstraints.mandatory.chromeMediaSource === 'screen') {
                      if (error === 'permission-denied' || error === 'PermissionDeniedError') {
                        var error_1 = new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.SCREEN_CAPTURE_DENIED, 'You must allow access to one window of your desktop');
                        logger.error(error_1);
                        reject(error_1);
                      } else {
                        var extensionId = _this.advancedConfiguration.screenShareChromeExtension.split('/').pop().trim();

                        screenSharing.getChromeExtensionStatus(extensionId, function (status) {
                          if (status === 'installed-disabled') {
                            var error_2 = new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.SCREEN_EXTENSION_DISABLED, 'You must enable the screen extension');
                            logger.error(error_2);
                            reject(error_2);
                          }

                          if (status === 'not-installed') {
                            var error_3 = new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.SCREEN_EXTENSION_NOT_INSTALLED, _this.advancedConfiguration.screenShareChromeExtension);
                            logger.error(error_3);
                            reject(error_3);
                          }
                        });
                        return;
                      }
                    } else {
                      myConstraints.constraints.video = screenConstraints;
                      resolve(myConstraints);
                    }
                  });
                  return;
                } else {
                  if (navigator.mediaDevices['getDisplayMedia']) {
                    // getDisplayMedia support (Chrome >= 72, Firefox >= 66, Safari >= 13)
                    resolve(myConstraints);
                  } else {
                    // Default screen sharing extension for Chrome/Opera, or is Firefox < 66
                    var firefoxString = platform.name.indexOf('Firefox') !== -1 ? publisherProperties.videoSource : undefined;
                    screenSharingAuto.getScreenId(firefoxString, function (error, sourceId, screenConstraints) {
                      if (!!error) {
                        if (error === 'not-installed') {
                          var extensionUrl = !!_this.advancedConfiguration.screenShareChromeExtension ? _this.advancedConfiguration.screenShareChromeExtension : 'https://chrome.google.com/webstore/detail/openvidu-screensharing/lfcgfepafnobdloecchnfaclibenjold';
                          var err = new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.SCREEN_EXTENSION_NOT_INSTALLED, extensionUrl);
                          logger.error(err);
                          reject(err);
                        } else if (error === 'installed-disabled') {
                          var err = new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.SCREEN_EXTENSION_DISABLED, 'You must enable the screen extension');
                          logger.error(err);
                          reject(err);
                        } else if (error === 'permission-denied') {
                          var err = new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.SCREEN_CAPTURE_DENIED, 'You must allow access to one window of your desktop');
                          logger.error(err);
                          reject(err);
                        } else {
                          var err = new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.GENERIC_ERROR, 'Unknown error when accessing screen share');
                          logger.error(err);
                          logger.error(error);
                          reject(err);
                        }
                      } else {
                        myConstraints.constraints.video = screenConstraints.video;
                        resolve(myConstraints);
                      }
                    });
                    return;
                  }
                }
              }
            }
          }
        }
      };
      /**
       * @hidden
       */


      OpenVidu.prototype.setVideoSource = function (myConstraints, videoSource) {
        if (!myConstraints.constraints.video) {
          myConstraints.constraints.video = {};
        }

        myConstraints.constraints.video['deviceId'] = {
          exact: videoSource
        };
      };
      /* Private methods */


      OpenVidu.prototype.disconnectCallback = function () {
        logger.warn('Websocket connection lost');

        if (this.isRoomAvailable()) {
          this.session.onLostConnection('networkDisconnect');
        } else {
          alert('Connection error. Please reload page.');
        }
      };

      OpenVidu.prototype.reconnectingCallback = function () {
        logger.warn('Websocket connection lost (reconnecting)');

        if (!this.isRoomAvailable()) {
          alert('Connection error. Please reload page.');
        } else {
          this.session.emitEvent('reconnecting', []);
        }
      };

      OpenVidu.prototype.reconnectedCallback = function () {
        var _this = this;

        logger.warn('Websocket reconnected');

        if (this.isRoomAvailable()) {
          this.sendRequest('connect', {
            sessionId: this.session.connection.rpcSessionId
          }, function (error, response) {
            if (!!error) {
              logger.error(error);
              logger.warn('Websocket was able to reconnect to OpenVidu Server, but your Connection was already destroyed due to timeout. You are no longer a participant of the Session and your media streams have been destroyed');

              _this.session.onLostConnection("networkDisconnect");

              _this.jsonRpcClient.close(4101, "Reconnection fault");
            } else {
              _this.jsonRpcClient.resetPing();

              _this.session.onRecoveredConnection();
            }
          });
        } else {
          alert('Connection error. Please reload page.');
        }
      };

      OpenVidu.prototype.isRoomAvailable = function () {
        if (this.session !== undefined && this.session instanceof Session_1.Session) {
          return true;
        } else {
          logger.warn('Session instance not found');
          return false;
        }
      };

      OpenVidu.prototype.isScreenShare = function (videoSource) {
        return videoSource === 'screen' || videoSource === 'window' || platform.name === 'Electron' && videoSource.startsWith('screen:');
      };

      OpenVidu.prototype.isIPhoneOrIPad = function (userAgent) {
        var isTouchable = ('ontouchend' in document);
        var isIPad = /\b(\w*Macintosh\w*)\b/.test(userAgent) && isTouchable;
        var isIPhone = /\b(\w*iPhone\w*)\b/.test(userAgent) && /\b(\w*Mobile\w*)\b/.test(userAgent) && isTouchable;
        return isIPad || isIPhone;
      };

      OpenVidu.prototype.isIOSWithSafari = function (userAgent) {
        return /\b(\w*Apple\w*)\b/.test(navigator.vendor) && /\b(\w*Safari\w*)\b/.test(userAgent) && !/\b(\w*CriOS\w*)\b/.test(userAgent) && !/\b(\w*FxiOS\w*)\b/.test(userAgent);
      };

      return OpenVidu;
    }();

    exports.OpenVidu = OpenVidu; //# sourceMappingURL=OpenVidu.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenVidu/Publisher.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenVidu/Publisher.js ***!
    \*****************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduPublisherJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    var __extends = this && this.__extends || function () {
      var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics(d, b);
      };

      return function (d, b) {
        _extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    exports.__esModule = true;

    var Session_1 = __webpack_require__(
    /*! ./Session */
    "./node_modules/openvidu-browser/lib/OpenVidu/Session.js");

    var Stream_1 = __webpack_require__(
    /*! ./Stream */
    "./node_modules/openvidu-browser/lib/OpenVidu/Stream.js");

    var StreamManager_1 = __webpack_require__(
    /*! ./StreamManager */
    "./node_modules/openvidu-browser/lib/OpenVidu/StreamManager.js");

    var StreamEvent_1 = __webpack_require__(
    /*! ../OpenViduInternal/Events/StreamEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamEvent.js");

    var StreamPropertyChangedEvent_1 = __webpack_require__(
    /*! ../OpenViduInternal/Events/StreamPropertyChangedEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamPropertyChangedEvent.js");

    var VideoElementEvent_1 = __webpack_require__(
    /*! ../OpenViduInternal/Events/VideoElementEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/VideoElementEvent.js");

    var OpenViduError_1 = __webpack_require__(
    /*! ../OpenViduInternal/Enums/OpenViduError */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/OpenViduError.js");

    var platform = __webpack_require__(
    /*! platform */
    "./node_modules/platform/platform.js");

    var OpenViduLogger_1 = __webpack_require__(
    /*! ../OpenViduInternal/Logger/OpenViduLogger */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js");
    /**
     * @hidden
     */


    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    /**
     * Packs local media streams. Participants can publish it to a session. Initialized with [[OpenVidu.initPublisher]] method
     *
     * ### Available event listeners (and events dispatched)
     *
     * - accessAllowed
     * - accessDenied
     * - accessDialogOpened
     * - accessDialogClosed
     * - streamCreated ([[StreamEvent]])
     * - streamDestroyed ([[StreamEvent]])
     * - streamPropertyChanged ([[StreamPropertyChangedEvent]])
     */

    var Publisher =
    /** @class */
    function (_super) {
      __extends(Publisher, _super);
      /**
       * @hidden
       */


      function Publisher(targEl, properties, openvidu) {
        var _this = _super.call(this, new Stream_1.Stream(!!openvidu.session ? openvidu.session : new Session_1.Session(openvidu), {
          publisherProperties: properties,
          mediaConstraints: {}
        }), targEl) || this;
        /**
         * Whether the Publisher has been granted access to the requested input devices or not
         */


        _this.accessAllowed = false;
        /**
         * Whether you have called [[Publisher.subscribeToRemote]] with value `true` or `false` (*false* by default)
         */

        _this.isSubscribedToRemote = false;
        _this.accessDenied = false;
        _this.properties = properties;
        _this.openvidu = openvidu;

        _this.stream.ee.on('local-stream-destroyed', function (reason) {
          _this.stream.isLocalStreamPublished = false;
          var streamEvent = new StreamEvent_1.StreamEvent(true, _this, 'streamDestroyed', _this.stream, reason);

          _this.emitEvent('streamDestroyed', [streamEvent]);

          streamEvent.callDefaultBehavior();
        });

        return _this;
      }
      /**
       * Publish or unpublish the audio stream (if available). Calling this method twice in a row passing same value will have no effect
       *
       * #### Events dispatched
       *
       * > _Only if `Session.publish(Publisher)` has been called for this Publisher_
       *
       * The [[Session]] object of the local participant will dispatch a `streamPropertyChanged` event with `changedProperty` set to `"audioActive"` and `reason` set to `"publishAudio"`
       * The [[Publisher]] object of the local participant will also dispatch the exact same event
       *
       * The [[Session]] object of every other participant connected to the session will dispatch a `streamPropertyChanged` event with `changedProperty` set to `"audioActive"` and `reason` set to `"publishAudio"`
       * The respective [[Subscriber]] object of every other participant receiving this Publisher's stream will also dispatch the exact same event
       *
       * See [[StreamPropertyChangedEvent]] to learn more.
       *
       * @param value `true` to publish the audio stream, `false` to unpublish it
       */


      Publisher.prototype.publishAudio = function (value) {
        var _this = this;

        if (this.stream.audioActive !== value) {
          var affectedMediaStream = this.stream.displayMyRemote() ? this.stream.localMediaStreamWhenSubscribedToRemote : this.stream.getMediaStream();
          affectedMediaStream.getAudioTracks().forEach(function (track) {
            track.enabled = value;
          });

          if (!!this.session && !!this.stream.streamId) {
            this.session.openvidu.sendRequest('streamPropertyChanged', {
              streamId: this.stream.streamId,
              property: 'audioActive',
              newValue: value,
              reason: 'publishAudio'
            }, function (error, response) {
              if (error) {
                logger.error("Error sending 'streamPropertyChanged' event", error);
              } else {
                _this.session.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this.session, _this.stream, 'audioActive', value, !value, 'publishAudio')]);

                _this.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this, _this.stream, 'audioActive', value, !value, 'publishAudio')]);
              }
            });
          }

          this.stream.audioActive = value;
          logger.info("'Publisher' has " + (value ? 'published' : 'unpublished') + ' its audio stream');
        }
      };
      /**
       * Publish or unpublish the video stream (if available). Calling this method twice in a row passing same value will have no effect
       *
       * #### Events dispatched
       *
       * > _Only if `Session.publish(Publisher)` has been called for this Publisher_
       *
       * The [[Session]] object of the local participant will dispatch a `streamPropertyChanged` event with `changedProperty` set to `"videoActive"` and `reason` set to `"publishVideo"`
       * The [[Publisher]] object of the local participant will also dispatch the exact same event
       *
       * The [[Session]] object of every other participant connected to the session will dispatch a `streamPropertyChanged` event with `changedProperty` set to `"videoActive"` and `reason` set to `"publishVideo"`
       * The respective [[Subscriber]] object of every other participant receiving this Publisher's stream will also dispatch the exact same event
       *
       * See [[StreamPropertyChangedEvent]] to learn more.
       *
       * @param value `true` to publish the video stream, `false` to unpublish it
       */


      Publisher.prototype.publishVideo = function (value) {
        var _this = this;

        if (this.stream.videoActive !== value) {
          var affectedMediaStream = this.stream.displayMyRemote() ? this.stream.localMediaStreamWhenSubscribedToRemote : this.stream.getMediaStream();
          affectedMediaStream.getVideoTracks().forEach(function (track) {
            track.enabled = value;
          });

          if (!!this.session && !!this.stream.streamId) {
            this.session.openvidu.sendRequest('streamPropertyChanged', {
              streamId: this.stream.streamId,
              property: 'videoActive',
              newValue: value,
              reason: 'publishVideo'
            }, function (error, response) {
              if (error) {
                logger.error("Error sending 'streamPropertyChanged' event", error);
              } else {
                _this.session.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this.session, _this.stream, 'videoActive', value, !value, 'publishVideo')]);

                _this.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this, _this.stream, 'videoActive', value, !value, 'publishVideo')]);
              }
            });
          }

          this.stream.videoActive = value;
          logger.info("'Publisher' has " + (value ? 'published' : 'unpublished') + ' its video stream');
        }
      };
      /**
       * Call this method before [[Session.publish]] if you prefer to subscribe to your Publisher's remote stream instead of using the local stream, as any other user would do.
       */


      Publisher.prototype.subscribeToRemote = function (value) {
        value = value !== undefined ? value : true;
        this.isSubscribedToRemote = value;
        this.stream.subscribeToMyRemote(value);
      };
      /**
       * See [[EventDispatcher.on]]
       */


      Publisher.prototype.on = function (type, handler) {
        var _this = this;

        _super.prototype.on.call(this, type, handler);

        if (type === 'streamCreated') {
          if (!!this.stream && this.stream.isLocalStreamPublished) {
            this.emitEvent('streamCreated', [new StreamEvent_1.StreamEvent(false, this, 'streamCreated', this.stream, '')]);
          } else {
            this.stream.ee.on('stream-created-by-publisher', function () {
              _this.emitEvent('streamCreated', [new StreamEvent_1.StreamEvent(false, _this, 'streamCreated', _this.stream, '')]);
            });
          }
        }

        if (type === 'remoteVideoPlaying') {
          if (this.stream.displayMyRemote() && this.videos[0] && this.videos[0].video && this.videos[0].video.currentTime > 0 && this.videos[0].video.paused === false && this.videos[0].video.ended === false && this.videos[0].video.readyState === 4) {
            this.emitEvent('remoteVideoPlaying', [new VideoElementEvent_1.VideoElementEvent(this.videos[0].video, this, 'remoteVideoPlaying')]);
          }
        }

        if (type === 'accessAllowed') {
          if (this.accessAllowed) {
            this.emitEvent('accessAllowed', []);
          }
        }

        if (type === 'accessDenied') {
          if (this.accessDenied) {
            this.emitEvent('accessDenied', []);
          }
        }

        return this;
      };
      /**
       * See [[EventDispatcher.once]]
       */


      Publisher.prototype.once = function (type, handler) {
        var _this = this;

        _super.prototype.once.call(this, type, handler);

        if (type === 'streamCreated') {
          if (!!this.stream && this.stream.isLocalStreamPublished) {
            this.emitEvent('streamCreated', [new StreamEvent_1.StreamEvent(false, this, 'streamCreated', this.stream, '')]);
          } else {
            this.stream.ee.once('stream-created-by-publisher', function () {
              _this.emitEvent('streamCreated', [new StreamEvent_1.StreamEvent(false, _this, 'streamCreated', _this.stream, '')]);
            });
          }
        }

        if (type === 'remoteVideoPlaying') {
          if (this.stream.displayMyRemote() && this.videos[0] && this.videos[0].video && this.videos[0].video.currentTime > 0 && this.videos[0].video.paused === false && this.videos[0].video.ended === false && this.videos[0].video.readyState === 4) {
            this.emitEvent('remoteVideoPlaying', [new VideoElementEvent_1.VideoElementEvent(this.videos[0].video, this, 'remoteVideoPlaying')]);
          }
        }

        if (type === 'accessAllowed') {
          if (this.accessAllowed) {
            this.emitEvent('accessAllowed', []);
          }
        }

        if (type === 'accessDenied') {
          if (this.accessDenied) {
            this.emitEvent('accessDenied', []);
          }
        }

        return this;
      };
      /**
       * Replaces the current video or audio track with a different one. This allows you to replace an ongoing track with a different one
       * without having to renegotiate the whole WebRTC connection (that is, initializing a new Publisher, unpublishing the previous one
       * and publishing the new one).
       *
       * You can get this new MediaStreamTrack by using the native Web API or simply with [[OpenVidu.getUserMedia]] method.
       *
       * **WARNING: this method has been proven to work, but there may be some combinations of published/replaced tracks that may be incompatible between them and break the connection in OpenVidu Server. A complete renegotiation may be the only solution in this case**
       *
       * @param track The [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) object to replace the current one. If it is an audio track, the current audio track will be the replaced one. If it
       * is a video track, the current video track will be the replaced one.
       *
       * @returns A Promise (to which you can optionally subscribe to) that is resolved if the track was successfully replaced and rejected with an Error object in other case
       */


      Publisher.prototype.replaceTrack = function (track) {
        var _this = this;

        var replaceMediaStreamTrack = function replaceMediaStreamTrack() {
          var mediaStream = _this.stream.displayMyRemote() ? _this.stream.localMediaStreamWhenSubscribedToRemote : _this.stream.getMediaStream();
          var removedTrack;

          if (track.kind === 'video') {
            removedTrack = mediaStream.getVideoTracks()[0];
          } else {
            removedTrack = mediaStream.getAudioTracks()[0];
          }

          mediaStream.removeTrack(removedTrack);
          removedTrack.stop();
          mediaStream.addTrack(track);
        };

        return new Promise(function (resolve, reject) {
          if (_this.stream.isLocalStreamPublished) {
            // Only if the Publisher has been published is necessary to call native Web API RTCRtpSender.replaceTrack
            var senders = _this.stream.getRTCPeerConnection().getSenders();

            var sender = void 0;

            if (track.kind === 'video') {
              sender = senders.find(function (s) {
                return !!s.track && s.track.kind === 'video';
              });

              if (!sender) {
                reject(new Error('There\'s no replaceable track for that kind of MediaStreamTrack in this Publisher object'));
              }
            } else if (track.kind === 'audio') {
              sender = senders.find(function (s) {
                return !!s.track && s.track.kind === 'audio';
              });

              if (!sender) {
                reject(new Error('There\'s no replaceable track for that kind of MediaStreamTrack in this Publisher object'));
              }
            } else {
              reject(new Error('Unknown track kind ' + track.kind));
            }

            sender.replaceTrack(track).then(function () {
              replaceMediaStreamTrack();
              resolve();
            })["catch"](function (error) {
              reject(error);
            });
          } else {
            // Publisher not published. Simply modify local MediaStream tracks
            replaceMediaStreamTrack();
            resolve();
          }
        });
      };
      /* Hidden methods */

      /**
       * @hidden
       */


      Publisher.prototype.initialize = function () {
        var _this = this;

        return new Promise(function (resolve, reject) {
          var constraints = {};
          var constraintsAux = {};
          var timeForDialogEvent = 1250;
          var startTime;

          var errorCallback = function errorCallback(openViduError) {
            _this.accessDenied = true;
            _this.accessAllowed = false;
            reject(openViduError);
          };

          var successCallback = function successCallback(mediaStream) {
            _this.accessAllowed = true;
            _this.accessDenied = false;

            if (typeof MediaStreamTrack !== 'undefined' && _this.properties.audioSource instanceof MediaStreamTrack) {
              mediaStream.removeTrack(mediaStream.getAudioTracks()[0]);
              mediaStream.addTrack(_this.properties.audioSource);
            }

            if (typeof MediaStreamTrack !== 'undefined' && _this.properties.videoSource instanceof MediaStreamTrack) {
              mediaStream.removeTrack(mediaStream.getVideoTracks()[0]);
              mediaStream.addTrack(_this.properties.videoSource);
            } // Apply PublisherProperties.publishAudio and PublisherProperties.publishVideo


            if (!!mediaStream.getAudioTracks()[0]) {
              var enabled = _this.stream.audioActive !== undefined && _this.stream.audioActive !== null ? _this.stream.audioActive : !!_this.stream.outboundStreamOpts.publisherProperties.publishAudio;
              mediaStream.getAudioTracks()[0].enabled = enabled;
            }

            if (!!mediaStream.getVideoTracks()[0]) {
              var enabled = _this.stream.videoActive !== undefined && _this.stream.videoActive !== null ? _this.stream.videoActive : !!_this.stream.outboundStreamOpts.publisherProperties.publishVideo;
              mediaStream.getVideoTracks()[0].enabled = enabled;
            }

            _this.initializeVideoReference(mediaStream);

            if (!_this.stream.displayMyRemote()) {
              // When we are subscribed to our remote we don't still set the MediaStream object in the video elements to
              // avoid early 'streamPlaying' event
              _this.stream.updateMediaStreamInVideos();
            }

            delete _this.firstVideoElement;

            if (_this.stream.isSendVideo()) {
              if (!_this.stream.isSendScreen()) {
                if (platform['isIonicIos'] || platform.name === 'Safari') {
                  // iOS Ionic or Safari. Limitation: cannot set videoDimensions directly, as the videoReference is not loaded
                  // if not added to DOM. Must add it to DOM and wait for videoWidth and videoHeight properties to be defined
                  _this.videoReference.style.display = 'none';
                  document.body.appendChild(_this.videoReference);

                  var videoDimensionsSet_1 = function videoDimensionsSet_1() {
                    _this.stream.videoDimensions = {
                      width: _this.videoReference.videoWidth,
                      height: _this.videoReference.videoHeight
                    };
                    _this.stream.isLocalStreamReadyToPublish = true;

                    _this.stream.ee.emitEvent('stream-ready-to-publish', []);

                    document.body.removeChild(_this.videoReference);
                  };

                  var interval_1;

                  _this.videoReference.addEventListener('loadedmetadata', function () {
                    if (_this.videoReference.videoWidth === 0) {
                      interval_1 = setInterval(function () {
                        if (_this.videoReference.videoWidth !== 0) {
                          clearInterval(interval_1);
                          videoDimensionsSet_1();
                        }
                      }, 40);
                    } else {
                      videoDimensionsSet_1();
                    }
                  });
                } else {
                  // Rest of platforms
                  // With no screen share, video dimension can be set directly from MediaStream (getSettings)
                  // Orientation must be checked for mobile devices (width and height are reversed)
                  var _a = _this.getVideoDimensions(mediaStream),
                      width = _a.width,
                      height = _a.height;

                  if ((platform.os.family === 'iOS' || platform.os.family === 'Android') && window.innerHeight > window.innerWidth) {
                    // Mobile portrait mode
                    _this.stream.videoDimensions = {
                      width: height || 0,
                      height: width || 0
                    };
                  } else {
                    _this.stream.videoDimensions = {
                      width: width || 0,
                      height: height || 0
                    };
                  }

                  _this.stream.isLocalStreamReadyToPublish = true;

                  _this.stream.ee.emitEvent('stream-ready-to-publish', []);
                }
              } else {
                // With screen share, video dimension must be got from a video element (onloadedmetadata event)
                _this.videoReference.addEventListener('loadedmetadata', function () {
                  _this.stream.videoDimensions = {
                    width: _this.videoReference.videoWidth,
                    height: _this.videoReference.videoHeight
                  };
                  _this.screenShareResizeInterval = setInterval(function () {
                    var firefoxSettings = mediaStream.getVideoTracks()[0].getSettings();
                    var newWidth = platform.name === 'Chrome' || platform.name === 'Opera' ? _this.videoReference.videoWidth : firefoxSettings.width;
                    var newHeight = platform.name === 'Chrome' || platform.name === 'Opera' ? _this.videoReference.videoHeight : firefoxSettings.height;

                    if (_this.stream.isLocalStreamPublished && (newWidth !== _this.stream.videoDimensions.width || newHeight !== _this.stream.videoDimensions.height)) {
                      var oldValue_1 = {
                        width: _this.stream.videoDimensions.width,
                        height: _this.stream.videoDimensions.height
                      };
                      _this.stream.videoDimensions = {
                        width: newWidth || 0,
                        height: newHeight || 0
                      };

                      _this.session.openvidu.sendRequest('streamPropertyChanged', {
                        streamId: _this.stream.streamId,
                        property: 'videoDimensions',
                        newValue: JSON.stringify(_this.stream.videoDimensions),
                        reason: 'screenResized'
                      }, function (error, response) {
                        if (error) {
                          logger.error("Error sending 'streamPropertyChanged' event", error);
                        } else {
                          _this.session.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this.session, _this.stream, 'videoDimensions', _this.stream.videoDimensions, oldValue_1, 'screenResized')]);

                          _this.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this, _this.stream, 'videoDimensions', _this.stream.videoDimensions, oldValue_1, 'screenResized')]);
                        }
                      });
                    }
                  }, 500);
                  _this.stream.isLocalStreamReadyToPublish = true;

                  _this.stream.ee.emitEvent('stream-ready-to-publish', []);
                });
              }
            } else {
              _this.stream.isLocalStreamReadyToPublish = true;

              _this.stream.ee.emitEvent('stream-ready-to-publish', []);
            }

            resolve();
          };

          var getMediaSuccess = function getMediaSuccess(mediaStream, definedAudioConstraint) {
            _this.clearPermissionDialogTimer(startTime, timeForDialogEvent);

            if (_this.stream.isSendScreen() && _this.stream.isSendAudio()) {
              // When getting desktop as user media audio constraint must be false. Now we can ask for it if required
              constraintsAux.audio = definedAudioConstraint;
              constraintsAux.video = false;
              startTime = Date.now();

              _this.setPermissionDialogTimer(timeForDialogEvent);

              navigator.mediaDevices.getUserMedia(constraintsAux).then(function (audioOnlyStream) {
                _this.clearPermissionDialogTimer(startTime, timeForDialogEvent);

                mediaStream.addTrack(audioOnlyStream.getAudioTracks()[0]);
                successCallback(mediaStream);
              })["catch"](function (error) {
                _this.clearPermissionDialogTimer(startTime, timeForDialogEvent);

                mediaStream.getAudioTracks().forEach(function (track) {
                  track.stop();
                });
                mediaStream.getVideoTracks().forEach(function (track) {
                  track.stop();
                });
                errorCallback(_this.openvidu.generateAudioDeviceError(error, constraints));
                return;
              });
            } else {
              successCallback(mediaStream);
            }
          };

          var getMediaError = function getMediaError(error) {
            logger.error(error);

            _this.clearPermissionDialogTimer(startTime, timeForDialogEvent);

            if (error.name === 'Error') {
              // Safari OverConstrainedError has as name property 'Error' instead of 'OverConstrainedError'
              error.name = error.constructor.name;
            }

            var errorName, errorMessage;

            switch (error.name.toLowerCase()) {
              case 'notfounderror':
                navigator.mediaDevices.getUserMedia({
                  audio: false,
                  video: constraints.video
                }).then(function (mediaStream) {
                  mediaStream.getVideoTracks().forEach(function (track) {
                    track.stop();
                  });
                  errorName = OpenViduError_1.OpenViduErrorName.INPUT_AUDIO_DEVICE_NOT_FOUND;
                  errorMessage = error.toString();
                  errorCallback(new OpenViduError_1.OpenViduError(errorName, errorMessage));
                })["catch"](function (e) {
                  errorName = OpenViduError_1.OpenViduErrorName.INPUT_VIDEO_DEVICE_NOT_FOUND;
                  errorMessage = error.toString();
                  errorCallback(new OpenViduError_1.OpenViduError(errorName, errorMessage));
                });
                break;

              case 'notallowederror':
                errorName = _this.stream.isSendScreen() ? OpenViduError_1.OpenViduErrorName.SCREEN_CAPTURE_DENIED : OpenViduError_1.OpenViduErrorName.DEVICE_ACCESS_DENIED;
                errorMessage = error.toString();
                errorCallback(new OpenViduError_1.OpenViduError(errorName, errorMessage));
                break;

              case 'overconstrainederror':
                navigator.mediaDevices.getUserMedia({
                  audio: false,
                  video: constraints.video
                }).then(function (mediaStream) {
                  mediaStream.getVideoTracks().forEach(function (track) {
                    track.stop();
                  });

                  if (error.constraint.toLowerCase() === 'deviceid') {
                    errorName = OpenViduError_1.OpenViduErrorName.INPUT_AUDIO_DEVICE_NOT_FOUND;
                    errorMessage = "Audio input device with deviceId '" + constraints.audio.deviceId.exact + "' not found";
                  } else {
                    errorName = OpenViduError_1.OpenViduErrorName.PUBLISHER_PROPERTIES_ERROR;
                    errorMessage = "Audio input device doesn't support the value passed for constraint '" + error.constraint + "'";
                  }

                  errorCallback(new OpenViduError_1.OpenViduError(errorName, errorMessage));
                })["catch"](function (e) {
                  if (error.constraint.toLowerCase() === 'deviceid') {
                    errorName = OpenViduError_1.OpenViduErrorName.INPUT_VIDEO_DEVICE_NOT_FOUND;
                    errorMessage = "Video input device with deviceId '" + constraints.video.deviceId.exact + "' not found";
                  } else {
                    errorName = OpenViduError_1.OpenViduErrorName.PUBLISHER_PROPERTIES_ERROR;
                    errorMessage = "Video input device doesn't support the value passed for constraint '" + error.constraint + "'";
                  }

                  errorCallback(new OpenViduError_1.OpenViduError(errorName, errorMessage));
                });
                break;

              case 'aborterror':
              case 'notreadableerror':
                errorName = OpenViduError_1.OpenViduErrorName.DEVICE_ALREADY_IN_USE;
                errorMessage = error.toString();
                errorCallback(new OpenViduError_1.OpenViduError(errorName, errorMessage));
                break;

              default:
                errorName = OpenViduError_1.OpenViduErrorName.GENERIC_ERROR;
                errorMessage = error.toString();
                errorCallback(new OpenViduError_1.OpenViduError(errorName, errorMessage));
                break;
            }
          };

          _this.openvidu.generateMediaConstraints(_this.properties).then(function (myConstraints) {
            var _a, _b;

            if (!!myConstraints.videoTrack && !!myConstraints.audioTrack || !!myConstraints.audioTrack && ((_a = myConstraints.constraints) === null || _a === void 0 ? void 0 : _a.video) === false || !!myConstraints.videoTrack && ((_b = myConstraints.constraints) === null || _b === void 0 ? void 0 : _b.audio) === false) {
              // No need to call getUserMedia at all. MediaStreamTracks already provided
              successCallback(_this.openvidu.addAlreadyProvidedTracks(myConstraints, new MediaStream())); // Return as we do not need to process further

              return;
            }

            constraints = myConstraints.constraints;
            var outboundStreamOptions = {
              mediaConstraints: constraints,
              publisherProperties: _this.properties
            };

            _this.stream.setOutboundStreamOptions(outboundStreamOptions);

            var definedAudioConstraint = constraints.audio === undefined ? true : constraints.audio;
            constraintsAux.audio = _this.stream.isSendScreen() ? false : definedAudioConstraint;
            constraintsAux.video = constraints.video;
            startTime = Date.now();

            _this.setPermissionDialogTimer(timeForDialogEvent);

            if (_this.stream.isSendScreen() && navigator.mediaDevices['getDisplayMedia'] && platform.name !== 'Electron') {
              navigator.mediaDevices['getDisplayMedia']({
                video: true
              }).then(function (mediaStream) {
                _this.openvidu.addAlreadyProvidedTracks(myConstraints, mediaStream);

                getMediaSuccess(mediaStream, definedAudioConstraint);
              })["catch"](function (error) {
                getMediaError(error);
              });
            } else {
              navigator.mediaDevices.getUserMedia(constraintsAux).then(function (mediaStream) {
                _this.openvidu.addAlreadyProvidedTracks(myConstraints, mediaStream);

                getMediaSuccess(mediaStream, definedAudioConstraint);
              })["catch"](function (error) {
                getMediaError(error);
              });
            }
          })["catch"](function (error) {
            errorCallback(error);
          });
        });
      };
      /**
       * @hidden
       */


      Publisher.prototype.getVideoDimensions = function (mediaStream) {
        return mediaStream.getVideoTracks()[0].getSettings();
      };
      /**
       * @hidden
       */


      Publisher.prototype.reestablishStreamPlayingEvent = function () {
        if (this.ee.getListeners('streamPlaying').length > 0) {
          this.addPlayEventToFirstVideo();
        }
      };
      /**
       * @hidden
       */


      Publisher.prototype.initializeVideoReference = function (mediaStream) {
        this.videoReference = document.createElement('video');

        if (platform.name === 'Safari') {
          this.videoReference.setAttribute('playsinline', 'true');
        }

        this.stream.setMediaStream(mediaStream);

        if (!!this.firstVideoElement) {
          this.createVideoElement(this.firstVideoElement.targetElement, this.properties.insertMode);
        }

        this.videoReference.srcObject = mediaStream;
      };
      /* Private methods */


      Publisher.prototype.setPermissionDialogTimer = function (waitTime) {
        var _this = this;

        this.permissionDialogTimeout = setTimeout(function () {
          _this.emitEvent('accessDialogOpened', []);
        }, waitTime);
      };

      Publisher.prototype.clearPermissionDialogTimer = function (startTime, waitTime) {
        clearTimeout(this.permissionDialogTimeout);

        if (Date.now() - startTime > waitTime) {
          // Permission dialog was shown and now is closed
          this.emitEvent('accessDialogClosed', []);
        }
      };

      return Publisher;
    }(StreamManager_1.StreamManager);

    exports.Publisher = Publisher; //# sourceMappingURL=Publisher.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenVidu/Session.js":
  /*!***************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenVidu/Session.js ***!
    \***************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduSessionJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    var __extends = this && this.__extends || function () {
      var _extendStatics2 = function extendStatics(d, b) {
        _extendStatics2 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics2(d, b);
      };

      return function (d, b) {
        _extendStatics2(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    exports.__esModule = true;

    var Connection_1 = __webpack_require__(
    /*! ./Connection */
    "./node_modules/openvidu-browser/lib/OpenVidu/Connection.js");

    var Filter_1 = __webpack_require__(
    /*! ./Filter */
    "./node_modules/openvidu-browser/lib/OpenVidu/Filter.js");

    var Subscriber_1 = __webpack_require__(
    /*! ./Subscriber */
    "./node_modules/openvidu-browser/lib/OpenVidu/Subscriber.js");

    var EventDispatcher_1 = __webpack_require__(
    /*! ./EventDispatcher */
    "./node_modules/openvidu-browser/lib/OpenVidu/EventDispatcher.js");

    var ConnectionEvent_1 = __webpack_require__(
    /*! ../OpenViduInternal/Events/ConnectionEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/ConnectionEvent.js");

    var FilterEvent_1 = __webpack_require__(
    /*! ../OpenViduInternal/Events/FilterEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/FilterEvent.js");

    var RecordingEvent_1 = __webpack_require__(
    /*! ../OpenViduInternal/Events/RecordingEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/RecordingEvent.js");

    var SessionDisconnectedEvent_1 = __webpack_require__(
    /*! ../OpenViduInternal/Events/SessionDisconnectedEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/SessionDisconnectedEvent.js");

    var SignalEvent_1 = __webpack_require__(
    /*! ../OpenViduInternal/Events/SignalEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/SignalEvent.js");

    var StreamEvent_1 = __webpack_require__(
    /*! ../OpenViduInternal/Events/StreamEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamEvent.js");

    var StreamPropertyChangedEvent_1 = __webpack_require__(
    /*! ../OpenViduInternal/Events/StreamPropertyChangedEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamPropertyChangedEvent.js");

    var OpenViduError_1 = __webpack_require__(
    /*! ../OpenViduInternal/Enums/OpenViduError */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/OpenViduError.js");

    var VideoInsertMode_1 = __webpack_require__(
    /*! ../OpenViduInternal/Enums/VideoInsertMode */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/VideoInsertMode.js");

    var platform = __webpack_require__(
    /*! platform */
    "./node_modules/platform/platform.js");

    var OpenViduLogger_1 = __webpack_require__(
    /*! ../OpenViduInternal/Logger/OpenViduLogger */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js");
    /**
     * @hidden
     */


    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    /**
     * Represents a video call. It can also be seen as a videoconference room where multiple users can connect.
     * Participants who publish their videos to a session can be seen by the rest of users connected to that specific session.
     * Initialized with [[OpenVidu.initSession]] method.
     *
     * ### Available event listeners (and events dispatched)
     *
     * - connectionCreated ([[ConnectionEvent]])
     * - connectionDestroyed ([[ConnectionEvent]])
     * - sessionDisconnected ([[SessionDisconnectedEvent]])
     * - streamCreated ([[StreamEvent]])
     * - streamDestroyed ([[StreamEvent]])
     * - streamPropertyChanged ([[StreamPropertyChangedEvent]])
     * - publisherStartSpeaking ([[PublisherSpeakingEvent]])
     * - publisherStopSpeaking ([[PublisherSpeakingEvent]])
     * - signal ([[SignalEvent]])
     * - recordingStarted ([[RecordingEvent]])
     * - recordingStopped ([[RecordingEvent]])
     * - reconnecting
     * - reconnected
     *
     */

    var Session =
    /** @class */
    function (_super) {
      __extends(Session, _super);
      /**
       * @hidden
       */


      function Session(openvidu) {
        var _this = _super.call(this) || this;
        /**
         * Collection of all StreamManagers of this Session ([[Publisher]] and [[Subscriber]])
         */


        _this.streamManagers = []; // This map is only used to avoid race condition between 'joinRoom' response and 'onParticipantPublished' notification

        /**
         * @hidden
         */

        _this.remoteStreamsCreated = {};
        /**
         * @hidden
         */

        _this.isFirstIonicIosSubscriber = true;
        /**
         * @hidden
         */

        _this.countDownForIonicIosSubscribersActive = true;
        /**
         * @hidden
         */

        _this.remoteConnections = {};
        /**
         * @hidden
         */

        _this.startSpeakingEventsEnabled = false;
        /**
         * @hidden
         */

        _this.startSpeakingEventsEnabledOnce = false;
        /**
         * @hidden
         */

        _this.stopSpeakingEventsEnabled = false;
        /**
         * @hidden
         */

        _this.stopSpeakingEventsEnabledOnce = false;
        _this.openvidu = openvidu;
        return _this;
      }
      /**
       * Connects to the session using `token`. Parameter `metadata` allows you to pass extra data to share with other users when
       * they receive `streamCreated` event. The structure of `metadata` string is up to you (maybe some standardized format
       * as JSON or XML is a good idea).
       *
       * This metadata is not considered secure, as it is generated in the client side. To pass secure data, add it as a parameter in the
       * token generation operation (through the API REST, openvidu-java-client or openvidu-node-client).
       *
       * Only after the returned Promise is successfully resolved [[Session.connection]] object will be available and properly defined.
       *
       * #### Events dispatched
       *
       * The [[Session]] object of the local participant will first dispatch one or more `connectionCreated` events upon successful termination of this method:
       * - First one for your own local Connection object, so you can retrieve [[Session.connection]] property.
       * - Then one for each remote Connection previously connected to the Session, if any. Any other remote user connecting to the Session after you have
       * successfully connected will also dispatch a `connectionCreated` event when they do so.
       *
       * The [[Session]] object of the local participant will also dispatch a `streamCreated` event for each remote active [[Publisher]] that was already streaming
       * when connecting, just after dispatching all remote `connectionCreated` events.
       *
       * The [[Session]] object of every other participant connected to the session will dispatch a `connectionCreated` event.
       *
       * See [[ConnectionEvent]] and [[StreamEvent]] to learn more.
       *
       * @returns A Promise to which you must subscribe that is resolved if the the connection to the Session was successful and rejected with an Error object if not
       *
       */


      Session.prototype.connect = function (token, metadata) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          _this.processToken(token);

          if (_this.openvidu.checkSystemRequirements()) {
            // Early configuration to deactivate automatic subscription to streams
            _this.options = {
              sessionId: _this.sessionId,
              participantId: token,
              metadata: !!metadata ? _this.stringClientMetadata(metadata) : ''
            };

            _this.connectAux(token).then(function () {
              resolve();
            })["catch"](function (error) {
              reject(error);
            });
          } else {
            reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.BROWSER_NOT_SUPPORTED, 'Browser ' + platform.name + ' (version ' + platform.version + ') for ' + platform.os.family + ' is not supported in OpenVidu'));
          }
        });
      };
      /**
       * Leaves the session, destroying all streams and deleting the user as a participant.
       *
       * #### Events dispatched
       *
       * The [[Session]] object of the local participant will dispatch a `sessionDisconnected` event.
       * This event will automatically unsubscribe the leaving participant from every Subscriber object of the session (this includes closing the WebRTCPeer connection and disposing all MediaStreamTracks)
       * and also deletes any HTML video element associated to each Subscriber (only those [created by OpenVidu Browser](/en/stable/cheatsheet/manage-videos/#let-openvidu-take-care-of-the-video-players)).
       * For every video removed, each Subscriber object will dispatch a `videoElementDestroyed` event.
       * Call `event.preventDefault()` upon event `sessionDisconnected` to avoid this behavior and take care of disposing and cleaning all the Subscriber objects yourself.
       * See [[SessionDisconnectedEvent]] and [[VideoElementEvent]] to learn more to learn more.
       *
       * The [[Publisher]] object of the local participant will dispatch a `streamDestroyed` event if there is a [[Publisher]] object publishing to the session.
       * This event will automatically stop all media tracks and delete any HTML video element associated to it (only those [created by OpenVidu Browser](/en/stable/cheatsheet/manage-videos/#let-openvidu-take-care-of-the-video-players)).
       * For every video removed, the Publisher object will dispatch a `videoElementDestroyed` event.
       * Call `event.preventDefault()` upon event `streamDestroyed` if you want to clean the Publisher object on your own or re-publish it in a different Session (to do so it is a mandatory requirement to call `Session.unpublish()`
       * or/and `Session.disconnect()` in the previous session). See [[StreamEvent]] and [[VideoElementEvent]] to learn more.
       *
       * The [[Session]] object of every other participant connected to the session will dispatch a `streamDestroyed` event if the disconnected participant was publishing.
       * This event will automatically unsubscribe the Subscriber object from the session (this includes closing the WebRTCPeer connection and disposing all MediaStreamTracks)
       * and also deletes any HTML video element associated to that Subscriber (only those [created by OpenVidu Browser](/en/stable/cheatsheet/manage-videos/#let-openvidu-take-care-of-the-video-players)).
       * For every video removed, the Subscriber object will dispatch a `videoElementDestroyed` event.
       * Call `event.preventDefault()` upon event `streamDestroyed` to avoid this default behavior and take care of disposing and cleaning the Subscriber object yourself.
       * See [[StreamEvent]] and [[VideoElementEvent]] to learn more.
       *
       * The [[Session]] object of every other participant connected to the session will dispatch a `connectionDestroyed` event in any case. See [[ConnectionEvent]] to learn more.
       */


      Session.prototype.disconnect = function () {
        this.leave(false, 'disconnect');
      };
      /**
       * Subscribes to a `stream`, adding a new HTML video element to DOM with `subscriberProperties` settings. This method is usually called in the callback of `streamCreated` event.
       *
       * #### Events dispatched
       *
       * The [[Subscriber]] object will dispatch a `videoElementCreated` event once the HTML video element has been added to DOM (only if you
       * [let OpenVidu take care of the video players](/en/stable/cheatsheet/manage-videos/#let-openvidu-take-care-of-the-video-players)). See [[VideoElementEvent]] to learn more.
       *
       * The [[Subscriber]] object will dispatch a `streamPlaying` event once the remote stream starts playing. See [[StreamManagerEvent]] to learn more.
       *
       * @param stream Stream object to subscribe to
       * @param targetElement HTML DOM element (or its `id` attribute) in which the video element of the Subscriber will be inserted (see [[SubscriberProperties.insertMode]]). If *null* or *undefined* no default video will be created for this Subscriber.
       * You can always call method [[Subscriber.addVideoElement]] or [[Subscriber.createVideoElement]] to manage the video elements on your own (see [Manage video players](/en/stable/cheatsheet/manage-videos) section)
       * @param completionHandler `error` parameter is null if `subscribe` succeeds, and is defined if it fails.
       */


      Session.prototype.subscribe = function (stream, targetElement, param3, param4) {
        var properties = {};

        if (!!param3 && typeof param3 !== 'function') {
          properties = {
            insertMode: typeof param3.insertMode !== 'undefined' ? typeof param3.insertMode === 'string' ? VideoInsertMode_1.VideoInsertMode[param3.insertMode] : properties.insertMode : VideoInsertMode_1.VideoInsertMode.APPEND,
            subscribeToAudio: typeof param3.subscribeToAudio !== 'undefined' ? param3.subscribeToAudio : true,
            subscribeToVideo: typeof param3.subscribeToVideo !== 'undefined' ? param3.subscribeToVideo : true
          };
        } else {
          properties = {
            insertMode: VideoInsertMode_1.VideoInsertMode.APPEND,
            subscribeToAudio: true,
            subscribeToVideo: true
          };
        }

        var completionHandler;

        if (!!param3 && typeof param3 === 'function') {
          completionHandler = param3;
        } else if (!!param4) {
          completionHandler = param4;
        }

        logger.info('Subscribing to ' + stream.connection.connectionId);
        stream.subscribe().then(function () {
          logger.info('Subscribed correctly to ' + stream.connection.connectionId);

          if (completionHandler !== undefined) {
            completionHandler(undefined);
          }
        })["catch"](function (error) {
          if (completionHandler !== undefined) {
            completionHandler(error);
          }
        });
        var subscriber = new Subscriber_1.Subscriber(stream, targetElement, properties);

        if (!!subscriber.targetElement) {
          stream.streamManager.createVideoElement(subscriber.targetElement, properties.insertMode);
        }

        return subscriber;
      };

      Session.prototype.subscribeAsync = function (stream, targetElement, properties) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          var subscriber;

          var callback = function callback(error) {
            if (!!error) {
              reject(error);
            } else {
              resolve(subscriber);
            }
          };

          if (!!properties) {
            subscriber = _this.subscribe(stream, targetElement, properties, callback);
          } else {
            subscriber = _this.subscribe(stream, targetElement, callback);
          }
        });
      };
      /**
       * Unsubscribes from `subscriber`, automatically removing its associated HTML video elements.
       *
       * #### Events dispatched
       *
       * The [[Subscriber]] object will dispatch a `videoElementDestroyed` event for each video associated to it that was removed from DOM.
       * Only videos [created by OpenVidu Browser](/en/stable/cheatsheet/manage-videos/#let-openvidu-take-care-of-the-video-players)) will be automatically removed
       *
       * See [[VideoElementEvent]] to learn more
       */


      Session.prototype.unsubscribe = function (subscriber) {
        var connectionId = subscriber.stream.connection.connectionId;
        logger.info('Unsubscribing from ' + connectionId);
        this.openvidu.sendRequest('unsubscribeFromVideo', {
          sender: subscriber.stream.connection.connectionId
        }, function (error, response) {
          if (error) {
            logger.error('Error unsubscribing from ' + connectionId, error);
          } else {
            logger.info('Unsubscribed correctly from ' + connectionId);
          }

          subscriber.stream.disposeWebRtcPeer();
          subscriber.stream.disposeMediaStream();
        });
        subscriber.stream.streamManager.removeAllVideos();
      };
      /**
       * Publishes to the Session the Publisher object
       *
       * #### Events dispatched
       *
       * The local [[Publisher]] object will dispatch a `streamCreated` event upon successful termination of this method. See [[StreamEvent]] to learn more.
       *
       * The local [[Publisher]] object will dispatch a `streamPlaying` once the media stream starts playing. See [[StreamManagerEvent]] to learn more.
       *
       * The [[Session]] object of every other participant connected to the session will dispatch a `streamCreated` event so they can subscribe to it. See [[StreamEvent]] to learn more.
       *
       * @returns A Promise (to which you can optionally subscribe to) that is resolved only after the publisher was successfully published and rejected with an Error object if not
       */


      Session.prototype.publish = function (publisher) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          publisher.session = _this;
          publisher.stream.session = _this;

          if (!publisher.stream.publishedOnce) {
            // 'Session.unpublish(Publisher)' has NOT been called
            _this.connection.addStream(publisher.stream);

            publisher.stream.publish().then(function () {
              resolve();
            })["catch"](function (error) {
              reject(error);
            });
          } else {
            // 'Session.unpublish(Publisher)' has been called. Must initialize again Publisher
            publisher.initialize().then(function () {
              _this.connection.addStream(publisher.stream);

              publisher.reestablishStreamPlayingEvent();
              publisher.stream.publish().then(function () {
                resolve();
              })["catch"](function (error) {
                reject(error);
              });
            })["catch"](function (error) {
              reject(error);
            });
          }
        });
      };
      /**
       * Unpublishes from the Session the Publisher object.
       *
       * #### Events dispatched
       *
       * The [[Publisher]] object of the local participant will dispatch a `streamDestroyed` event.
       * This event will automatically stop all media tracks and delete any HTML video element associated to this Publisher
       * (only those videos [created by OpenVidu Browser](/en/stable/cheatsheet/manage-videos/#let-openvidu-take-care-of-the-video-players)).
       * For every video removed, the Publisher object will dispatch a `videoElementDestroyed` event.
       * Call `event.preventDefault()` upon event `streamDestroyed` if you want to clean the Publisher object on your own or re-publish it in a different Session.
       *
       * The [[Session]] object of every other participant connected to the session will dispatch a `streamDestroyed` event.
       * This event will automatically unsubscribe the Subscriber object from the session (this includes closing the WebRTCPeer connection and disposing all MediaStreamTracks) and
       * delete any HTML video element associated to it (only those [created by OpenVidu Browser](/en/stable/cheatsheet/manage-videos/#let-openvidu-take-care-of-the-video-players)).
       * For every video removed, the Subscriber object will dispatch a `videoElementDestroyed` event.
       * Call `event.preventDefault()` upon event `streamDestroyed` to avoid this default behavior and take care of disposing and cleaning the Subscriber object on your own.
       *
       * See [[StreamEvent]] and [[VideoElementEvent]] to learn more.
       */


      Session.prototype.unpublish = function (publisher) {
        var stream = publisher.stream;

        if (!stream.connection) {
          logger.error('The associated Connection object of this Publisher is null', stream);
          return;
        } else if (stream.connection !== this.connection) {
          logger.error('The associated Connection object of this Publisher is not your local Connection.' + "Only moderators can force unpublish on remote Streams via 'forceUnpublish' method", stream);
          return;
        } else {
          logger.info('Unpublishing local media (' + stream.connection.connectionId + ')');
          this.openvidu.sendRequest('unpublishVideo', function (error, response) {
            if (error) {
              logger.error(error);
            } else {
              logger.info('Media unpublished correctly');
            }
          });
          stream.disposeWebRtcPeer();
          delete stream.connection.stream;
          var streamEvent = new StreamEvent_1.StreamEvent(true, publisher, 'streamDestroyed', publisher.stream, 'unpublish');
          publisher.emitEvent('streamDestroyed', [streamEvent]);
          streamEvent.callDefaultBehavior();
        }
      };
      /**
       * Forces some user to leave the session
       *
       * #### Events dispatched
       *
       * The behavior is the same as when some user calls [[Session.disconnect]], but `reason` property in all events will be `"forceDisconnectByUser"`.
       *
       * The [[Session]] object of every participant will dispatch a `streamDestroyed` event if the evicted user was publishing a stream, with property `reason` set to `"forceDisconnectByUser"`.
       * The [[Session]] object of every participant except the evicted one will dispatch a `connectionDestroyed` event for the evicted user, with property `reason` set to `"forceDisconnectByUser"`.
       *
       * If any, the [[Publisher]] object of the evicted participant will also dispatch a `streamDestroyed` event with property `reason` set to `"forceDisconnectByUser"`.
       * The [[Session]] object of the evicted participant will dispatch a `sessionDisconnected` event with property `reason` set to `"forceDisconnectByUser"`.
       *
       * See [[StreamEvent]], [[ConnectionEvent]] and [[SessionDisconnectedEvent]] to learn more.
       *
       * @returns A Promise (to which you can optionally subscribe to) that is resolved only after the participant has been successfully evicted from the session and rejected with an Error object if not
       */


      Session.prototype.forceDisconnect = function (connection) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          logger.info('Forcing disconnect for connection ' + connection.connectionId);

          _this.openvidu.sendRequest('forceDisconnect', {
            connectionId: connection.connectionId
          }, function (error, response) {
            if (error) {
              logger.error('Error forcing disconnect for Connection ' + connection.connectionId, error);

              if (error.code === 401) {
                reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to force a disconnection"));
              } else {
                reject(error);
              }
            } else {
              logger.info('Forcing disconnect correctly for Connection ' + connection.connectionId);
              resolve();
            }
          });
        });
      };
      /**
       * Forces some user to unpublish a Stream
       *
       * #### Events dispatched
       *
       * The behavior is the same as when some user calls [[Session.unpublish]], but `reason` property in all events will be `"forceUnpublishByUser"`
       *
       * The [[Session]] object of every participant will dispatch a `streamDestroyed` event with property `reason` set to `"forceDisconnectByUser"`
       *
       * The [[Publisher]] object of the affected participant will also dispatch a `streamDestroyed` event with property `reason` set to `"forceDisconnectByUser"`
       *
       * See [[StreamEvent]] to learn more.
       *
       * @returns A Promise (to which you can optionally subscribe to) that is resolved only after the remote Stream has been successfully unpublished from the session and rejected with an Error object if not
       */


      Session.prototype.forceUnpublish = function (stream) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          logger.info('Forcing unpublish for stream ' + stream.streamId);

          _this.openvidu.sendRequest('forceUnpublish', {
            streamId: stream.streamId
          }, function (error, response) {
            if (error) {
              logger.error('Error forcing unpublish for Stream ' + stream.streamId, error);

              if (error.code === 401) {
                reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to force an unpublishing"));
              } else {
                reject(error);
              }
            } else {
              logger.info('Forcing unpublish correctly for Stream ' + stream.streamId);
              resolve();
            }
          });
        });
      };
      /**
       * Sends one signal. `signal` object has the following optional properties:
       * ```json
       * {data:string, to:Connection[], type:string}
       * ```
       * All users subscribed to that signal (`session.on('signal:type', ...)` or `session.on('signal', ...)` for all signals) and whose Connection objects are in `to` array will receive it. Their local
       * Session objects will dispatch a `signal` or `signal:type` event. See [[SignalEvent]] to learn more.
       *
       * @returns A Promise (to which you can optionally subscribe to) that is resolved if the message successfully reached openvidu-server and rejected with an Error object if not. _This doesn't
       * mean that openvidu-server could resend the message to all the listed receivers._
       */

      /* tslint:disable:no-string-literal */


      Session.prototype.signal = function (signal) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          var signalMessage = {};

          if (signal.to && signal.to.length > 0) {
            var connectionIds_1 = [];
            signal.to.forEach(function (connection) {
              if (!!connection.connectionId) {
                connectionIds_1.push(connection.connectionId);
              }
            });
            signalMessage['to'] = connectionIds_1;
          } else {
            signalMessage['to'] = [];
          }

          signalMessage['data'] = signal.data ? signal.data : '';
          var typeAux = signal.type ? signal.type : 'signal';

          if (!!typeAux) {
            if (typeAux.substring(0, 7) !== 'signal:') {
              typeAux = 'signal:' + typeAux;
            }
          }

          signalMessage['type'] = typeAux;

          _this.openvidu.sendRequest('sendMessage', {
            message: JSON.stringify(signalMessage)
          }, function (error, response) {
            if (!!error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      };
      /* tslint:enable:no-string-literal */

      /**
       * See [[EventDispatcher.on]]
       */


      Session.prototype.on = function (type, handler) {
        _super.prototype.onAux.call(this, type, "Event '" + type + "' triggered by 'Session'", handler);

        if (type === 'publisherStartSpeaking') {
          this.startSpeakingEventsEnabled = true; // If there are already available remote streams, enable hark 'speaking' event in all of them

          for (var connectionId in this.remoteConnections) {
            var str = this.remoteConnections[connectionId].stream;

            if (!!str && str.hasAudio) {
              str.enableStartSpeakingEvent();
            }
          }
        }

        if (type === 'publisherStopSpeaking') {
          this.stopSpeakingEventsEnabled = true; // If there are already available remote streams, enable hark 'stopped_speaking' event in all of them

          for (var connectionId in this.remoteConnections) {
            var str = this.remoteConnections[connectionId].stream;

            if (!!str && str.hasAudio) {
              str.enableStopSpeakingEvent();
            }
          }
        }

        return this;
      };
      /**
       * See [[EventDispatcher.once]]
       */


      Session.prototype.once = function (type, handler) {
        _super.prototype.onceAux.call(this, type, "Event '" + type + "' triggered once by 'Session'", handler);

        if (type === 'publisherStartSpeaking') {
          this.startSpeakingEventsEnabledOnce = true; // If there are already available remote streams, enable hark 'speaking' event in all of them once

          for (var connectionId in this.remoteConnections) {
            var str = this.remoteConnections[connectionId].stream;

            if (!!str && str.hasAudio) {
              str.enableOnceStartSpeakingEvent();
            }
          }
        }

        if (type === 'publisherStopSpeaking') {
          this.stopSpeakingEventsEnabledOnce = true; // If there are already available remote streams, enable hark 'stopped_speaking' event in all of them once

          for (var connectionId in this.remoteConnections) {
            var str = this.remoteConnections[connectionId].stream;

            if (!!str && str.hasAudio) {
              str.enableOnceStopSpeakingEvent();
            }
          }
        }

        return this;
      };
      /**
       * See [[EventDispatcher.off]]
       */


      Session.prototype.off = function (type, handler) {
        _super.prototype.off.call(this, type, handler);

        if (type === 'publisherStartSpeaking') {
          var remainingStartSpeakingListeners = this.ee.getListeners(type).length;

          if (remainingStartSpeakingListeners === 0) {
            this.startSpeakingEventsEnabled = false; // If there are already available remote streams, disable hark in all of them

            for (var connectionId in this.remoteConnections) {
              var str = this.remoteConnections[connectionId].stream;

              if (!!str) {
                str.disableStartSpeakingEvent(false);
              }
            }
          }
        }

        if (type === 'publisherStopSpeaking') {
          var remainingStopSpeakingListeners = this.ee.getListeners(type).length;

          if (remainingStopSpeakingListeners === 0) {
            this.stopSpeakingEventsEnabled = false; // If there are already available remote streams, disable hark in all of them

            for (var connectionId in this.remoteConnections) {
              var str = this.remoteConnections[connectionId].stream;

              if (!!str) {
                str.disableStopSpeakingEvent(false);
              }
            }
          }
        }

        return this;
      };
      /* Hidden methods */

      /**
       * @hidden
       */


      Session.prototype.onParticipantJoined = function (response) {
        var _this = this; // Connection shouldn't exist


        this.getConnection(response.id, '').then(function (connection) {
          logger.warn('Connection ' + response.id + ' already exists in connections list');
        })["catch"](function (openViduError) {
          var connection = new Connection_1.Connection(_this, response);
          _this.remoteConnections[response.id] = connection;

          _this.ee.emitEvent('connectionCreated', [new ConnectionEvent_1.ConnectionEvent(false, _this, 'connectionCreated', connection, '')]);
        });
      };
      /**
       * @hidden
       */


      Session.prototype.onParticipantLeft = function (msg) {
        var _this = this;

        this.getRemoteConnection(msg.connectionId, 'Remote connection ' + msg.connectionId + " unknown when 'onParticipantLeft'. " + 'Existing remote connections: ' + JSON.stringify(Object.keys(this.remoteConnections))).then(function (connection) {
          if (!!connection.stream) {
            var stream = connection.stream;
            var streamEvent = new StreamEvent_1.StreamEvent(true, _this, 'streamDestroyed', stream, msg.reason);

            _this.ee.emitEvent('streamDestroyed', [streamEvent]);

            streamEvent.callDefaultBehavior();
            delete _this.remoteStreamsCreated[stream.streamId];

            if (Object.keys(_this.remoteStreamsCreated).length === 0) {
              _this.isFirstIonicIosSubscriber = true;
              _this.countDownForIonicIosSubscribersActive = true;
            }
          }

          delete _this.remoteConnections[connection.connectionId];

          _this.ee.emitEvent('connectionDestroyed', [new ConnectionEvent_1.ConnectionEvent(false, _this, 'connectionDestroyed', connection, msg.reason)]);
        })["catch"](function (openViduError) {
          logger.error(openViduError);
        });
      };
      /**
       * @hidden
       */


      Session.prototype.onParticipantPublished = function (response) {
        var _this = this;

        var afterConnectionFound = function afterConnectionFound(connection) {
          _this.remoteConnections[connection.connectionId] = connection;

          if (!_this.remoteStreamsCreated[connection.stream.streamId]) {
            // Avoid race condition between stream.subscribe() in "onParticipantPublished" and in "joinRoom" rpc callback
            // This condition is false if openvidu-server sends "participantPublished" event to a subscriber participant that has
            // already subscribed to certain stream in the callback of "joinRoom" method
            _this.ee.emitEvent('streamCreated', [new StreamEvent_1.StreamEvent(false, _this, 'streamCreated', connection.stream, '')]);
          }

          _this.remoteStreamsCreated[connection.stream.streamId] = true;
        }; // Get the existing Connection created on 'onParticipantJoined' for
        // existing participants or create a new one for new participants


        var connection;
        this.getRemoteConnection(response.id, "Remote connection '" + response.id + "' unknown when 'onParticipantPublished'. " + 'Existing remote connections: ' + JSON.stringify(Object.keys(this.remoteConnections))).then(function (con) {
          // Update existing Connection
          connection = con;
          response.metadata = con.data;
          connection.options = response;
          connection.initRemoteStreams(response.streams);
          afterConnectionFound(connection);
        })["catch"](function (openViduError) {
          // Create new Connection
          connection = new Connection_1.Connection(_this, response);
          afterConnectionFound(connection);
        });
      };
      /**
       * @hidden
       */


      Session.prototype.onParticipantUnpublished = function (msg) {
        var _this = this;

        if (msg.connectionId === this.connection.connectionId) {
          // Your stream has been forcedly unpublished from the session
          this.stopPublisherStream(msg.reason);
        } else {
          this.getRemoteConnection(msg.connectionId, "Remote connection '" + msg.connectionId + "' unknown when 'onParticipantUnpublished'. " + 'Existing remote connections: ' + JSON.stringify(Object.keys(this.remoteConnections))).then(function (connection) {
            var streamEvent = new StreamEvent_1.StreamEvent(true, _this, 'streamDestroyed', connection.stream, msg.reason);

            _this.ee.emitEvent('streamDestroyed', [streamEvent]);

            streamEvent.callDefaultBehavior(); // Deleting the remote stream

            var streamId = connection.stream.streamId;
            delete _this.remoteStreamsCreated[streamId];

            if (Object.keys(_this.remoteStreamsCreated).length === 0) {
              _this.isFirstIonicIosSubscriber = true;
              _this.countDownForIonicIosSubscribersActive = true;
            }

            connection.removeStream(streamId);
          })["catch"](function (openViduError) {
            logger.error(openViduError);
          });
        }
      };
      /**
       * @hidden
       */


      Session.prototype.onParticipantEvicted = function (msg) {
        if (msg.connectionId === this.connection.connectionId) {
          // You have been evicted from the session
          if (!!this.sessionId && !this.connection.disposed) {
            this.leave(true, msg.reason);
          }
        }
      };
      /**
       * @hidden
       */


      Session.prototype.onNewMessage = function (msg) {
        var _this = this;

        logger.info('New signal: ' + JSON.stringify(msg));
        var strippedType = !!msg.type ? msg.type.replace(/^(signal:)/, '') : undefined;

        if (!!msg.from) {
          // Signal sent by other client
          this.getConnection(msg.from, "Connection '" + msg.from + "' unknow when 'onNewMessage'. Existing remote connections: " + JSON.stringify(Object.keys(this.remoteConnections)) + '. Existing local connection: ' + this.connection.connectionId).then(function (connection) {
            _this.ee.emitEvent('signal', [new SignalEvent_1.SignalEvent(_this, strippedType, msg.data, connection)]);

            if (msg.type !== 'signal') {
              _this.ee.emitEvent(msg.type, [new SignalEvent_1.SignalEvent(_this, strippedType, msg.data, connection)]);
            }
          })["catch"](function (openViduError) {
            logger.error(openViduError);
          });
        } else {
          // Signal sent by server
          this.ee.emitEvent('signal', [new SignalEvent_1.SignalEvent(this, strippedType, msg.data, undefined)]);

          if (msg.type !== 'signal') {
            this.ee.emitEvent(msg.type, [new SignalEvent_1.SignalEvent(this, strippedType, msg.data, undefined)]);
          }
        }
      };
      /**
       * @hidden
       */


      Session.prototype.onStreamPropertyChanged = function (msg) {
        var _this = this;

        var callback = function callback(connection) {
          if (!!connection.stream && connection.stream.streamId === msg.streamId) {
            var stream = connection.stream;
            var oldValue = void 0;

            switch (msg.property) {
              case 'audioActive':
                oldValue = stream.audioActive;
                msg.newValue = msg.newValue === 'true';
                stream.audioActive = msg.newValue;
                break;

              case 'videoActive':
                oldValue = stream.videoActive;
                msg.newValue = msg.newValue === 'true';
                stream.videoActive = msg.newValue;
                break;

              case 'videoDimensions':
                oldValue = stream.videoDimensions;
                msg.newValue = JSON.parse(JSON.parse(msg.newValue));
                stream.videoDimensions = msg.newValue;
                break;

              case 'filter':
                oldValue = stream.filter;
                msg.newValue = Object.keys(msg.newValue).length > 0 ? msg.newValue : undefined;

                if (msg.newValue !== undefined) {
                  stream.filter = new Filter_1.Filter(msg.newValue.type, msg.newValue.options);
                  stream.filter.stream = stream;

                  if (msg.newValue.lastExecMethod) {
                    stream.filter.lastExecMethod = msg.newValue.lastExecMethod;
                  }
                } else {
                  delete stream.filter;
                }

                msg.newValue = stream.filter;
                break;
            }

            _this.ee.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this, stream, msg.property, msg.newValue, oldValue, msg.reason)]);

            if (!!stream.streamManager) {
              stream.streamManager.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(stream.streamManager, stream, msg.property, msg.newValue, oldValue, msg.reason)]);
            }
          } else {
            logger.error("No stream with streamId '" + msg.streamId + "' found for connection '" + msg.connectionId + "' on 'streamPropertyChanged' event");
          }
        };

        if (msg.connectionId === this.connection.connectionId) {
          // Your stream has been forcedly changed (filter feature)
          callback(this.connection);
        } else {
          this.getRemoteConnection(msg.connectionId, 'Remote connection ' + msg.connectionId + " unknown when 'onStreamPropertyChanged'. " + 'Existing remote connections: ' + JSON.stringify(Object.keys(this.remoteConnections))).then(function (connection) {
            callback(connection);
          })["catch"](function (openViduError) {
            logger.error(openViduError);
          });
        }
      };
      /**
       * @hidden
       */


      Session.prototype.recvIceCandidate = function (msg) {
        var candidate = {
          candidate: msg.candidate,
          component: msg.component,
          foundation: msg.foundation,
          port: msg.port,
          priority: msg.priority,
          protocol: msg.protocol,
          relatedAddress: msg.relatedAddress,
          relatedPort: msg.relatedPort,
          sdpMid: msg.sdpMid,
          sdpMLineIndex: msg.sdpMLineIndex,
          tcpType: msg.tcpType,
          usernameFragment: msg.usernameFragment,
          type: msg.type,
          toJSON: function toJSON() {
            return {
              candidate: msg.candidate
            };
          }
        };
        this.getConnection(msg.senderConnectionId, 'Connection not found for connectionId ' + msg.senderConnectionId + ' owning endpoint ' + msg.endpointName + '. Ice candidate will be ignored: ' + candidate).then(function (connection) {
          var stream = connection.stream;
          stream.getWebRtcPeer().addIceCandidate(candidate)["catch"](function (error) {
            logger.error('Error adding candidate for ' + stream.streamId + ' stream of endpoint ' + msg.endpointName + ': ' + error);
          });
        })["catch"](function (openViduError) {
          logger.error(openViduError);
        });
      };
      /**
       * @hidden
       */


      Session.prototype.onSessionClosed = function (msg) {
        logger.info('Session closed: ' + JSON.stringify(msg));
        var s = msg.sessionId;

        if (s !== undefined) {
          this.ee.emitEvent('session-closed', [{
            session: s
          }]);
        } else {
          logger.warn('Session undefined on session closed', msg);
        }
      };
      /**
       * @hidden
       */


      Session.prototype.onLostConnection = function (reason) {
        logger.warn('Lost connection in Session ' + this.sessionId);

        if (!!this.sessionId && !this.connection.disposed) {
          this.leave(true, reason);
        }
      };
      /**
       * @hidden
       */


      Session.prototype.onRecoveredConnection = function () {
        logger.info('Recovered connection in Session ' + this.sessionId);
        this.reconnectBrokenStreams();
        this.ee.emitEvent('reconnected', []);
      };
      /**
       * @hidden
       */


      Session.prototype.onMediaError = function (params) {
        logger.error('Media error: ' + JSON.stringify(params));
        var err = params.error;

        if (err) {
          this.ee.emitEvent('error-media', [{
            error: err
          }]);
        } else {
          logger.warn('Received undefined media error. Params:', params);
        }
      };
      /**
       * @hidden
       */


      Session.prototype.onRecordingStarted = function (response) {
        this.ee.emitEvent('recordingStarted', [new RecordingEvent_1.RecordingEvent(this, 'recordingStarted', response.id, response.name)]);
      };
      /**
       * @hidden
       */


      Session.prototype.onRecordingStopped = function (response) {
        this.ee.emitEvent('recordingStopped', [new RecordingEvent_1.RecordingEvent(this, 'recordingStopped', response.id, response.name, response.reason)]);
      };
      /**
       * @hidden
       * response = {connectionId: string, streamId: string, type: string, data: Object}
       */


      Session.prototype.onFilterEventDispatched = function (response) {
        var connectionId = response.connectionId;
        var streamId = response.streamId;
        this.getConnection(connectionId, 'No connection found for connectionId ' + connectionId).then(function (connection) {
          logger.info('Filter event dispatched');
          var stream = connection.stream;
          stream.filter.handlers[response.eventType](new FilterEvent_1.FilterEvent(stream.filter, response.eventType, response.data));
        });
      };
      /**
       * @hidden
       */


      Session.prototype.reconnectBrokenStreams = function () {
        logger.info('Re-establishing media connections...');
        var someReconnection = false; // Re-establish Publisher stream

        if (!!this.connection.stream && this.connection.stream.streamIceConnectionStateBroken()) {
          logger.warn('Re-establishing Publisher ' + this.connection.stream.streamId);
          this.connection.stream.initWebRtcPeerSend(true);
          someReconnection = true;
        } // Re-establish Subscriber streams


        for (var _i = 0, _a = Object.values(this.remoteConnections); _i < _a.length; _i++) {
          var remoteConnection = _a[_i];

          if (!!remoteConnection.stream && remoteConnection.stream.streamIceConnectionStateBroken()) {
            logger.warn('Re-establishing Subscriber ' + remoteConnection.stream.streamId);
            remoteConnection.stream.initWebRtcPeerReceive(true);
            someReconnection = true;
          }
        }

        if (!someReconnection) {
          logger.info('There were no media streams in need of a reconnection');
        }
      };
      /**
       * @hidden
       */


      Session.prototype.emitEvent = function (type, eventArray) {
        this.ee.emitEvent(type, eventArray);
      };
      /**
       * @hidden
       */


      Session.prototype.leave = function (forced, reason) {
        var _this = this;

        forced = !!forced;
        logger.info('Leaving Session (forced=' + forced + ')');

        if (!!this.connection) {
          if (!this.connection.disposed && !forced) {
            this.openvidu.sendRequest('leaveRoom', function (error, response) {
              if (error) {
                logger.error(error);
              }

              _this.openvidu.closeWs();
            });
          } else {
            this.openvidu.closeWs();
          }

          this.stopPublisherStream(reason);

          if (!this.connection.disposed) {
            // Make Session object dispatch 'sessionDisconnected' event (if it is not already disposed)
            var sessionDisconnectEvent = new SessionDisconnectedEvent_1.SessionDisconnectedEvent(this, reason);
            this.ee.emitEvent('sessionDisconnected', [sessionDisconnectEvent]);
            sessionDisconnectEvent.callDefaultBehavior();
          }
        } else {
          logger.warn('You were not connected to the session ' + this.sessionId);
        }
      };
      /**
       * @hidden
       */


      Session.prototype.initializeParams = function (token) {
        var joinParams = {
          token: !!token ? token : '',
          session: this.sessionId,
          platform: !!platform.description ? platform.description : 'unknown',
          metadata: !!this.options.metadata ? this.options.metadata : '',
          secret: this.openvidu.getSecret(),
          recorder: this.openvidu.getRecorder()
        };
        return joinParams;
      };
      /* Private methods */


      Session.prototype.connectAux = function (token) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          _this.openvidu.startWs(function (error) {
            if (!!error) {
              reject(error);
            } else {
              var joinParams = _this.initializeParams(token);

              _this.openvidu.sendRequest('joinRoom', joinParams, function (error, response) {
                if (!!error) {
                  reject(error);
                } else {
                  // Initialize capabilities object with the role
                  _this.capabilities = {
                    subscribe: true,
                    publish: _this.openvidu.role !== 'SUBSCRIBER',
                    forceUnpublish: _this.openvidu.role === 'MODERATOR',
                    forceDisconnect: _this.openvidu.role === 'MODERATOR'
                  }; // Initialize local Connection object with values returned by openvidu-server

                  _this.connection = new Connection_1.Connection(_this);
                  _this.connection.connectionId = response.id;
                  _this.connection.creationTime = response.createdAt;
                  _this.connection.data = response.metadata;
                  _this.connection.rpcSessionId = response.sessionId; // Initialize remote Connections with value returned by openvidu-server

                  var events_1 = {
                    connections: new Array(),
                    streams: new Array()
                  };
                  var existingParticipants = response.value;
                  existingParticipants.forEach(function (participant) {
                    var connection = new Connection_1.Connection(_this, participant);
                    _this.remoteConnections[connection.connectionId] = connection;
                    events_1.connections.push(connection);

                    if (!!connection.stream) {
                      _this.remoteStreamsCreated[connection.stream.streamId] = true;
                      events_1.streams.push(connection.stream);
                    }
                  }); // Own 'connectionCreated' event

                  _this.ee.emitEvent('connectionCreated', [new ConnectionEvent_1.ConnectionEvent(false, _this, 'connectionCreated', _this.connection, '')]); // One 'connectionCreated' event for each existing connection in the session


                  events_1.connections.forEach(function (connection) {
                    _this.ee.emitEvent('connectionCreated', [new ConnectionEvent_1.ConnectionEvent(false, _this, 'connectionCreated', connection, '')]);
                  }); // One 'streamCreated' event for each active stream in the session

                  events_1.streams.forEach(function (stream) {
                    _this.ee.emitEvent('streamCreated', [new StreamEvent_1.StreamEvent(false, _this, 'streamCreated', stream, '')]);
                  });
                  resolve();
                }
              });
            }
          });
        });
      };

      Session.prototype.stopPublisherStream = function (reason) {
        if (!!this.connection.stream) {
          // Dispose Publisher's  local stream
          this.connection.stream.disposeWebRtcPeer();

          if (this.connection.stream.isLocalStreamPublished) {
            // Make Publisher object dispatch 'streamDestroyed' event if the Stream was published
            this.connection.stream.ee.emitEvent('local-stream-destroyed', [reason]);
          }
        }
      };

      Session.prototype.stringClientMetadata = function (metadata) {
        if (typeof metadata !== 'string') {
          return JSON.stringify(metadata);
        } else {
          return metadata;
        }
      };

      Session.prototype.getConnection = function (connectionId, errorMessage) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          var connection = _this.remoteConnections[connectionId];

          if (!!connection) {
            // Resolve remote connection
            resolve(connection);
          } else {
            if (_this.connection.connectionId === connectionId) {
              // Resolve local connection
              resolve(_this.connection);
            } else {
              // Connection not found. Reject with OpenViduError
              reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.GENERIC_ERROR, errorMessage));
            }
          }
        });
      };

      Session.prototype.getRemoteConnection = function (connectionId, errorMessage) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          var connection = _this.remoteConnections[connectionId];

          if (!!connection) {
            // Resolve remote connection
            resolve(connection);
          } else {
            // Remote connection not found. Reject with OpenViduError
            reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.GENERIC_ERROR, errorMessage));
          }
        });
      };

      Session.prototype.processToken = function (token) {
        var match = token.match(/^(wss?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);

        if (!!match) {
          var url = {
            protocol: match[1],
            host: match[2],
            hostname: match[3],
            port: match[4],
            pathname: match[5],
            search: match[6],
            hash: match[7]
          };
          var params = token.split('?');
          var queryParams = decodeURI(params[1]).split('&').map(function (param) {
            return param.split('=');
          }).reduce(function (values, _a) {
            var key = _a[0],
                value = _a[1];
            values[key] = value;
            return values;
          }, {});
          this.sessionId = queryParams['sessionId'];
          var secret = queryParams['secret'];
          var recorder = queryParams['recorder'];
          var coturnIp = queryParams['coturnIp'];
          var turnUsername = queryParams['turnUsername'];
          var turnCredential = queryParams['turnCredential'];
          var role = queryParams['role'];
          var webrtcStatsInterval = queryParams['webrtcStatsInterval'];
          var openviduServerVersion = queryParams['version'];

          if (!!secret) {
            this.openvidu.secret = secret;
          }

          if (!!recorder) {
            this.openvidu.recorder = true;
          }

          if (!!turnUsername && !!turnCredential) {
            var stunUrl = 'stun:' + coturnIp + ':3478';
            var turnUrl1 = 'turn:' + coturnIp + ':3478';
            var turnUrl2 = turnUrl1 + '?transport=tcp';
            this.openvidu.iceServers = [{
              urls: [stunUrl]
            }, {
              urls: [turnUrl1, turnUrl2],
              username: turnUsername,
              credential: turnCredential
            }];
            logger.log("STUN/TURN server IP: " + coturnIp);
            logger.log('TURN temp credentials [' + turnUsername + ':' + turnCredential + ']');
          }

          if (!!role) {
            this.openvidu.role = role;
          }

          if (!!webrtcStatsInterval) {
            this.openvidu.webrtcStatsInterval = +webrtcStatsInterval;
          }

          if (!!openviduServerVersion) {
            logger.info("openvidu-server version: " + openviduServerVersion);

            if (openviduServerVersion !== this.openvidu.libraryVersion) {
              logger.error('OpenVidu Server (' + openviduServerVersion + ') and OpenVidu Browser (' + this.openvidu.libraryVersion + ') versions do NOT match. There may be incompatibilities');
            }
          }

          this.openvidu.wsUri = 'wss://' + url.host + '/openvidu';
          this.openvidu.httpUri = 'https://' + url.host;
        } else {
          logger.error('Token "' + token + '" is not valid');
        }
      };

      return Session;
    }(EventDispatcher_1.EventDispatcher);

    exports.Session = Session; //# sourceMappingURL=Session.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenVidu/Stream.js":
  /*!**************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenVidu/Stream.js ***!
    \**************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduStreamJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    var __extends = this && this.__extends || function () {
      var _extendStatics3 = function extendStatics(d, b) {
        _extendStatics3 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics3(d, b);
      };

      return function (d, b) {
        _extendStatics3(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    exports.__esModule = true;

    var Filter_1 = __webpack_require__(
    /*! ./Filter */
    "./node_modules/openvidu-browser/lib/OpenVidu/Filter.js");

    var Subscriber_1 = __webpack_require__(
    /*! ./Subscriber */
    "./node_modules/openvidu-browser/lib/OpenVidu/Subscriber.js");

    var EventDispatcher_1 = __webpack_require__(
    /*! ./EventDispatcher */
    "./node_modules/openvidu-browser/lib/OpenVidu/EventDispatcher.js");

    var WebRtcPeer_1 = __webpack_require__(
    /*! ../OpenViduInternal/WebRtcPeer/WebRtcPeer */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/WebRtcPeer/WebRtcPeer.js");

    var WebRtcStats_1 = __webpack_require__(
    /*! ../OpenViduInternal/WebRtcStats/WebRtcStats */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/WebRtcStats/WebRtcStats.js");

    var PublisherSpeakingEvent_1 = __webpack_require__(
    /*! ../OpenViduInternal/Events/PublisherSpeakingEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/PublisherSpeakingEvent.js");

    var StreamManagerEvent_1 = __webpack_require__(
    /*! ../OpenViduInternal/Events/StreamManagerEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamManagerEvent.js");

    var StreamPropertyChangedEvent_1 = __webpack_require__(
    /*! ../OpenViduInternal/Events/StreamPropertyChangedEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamPropertyChangedEvent.js");

    var OpenViduError_1 = __webpack_require__(
    /*! ../OpenViduInternal/Enums/OpenViduError */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/OpenViduError.js");
    /**
     * @hidden
     */


    var hark = __webpack_require__(
    /*! hark */
    "./node_modules/hark/hark.js");

    var platform = __webpack_require__(
    /*! platform */
    "./node_modules/platform/platform.js");

    var OpenViduLogger_1 = __webpack_require__(
    /*! ../OpenViduInternal/Logger/OpenViduLogger */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js");
    /**
     * @hidden
     */


    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    /**
     * Represents each one of the media streams available in OpenVidu Server for certain session.
     * Each [[Publisher]] and [[Subscriber]] has an attribute of type Stream, as they give access
     * to one of them (sending and receiving it, respectively)
     */

    var Stream =
    /** @class */
    function (_super) {
      __extends(Stream, _super);
      /**
       * @hidden
       */


      function Stream(session, options) {
        var _this = _super.call(this) || this;

        _this.isSubscribeToRemote = false;
        /**
         * @hidden
         */

        _this.isLocalStreamReadyToPublish = false;
        /**
         * @hidden
         */

        _this.isLocalStreamPublished = false;
        /**
         * @hidden
         */

        _this.publishedOnce = false;
        /**
         * @hidden
         */

        _this.publisherStartSpeakingEventEnabled = false;
        /**
         * @hidden
         */

        _this.publisherStartSpeakingEventEnabledOnce = false;
        /**
         * @hidden
         */

        _this.publisherStopSpeakingEventEnabled = false;
        /**
         * @hidden
         */

        _this.publisherStopSpeakingEventEnabledOnce = false;
        /**
         * @hidden
         */

        _this.volumeChangeEventEnabled = false;
        /**
         * @hidden
         */

        _this.volumeChangeEventEnabledOnce = false;
        _this.session = session;

        if (options.hasOwnProperty('id')) {
          // InboundStreamOptions: stream belongs to a Subscriber
          _this.inboundStreamOpts = options;
          _this.streamId = _this.inboundStreamOpts.id;
          _this.creationTime = _this.inboundStreamOpts.createdAt;
          _this.hasAudio = _this.inboundStreamOpts.hasAudio;
          _this.hasVideo = _this.inboundStreamOpts.hasVideo;

          if (_this.hasAudio) {
            _this.audioActive = _this.inboundStreamOpts.audioActive;
          }

          if (_this.hasVideo) {
            _this.videoActive = _this.inboundStreamOpts.videoActive;
            _this.typeOfVideo = !_this.inboundStreamOpts.typeOfVideo ? undefined : _this.inboundStreamOpts.typeOfVideo;
            _this.frameRate = _this.inboundStreamOpts.frameRate === -1 ? undefined : _this.inboundStreamOpts.frameRate;
            _this.videoDimensions = _this.inboundStreamOpts.videoDimensions;
          }

          if (!!_this.inboundStreamOpts.filter && Object.keys(_this.inboundStreamOpts.filter).length > 0) {
            if (!!_this.inboundStreamOpts.filter.lastExecMethod && Object.keys(_this.inboundStreamOpts.filter.lastExecMethod).length === 0) {
              delete _this.inboundStreamOpts.filter.lastExecMethod;
            }

            _this.filter = _this.inboundStreamOpts.filter;
          }
        } else {
          // OutboundStreamOptions: stream belongs to a Publisher
          _this.outboundStreamOpts = options;
          _this.hasAudio = _this.isSendAudio();
          _this.hasVideo = _this.isSendVideo();

          if (_this.hasAudio) {
            _this.audioActive = !!_this.outboundStreamOpts.publisherProperties.publishAudio;
          }

          if (_this.hasVideo) {
            _this.videoActive = !!_this.outboundStreamOpts.publisherProperties.publishVideo;
            _this.frameRate = _this.outboundStreamOpts.publisherProperties.frameRate;

            if (typeof MediaStreamTrack !== 'undefined' && _this.outboundStreamOpts.publisherProperties.videoSource instanceof MediaStreamTrack) {
              _this.typeOfVideo = 'CUSTOM';
            } else {
              _this.typeOfVideo = _this.isSendScreen() ? 'SCREEN' : 'CAMERA';
            }
          }

          if (!!_this.outboundStreamOpts.publisherProperties.filter) {
            _this.filter = _this.outboundStreamOpts.publisherProperties.filter;
          }
        }

        _this.ee.on('mediastream-updated', function () {
          _this.streamManager.updateMediaStream(_this.mediaStream);

          logger.debug('Video srcObject [' + _this.mediaStream + '] updated in stream [' + _this.streamId + ']');
        });

        return _this;
      }
      /**
       * See [[EventDispatcher.on]]
       */


      Stream.prototype.on = function (type, handler) {
        _super.prototype.onAux.call(this, type, "Event '" + type + "' triggered by stream '" + this.streamId + "'", handler);

        return this;
      };
      /**
       * See [[EventDispatcher.once]]
       */


      Stream.prototype.once = function (type, handler) {
        _super.prototype.onceAux.call(this, type, "Event '" + type + "' triggered once by stream '" + this.streamId + "'", handler);

        return this;
      };
      /**
       * See [[EventDispatcher.off]]
       */


      Stream.prototype.off = function (type, handler) {
        _super.prototype.off.call(this, type, handler);

        return this;
      };
      /**
       * Applies an audio/video filter to the stream.
       *
       * @param type Type of filter applied. See [[Filter.type]]
       * @param options Parameters used to initialize the filter. See [[Filter.options]]
       *
       * @returns A Promise (to which you can optionally subscribe to) that is resolved to the applied filter if success and rejected with an Error object if not
       */


      Stream.prototype.applyFilter = function (type, options) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          logger.info('Applying filter to stream ' + _this.streamId);
          options = !!options ? options : {};

          if (typeof options !== 'string') {
            options = JSON.stringify(options);
          }

          _this.session.openvidu.sendRequest('applyFilter', {
            streamId: _this.streamId,
            type: type,
            options: options
          }, function (error, response) {
            if (error) {
              logger.error('Error applying filter for Stream ' + _this.streamId, error);

              if (error.code === 401) {
                reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to apply a filter"));
              } else {
                reject(error);
              }
            } else {
              logger.info('Filter successfully applied on Stream ' + _this.streamId);
              var oldValue = _this.filter;
              _this.filter = new Filter_1.Filter(type, options);
              _this.filter.stream = _this;

              _this.session.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this.session, _this, 'filter', _this.filter, oldValue, 'applyFilter')]);

              _this.streamManager.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this.streamManager, _this, 'filter', _this.filter, oldValue, 'applyFilter')]);

              resolve(_this.filter);
            }
          });
        });
      };
      /**
       * Removes an audio/video filter previously applied.
       *
       * @returns A Promise (to which you can optionally subscribe to) that is resolved if the previously applied filter has been successfully removed and rejected with an Error object in other case
       */


      Stream.prototype.removeFilter = function () {
        var _this = this;

        return new Promise(function (resolve, reject) {
          logger.info('Removing filter of stream ' + _this.streamId);

          _this.session.openvidu.sendRequest('removeFilter', {
            streamId: _this.streamId
          }, function (error, response) {
            if (error) {
              logger.error('Error removing filter for Stream ' + _this.streamId, error);

              if (error.code === 401) {
                reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to remove a filter"));
              } else {
                reject(error);
              }
            } else {
              logger.info('Filter successfully removed from Stream ' + _this.streamId);
              var oldValue = _this.filter;
              delete _this.filter;

              _this.session.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this.session, _this, 'filter', _this.filter, oldValue, 'applyFilter')]);

              _this.streamManager.emitEvent('streamPropertyChanged', [new StreamPropertyChangedEvent_1.StreamPropertyChangedEvent(_this.streamManager, _this, 'filter', _this.filter, oldValue, 'applyFilter')]);

              resolve();
            }
          });
        });
      };
      /**
       * Returns the internal RTCPeerConnection object associated to this stream (https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection)
       *
       * @returns Native RTCPeerConnection Web API object
       */


      Stream.prototype.getRTCPeerConnection = function () {
        return this.webRtcPeer.pc;
      };
      /**
       * Returns the internal MediaStream object associated to this stream (https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)
       *
       * @returns Native MediaStream Web API object
       */


      Stream.prototype.getMediaStream = function () {
        return this.mediaStream;
      };
      /* Hidden methods */

      /**
       * @hidden
       */


      Stream.prototype.setMediaStream = function (mediaStream) {
        this.mediaStream = mediaStream;
      };
      /**
       * @hidden
       */


      Stream.prototype.updateMediaStreamInVideos = function () {
        this.ee.emitEvent('mediastream-updated', []);
      };
      /**
       * @hidden
       */


      Stream.prototype.getWebRtcPeer = function () {
        return this.webRtcPeer;
      };
      /**
       * @hidden
       */


      Stream.prototype.subscribeToMyRemote = function (value) {
        this.isSubscribeToRemote = value;
      };
      /**
       * @hidden
       */


      Stream.prototype.setOutboundStreamOptions = function (outboundStreamOpts) {
        this.outboundStreamOpts = outboundStreamOpts;
      };
      /**
       * @hidden
       */


      Stream.prototype.subscribe = function () {
        var _this = this;

        return new Promise(function (resolve, reject) {
          _this.initWebRtcPeerReceive(false).then(function () {
            resolve();
          })["catch"](function (error) {
            reject(error);
          });
        });
      };
      /**
       * @hidden
       */


      Stream.prototype.publish = function () {
        var _this = this;

        return new Promise(function (resolve, reject) {
          if (_this.isLocalStreamReadyToPublish) {
            _this.initWebRtcPeerSend(false).then(function () {
              resolve();
            })["catch"](function (error) {
              reject(error);
            });
          } else {
            _this.ee.once('stream-ready-to-publish', function () {
              _this.publish().then(function () {
                resolve();
              })["catch"](function (error) {
                reject(error);
              });
            });
          }
        });
      };
      /**
       * @hidden
       */


      Stream.prototype.disposeWebRtcPeer = function () {
        if (!!this.webRtcPeer) {
          this.webRtcPeer.dispose();
          this.stopWebRtcStats();
        }

        logger.info((!!this.outboundStreamOpts ? 'Outbound ' : 'Inbound ') + "WebRTCPeer from 'Stream' with id [" + this.streamId + '] is now closed');
      };
      /**
       * @hidden
       */


      Stream.prototype.disposeMediaStream = function () {
        if (this.mediaStream) {
          this.mediaStream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          this.mediaStream.getVideoTracks().forEach(function (track) {
            track.stop();
          });
          delete this.mediaStream;
        } // If subscribeToRemote local MediaStream must be stopped


        if (this.localMediaStreamWhenSubscribedToRemote) {
          this.localMediaStreamWhenSubscribedToRemote.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          this.localMediaStreamWhenSubscribedToRemote.getVideoTracks().forEach(function (track) {
            track.stop();
          });
          delete this.localMediaStreamWhenSubscribedToRemote;
        }

        if (!!this.speechEvent) {
          if (!!this.speechEvent.stop) {
            this.speechEvent.stop();
          }

          delete this.speechEvent;
        }

        logger.info((!!this.outboundStreamOpts ? 'Local ' : 'Remote ') + "MediaStream from 'Stream' with id [" + this.streamId + '] is now disposed');
      };
      /**
       * @hidden
       */


      Stream.prototype.displayMyRemote = function () {
        return this.isSubscribeToRemote;
      };
      /**
       * @hidden
       */


      Stream.prototype.isSendAudio = function () {
        return !!this.outboundStreamOpts && this.outboundStreamOpts.publisherProperties.audioSource !== null && this.outboundStreamOpts.publisherProperties.audioSource !== false;
      };
      /**
       * @hidden
       */


      Stream.prototype.isSendVideo = function () {
        return !!this.outboundStreamOpts && this.outboundStreamOpts.publisherProperties.videoSource !== null && this.outboundStreamOpts.publisherProperties.videoSource !== false;
      };
      /**
       * @hidden
       */


      Stream.prototype.isSendScreen = function () {
        var screen = this.outboundStreamOpts.publisherProperties.videoSource === 'screen';

        if (platform.name === 'Electron') {
          screen = typeof this.outboundStreamOpts.publisherProperties.videoSource === 'string' && this.outboundStreamOpts.publisherProperties.videoSource.startsWith('screen:');
        }

        return !!this.outboundStreamOpts && screen;
      };
      /**
       * @hidden
       */


      Stream.prototype.enableStartSpeakingEvent = function () {
        var _this = this;

        this.setSpeechEventIfNotExists();

        if (!this.publisherStartSpeakingEventEnabled) {
          this.publisherStartSpeakingEventEnabled = true;
          this.speechEvent.on('speaking', function () {
            _this.session.emitEvent('publisherStartSpeaking', [new PublisherSpeakingEvent_1.PublisherSpeakingEvent(_this.session, 'publisherStartSpeaking', _this.connection, _this.streamId)]);

            _this.publisherStartSpeakingEventEnabledOnce = false; // Disable 'once' version if 'on' version was triggered
          });
        }
      };
      /**
       * @hidden
       */


      Stream.prototype.enableOnceStartSpeakingEvent = function () {
        var _this = this;

        this.setSpeechEventIfNotExists();

        if (!this.publisherStartSpeakingEventEnabledOnce) {
          this.publisherStartSpeakingEventEnabledOnce = true;
          this.speechEvent.once('speaking', function () {
            if (_this.publisherStartSpeakingEventEnabledOnce) {
              // If the listener has been disabled in the meantime (for example by the 'on' version) do not trigger the event
              _this.session.emitEvent('publisherStartSpeaking', [new PublisherSpeakingEvent_1.PublisherSpeakingEvent(_this.session, 'publisherStartSpeaking', _this.connection, _this.streamId)]);
            }

            _this.disableStartSpeakingEvent(true);
          });
        }
      };
      /**
       * @hidden
       */


      Stream.prototype.disableStartSpeakingEvent = function (disabledByOnce) {
        if (!!this.speechEvent) {
          this.publisherStartSpeakingEventEnabledOnce = false;

          if (disabledByOnce) {
            if (this.publisherStartSpeakingEventEnabled) {
              // The 'on' version of this same event is enabled too. Do not remove the hark listener
              return;
            }
          } else {
            this.publisherStartSpeakingEventEnabled = false;
          } // Shutting down the hark event


          if (this.volumeChangeEventEnabled || this.volumeChangeEventEnabledOnce || this.publisherStopSpeakingEventEnabled || this.publisherStopSpeakingEventEnabledOnce) {
            // Some other hark event is enabled. Cannot stop the hark process, just remove the specific listener
            this.speechEvent.off('speaking');
          } else {
            // No other hark event is enabled. We can get entirely rid of it
            this.speechEvent.stop();
            delete this.speechEvent;
          }
        }
      };
      /**
       * @hidden
       */


      Stream.prototype.enableStopSpeakingEvent = function () {
        var _this = this;

        this.setSpeechEventIfNotExists();

        if (!this.publisherStopSpeakingEventEnabled) {
          this.publisherStopSpeakingEventEnabled = true;
          this.speechEvent.on('stopped_speaking', function () {
            _this.session.emitEvent('publisherStopSpeaking', [new PublisherSpeakingEvent_1.PublisherSpeakingEvent(_this.session, 'publisherStopSpeaking', _this.connection, _this.streamId)]);

            _this.publisherStopSpeakingEventEnabledOnce = false; // Disable 'once' version if 'on' version was triggered
          });
        }
      };
      /**
       * @hidden
       */


      Stream.prototype.enableOnceStopSpeakingEvent = function () {
        var _this = this;

        this.setSpeechEventIfNotExists();

        if (!this.publisherStopSpeakingEventEnabledOnce) {
          this.publisherStopSpeakingEventEnabledOnce = true;
          this.speechEvent.once('stopped_speaking', function () {
            if (_this.publisherStopSpeakingEventEnabledOnce) {
              // If the listener has been disabled in the meantime (for example by the 'on' version) do not trigger the event
              _this.session.emitEvent('publisherStopSpeaking', [new PublisherSpeakingEvent_1.PublisherSpeakingEvent(_this.session, 'publisherStopSpeaking', _this.connection, _this.streamId)]);
            }

            _this.disableStopSpeakingEvent(true);
          });
        }
      };
      /**
      * @hidden
      */


      Stream.prototype.disableStopSpeakingEvent = function (disabledByOnce) {
        if (!!this.speechEvent) {
          this.publisherStopSpeakingEventEnabledOnce = false;

          if (disabledByOnce) {
            if (this.publisherStopSpeakingEventEnabled) {
              // We are cancelling the 'once' listener for this event, but the 'on' version
              // of this same event is enabled too. Do not remove the hark listener
              return;
            }
          } else {
            this.publisherStopSpeakingEventEnabled = false;
          } // Shutting down the hark event


          if (this.volumeChangeEventEnabled || this.volumeChangeEventEnabledOnce || this.publisherStartSpeakingEventEnabled || this.publisherStartSpeakingEventEnabledOnce) {
            // Some other hark event is enabled. Cannot stop the hark process, just remove the specific listener
            this.speechEvent.off('stopped_speaking');
          } else {
            // No other hark event is enabled. We can get entirely rid of it
            this.speechEvent.stop();
            delete this.speechEvent;
          }
        }
      };
      /**
       * @hidden
       */


      Stream.prototype.enableVolumeChangeEvent = function (force) {
        var _this = this;

        if (this.setSpeechEventIfNotExists()) {
          if (!this.volumeChangeEventEnabled || force) {
            this.volumeChangeEventEnabled = true;
            this.speechEvent.on('volume_change', function (harkEvent) {
              var oldValue = _this.speechEvent.oldVolumeValue;
              var value = {
                newValue: harkEvent,
                oldValue: oldValue
              };
              _this.speechEvent.oldVolumeValue = harkEvent;

              _this.streamManager.emitEvent('streamAudioVolumeChange', [new StreamManagerEvent_1.StreamManagerEvent(_this.streamManager, 'streamAudioVolumeChange', value)]);
            });
          }
        } else {
          // This way whenever the MediaStream object is available, the event listener will be automatically added
          this.volumeChangeEventEnabled = true;
        }
      };
      /**
       * @hidden
       */


      Stream.prototype.enableOnceVolumeChangeEvent = function (force) {
        var _this = this;

        if (this.setSpeechEventIfNotExists()) {
          if (!this.volumeChangeEventEnabledOnce || force) {
            this.volumeChangeEventEnabledOnce = true;
            this.speechEvent.once('volume_change', function (harkEvent) {
              var oldValue = _this.speechEvent.oldVolumeValue;
              var value = {
                newValue: harkEvent,
                oldValue: oldValue
              };
              _this.speechEvent.oldVolumeValue = harkEvent;

              _this.disableVolumeChangeEvent(true);

              _this.streamManager.emitEvent('streamAudioVolumeChange', [new StreamManagerEvent_1.StreamManagerEvent(_this.streamManager, 'streamAudioVolumeChange', value)]);
            });
          }
        } else {
          // This way whenever the MediaStream object is available, the event listener will be automatically added
          this.volumeChangeEventEnabledOnce = true;
        }
      };
      /**
       * @hidden
       */


      Stream.prototype.disableVolumeChangeEvent = function (disabledByOnce) {
        if (!!this.speechEvent) {
          this.volumeChangeEventEnabledOnce = false;

          if (disabledByOnce) {
            if (this.volumeChangeEventEnabled) {
              // We are cancelling the 'once' listener for this event, but the 'on' version
              // of this same event is enabled too. Do not remove the hark listener
              return;
            }
          } else {
            this.volumeChangeEventEnabled = false;
          } // Shutting down the hark event


          if (this.publisherStartSpeakingEventEnabled || this.publisherStartSpeakingEventEnabledOnce || this.publisherStopSpeakingEventEnabled || this.publisherStopSpeakingEventEnabledOnce) {
            // Some other hark event is enabled. Cannot stop the hark process, just remove the specific listener
            this.speechEvent.off('volume_change');
          } else {
            // No other hark event is enabled. We can get entirely rid of it
            this.speechEvent.stop();
            delete this.speechEvent;
          }
        }
      };
      /**
       * @hidden
       */


      Stream.prototype.isLocal = function () {
        // inbound options undefined and outbound options defined
        return !this.inboundStreamOpts && !!this.outboundStreamOpts;
      };
      /**
       * @hidden
       */


      Stream.prototype.getSelectedIceCandidate = function () {
        var _this = this;

        return new Promise(function (resolve, reject) {
          _this.webRtcStats.getSelectedIceCandidateInfo().then(function (report) {
            return resolve(report);
          })["catch"](function (error) {
            return reject(error);
          });
        });
      };
      /**
       * @hidden
       */


      Stream.prototype.getRemoteIceCandidateList = function () {
        return this.webRtcPeer.remoteCandidatesQueue;
      };
      /**
       * @hidden
       */


      Stream.prototype.getLocalIceCandidateList = function () {
        return this.webRtcPeer.localCandidatesQueue;
      };
      /**
       * @hidden
       */


      Stream.prototype.streamIceConnectionStateBroken = function () {
        if (!this.getWebRtcPeer() || !this.getRTCPeerConnection()) {
          return false;
        }

        if (this.isLocal && !!this.session.openvidu.advancedConfiguration.forceMediaReconnectionAfterNetworkDrop) {
          logger.warn('OpenVidu Browser advanced configuration option "forceMediaReconnectionAfterNetworkDrop" is enabled. Publisher stream ' + this.streamId + 'will force a reconnection');
          return true;
        }

        var iceConnectionState = this.getRTCPeerConnection().iceConnectionState;
        return iceConnectionState === 'disconnected' || iceConnectionState === 'failed';
      };
      /* Private methods */


      Stream.prototype.setSpeechEventIfNotExists = function () {
        if (!!this.mediaStream) {
          if (!this.speechEvent) {
            var harkOptions = !!this.harkOptions ? this.harkOptions : this.session.openvidu.advancedConfiguration.publisherSpeakingEventsOptions || {};
            harkOptions.interval = typeof harkOptions.interval === 'number' ? harkOptions.interval : 100;
            harkOptions.threshold = typeof harkOptions.threshold === 'number' ? harkOptions.threshold : -50;
            this.speechEvent = hark(this.mediaStream, harkOptions);
          }

          return true;
        }

        return false;
      };
      /**
       * @hidden
       */


      Stream.prototype.initWebRtcPeerSend = function (reconnect) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          if (!reconnect) {
            _this.initHarkEvents(); // Init hark events for the local stream

          }

          var userMediaConstraints = {
            audio: _this.isSendAudio(),
            video: _this.isSendVideo()
          };
          var options = {
            mediaStream: _this.mediaStream,
            mediaConstraints: userMediaConstraints,
            onicecandidate: _this.connection.sendIceCandidate.bind(_this.connection),
            iceServers: _this.getIceServersConf(),
            simulcast: false
          };

          var successCallback = function successCallback(sdpOfferParam) {
            logger.debug('Sending SDP offer to publish as ' + _this.streamId, sdpOfferParam);
            var method = reconnect ? 'reconnectStream' : 'publishVideo';
            var params;

            if (reconnect) {
              params = {
                stream: _this.streamId
              };
            } else {
              var typeOfVideo = '';

              if (_this.isSendVideo()) {
                typeOfVideo = typeof MediaStreamTrack !== 'undefined' && _this.outboundStreamOpts.publisherProperties.videoSource instanceof MediaStreamTrack ? 'CUSTOM' : _this.isSendScreen() ? 'SCREEN' : 'CAMERA';
              }

              params = {
                doLoopback: _this.displayMyRemote() || false,
                hasAudio: _this.isSendAudio(),
                hasVideo: _this.isSendVideo(),
                audioActive: _this.audioActive,
                videoActive: _this.videoActive,
                typeOfVideo: typeOfVideo,
                frameRate: !!_this.frameRate ? _this.frameRate : -1,
                videoDimensions: JSON.stringify(_this.videoDimensions),
                filter: _this.outboundStreamOpts.publisherProperties.filter
              };
            }

            params['sdpOffer'] = sdpOfferParam;

            _this.session.openvidu.sendRequest(method, params, function (error, response) {
              if (error) {
                if (error.code === 401) {
                  reject(new OpenViduError_1.OpenViduError(OpenViduError_1.OpenViduErrorName.OPENVIDU_PERMISSION_DENIED, "You don't have permissions to publish"));
                } else {
                  reject('Error on publishVideo: ' + JSON.stringify(error));
                }
              } else {
                _this.webRtcPeer.processAnswer(response.sdpAnswer, false).then(function () {
                  _this.streamId = response.id;
                  _this.creationTime = response.createdAt;
                  _this.isLocalStreamPublished = true;
                  _this.publishedOnce = true;

                  if (_this.displayMyRemote()) {
                    _this.localMediaStreamWhenSubscribedToRemote = _this.mediaStream;

                    _this.remotePeerSuccessfullyEstablished();
                  }

                  if (reconnect) {
                    _this.ee.emitEvent('stream-reconnected-by-publisher', []);
                  } else {
                    _this.ee.emitEvent('stream-created-by-publisher', []);
                  }

                  _this.initWebRtcStats();

                  logger.info("'Publisher' (" + _this.streamId + ") successfully " + (reconnect ? "reconnected" : "published") + " to session");
                  resolve();
                })["catch"](function (error) {
                  reject(error);
                });
              }
            });
          };

          if (reconnect) {
            _this.disposeWebRtcPeer();
          }

          if (_this.displayMyRemote()) {
            _this.webRtcPeer = new WebRtcPeer_1.WebRtcPeerSendrecv(options);
          } else {
            _this.webRtcPeer = new WebRtcPeer_1.WebRtcPeerSendonly(options);
          }

          _this.webRtcPeer.addIceConnectionStateChangeListener('publisher of ' + _this.connection.connectionId);

          _this.webRtcPeer.generateOffer().then(function (sdpOffer) {
            successCallback(sdpOffer);
          })["catch"](function (error) {
            reject(new Error('(publish) SDP offer error: ' + JSON.stringify(error)));
          });
        });
      };
      /**
       * @hidden
       */


      Stream.prototype.initWebRtcPeerReceive = function (reconnect) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          var offerConstraints = {
            audio: _this.inboundStreamOpts.hasAudio,
            video: _this.inboundStreamOpts.hasVideo
          };
          logger.debug("'Session.subscribe(Stream)' called. Constraints of generate SDP offer", offerConstraints);
          var options = {
            onicecandidate: _this.connection.sendIceCandidate.bind(_this.connection),
            mediaConstraints: offerConstraints,
            iceServers: _this.getIceServersConf(),
            simulcast: false
          };

          var successCallback = function successCallback(sdpOfferParam) {
            logger.debug('Sending SDP offer to subscribe to ' + _this.streamId, sdpOfferParam);
            var method = reconnect ? 'reconnectStream' : 'receiveVideoFrom';
            var params = {
              sdpOffer: sdpOfferParam
            };
            params[reconnect ? 'stream' : 'sender'] = _this.streamId;

            _this.session.openvidu.sendRequest(method, params, function (error, response) {
              if (error) {
                reject(new Error('Error on recvVideoFrom: ' + JSON.stringify(error)));
              } else {
                // Ios Ionic. Limitation: some bug in iosrtc cordova plugin makes it necessary
                // to add a timeout before calling PeerConnection#setRemoteDescription during
                // some time (400 ms) from the moment first subscriber stream is received
                if (_this.session.isFirstIonicIosSubscriber) {
                  _this.session.isFirstIonicIosSubscriber = false;
                  setTimeout(function () {
                    // After 400 ms Ionic iOS subscribers won't need to run
                    // PeerConnection#setRemoteDescription after 250 ms timeout anymore
                    _this.session.countDownForIonicIosSubscribersActive = false;
                  }, 400);
                }

                var needsTimeoutOnProcessAnswer = _this.session.countDownForIonicIosSubscribersActive;

                _this.webRtcPeer.processAnswer(response.sdpAnswer, needsTimeoutOnProcessAnswer).then(function () {
                  logger.info("'Subscriber' (" + _this.streamId + ") successfully " + (reconnect ? "reconnected" : "subscribed"));

                  _this.remotePeerSuccessfullyEstablished();

                  _this.initWebRtcStats();

                  resolve();
                })["catch"](function (error) {
                  reject(error);
                });
              }
            });
          };

          _this.webRtcPeer = new WebRtcPeer_1.WebRtcPeerRecvonly(options);

          _this.webRtcPeer.addIceConnectionStateChangeListener(_this.streamId);

          _this.webRtcPeer.generateOffer().then(function (sdpOffer) {
            successCallback(sdpOffer);
          })["catch"](function (error) {
            reject(new Error('(subscribe) SDP offer error: ' + JSON.stringify(error)));
          });
        });
      };
      /**
       * @hidden
       */


      Stream.prototype.remotePeerSuccessfullyEstablished = function () {
        this.mediaStream = new MediaStream();
        var receiver;

        for (var _i = 0, _a = this.webRtcPeer.pc.getReceivers(); _i < _a.length; _i++) {
          receiver = _a[_i];

          if (!!receiver.track) {
            this.mediaStream.addTrack(receiver.track);
          }
        }

        logger.debug('Peer remote stream', this.mediaStream);

        if (!!this.mediaStream) {
          if (this.streamManager instanceof Subscriber_1.Subscriber) {
            // Apply SubscriberProperties.subscribeToAudio and SubscriberProperties.subscribeToVideo
            if (!!this.mediaStream.getAudioTracks()[0]) {
              var enabled = !!this.streamManager.properties.subscribeToAudio;
              this.mediaStream.getAudioTracks()[0].enabled = enabled;
            }

            if (!!this.mediaStream.getVideoTracks()[0]) {
              var enabled = !!this.streamManager.properties.subscribeToVideo;
              this.mediaStream.getVideoTracks()[0].enabled = enabled;
            }
          }

          this.updateMediaStreamInVideos();
          this.initHarkEvents(); // Init hark events for the remote stream
        }
      };

      Stream.prototype.initHarkEvents = function () {
        if (!!this.mediaStream.getAudioTracks()[0]) {
          // Hark events can only be set if audio track is available
          if (this.streamManager.remote) {
            // publisherStartSpeaking/publisherStopSpeaking is only defined for remote streams
            if (this.session.startSpeakingEventsEnabled) {
              this.enableStartSpeakingEvent();
            }

            if (this.session.startSpeakingEventsEnabledOnce) {
              this.enableOnceStartSpeakingEvent();
            }

            if (this.session.stopSpeakingEventsEnabled) {
              this.enableStopSpeakingEvent();
            }

            if (this.session.stopSpeakingEventsEnabledOnce) {
              this.enableOnceStopSpeakingEvent();
            }
          } // streamAudioVolumeChange event is defined for both Publishers and Subscribers


          if (this.volumeChangeEventEnabled) {
            this.enableVolumeChangeEvent(true);
          }

          if (this.volumeChangeEventEnabledOnce) {
            this.enableOnceVolumeChangeEvent(true);
          }
        }
      };

      Stream.prototype.initWebRtcStats = function () {
        this.webRtcStats = new WebRtcStats_1.WebRtcStats(this);
        this.webRtcStats.initWebRtcStats(); //TODO: send common webrtc stats from client to openvidu-server

        /*if (this.session.openvidu.webrtcStatsInterval > 0) {
            setInterval(() => {
                this.gatherStatsForPeer().then(jsonStats => {
                    const body = {
                        sessionId: this.session.sessionId,
                        participantPrivateId: this.connection.rpcSessionId,
                        stats: jsonStats
                    }
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', this.session.openvidu.httpUri + '/elasticsearch/webrtc-stats', true);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify(body));
                })
            }, this.session.openvidu.webrtcStatsInterval * 1000);
        }*/
      };

      Stream.prototype.stopWebRtcStats = function () {
        if (!!this.webRtcStats && this.webRtcStats.isEnabled()) {
          this.webRtcStats.stopWebRtcStats();
        }
      };

      Stream.prototype.getIceServersConf = function () {
        var returnValue;

        if (!!this.session.openvidu.advancedConfiguration.iceServers) {
          returnValue = this.session.openvidu.advancedConfiguration.iceServers === 'freeice' ? undefined : this.session.openvidu.advancedConfiguration.iceServers;
        } else if (this.session.openvidu.iceServers) {
          returnValue = this.session.openvidu.iceServers;
        } else {
          returnValue = undefined;
        }

        return returnValue;
      };

      Stream.prototype.gatherStatsForPeer = function () {
        var _this = this;

        return new Promise(function (resolve, reject) {
          if (_this.isLocal()) {
            // Publisher stream stats
            _this.getRTCPeerConnection().getSenders().forEach(function (sender) {
              return sender.getStats().then(function (response) {
                response.forEach(function (report) {
                  if (_this.isReportWanted(report)) {
                    var finalReport = {};
                    finalReport['type'] = report.type;
                    finalReport['timestamp'] = report.timestamp;
                    finalReport['id'] = report.id; // Common to Chrome, Firefox and Safari

                    if (report.type === 'outbound-rtp') {
                      finalReport['ssrc'] = report.ssrc;
                      finalReport['firCount'] = report.firCount;
                      finalReport['pliCount'] = report.pliCount;
                      finalReport['nackCount'] = report.nackCount;
                      finalReport['qpSum'] = report.qpSum; // Set media type

                      if (!!report.kind) {
                        finalReport['mediaType'] = report.kind;
                      } else if (!!report.mediaType) {
                        finalReport['mediaType'] = report.mediaType;
                      } else {
                        // Safari does not have 'mediaType' defined for inbound-rtp. Must be inferred from 'id' field
                        finalReport['mediaType'] = report.id.indexOf('VideoStream') !== -1 ? 'video' : 'audio';
                      }

                      if (finalReport['mediaType'] === 'video') {
                        finalReport['framesEncoded'] = report.framesEncoded;
                      }

                      finalReport['packetsSent'] = report.packetsSent;
                      finalReport['bytesSent'] = report.bytesSent;
                    } // Only for Chrome and Safari


                    if (report.type === 'candidate-pair' && report.totalRoundTripTime !== undefined) {
                      // This is the final selected candidate pair
                      finalReport['availableOutgoingBitrate'] = report.availableOutgoingBitrate;
                      finalReport['rtt'] = report.currentRoundTripTime;
                      finalReport['averageRtt'] = report.totalRoundTripTime / report.responsesReceived;
                    } // Only for Firefox >= 66.0


                    if (report.type === 'remote-inbound-rtp' || report.type === 'remote-outbound-rtp') {}

                    logger.log(finalReport);
                  }
                });
              });
            });
          } else {
            // Subscriber stream stats
            _this.getRTCPeerConnection().getReceivers().forEach(function (receiver) {
              return receiver.getStats().then(function (response) {
                response.forEach(function (report) {
                  if (_this.isReportWanted(report)) {
                    var finalReport = {};
                    finalReport['type'] = report.type;
                    finalReport['timestamp'] = report.timestamp;
                    finalReport['id'] = report.id; // Common to Chrome, Firefox and Safari

                    if (report.type === 'inbound-rtp') {
                      finalReport['ssrc'] = report.ssrc;
                      finalReport['firCount'] = report.firCount;
                      finalReport['pliCount'] = report.pliCount;
                      finalReport['nackCount'] = report.nackCount;
                      finalReport['qpSum'] = report.qpSum; // Set media type

                      if (!!report.kind) {
                        finalReport['mediaType'] = report.kind;
                      } else if (!!report.mediaType) {
                        finalReport['mediaType'] = report.mediaType;
                      } else {
                        // Safari does not have 'mediaType' defined for inbound-rtp. Must be inferred from 'id' field
                        finalReport['mediaType'] = report.id.indexOf('VideoStream') !== -1 ? 'video' : 'audio';
                      }

                      if (finalReport['mediaType'] === 'video') {
                        finalReport['framesDecoded'] = report.framesDecoded;
                      }

                      finalReport['packetsReceived'] = report.packetsReceived;
                      finalReport['packetsLost'] = report.packetsLost;
                      finalReport['jitter'] = report.jitter;
                      finalReport['bytesReceived'] = report.bytesReceived;
                    } // Only for Chrome and Safari


                    if (report.type === 'candidate-pair' && report.totalRoundTripTime !== undefined) {
                      // This is the final selected candidate pair
                      finalReport['availableIncomingBitrate'] = report.availableIncomingBitrate;
                      finalReport['rtt'] = report.currentRoundTripTime;
                      finalReport['averageRtt'] = report.totalRoundTripTime / report.responsesReceived;
                    } // Only for Firefox >= 66.0


                    if (report.type === 'remote-inbound-rtp' || report.type === 'remote-outbound-rtp') {}

                    logger.log(finalReport);
                  }
                });
              });
            });
          }
        });
      };

      Stream.prototype.isReportWanted = function (report) {
        return report.type === 'inbound-rtp' && !this.isLocal() || report.type === 'outbound-rtp' && this.isLocal() || report.type === 'candidate-pair' && report.nominated && report.bytesSent > 0;
      };

      return Stream;
    }(EventDispatcher_1.EventDispatcher);

    exports.Stream = Stream; //# sourceMappingURL=Stream.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenVidu/StreamManager.js":
  /*!*********************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenVidu/StreamManager.js ***!
    \*********************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduStreamManagerJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    var __extends = this && this.__extends || function () {
      var _extendStatics4 = function extendStatics(d, b) {
        _extendStatics4 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics4(d, b);
      };

      return function (d, b) {
        _extendStatics4(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    exports.__esModule = true;

    var EventDispatcher_1 = __webpack_require__(
    /*! ./EventDispatcher */
    "./node_modules/openvidu-browser/lib/OpenVidu/EventDispatcher.js");

    var StreamManagerEvent_1 = __webpack_require__(
    /*! ../OpenViduInternal/Events/StreamManagerEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamManagerEvent.js");

    var VideoElementEvent_1 = __webpack_require__(
    /*! ../OpenViduInternal/Events/VideoElementEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/VideoElementEvent.js");

    var VideoInsertMode_1 = __webpack_require__(
    /*! ../OpenViduInternal/Enums/VideoInsertMode */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/VideoInsertMode.js");

    var platform = __webpack_require__(
    /*! platform */
    "./node_modules/platform/platform.js");

    var OpenViduLogger_1 = __webpack_require__(
    /*! ../OpenViduInternal/Logger/OpenViduLogger */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js");
    /**
     * @hidden
     */


    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    /**
     * Interface in charge of displaying the media streams in the HTML DOM. This wraps any [[Publisher]] and [[Subscriber]] object.
     * You can insert as many video players fo the same Stream as you want by calling [[StreamManager.addVideoElement]] or
     * [[StreamManager.createVideoElement]].
     * The use of StreamManager wrapper is particularly useful when you don't need to differentiate between Publisher or Subscriber streams or just
     * want to directly manage your own video elements (even more than one video element per Stream). This scenario is pretty common in
     * declarative, MVC frontend frameworks such as Angular, React or Vue.js
     *
     * ### Available event listeners (and events dispatched)
     *
     * - videoElementCreated ([[VideoElementEvent]])
     * - videoElementDestroyed ([[VideoElementEvent]])
     * - streamPlaying ([[StreamManagerEvent]])
     * - streamAudioVolumeChange ([[StreamManagerEvent]])
     *
     */

    var StreamManager =
    /** @class */
    function (_super) {
      __extends(StreamManager, _super);
      /**
       * @hidden
       */


      function StreamManager(stream, targetElement) {
        var _this = _super.call(this) || this;
        /**
         * All the videos displaying the Stream of this Publisher/Subscriber
         */


        _this.videos = [];
        /**
         * @hidden
         */

        _this.lazyLaunchVideoElementCreatedEvent = false;
        _this.stream = stream;
        _this.stream.streamManager = _this;
        _this.remote = !_this.stream.isLocal();

        if (!!targetElement) {
          var targEl = void 0;

          if (typeof targetElement === 'string') {
            targEl = document.getElementById(targetElement);
          } else if (targetElement instanceof HTMLElement) {
            targEl = targetElement;
          }

          if (!!targEl) {
            _this.firstVideoElement = {
              targetElement: targEl,
              video: document.createElement('video'),
              id: '',
              canplayListenerAdded: false
            };

            if (platform.name === 'Safari') {
              _this.firstVideoElement.video.setAttribute('playsinline', 'true');
            }

            _this.targetElement = targEl;
            _this.element = targEl;
          }
        }

        _this.canPlayListener = function () {
          if (_this.stream.isLocal()) {
            if (!_this.stream.displayMyRemote()) {
              logger.info("Your local 'Stream' with id [" + _this.stream.streamId + '] video is now playing');

              _this.ee.emitEvent('videoPlaying', [new VideoElementEvent_1.VideoElementEvent(_this.videos[0].video, _this, 'videoPlaying')]);
            } else {
              logger.info("Your own remote 'Stream' with id [" + _this.stream.streamId + '] video is now playing');

              _this.ee.emitEvent('remoteVideoPlaying', [new VideoElementEvent_1.VideoElementEvent(_this.videos[0].video, _this, 'remoteVideoPlaying')]);
            }
          } else {
            logger.info("Remote 'Stream' with id [" + _this.stream.streamId + '] video is now playing');

            _this.ee.emitEvent('videoPlaying', [new VideoElementEvent_1.VideoElementEvent(_this.videos[0].video, _this, 'videoPlaying')]);
          }

          _this.ee.emitEvent('streamPlaying', [new StreamManagerEvent_1.StreamManagerEvent(_this, 'streamPlaying', undefined)]);
        };

        return _this;
      }
      /**
       * See [[EventDispatcher.on]]
       */


      StreamManager.prototype.on = function (type, handler) {
        _super.prototype.onAux.call(this, type, "Event '" + type + "' triggered by '" + (this.remote ? 'Subscriber' : 'Publisher') + "'", handler);

        if (type === 'videoElementCreated') {
          if (!!this.stream && this.lazyLaunchVideoElementCreatedEvent) {
            this.ee.emitEvent('videoElementCreated', [new VideoElementEvent_1.VideoElementEvent(this.videos[0].video, this, 'videoElementCreated')]);
            this.lazyLaunchVideoElementCreatedEvent = false;
          }
        }

        if (type === 'streamPlaying' || type === 'videoPlaying') {
          if (this.videos[0] && this.videos[0].video && this.videos[0].video.currentTime > 0 && this.videos[0].video.paused === false && this.videos[0].video.ended === false && this.videos[0].video.readyState === 4) {
            this.ee.emitEvent('streamPlaying', [new StreamManagerEvent_1.StreamManagerEvent(this, 'streamPlaying', undefined)]);
            this.ee.emitEvent('videoPlaying', [new VideoElementEvent_1.VideoElementEvent(this.videos[0].video, this, 'videoPlaying')]);
          }
        }

        if (type === 'streamAudioVolumeChange' && this.stream.hasAudio) {
          this.stream.enableVolumeChangeEvent(false);
        }

        return this;
      };
      /**
       * See [[EventDispatcher.once]]
       */


      StreamManager.prototype.once = function (type, handler) {
        _super.prototype.onceAux.call(this, type, "Event '" + type + "' triggered once by '" + (this.remote ? 'Subscriber' : 'Publisher') + "'", handler);

        if (type === 'videoElementCreated') {
          if (!!this.stream && this.lazyLaunchVideoElementCreatedEvent) {
            this.ee.emitEvent('videoElementCreated', [new VideoElementEvent_1.VideoElementEvent(this.videos[0].video, this, 'videoElementCreated')]);
          }
        }

        if (type === 'streamPlaying' || type === 'videoPlaying') {
          if (this.videos[0] && this.videos[0].video && this.videos[0].video.currentTime > 0 && this.videos[0].video.paused === false && this.videos[0].video.ended === false && this.videos[0].video.readyState === 4) {
            this.ee.emitEvent('streamPlaying', [new StreamManagerEvent_1.StreamManagerEvent(this, 'streamPlaying', undefined)]);
            this.ee.emitEvent('videoPlaying', [new VideoElementEvent_1.VideoElementEvent(this.videos[0].video, this, 'videoPlaying')]);
          }
        }

        if (type === 'streamAudioVolumeChange' && this.stream.hasAudio) {
          this.stream.enableOnceVolumeChangeEvent(false);
        }

        return this;
      };
      /**
       * See [[EventDispatcher.off]]
       */


      StreamManager.prototype.off = function (type, handler) {
        _super.prototype.off.call(this, type, handler);

        if (type === 'streamAudioVolumeChange') {
          var remainingVolumeEventListeners = this.ee.getListeners(type).length;

          if (remainingVolumeEventListeners === 0) {
            this.stream.disableVolumeChangeEvent(false);
          }
        }

        return this;
      };
      /**
       * Makes `video` element parameter display this [[stream]]. This is useful when you are
       * [managing the video elements on your own](/en/stable/cheatsheet/manage-videos/#you-take-care-of-the-video-players)
       *
       * Calling this method with a video already added to other Publisher/Subscriber will cause the video element to be
       * disassociated from that previous Publisher/Subscriber and to be associated to this one.
       *
       * @returns 1 if the video wasn't associated to any other Publisher/Subscriber and has been successfully added to this one.
       * 0 if the video was already added to this Publisher/Subscriber. -1 if the video was previously associated to any other
       * Publisher/Subscriber and has been successfully disassociated from that one and properly added to this one.
       */


      StreamManager.prototype.addVideoElement = function (video) {
        this.initializeVideoProperties(video);

        if (this.stream.isLocal() && this.stream.displayMyRemote()) {
          if (video.srcObject !== this.stream.getMediaStream()) {
            video.srcObject = this.stream.getMediaStream();
          }
        } // If the video element is already part of this StreamManager do nothing


        for (var _i = 0, _a = this.videos; _i < _a.length; _i++) {
          var v = _a[_i];

          if (v.video === video) {
            return 0;
          }
        }

        var returnNumber = 1;

        for (var _b = 0, _c = this.stream.session.streamManagers; _b < _c.length; _b++) {
          var streamManager = _c[_b];

          if (streamManager.disassociateVideo(video)) {
            returnNumber = -1;
            break;
          }
        }

        this.stream.session.streamManagers.forEach(function (streamManager) {
          streamManager.disassociateVideo(video);
        });
        this.pushNewStreamManagerVideo({
          video: video,
          id: video.id,
          canplayListenerAdded: false
        });
        logger.info('New video element associated to ', this);
        return returnNumber;
      };
      /**
       * Creates a new video element displaying this [[stream]]. This allows you to have multiple video elements displaying the same media stream.
       *
       * #### Events dispatched
       *
       * The Publisher/Subscriber object will dispatch a `videoElementCreated` event once the HTML video element has been added to DOM. See [[VideoElementEvent]]
       *
       * @param targetElement HTML DOM element (or its `id` attribute) in which the video element of the Publisher/Subscriber will be inserted
       * @param insertMode How the video element will be inserted accordingly to `targetElemet`
       *
       * @returns The created HTMLVideoElement
       */


      StreamManager.prototype.createVideoElement = function (targetElement, insertMode) {
        var targEl;

        if (typeof targetElement === 'string') {
          targEl = document.getElementById(targetElement);

          if (!targEl) {
            throw new Error("The provided 'targetElement' couldn't be resolved to any HTML element: " + targetElement);
          }
        } else if (targetElement instanceof HTMLElement) {
          targEl = targetElement;
        } else {
          throw new Error("The provided 'targetElement' couldn't be resolved to any HTML element: " + targetElement);
        }

        var video = this.createVideo();
        this.initializeVideoProperties(video);
        var insMode = !!insertMode ? insertMode : VideoInsertMode_1.VideoInsertMode.APPEND;

        switch (insMode) {
          case VideoInsertMode_1.VideoInsertMode.AFTER:
            targEl.parentNode.insertBefore(video, targEl.nextSibling);
            break;

          case VideoInsertMode_1.VideoInsertMode.APPEND:
            targEl.appendChild(video);
            break;

          case VideoInsertMode_1.VideoInsertMode.BEFORE:
            targEl.parentNode.insertBefore(video, targEl);
            break;

          case VideoInsertMode_1.VideoInsertMode.PREPEND:
            targEl.insertBefore(video, targEl.childNodes[0]);
            break;

          case VideoInsertMode_1.VideoInsertMode.REPLACE:
            targEl.parentNode.replaceChild(video, targEl);
            break;

          default:
            insMode = VideoInsertMode_1.VideoInsertMode.APPEND;
            targEl.appendChild(video);
            break;
        }

        var v = {
          targetElement: targEl,
          video: video,
          insertMode: insMode,
          id: video.id,
          canplayListenerAdded: false
        };
        this.pushNewStreamManagerVideo(v);
        this.ee.emitEvent('videoElementCreated', [new VideoElementEvent_1.VideoElementEvent(v.video, this, 'videoElementCreated')]);
        this.lazyLaunchVideoElementCreatedEvent = !!this.firstVideoElement;
        return video;
      };
      /**
       * Updates the current configuration for the [[PublisherSpeakingEvent]] feature and the [StreamManagerEvent.streamAudioVolumeChange](/en/stable/api/openvidu-browser/classes/streammanagerevent.html) feature for this specific
       * StreamManager audio stream, overriding the global options set with [[OpenVidu.setAdvancedConfiguration]]. This way you can customize the audio events options
       * for each specific StreamManager and change them dynamically.
       *
       * @param publisherSpeakingEventsOptions New options to be applied to this StreamManager's audio stream. It is an object which includes the following optional properties:
       * - `interval`: (number) how frequently the analyser polls the audio stream to check if speaking has started/stopped or audio volume has changed. Default **100** (ms)
       * - `threshold`: (number) the volume at which _publisherStartSpeaking_, _publisherStopSpeaking_ events will be fired. Default **-50** (dB)
       */


      StreamManager.prototype.updatePublisherSpeakingEventsOptions = function (publisherSpeakingEventsOptions) {
        var currentHarkOptions = !!this.stream.harkOptions ? this.stream.harkOptions : this.stream.session.openvidu.advancedConfiguration.publisherSpeakingEventsOptions || {};
        var newInterval = typeof publisherSpeakingEventsOptions.interval === 'number' ? publisherSpeakingEventsOptions.interval : typeof currentHarkOptions.interval === 'number' ? currentHarkOptions.interval : 100;
        var newThreshold = typeof publisherSpeakingEventsOptions.threshold === 'number' ? publisherSpeakingEventsOptions.threshold : typeof currentHarkOptions.threshold === 'number' ? currentHarkOptions.threshold : -50;
        this.stream.harkOptions = {
          interval: newInterval,
          threshold: newThreshold
        };

        if (!!this.stream.speechEvent) {
          this.stream.speechEvent.setInterval(newInterval);
          this.stream.speechEvent.setThreshold(newThreshold);
        }
      };
      /* Hidden methods */

      /**
       * @hidden
       */


      StreamManager.prototype.initializeVideoProperties = function (video) {
        if (!(this.stream.isLocal() && this.stream.displayMyRemote())) {
          // Avoid setting the MediaStream into the srcObject if remote subscription before publishing
          if (video.srcObject !== this.stream.getMediaStream()) {
            // If srcObject already set don't do it again
            video.srcObject = this.stream.getMediaStream();
          }
        }

        video.autoplay = true;
        video.controls = false;

        if (platform.name === 'Safari') {
          video.setAttribute('playsinline', 'true');
        }

        if (!video.id) {
          video.id = (this.remote ? 'remote-' : 'local-') + 'video-' + this.stream.streamId; // DEPRECATED property: assign once the property id if the user provided a valid targetElement

          if (!this.id && !!this.targetElement) {
            this.id = video.id;
          }
        }

        if (!this.remote && !this.stream.displayMyRemote()) {
          video.muted = true;

          if (video.style.transform === 'rotateY(180deg)' && !this.stream.outboundStreamOpts.publisherProperties.mirror) {
            // If the video was already rotated and now is set to not mirror
            this.removeMirrorVideo(video);
          } else if (this.stream.outboundStreamOpts.publisherProperties.mirror && !this.stream.isSendScreen()) {
            this.mirrorVideo(video);
          }
        }
      };
      /**
       * @hidden
       */


      StreamManager.prototype.removeAllVideos = function () {
        var _this = this;

        for (var i = this.stream.session.streamManagers.length - 1; i >= 0; --i) {
          if (this.stream.session.streamManagers[i] === this) {
            this.stream.session.streamManagers.splice(i, 1);
          }
        }

        this.videos.forEach(function (streamManagerVideo) {
          // Remove oncanplay event listener (only OpenVidu browser listener, not the user ones)
          if (!!streamManagerVideo.video && !!streamManagerVideo.video.removeEventListener) {
            streamManagerVideo.video.removeEventListener('canplay', _this.canPlayListener);
          }

          streamManagerVideo.canplayListenerAdded = false;

          if (!!streamManagerVideo.targetElement) {
            // Only remove from DOM videos created by OpenVidu Browser (those generated by passing a valid targetElement in OpenVidu.initPublisher
            // and Session.subscribe or those created by StreamManager.createVideoElement). All this videos triggered a videoElementCreated event
            streamManagerVideo.video.parentNode.removeChild(streamManagerVideo.video);

            _this.ee.emitEvent('videoElementDestroyed', [new VideoElementEvent_1.VideoElementEvent(streamManagerVideo.video, _this, 'videoElementDestroyed')]);
          } // Remove srcObject from the video


          _this.removeSrcObject(streamManagerVideo); // Remove from collection of videos every video managed by OpenVidu Browser


          _this.videos.filter(function (v) {
            return !v.targetElement;
          });
        });
      };
      /**
       * @hidden
       */


      StreamManager.prototype.disassociateVideo = function (video) {
        var disassociated = false;

        for (var i = 0; i < this.videos.length; i++) {
          if (this.videos[i].video === video) {
            this.videos[i].video.removeEventListener('canplay', this.canPlayListener);
            this.videos.splice(i, 1);
            disassociated = true;
            logger.info('Video element disassociated from ', this);
            break;
          }
        }

        return disassociated;
      };
      /**
       * @hidden
       */


      StreamManager.prototype.addPlayEventToFirstVideo = function () {
        if (!!this.videos[0] && !!this.videos[0].video && !this.videos[0].canplayListenerAdded) {
          this.videos[0].video.addEventListener('canplay', this.canPlayListener);
          this.videos[0].canplayListenerAdded = true;
        }
      };
      /**
       * @hidden
       */


      StreamManager.prototype.updateMediaStream = function (mediaStream) {
        this.videos.forEach(function (streamManagerVideo) {
          streamManagerVideo.video.srcObject = mediaStream;

          if (platform['isIonicIos']) {
            // iOS Ionic. LIMITATION: must reinsert the video in the DOM for
            // the media stream to be updated
            var vParent = streamManagerVideo.video.parentElement;
            var newVideo = streamManagerVideo.video;
            vParent.replaceChild(newVideo, streamManagerVideo.video);
            streamManagerVideo.video = newVideo;
          }
        });
      };
      /**
       * @hidden
       */


      StreamManager.prototype.emitEvent = function (type, eventArray) {
        this.ee.emitEvent(type, eventArray);
      };
      /**
      * @hidden
      */


      StreamManager.prototype.createVideo = function () {
        return document.createElement('video');
      };
      /**
       * @hidden
       */


      StreamManager.prototype.removeSrcObject = function (streamManagerVideo) {
        streamManagerVideo.video.srcObject = null;
      };
      /* Private methods */


      StreamManager.prototype.pushNewStreamManagerVideo = function (streamManagerVideo) {
        this.videos.push(streamManagerVideo);
        this.addPlayEventToFirstVideo();

        if (this.stream.session.streamManagers.indexOf(this) === -1) {
          this.stream.session.streamManagers.push(this);
        }
      };

      StreamManager.prototype.mirrorVideo = function (video) {
        if (!platform['isIonicIos']) {
          video.style.transform = 'rotateY(180deg)';
          video.style.webkitTransform = 'rotateY(180deg)';
        }
      };

      StreamManager.prototype.removeMirrorVideo = function (video) {
        video.style.transform = 'unset';
        video.style.webkitTransform = 'unset';
      };

      return StreamManager;
    }(EventDispatcher_1.EventDispatcher);

    exports.StreamManager = StreamManager; //# sourceMappingURL=StreamManager.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenVidu/Subscriber.js":
  /*!******************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenVidu/Subscriber.js ***!
    \******************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduSubscriberJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    var __extends = this && this.__extends || function () {
      var _extendStatics5 = function extendStatics(d, b) {
        _extendStatics5 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics5(d, b);
      };

      return function (d, b) {
        _extendStatics5(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    exports.__esModule = true;

    var StreamManager_1 = __webpack_require__(
    /*! ./StreamManager */
    "./node_modules/openvidu-browser/lib/OpenVidu/StreamManager.js");

    var OpenViduLogger_1 = __webpack_require__(
    /*! ../OpenViduInternal/Logger/OpenViduLogger */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js");
    /**
     * @hidden
     */


    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    /**
     * Packs remote media streams. Participants automatically receive them when others publish their streams. Initialized with [[Session.subscribe]] method
     */

    var Subscriber =
    /** @class */
    function (_super) {
      __extends(Subscriber, _super);
      /**
       * @hidden
       */


      function Subscriber(stream, targEl, properties) {
        var _this = _super.call(this, stream, targEl) || this;

        _this.element = _this.targetElement;
        _this.stream = stream;
        _this.properties = properties;
        return _this;
      }
      /**
       * Subscribe or unsubscribe from the audio stream (if available). Calling this method twice in a row passing same value will have no effect
       * @param value `true` to subscribe to the audio stream, `false` to unsubscribe from it
       */


      Subscriber.prototype.subscribeToAudio = function (value) {
        this.stream.getMediaStream().getAudioTracks().forEach(function (track) {
          track.enabled = value;
        });
        this.stream.audioActive = value;
        logger.info("'Subscriber' has " + (value ? 'subscribed to' : 'unsubscribed from') + ' its audio stream');
        return this;
      };
      /**
       * Subscribe or unsubscribe from the video stream (if available). Calling this method twice in a row passing same value will have no effect
       * @param value `true` to subscribe to the video stream, `false` to unsubscribe from it
       */


      Subscriber.prototype.subscribeToVideo = function (value) {
        this.stream.getMediaStream().getVideoTracks().forEach(function (track) {
          track.enabled = value;
        });
        this.stream.videoActive = value;
        logger.info("'Subscriber' has " + (value ? 'subscribed to' : 'unsubscribed from') + ' its video stream');
        return this;
      };

      return Subscriber;
    }(StreamManager_1.StreamManager);

    exports.Subscriber = Subscriber; //# sourceMappingURL=Subscriber.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/LocalRecorderState.js":
  /*!****************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/LocalRecorderState.js ***!
    \****************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalEnumsLocalRecorderStateJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    exports.__esModule = true;
    var LocalRecorderState;

    (function (LocalRecorderState) {
      LocalRecorderState["READY"] = "READY";
      LocalRecorderState["RECORDING"] = "RECORDING";
      LocalRecorderState["PAUSED"] = "PAUSED";
      LocalRecorderState["FINISHED"] = "FINISHED";
    })(LocalRecorderState = exports.LocalRecorderState || (exports.LocalRecorderState = {})); //# sourceMappingURL=LocalRecorderState.js.map

    /***/

  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/OpenViduError.js":
  /*!***********************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/OpenViduError.js ***!
    \***********************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalEnumsOpenViduErrorJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    exports.__esModule = true;
    /**
     * Defines property [[OpenViduError.name]]
     */

    var OpenViduErrorName;

    (function (OpenViduErrorName) {
      /**
       * Browser is not supported by OpenVidu.
       * Returned upon unsuccessful [[Session.connect]]
       */
      OpenViduErrorName["BROWSER_NOT_SUPPORTED"] = "BROWSER_NOT_SUPPORTED";
      /**
       * The user hasn't granted permissions to the required input device when the browser asked for them.
       * Returned upon unsuccessful [[OpenVidu.initPublisher]] or [[OpenVidu.getUserMedia]]
       */

      OpenViduErrorName["DEVICE_ACCESS_DENIED"] = "DEVICE_ACCESS_DENIED";
      /**
       * The required input device is probably being used by other process when the browser asked for it.
       * This error can also be triggered when the user granted permission to use the devices but a hardware
       * error occurred at the OS, browser or web page level, which prevented access to the device.
       * Returned upon unsuccessful [[OpenVidu.initPublisher]] or [[OpenVidu.getUserMedia]]
       */

      OpenViduErrorName["DEVICE_ALREADY_IN_USE"] = "DEVICE_ALREADY_IN_USE";
      /**
       * The user hasn't granted permissions to capture some desktop screen when the browser asked for them.
       * Returned upon unsuccessful [[OpenVidu.initPublisher]] or [[OpenVidu.getUserMedia]]
       */

      OpenViduErrorName["SCREEN_CAPTURE_DENIED"] = "SCREEN_CAPTURE_DENIED";
      /**
       * Browser does not support screen sharing.
       * Returned upon unsuccessful [[OpenVidu.initPublisher]] or [[OpenVidu.getUserMedia]]
       */

      OpenViduErrorName["SCREEN_SHARING_NOT_SUPPORTED"] = "SCREEN_SHARING_NOT_SUPPORTED";
      /**
       * Only for Chrome, there's no screen sharing extension installed
       * Returned upon unsuccessful [[OpenVidu.initPublisher]] or [[OpenVidu.getUserMedia]]
       */

      OpenViduErrorName["SCREEN_EXTENSION_NOT_INSTALLED"] = "SCREEN_EXTENSION_NOT_INSTALLED";
      /**
       * Only for Chrome, the screen sharing extension is installed but is disabled
       * Returned upon unsuccessful [[OpenVidu.initPublisher]] or [[OpenVidu.getUserMedia]]
       */

      OpenViduErrorName["SCREEN_EXTENSION_DISABLED"] = "SCREEN_EXTENSION_DISABLED";
      /**
       * No video input device found with the provided deviceId (property [[PublisherProperties.videoSource]])
       * Returned upon unsuccessful [[OpenVidu.initPublisher]] or [[OpenVidu.getUserMedia]]
       */

      OpenViduErrorName["INPUT_VIDEO_DEVICE_NOT_FOUND"] = "INPUT_VIDEO_DEVICE_NOT_FOUND";
      /**
       * No audio input device found with the provided deviceId (property [[PublisherProperties.audioSource]])
       * Returned upon unsuccessful [[OpenVidu.initPublisher]] or [[OpenVidu.getUserMedia]]
       */

      OpenViduErrorName["INPUT_AUDIO_DEVICE_NOT_FOUND"] = "INPUT_AUDIO_DEVICE_NOT_FOUND";
      /**
       * There was an unknown error when trying to access the specified audio device
       * Returned upon unsuccessful [[OpenVidu.initPublisher]] or [[OpenVidu.getUserMedia]]
       */

      OpenViduErrorName["INPUT_AUDIO_DEVICE_GENERIC_ERROR"] = "INPUT_AUDIO_DEVICE_GENERIC_ERROR";
      /**
       * Method [[OpenVidu.initPublisher]] or  [[OpenVidu.getUserMedia]] has been called with properties `videoSource` and `audioSource` of
       * [[PublisherProperties]] parameter both set to *false* or *null*
       */

      OpenViduErrorName["NO_INPUT_SOURCE_SET"] = "NO_INPUT_SOURCE_SET";
      /**
       * Some media property of [[PublisherProperties]] such as `frameRate` or `resolution` is not supported
       * by the input devices (whenever it is possible they are automatically adjusted to the most similar value).
       * Returned upon unsuccessful [[OpenVidu.initPublisher]] or [[OpenVidu.getUserMedia]]
       */

      OpenViduErrorName["PUBLISHER_PROPERTIES_ERROR"] = "PUBLISHER_PROPERTIES_ERROR";
      /**
       * The client tried to call a method without the required permissions. This can occur for methods [[Session.publish]],
       * [[Session.forceUnpublish]], [[Session.forceDisconnect]], [[Stream.applyFilter]], [[Stream.removeFilter]]
       */

      OpenViduErrorName["OPENVIDU_PERMISSION_DENIED"] = "OPENVIDU_PERMISSION_DENIED";
      /**
       * _Not in use yet_
       */

      OpenViduErrorName["OPENVIDU_NOT_CONNECTED"] = "OPENVIDU_NOT_CONNECTED";
      /**
       * _Not in use yet_
       */

      OpenViduErrorName["GENERIC_ERROR"] = "GENERIC_ERROR";
    })(OpenViduErrorName = exports.OpenViduErrorName || (exports.OpenViduErrorName = {}));
    /**
     * Simple object to identify runtime errors on the client side
     */


    var OpenViduError =
    /** @class */
    function () {
      /**
       * @hidden
       */
      function OpenViduError(name, message) {
        this.name = name;
        this.message = message;
      }

      return OpenViduError;
    }();

    exports.OpenViduError = OpenViduError; //# sourceMappingURL=OpenViduError.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/VideoInsertMode.js":
  /*!*************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/VideoInsertMode.js ***!
    \*************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalEnumsVideoInsertModeJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    exports.__esModule = true;
    /**
     * How the video will be inserted in the DOM for Publishers and Subscribers. See [[PublisherProperties.insertMode]] and [[SubscriberProperties.insertMode]]
     */

    var VideoInsertMode;

    (function (VideoInsertMode) {
      /**
       * Video inserted after the target element (as next sibling)
       */
      VideoInsertMode["AFTER"] = "AFTER";
      /**
       * Video inserted as last child of the target element
       */

      VideoInsertMode["APPEND"] = "APPEND";
      /**
       * Video inserted before the target element (as previous sibling)
       */

      VideoInsertMode["BEFORE"] = "BEFORE";
      /**
       * Video inserted as first child of the target element
       */

      VideoInsertMode["PREPEND"] = "PREPEND";
      /**
       * Video replaces target element
       */

      VideoInsertMode["REPLACE"] = "REPLACE";
    })(VideoInsertMode = exports.VideoInsertMode || (exports.VideoInsertMode = {})); //# sourceMappingURL=VideoInsertMode.js.map

    /***/

  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/ConnectionEvent.js":
  /*!**************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/Events/ConnectionEvent.js ***!
    \**************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalEventsConnectionEventJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    var __extends = this && this.__extends || function () {
      var _extendStatics6 = function extendStatics(d, b) {
        _extendStatics6 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics6(d, b);
      };

      return function (d, b) {
        _extendStatics6(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    exports.__esModule = true;

    var Event_1 = __webpack_require__(
    /*! ./Event */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/Event.js");
    /**
     * Defines the following events:
     * - `connectionCreated`: dispatched by [[Session]] after a new user has connected to the session
     * - `connectionDestroyed`: dispatched by [[Session]] after a new user has left the session
     */


    var ConnectionEvent =
    /** @class */
    function (_super) {
      __extends(ConnectionEvent, _super);
      /**
       * @hidden
       */


      function ConnectionEvent(cancelable, target, type, connection, reason) {
        var _this = _super.call(this, cancelable, target, type) || this;

        _this.connection = connection;
        _this.reason = reason;
        return _this;
      }
      /**
       * @hidden
       */
      // tslint:disable-next-line:no-empty


      ConnectionEvent.prototype.callDefaultBehavior = function () {};

      return ConnectionEvent;
    }(Event_1.Event);

    exports.ConnectionEvent = ConnectionEvent; //# sourceMappingURL=ConnectionEvent.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/Event.js":
  /*!****************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/Events/Event.js ***!
    \****************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalEventsEventJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    exports.__esModule = true;

    var Event =
    /** @class */
    function () {
      /**
       * @hidden
       */
      function Event(cancelable, target, type) {
        /**
         * @hidden
         */
        this.hasBeenPrevented = false;
        this.cancelable = cancelable;
        this.target = target;
        this.type = type;
      }
      /**
       * Whether the default beahivour of the event has been prevented or not. Call [[Event.preventDefault]] to prevent it
       */


      Event.prototype.isDefaultPrevented = function () {
        return this.hasBeenPrevented;
      };
      /**
       * Prevents the default behavior of the event. The following events have a default behavior:
       *
       * - `sessionDisconnected`: dispatched by [[Session]] object, automatically unsubscribes the leaving participant from every Subscriber object of the session (this includes closing the WebRTCPeer connection and disposing all MediaStreamTracks)
       * and also deletes any HTML video element associated to each Subscriber (only those created by OpenVidu Browser, either by passing a valid parameter as `targetElement` in method [[Session.subscribe]] or
       * by calling [[Subscriber.createVideoElement]]). For every video removed, each Subscriber object will also dispatch a `videoElementDestroyed` event.
       *
       * - `streamDestroyed`:
       *   - If dispatched by a [[Publisher]] (*you* have unpublished): automatically stops all media tracks and deletes any HTML video element associated to it (only those created by OpenVidu Browser, either by passing a valid parameter as `targetElement`
       * in method [[OpenVidu.initPublisher]] or by calling [[Publisher.createVideoElement]]). For every video removed, the Publisher object will also dispatch a `videoElementDestroyed` event.
       *   - If dispatched by [[Session]] (*other user* has unpublished): automatically unsubscribes the proper Subscriber object from the session (this includes closing the WebRTCPeer connection and disposing all MediaStreamTracks)
       * and also deletes any HTML video element associated to that Subscriber (only those created by OpenVidu Browser, either by passing a valid parameter as `targetElement` in method [[Session.subscribe]] or
       * by calling [[Subscriber.createVideoElement]]). For every video removed, the Subscriber object will also dispatch a `videoElementDestroyed` event.
       */


      Event.prototype.preventDefault = function () {
        // tslint:disable-next-line:no-empty
        this.callDefaultBehavior = function () {};

        this.hasBeenPrevented = true;
      };

      return Event;
    }();

    exports.Event = Event; //# sourceMappingURL=Event.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/FilterEvent.js":
  /*!**********************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/Events/FilterEvent.js ***!
    \**********************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalEventsFilterEventJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    var __extends = this && this.__extends || function () {
      var _extendStatics7 = function extendStatics(d, b) {
        _extendStatics7 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics7(d, b);
      };

      return function (d, b) {
        _extendStatics7(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    exports.__esModule = true;

    var Event_1 = __webpack_require__(
    /*! ./Event */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/Event.js");
    /**
     * Defines every event dispatched by audio/video stream filters. You can subscribe to filter events by calling [[Filter.addEventListener]]
     */


    var FilterEvent =
    /** @class */
    function (_super) {
      __extends(FilterEvent, _super);
      /**
       * @hidden
       */


      function FilterEvent(target, eventType, data) {
        var _this = _super.call(this, false, target, eventType) || this;

        _this.data = data;
        return _this;
      }
      /**
       * @hidden
       */
      // tslint:disable-next-line:no-empty


      FilterEvent.prototype.callDefaultBehavior = function () {};

      return FilterEvent;
    }(Event_1.Event);

    exports.FilterEvent = FilterEvent; //# sourceMappingURL=FilterEvent.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/PublisherSpeakingEvent.js":
  /*!*********************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/Events/PublisherSpeakingEvent.js ***!
    \*********************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalEventsPublisherSpeakingEventJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    var __extends = this && this.__extends || function () {
      var _extendStatics8 = function extendStatics(d, b) {
        _extendStatics8 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics8(d, b);
      };

      return function (d, b) {
        _extendStatics8(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    exports.__esModule = true;

    var Event_1 = __webpack_require__(
    /*! ./Event */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/Event.js");
    /**
     * Defines the following events:
     * - `publisherStartSpeaking`: dispatched by [[Session]] when a remote user has started speaking
     * - `publisherStopSpeaking`: dispatched by [[Session]] when a remote user has stopped speaking
     *
     * More information:
     * - This events will only be triggered for **remote streams that have audio tracks** ([[Stream.hasAudio]] must be true)
     * - You can further configure how the events are dispatched by setting property `publisherSpeakingEventsOptions` in the call of [[OpenVidu.setAdvancedConfiguration]]
     */


    var PublisherSpeakingEvent =
    /** @class */
    function (_super) {
      __extends(PublisherSpeakingEvent, _super);
      /**
       * @hidden
       */


      function PublisherSpeakingEvent(target, type, connection, streamId) {
        var _this = _super.call(this, false, target, type) || this;

        _this.type = type;
        _this.connection = connection;
        _this.streamId = streamId;
        return _this;
      }
      /**
       * @hidden
       */
      // tslint:disable-next-line:no-empty


      PublisherSpeakingEvent.prototype.callDefaultBehavior = function () {};

      return PublisherSpeakingEvent;
    }(Event_1.Event);

    exports.PublisherSpeakingEvent = PublisherSpeakingEvent; //# sourceMappingURL=PublisherSpeakingEvent.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/RecordingEvent.js":
  /*!*************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/Events/RecordingEvent.js ***!
    \*************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalEventsRecordingEventJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    var __extends = this && this.__extends || function () {
      var _extendStatics9 = function extendStatics(d, b) {
        _extendStatics9 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics9(d, b);
      };

      return function (d, b) {
        _extendStatics9(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    exports.__esModule = true;

    var Event_1 = __webpack_require__(
    /*! ./Event */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/Event.js");
    /**
     * Defines the following events:
     * - `recordingStarted`: dispatched by [[Session]] after the session has started being recorded
     * - `recordingStopped`: dispatched by [[Session]] after the session has stopped being recorded
     */


    var RecordingEvent =
    /** @class */
    function (_super) {
      __extends(RecordingEvent, _super);
      /**
       * @hidden
       */


      function RecordingEvent(target, type, id, name, reason) {
        var _this = _super.call(this, false, target, type) || this;

        _this.id = id;

        if (name !== id) {
          _this.name = name;
        }

        _this.reason = reason;
        return _this;
      }
      /**
       * @hidden
       */
      // tslint:disable-next-line:no-empty


      RecordingEvent.prototype.callDefaultBehavior = function () {};

      return RecordingEvent;
    }(Event_1.Event);

    exports.RecordingEvent = RecordingEvent; //# sourceMappingURL=RecordingEvent.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/SessionDisconnectedEvent.js":
  /*!***********************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/Events/SessionDisconnectedEvent.js ***!
    \***********************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalEventsSessionDisconnectedEventJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    var __extends = this && this.__extends || function () {
      var _extendStatics10 = function extendStatics(d, b) {
        _extendStatics10 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics10(d, b);
      };

      return function (d, b) {
        _extendStatics10(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    exports.__esModule = true;

    var Event_1 = __webpack_require__(
    /*! ./Event */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/Event.js");

    var OpenViduLogger_1 = __webpack_require__(
    /*! ../Logger/OpenViduLogger */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js");
    /**
     * @hidden
     */


    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    /**
     * Defines event `sessionDisconnected` dispatched by [[Session]] after the local user has left the session. This is the local version of the `connectionDestroyed` event, which is only dispatched by remote users
     */

    var SessionDisconnectedEvent =
    /** @class */
    function (_super) {
      __extends(SessionDisconnectedEvent, _super);
      /**
       * @hidden
       */


      function SessionDisconnectedEvent(target, reason) {
        var _this = _super.call(this, true, target, 'sessionDisconnected') || this;

        _this.reason = reason;
        return _this;
      }
      /**
       * @hidden
       */


      SessionDisconnectedEvent.prototype.callDefaultBehavior = function () {
        logger.info("Calling default behavior upon '" + this.type + "' event dispatched by 'Session'");
        var session = this.target; // Dispose and delete all remote Connections

        for (var connectionId in session.remoteConnections) {
          if (!!session.remoteConnections[connectionId].stream) {
            session.remoteConnections[connectionId].stream.disposeWebRtcPeer();
            session.remoteConnections[connectionId].stream.disposeMediaStream();

            if (session.remoteConnections[connectionId].stream.streamManager) {
              session.remoteConnections[connectionId].stream.streamManager.removeAllVideos();
            }

            delete session.remoteStreamsCreated[session.remoteConnections[connectionId].stream.streamId];
            session.remoteConnections[connectionId].dispose();
          }

          delete session.remoteConnections[connectionId];
        }
      };

      return SessionDisconnectedEvent;
    }(Event_1.Event);

    exports.SessionDisconnectedEvent = SessionDisconnectedEvent; //# sourceMappingURL=SessionDisconnectedEvent.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/SignalEvent.js":
  /*!**********************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/Events/SignalEvent.js ***!
    \**********************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalEventsSignalEventJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    var __extends = this && this.__extends || function () {
      var _extendStatics11 = function extendStatics(d, b) {
        _extendStatics11 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics11(d, b);
      };

      return function (d, b) {
        _extendStatics11(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    exports.__esModule = true;

    var Event_1 = __webpack_require__(
    /*! ./Event */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/Event.js");
    /**
     * Defines the following events:
     * - `signal`: dispatched by [[Session]] when a signal is received
     * - `signal:TYPE`: dispatched by [[Session]] when a signal of type TYPE is received
     */


    var SignalEvent =
    /** @class */
    function (_super) {
      __extends(SignalEvent, _super);
      /**
       * @hidden
       */


      function SignalEvent(target, type, data, from) {
        var _this = _super.call(this, false, target, 'signal') || this;

        if (!!type) {
          _this.type = 'signal:' + type;
        }

        _this.data = data;
        _this.from = from;
        return _this;
      }
      /**
       * @hidden
       */
      // tslint:disable-next-line:no-empty


      SignalEvent.prototype.callDefaultBehavior = function () {};

      return SignalEvent;
    }(Event_1.Event);

    exports.SignalEvent = SignalEvent; //# sourceMappingURL=SignalEvent.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamEvent.js":
  /*!**********************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamEvent.js ***!
    \**********************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalEventsStreamEventJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    var __extends = this && this.__extends || function () {
      var _extendStatics12 = function extendStatics(d, b) {
        _extendStatics12 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics12(d, b);
      };

      return function (d, b) {
        _extendStatics12(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    exports.__esModule = true;

    var Event_1 = __webpack_require__(
    /*! ./Event */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/Event.js");

    var Publisher_1 = __webpack_require__(
    /*! ../../OpenVidu/Publisher */
    "./node_modules/openvidu-browser/lib/OpenVidu/Publisher.js");

    var Session_1 = __webpack_require__(
    /*! ../../OpenVidu/Session */
    "./node_modules/openvidu-browser/lib/OpenVidu/Session.js");

    var OpenViduLogger_1 = __webpack_require__(
    /*! ../Logger/OpenViduLogger */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js");
    /**
     * @hidden
     */


    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();
    /**
     * Defines the following events:
     * - `streamCreated`: dispatched by [[Session]] and [[Publisher]] after some user has started publishing to the session
     * - `streamDestroyed`: dispatched by [[Session]] and [[Publisher]] after some user has stopped publishing to the session
     */

    var StreamEvent =
    /** @class */
    function (_super) {
      __extends(StreamEvent, _super);
      /**
       * @hidden
       */


      function StreamEvent(cancelable, target, type, stream, reason) {
        var _this = _super.call(this, cancelable, target, type) || this;

        _this.stream = stream;
        _this.reason = reason;
        return _this;
      }
      /**
       * @hidden
       */


      StreamEvent.prototype.callDefaultBehavior = function () {
        if (this.type === 'streamDestroyed') {
          if (this.target instanceof Session_1.Session) {
            // Remote Stream
            logger.info("Calling default behavior upon '" + this.type + "' event dispatched by 'Session'");
            this.stream.disposeWebRtcPeer();
          } else if (this.target instanceof Publisher_1.Publisher) {
            // Local Stream
            logger.info("Calling default behavior upon '" + this.type + "' event dispatched by 'Publisher'");
            clearInterval(this.target.screenShareResizeInterval);
            this.stream.isLocalStreamReadyToPublish = false; // Delete Publisher object from OpenVidu publishers array

            var openviduPublishers = this.target.openvidu.publishers;

            for (var i = 0; i < openviduPublishers.length; i++) {
              if (openviduPublishers[i] === this.target) {
                openviduPublishers.splice(i, 1);
                break;
              }
            }
          } // Dispose the MediaStream local object


          this.stream.disposeMediaStream(); // Remove from DOM all video elements associated to this Stream, if there's a StreamManager defined
          // (method Session.subscribe must have been called)

          if (this.stream.streamManager) this.stream.streamManager.removeAllVideos(); // Delete stream from Session.remoteStreamsCreated map

          delete this.stream.session.remoteStreamsCreated[this.stream.streamId]; // Delete StreamOptionsServer from remote Connection

          var remoteConnection = this.stream.session.remoteConnections[this.stream.connection.connectionId];

          if (!!remoteConnection && !!remoteConnection.options) {
            var streamOptionsServer = remoteConnection.options.streams;

            for (var i = streamOptionsServer.length - 1; i >= 0; --i) {
              if (streamOptionsServer[i].id === this.stream.streamId) {
                streamOptionsServer.splice(i, 1);
              }
            }
          }
        }
      };

      return StreamEvent;
    }(Event_1.Event);

    exports.StreamEvent = StreamEvent; //# sourceMappingURL=StreamEvent.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamManagerEvent.js":
  /*!*****************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamManagerEvent.js ***!
    \*****************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalEventsStreamManagerEventJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    var __extends = this && this.__extends || function () {
      var _extendStatics13 = function extendStatics(d, b) {
        _extendStatics13 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics13(d, b);
      };

      return function (d, b) {
        _extendStatics13(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    exports.__esModule = true;

    var Event_1 = __webpack_require__(
    /*! ./Event */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/Event.js");
    /**
     * Defines the following events:
     * - `streamPlaying`: dispatched by [[StreamManager]] ([[Publisher]] and [[Subscriber]]) whenever its media stream starts playing (one of its videos has media
     * and has begun to play). This event will be dispatched when these 3 conditions are met 1) The StreamManager has no video associated in the DOM 2) It is associated to one video 3) That video starts playing
     * - `streamAudioVolumeChange`: dispatched by [[StreamManager]] ([[Publisher]] and [[Subscriber]]) when the volume of its Stream's audio track
     * changes. Only applies if [[Stream.hasAudio]] is `true`. The frequency this event is fired with is defined by property `interval` of
     * [[OpenViduAdvancedConfiguration.publisherSpeakingEventsOptions]] (default 100ms)
     */


    var StreamManagerEvent =
    /** @class */
    function (_super) {
      __extends(StreamManagerEvent, _super);
      /**
       * @hidden
       */


      function StreamManagerEvent(target, type, value) {
        var _this = _super.call(this, false, target, type) || this;

        _this.value = value;
        return _this;
      }
      /**
       * @hidden
       */
      // tslint:disable-next-line:no-empty


      StreamManagerEvent.prototype.callDefaultBehavior = function () {};

      return StreamManagerEvent;
    }(Event_1.Event);

    exports.StreamManagerEvent = StreamManagerEvent; //# sourceMappingURL=StreamManagerEvent.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamPropertyChangedEvent.js":
  /*!*************************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamPropertyChangedEvent.js ***!
    \*************************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalEventsStreamPropertyChangedEventJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    var __extends = this && this.__extends || function () {
      var _extendStatics14 = function extendStatics(d, b) {
        _extendStatics14 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics14(d, b);
      };

      return function (d, b) {
        _extendStatics14(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    exports.__esModule = true;

    var Event_1 = __webpack_require__(
    /*! ./Event */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/Event.js");
    /**
     * Defines event `streamPropertyChanged` dispatched by [[Session]] as well as by [[StreamManager]] ([[Publisher]] and [[Subscriber]]).
     * This event is fired when any remote stream (owned by a Subscriber) or local stream (owned by a Publisher) undergoes
     * any change in any of its mutable properties (see [[changedProperty]]).
     */


    var StreamPropertyChangedEvent =
    /** @class */
    function (_super) {
      __extends(StreamPropertyChangedEvent, _super);
      /**
       * @hidden
       */


      function StreamPropertyChangedEvent(target, stream, changedProperty, newValue, oldValue, reason) {
        var _this = _super.call(this, false, target, 'streamPropertyChanged') || this;

        _this.stream = stream;
        _this.changedProperty = changedProperty;
        _this.newValue = newValue;
        _this.oldValue = oldValue;
        _this.reason = reason;
        return _this;
      }
      /**
       * @hidden
       */
      // tslint:disable-next-line:no-empty


      StreamPropertyChangedEvent.prototype.callDefaultBehavior = function () {};

      return StreamPropertyChangedEvent;
    }(Event_1.Event);

    exports.StreamPropertyChangedEvent = StreamPropertyChangedEvent; //# sourceMappingURL=StreamPropertyChangedEvent.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/VideoElementEvent.js":
  /*!****************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/Events/VideoElementEvent.js ***!
    \****************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalEventsVideoElementEventJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    var __extends = this && this.__extends || function () {
      var _extendStatics15 = function extendStatics(d, b) {
        _extendStatics15 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics15(d, b);
      };

      return function (d, b) {
        _extendStatics15(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    exports.__esModule = true;

    var Event_1 = __webpack_require__(
    /*! ./Event */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/Event.js");
    /**
     * Defines the following events:
     * - `videoElementCreated`: dispatched by [[Publisher]] and [[Subscriber]] whenever a new HTML video element has been inserted into DOM by OpenVidu Browser library. See
     * [Manage video players](/en/stable/cheatsheet/manage-videos) section.
     * - `videoElementDestroyed`: dispatched by [[Publisher]] and [[Subscriber]] whenever an HTML video element has been removed from DOM by OpenVidu Browser library.
     */


    var VideoElementEvent =
    /** @class */
    function (_super) {
      __extends(VideoElementEvent, _super);
      /**
       * @hidden
       */


      function VideoElementEvent(element, target, type) {
        var _this = _super.call(this, false, target, type) || this;

        _this.element = element;
        return _this;
      }
      /**
       * @hidden
       */
      // tslint:disable-next-line:no-empty


      VideoElementEvent.prototype.callDefaultBehavior = function () {};

      return VideoElementEvent;
    }(Event_1.Event);

    exports.VideoElementEvent = VideoElementEvent; //# sourceMappingURL=VideoElementEvent.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/Mapper.js":
  /*!***************************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/Mapper.js ***!
    \***************************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalKurentoUtilsKurentoJsonrpcMapperJs(module, exports) {
    function Mapper() {
      var sources = {};

      this.forEach = function (callback) {
        for (var key in sources) {
          var source = sources[key];

          for (var key2 in source) {
            callback(source[key2]);
          }
        }

        ;
      };

      this.get = function (id, source) {
        var ids = sources[source];
        if (ids == undefined) return undefined;
        return ids[id];
      };

      this.remove = function (id, source) {
        var ids = sources[source];
        if (ids == undefined) return;
        delete ids[id];

        for (var i in ids) {
          return false;
        }

        delete sources[source];
      };

      this.set = function (value, id, source) {
        if (value == undefined) return this.remove(id, source);
        var ids = sources[source];
        if (ids == undefined) sources[source] = ids = {};
        ids[id] = value;
      };
    }

    ;

    Mapper.prototype.pop = function (id, source) {
      var value = this.get(id, source);
      if (value == undefined) return undefined;
      this.remove(id, source);
      return value;
    };

    module.exports = Mapper; //# sourceMappingURL=Mapper.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/index.js":
  /*!**********************************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/index.js ***!
    \**********************************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalKurentoUtilsKurentoJsonrpcClientsIndexJs(module, exports, __webpack_require__) {
    var JsonRpcClient = __webpack_require__(
    /*! ./jsonrpcclient */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/jsonrpcclient.js");

    exports.JsonRpcClient = JsonRpcClient; //# sourceMappingURL=index.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/jsonrpcclient.js":
  /*!******************************************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/jsonrpcclient.js ***!
    \******************************************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalKurentoUtilsKurentoJsonrpcClientsJsonrpcclientJs(module, exports, __webpack_require__) {
    var RpcBuilder = __webpack_require__(
    /*! ../ */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/index.js");

    var WebSocketWithReconnection = __webpack_require__(
    /*! ./transports/webSocketWithReconnection */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/transports/webSocketWithReconnection.js");

    Date.now = Date.now || function () {
      return +new Date();
    };

    var PING_INTERVAL = 5000;
    var RECONNECTING = 'RECONNECTING';
    var CONNECTED = 'CONNECTED';
    var DISCONNECTED = 'DISCONNECTED';
    var Logger = console;

    function JsonRpcClient(configuration) {
      var self = this;
      var wsConfig = configuration.ws;
      var notReconnectIfNumLessThan = -1;
      var pingNextNum = 0;
      var enabledPings = true;
      var pingPongStarted = false;
      var pingInterval;
      var status = DISCONNECTED;
      var onreconnecting = wsConfig.onreconnecting;
      var onreconnected = wsConfig.onreconnected;
      var onconnected = wsConfig.onconnected;
      var onerror = wsConfig.onerror;

      configuration.rpc.pull = function (params, request) {
        request.reply(null, "push");
      };

      wsConfig.onreconnecting = function () {
        Logger.debug("--------- ONRECONNECTING -----------");

        if (status === RECONNECTING) {
          Logger.error("Websocket already in RECONNECTING state when receiving a new ONRECONNECTING message. Ignoring it");
          return;
        }

        stopPing();
        status = RECONNECTING;

        if (onreconnecting) {
          onreconnecting();
        }
      };

      wsConfig.onreconnected = function () {
        Logger.debug("--------- ONRECONNECTED -----------");

        if (status === CONNECTED) {
          Logger.error("Websocket already in CONNECTED state when receiving a new ONRECONNECTED message. Ignoring it");
          return;
        }

        status = CONNECTED;
        updateNotReconnectIfLessThan();

        if (onreconnected) {
          onreconnected();
        }
      };

      wsConfig.onconnected = function () {
        Logger.debug("--------- ONCONNECTED -----------");

        if (status === CONNECTED) {
          Logger.error("Websocket already in CONNECTED state when receiving a new ONCONNECTED message. Ignoring it");
          return;
        }

        status = CONNECTED;
        enabledPings = true;
        usePing();

        if (onconnected) {
          onconnected();
        }
      };

      wsConfig.onerror = function (error) {
        Logger.debug("--------- ONERROR -----------");
        status = DISCONNECTED;
        stopPing();

        if (onerror) {
          onerror(error);
        }
      };

      var ws = new WebSocketWithReconnection(wsConfig);
      Logger.debug('Connecting websocket to URI: ' + wsConfig.uri);
      var rpcBuilderOptions = {
        request_timeout: configuration.rpc.requestTimeout,
        ping_request_timeout: configuration.rpc.heartbeatRequestTimeout
      };
      var rpc = new RpcBuilder(RpcBuilder.packers.JsonRPC, rpcBuilderOptions, ws, function (request) {
        Logger.debug('Received request: ' + JSON.stringify(request));

        try {
          var func = configuration.rpc[request.method];

          if (func === undefined) {
            Logger.error("Method " + request.method + " not registered in client");
          } else {
            func(request.params, request);
          }
        } catch (err) {
          Logger.error('Exception processing request: ' + JSON.stringify(request));
          Logger.error(err);
        }
      });

      this.send = function (method, params, callback) {
        if (method !== 'ping') {
          Logger.debug('Request: method:' + method + " params:" + JSON.stringify(params));
        }

        var requestTime = Date.now();
        rpc.encode(method, params, function (error, result) {
          if (error) {
            try {
              Logger.error("ERROR:" + error.message + " in Request: method:" + method + " params:" + JSON.stringify(params) + " request:" + error.request);

              if (error.data) {
                Logger.error("ERROR DATA:" + JSON.stringify(error.data));
              }
            } catch (e) {}

            error.requestTime = requestTime;
          }

          if (callback) {
            if (result != undefined && result.value !== 'pong') {
              Logger.debug('Response: ' + JSON.stringify(result));
            }

            callback(error, result);
          }
        });
      };

      function updateNotReconnectIfLessThan() {
        Logger.debug("notReconnectIfNumLessThan = " + pingNextNum + ' (old=' + notReconnectIfNumLessThan + ')');
        notReconnectIfNumLessThan = pingNextNum;
      }

      function sendPing() {
        if (enabledPings) {
          var params = null;

          if (pingNextNum == 0 || pingNextNum == notReconnectIfNumLessThan) {
            params = {
              interval: configuration.heartbeat || PING_INTERVAL
            };
          }

          pingNextNum++;
          self.send('ping', params, function (pingNum) {
            return function (error, result) {
              if (error) {
                Logger.debug("Error in ping request #" + pingNum + " (" + error.message + ")");

                if (pingNum > notReconnectIfNumLessThan) {
                  enabledPings = false;
                  updateNotReconnectIfLessThan();
                  Logger.debug("Server did not respond to ping message #" + pingNum + ". Reconnecting... ");
                  ws.reconnectWs();
                }
              }
            };
          }(pingNextNum));
        } else {
          Logger.debug("Trying to send ping, but ping is not enabled");
        }
      }

      function usePing() {
        if (!pingPongStarted) {
          Logger.debug("Starting ping (if configured)");
          pingPongStarted = true;

          if (configuration.heartbeat != undefined) {
            pingInterval = setInterval(sendPing, configuration.heartbeat);
            sendPing();
          }
        }
      }

      function stopPing() {
        clearInterval(pingInterval);
        pingPongStarted = false;
        enabledPings = false;
        pingNextNum = -1;
        rpc.cancel();
      }

      this.close = function (code, reason) {
        Logger.debug("Closing  with code: " + code + " because: " + reason);

        if (pingInterval != undefined) {
          Logger.debug("Clearing ping interval");
          clearInterval(pingInterval);
        }

        pingPongStarted = false;
        enabledPings = false;

        if (configuration.sendCloseMessage) {
          Logger.debug("Sending close message");
          this.send('closeSession', null, function (error, result) {
            if (error) {
              Logger.error("Error sending close message: " + JSON.stringify(error));
            }

            ws.close(code, reason);
          });
        } else {
          ws.close(code, reason);
        }
      };

      this.forceClose = function (millis) {
        ws.forceClose(millis);
      };

      this.reconnect = function () {
        ws.reconnectWs();
      };

      this.resetPing = function () {
        enabledPings = true;
        pingNextNum = 0;
        usePing();
      };
    }

    module.exports = JsonRpcClient; //# sourceMappingURL=jsonrpcclient.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/transports/index.js":
  /*!*********************************************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/transports/index.js ***!
    \*********************************************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalKurentoUtilsKurentoJsonrpcClientsTransportsIndexJs(module, exports, __webpack_require__) {
    var WebSocketWithReconnection = __webpack_require__(
    /*! ./webSocketWithReconnection */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/transports/webSocketWithReconnection.js");

    exports.WebSocketWithReconnection = WebSocketWithReconnection; //# sourceMappingURL=index.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/transports/webSocketWithReconnection.js":
  /*!*****************************************************************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/transports/webSocketWithReconnection.js ***!
    \*****************************************************************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalKurentoUtilsKurentoJsonrpcClientsTransportsWebSocketWithReconnectionJs(module, exports, __webpack_require__) {
    "use strict";

    var Logger = console;
    var MAX_RETRIES = 2000;
    var RETRY_TIME_MS = 3000;
    var CONNECTING = 0;
    var OPEN = 1;
    var CLOSING = 2;
    var CLOSED = 3;

    function WebSocketWithReconnection(config) {
      var closing = false;
      var registerMessageHandler;
      var wsUri = config.uri;
      var reconnecting = false;
      var ws = new WebSocket(wsUri);

      ws.onopen = function () {
        Logger.debug("WebSocket connected to " + wsUri);

        if (config.onconnected) {
          config.onconnected();
        }
      };

      ws.onerror = function (error) {
        Logger.error("Could not connect to " + wsUri + " (invoking onerror if defined)", error);

        if (config.onerror) {
          config.onerror(error);
        }
      };

      var reconnectionOnClose = function reconnectionOnClose() {
        if (ws.readyState === CLOSED) {
          if (closing) {
            Logger.debug("Connection closed by user");
          } else {
            Logger.debug("Connection closed unexpectecly. Reconnecting...");
            reconnect(MAX_RETRIES, 1);
          }
        } else {
          Logger.debug("Close callback from previous websocket. Ignoring it");
        }
      };

      ws.onclose = reconnectionOnClose;

      function reconnect(maxRetries, numRetries) {
        Logger.debug("reconnect (attempt #" + numRetries + ", max=" + maxRetries + ")");

        if (numRetries === 1) {
          if (reconnecting) {
            Logger.warn("Trying to reconnect when already reconnecting... Ignoring this reconnection.");
            return;
          } else {
            reconnecting = true;
          }

          if (config.onreconnecting) {
            config.onreconnecting();
          }
        }

        reconnectAux(maxRetries, numRetries);
      }

      function reconnectAux(maxRetries, numRetries) {
        Logger.debug("Reconnection attempt #" + numRetries);
        ws.close();
        ws = new WebSocket(wsUri);

        ws.onopen = function () {
          Logger.debug("Reconnected to " + wsUri + " after " + numRetries + " attempts...");
          reconnecting = false;
          registerMessageHandler();

          if (config.onreconnected()) {
            config.onreconnected();
          }

          ws.onclose = reconnectionOnClose;
        };

        ws.onerror = function (error) {
          Logger.warn("Reconnection error: ", error);

          if (numRetries === maxRetries) {
            if (config.ondisconnect) {
              config.ondisconnect();
            }
          } else {
            setTimeout(function () {
              reconnect(maxRetries, numRetries + 1);
            }, RETRY_TIME_MS);
          }
        };
      }

      this.close = function () {
        closing = true;
        ws.close();
      };

      this.reconnectWs = function () {
        Logger.debug("reconnectWs");
        reconnect(MAX_RETRIES, 1);
      };

      this.send = function (message) {
        ws.send(message);
      };

      this.addEventListener = function (type, callback) {
        registerMessageHandler = function registerMessageHandler() {
          ws.addEventListener(type, callback);
        };

        registerMessageHandler();
      };
    }

    module.exports = WebSocketWithReconnection; //# sourceMappingURL=webSocketWithReconnection.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/index.js":
  /*!**************************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/index.js ***!
    \**************************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalKurentoUtilsKurentoJsonrpcIndexJs(module, exports, __webpack_require__) {
    var defineProperty_IE8 = false;

    if (Object.defineProperty) {
      try {
        Object.defineProperty({}, "x", {});
      } catch (e) {
        defineProperty_IE8 = true;
      }
    }

    if (!Function.prototype.bind) {
      Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
          throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function fNOP() {},
            fBound = function fBound() {
          return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
      };
    }

    var EventEmitter = __webpack_require__(
    /*! events */
    "./node_modules/events/events.js").EventEmitter;

    var inherits = __webpack_require__(
    /*! inherits */
    "./node_modules/inherits/inherits_browser.js");

    var packers = __webpack_require__(
    /*! ./packers */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/packers/index.js");

    var Mapper = __webpack_require__(
    /*! ./Mapper */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/Mapper.js");

    var BASE_TIMEOUT = 5000;

    function unifyResponseMethods(responseMethods) {
      if (!responseMethods) return {};

      for (var key in responseMethods) {
        var value = responseMethods[key];
        if (typeof value == 'string') responseMethods[key] = {
          response: value
        };
      }

      ;
      return responseMethods;
    }

    ;

    function unifyTransport(transport) {
      if (!transport) return;
      if (transport instanceof Function) return {
        send: transport
      };
      if (transport.send instanceof Function) return transport;

      if (transport.postMessage instanceof Function) {
        transport.send = transport.postMessage;
        return transport;
      }

      if (transport.write instanceof Function) {
        transport.send = transport.write;
        return transport;
      }

      if (transport.onmessage !== undefined) return;
      if (transport.pause instanceof Function) return;
      throw new SyntaxError("Transport is not a function nor a valid object");
    }

    ;

    function RpcNotification(method, params) {
      if (defineProperty_IE8) {
        this.method = method;
        this.params = params;
      } else {
        Object.defineProperty(this, 'method', {
          value: method,
          enumerable: true
        });
        Object.defineProperty(this, 'params', {
          value: params,
          enumerable: true
        });
      }
    }

    ;

    function RpcBuilder(packer, options, transport, onRequest) {
      var self = this;
      if (!packer) throw new SyntaxError('Packer is not defined');
      if (!packer.pack || !packer.unpack) throw new SyntaxError('Packer is invalid');
      var responseMethods = unifyResponseMethods(packer.responseMethods);

      if (options instanceof Function) {
        if (transport != undefined) throw new SyntaxError("There can't be parameters after onRequest");
        onRequest = options;
        transport = undefined;
        options = undefined;
      }

      ;

      if (options && options.send instanceof Function) {
        if (transport && !(transport instanceof Function)) throw new SyntaxError("Only a function can be after transport");
        onRequest = transport;
        transport = options;
        options = undefined;
      }

      ;

      if (transport instanceof Function) {
        if (onRequest != undefined) throw new SyntaxError("There can't be parameters after onRequest");
        onRequest = transport;
        transport = undefined;
      }

      ;
      if (transport && transport.send instanceof Function) if (onRequest && !(onRequest instanceof Function)) throw new SyntaxError("Only a function can be after transport");
      options = options || {};
      EventEmitter.call(this);
      if (onRequest) this.on('request', onRequest);
      if (defineProperty_IE8) this.peerID = options.peerID;else Object.defineProperty(this, 'peerID', {
        value: options.peerID
      });
      var max_retries = options.max_retries || 0;

      function transportMessage(event) {
        self.decode(event.data || event);
      }

      ;

      this.getTransport = function () {
        return transport;
      };

      this.setTransport = function (value) {
        if (transport) {
          if (transport.removeEventListener) transport.removeEventListener('message', transportMessage);else if (transport.removeListener) transport.removeListener('data', transportMessage);
        }

        ;

        if (value) {
          if (value.addEventListener) value.addEventListener('message', transportMessage);else if (value.addListener) value.addListener('data', transportMessage);
        }

        ;
        transport = unifyTransport(value);
      };

      if (!defineProperty_IE8) Object.defineProperty(this, 'transport', {
        get: this.getTransport.bind(this),
        set: this.setTransport.bind(this)
      });
      this.setTransport(transport);
      var request_timeout = options.request_timeout || BASE_TIMEOUT;
      var ping_request_timeout = options.ping_request_timeout || request_timeout;
      var response_timeout = options.response_timeout || BASE_TIMEOUT;
      var duplicates_timeout = options.duplicates_timeout || BASE_TIMEOUT;
      var requestID = 0;
      var requests = new Mapper();
      var responses = new Mapper();
      var processedResponses = new Mapper();
      var message2Key = {};

      function storeResponse(message, id, dest) {
        var response = {
          message: message,
          timeout: setTimeout(function () {
            responses.remove(id, dest);
          }, response_timeout)
        };
        responses.set(response, id, dest);
      }

      ;

      function storeProcessedResponse(ack, from) {
        var timeout = setTimeout(function () {
          processedResponses.remove(ack, from);
        }, duplicates_timeout);
        processedResponses.set(timeout, ack, from);
      }

      ;

      function RpcRequest(method, params, id, from, transport) {
        RpcNotification.call(this, method, params);

        this.getTransport = function () {
          return transport;
        };

        this.setTransport = function (value) {
          transport = unifyTransport(value);
        };

        if (!defineProperty_IE8) Object.defineProperty(this, 'transport', {
          get: this.getTransport.bind(this),
          set: this.setTransport.bind(this)
        });
        var response = responses.get(id, from);

        if (!(transport || self.getTransport())) {
          if (defineProperty_IE8) this.duplicated = Boolean(response);else Object.defineProperty(this, 'duplicated', {
            value: Boolean(response)
          });
        }

        var responseMethod = responseMethods[method];
        this.pack = packer.pack.bind(packer, this, id);

        this.reply = function (error, result, transport) {
          if (error instanceof Function || error && error.send instanceof Function) {
            if (result != undefined) throw new SyntaxError("There can't be parameters after callback");
            transport = error;
            result = null;
            error = undefined;
          } else if (result instanceof Function || result && result.send instanceof Function) {
            if (transport != undefined) throw new SyntaxError("There can't be parameters after callback");
            transport = result;
            result = null;
          }

          ;
          transport = unifyTransport(transport);
          if (response) clearTimeout(response.timeout);

          if (from != undefined) {
            if (error) error.dest = from;
            if (result) result.dest = from;
          }

          ;
          var message;

          if (error || result != undefined) {
            if (self.peerID != undefined) {
              if (error) error.from = self.peerID;else result.from = self.peerID;
            }

            if (responseMethod) {
              if (responseMethod.error == undefined && error) message = {
                error: error
              };else {
                var method = error ? responseMethod.error : responseMethod.response;
                message = {
                  method: method,
                  params: error || result
                };
              }
            } else message = {
              error: error,
              result: result
            };

            message = packer.pack(message, id);
          } else if (response) message = response.message;else message = packer.pack({
            result: null
          }, id);

          storeResponse(message, id, from);
          transport = transport || this.getTransport() || self.getTransport();
          if (transport) return transport.send(message);
          return message;
        };
      }

      ;
      inherits(RpcRequest, RpcNotification);

      function cancel(message) {
        var key = message2Key[message];
        if (!key) return;
        delete message2Key[message];
        var request = requests.pop(key.id, key.dest);
        if (!request) return;
        clearTimeout(request.timeout);
        storeProcessedResponse(key.id, key.dest);
      }

      ;

      this.cancel = function (message) {
        if (message) return cancel(message);

        for (var message in message2Key) {
          cancel(message);
        }
      };

      this.close = function () {
        var transport = this.getTransport();
        if (transport && transport.close) transport.close(4003, "Cancel request");
        this.cancel();
        processedResponses.forEach(clearTimeout);
        responses.forEach(function (response) {
          clearTimeout(response.timeout);
        });
      };

      this.encode = function (method, params, dest, transport, callback) {
        if (params instanceof Function) {
          if (dest != undefined) throw new SyntaxError("There can't be parameters after callback");
          callback = params;
          transport = undefined;
          dest = undefined;
          params = undefined;
        } else if (dest instanceof Function) {
          if (transport != undefined) throw new SyntaxError("There can't be parameters after callback");
          callback = dest;
          transport = undefined;
          dest = undefined;
        } else if (transport instanceof Function) {
          if (callback != undefined) throw new SyntaxError("There can't be parameters after callback");
          callback = transport;
          transport = undefined;
        }

        ;

        if (self.peerID != undefined) {
          params = params || {};
          params.from = self.peerID;
        }

        ;

        if (dest != undefined) {
          params = params || {};
          params.dest = dest;
        }

        ;
        var message = {
          method: method,
          params: params
        };

        if (callback) {
          var dispatchCallback = function dispatchCallback(error, result) {
            self.cancel(message);
            callback(error, result);
          };

          var sendRequest = function sendRequest(transport) {
            var rt = method === 'ping' ? ping_request_timeout : request_timeout;
            request.timeout = setTimeout(timeout, rt * Math.pow(2, retried++));
            message2Key[message] = {
              id: id,
              dest: dest
            };
            requests.set(request, id, dest);
            transport = transport || encode_transport || self.getTransport();
            if (transport) return transport.send(message);
            return message;
          };

          var retry = function retry(transport) {
            transport = unifyTransport(transport);
            console.warn(retried + ' retry for request message:', message);
            var timeout = processedResponses.pop(id, dest);
            clearTimeout(timeout);
            return sendRequest(transport);
          };

          var timeout = function timeout() {
            if (retried < max_retries) return retry(transport);
            var error = new Error('Request has timed out');
            error.request = message;
            error.retry = retry;
            dispatchCallback(error);
          };

          var id = requestID++;
          var retried = 0;
          message = packer.pack(message, id);
          ;
          var request = {
            message: message,
            callback: dispatchCallback,
            responseMethods: responseMethods[method] || {}
          };
          var encode_transport = unifyTransport(transport);
          ;
          ;
          ;
          return sendRequest(transport);
        }

        ;
        message = packer.pack(message);
        transport = transport || this.getTransport();
        if (transport) return transport.send(message);
        return message;
      };

      this.decode = function (message, transport) {
        if (!message) throw new TypeError("Message is not defined");

        try {
          message = packer.unpack(message);
        } catch (e) {
          return console.debug(e, message);
        }

        ;
        var id = message.id;
        var ack = message.ack;
        var method = message.method;
        var params = message.params || {};
        var from = params.from;
        var dest = params.dest;
        if (self.peerID != undefined && from == self.peerID) return;

        if (id == undefined && ack == undefined) {
          var notification = new RpcNotification(method, params);
          if (self.emit('request', notification)) return;
          return notification;
        }

        ;

        function processRequest() {
          transport = unifyTransport(transport) || self.getTransport();

          if (transport) {
            var response = responses.get(id, from);
            if (response) return transport.send(response.message);
          }

          ;
          var idAck = id != undefined ? id : ack;
          var request = new RpcRequest(method, params, idAck, from, transport);
          if (self.emit('request', request)) return;
          return request;
        }

        ;

        function processResponse(request, error, result) {
          request.callback(error, result);
        }

        ;

        function duplicatedResponse(timeout) {
          console.warn("Response already processed", message);
          clearTimeout(timeout);
          storeProcessedResponse(ack, from);
        }

        ;

        if (method) {
          if (dest == undefined || dest == self.peerID) {
            var request = requests.get(ack, from);

            if (request) {
              var responseMethods = request.responseMethods;
              if (method == responseMethods.error) return processResponse(request, params);
              if (method == responseMethods.response) return processResponse(request, null, params);
              return processRequest();
            }

            var processed = processedResponses.get(ack, from);
            if (processed) return duplicatedResponse(processed);
          }

          return processRequest();
        }

        ;
        var error = message.error;
        var result = message.result;
        if (error && error.dest && error.dest != self.peerID) return;
        if (result && result.dest && result.dest != self.peerID) return;
        var request = requests.get(ack, from);

        if (!request) {
          var processed = processedResponses.get(ack, from);
          if (processed) return duplicatedResponse(processed);
          return console.warn("No callback was defined for this message", message);
        }

        ;
        processResponse(request, error, result);
      };
    }

    ;
    inherits(RpcBuilder, EventEmitter);
    RpcBuilder.RpcNotification = RpcNotification;
    module.exports = RpcBuilder;

    var clients = __webpack_require__(
    /*! ./clients */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/index.js");

    var transports = __webpack_require__(
    /*! ./clients/transports */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/clients/transports/index.js");

    RpcBuilder.clients = clients;
    RpcBuilder.clients.transports = transports;
    RpcBuilder.packers = packers; //# sourceMappingURL=index.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/packers/JsonRPC.js":
  /*!************************************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/packers/JsonRPC.js ***!
    \************************************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalKurentoUtilsKurentoJsonrpcPackersJsonRPCJs(module, exports) {
    function pack(message, id) {
      var result = {
        jsonrpc: "2.0"
      };

      if (message.method) {
        result.method = message.method;
        if (message.params) result.params = message.params;
        if (id != undefined) result.id = id;
      } else if (id != undefined) {
        if (message.error) {
          if (message.result !== undefined) throw new TypeError("Both result and error are defined");
          result.error = message.error;
        } else if (message.result !== undefined) result.result = message.result;else throw new TypeError("No result or error is defined");

        result.id = id;
      }

      ;
      return JSON.stringify(result);
    }

    ;

    function unpack(message) {
      var result = message;

      if (typeof message === 'string' || message instanceof String) {
        result = JSON.parse(message);
      }

      var version = result.jsonrpc;
      if (version !== '2.0') throw new TypeError("Invalid JsonRPC version '" + version + "': " + message);

      if (result.method == undefined) {
        if (result.id == undefined) throw new TypeError("Invalid message: " + message);
        var result_defined = result.result !== undefined;
        var error_defined = result.error !== undefined;
        if (result_defined && error_defined) throw new TypeError("Both result and error are defined: " + message);
        if (!result_defined && !error_defined) throw new TypeError("No result or error is defined: " + message);
        result.ack = result.id;
        delete result.id;
      }

      return result;
    }

    ;
    exports.pack = pack;
    exports.unpack = unpack; //# sourceMappingURL=JsonRPC.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/packers/XmlRPC.js":
  /*!***********************************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/packers/XmlRPC.js ***!
    \***********************************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalKurentoUtilsKurentoJsonrpcPackersXmlRPCJs(module, exports) {
    function pack(message) {
      throw new TypeError("Not yet implemented");
    }

    ;

    function unpack(message) {
      throw new TypeError("Not yet implemented");
    }

    ;
    exports.pack = pack;
    exports.unpack = unpack; //# sourceMappingURL=XmlRPC.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/packers/index.js":
  /*!**********************************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/packers/index.js ***!
    \**********************************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalKurentoUtilsKurentoJsonrpcPackersIndexJs(module, exports, __webpack_require__) {
    var JsonRPC = __webpack_require__(
    /*! ./JsonRPC */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/packers/JsonRPC.js");

    var XmlRPC = __webpack_require__(
    /*! ./XmlRPC */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/KurentoUtils/kurento-jsonrpc/packers/XmlRPC.js");

    exports.JsonRPC = JsonRPC;
    exports.XmlRPC = XmlRPC; //# sourceMappingURL=index.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js":
  /*!*************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js ***!
    \*************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalLoggerOpenViduLoggerJs(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;

    var OpenViduLogger =
    /** @class */
    function () {
      function OpenViduLogger() {
        this.logger = window.console;
        this.LOG_FNS = [this.logger.log, this.logger.debug, this.logger.info, this.logger.warn, this.logger.error];
        this.isProdMode = false;
      }

      OpenViduLogger.getInstance = function () {
        if (!OpenViduLogger.instance) {
          OpenViduLogger.instance = new OpenViduLogger();
        }

        return OpenViduLogger.instance;
      };

      OpenViduLogger.prototype.log = function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        if (!this.isProdMode) {
          this.LOG_FNS[0].apply(this.logger, arguments);
        }
      };

      OpenViduLogger.prototype.debug = function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        if (!this.isProdMode) {
          this.LOG_FNS[1].apply(this.logger, arguments);
        }
      };

      OpenViduLogger.prototype.info = function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        if (!this.isProdMode) {
          this.LOG_FNS[2].apply(this.logger, arguments);
        }
      };

      OpenViduLogger.prototype.warn = function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        if (!this.isProdMode) {
          this.LOG_FNS[3].apply(this.logger, arguments);
        }
      };

      OpenViduLogger.prototype.error = function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        this.LOG_FNS[4].apply(this.logger, arguments);
      };

      OpenViduLogger.prototype.enableProdMode = function () {
        this.isProdMode = true;
      };

      return OpenViduLogger;
    }();

    exports.OpenViduLogger = OpenViduLogger; //# sourceMappingURL=OpenViduLogger.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/ScreenSharing/Screen-Capturing-Auto.js":
  /*!***************************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/ScreenSharing/Screen-Capturing-Auto.js ***!
    \***************************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalScreenSharingScreenCapturingAutoJs(module, exports) {
    window.getScreenId = function (firefoxString, callback, custom_parameter) {
      if (navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob)) {
        callback({
          video: true
        });
        return;
      }

      if (!!navigator.mozGetUserMedia) {
        callback(null, 'firefox', {
          video: {
            mozMediaSource: firefoxString,
            mediaSource: firefoxString
          }
        });
        return;
      }

      window.addEventListener('message', onIFrameCallback);

      function onIFrameCallback(event) {
        if (!event.data) return;

        if (event.data.chromeMediaSourceId) {
          if (event.data.chromeMediaSourceId === 'PermissionDeniedError') {
            callback('permission-denied');
          } else {
            callback(null, event.data.chromeMediaSourceId, getScreenConstraints(null, event.data.chromeMediaSourceId, event.data.canRequestAudioTrack));
          }

          window.removeEventListener('message', onIFrameCallback);
        }

        if (event.data.chromeExtensionStatus) {
          callback(event.data.chromeExtensionStatus, null, getScreenConstraints(event.data.chromeExtensionStatus));
          window.removeEventListener('message', onIFrameCallback);
        }
      }

      if (!custom_parameter) {
        setTimeout(postGetSourceIdMessage, 100);
      } else {
        setTimeout(function () {
          postGetSourceIdMessage(custom_parameter);
        }, 100);
      }
    };

    function getScreenConstraints(error, sourceId, canRequestAudioTrack) {
      var screen_constraints = {
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: error ? 'screen' : 'desktop',
            maxWidth: window.screen.width > 1920 ? window.screen.width : 1920,
            maxHeight: window.screen.height > 1080 ? window.screen.height : 1080
          },
          optional: []
        }
      };

      if (!!canRequestAudioTrack) {
        screen_constraints.audio = {
          mandatory: {
            chromeMediaSource: error ? 'screen' : 'desktop'
          },
          optional: []
        };
      }

      if (sourceId) {
        screen_constraints.video.mandatory.chromeMediaSourceId = sourceId;

        if (screen_constraints.audio && screen_constraints.audio.mandatory) {
          screen_constraints.audio.mandatory.chromeMediaSourceId = sourceId;
        }
      }

      return screen_constraints;
    }

    function postGetSourceIdMessage(custom_parameter) {
      if (!iframe) {
        loadIFrame(function () {
          postGetSourceIdMessage(custom_parameter);
        });
        return;
      }

      if (!iframe.isLoaded) {
        setTimeout(function () {
          postGetSourceIdMessage(custom_parameter);
        }, 100);
        return;
      }

      if (!custom_parameter) {
        iframe.contentWindow.postMessage({
          captureSourceId: true
        }, '*');
      } else if (!!custom_parameter.forEach) {
        iframe.contentWindow.postMessage({
          captureCustomSourceId: custom_parameter
        }, '*');
      } else {
        iframe.contentWindow.postMessage({
          captureSourceIdWithAudio: true
        }, '*');
      }
    }

    var iframe;

    window.getScreenConstraints = function (callback) {
      loadIFrame(function () {
        getScreenId(function (error, sourceId, screen_constraints) {
          if (!screen_constraints) {
            screen_constraints = {
              video: true
            };
          }

          callback(error, screen_constraints.video);
        });
      });
    };

    function loadIFrame(loadCallback) {
      if (iframe) {
        loadCallback();
        return;
      }

      iframe = document.createElement('iframe');

      iframe.onload = function () {
        iframe.isLoaded = true;
        loadCallback();
      };

      iframe.src = 'https://openvidu.github.io/openvidu-screen-sharing-chrome-extension/';
      iframe.style.display = 'none';
      (document.body || document.documentElement).appendChild(iframe);
    }

    window.getChromeExtensionStatus = function (callback) {
      if (!!navigator.mozGetUserMedia) {
        callback('installed-enabled');
        return;
      }

      window.addEventListener('message', onIFrameCallback);

      function onIFrameCallback(event) {
        if (!event.data) return;

        if (event.data.chromeExtensionStatus) {
          callback(event.data.chromeExtensionStatus);
          window.removeEventListener('message', onIFrameCallback);
        }
      }

      setTimeout(postGetChromeExtensionStatusMessage, 100);
    };

    function postGetChromeExtensionStatusMessage() {
      if (!iframe) {
        loadIFrame(postGetChromeExtensionStatusMessage);
        return;
      }

      if (!iframe.isLoaded) {
        setTimeout(postGetChromeExtensionStatusMessage, 100);
        return;
      }

      iframe.contentWindow.postMessage({
        getChromeExtensionStatus: true
      }, '*');
    }

    exports.getScreenId = getScreenId; //# sourceMappingURL=Screen-Capturing-Auto.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/ScreenSharing/Screen-Capturing.js":
  /*!**********************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/ScreenSharing/Screen-Capturing.js ***!
    \**********************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalScreenSharingScreenCapturingJs(module, exports) {
    var chromeMediaSource = 'screen';
    var sourceId;
    var screenCallback;

    if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && typeof navigator.userAgent !== 'undefined') {
      var isFirefox = typeof window.InstallTrigger !== 'undefined';
      var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
      var isChrome = !!window.chrome && !isOpera;
      window.addEventListener('message', function (event) {
        if (event.origin != window.location.origin) {
          return;
        }

        onMessageCallback(event.data);
      });
    }

    function onMessageCallback(data) {
      if (data == 'PermissionDeniedError') {
        if (screenCallback) return screenCallback('PermissionDeniedError');else throw new Error('PermissionDeniedError');
      }

      if (data == 'rtcmulticonnection-extension-loaded') {
        chromeMediaSource = 'desktop';
      }

      if (data.sourceId && screenCallback) {
        screenCallback(sourceId = data.sourceId, data.canRequestAudioTrack === true);
      }
    }

    function isChromeExtensionAvailable(callback) {
      if (!callback) return;
      if (chromeMediaSource == 'desktop') return callback(true);
      window.postMessage('are-you-there', '*');
      setTimeout(function () {
        if (chromeMediaSource == 'screen') {
          callback(false);
        } else callback(true);
      }, 2000);
    }

    function getSourceId(callback) {
      if (!callback) throw '"callback" parameter is mandatory.';
      if (sourceId) return callback(sourceId);
      screenCallback = callback;
      window.postMessage('get-sourceId', '*');
    }

    function getCustomSourceId(arr, callback) {
      if (!arr || !arr.forEach) throw '"arr" parameter is mandatory and it must be an array.';
      if (!callback) throw '"callback" parameter is mandatory.';
      if (sourceId) return callback(sourceId);
      screenCallback = callback;
      window.postMessage({
        'get-custom-sourceId': arr
      }, '*');
    }

    function getSourceIdWithAudio(callback) {
      if (!callback) throw '"callback" parameter is mandatory.';
      if (sourceId) return callback(sourceId);
      screenCallback = callback;
      window.postMessage('audio-plus-tab', '*');
    }

    function getChromeExtensionStatus(extensionid, callback) {
      if (isFirefox) return callback('not-chrome');

      if (arguments.length != 2) {
        callback = extensionid;
        extensionid = 'lfcgfepafnobdloecchnfaclibenjold';
      }

      var image = document.createElement('img');
      image.src = 'chrome-extension://' + extensionid + '/icon.png';

      image.onload = function () {
        chromeMediaSource = 'screen';
        window.postMessage('are-you-there', '*');
        setTimeout(function () {
          if (chromeMediaSource == 'screen') {
            callback('installed-disabled');
          } else callback('installed-enabled');
        }, 2000);
      };

      image.onerror = function () {
        callback('not-installed');
      };
    }

    function getScreenConstraintsWithAudio(callback) {
      getScreenConstraints(callback, true);
    }

    function getScreenConstraints(callback, captureSourceIdWithAudio) {
      sourceId = '';
      var firefoxScreenConstraints = {
        mozMediaSource: 'window',
        mediaSource: 'window'
      };
      if (isFirefox) return callback(null, firefoxScreenConstraints);
      var screen_constraints = {
        mandatory: {
          chromeMediaSource: chromeMediaSource,
          maxWidth: screen.width > 1920 ? screen.width : 1920,
          maxHeight: screen.height > 1080 ? screen.height : 1080
        },
        optional: []
      };

      if (chromeMediaSource == 'desktop' && !sourceId) {
        if (captureSourceIdWithAudio) {
          getSourceIdWithAudio(function (sourceId, canRequestAudioTrack) {
            screen_constraints.mandatory.chromeMediaSourceId = sourceId;

            if (canRequestAudioTrack) {
              screen_constraints.canRequestAudioTrack = true;
            }

            callback(sourceId == 'PermissionDeniedError' ? sourceId : null, screen_constraints);
          });
        } else {
          getSourceId(function (sourceId) {
            screen_constraints.mandatory.chromeMediaSourceId = sourceId;
            callback(sourceId == 'PermissionDeniedError' ? sourceId : null, screen_constraints);
          });
        }

        return;
      }

      if (chromeMediaSource == 'desktop') {
        screen_constraints.mandatory.chromeMediaSourceId = sourceId;
      }

      callback(null, screen_constraints);
    }

    exports.getScreenConstraints = getScreenConstraints;
    exports.getScreenConstraintsWithAudio = getScreenConstraintsWithAudio;
    exports.isChromeExtensionAvailable = isChromeExtensionAvailable;
    exports.getChromeExtensionStatus = getChromeExtensionStatus;
    exports.getSourceId = getSourceId; //# sourceMappingURL=Screen-Capturing.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/WebRtcPeer/WebRtcPeer.js":
  /*!*************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/WebRtcPeer/WebRtcPeer.js ***!
    \*************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalWebRtcPeerWebRtcPeerJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    var __extends = this && this.__extends || function () {
      var _extendStatics16 = function extendStatics(d, b) {
        _extendStatics16 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics16(d, b);
      };

      return function (d, b) {
        _extendStatics16(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    exports.__esModule = true;

    var freeice = __webpack_require__(
    /*! freeice */
    "./node_modules/freeice/index.js");

    var uuid = __webpack_require__(
    /*! uuid */
    "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/index.js");

    var platform = __webpack_require__(
    /*! platform */
    "./node_modules/platform/platform.js");

    var OpenViduLogger_1 = __webpack_require__(
    /*! ../Logger/OpenViduLogger */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js");
    /**
     * @hidden
     */


    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();

    var WebRtcPeer =
    /** @class */
    function () {
      function WebRtcPeer(configuration) {
        var _this = this;

        this.configuration = configuration;
        this.remoteCandidatesQueue = [];
        this.localCandidatesQueue = [];
        this.iceCandidateList = [];
        this.candidategatheringdone = false;
        this.configuration.iceServers = !!this.configuration.iceServers && this.configuration.iceServers.length > 0 ? this.configuration.iceServers : freeice();
        this.pc = new RTCPeerConnection({
          iceServers: this.configuration.iceServers
        });
        this.id = !!configuration.id ? configuration.id : this.generateUniqueId();

        this.pc.onicecandidate = function (event) {
          if (!!event.candidate) {
            var candidate = event.candidate;

            if (candidate) {
              _this.localCandidatesQueue.push({
                candidate: candidate.candidate
              });

              _this.candidategatheringdone = false;

              _this.configuration.onicecandidate(event.candidate);
            } else if (!_this.candidategatheringdone) {
              _this.candidategatheringdone = true;
            }
          }
        };

        this.pc.onsignalingstatechange = function () {
          if (_this.pc.signalingState === 'stable') {
            while (_this.iceCandidateList.length > 0) {
              var candidate = _this.iceCandidateList.shift();

              _this.pc.addIceCandidate(candidate);
            }
          }
        };

        this.start();
      }
      /**
       * This function creates the RTCPeerConnection object taking into account the
       * properties received in the constructor. It starts the SDP negotiation
       * process: generates the SDP offer and invokes the onsdpoffer callback. This
       * callback is expected to send the SDP offer, in order to obtain an SDP
       * answer from another peer.
       */


      WebRtcPeer.prototype.start = function () {
        var _this = this;

        return new Promise(function (resolve, reject) {
          if (_this.pc.signalingState === 'closed') {
            reject('The peer connection object is in "closed" state. This is most likely due to an invocation of the dispose method before accepting in the dialogue');
          }

          if (!!_this.configuration.mediaStream) {
            for (var _i = 0, _a = _this.configuration.mediaStream.getTracks(); _i < _a.length; _i++) {
              var track = _a[_i];

              _this.pc.addTrack(track, _this.configuration.mediaStream);
            }

            resolve();
          }
        });
      };
      /**
       * This method frees the resources used by WebRtcPeer
       */


      WebRtcPeer.prototype.dispose = function () {
        logger.debug('Disposing WebRtcPeer');

        if (this.pc) {
          if (this.pc.signalingState === 'closed') {
            return;
          }

          this.pc.close();
          this.remoteCandidatesQueue = [];
          this.localCandidatesQueue = [];
        }
      };
      /**
       * Function that creates an offer, sets it as local description and returns the offer param
       * to send to OpenVidu Server (will be the remote description of other peer)
       */


      WebRtcPeer.prototype.generateOffer = function () {
        var _this = this;

        return new Promise(function (resolve, reject) {
          var offerAudio,
              offerVideo = true; // Constraints must have both blocks

          if (!!_this.configuration.mediaConstraints) {
            offerAudio = typeof _this.configuration.mediaConstraints.audio === 'boolean' ? _this.configuration.mediaConstraints.audio : true;
            offerVideo = typeof _this.configuration.mediaConstraints.video === 'boolean' ? _this.configuration.mediaConstraints.video : true;
          }

          var constraints = {
            offerToReceiveAudio: _this.configuration.mode !== 'sendonly' && offerAudio,
            offerToReceiveVideo: _this.configuration.mode !== 'sendonly' && offerVideo
          };
          logger.debug('RTCPeerConnection constraints: ' + JSON.stringify(constraints));

          if (platform.name === 'Safari' && platform.ua.indexOf('Safari') !== -1) {
            // Safari (excluding Ionic), at least on iOS just seems to support unified plan, whereas in other browsers is not yet ready and considered experimental
            if (offerAudio) {
              _this.pc.addTransceiver('audio', {
                direction: _this.configuration.mode
              });
            }

            if (offerVideo) {
              _this.pc.addTransceiver('video', {
                direction: _this.configuration.mode
              });
            }

            _this.pc.createOffer().then(function (offer) {
              logger.debug('Created SDP offer');
              return _this.pc.setLocalDescription(offer);
            }).then(function () {
              var localDescription = _this.pc.localDescription;

              if (!!localDescription) {
                logger.debug('Local description set', localDescription.sdp);
                resolve(localDescription.sdp);
              } else {
                reject('Local description is not defined');
              }
            })["catch"](function (error) {
              return reject(error);
            });
          } else {
            // Rest of platforms
            _this.pc.createOffer(constraints).then(function (offer) {
              logger.debug('Created SDP offer');
              return _this.pc.setLocalDescription(offer);
            }).then(function () {
              var localDescription = _this.pc.localDescription;

              if (!!localDescription) {
                logger.debug('Local description set', localDescription.sdp);
                resolve(localDescription.sdp);
              } else {
                reject('Local description is not defined');
              }
            })["catch"](function (error) {
              return reject(error);
            });
          }
        });
      };
      /**
       * Function invoked when a SDP answer is received. Final step in SDP negotiation, the peer
       * just needs to set the answer as its remote description
       */


      WebRtcPeer.prototype.processAnswer = function (sdpAnswer, needsTimeoutOnProcessAnswer) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          var answer = {
            type: 'answer',
            sdp: sdpAnswer
          };
          logger.debug('SDP answer received, setting remote description');

          if (_this.pc.signalingState === 'closed') {
            reject('RTCPeerConnection is closed');
          }

          _this.setRemoteDescription(answer, needsTimeoutOnProcessAnswer, resolve, reject);
        });
      };
      /**
       * @hidden
       */


      WebRtcPeer.prototype.setRemoteDescription = function (answer, needsTimeoutOnProcessAnswer, resolve, reject) {
        var _this = this;

        if (platform['isIonicIos']) {
          // Ionic iOS platform
          if (needsTimeoutOnProcessAnswer) {
            // 400 ms have not elapsed yet since first remote stream triggered Stream#initWebRtcPeerReceive
            setTimeout(function () {
              logger.info('setRemoteDescription run after timeout for Ionic iOS device');

              _this.pc.setRemoteDescription(new RTCSessionDescription(answer)).then(function () {
                return resolve();
              })["catch"](function (error) {
                return reject(error);
              });
            }, 250);
          } else {
            // 400 ms have elapsed
            this.pc.setRemoteDescription(new RTCSessionDescription(answer)).then(function () {
              return resolve();
            })["catch"](function (error) {
              return reject(error);
            });
          }
        } else {
          // Rest of platforms
          this.pc.setRemoteDescription(answer).then(function () {
            return resolve();
          })["catch"](function (error) {
            return reject(error);
          });
        }
      };
      /**
       * Callback function invoked when an ICE candidate is received
       */


      WebRtcPeer.prototype.addIceCandidate = function (iceCandidate) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          logger.debug('Remote ICE candidate received', iceCandidate);

          _this.remoteCandidatesQueue.push(iceCandidate);

          switch (_this.pc.signalingState) {
            case 'closed':
              reject(new Error('PeerConnection object is closed'));
              break;

            case 'stable':
              if (!!_this.pc.remoteDescription) {
                _this.pc.addIceCandidate(iceCandidate).then(function () {
                  return resolve();
                })["catch"](function (error) {
                  return reject(error);
                });
              } else {
                _this.iceCandidateList.push(iceCandidate);

                resolve();
              }

              break;

            default:
              _this.iceCandidateList.push(iceCandidate);

              resolve();
          }
        });
      };

      WebRtcPeer.prototype.addIceConnectionStateChangeListener = function (otherId) {
        var _this = this;

        this.pc.oniceconnectionstatechange = function () {
          var iceConnectionState = _this.pc.iceConnectionState;

          switch (iceConnectionState) {
            case 'disconnected':
              // Possible network disconnection
              logger.warn('IceConnectionState of RTCPeerConnection ' + _this.id + ' (' + otherId + ') change to "disconnected". Possible network disconnection');
              break;

            case 'failed':
              logger.error('IceConnectionState of RTCPeerConnection ' + _this.id + ' (' + otherId + ') to "failed"');
              break;

            case 'closed':
              logger.log('IceConnectionState of RTCPeerConnection ' + _this.id + ' (' + otherId + ') change to "closed"');
              break;

            case 'new':
              logger.log('IceConnectionState of RTCPeerConnection ' + _this.id + ' (' + otherId + ') change to "new"');
              break;

            case 'checking':
              logger.log('IceConnectionState of RTCPeerConnection ' + _this.id + ' (' + otherId + ') change to "checking"');
              break;

            case 'connected':
              logger.log('IceConnectionState of RTCPeerConnection ' + _this.id + ' (' + otherId + ') change to "connected"');
              break;

            case 'completed':
              logger.log('IceConnectionState of RTCPeerConnection ' + _this.id + ' (' + otherId + ') change to "completed"');
              break;
          }
        };
      };
      /**
       * @hidden
       */


      WebRtcPeer.prototype.generateUniqueId = function () {
        return uuid.v4();
      };

      return WebRtcPeer;
    }();

    exports.WebRtcPeer = WebRtcPeer;

    var WebRtcPeerRecvonly =
    /** @class */
    function (_super) {
      __extends(WebRtcPeerRecvonly, _super);

      function WebRtcPeerRecvonly(configuration) {
        var _this = this;

        configuration.mode = 'recvonly';
        _this = _super.call(this, configuration) || this;
        return _this;
      }

      return WebRtcPeerRecvonly;
    }(WebRtcPeer);

    exports.WebRtcPeerRecvonly = WebRtcPeerRecvonly;

    var WebRtcPeerSendonly =
    /** @class */
    function (_super) {
      __extends(WebRtcPeerSendonly, _super);

      function WebRtcPeerSendonly(configuration) {
        var _this = this;

        configuration.mode = 'sendonly';
        _this = _super.call(this, configuration) || this;
        return _this;
      }

      return WebRtcPeerSendonly;
    }(WebRtcPeer);

    exports.WebRtcPeerSendonly = WebRtcPeerSendonly;

    var WebRtcPeerSendrecv =
    /** @class */
    function (_super) {
      __extends(WebRtcPeerSendrecv, _super);

      function WebRtcPeerSendrecv(configuration) {
        var _this = this;

        configuration.mode = 'sendrecv';
        _this = _super.call(this, configuration) || this;
        return _this;
      }

      return WebRtcPeerSendrecv;
    }(WebRtcPeer);

    exports.WebRtcPeerSendrecv = WebRtcPeerSendrecv; //# sourceMappingURL=WebRtcPeer.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/OpenViduInternal/WebRtcStats/WebRtcStats.js":
  /*!***************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/OpenViduInternal/WebRtcStats/WebRtcStats.js ***!
    \***************************************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibOpenViduInternalWebRtcStatsWebRtcStatsJs(module, exports, __webpack_require__) {
    "use strict";
    /*
     * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     */

    exports.__esModule = true;

    var platform = __webpack_require__(
    /*! platform */
    "./node_modules/platform/platform.js");

    var OpenViduLogger_1 = __webpack_require__(
    /*! ../Logger/OpenViduLogger */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger.js");
    /**
     * @hidden
     */


    var logger = OpenViduLogger_1.OpenViduLogger.getInstance();

    var WebRtcStats =
    /** @class */
    function () {
      function WebRtcStats(stream) {
        this.stream = stream;
        this.webRtcStatsEnabled = false;
        this.statsInterval = 1;
        this.stats = {
          inbound: {
            audio: {
              bytesReceived: 0,
              packetsReceived: 0,
              packetsLost: 0
            },
            video: {
              bytesReceived: 0,
              packetsReceived: 0,
              packetsLost: 0,
              framesDecoded: 0,
              nackCount: 0
            }
          },
          outbound: {
            audio: {
              bytesSent: 0,
              packetsSent: 0
            },
            video: {
              bytesSent: 0,
              packetsSent: 0,
              framesEncoded: 0,
              nackCount: 0
            }
          }
        };
      }

      WebRtcStats.prototype.isEnabled = function () {
        return this.webRtcStatsEnabled;
      };

      WebRtcStats.prototype.initWebRtcStats = function () {
        var _this = this;

        var elastestInstrumentation = localStorage.getItem('elastest-instrumentation');

        if (!!elastestInstrumentation) {
          // ElasTest instrumentation object found in local storage
          logger.warn('WebRtc stats enabled for stream ' + this.stream.streamId + ' of connection ' + this.stream.connection.connectionId);
          this.webRtcStatsEnabled = true;
          var instrumentation_1 = JSON.parse(elastestInstrumentation);
          this.statsInterval = instrumentation_1.webrtc.interval; // Interval in seconds

          logger.warn('localStorage item: ' + JSON.stringify(instrumentation_1));
          this.webRtcStatsIntervalId = setInterval(function () {
            _this.sendStatsToHttpEndpoint(instrumentation_1);
          }, this.statsInterval * 1000);
          return;
        }

        logger.debug('WebRtc stats not enabled');
      };

      WebRtcStats.prototype.stopWebRtcStats = function () {
        if (this.webRtcStatsEnabled) {
          clearInterval(this.webRtcStatsIntervalId);
          logger.warn('WebRtc stats stopped for disposed stream ' + this.stream.streamId + ' of connection ' + this.stream.connection.connectionId);
        }
      };

      WebRtcStats.prototype.getSelectedIceCandidateInfo = function () {
        var _this = this;

        return new Promise(function (resolve, reject) {
          _this.getStatsAgnostic(_this.stream.getRTCPeerConnection(), function (stats) {
            if (platform.name.indexOf('Chrome') !== -1 || platform.name.indexOf('Opera') !== -1) {
              var localCandidateId = void 0,
                  remoteCandidateId = void 0,
                  googCandidatePair = void 0;
              var localCandidates = {};
              var remoteCandidates = {};

              for (var key in stats) {
                var stat = stats[key];

                if (stat.type === 'localcandidate') {
                  localCandidates[stat.id] = stat;
                } else if (stat.type === 'remotecandidate') {
                  remoteCandidates[stat.id] = stat;
                } else if (stat.type === 'googCandidatePair' && stat.googActiveConnection === 'true') {
                  googCandidatePair = stat;
                  localCandidateId = stat.localCandidateId;
                  remoteCandidateId = stat.remoteCandidateId;
                }
              }

              var finalLocalCandidate_1 = localCandidates[localCandidateId];

              if (!!finalLocalCandidate_1) {
                var candList = _this.stream.getLocalIceCandidateList();

                var cand = candList.filter(function (c) {
                  return !!c.candidate && c.candidate.indexOf(finalLocalCandidate_1.ipAddress) >= 0 && c.candidate.indexOf(finalLocalCandidate_1.portNumber) >= 0 && c.candidate.indexOf(finalLocalCandidate_1.priority) >= 0;
                });
                finalLocalCandidate_1.raw = !!cand[0] ? cand[0].candidate : 'ERROR: Cannot find local candidate in list of sent ICE candidates';
              } else {
                finalLocalCandidate_1 = 'ERROR: No active local ICE candidate. Probably ICE-TCP is being used';
              }

              var finalRemoteCandidate_1 = remoteCandidates[remoteCandidateId];

              if (!!finalRemoteCandidate_1) {
                var candList = _this.stream.getRemoteIceCandidateList();

                var cand = candList.filter(function (c) {
                  return !!c.candidate && c.candidate.indexOf(finalRemoteCandidate_1.ipAddress) >= 0 && c.candidate.indexOf(finalRemoteCandidate_1.portNumber) >= 0 && c.candidate.indexOf(finalRemoteCandidate_1.priority) >= 0;
                });
                finalRemoteCandidate_1.raw = !!cand[0] ? cand[0].candidate : 'ERROR: Cannot find remote candidate in list of received ICE candidates';
              } else {
                finalRemoteCandidate_1 = 'ERROR: No active remote ICE candidate. Probably ICE-TCP is being used';
              }

              resolve({
                googCandidatePair: googCandidatePair,
                localCandidate: finalLocalCandidate_1,
                remoteCandidate: finalRemoteCandidate_1
              });
            } else {
              reject('Selected ICE candidate info only available for Chrome');
            }
          }, function (error) {
            reject(error);
          });
        });
      };

      WebRtcStats.prototype.sendStatsToHttpEndpoint = function (instrumentation) {
        var _this = this;

        var sendPost = function sendPost(json) {
          var http = new XMLHttpRequest();
          var url = instrumentation.webrtc.httpEndpoint;
          http.open('POST', url, true);
          http.setRequestHeader('Content-type', 'application/json');

          http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
              logger.log('WebRtc stats successfully sent to ' + url + ' for stream ' + _this.stream.streamId + ' of connection ' + _this.stream.connection.connectionId);
            }
          };

          http.send(json);
        };

        var f = function f(stats) {
          if (platform.name.indexOf('Firefox') !== -1) {
            stats.forEach(function (stat) {
              var json = {};

              if (stat.type === 'inbound-rtp' && // Avoid firefox empty outbound-rtp statistics
              stat.nackCount !== null && stat.isRemote === false && stat.id.startsWith('inbound') && stat.remoteId.startsWith('inbound')) {
                var metricId = 'webrtc_inbound_' + stat.mediaType + '_' + stat.ssrc;
                var jit = stat.jitter * 1000;
                var metrics = {
                  bytesReceived: (stat.bytesReceived - _this.stats.inbound[stat.mediaType].bytesReceived) / _this.statsInterval,
                  jitter: jit,
                  packetsReceived: (stat.packetsReceived - _this.stats.inbound[stat.mediaType].packetsReceived) / _this.statsInterval,
                  packetsLost: (stat.packetsLost - _this.stats.inbound[stat.mediaType].packetsLost) / _this.statsInterval
                };
                var units = {
                  bytesReceived: 'bytes',
                  jitter: 'ms',
                  packetsReceived: 'packets',
                  packetsLost: 'packets'
                };

                if (stat.mediaType === 'video') {
                  metrics['framesDecoded'] = (stat.framesDecoded - _this.stats.inbound.video.framesDecoded) / _this.statsInterval;
                  metrics['nackCount'] = (stat.nackCount - _this.stats.inbound.video.nackCount) / _this.statsInterval;
                  units['framesDecoded'] = 'frames';
                  units['nackCount'] = 'packets';
                  _this.stats.inbound.video.framesDecoded = stat.framesDecoded;
                  _this.stats.inbound.video.nackCount = stat.nackCount;
                }

                _this.stats.inbound[stat.mediaType].bytesReceived = stat.bytesReceived;
                _this.stats.inbound[stat.mediaType].packetsReceived = stat.packetsReceived;
                _this.stats.inbound[stat.mediaType].packetsLost = stat.packetsLost;
                json = {
                  '@timestamp': new Date(stat.timestamp).toISOString(),
                  'exec': instrumentation.exec,
                  'component': instrumentation.component,
                  'stream': 'webRtc',
                  'et_type': metricId,
                  'stream_type': 'composed_metrics',
                  'units': units
                };
                json[metricId] = metrics;
                sendPost(JSON.stringify(json));
              } else if (stat.type === 'outbound-rtp' && // Avoid firefox empty inbound-rtp statistics
              stat.isRemote === false && stat.id.toLowerCase().includes('outbound')) {
                var metricId = 'webrtc_outbound_' + stat.mediaType + '_' + stat.ssrc;
                var metrics = {
                  bytesSent: (stat.bytesSent - _this.stats.outbound[stat.mediaType].bytesSent) / _this.statsInterval,
                  packetsSent: (stat.packetsSent - _this.stats.outbound[stat.mediaType].packetsSent) / _this.statsInterval
                };
                var units = {
                  bytesSent: 'bytes',
                  packetsSent: 'packets'
                };

                if (stat.mediaType === 'video') {
                  metrics['framesEncoded'] = (stat.framesEncoded - _this.stats.outbound.video.framesEncoded) / _this.statsInterval;
                  units['framesEncoded'] = 'frames';
                  _this.stats.outbound.video.framesEncoded = stat.framesEncoded;
                }

                _this.stats.outbound[stat.mediaType].bytesSent = stat.bytesSent;
                _this.stats.outbound[stat.mediaType].packetsSent = stat.packetsSent;
                json = {
                  '@timestamp': new Date(stat.timestamp).toISOString(),
                  'exec': instrumentation.exec,
                  'component': instrumentation.component,
                  'stream': 'webRtc',
                  'et_type': metricId,
                  'stream_type': 'composed_metrics',
                  'units': units
                };
                json[metricId] = metrics;
                sendPost(JSON.stringify(json));
              }
            });
          } else if (platform.name.indexOf('Chrome') !== -1 || platform.name.indexOf('Opera') !== -1) {
            for (var _i = 0, _a = Object.keys(stats); _i < _a.length; _i++) {
              var key = _a[_i];
              var stat = stats[key];

              if (stat.type === 'ssrc') {
                var json = {};

                if ('bytesReceived' in stat && (stat.mediaType === 'audio' && 'audioOutputLevel' in stat || stat.mediaType === 'video' && 'qpSum' in stat)) {
                  // inbound-rtp
                  var metricId = 'webrtc_inbound_' + stat.mediaType + '_' + stat.ssrc;
                  var metrics = {
                    bytesReceived: (stat.bytesReceived - _this.stats.inbound[stat.mediaType].bytesReceived) / _this.statsInterval,
                    jitter: stat.googJitterBufferMs,
                    packetsReceived: (stat.packetsReceived - _this.stats.inbound[stat.mediaType].packetsReceived) / _this.statsInterval,
                    packetsLost: (stat.packetsLost - _this.stats.inbound[stat.mediaType].packetsLost) / _this.statsInterval
                  };
                  var units = {
                    bytesReceived: 'bytes',
                    jitter: 'ms',
                    packetsReceived: 'packets',
                    packetsLost: 'packets'
                  };

                  if (stat.mediaType === 'video') {
                    metrics['framesDecoded'] = (stat.framesDecoded - _this.stats.inbound.video.framesDecoded) / _this.statsInterval;
                    metrics['nackCount'] = (stat.googNacksSent - _this.stats.inbound.video.nackCount) / _this.statsInterval;
                    units['framesDecoded'] = 'frames';
                    units['nackCount'] = 'packets';
                    _this.stats.inbound.video.framesDecoded = stat.framesDecoded;
                    _this.stats.inbound.video.nackCount = stat.googNacksSent;
                  }

                  _this.stats.inbound[stat.mediaType].bytesReceived = stat.bytesReceived;
                  _this.stats.inbound[stat.mediaType].packetsReceived = stat.packetsReceived;
                  _this.stats.inbound[stat.mediaType].packetsLost = stat.packetsLost;
                  json = {
                    '@timestamp': new Date(stat.timestamp).toISOString(),
                    'exec': instrumentation.exec,
                    'component': instrumentation.component,
                    'stream': 'webRtc',
                    'et_type': metricId,
                    'stream_type': 'composed_metrics',
                    'units': units
                  };
                  json[metricId] = metrics;
                  sendPost(JSON.stringify(json));
                } else if ('bytesSent' in stat) {
                  // outbound-rtp
                  var metricId = 'webrtc_outbound_' + stat.mediaType + '_' + stat.ssrc;
                  var metrics = {
                    bytesSent: (stat.bytesSent - _this.stats.outbound[stat.mediaType].bytesSent) / _this.statsInterval,
                    packetsSent: (stat.packetsSent - _this.stats.outbound[stat.mediaType].packetsSent) / _this.statsInterval
                  };
                  var units = {
                    bytesSent: 'bytes',
                    packetsSent: 'packets'
                  };

                  if (stat.mediaType === 'video') {
                    metrics['framesEncoded'] = (stat.framesEncoded - _this.stats.outbound.video.framesEncoded) / _this.statsInterval;
                    units['framesEncoded'] = 'frames';
                    _this.stats.outbound.video.framesEncoded = stat.framesEncoded;
                  }

                  _this.stats.outbound[stat.mediaType].bytesSent = stat.bytesSent;
                  _this.stats.outbound[stat.mediaType].packetsSent = stat.packetsSent;
                  json = {
                    '@timestamp': new Date(stat.timestamp).toISOString(),
                    'exec': instrumentation.exec,
                    'component': instrumentation.component,
                    'stream': 'webRtc',
                    'et_type': metricId,
                    'stream_type': 'composed_metrics',
                    'units': units
                  };
                  json[metricId] = metrics;
                  sendPost(JSON.stringify(json));
                }
              }
            }
          }
        };

        this.getStatsAgnostic(this.stream.getRTCPeerConnection(), f, function (error) {
          logger.log(error);
        });
      };

      WebRtcStats.prototype.standardizeReport = function (response) {
        logger.log(response);
        var standardReport = {};

        if (platform.name.indexOf('Firefox') !== -1) {
          Object.keys(response).forEach(function (key) {
            logger.log(response[key]);
          });
          return response;
        }

        response.result().forEach(function (report) {
          var standardStats = {
            id: report.id,
            timestamp: report.timestamp,
            type: report.type
          };
          report.names().forEach(function (name) {
            standardStats[name] = report.stat(name);
          });
          standardReport[standardStats.id] = standardStats;
        });
        return standardReport;
      };

      WebRtcStats.prototype.getStatsAgnostic = function (pc, successCb, failureCb) {
        var _this = this;

        if (platform.name.indexOf('Firefox') !== -1) {
          // getStats takes args in different order in Chrome and Firefox
          return pc.getStats(null).then(function (response) {
            var report = _this.standardizeReport(response);

            successCb(report);
          })["catch"](failureCb);
        } else if (platform.name.indexOf('Chrome') !== -1 || platform.name.indexOf('Opera') !== -1) {
          // In Chrome, the first two arguments are reversed
          return pc.getStats(function (response) {
            var report = _this.standardizeReport(response);

            successCb(report);
          }, null, failureCb);
        }
      };

      return WebRtcStats;
    }();

    exports.WebRtcStats = WebRtcStats; //# sourceMappingURL=WebRtcStats.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/lib/index.js":
  /*!****************************************************!*\
    !*** ./node_modules/openvidu-browser/lib/index.js ***!
    \****************************************************/

  /*! no static exports found */

  /***/
  function node_modulesOpenviduBrowserLibIndexJs(module, exports, __webpack_require__) {
    "use strict";

    exports.__esModule = true;

    var OpenVidu_1 = __webpack_require__(
    /*! ./OpenVidu/OpenVidu */
    "./node_modules/openvidu-browser/lib/OpenVidu/OpenVidu.js");

    exports.OpenVidu = OpenVidu_1.OpenVidu;

    var Session_1 = __webpack_require__(
    /*! ./OpenVidu/Session */
    "./node_modules/openvidu-browser/lib/OpenVidu/Session.js");

    exports.Session = Session_1.Session;

    var Publisher_1 = __webpack_require__(
    /*! ./OpenVidu/Publisher */
    "./node_modules/openvidu-browser/lib/OpenVidu/Publisher.js");

    exports.Publisher = Publisher_1.Publisher;

    var Subscriber_1 = __webpack_require__(
    /*! ./OpenVidu/Subscriber */
    "./node_modules/openvidu-browser/lib/OpenVidu/Subscriber.js");

    exports.Subscriber = Subscriber_1.Subscriber;

    var StreamManager_1 = __webpack_require__(
    /*! ./OpenVidu/StreamManager */
    "./node_modules/openvidu-browser/lib/OpenVidu/StreamManager.js");

    exports.StreamManager = StreamManager_1.StreamManager;

    var Stream_1 = __webpack_require__(
    /*! ./OpenVidu/Stream */
    "./node_modules/openvidu-browser/lib/OpenVidu/Stream.js");

    exports.Stream = Stream_1.Stream;

    var Connection_1 = __webpack_require__(
    /*! ./OpenVidu/Connection */
    "./node_modules/openvidu-browser/lib/OpenVidu/Connection.js");

    exports.Connection = Connection_1.Connection;

    var LocalRecorder_1 = __webpack_require__(
    /*! ./OpenVidu/LocalRecorder */
    "./node_modules/openvidu-browser/lib/OpenVidu/LocalRecorder.js");

    exports.LocalRecorder = LocalRecorder_1.LocalRecorder;

    var Filter_1 = __webpack_require__(
    /*! ./OpenVidu/Filter */
    "./node_modules/openvidu-browser/lib/OpenVidu/Filter.js");

    exports.Filter = Filter_1.Filter;

    var LocalRecorderState_1 = __webpack_require__(
    /*! ./OpenViduInternal/Enums/LocalRecorderState */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/LocalRecorderState.js");

    exports.LocalRecorderState = LocalRecorderState_1.LocalRecorderState;

    var OpenViduError_1 = __webpack_require__(
    /*! ./OpenViduInternal/Enums/OpenViduError */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/OpenViduError.js");

    exports.OpenViduError = OpenViduError_1.OpenViduError;

    var VideoInsertMode_1 = __webpack_require__(
    /*! ./OpenViduInternal/Enums/VideoInsertMode */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Enums/VideoInsertMode.js");

    exports.VideoInsertMode = VideoInsertMode_1.VideoInsertMode;

    var Event_1 = __webpack_require__(
    /*! ./OpenViduInternal/Events/Event */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/Event.js");

    exports.Event = Event_1.Event;

    var ConnectionEvent_1 = __webpack_require__(
    /*! ./OpenViduInternal/Events/ConnectionEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/ConnectionEvent.js");

    exports.ConnectionEvent = ConnectionEvent_1.ConnectionEvent;

    var PublisherSpeakingEvent_1 = __webpack_require__(
    /*! ./OpenViduInternal/Events/PublisherSpeakingEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/PublisherSpeakingEvent.js");

    exports.PublisherSpeakingEvent = PublisherSpeakingEvent_1.PublisherSpeakingEvent;

    var RecordingEvent_1 = __webpack_require__(
    /*! ./OpenViduInternal/Events/RecordingEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/RecordingEvent.js");

    exports.RecordingEvent = RecordingEvent_1.RecordingEvent;

    var SessionDisconnectedEvent_1 = __webpack_require__(
    /*! ./OpenViduInternal/Events/SessionDisconnectedEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/SessionDisconnectedEvent.js");

    exports.SessionDisconnectedEvent = SessionDisconnectedEvent_1.SessionDisconnectedEvent;

    var SignalEvent_1 = __webpack_require__(
    /*! ./OpenViduInternal/Events/SignalEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/SignalEvent.js");

    exports.SignalEvent = SignalEvent_1.SignalEvent;

    var StreamEvent_1 = __webpack_require__(
    /*! ./OpenViduInternal/Events/StreamEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamEvent.js");

    exports.StreamEvent = StreamEvent_1.StreamEvent;

    var StreamManagerEvent_1 = __webpack_require__(
    /*! ./OpenViduInternal/Events/StreamManagerEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamManagerEvent.js");

    exports.StreamManagerEvent = StreamManagerEvent_1.StreamManagerEvent;

    var VideoElementEvent_1 = __webpack_require__(
    /*! ./OpenViduInternal/Events/VideoElementEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/VideoElementEvent.js");

    exports.VideoElementEvent = VideoElementEvent_1.VideoElementEvent;

    var StreamPropertyChangedEvent_1 = __webpack_require__(
    /*! ./OpenViduInternal/Events/StreamPropertyChangedEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/StreamPropertyChangedEvent.js");

    exports.StreamPropertyChangedEvent = StreamPropertyChangedEvent_1.StreamPropertyChangedEvent;

    var FilterEvent_1 = __webpack_require__(
    /*! ./OpenViduInternal/Events/FilterEvent */
    "./node_modules/openvidu-browser/lib/OpenViduInternal/Events/FilterEvent.js");

    exports.FilterEvent = FilterEvent_1.FilterEvent;

    var EventDispatcher_1 = __webpack_require__(
    /*! ./OpenVidu/EventDispatcher */
    "./node_modules/openvidu-browser/lib/OpenVidu/EventDispatcher.js");

    exports.EventDispatcher = EventDispatcher_1.EventDispatcher; //# sourceMappingURL=index.js.map

    /***/
  },

  /***/
  "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/bytesToUuid.js":
  /*!*****************************************************************************************!*\
    !*** ./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/bytesToUuid.js ***!
    \*****************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesOpenviduBrowserNode_modulesUuidDistEsmBrowserBytesToUuidJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /**
     * Convert array of 16 byte values to UUID string format of the form:
     * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
     */


    var byteToHex = [];

    for (var i = 0; i < 256; ++i) {
      byteToHex[i] = (i + 0x100).toString(16).substr(1);
    }

    function bytesToUuid(buf, offset) {
      var i = offset || 0;
      var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

      return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
    }
    /* harmony default export */


    __webpack_exports__["default"] = bytesToUuid;
    /***/
  },

  /***/
  "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/index.js":
  /*!***********************************************************************************!*\
    !*** ./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/index.js ***!
    \***********************************************************************************/

  /*! exports provided: v1, v3, v4, v5 */

  /***/
  function node_modulesOpenviduBrowserNode_modulesUuidDistEsmBrowserIndexJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./v1.js */
    "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/v1.js");
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "v1", function () {
      return _v1_js__WEBPACK_IMPORTED_MODULE_0__["default"];
    });
    /* harmony import */


    var _v3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./v3.js */
    "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/v3.js");
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "v3", function () {
      return _v3_js__WEBPACK_IMPORTED_MODULE_1__["default"];
    });
    /* harmony import */


    var _v4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./v4.js */
    "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/v4.js");
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "v4", function () {
      return _v4_js__WEBPACK_IMPORTED_MODULE_2__["default"];
    });
    /* harmony import */


    var _v5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./v5.js */
    "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/v5.js");
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "v5", function () {
      return _v5_js__WEBPACK_IMPORTED_MODULE_3__["default"];
    });
    /***/

  },

  /***/
  "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/md5.js":
  /*!*********************************************************************************!*\
    !*** ./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/md5.js ***!
    \*********************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesOpenviduBrowserNode_modulesUuidDistEsmBrowserMd5Js(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /*
     * Browser-compatible JavaScript MD5
     *
     * Modification of JavaScript MD5
     * https://github.com/blueimp/JavaScript-MD5
     *
     * Copyright 2011, Sebastian Tschan
     * https://blueimp.net
     *
     * Licensed under the MIT license:
     * https://opensource.org/licenses/MIT
     *
     * Based on
     * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
     * Digest Algorithm, as defined in RFC 1321.
     * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
     * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
     * Distributed under the BSD License
     * See http://pajhome.org.uk/crypt/md5 for more info.
     */


    function md5(bytes) {
      if (typeof bytes == 'string') {
        var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

        bytes = new Array(msg.length);

        for (var i = 0; i < msg.length; i++) {
          bytes[i] = msg.charCodeAt(i);
        }
      }

      return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
    }
    /*
     * Convert an array of little-endian words to an array of bytes
     */


    function md5ToHexEncodedArray(input) {
      var i;
      var x;
      var output = [];
      var length32 = input.length * 32;
      var hexTab = '0123456789abcdef';
      var hex;

      for (i = 0; i < length32; i += 8) {
        x = input[i >> 5] >>> i % 32 & 0xff;
        hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
        output.push(hex);
      }

      return output;
    }
    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */


    function wordsToMd5(x, len) {
      /* append padding */
      x[len >> 5] |= 0x80 << len % 32;
      x[(len + 64 >>> 9 << 4) + 14] = len;
      var i;
      var olda;
      var oldb;
      var oldc;
      var oldd;
      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;

      for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
      }

      return [a, b, c, d];
    }
    /*
     * Convert an array bytes to an array of little-endian words
     * Characters >255 have their high-byte silently ignored.
     */


    function bytesToWords(input) {
      var i;
      var output = [];
      output[(input.length >> 2) - 1] = undefined;

      for (i = 0; i < output.length; i += 1) {
        output[i] = 0;
      }

      var length8 = input.length * 8;

      for (i = 0; i < length8; i += 8) {
        output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
      }

      return output;
    }
    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */


    function safeAdd(x, y) {
      var lsw = (x & 0xffff) + (y & 0xffff);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 0xffff;
    }
    /*
     * Bitwise rotate a 32-bit number to the left.
     */


    function bitRotateLeft(num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    }
    /*
     * These functions implement the four basic operations the algorithm uses.
     */


    function md5cmn(q, a, b, x, s, t) {
      return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
    }

    function md5ff(a, b, c, d, x, s, t) {
      return md5cmn(b & c | ~b & d, a, b, x, s, t);
    }

    function md5gg(a, b, c, d, x, s, t) {
      return md5cmn(b & d | c & ~d, a, b, x, s, t);
    }

    function md5hh(a, b, c, d, x, s, t) {
      return md5cmn(b ^ c ^ d, a, b, x, s, t);
    }

    function md5ii(a, b, c, d, x, s, t) {
      return md5cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    /* harmony default export */


    __webpack_exports__["default"] = md5;
    /***/
  },

  /***/
  "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/rng.js":
  /*!*********************************************************************************!*\
    !*** ./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/rng.js ***!
    \*********************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesOpenviduBrowserNode_modulesUuidDistEsmBrowserRngJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "default", function () {
      return rng;
    }); // Unique ID creation requires a high quality random # generator. In the browser we therefore
    // require the crypto API and do not support built-in fallback to lower quality random number
    // generators (like Math.random()).
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.


    var getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && typeof msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto);
    var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

    function rng() {
      if (!getRandomValues) {
        throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
      }

      return getRandomValues(rnds8);
    }
    /***/

  },

  /***/
  "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/sha1.js":
  /*!**********************************************************************************!*\
    !*** ./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/sha1.js ***!
    \**********************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesOpenviduBrowserNode_modulesUuidDistEsmBrowserSha1Js(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__); // Adapted from Chris Veness' SHA1 code at
    // http://www.movable-type.co.uk/scripts/sha1.html


    function f(s, x, y, z) {
      switch (s) {
        case 0:
          return x & y ^ ~x & z;

        case 1:
          return x ^ y ^ z;

        case 2:
          return x & y ^ x & z ^ y & z;

        case 3:
          return x ^ y ^ z;
      }
    }

    function ROTL(x, n) {
      return x << n | x >>> 32 - n;
    }

    function sha1(bytes) {
      var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
      var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

      if (typeof bytes == 'string') {
        var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

        bytes = new Array(msg.length);

        for (var i = 0; i < msg.length; i++) {
          bytes[i] = msg.charCodeAt(i);
        }
      }

      bytes.push(0x80);
      var l = bytes.length / 4 + 2;
      var N = Math.ceil(l / 16);
      var M = new Array(N);

      for (var i = 0; i < N; i++) {
        M[i] = new Array(16);

        for (var j = 0; j < 16; j++) {
          M[i][j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
        }
      }

      M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
      M[N - 1][14] = Math.floor(M[N - 1][14]);
      M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

      for (var i = 0; i < N; i++) {
        var W = new Array(80);

        for (var t = 0; t < 16; t++) {
          W[t] = M[i][t];
        }

        for (var t = 16; t < 80; t++) {
          W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
        }

        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];
        var e = H[4];

        for (var t = 0; t < 80; t++) {
          var s = Math.floor(t / 20);
          var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
          e = d;
          d = c;
          c = ROTL(b, 30) >>> 0;
          b = a;
          a = T;
        }

        H[0] = H[0] + a >>> 0;
        H[1] = H[1] + b >>> 0;
        H[2] = H[2] + c >>> 0;
        H[3] = H[3] + d >>> 0;
        H[4] = H[4] + e >>> 0;
      }

      return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
    }
    /* harmony default export */


    __webpack_exports__["default"] = sha1;
    /***/
  },

  /***/
  "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/v1.js":
  /*!********************************************************************************!*\
    !*** ./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/v1.js ***!
    \********************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesOpenviduBrowserNode_modulesUuidDistEsmBrowserV1Js(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./rng.js */
    "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/rng.js");
    /* harmony import */


    var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./bytesToUuid.js */
    "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/bytesToUuid.js"); // **`v1()` - Generate time-based UUID**
    //
    // Inspired by https://github.com/LiosK/UUID.js
    // and http://docs.python.org/library/uuid.html


    var _nodeId;

    var _clockseq; // Previous uuid creation time


    var _lastMSecs = 0;
    var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

    function v1(options, buf, offset) {
      var i = buf && offset || 0;
      var b = buf || [];
      options = options || {};
      var node = options.node || _nodeId;
      var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
      // specified.  We do this lazily to minimize issues related to insufficient
      // system entropy.  See #189

      if (node == null || clockseq == null) {
        var seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

        if (node == null) {
          // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
          node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
        }

        if (clockseq == null) {
          // Per 4.2.2, randomize (14 bit) clockseq
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
        }
      } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
      // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
      // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
      // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


      var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime(); // Per 4.2.1.2, use count of uuid's generated during the current clock
      // cycle to simulate higher resolution clock

      var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

      var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

      if (dt < 0 && options.clockseq === undefined) {
        clockseq = clockseq + 1 & 0x3fff;
      } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
      // time interval


      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
        nsecs = 0;
      } // Per 4.2.1.2 Throw error if too many uuids are requested


      if (nsecs >= 10000) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }

      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

      msecs += 12219292800000; // `time_low`

      var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
      b[i++] = tl >>> 24 & 0xff;
      b[i++] = tl >>> 16 & 0xff;
      b[i++] = tl >>> 8 & 0xff;
      b[i++] = tl & 0xff; // `time_mid`

      var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
      b[i++] = tmh >>> 8 & 0xff;
      b[i++] = tmh & 0xff; // `time_high_and_version`

      b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

      b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

      b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

      b[i++] = clockseq & 0xff; // `node`

      for (var n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }

      return buf ? buf : Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b);
    }
    /* harmony default export */


    __webpack_exports__["default"] = v1;
    /***/
  },

  /***/
  "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/v3.js":
  /*!********************************************************************************!*\
    !*** ./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/v3.js ***!
    \********************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesOpenviduBrowserNode_modulesUuidDistEsmBrowserV3Js(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./v35.js */
    "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/v35.js");
    /* harmony import */


    var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./md5.js */
    "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/md5.js");

    var v3 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
    /* harmony default export */

    __webpack_exports__["default"] = v3;
    /***/
  },

  /***/
  "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/v35.js":
  /*!*********************************************************************************!*\
    !*** ./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/v35.js ***!
    \*********************************************************************************/

  /*! exports provided: DNS, URL, default */

  /***/
  function node_modulesOpenviduBrowserNode_modulesUuidDistEsmBrowserV35Js(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DNS", function () {
      return DNS;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "URL", function () {
      return URL;
    });
    /* harmony import */


    var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./bytesToUuid.js */
    "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/bytesToUuid.js");

    function uuidToBytes(uuid) {
      // Note: We assume we're being passed a valid uuid string
      var bytes = [];
      uuid.replace(/[a-fA-F0-9]{2}/g, function (hex) {
        bytes.push(parseInt(hex, 16));
      });
      return bytes;
    }

    function stringToBytes(str) {
      str = unescape(encodeURIComponent(str)); // UTF8 escape

      var bytes = new Array(str.length);

      for (var i = 0; i < str.length; i++) {
        bytes[i] = str.charCodeAt(i);
      }

      return bytes;
    }

    var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
    var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
    /* harmony default export */

    __webpack_exports__["default"] = function (name, version, hashfunc) {
      var generateUUID = function generateUUID(value, namespace, buf, offset) {
        var off = buf && offset || 0;
        if (typeof value == 'string') value = stringToBytes(value);
        if (typeof namespace == 'string') namespace = uuidToBytes(namespace);
        if (!Array.isArray(value)) throw TypeError('value must be an array of bytes');
        if (!Array.isArray(namespace) || namespace.length !== 16) throw TypeError('namespace must be uuid string or an Array of 16 byte values'); // Per 4.3

        var bytes = hashfunc(namespace.concat(value));
        bytes[6] = bytes[6] & 0x0f | version;
        bytes[8] = bytes[8] & 0x3f | 0x80;

        if (buf) {
          for (var idx = 0; idx < 16; ++idx) {
            buf[off + idx] = bytes[idx];
          }
        }

        return buf || Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bytes);
      }; // Function#name is not settable on some platforms (#270)


      try {
        generateUUID.name = name;
      } catch (err) {} // For CommonJS default export support


      generateUUID.DNS = DNS;
      generateUUID.URL = URL;
      return generateUUID;
    };
    /***/

  },

  /***/
  "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/v4.js":
  /*!********************************************************************************!*\
    !*** ./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/v4.js ***!
    \********************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesOpenviduBrowserNode_modulesUuidDistEsmBrowserV4Js(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./rng.js */
    "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/rng.js");
    /* harmony import */


    var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./bytesToUuid.js */
    "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/bytesToUuid.js");

    function v4(options, buf, offset) {
      var i = buf && offset || 0;

      if (typeof options == 'string') {
        buf = options === 'binary' ? new Array(16) : null;
        options = null;
      }

      options = options || {};

      var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


      rnds[6] = rnds[6] & 0x0f | 0x40;
      rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

      if (buf) {
        for (var ii = 0; ii < 16; ++ii) {
          buf[i + ii] = rnds[ii];
        }
      }

      return buf || Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
    }
    /* harmony default export */


    __webpack_exports__["default"] = v4;
    /***/
  },

  /***/
  "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/v5.js":
  /*!********************************************************************************!*\
    !*** ./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/v5.js ***!
    \********************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesOpenviduBrowserNode_modulesUuidDistEsmBrowserV5Js(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./v35.js */
    "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/v35.js");
    /* harmony import */


    var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./sha1.js */
    "./node_modules/openvidu-browser/node_modules/uuid/dist/esm-browser/sha1.js");

    var v5 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
    /* harmony default export */

    __webpack_exports__["default"] = v5;
    /***/
  },

  /***/
  "./node_modules/openvidu-browser/package.json":
  /*!****************************************************!*\
    !*** ./node_modules/openvidu-browser/package.json ***!
    \****************************************************/

  /*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, dependencies, deprecated, description, devDependencies, homepage, license, main, name, repository, scripts, types, version, default */

  /***/
  function node_modulesOpenviduBrowserPackageJson(module) {
    module.exports = JSON.parse("{\"_from\":\"openvidu-browser\",\"_id\":\"openvidu-browser@2.15.1-alpha1\",\"_inBundle\":false,\"_integrity\":\"sha512-uaa41GUThPVo9Rva6Bsw1C3zn2t1cc8ZDjXpQHM6JduG9dHhg+gaDSEuXv5IdXLUVtz7kUfOmMJ6nw9OMs83Ow==\",\"_location\":\"/openvidu-browser\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"tag\",\"registry\":true,\"raw\":\"openvidu-browser\",\"name\":\"openvidu-browser\",\"escapedName\":\"openvidu-browser\",\"rawSpec\":\"\",\"saveSpec\":null,\"fetchSpec\":\"latest\"},\"_requiredBy\":[\"#USER\",\"/\"],\"_resolved\":\"https://registry.npmjs.org/openvidu-browser/-/openvidu-browser-2.15.1-alpha1.tgz\",\"_shasum\":\"70c03d16e3d575c2ce9c305697932b31849ee3fb\",\"_spec\":\"openvidu-browser\",\"_where\":\"/home/aputron/Desktop/Krishna/App_Ionic_BKR/BKR\",\"author\":{\"name\":\"OpenVidu\"},\"bugs\":{\"url\":\"https://github.com/OpenVidu/openvidu/issues\"},\"bundleDependencies\":false,\"dependencies\":{\"@types/node\":\"13.13.2\",\"@types/platform\":\"1.3.2\",\"freeice\":\"2.2.2\",\"hark\":\"1.2.3\",\"platform\":\"1.3.5\",\"uuid\":\"7.0.3\",\"wolfy87-eventemitter\":\"5.2.9\"},\"deprecated\":false,\"description\":\"OpenVidu Browser\",\"devDependencies\":{\"browserify\":\"16.5.1\",\"grunt\":\"1.1.0\",\"grunt-cli\":\"1.3.2\",\"grunt-contrib-copy\":\"1.0.0\",\"grunt-contrib-sass\":\"1.0.0\",\"grunt-contrib-uglify\":\"4.0.1\",\"grunt-contrib-watch\":\"1.1.0\",\"grunt-postcss\":\"0.9.0\",\"grunt-string-replace\":\"1.3.1\",\"grunt-ts\":\"6.0.0-beta.22\",\"terser\":\"4.6.11\",\"tsify\":\"4.0.1\",\"tslint\":\"6.1.1\",\"typedoc\":\"0.17.4\",\"typescript\":\"3.8.3\"},\"homepage\":\"https://github.com/OpenVidu/openvidu#readme\",\"license\":\"Apache-2.0\",\"main\":\"lib/index.js\",\"name\":\"openvidu-browser\",\"repository\":{\"type\":\"git\",\"url\":\"git://github.com/OpenVidu/openvidu.git\"},\"scripts\":{\"browserify\":\"VERSION=${VERSION:-dev}; cd src && ../node_modules/browserify/bin/cmd.js Main.ts -p [ tsify ] --exclude kurento-browser-extensions --debug -o ../static/js/openvidu-browser-$VERSION.js -v\",\"browserify-prod\":\"VERSION=${VERSION:-dev}; cd src && ../node_modules/browserify/bin/cmd.js --debug Main.ts -p [ tsify ] --exclude kurento-browser-extensions | ../node_modules/terser/bin/terser --source-map content=inline --output ../static/js/openvidu-browser-$VERSION.min.js\",\"build\":\"cd src/OpenVidu && ./../../node_modules/typescript/bin/tsc && cd ../.. && ./node_modules/typescript/bin/tsc --declaration src/index.ts --outDir ./lib --sourceMap --lib dom,es5,es2015.promise,scripthost\",\"docs\":\"./generate-docs.sh\"},\"types\":\"lib/index.d.ts\",\"version\":\"2.15.1-alpha1\"}");
    /***/
  },

  /***/
  "./node_modules/platform/platform.js":
  /*!*******************************************!*\
    !*** ./node_modules/platform/platform.js ***!
    \*******************************************/

  /*! no static exports found */

  /***/
  function node_modulesPlatformPlatformJs(module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */
    (function (module) {
      var __WEBPACK_AMD_DEFINE_RESULT__;
      /*!
      * Platform.js <https://mths.be/platform>
      * Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
      * Copyright 2011-2013 John-David Dalton <http://allyoucanleet.com/>
      * Available under MIT license <https://mths.be/mit>
      */


      ;
      (function () {
        'use strict';
        /** Used to determine if values are of the language type `Object`. */

        var objectTypes = {
          'function': true,
          'object': true
        };
        /** Used as a reference to the global object. */

        var root = objectTypes[typeof window] && window || this;
        /** Backup possible global object. */

        var oldRoot = root;
        /** Detect free variable `exports`. */

        var freeExports = objectTypes[typeof exports] && exports;
        /** Detect free variable `module`. */

        var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
        /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */

        var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;

        if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
          root = freeGlobal;
        }
        /**
         * Used as the maximum length of an array-like object.
         * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
         * for more details.
         */


        var maxSafeInteger = Math.pow(2, 53) - 1;
        /** Regular expression to detect Opera. */

        var reOpera = /\bOpera/;
        /** Possible global object. */

        var thisBinding = this;
        /** Used for native method references. */

        var objectProto = Object.prototype;
        /** Used to check for own properties of an object. */

        var hasOwnProperty = objectProto.hasOwnProperty;
        /** Used to resolve the internal `[[Class]]` of values. */

        var toString = objectProto.toString;
        /*--------------------------------------------------------------------------*/

        /**
         * Capitalizes a string value.
         *
         * @private
         * @param {string} string The string to capitalize.
         * @returns {string} The capitalized string.
         */

        function capitalize(string) {
          string = String(string);
          return string.charAt(0).toUpperCase() + string.slice(1);
        }
        /**
         * A utility function to clean up the OS name.
         *
         * @private
         * @param {string} os The OS name to clean up.
         * @param {string} [pattern] A `RegExp` pattern matching the OS name.
         * @param {string} [label] A label for the OS.
         */


        function cleanupOS(os, pattern, label) {
          // Platform tokens are defined at:
          // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
          // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
          var data = {
            '10.0': '10',
            '6.4': '10 Technical Preview',
            '6.3': '8.1',
            '6.2': '8',
            '6.1': 'Server 2008 R2 / 7',
            '6.0': 'Server 2008 / Vista',
            '5.2': 'Server 2003 / XP 64-bit',
            '5.1': 'XP',
            '5.01': '2000 SP1',
            '5.0': '2000',
            '4.0': 'NT',
            '4.90': 'ME'
          }; // Detect Windows version from platform tokens.

          if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) && (data = data[/[\d.]+$/.exec(os)])) {
            os = 'Windows ' + data;
          } // Correct character case and cleanup string.


          os = String(os);

          if (pattern && label) {
            os = os.replace(RegExp(pattern, 'i'), label);
          }

          os = format(os.replace(/ ce$/i, ' CE').replace(/\bhpw/i, 'web').replace(/\bMacintosh\b/, 'Mac OS').replace(/_PowerPC\b/i, ' OS').replace(/\b(OS X) [^ \d]+/i, '$1').replace(/\bMac (OS X)\b/, '$1').replace(/\/(\d)/, ' $1').replace(/_/g, '.').replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '').replace(/\bx86\.64\b/gi, 'x86_64').replace(/\b(Windows Phone) OS\b/, '$1').replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1').split(' on ')[0]);
          return os;
        }
        /**
         * An iteration utility for arrays and objects.
         *
         * @private
         * @param {Array|Object} object The object to iterate over.
         * @param {Function} callback The function called per iteration.
         */


        function each(object, callback) {
          var index = -1,
              length = object ? object.length : 0;

          if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
            while (++index < length) {
              callback(object[index], index, object);
            }
          } else {
            forOwn(object, callback);
          }
        }
        /**
         * Trim and conditionally capitalize string values.
         *
         * @private
         * @param {string} string The string to format.
         * @returns {string} The formatted string.
         */


        function format(string) {
          string = trim(string);
          return /^(?:webOS|i(?:OS|P))/.test(string) ? string : capitalize(string);
        }
        /**
         * Iterates over an object's own properties, executing the `callback` for each.
         *
         * @private
         * @param {Object} object The object to iterate over.
         * @param {Function} callback The function executed per own property.
         */


        function forOwn(object, callback) {
          for (var key in object) {
            if (hasOwnProperty.call(object, key)) {
              callback(object[key], key, object);
            }
          }
        }
        /**
         * Gets the internal `[[Class]]` of a value.
         *
         * @private
         * @param {*} value The value.
         * @returns {string} The `[[Class]]`.
         */


        function getClassOf(value) {
          return value == null ? capitalize(value) : toString.call(value).slice(8, -1);
        }
        /**
         * Host objects can return type values that are different from their actual
         * data type. The objects we are concerned with usually return non-primitive
         * types of "object", "function", or "unknown".
         *
         * @private
         * @param {*} object The owner of the property.
         * @param {string} property The property to check.
         * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
         */


        function isHostType(object, property) {
          var type = object != null ? typeof object[property] : 'number';
          return !/^(?:boolean|number|string|undefined)$/.test(type) && (type == 'object' ? !!object[property] : true);
        }
        /**
         * Prepares a string for use in a `RegExp` by making hyphens and spaces optional.
         *
         * @private
         * @param {string} string The string to qualify.
         * @returns {string} The qualified string.
         */


        function qualify(string) {
          return String(string).replace(/([ -])(?!$)/g, '$1?');
        }
        /**
         * A bare-bones `Array#reduce` like utility function.
         *
         * @private
         * @param {Array} array The array to iterate over.
         * @param {Function} callback The function called per iteration.
         * @returns {*} The accumulated result.
         */


        function reduce(array, callback) {
          var accumulator = null;
          each(array, function (value, index) {
            accumulator = callback(accumulator, value, index, array);
          });
          return accumulator;
        }
        /**
         * Removes leading and trailing whitespace from a string.
         *
         * @private
         * @param {string} string The string to trim.
         * @returns {string} The trimmed string.
         */


        function trim(string) {
          return String(string).replace(/^ +| +$/g, '');
        }
        /*--------------------------------------------------------------------------*/

        /**
         * Creates a new platform object.
         *
         * @memberOf platform
         * @param {Object|string} [ua=navigator.userAgent] The user agent string or
         *  context object.
         * @returns {Object} A platform object.
         */


        function parse(ua) {
          /** The environment context object. */
          var context = root;
          /** Used to flag when a custom context is provided. */

          var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String'; // Juggle arguments.

          if (isCustomContext) {
            context = ua;
            ua = null;
          }
          /** Browser navigator object. */


          var nav = context.navigator || {};
          /** Browser user agent string. */

          var userAgent = nav.userAgent || '';
          ua || (ua = userAgent);
          /** Used to flag when `thisBinding` is the [ModuleScope]. */

          var isModuleScope = isCustomContext || thisBinding == oldRoot;
          /** Used to detect if browser is like Chrome. */

          var likeChrome = isCustomContext ? !!nav.likeChrome : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());
          /** Internal `[[Class]]` value shortcuts. */

          var objectClass = 'Object',
              airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',
              enviroClass = isCustomContext ? objectClass : 'Environment',
              javaClass = isCustomContext && context.java ? 'JavaPackage' : getClassOf(context.java),
              phantomClass = isCustomContext ? objectClass : 'RuntimeObject';
          /** Detect Java environments. */

          var java = /\bJava/.test(javaClass) && context.java;
          /** Detect Rhino. */

          var rhino = java && getClassOf(context.environment) == enviroClass;
          /** A character to represent alpha. */

          var alpha = java ? 'a' : "\u03B1";
          /** A character to represent beta. */

          var beta = java ? 'b' : "\u03B2";
          /** Browser document object. */

          var doc = context.document || {};
          /**
           * Detect Opera browser (Presto-based).
           * http://www.howtocreate.co.uk/operaStuff/operaObject.html
           * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
           */

          var opera = context.operamini || context.opera;
          /** Opera `[[Class]]`. */

          var operaClass = reOpera.test(operaClass = isCustomContext && opera ? opera['[[Class]]'] : getClassOf(opera)) ? operaClass : opera = null;
          /*------------------------------------------------------------------------*/

          /** Temporary variable used over the script's lifetime. */

          var data;
          /** The CPU architecture. */

          var arch = ua;
          /** Platform description array. */

          var description = [];
          /** Platform alpha/beta indicator. */

          var prerelease = null;
          /** A flag to indicate that environment features should be used to resolve the platform. */

          var useFeatures = ua == userAgent;
          /** The browser/environment version. */

          var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();
          /** A flag to indicate if the OS ends with "/ Version" */

          var isSpecialCasedOS;
          /* Detectable layout engines (order is important). */

          var layout = getLayout([{
            'label': 'EdgeHTML',
            'pattern': 'Edge'
          }, 'Trident', {
            'label': 'WebKit',
            'pattern': 'AppleWebKit'
          }, 'iCab', 'Presto', 'NetFront', 'Tasman', 'KHTML', 'Gecko']);
          /* Detectable browser names (order is important). */

          var name = getName(['Adobe AIR', 'Arora', 'Avant Browser', 'Breach', 'Camino', 'Electron', 'Epiphany', 'Fennec', 'Flock', 'Galeon', 'GreenBrowser', 'iCab', 'Iceweasel', 'K-Meleon', 'Konqueror', 'Lunascape', 'Maxthon', {
            'label': 'Microsoft Edge',
            'pattern': 'Edge'
          }, 'Midori', 'Nook Browser', 'PaleMoon', 'PhantomJS', 'Raven', 'Rekonq', 'RockMelt', {
            'label': 'Samsung Internet',
            'pattern': 'SamsungBrowser'
          }, 'SeaMonkey', {
            'label': 'Silk',
            'pattern': '(?:Cloud9|Silk-Accelerated)'
          }, 'Sleipnir', 'SlimBrowser', {
            'label': 'SRWare Iron',
            'pattern': 'Iron'
          }, 'Sunrise', 'Swiftfox', 'Waterfox', 'WebPositive', 'Opera Mini', {
            'label': 'Opera Mini',
            'pattern': 'OPiOS'
          }, 'Opera', {
            'label': 'Opera',
            'pattern': 'OPR'
          }, 'Chrome', {
            'label': 'Chrome Mobile',
            'pattern': '(?:CriOS|CrMo)'
          }, {
            'label': 'Firefox',
            'pattern': '(?:Firefox|Minefield)'
          }, {
            'label': 'Firefox for iOS',
            'pattern': 'FxiOS'
          }, {
            'label': 'IE',
            'pattern': 'IEMobile'
          }, {
            'label': 'IE',
            'pattern': 'MSIE'
          }, 'Safari']);
          /* Detectable products (order is important). */

          var product = getProduct([{
            'label': 'BlackBerry',
            'pattern': 'BB10'
          }, 'BlackBerry', {
            'label': 'Galaxy S',
            'pattern': 'GT-I9000'
          }, {
            'label': 'Galaxy S2',
            'pattern': 'GT-I9100'
          }, {
            'label': 'Galaxy S3',
            'pattern': 'GT-I9300'
          }, {
            'label': 'Galaxy S4',
            'pattern': 'GT-I9500'
          }, {
            'label': 'Galaxy S5',
            'pattern': 'SM-G900'
          }, {
            'label': 'Galaxy S6',
            'pattern': 'SM-G920'
          }, {
            'label': 'Galaxy S6 Edge',
            'pattern': 'SM-G925'
          }, {
            'label': 'Galaxy S7',
            'pattern': 'SM-G930'
          }, {
            'label': 'Galaxy S7 Edge',
            'pattern': 'SM-G935'
          }, 'Google TV', 'Lumia', 'iPad', 'iPod', 'iPhone', 'Kindle', {
            'label': 'Kindle Fire',
            'pattern': '(?:Cloud9|Silk-Accelerated)'
          }, 'Nexus', 'Nook', 'PlayBook', 'PlayStation Vita', 'PlayStation', 'TouchPad', 'Transformer', {
            'label': 'Wii U',
            'pattern': 'WiiU'
          }, 'Wii', 'Xbox One', {
            'label': 'Xbox 360',
            'pattern': 'Xbox'
          }, 'Xoom']);
          /* Detectable manufacturers. */

          var manufacturer = getManufacturer({
            'Apple': {
              'iPad': 1,
              'iPhone': 1,
              'iPod': 1
            },
            'Archos': {},
            'Amazon': {
              'Kindle': 1,
              'Kindle Fire': 1
            },
            'Asus': {
              'Transformer': 1
            },
            'Barnes & Noble': {
              'Nook': 1
            },
            'BlackBerry': {
              'PlayBook': 1
            },
            'Google': {
              'Google TV': 1,
              'Nexus': 1
            },
            'HP': {
              'TouchPad': 1
            },
            'HTC': {},
            'LG': {},
            'Microsoft': {
              'Xbox': 1,
              'Xbox One': 1
            },
            'Motorola': {
              'Xoom': 1
            },
            'Nintendo': {
              'Wii U': 1,
              'Wii': 1
            },
            'Nokia': {
              'Lumia': 1
            },
            'Samsung': {
              'Galaxy S': 1,
              'Galaxy S2': 1,
              'Galaxy S3': 1,
              'Galaxy S4': 1
            },
            'Sony': {
              'PlayStation': 1,
              'PlayStation Vita': 1
            }
          });
          /* Detectable operating systems (order is important). */

          var os = getOS(['Windows Phone', 'Android', 'CentOS', {
            'label': 'Chrome OS',
            'pattern': 'CrOS'
          }, 'Debian', 'Fedora', 'FreeBSD', 'Gentoo', 'Haiku', 'Kubuntu', 'Linux Mint', 'OpenBSD', 'Red Hat', 'SuSE', 'Ubuntu', 'Xubuntu', 'Cygwin', 'Symbian OS', 'hpwOS', 'webOS ', 'webOS', 'Tablet OS', 'Tizen', 'Linux', 'Mac OS X', 'Macintosh', 'Mac', 'Windows 98;', 'Windows ']);
          /*------------------------------------------------------------------------*/

          /**
           * Picks the layout engine from an array of guesses.
           *
           * @private
           * @param {Array} guesses An array of guesses.
           * @returns {null|string} The detected layout engine.
           */

          function getLayout(guesses) {
            return reduce(guesses, function (result, guess) {
              return result || RegExp('\\b' + (guess.pattern || qualify(guess)) + '\\b', 'i').exec(ua) && (guess.label || guess);
            });
          }
          /**
           * Picks the manufacturer from an array of guesses.
           *
           * @private
           * @param {Array} guesses An object of guesses.
           * @returns {null|string} The detected manufacturer.
           */


          function getManufacturer(guesses) {
            return reduce(guesses, function (result, value, key) {
              // Lookup the manufacturer by product or scan the UA for the manufacturer.
              return result || (value[product] || value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] || RegExp('\\b' + qualify(key) + '(?:\\b|\\w*\\d)', 'i').exec(ua)) && key;
            });
          }
          /**
           * Picks the browser name from an array of guesses.
           *
           * @private
           * @param {Array} guesses An array of guesses.
           * @returns {null|string} The detected browser name.
           */


          function getName(guesses) {
            return reduce(guesses, function (result, guess) {
              return result || RegExp('\\b' + (guess.pattern || qualify(guess)) + '\\b', 'i').exec(ua) && (guess.label || guess);
            });
          }
          /**
           * Picks the OS name from an array of guesses.
           *
           * @private
           * @param {Array} guesses An array of guesses.
           * @returns {null|string} The detected OS name.
           */


          function getOS(guesses) {
            return reduce(guesses, function (result, guess) {
              var pattern = guess.pattern || qualify(guess);

              if (!result && (result = RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua))) {
                result = cleanupOS(result, pattern, guess.label || guess);
              }

              return result;
            });
          }
          /**
           * Picks the product name from an array of guesses.
           *
           * @private
           * @param {Array} guesses An array of guesses.
           * @returns {null|string} The detected product name.
           */


          function getProduct(guesses) {
            return reduce(guesses, function (result, guess) {
              var pattern = guess.pattern || qualify(guess);

              if (!result && (result = RegExp('\\b' + pattern + ' *\\d+[.\\w_]*', 'i').exec(ua) || RegExp('\\b' + pattern + ' *\\w+-[\\w]*', 'i').exec(ua) || RegExp('\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua))) {
                // Split by forward slash and append product version if needed.
                if ((result = String(guess.label && !RegExp(pattern, 'i').test(guess.label) ? guess.label : result).split('/'))[1] && !/[\d.]+/.test(result[0])) {
                  result[0] += ' ' + result[1];
                } // Correct character case and cleanup string.


                guess = guess.label || guess;
                result = format(result[0].replace(RegExp(pattern, 'i'), guess).replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ').replace(RegExp('(' + guess + ')[-_.]?(\\w)', 'i'), '$1 $2'));
              }

              return result;
            });
          }
          /**
           * Resolves the version using an array of UA patterns.
           *
           * @private
           * @param {Array} patterns An array of UA patterns.
           * @returns {null|string} The detected version.
           */


          function getVersion(patterns) {
            return reduce(patterns, function (result, pattern) {
              return result || (RegExp(pattern + '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;
            });
          }
          /**
           * Returns `platform.description` when the platform object is coerced to a string.
           *
           * @name toString
           * @memberOf platform
           * @returns {string} Returns `platform.description` if available, else an empty string.
           */


          function toStringPlatform() {
            return this.description || '';
          }
          /*------------------------------------------------------------------------*/
          // Convert layout to an array so we can add extra details.


          layout && (layout = [layout]); // Detect product names that contain their manufacturer's name.

          if (manufacturer && !product) {
            product = getProduct([manufacturer]);
          } // Clean up Google TV.


          if (data = /\bGoogle TV\b/.exec(product)) {
            product = data[0];
          } // Detect simulators.


          if (/\bSimulator\b/i.test(ua)) {
            product = (product ? product + ' ' : '') + 'Simulator';
          } // Detect Opera Mini 8+ running in Turbo/Uncompressed mode on iOS.


          if (name == 'Opera Mini' && /\bOPiOS\b/.test(ua)) {
            description.push('running in Turbo/Uncompressed mode');
          } // Detect IE Mobile 11.


          if (name == 'IE' && /\blike iPhone OS\b/.test(ua)) {
            data = parse(ua.replace(/like iPhone OS/, ''));
            manufacturer = data.manufacturer;
            product = data.product;
          } // Detect iOS.
          else if (/^iP/.test(product)) {
              name || (name = 'Safari');
              os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua)) ? ' ' + data[1].replace(/_/g, '.') : '');
            } // Detect Kubuntu.
            else if (name == 'Konqueror' && !/buntu/i.test(os)) {
                os = 'Kubuntu';
              } // Detect Android browsers.
              else if (manufacturer && manufacturer != 'Google' && (/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua) || /\bVita\b/.test(product)) || /\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua)) {
                  name = 'Android Browser';
                  os = /\bAndroid\b/.test(os) ? os : 'Android';
                } // Detect Silk desktop/accelerated modes.
                else if (name == 'Silk') {
                    if (!/\bMobi/i.test(ua)) {
                      os = 'Android';
                      description.unshift('desktop mode');
                    }

                    if (/Accelerated *= *true/i.test(ua)) {
                      description.unshift('accelerated');
                    }
                  } // Detect PaleMoon identifying as Firefox.
                  else if (name == 'PaleMoon' && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
                      description.push('identifying as Firefox ' + data[1]);
                    } // Detect Firefox OS and products running Firefox.
                    else if (name == 'Firefox' && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
                        os || (os = 'Firefox OS');
                        product || (product = data[1]);
                      } // Detect false positives for Firefox/Safari.
                      else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
                          // Escape the `/` for Firefox 1.
                          if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {
                            // Clear name of false positives.
                            name = null;
                          } // Reassign a generic name.


                          if ((data = product || manufacturer || os) && (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
                            name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + ' Browser';
                          }
                        } // Add Chrome version to description for Electron.
                        else if (name == 'Electron' && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {
                            description.push('Chromium ' + data);
                          } // Detect non-Opera (Presto-based) versions (order is important).


          if (!version) {
            version = getVersion(['(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))', 'Version', qualify(name), '(?:Firefox|Minefield|NetFront)']);
          } // Detect stubborn layout engines.


          if (data = layout == 'iCab' && parseFloat(version) > 3 && 'WebKit' || /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? 'Blink' : 'Presto') || /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && 'WebKit' || !layout && /\bMSIE\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident') || layout == 'WebKit' && /\bPlayStation\b(?! Vita\b)/i.test(name) && 'NetFront') {
            layout = [data];
          } // Detect Windows Phone 7 desktop mode.


          if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
            name += ' Mobile';
            os = 'Windows Phone ' + (/\+$/.test(data) ? data : data + '.x');
            description.unshift('desktop mode');
          } // Detect Windows Phone 8.x desktop mode.
          else if (/\bWPDesktop\b/i.test(ua)) {
              name = 'IE Mobile';
              os = 'Windows Phone 8.x';
              description.unshift('desktop mode');
              version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
            } // Detect IE 11 identifying as other browsers.
            else if (name != 'IE' && layout == 'Trident' && (data = /\brv:([\d.]+)/.exec(ua))) {
                if (name) {
                  description.push('identifying as ' + name + (version ? ' ' + version : ''));
                }

                name = 'IE';
                version = data[1];
              } // Leverage environment features.


          if (useFeatures) {
            // Detect server-side environments.
            // Rhino has a global function while others have a global object.
            if (isHostType(context, 'global')) {
              if (java) {
                data = java.lang.System;
                arch = data.getProperty('os.arch');
                os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');
              }

              if (rhino) {
                try {
                  version = context.require('ringo/engine').version.join('.');
                  name = 'RingoJS';
                } catch (e) {
                  if ((data = context.system) && data.global.system == context.system) {
                    name = 'Narwhal';
                    os || (os = data[0].os || null);
                  }
                }

                if (!name) {
                  name = 'Rhino';
                }
              } else if (typeof context.process == 'object' && !context.process.browser && (data = context.process)) {
                if (typeof data.versions == 'object') {
                  if (typeof data.versions.electron == 'string') {
                    description.push('Node ' + data.versions.node);
                    name = 'Electron';
                    version = data.versions.electron;
                  } else if (typeof data.versions.nw == 'string') {
                    description.push('Chromium ' + version, 'Node ' + data.versions.node);
                    name = 'NW.js';
                    version = data.versions.nw;
                  }
                }

                if (!name) {
                  name = 'Node.js';
                  arch = data.arch;
                  os = data.platform;
                  version = /[\d.]+/.exec(data.version);
                  version = version ? version[0] : null;
                }
              }
            } // Detect Adobe AIR.
            else if (getClassOf(data = context.runtime) == airRuntimeClass) {
                name = 'Adobe AIR';
                os = data.flash.system.Capabilities.os;
              } // Detect PhantomJS.
              else if (getClassOf(data = context.phantom) == phantomClass) {
                  name = 'PhantomJS';
                  version = (data = data.version || null) && data.major + '.' + data.minor + '.' + data.patch;
                } // Detect IE compatibility modes.
                else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {
                    // We're in compatibility mode when the Trident version + 4 doesn't
                    // equal the document mode.
                    version = [version, doc.documentMode];

                    if ((data = +data[1] + 4) != version[1]) {
                      description.push('IE ' + version[1] + ' mode');
                      layout && (layout[1] = '');
                      version[1] = data;
                    }

                    version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
                  } // Detect IE 11 masking as other browsers.
                  else if (typeof doc.documentMode == 'number' && /^(?:Chrome|Firefox)\b/.test(name)) {
                      description.push('masking as ' + name + ' ' + version);
                      name = 'IE';
                      version = '11.0';
                      layout = ['Trident'];
                      os = 'Windows';
                    }

            os = os && format(os);
          } // Detect prerelease phases.


          if (version && (data = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) || /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) || /\bMinefield\b/i.test(ua) && 'a')) {
            prerelease = /b/i.test(data) ? 'beta' : 'alpha';
            version = version.replace(RegExp(data + '\\+?$'), '') + (prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');
          } // Detect Firefox Mobile.


          if (name == 'Fennec' || name == 'Firefox' && /\b(?:Android|Firefox OS)\b/.test(os)) {
            name = 'Firefox Mobile';
          } // Obscure Maxthon's unreliable version.
          else if (name == 'Maxthon' && version) {
              version = version.replace(/\.[\d.]+/, '.x');
            } // Detect Xbox 360 and Xbox One.
            else if (/\bXbox\b/i.test(product)) {
                if (product == 'Xbox 360') {
                  os = null;
                }

                if (product == 'Xbox 360' && /\bIEMobile\b/.test(ua)) {
                  description.unshift('mobile mode');
                }
              } // Add mobile postfix.
              else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) && (os == 'Windows CE' || /Mobi/i.test(ua))) {
                  name += ' Mobile';
                } // Detect IE platform preview.
                else if (name == 'IE' && useFeatures) {
                    try {
                      if (context.external === null) {
                        description.unshift('platform preview');
                      }
                    } catch (e) {
                      description.unshift('embedded');
                    }
                  } // Detect BlackBerry OS version.
                  // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp
                  else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data = (RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] || version)) {
                      data = [data, /BB10/.test(ua)];
                      os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];
                      version = null;
                    } // Detect Opera identifying/masking itself as another browser.
                    // http://www.opera.com/support/kb/view/843/
                    else if (this != forOwn && product != 'Wii' && (useFeatures && opera || /Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua) || name == 'Firefox' && /\bOS X (?:\d+\.){2,}/.test(os) || name == 'IE' && (os && !/^Win/.test(os) && version > 5.5 || /\bWindows XP\b/.test(os) && version > 8 || version == 8 && !/\bTrident\b/.test(ua))) && !reOpera.test(data = parse.call(forOwn, ua.replace(reOpera, '') + ';')) && data.name) {
                        // When "identifying", the UA contains both Opera and the other browser's name.
                        data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');

                        if (reOpera.test(name)) {
                          if (/\bIE\b/.test(data) && os == 'Mac OS') {
                            os = null;
                          }

                          data = 'identify' + data;
                        } // When "masking", the UA contains only the other browser's name.
                        else {
                            data = 'mask' + data;

                            if (operaClass) {
                              name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));
                            } else {
                              name = 'Opera';
                            }

                            if (/\bIE\b/.test(data)) {
                              os = null;
                            }

                            if (!useFeatures) {
                              version = null;
                            }
                          }

                        layout = ['Presto'];
                        description.push(data);
                      } // Detect WebKit Nightly and approximate Chrome/Safari versions.


          if (data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1]) {
            // Correct build number for numeric comparison.
            // (e.g. "532.5" becomes "532.05")
            data = [parseFloat(data.replace(/\.(\d)$/, '.0$1')), data]; // Nightly builds are postfixed with a "+".

            if (name == 'Safari' && data[1].slice(-1) == '+') {
              name = 'WebKit Nightly';
              prerelease = 'alpha';
              version = data[1].slice(0, -1);
            } // Clear incorrect browser versions.
            else if (version == data[1] || version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
                version = null;
              } // Use the full Chrome version when available.


            data[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1]; // Detect Blink layout engine.

            if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == 'WebKit') {
              layout = ['Blink'];
            } // Detect JavaScriptCore.
            // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi


            if (!useFeatures || !likeChrome && !data[1]) {
              layout && (layout[1] = 'like Safari');
              data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : '8');
            } else {
              layout && (layout[1] = 'like Chrome');
              data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');
            } // Add the postfix of ".x" or "+" for approximate versions.


            layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+')); // Obscure version for some Safari 1-2 releases.

            if (name == 'Safari' && (!version || parseInt(version) > 45)) {
              version = data;
            }
          } // Detect Opera desktop modes.


          if (name == 'Opera' && (data = /\bzbov|zvav$/.exec(os))) {
            name += ' ';
            description.unshift('desktop mode');

            if (data == 'zvav') {
              name += 'Mini';
              version = null;
            } else {
              name += 'Mobile';
            }

            os = os.replace(RegExp(' *' + data + '$'), '');
          } // Detect Chrome desktop mode.
          else if (name == 'Safari' && /\bChrome\b/.exec(layout && layout[1])) {
              description.unshift('desktop mode');
              name = 'Chrome Mobile';
              version = null;

              if (/\bOS X\b/.test(os)) {
                manufacturer = 'Apple';
                os = 'iOS 4.3+';
              } else {
                os = null;
              }
            } // Strip incorrect OS versions.


          if (version && version.indexOf(data = /[\d.]+$/.exec(os)) == 0 && ua.indexOf('/' + data + '-') > -1) {
            os = trim(os.replace(data, ''));
          } // Add layout engine.


          if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (/Browser|Lunascape|Maxthon/.test(name) || name != 'Safari' && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(name) && layout[1])) {
            // Don't add layout details to description if they are falsey.
            (data = layout[layout.length - 1]) && description.push(data);
          } // Combine contextual information.


          if (description.length) {
            description = ['(' + description.join('; ') + ')'];
          } // Append manufacturer to description.


          if (manufacturer && product && product.indexOf(manufacturer) < 0) {
            description.push('on ' + manufacturer);
          } // Append product to description.


          if (product) {
            description.push((/^on /.test(description[description.length - 1]) ? '' : 'on ') + product);
          } // Parse the OS into an object.


          if (os) {
            data = / ([\d.+]+)$/.exec(os);
            isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';
            os = {
              'architecture': 32,
              'family': data && !isSpecialCasedOS ? os.replace(data[0], '') : os,
              'version': data ? data[1] : null,
              'toString': function toString() {
                var version = this.version;
                return this.family + (version && !isSpecialCasedOS ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');
              }
            };
          } // Add browser/OS architecture.


          if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
            if (os) {
              os.architecture = 64;
              os.family = os.family.replace(RegExp(' *' + data), '');
            }

            if (name && (/\bWOW64\b/i.test(ua) || useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua))) {
              description.unshift('32-bit');
            }
          } // Chrome 39 and above on OS X is always 64-bit.
          else if (os && /^OS X/.test(os.family) && name == 'Chrome' && parseFloat(version) >= 39) {
              os.architecture = 64;
            }

          ua || (ua = null);
          /*------------------------------------------------------------------------*/

          /**
           * The platform object.
           *
           * @name platform
           * @type Object
           */

          var platform = {};
          /**
           * The platform description.
           *
           * @memberOf platform
           * @type string|null
           */

          platform.description = ua;
          /**
           * The name of the browser's layout engine.
           *
           * The list of common layout engines include:
           * "Blink", "EdgeHTML", "Gecko", "Trident" and "WebKit"
           *
           * @memberOf platform
           * @type string|null
           */

          platform.layout = layout && layout[0];
          /**
           * The name of the product's manufacturer.
           *
           * The list of manufacturers include:
           * "Apple", "Archos", "Amazon", "Asus", "Barnes & Noble", "BlackBerry",
           * "Google", "HP", "HTC", "LG", "Microsoft", "Motorola", "Nintendo",
           * "Nokia", "Samsung" and "Sony"
           *
           * @memberOf platform
           * @type string|null
           */

          platform.manufacturer = manufacturer;
          /**
           * The name of the browser/environment.
           *
           * The list of common browser names include:
           * "Chrome", "Electron", "Firefox", "Firefox for iOS", "IE",
           * "Microsoft Edge", "PhantomJS", "Safari", "SeaMonkey", "Silk",
           * "Opera Mini" and "Opera"
           *
           * Mobile versions of some browsers have "Mobile" appended to their name:
           * eg. "Chrome Mobile", "Firefox Mobile", "IE Mobile" and "Opera Mobile"
           *
           * @memberOf platform
           * @type string|null
           */

          platform.name = name;
          /**
           * The alpha/beta release indicator.
           *
           * @memberOf platform
           * @type string|null
           */

          platform.prerelease = prerelease;
          /**
           * The name of the product hosting the browser.
           *
           * The list of common products include:
           *
           * "BlackBerry", "Galaxy S4", "Lumia", "iPad", "iPod", "iPhone", "Kindle",
           * "Kindle Fire", "Nexus", "Nook", "PlayBook", "TouchPad" and "Transformer"
           *
           * @memberOf platform
           * @type string|null
           */

          platform.product = product;
          /**
           * The browser's user agent string.
           *
           * @memberOf platform
           * @type string|null
           */

          platform.ua = ua;
          /**
           * The browser/environment version.
           *
           * @memberOf platform
           * @type string|null
           */

          platform.version = name && version;
          /**
           * The name of the operating system.
           *
           * @memberOf platform
           * @type Object
           */

          platform.os = os || {
            /**
             * The CPU architecture the OS is built for.
             *
             * @memberOf platform.os
             * @type number|null
             */
            'architecture': null,

            /**
             * The family of the OS.
             *
             * Common values include:
             * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
             * "Windows XP", "OS X", "Ubuntu", "Debian", "Fedora", "Red Hat", "SuSE",
             * "Android", "iOS" and "Windows Phone"
             *
             * @memberOf platform.os
             * @type string|null
             */
            'family': null,

            /**
             * The version of the OS.
             *
             * @memberOf platform.os
             * @type string|null
             */
            'version': null,

            /**
             * Returns the OS string.
             *
             * @memberOf platform.os
             * @returns {string} The OS string.
             */
            'toString': function toString() {
              return 'null';
            }
          };
          platform.parse = parse;
          platform.toString = toStringPlatform;

          if (platform.version) {
            description.unshift(version);
          }

          if (platform.name) {
            description.unshift(name);
          }

          if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {
            description.push(product ? '(' + os + ')' : 'on ' + os);
          }

          if (description.length) {
            platform.description = description.join(' ');
          }

          return platform;
        }
        /*--------------------------------------------------------------------------*/
        // Export platform.


        var platform = parse(); // Some AMD build optimizers, like r.js, check for condition patterns like the following:

        if (true) {
          // Expose platform on the global object to prevent errors when platform is
          // loaded by a script tag in the presence of an AMD loader.
          // See http://requirejs.org/docs/errors.html#mismatch for more details.
          root.platform = platform; // Define as an anonymous module so platform can be aliased through path mapping.

          !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return platform;
          }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
        else {}
      }).call(this);
      /* WEBPACK VAR INJECTION */
    }).call(this, __webpack_require__(
    /*! ./../webpack/buildin/module.js */
    "./node_modules/webpack/buildin/module.js")(module));
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/session/session.page.html":
  /*!*********************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/session/session.page.html ***!
    \*********************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppSessionSessionPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar color=\"dark\">\n    <ion-title>{{meetingName}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-fab id=\"fab-meeting-options\" vertical=\"top\" horizontal=\"end\" slot=\"fixed\">\n  <ion-fab-button id=\"fab-list-activator\">\n    <ion-icon name=\"arrow-down-circle\"></ion-icon>\n  </ion-fab-button>\n  <ion-fab-list side=\"bottom\">\n    <ion-fab-button (click)=\"shareAlert()\" id=\"share-icon\">\n      <ion-icon name=\"share-social\"></ion-icon>\n    </ion-fab-button>\n    <ion-fab-button (click)=\"goToSlide(2)\" id=\"whiteboard-icon\">\n      <ion-icon name=\"pencil\"></ion-icon>\n    </ion-fab-button>\n    <ion-fab-button (click)=\"goToSlide(0)\" id=\"chat-icon\">\n      <ion-icon name=\"chatbox\"></ion-icon>\n    </ion-fab-button>\n    <ion-fab-button (click)=\"toggleVideo()\" id=\"video-icon\">\n      <i class=\"fas fa-video-slash\" *ngIf=\"!video\"></i>\n      <i class=\"fas fa-video\" *ngIf=\"video\"></i>\n    </ion-fab-button>\n    <ion-fab-button (click)=\"toggleAudio()\" id=\"audio-icon\">\n      <ion-icon name=\"mic\" *ngIf=\"audio\"></ion-icon>\n      <ion-icon name=\"mic-off\" *ngIf=\"!audio\"></ion-icon>\n    </ion-fab-button>\n    <ion-fab-button (click)=\"leaveSession()\" id=\"end-call-icon\">\n      <ion-icon name=\"call\" class=\"end-call-icon\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab-list>\n</ion-fab>\n\n<ion-content>\n  <ion-slides [options]=\"slidesOptions\" (ionSlideDidChange)=\"slideChanged()\" #slides>\n    <ion-slide>\n      <ion-list id=\"participant_list\">\n        <ion-list-header id=\"participant-list-header\">\n          <ion-label class=\"white-text\">Participant List</ion-label>\n        </ion-list-header>\n        <ion-item *ngFor=\"let participant of participantList\" class=\"white-text\">\n          <ion-label>{{participant.nickName}}</ion-label>\n        </ion-item>\n      </ion-list>\n    </ion-slide>\n    <ion-slide>\n      <h1 class=\"white-text\">CHAT</h1>\n    </ion-slide>\n    <ion-slide>\n      <ion-grid>\n        <ion-row>\n          <ion-col size=\"6\">\n            <div *ngIf=\"publisher\" class=\"stream-container\">\n              <user-video [streamManager]=\"publisher\"></user-video>\n            </div>\n          </ion-col>\n          <ion-col size=\"6\" *ngFor=\"let sub of subscribers\">\n            <div class=\"stream-container\">\n              <user-video [streamManager]=\"sub\"></user-video>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-slide>\n    <ion-slide>\n      <h1 class=\"white-text\">Whiteboard</h1>\n    </ion-slide>\n  </ion-slides>\n</ion-content>";
    /***/
  },

  /***/
  "./node_modules/webpack/buildin/module.js":
  /*!***********************************!*\
    !*** (webpack)/buildin/module.js ***!
    \***********************************/

  /*! no static exports found */

  /***/
  function node_modulesWebpackBuildinModuleJs(module, exports) {
    module.exports = function (module) {
      if (!module.webpackPolyfill) {
        module.deprecate = function () {};

        module.paths = []; // module.parent = undefined by default

        if (!module.children) module.children = [];
        Object.defineProperty(module, "loaded", {
          enumerable: true,
          get: function get() {
            return module.l;
          }
        });
        Object.defineProperty(module, "id", {
          enumerable: true,
          get: function get() {
            return module.i;
          }
        });
        module.webpackPolyfill = 1;
      }

      return module;
    };
    /***/

  },

  /***/
  "./node_modules/wildemitter/wildemitter.js":
  /*!*************************************************!*\
    !*** ./node_modules/wildemitter/wildemitter.js ***!
    \*************************************************/

  /*! no static exports found */

  /***/
  function node_modulesWildemitterWildemitterJs(module, exports) {
    /*
    WildEmitter.js is a slim little event emitter by @henrikjoreteg largely based
    on @visionmedia's Emitter from UI Kit.
    
    Why? I wanted it standalone.
    
    I also wanted support for wildcard emitters like this:
    
    emitter.on('*', function (eventName, other, event, payloads) {
    
    });
    
    emitter.on('somenamespace*', function (eventName, payloads) {
    
    });
    
    Please note that callbacks triggered by wildcard registered events also get
    the event name as the first argument.
    */
    module.exports = WildEmitter;

    function WildEmitter() {}

    WildEmitter.mixin = function (constructor) {
      var prototype = constructor.prototype || constructor;
      prototype.isWildEmitter = true; // Listen on the given `event` with `fn`. Store a group name if present.

      prototype.on = function (event, groupName, fn) {
        this.callbacks = this.callbacks || {};
        var hasGroup = arguments.length === 3,
            group = hasGroup ? arguments[1] : undefined,
            func = hasGroup ? arguments[2] : arguments[1];
        func._groupName = group;
        (this.callbacks[event] = this.callbacks[event] || []).push(func);
        return this;
      }; // Adds an `event` listener that will be invoked a single
      // time then automatically removed.


      prototype.once = function (event, groupName, fn) {
        var self = this,
            hasGroup = arguments.length === 3,
            group = hasGroup ? arguments[1] : undefined,
            func = hasGroup ? arguments[2] : arguments[1];

        function on() {
          self.off(event, on);
          func.apply(this, arguments);
        }

        this.on(event, group, on);
        return this;
      }; // Unbinds an entire group


      prototype.releaseGroup = function (groupName) {
        this.callbacks = this.callbacks || {};
        var item, i, len, handlers;

        for (item in this.callbacks) {
          handlers = this.callbacks[item];

          for (i = 0, len = handlers.length; i < len; i++) {
            if (handlers[i]._groupName === groupName) {
              //console.log('removing');
              // remove it and shorten the array we're looping through
              handlers.splice(i, 1);
              i--;
              len--;
            }
          }
        }

        return this;
      }; // Remove the given callback for `event` or all
      // registered callbacks.


      prototype.off = function (event, fn) {
        this.callbacks = this.callbacks || {};
        var callbacks = this.callbacks[event],
            i;
        if (!callbacks) return this; // remove all handlers

        if (arguments.length === 1) {
          delete this.callbacks[event];
          return this;
        } // remove specific handler


        i = callbacks.indexOf(fn);

        if (i !== -1) {
          callbacks.splice(i, 1);

          if (callbacks.length === 0) {
            delete this.callbacks[event];
          }
        }

        return this;
      }; /// Emit `event` with the given args.
      // also calls any `*` handlers


      prototype.emit = function (event) {
        this.callbacks = this.callbacks || {};
        var args = [].slice.call(arguments, 1),
            callbacks = this.callbacks[event],
            specialCallbacks = this.getWildcardCallbacks(event),
            i,
            len,
            item,
            listeners;

        if (callbacks) {
          listeners = callbacks.slice();

          for (i = 0, len = listeners.length; i < len; ++i) {
            if (!listeners[i]) {
              break;
            }

            listeners[i].apply(this, args);
          }
        }

        if (specialCallbacks) {
          len = specialCallbacks.length;
          listeners = specialCallbacks.slice();

          for (i = 0, len = listeners.length; i < len; ++i) {
            if (!listeners[i]) {
              break;
            }

            listeners[i].apply(this, [event].concat(args));
          }
        }

        return this;
      }; // Helper for for finding special wildcard event handlers that match the event


      prototype.getWildcardCallbacks = function (eventName) {
        this.callbacks = this.callbacks || {};
        var item,
            split,
            result = [];

        for (item in this.callbacks) {
          split = item.split('*');

          if (item === '*' || split.length === 2 && eventName.slice(0, split[0].length) === split[0]) {
            result = result.concat(this.callbacks[item]);
          }
        }

        return result;
      };
    };

    WildEmitter.mixin(WildEmitter);
    /***/
  },

  /***/
  "./node_modules/wolfy87-eventemitter/EventEmitter.js":
  /*!***********************************************************!*\
    !*** ./node_modules/wolfy87-eventemitter/EventEmitter.js ***!
    \***********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesWolfy87EventemitterEventEmitterJs(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    /*!
    * EventEmitter v5.2.9 - git.io/ee
    * Unlicense - http://unlicense.org/
    * Oliver Caldwell - https://oli.me.uk/
    * @preserve
    */


    ;

    (function (exports) {
      'use strict';
      /**
       * Class for managing events.
       * Can be extended to provide event functionality in other classes.
       *
       * @class EventEmitter Manages event registering and emitting.
       */

      function EventEmitter() {} // Shortcuts to improve speed and size


      var proto = EventEmitter.prototype;
      var originalGlobalValue = exports.EventEmitter;
      /**
       * Finds the index of the listener for the event in its storage array.
       *
       * @param {Function[]} listeners Array of listeners to search through.
       * @param {Function} listener Method to look for.
       * @return {Number} Index of the specified listener, -1 if not found
       * @api private
       */

      function indexOfListener(listeners, listener) {
        var i = listeners.length;

        while (i--) {
          if (listeners[i].listener === listener) {
            return i;
          }
        }

        return -1;
      }
      /**
       * Alias a method while keeping the context correct, to allow for overwriting of target method.
       *
       * @param {String} name The name of the target method.
       * @return {Function} The aliased method
       * @api private
       */


      function alias(name) {
        return function aliasClosure() {
          return this[name].apply(this, arguments);
        };
      }
      /**
       * Returns the listener array for the specified event.
       * Will initialise the event object and listener arrays if required.
       * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
       * Each property in the object response is an array of listener functions.
       *
       * @param {String|RegExp} evt Name of the event to return the listeners from.
       * @return {Function[]|Object} All listener functions for the event.
       */


      proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();

        var response;
        var key; // Return a concatenated array of all matching events if
        // the selector is a regular expression.

        if (evt instanceof RegExp) {
          response = {};

          for (key in events) {
            if (events.hasOwnProperty(key) && evt.test(key)) {
              response[key] = events[key];
            }
          }
        } else {
          response = events[evt] || (events[evt] = []);
        }

        return response;
      };
      /**
       * Takes a list of listener objects and flattens it into a list of listener functions.
       *
       * @param {Object[]} listeners Raw listener objects.
       * @return {Function[]} Just the listener functions.
       */


      proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
          flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
      };
      /**
       * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
       *
       * @param {String|RegExp} evt Name of the event to return the listeners from.
       * @return {Object} All listener functions for an event in an object.
       */


      proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
          response = {};
          response[evt] = listeners;
        }

        return response || listeners;
      };

      function isValidListener(listener) {
        if (typeof listener === 'function' || listener instanceof RegExp) {
          return true;
        } else if (listener && typeof listener === 'object') {
          return isValidListener(listener.listener);
        } else {
          return false;
        }
      }
      /**
       * Adds a listener function to the specified event.
       * The listener will not be added if it is a duplicate.
       * If the listener returns true then it will be removed after it is called.
       * If you pass a regular expression as the event name then the listener will be added to all events that match it.
       *
       * @param {String|RegExp} evt Name of the event to attach the listener to.
       * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
       * @return {Object} Current instance of EventEmitter for chaining.
       */


      proto.addListener = function addListener(evt, listener) {
        if (!isValidListener(listener)) {
          throw new TypeError('listener must be a function');
        }

        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
          if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
            listeners[key].push(listenerIsWrapped ? listener : {
              listener: listener,
              once: false
            });
          }
        }

        return this;
      };
      /**
       * Alias of addListener
       */


      proto.on = alias('addListener');
      /**
       * Semi-alias of addListener. It will add a listener that will be
       * automatically removed after its first execution.
       *
       * @param {String|RegExp} evt Name of the event to attach the listener to.
       * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
       * @return {Object} Current instance of EventEmitter for chaining.
       */

      proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
          listener: listener,
          once: true
        });
      };
      /**
       * Alias of addOnceListener.
       */


      proto.once = alias('addOnceListener');
      /**
       * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
       * You need to tell it what event names should be matched by a regex.
       *
       * @param {String} evt Name of the event to create.
       * @return {Object} Current instance of EventEmitter for chaining.
       */

      proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
      };
      /**
       * Uses defineEvent to define multiple events.
       *
       * @param {String[]} evts An array of event names to define.
       * @return {Object} Current instance of EventEmitter for chaining.
       */


      proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
          this.defineEvent(evts[i]);
        }

        return this;
      };
      /**
       * Removes a listener function from the specified event.
       * When passed a regular expression as the event name, it will remove the listener from all events that match it.
       *
       * @param {String|RegExp} evt Name of the event to remove the listener from.
       * @param {Function} listener Method to remove from the event.
       * @return {Object} Current instance of EventEmitter for chaining.
       */


      proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
          if (listeners.hasOwnProperty(key)) {
            index = indexOfListener(listeners[key], listener);

            if (index !== -1) {
              listeners[key].splice(index, 1);
            }
          }
        }

        return this;
      };
      /**
       * Alias of removeListener
       */


      proto.off = alias('removeListener');
      /**
       * Adds listeners in bulk using the manipulateListeners method.
       * If you pass an object as the first argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
       * You can also pass it a regular expression to add the array of listeners to all events that match it.
       * Yeah, this function does quite a bit. That's probably a bad thing.
       *
       * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
       * @param {Function[]} [listeners] An optional array of listener functions to add.
       * @return {Object} Current instance of EventEmitter for chaining.
       */

      proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
      };
      /**
       * Removes listeners in bulk using the manipulateListeners method.
       * If you pass an object as the first argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
       * You can also pass it an event name and an array of listeners to be removed.
       * You can also pass it a regular expression to remove the listeners from all events that match it.
       *
       * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
       * @param {Function[]} [listeners] An optional array of listener functions to remove.
       * @return {Object} Current instance of EventEmitter for chaining.
       */


      proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
      };
      /**
       * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
       * The first argument will determine if the listeners are removed (true) or added (false).
       * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
       * You can also pass it an event name and an array of listeners to be added/removed.
       * You can also pass it a regular expression to manipulate the listeners of all events that match it.
       *
       * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
       * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
       * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
       * @return {Object} Current instance of EventEmitter for chaining.
       */


      proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners; // If evt is an object then pass each of its properties to this method

        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
          for (i in evt) {
            if (evt.hasOwnProperty(i) && (value = evt[i])) {
              // Pass the single listener straight through to the singular method
              if (typeof value === 'function') {
                single.call(this, i, value);
              } else {
                // Otherwise pass back to the multiple function
                multiple.call(this, i, value);
              }
            }
          }
        } else {
          // So evt must be a string
          // And listeners must be an array of listeners
          // Loop over it and pass each one to the multiple method
          i = listeners.length;

          while (i--) {
            single.call(this, evt, listeners[i]);
          }
        }

        return this;
      };
      /**
       * Removes all listeners from a specified event.
       * If you do not specify an event then all listeners will be removed.
       * That means every event will be emptied.
       * You can also pass a regex to remove all events that match it.
       *
       * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
       * @return {Object} Current instance of EventEmitter for chaining.
       */


      proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;

        var events = this._getEvents();

        var key; // Remove different things depending on the state of evt

        if (type === 'string') {
          // Remove all listeners for the specified event
          delete events[evt];
        } else if (evt instanceof RegExp) {
          // Remove all events matching the regex.
          for (key in events) {
            if (events.hasOwnProperty(key) && evt.test(key)) {
              delete events[key];
            }
          }
        } else {
          // Remove all listeners in all events
          delete this._events;
        }

        return this;
      };
      /**
       * Alias of removeEvent.
       *
       * Added to mirror the node API.
       */


      proto.removeAllListeners = alias('removeEvent');
      /**
       * Emits an event of your choice.
       * When emitted, every listener attached to that event will be executed.
       * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
       * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
       * So they will not arrive within the array on the other side, they will be separate.
       * You can also pass a regular expression to emit to all events that match it.
       *
       * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
       * @param {Array} [args] Optional array of arguments to be passed to each listener.
       * @return {Object} Current instance of EventEmitter for chaining.
       */

      proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;

        for (key in listenersMap) {
          if (listenersMap.hasOwnProperty(key)) {
            listeners = listenersMap[key].slice(0);

            for (i = 0; i < listeners.length; i++) {
              // If the listener returns true then it shall be removed from the event
              // The function is executed either with a basic call or an apply if there is an args array
              listener = listeners[i];

              if (listener.once === true) {
                this.removeListener(evt, listener.listener);
              }

              response = listener.listener.apply(this, args || []);

              if (response === this._getOnceReturnValue()) {
                this.removeListener(evt, listener.listener);
              }
            }
          }
        }

        return this;
      };
      /**
       * Alias of emitEvent
       */


      proto.trigger = alias('emitEvent');
      /**
       * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
       * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
       *
       * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
       * @param {...*} Optional additional arguments to be passed to each listener.
       * @return {Object} Current instance of EventEmitter for chaining.
       */

      proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
      };
      /**
       * Sets the current value to check against when executing listeners. If a
       * listeners return value matches the one set here then it will be removed
       * after execution. This value defaults to true.
       *
       * @param {*} value The new value to check for when executing listeners.
       * @return {Object} Current instance of EventEmitter for chaining.
       */


      proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
      };
      /**
       * Fetches the current value to check against when executing listeners. If
       * the listeners return value matches this one then it should be removed
       * automatically. It will return true by default.
       *
       * @return {*|Boolean} The current value to check for or the default, true.
       * @api private
       */


      proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
          return this._onceReturnValue;
        } else {
          return true;
        }
      };
      /**
       * Fetches the events object and creates one if required.
       *
       * @return {Object} The events storage object.
       * @api private
       */


      proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
      };
      /**
       * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
       *
       * @return {Function} Non conflicting EventEmitter class.
       */


      EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
      }; // Expose the class either via AMD, CommonJS or the global object


      if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
          return EventEmitter;
        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
      } else {}
    })(typeof window !== 'undefined' ? window : this || {});
    /***/

  },

  /***/
  "./src/app/session/session-routing.module.ts":
  /*!***************************************************!*\
    !*** ./src/app/session/session-routing.module.ts ***!
    \***************************************************/

  /*! exports provided: SessionPageRoutingModule */

  /***/
  function srcAppSessionSessionRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SessionPageRoutingModule", function () {
      return SessionPageRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _session_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./session.page */
    "./src/app/session/session.page.ts");

    var routes = [{
      path: '',
      component: _session_page__WEBPACK_IMPORTED_MODULE_3__["SessionPage"]
    }];

    var SessionPageRoutingModule = function SessionPageRoutingModule() {
      _classCallCheck(this, SessionPageRoutingModule);
    };

    SessionPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], SessionPageRoutingModule);
    /***/
  },

  /***/
  "./src/app/session/session.module.ts":
  /*!*******************************************!*\
    !*** ./src/app/session/session.module.ts ***!
    \*******************************************/

  /*! exports provided: SessionPageModule */

  /***/
  function srcAppSessionSessionModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SessionPageModule", function () {
      return SessionPageModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
    /* harmony import */


    var _session_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./session-routing.module */
    "./src/app/session/session-routing.module.ts");
    /* harmony import */


    var _session_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./session.page */
    "./src/app/session/session.page.ts");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @ionic-native/android-permissions/ngx */
    "./node_modules/@ionic-native/android-permissions/__ivy_ngcc__/ngx/index.js");
    /* harmony import */


    var _ionic_native_splash_screen_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @ionic-native/splash-screen/ngx */
    "./node_modules/@ionic-native/splash-screen/__ivy_ngcc__/ngx/index.js");
    /* harmony import */


    var _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @ionic-native/status-bar/ngx */
    "./node_modules/@ionic-native/status-bar/__ivy_ngcc__/ngx/index.js");
    /* harmony import */


    var _ov_video_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! ../ov-video.component */
    "./src/app/ov-video.component.ts");
    /* harmony import */


    var _user_video_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! ../user-video.component */
    "./src/app/user-video.component.ts"); // <config-file mode="merge" parent="/*" target="AndroidManifest.xml">
    // <uses-permission android:name="android.permission.CAMERA" />
    // <uses-permission android:name="android.permission.RECORD_AUDIO" />
    // <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    // </config-file>


    var SessionPageModule = function SessionPageModule() {
      _classCallCheck(this, SessionPageModule);
    };

    SessionPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_session_page__WEBPACK_IMPORTED_MODULE_6__["SessionPage"], _user_video_component__WEBPACK_IMPORTED_MODULE_13__["UserVideoComponent"], _ov_video_component__WEBPACK_IMPORTED_MODULE_12__["OpenViduVideoComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _session_routing_module__WEBPACK_IMPORTED_MODULE_5__["SessionPageRoutingModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"].forRoot()],
      providers: [_ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_11__["StatusBar"], _ionic_native_splash_screen_ngx__WEBPACK_IMPORTED_MODULE_10__["SplashScreen"], {
        provide: _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouteReuseStrategy"],
        useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicRouteStrategy"]
      }, _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_9__["AndroidPermissions"]]
    })], SessionPageModule);
    /***/
  },

  /***/
  "./src/app/session/session.page.scss":
  /*!*******************************************!*\
    !*** ./src/app/session/session.page.scss ***!
    \*******************************************/

  /*! exports provided: default */

  /***/
  function srcAppSessionSessionPageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".end-call-icon {\n  transform: rotate(135deg);\n}\n\n.white-text {\n  --color: white;\n  color: white;\n}\n\n#fab-meeting-options {\n  margin: 15px;\n  margin-left: auto;\n}\n\n.alert-message .alert-wrapper {\n  --color: white;\n}\n\nion-slide {\n  align-items: flex-start;\n}\n\nion-fab-button {\n  --color: white;\n}\n\n#fab-list-activator {\n  --background: #fff;\n  --color: #000;\n}\n\n#share-icon {\n  --background: var(--ion-color-warning);\n}\n\n#whiteboard-icon {\n  --background: #dca6f5;\n}\n\n#chat-icon {\n  --background: #9eb5db;\n}\n\n#video-icon {\n  --background: var(--ion-color-tertiary);\n}\n\n#audio-icon {\n  --background: var(--ion-color-secondary);\n}\n\n#end-call-icon {\n  --background: var(--ion-color-danger);\n}\n\n#participant-list-header {\n  font-size: 200%;\n}\n\n#participant_list {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FwdXRyb24vRGVza3RvcC9LcmlzaG5hL0FwcF9Jb25pY19CS1IvQktSL3NyYy9hcHAvc2Vzc2lvbi9zZXNzaW9uLnBhZ2Uuc2NzcyIsInNyYy9hcHAvc2Vzc2lvbi9zZXNzaW9uLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHlCQUFBO0FDQ0o7O0FERUE7RUFDSSxjQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREVBO0VBQ0ksWUFBQTtFQUNBLGlCQUFBO0FDQ0o7O0FERUE7RUFDSSxjQUFBO0FDQ0o7O0FERUE7RUFDSSx1QkFBQTtBQ0NKOztBREVBO0VBQ0ksY0FBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7RUFDQSxhQUFBO0FDQ0o7O0FERUE7RUFDSSxzQ0FBQTtBQ0NKOztBREVBO0VBQ0kscUJBQUE7QUNDSjs7QURFQTtFQUNJLHFCQUFBO0FDQ0o7O0FERUE7RUFDSSx1Q0FBQTtBQ0NKOztBREVBO0VBQ0ksd0NBQUE7QUNDSjs7QURFQTtFQUNJLHFDQUFBO0FDQ0o7O0FERUE7RUFDSSxlQUFBO0FDQ0o7O0FERUE7RUFDSSxXQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9zZXNzaW9uL3Nlc3Npb24ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmVuZC1jYWxsLWljb24ge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDEzNWRlZyk7XG59XG5cbi53aGl0ZS10ZXh0IHtcbiAgICAtLWNvbG9yOiB3aGl0ZTtcbiAgICBjb2xvcjogd2hpdGU7XG59XG5cbiNmYWItbWVldGluZy1vcHRpb25zIHtcbiAgICBtYXJnaW46IDE1cHg7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG59XG5cbi5hbGVydC1tZXNzYWdlIC5hbGVydC13cmFwcGVyIHtcbiAgICAtLWNvbG9yOiB3aGl0ZTtcbn1cblxuaW9uLXNsaWRlIHtcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbn1cblxuaW9uLWZhYi1idXR0b24ge1xuICAgIC0tY29sb3I6IHdoaXRlO1xufVxuXG4jZmFiLWxpc3QtYWN0aXZhdG9yIHtcbiAgICAtLWJhY2tncm91bmQ6ICNmZmY7XG4gICAgLS1jb2xvcjogIzAwMDtcbn1cblxuI3NoYXJlLWljb24ge1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXdhcm5pbmcpO1xufVxuXG4jd2hpdGVib2FyZC1pY29uIHtcbiAgICAtLWJhY2tncm91bmQ6ICNkY2E2ZjU7XG59XG5cbiNjaGF0LWljb24ge1xuICAgIC0tYmFja2dyb3VuZDogIzllYjVkYjtcbn1cblxuI3ZpZGVvLWljb24ge1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5KTtcbn1cblxuI2F1ZGlvLWljb24ge1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG59XG5cbiNlbmQtY2FsbC1pY29uIHtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xufVxuXG4jcGFydGljaXBhbnQtbGlzdC1oZWFkZXIge1xuICAgIGZvbnQtc2l6ZTogMjAwJTtcbn1cblxuI3BhcnRpY2lwYW50X2xpc3Qge1xuICAgIHdpZHRoOiAxMDAlO1xufSIsIi5lbmQtY2FsbC1pY29uIHtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTM1ZGVnKTtcbn1cblxuLndoaXRlLXRleHQge1xuICAtLWNvbG9yOiB3aGl0ZTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4jZmFiLW1lZXRpbmctb3B0aW9ucyB7XG4gIG1hcmdpbjogMTVweDtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG59XG5cbi5hbGVydC1tZXNzYWdlIC5hbGVydC13cmFwcGVyIHtcbiAgLS1jb2xvcjogd2hpdGU7XG59XG5cbmlvbi1zbGlkZSB7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xufVxuXG5pb24tZmFiLWJ1dHRvbiB7XG4gIC0tY29sb3I6IHdoaXRlO1xufVxuXG4jZmFiLWxpc3QtYWN0aXZhdG9yIHtcbiAgLS1iYWNrZ3JvdW5kOiAjZmZmO1xuICAtLWNvbG9yOiAjMDAwO1xufVxuXG4jc2hhcmUtaWNvbiB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXdhcm5pbmcpO1xufVxuXG4jd2hpdGVib2FyZC1pY29uIHtcbiAgLS1iYWNrZ3JvdW5kOiAjZGNhNmY1O1xufVxuXG4jY2hhdC1pY29uIHtcbiAgLS1iYWNrZ3JvdW5kOiAjOWViNWRiO1xufVxuXG4jdmlkZW8taWNvbiB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5KTtcbn1cblxuI2F1ZGlvLWljb24ge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xufVxuXG4jZW5kLWNhbGwtaWNvbiB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XG59XG5cbiNwYXJ0aWNpcGFudC1saXN0LWhlYWRlciB7XG4gIGZvbnQtc2l6ZTogMjAwJTtcbn1cblxuI3BhcnRpY2lwYW50X2xpc3Qge1xuICB3aWR0aDogMTAwJTtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/session/session.page.ts":
  /*!*****************************************!*\
    !*** ./src/app/session/session.page.ts ***!
    \*****************************************/

  /*! exports provided: SessionPage */

  /***/
  function srcAppSessionSessionPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SessionPage", function () {
      return SessionPage;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
    /* harmony import */


    var _ionic_native_splash_screen_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @ionic-native/splash-screen/ngx */
    "./node_modules/@ionic-native/splash-screen/__ivy_ngcc__/ngx/index.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
    /* harmony import */


    var _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @ionic-native/android-permissions/ngx */
    "./node_modules/@ionic-native/android-permissions/__ivy_ngcc__/ngx/index.js");
    /* harmony import */


    var openvidu_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! openvidu-browser */
    "./node_modules/openvidu-browser/lib/index.js");
    /* harmony import */


    var openvidu_browser__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(openvidu_browser__WEBPACK_IMPORTED_MODULE_7__);

    var SessionPage = /*#__PURE__*/function () {
      function SessionPage(route, router, platform, splashScreen, httpClient, androidPermissions, alertController) {
        var _this2 = this;

        _classCallCheck(this, SessionPage);

        this.route = route;
        this.router = router;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.httpClient = httpClient;
        this.androidPermissions = androidPermissions;
        this.alertController = alertController;
        this.audio = true;
        this.video = true;
        this.subscribers = [];
        this.ANDROID_PERMISSIONS = [this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.RECORD_AUDIO, this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS];
        this.slidesOptions = {
          initialSlide: 2,
          speed: 200
        };
        this.participantList = [];
        this.connections_list = [];
        this.SERVER_URL = "https://192.168.1.16:5442";
        this.route.queryParams.subscribe(function (params) {
          if (_this2.router.getCurrentNavigation().extras.state) {
            _this2.data = _this2.router.getCurrentNavigation().extras.state.data;
            _this2.obj = _this2.router.getCurrentNavigation().extras.state.obj;

            _this2.initApp();
          } else {
            _this2.router.navigateByUrl("/");
          }
        });
      }

      _createClass(SessionPage, [{
        key: "initApp",
        value: function initApp() {
          var _this3 = this;

          this.platform.ready().then(function () {
            _this3.splashScreen.hide();

            if (_this3.platform.is('ios') && _this3.platform.is('cordova')) {
              cordova.plugins.iosrtc.registerGlobals();
            }
          });

          if (this.obj === "create") {
            this.meetingName = this.data.meetingName_form;
            this.meetingDesc = this.data.meetingDesc_form;
          } else {
            this.mySessionId = this.data.meetingId_form;
          }

          this.name = this.data.name_form;
          this.meetingCode = this.data.meetingCode_form;
          this.joinSession();
        }
      }, {
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "beforeunloadHandler",
        value: function beforeunloadHandler() {
          // On window closed leave session
          this.leaveSession();
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          // On component destroyed leave session
          this.leaveSession();
        }
      }, {
        key: "shareAlert",
        value: function shareAlert() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var message_alert, alert;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    message_alert = "Share this link: <a href='https://baatkarteraho.in/?todo=join&id_=" + this.mySessionId + "'>https://baatkarteraho.in/?todo=join&id_=" + this.mySessionId + "</a>\n OR \n Share this Meeting Id:" + this.mySessionId;
                    _context.next = 3;
                    return this.alertController.create({
                      cssClass: "alert-message",
                      header: "Share " + this.meetingName,
                      message: message_alert,
                      buttons: ["OK"]
                    });

                  case 3:
                    alert = _context.sent;
                    _context.next = 6;
                    return alert.present();

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }, {
        key: "goToSlide",
        value: function goToSlide(slideNo) {
          this.slides.slideTo(slideNo, 200);
        }
      }, {
        key: "slideChanged",
        value: function slideChanged() {
          this.slides.getActiveIndex().then(function (slideNo) {// TODO: LOGIC
          });
        }
      }, {
        key: "toggleVideo",
        value: function toggleVideo() {
          if (this.session) {
            this.publisher_publisher.publishVideo(!this.video);
            this.video = !this.video;
            var audio_return = "0";
            var video_return = "0";

            if (this.audio) {
              audio_return = "1";
            }

            if (this.video) {
              video_return = "1";
            }

            this.sendStreamStatusMessage(audio_return + "," + video_return);
          }
        }
      }, {
        key: "toggleAudio",
        value: function toggleAudio() {
          if (this.session) {
            this.publisher_publisher.publishAudio(!this.audio);
            this.audio = !this.audio;
            var audio_return = "0";
            var video_return = "0";

            if (this.audio) {
              audio_return = "1";
            }

            if (this.video) {
              video_return = "1";
            }

            this.sendStreamStatusMessage(audio_return + "," + video_return);
          }
        }
      }, {
        key: "sendStreamStatusMessage",
        value: function sendStreamStatusMessage(streamStatus) {
          this.session.signal({
            data: streamStatus,
            to: [],
            type: "streamStatus"
          }).then(function () {})["catch"](function (err) {
            console.log(err);
          });
        }
      }, {
        key: "joinSession",
        value: function joinSession() {
          var _this4 = this;

          // --- 1) Get an OpenVidu object ---
          console.log("JOINING SESSION");
          this.OV = new openvidu_browser__WEBPACK_IMPORTED_MODULE_7__["OpenVidu"](); // --- 2) Init a session ---

          this.session = this.OV.initSession(); // --- 3) Specify the actions when events take place in the session ---
          // On every new Stream received...

          this.session.on('signal:userControlMessage', function (event) {
            console.log("NEW EVENT");
            console.log(event); // var data_split:string = event.data.split(",");
            //   console.log(data_split);
            //   if (data_split[0] === "audio") {
            //     if (data_split[1] === "0") {
            //       if (this.audio) {
            //         this.toggleAudio();
            //       }
            //     } else {
            //       if (!this.audio) {
            //         this.toggleAudio();
            //       }
            //     }
            //   } else if (data_split[0] === "video") {
            //     if (data_split === "0") {
            //       if (this.video) {
            //         this.toggleVideo();
            //       }
            //     } else {
            //       if (!this.video) {
            //         this.toggleVideo();
            //       }
            //     }
            //   } else {
            //     this.leaveSession()
            //   }
          });
          this.session.on('streamCreated', function (event) {
            // Subscribe to the Stream to receive it. Second parameter is undefined
            // so OpenVidu doesn't create an HTML video on its own
            var subscriber = _this4.session.subscribe(event.stream, undefined);

            _this4.subscribers.push(subscriber);

            var nickname;

            try {
              nickname = JSON.parse(subscriber.stream.connection.data).clientData;
            } catch (err) {
              nickname = JSON.parse(subscriber.stream.connection.data.split('%/%')[0]).clientData; // serverData = JSON.parse(this.streamManager.stream.connection.data.split('%/%')[1]).serverData;
            }

            var connection_id = subscriber.stream.connection.connectionId;
            var obj_append_particpant_list = {
              nickName: nickname,
              connection_id: connection_id
            };

            _this4.participantList.push(obj_append_particpant_list);

            _this4.connections_list.push(subscriber.stream.connection);
          }); // On every Stream destroyed...

          this.session.on('streamDestroyed', function (event) {
            // Remove the stream from 'subscribers' array
            _this4.deleteSubscriber(event.stream.streamManager);
          }); // --- 4) Connect to the session with a valid user token ---
          // 'getToken' method is simulating what your server-side should do.
          // 'token' parameter should be retrieved and returned by your own backend

          this.getToken().then(function (data) {
            console.log("GOT SOMETHING FROM SERVER");
            console.log(typeof data);
            console.log(data);
            var token_and_sessionId = JSON.parse(data);
            var token = token_and_sessionId.token;
            _this4.mySessionId = token_and_sessionId.session_id;
            console.log("TOKEN: " + token);
            console.log("mySessionId: " + _this4.mySessionId);

            if (_this4.obj === "join") {
              _this4.meetingName = token_and_sessionId.meetingName;
              _this4.meetingCode = token_and_sessionId.meetingCode;
              _this4.meetingDesc = token_and_sessionId.meetingDesc;
            }

            _this4.session.connect(token, {
              clientData: _this4.name
            }).then(function () {
              // --- 5) Requesting and Checking Android Permissions
              if (_this4.platform.is('cordova')) {
                // Ionic platform
                if (_this4.platform.is('android')) {
                  console.log('Android platform');

                  _this4.checkAndroidPermissions().then(function () {
                    return _this4.initPublisher(_this4.audio, _this4.video);
                  })["catch"](function (err) {
                    return console.error(err);
                  });
                } else if (_this4.platform.is('ios')) {
                  console.log('iOS platform');

                  _this4.initPublisher(_this4.audio, _this4.video);
                }
              } else {
                _this4.initPublisher(_this4.audio, _this4.video);
              }
            })["catch"](function (error) {
              console.log('There was an error connecting to the session:', error.code, error.message);
            });
          });
        }
      }, {
        key: "initPublisher",
        value: function initPublisher(audio_input, video_input) {
          var _this5 = this;

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          var publisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: audio_input,
            publishVideo: video_input,
            resolution: '640x480',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: true // Whether to mirror your local video or not

          }); // --- 6) Publish your stream ---

          this.publisher_publisher = publisher;
          this.session.publish(publisher).then(function () {
            // Store our Publisher
            _this5.publisher = publisher;
            console.log(typeof publisher);
            console.log(typeof _this5.publisher);
          });
        }
      }, {
        key: "leaveSession",
        value: function leaveSession() {
          if (this.session) {
            this.session.disconnect();
          }

          this.subscribers = [];
          delete this.publisher;
          delete this.session;
          delete this.OV;
          this.router.navigateByUrl("/");
        }
      }, {
        key: "refreshVideos",
        value: function refreshVideos() {
          if (this.platform.is('ios') && this.platform.is('cordova')) {
            cordova.plugins.iosrtc.refreshVideos();
          }
        }
      }, {
        key: "checkAndroidPermissions",
        value: function checkAndroidPermissions() {
          var _this6 = this;

          return new Promise(function (resolve, reject) {
            _this6.platform.ready().then(function () {
              _this6.androidPermissions.requestPermissions(_this6.ANDROID_PERMISSIONS).then(function () {
                _this6.androidPermissions.checkPermission(_this6.androidPermissions.PERMISSION.CAMERA).then(function (camera) {
                  _this6.androidPermissions.checkPermission(_this6.androidPermissions.PERMISSION.RECORD_AUDIO).then(function (audio) {
                    _this6.androidPermissions.checkPermission(_this6.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS).then(function (modifyAudio) {
                      if (camera.hasPermission && audio.hasPermission && modifyAudio.hasPermission) {
                        resolve();
                      } else {
                        reject(new Error('Permissions denied: ' + '\n' + ' CAMERA = ' + camera.hasPermission + '\n' + ' AUDIO = ' + audio.hasPermission + '\n' + ' AUDIO_SETTINGS = ' + modifyAudio.hasPermission));
                      }
                    })["catch"](function (err) {
                      console.error('Checking permission ' + _this6.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS + ' failed');
                      reject(err);
                    });
                  })["catch"](function (err) {
                    console.error('Checking permission ' + _this6.androidPermissions.PERMISSION.RECORD_AUDIO + ' failed');
                    reject(err);
                  });
                })["catch"](function (err) {
                  console.error('Checking permission ' + _this6.androidPermissions.PERMISSION.CAMERA + ' failed');
                  reject(err);
                });
              })["catch"](function (err) {
                return console.error('Error requesting permissions: ', err);
              });
            });
          });
        }
      }, {
        key: "deleteSubscriber",
        value: function deleteSubscriber(streamManager) {
          var index = this.subscribers.indexOf(streamManager, 0);

          if (index > -1) {
            this.subscribers.splice(index, 1);
          }
        }
      }, {
        key: "getToken",
        value: function getToken() {
          if (this.obj === "create") {
            var postData_create = {
              "userName": this.name,
              "meetingName": this.meetingName,
              "meetingCode": this.meetingCode,
              "meetingDesc": this.meetingDesc,
              "userId": ""
            };
            return this.httpClient.post(this.SERVER_URL + "/mobile-api/create-meeting-get-token", postData_create, {
              responseType: 'text'
            }).toPromise();
          } else if (this.obj === "join") {
            var postData_join = {
              "userName": this.name,
              "meetingId": this.mySessionId,
              "meetingCode": this.meetingCode,
              "userId": ""
            };
            return this.httpClient.post(this.SERVER_URL + "/mobile-api/join-meeting-and-get-token/", postData_join, {
              responseType: 'text'
            }).toPromise();
          }
        }
      }]);

      return SessionPage;
    }();

    SessionPage.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }, {
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"]
      }, {
        type: _ionic_native_splash_screen_ngx__WEBPACK_IMPORTED_MODULE_4__["SplashScreen"]
      }, {
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"]
      }, {
        type: _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_6__["AndroidPermissions"]
      }, {
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"]
      }];
    };

    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('slides', {
      "static": true
    })], SessionPage.prototype, "slides", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('window:beforeunload')], SessionPage.prototype, "beforeunloadHandler", null);
    SessionPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-session',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./session.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/session/session.page.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./session.page.scss */
      "./src/app/session/session.page.scss"))["default"]]
    })], SessionPage);
    /***/
  }
}]);
//# sourceMappingURL=session-session-module-es5.js.map
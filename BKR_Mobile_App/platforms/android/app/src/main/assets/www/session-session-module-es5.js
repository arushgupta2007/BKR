function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["session-session-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/components/chat-modal/chat-modal.component.html":
  /*!*******************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/chat-modal/chat-modal.component.html ***!
    \*******************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppComponentsChatModalChatModalComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar color=\"dark\">\n    <ion-title>{{ this.meetingService.participantList[this.connectionId].name }}</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"dismissModal()\">\n        <ion-icon name=\"close\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div class=\"main-container\">\n    <div id=\"participant-control-button-group\">\n      <ion-button id=\"video-icon\" (click)=\"toggleParticipantVideo()\" class=\"white-text\" expand=\"full\">\n        <i class=\"fas fa-video\" *ngIf=\"meetingService.participantList[connectionId].videoStatus\"></i>\n        <i class=\"fas fa-video-slash\" *ngIf=\"!meetingService.participantList[connectionId].videoStatus\"></i>\n      </ion-button>\n      <ion-button id=\"audio-icon\" (click)=\"toggleParticipantAudio()\" class=\"white-text\" expand=\"full\">\n        <ion-icon name=\"mic\" *ngIf=\"meetingService.participantList[connectionId].audioStatus\"></ion-icon>\n        <ion-icon name=\"mic-off\" *ngIf=\"!meetingService.participantList[connectionId].audioStatus\"></ion-icon>\n      </ion-button>\n      <ion-button class=\"end-call-icon-background-red white-text\" (click)=\"endParticipantCall()\" expand=\"full\">\n        <ion-icon name=\"call\" class=\"end-call-icon\"></ion-icon>\n      </ion-button>\n    </div>\n    <div id=\"chat-area\">\n      \n    </div>\n  </div>\n</ion-content>";
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


    __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar color=\"dark\">\n    <ion-title>{{meetingName}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-fab id=\"fab-meeting-options\" vertical=\"top\" horizontal=\"end\" slot=\"fixed\">\n  <ion-fab-button id=\"fab-list-activator\">\n    <ion-icon name=\"arrow-down-circle\"></ion-icon>\n  </ion-fab-button>\n  <ion-fab-list side=\"bottom\">\n    <ion-fab-button (click)=\"shareAlert()\" id=\"share-icon\">\n      <ion-icon name=\"share-social\"></ion-icon>\n    </ion-fab-button>\n    <ion-fab-button (click)=\"goToSlide(2)\" id=\"whiteboard-icon\">\n      <ion-icon name=\"pencil\"></ion-icon>\n    </ion-fab-button>\n    <ion-fab-button (click)=\"goToSlide(0)\" id=\"chat-icon\">\n      <ion-icon name=\"chatbox\"></ion-icon>\n    </ion-fab-button>\n    <ion-fab-button (click)=\"this.meetingService.toggleVideo()\" id=\"video-icon\">\n      <i class=\"fas fa-video-slash\" *ngIf=\"!meetingService.video\"></i>\n      <i class=\"fas fa-video\" *ngIf=\"meetingService.video\"></i>\n    </ion-fab-button>\n    <ion-fab-button (click)=\"this.meetingService.toggleAudio()\" id=\"audio-icon\">\n      <ion-icon name=\"mic\" *ngIf=\"meetingService.audio\"></ion-icon>\n      <ion-icon name=\"mic-off\" *ngIf=\"!meetingService.audio\"></ion-icon>\n    </ion-fab-button>\n    <ion-fab-button (click)=\"meetingService.leaveSession()\" class=\"end-call-icon-background-red\">\n      <ion-icon name=\"call\" class=\"end-call-icon\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab-list>\n</ion-fab>\n\n<ion-content>\n  <ion-slides [options]=\"slidesOptions\" (ionSlideDidChange)=\"slideChanged()\" #slides>\n    <ion-slide>\n      <ion-list id=\"participant_list\">\n        <ion-list-header id=\"participant-list-header\">\n          <ion-label class=\"white-text\">Participant List</ion-label>\n        </ion-list-header>\n\n        <ion-item class=\"white-text\">\n          <ion-avatar slot=\"start\">\n            <img src=\"assets/unknown_user.png\" alt=\"\">\n          </ion-avatar>\n          <ion-label>\n            <h1>{{ name }}</h1>\n          </ion-label>\n        </ion-item>\n        <ion-item detail button (click)=\"openChatModal(participant_key_value.value)\" class=\"white-text\" *ngFor=\"let participant_key_value of meetingService.participantList | keyvalue\">\n          <ion-avatar slot=\"start\">\n            <img src=\"assets/unknown_user.png\" alt=\"\">\n          </ion-avatar>\n          <ion-label>\n            <h1>{{ participant_key_value.value.name }}</h1>\n          </ion-label>\n        </ion-item>\n      </ion-list>\n    </ion-slide>\n    <ion-slide>\n      <ion-grid>\n        <ion-row>\n          <ion-col size=\"6\">\n            <div *ngIf=\"meetingService.publisher\" class=\"stream-container\">\n              <user-video [streamManager]=\"meetingService.publisher\"></user-video>\n            </div>\n          </ion-col>\n          <ion-col size=\"6\" *ngFor=\"let sub of meetingService.subscribers\">\n            <div class=\"stream-container\">\n              <user-video [streamManager]=\"sub\"></user-video>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-slide>\n    <ion-slide>\n      <h1 class=\"white-text\">Whiteboard</h1>\n    </ion-slide>\n  </ion-slides>\n</ion-content>";
    /***/
  },

  /***/
  "./src/app/components/chat-modal/chat-modal.component.scss":
  /*!*****************************************************************!*\
    !*** ./src/app/components/chat-modal/chat-modal.component.scss ***!
    \*****************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppComponentsChatModalChatModalComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".end-call-icon {\n  transform: rotate(135deg);\n}\n\n.white-text {\n  --color: white;\n  color: white;\n}\n\n#video-icon {\n  --background: var(--ion-color-tertiary);\n}\n\n#audio-icon {\n  --background: var(--ion-color-secondary);\n}\n\n.end-call-icon-background-red {\n  --background: var(--ion-color-danger);\n}\n\n.main-container {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n}\n\n.main-container #chat-area {\n  height: 100%;\n}\n\n#participant-control-button-group {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n#participant-control-button-group ion-button {\n  width: 100%;\n  margin: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FwdXRyb24vRGVza3RvcC9LcmlzaG5hL0JLUl9zZXJ2ZXIvQktSL0JLUl9Nb2JpbGVfQXBwL3NyYy9hcHAvY29tcG9uZW50cy9jaGF0LW1vZGFsL2NoYXQtbW9kYWwuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvY2hhdC1tb2RhbC9jaGF0LW1vZGFsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0kseUJBQUE7QUNDSjs7QURFQTtFQUNJLGNBQUE7RUFDQSxZQUFBO0FDQ0o7O0FERUE7RUFDSSx1Q0FBQTtBQ0NKOztBREVBO0VBQ0ksd0NBQUE7QUNDSjs7QURFQTtFQUNJLHFDQUFBO0FDQ0o7O0FERUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxhQUFBO0FDQ0o7O0FEQ0k7RUFDSSxZQUFBO0FDQ1I7O0FER0E7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQ0FKOztBREVJO0VBQ0ksV0FBQTtFQUNBLFNBQUE7QUNBUiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvY2hhdC1tb2RhbC9jaGF0LW1vZGFsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmVuZC1jYWxsLWljb24ge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDEzNWRlZyk7XG59XG5cbi53aGl0ZS10ZXh0IHtcbiAgICAtLWNvbG9yOiB3aGl0ZTtcbiAgICBjb2xvcjogd2hpdGU7XG59XG5cbiN2aWRlby1pY29uIHtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeSk7XG59XG5cbiNhdWRpby1pY29uIHtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xufVxuXG4uZW5kLWNhbGwtaWNvbi1iYWNrZ3JvdW5kLXJlZCB7XG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbn1cblxuLm1haW4tY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgaGVpZ2h0OiAxMDB2aDtcblxuICAgICNjaGF0LWFyZWEge1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgfVxufVxuXG4jcGFydGljaXBhbnQtY29udHJvbC1idXR0b24tZ3JvdXAge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgaW9uLWJ1dHRvbiB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgfVxufSIsIi5lbmQtY2FsbC1pY29uIHtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTM1ZGVnKTtcbn1cblxuLndoaXRlLXRleHQge1xuICAtLWNvbG9yOiB3aGl0ZTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4jdmlkZW8taWNvbiB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5KTtcbn1cblxuI2F1ZGlvLWljb24ge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xufVxuXG4uZW5kLWNhbGwtaWNvbi1iYWNrZ3JvdW5kLXJlZCB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XG59XG5cbi5tYWluLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGhlaWdodDogMTAwdmg7XG59XG4ubWFpbi1jb250YWluZXIgI2NoYXQtYXJlYSB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuI3BhcnRpY2lwYW50LWNvbnRyb2wtYnV0dG9uLWdyb3VwIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbiNwYXJ0aWNpcGFudC1jb250cm9sLWJ1dHRvbi1ncm91cCBpb24tYnV0dG9uIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMDtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/components/chat-modal/chat-modal.component.ts":
  /*!***************************************************************!*\
    !*** ./src/app/components/chat-modal/chat-modal.component.ts ***!
    \***************************************************************/

  /*! exports provided: ChatModalComponent */

  /***/
  function srcAppComponentsChatModalChatModalComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ChatModalComponent", function () {
      return ChatModalComponent;
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


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
    /* harmony import */


    var src_app_services_meeting_session_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/services/meeting-session.service */
    "./src/app/services/meeting-session.service.ts");

    var ChatModalComponent = /*#__PURE__*/function () {
      function ChatModalComponent(navParams, modalCtrl, meetingService) {
        _classCallCheck(this, ChatModalComponent);

        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.meetingService = meetingService;
      }

      _createClass(ChatModalComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var participant = this.navParams.get('participant');
          this.connectionId = participant.connectionId;
        }
      }, {
        key: "dismissModal",
        value: function dismissModal() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.modalCtrl.dismiss();

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }, {
        key: "toggleParticipantVideo",
        value: function toggleParticipantVideo() {
          var participant = this.meetingService.participantList[this.connectionId];

          if (participant.videoStatus) {
            this.meetingService.sendUserCtrl(participant.connectionId, "video", "0");
          } else {
            this.meetingService.sendUserCtrl(participant.connectionId, "video", "1");
          }
        }
      }, {
        key: "toggleParticipantAudio",
        value: function toggleParticipantAudio() {
          var participant = this.meetingService.participantList[this.connectionId];

          if (participant.audioStatus) {
            this.meetingService.sendUserCtrl(participant.connectionId, "audio", "0");
          } else {
            this.meetingService.sendUserCtrl(participant.connectionId, "audio", "1");
          }
        }
      }, {
        key: "endParticipantCall",
        value: function endParticipantCall() {
          var participant = this.meetingService.participantList[this.connectionId];
          this.meetingService.sendUserCtrl(participant.connectionId, "drop", "force");
          this.dismissModal();
        }
      }]);

      return ChatModalComponent;
    }();

    ChatModalComponent.ctorParameters = function () {
      return [{
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavParams"]
      }, {
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]
      }, {
        type: src_app_services_meeting_session_service__WEBPACK_IMPORTED_MODULE_3__["MeetingSessionService"]
      }];
    };

    ChatModalComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-chat-modal',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./chat-modal.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/components/chat-modal/chat-modal.component.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./chat-modal.component.scss */
      "./src/app/components/chat-modal/chat-modal.component.scss"))["default"]]
    })], ChatModalComponent);
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
    "./src/app/user-video.component.ts");
    /* harmony import */


    var _components_chat_modal_chat_modal_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! ../components/chat-modal/chat-modal.component */
    "./src/app/components/chat-modal/chat-modal.component.ts");

    var SessionPageModule = function SessionPageModule() {
      _classCallCheck(this, SessionPageModule);
    };

    SessionPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_session_page__WEBPACK_IMPORTED_MODULE_6__["SessionPage"], _user_video_component__WEBPACK_IMPORTED_MODULE_13__["UserVideoComponent"], _ov_video_component__WEBPACK_IMPORTED_MODULE_12__["OpenViduVideoComponent"], _components_chat_modal_chat_modal_component__WEBPACK_IMPORTED_MODULE_14__["ChatModalComponent"]],
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


    __webpack_exports__["default"] = ".end-call-icon {\n  transform: rotate(135deg);\n}\n\n.white-text {\n  --color: white;\n  color: white;\n}\n\n#fab-meeting-options {\n  margin: 15px;\n  margin-left: auto;\n}\n\n.alert-message .alert-wrapper {\n  --color: white;\n}\n\nion-slide {\n  align-items: flex-start;\n}\n\nion-fab-button {\n  --color: white;\n}\n\n#fab-list-activator {\n  --background: #fff;\n  --color: #000;\n}\n\n#share-icon {\n  --background: var(--ion-color-warning);\n}\n\n#whiteboard-icon {\n  --background: #dca6f5;\n}\n\n#chat-icon {\n  --background: #9eb5db;\n}\n\n#video-icon {\n  --background: var(--ion-color-tertiary);\n}\n\n#audio-icon {\n  --background: var(--ion-color-secondary);\n}\n\n.end-call-icon-background-red {\n  --background: var(--ion-color-danger);\n}\n\n#participant-list-header {\n  font-size: 200%;\n}\n\n#participant_list {\n  width: 100%;\n}\n\n.background-red {\n  --background: var(--ion-color-danger) ;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FwdXRyb24vRGVza3RvcC9LcmlzaG5hL0JLUl9zZXJ2ZXIvQktSL0JLUl9Nb2JpbGVfQXBwL3NyYy9hcHAvc2Vzc2lvbi9zZXNzaW9uLnBhZ2Uuc2NzcyIsInNyYy9hcHAvc2Vzc2lvbi9zZXNzaW9uLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHlCQUFBO0FDQ0o7O0FERUE7RUFDSSxjQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREVBO0VBQ0ksWUFBQTtFQUNBLGlCQUFBO0FDQ0o7O0FERUE7RUFDSSxjQUFBO0FDQ0o7O0FERUE7RUFDSSx1QkFBQTtBQ0NKOztBREVBO0VBQ0ksY0FBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7RUFDQSxhQUFBO0FDQ0o7O0FERUE7RUFDSSxzQ0FBQTtBQ0NKOztBREVBO0VBQ0kscUJBQUE7QUNDSjs7QURFQTtFQUNJLHFCQUFBO0FDQ0o7O0FERUE7RUFDSSx1Q0FBQTtBQ0NKOztBREVBO0VBQ0ksd0NBQUE7QUNDSjs7QURFQTtFQUNJLHFDQUFBO0FDQ0o7O0FERUE7RUFDSSxlQUFBO0FDQ0o7O0FERUE7RUFDSSxXQUFBO0FDQ0o7O0FERUE7RUFDSSxzQ0FBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvc2Vzc2lvbi9zZXNzaW9uLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5lbmQtY2FsbC1pY29uIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xufVxuXG4ud2hpdGUtdGV4dCB7XG4gICAgLS1jb2xvcjogd2hpdGU7XG4gICAgY29sb3I6IHdoaXRlO1xufVxuXG4jZmFiLW1lZXRpbmctb3B0aW9ucyB7XG4gICAgbWFyZ2luOiAxNXB4O1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xufVxuXG4uYWxlcnQtbWVzc2FnZSAuYWxlcnQtd3JhcHBlciB7XG4gICAgLS1jb2xvcjogd2hpdGU7XG59XG5cbmlvbi1zbGlkZSB7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG59XG5cbmlvbi1mYWItYnV0dG9uIHtcbiAgICAtLWNvbG9yOiB3aGl0ZTtcbn1cblxuI2ZhYi1saXN0LWFjdGl2YXRvciB7XG4gICAgLS1iYWNrZ3JvdW5kOiAjZmZmO1xuICAgIC0tY29sb3I6ICMwMDA7XG59XG5cbiNzaGFyZS1pY29uIHtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nKTtcbn1cblxuI3doaXRlYm9hcmQtaWNvbiB7XG4gICAgLS1iYWNrZ3JvdW5kOiAjZGNhNmY1O1xufVxuXG4jY2hhdC1pY29uIHtcbiAgICAtLWJhY2tncm91bmQ6ICM5ZWI1ZGI7XG59XG5cbiN2aWRlby1pY29uIHtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeSk7XG59XG5cbiNhdWRpby1pY29uIHtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xufVxuXG4uZW5kLWNhbGwtaWNvbi1iYWNrZ3JvdW5kLXJlZCB7XG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbn1cblxuI3BhcnRpY2lwYW50LWxpc3QtaGVhZGVyIHtcbiAgICBmb250LXNpemU6IDIwMCU7XG59XG5cbiNwYXJ0aWNpcGFudF9saXN0IHtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuLmJhY2tncm91bmQtcmVkIHtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpXG59IiwiLmVuZC1jYWxsLWljb24ge1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xufVxuXG4ud2hpdGUtdGV4dCB7XG4gIC0tY29sb3I6IHdoaXRlO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbiNmYWItbWVldGluZy1vcHRpb25zIHtcbiAgbWFyZ2luOiAxNXB4O1xuICBtYXJnaW4tbGVmdDogYXV0bztcbn1cblxuLmFsZXJ0LW1lc3NhZ2UgLmFsZXJ0LXdyYXBwZXIge1xuICAtLWNvbG9yOiB3aGl0ZTtcbn1cblxuaW9uLXNsaWRlIHtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG59XG5cbmlvbi1mYWItYnV0dG9uIHtcbiAgLS1jb2xvcjogd2hpdGU7XG59XG5cbiNmYWItbGlzdC1hY3RpdmF0b3Ige1xuICAtLWJhY2tncm91bmQ6ICNmZmY7XG4gIC0tY29sb3I6ICMwMDA7XG59XG5cbiNzaGFyZS1pY29uIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itd2FybmluZyk7XG59XG5cbiN3aGl0ZWJvYXJkLWljb24ge1xuICAtLWJhY2tncm91bmQ6ICNkY2E2ZjU7XG59XG5cbiNjaGF0LWljb24ge1xuICAtLWJhY2tncm91bmQ6ICM5ZWI1ZGI7XG59XG5cbiN2aWRlby1pY29uIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItdGVydGlhcnkpO1xufVxuXG4jYXVkaW8taWNvbiB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG59XG5cbi5lbmQtY2FsbC1pY29uLWJhY2tncm91bmQtcmVkIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbn1cblxuI3BhcnRpY2lwYW50LWxpc3QtaGVhZGVyIHtcbiAgZm9udC1zaXplOiAyMDAlO1xufVxuXG4jcGFydGljaXBhbnRfbGlzdCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uYmFja2dyb3VuZC1yZWQge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpIDtcbn0iXX0= */";
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


    var _components_chat_modal_chat_modal_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../components/chat-modal/chat-modal.component */
    "./src/app/components/chat-modal/chat-modal.component.ts");
    /* harmony import */


    var _services_meeting_session_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../services/meeting-session.service */
    "./src/app/services/meeting-session.service.ts");

    var SessionPage = /*#__PURE__*/function () {
      function SessionPage(meetingService, route, router, alertController, modalCtrl) {
        var _this = this;

        _classCallCheck(this, SessionPage);

        this.meetingService = meetingService;
        this.route = route;
        this.router = router;
        this.alertController = alertController;
        this.modalCtrl = modalCtrl;
        this.slidesOptions = {
          initialSlide: 1,
          speed: 200
        };
        this.route.queryParams.subscribe(function () {
          if (_this.router.getCurrentNavigation().extras.state) {
            _this.data = _this.router.getCurrentNavigation().extras.state.data;
            _this.obj = _this.router.getCurrentNavigation().extras.state.obj;

            _this.initApp();
          } else {
            _this.router.navigateByUrl("/");
          }
        });
      }

      _createClass(SessionPage, [{
        key: "initApp",
        value: function initApp() {
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
        key: "beforeunloadHandler",
        value: function beforeunloadHandler() {
          this.meetingService.leaveSession();
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.meetingService.leaveSession();
        }
      }, {
        key: "joinSession",
        value: function joinSession() {
          var _this2 = this;

          if (this.obj === "create") {
            this.meetingService.getTokenCreate(this.name, this.meetingName, this.meetingCode, this.meetingDesc).then(function (data) {
              var json_data = JSON.parse(data);

              _this2.meetingService.joinSession(json_data, _this2.obj);
            });
          } else {
            this.meetingService.getTokenJoin(this.name, parseInt(this.mySessionId), this.meetingCode).then(function (data) {
              var json_data = JSON.parse(data);

              _this2.meetingService.joinSession(json_data, _this2.obj);
            });
          }

          this.meetingService.setCallbackLeaveSession(function () {
            _this2.router.navigateByUrl("/");
          });
          this.meetingService.setCallbackVariables(function (meetingName, meetingCode, meetingId, meetingDesc) {
            _this2.meetingName = meetingName;
            _this2.meetingCode = meetingCode;
            _this2.mySessionId = meetingId;
            _this2.meetingDesc = meetingDesc;
          });
          this.meetingName = this.meetingService.meetingName;
          this.meetingCode = this.meetingService.meetingCode;
          this.meetingDesc = this.meetingService.meetingDesc;
        }
      }, {
        key: "openChatModal",
        value: function openChatModal(participant) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var chat_modal;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return this.modalCtrl.create({
                      component: _components_chat_modal_chat_modal_component__WEBPACK_IMPORTED_MODULE_4__["ChatModalComponent"],
                      componentProps: {
                        participant: participant
                      }
                    });

                  case 2:
                    chat_modal = _context2.sent;
                    chat_modal.present();

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));
        }
      }, {
        key: "shareAlert",
        value: function shareAlert() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var message_alert, alert;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    message_alert = "Share this link: \n      <a href='https://baatkarteraho.in/?todo=join&id_=".concat(this.meetingService.mySessionId, "'>\n        https://baatkarteraho.in/?todo=join&id_=").concat(this.meetingService.mySessionId, "\n      </a>\n      <br>OR<br>\n      Share this Meeting Id: ").concat(this.meetingService.mySessionId);
                    _context3.next = 3;
                    return this.alertController.create({
                      cssClass: "alert-message",
                      header: "Share " + this.meetingName,
                      message: message_alert,
                      buttons: ["OK"]
                    });

                  case 3:
                    alert = _context3.sent;
                    _context3.next = 6;
                    return alert.present();

                  case 6:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
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
          this.slides.getActiveIndex().then(function () {// TODO: LOGIC
          });
        }
      }, {
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return SessionPage;
    }();

    SessionPage.ctorParameters = function () {
      return [{
        type: _services_meeting_session_service__WEBPACK_IMPORTED_MODULE_5__["MeetingSessionService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }, {
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"]
      }, {
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"]
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
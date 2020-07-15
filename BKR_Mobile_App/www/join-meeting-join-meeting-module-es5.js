function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["join-meeting-join-meeting-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/join-meeting/join-meeting.page.html":
  /*!*******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/join-meeting/join-meeting.page.html ***!
    \*******************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppJoinMeetingJoinMeetingPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar color=\"dark\">\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"/\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Join Meeting</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n  <form [formGroup]=\"rForm\" (ngSubmit)=\"joinMeeting(rForm.value)\">\n    <div id=\"form-container\">\n      <ion-item>\n        <ion-label position=\"floating\" color=\"light\">Your Name</ion-label>\n        <ion-input autocomplete=\"off\" clearInput color=\"light\" type=\"text\" formControlName=\"name_form\"></ion-input>\n      </ion-item>\n      <ion-label color=\"danger\" *ngIf=\"nameErr\">{{ nameErr }}</ion-label>\n      <ion-item>\n        <ion-label position=\"floating\" color=\"light\">Meeting Id</ion-label>\n        <ion-input autocomplete=\"off\" clearInput color=\"light\" type=\"number\" formControlName=\"meetingId_form\"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label position=\"floating\" color=\"light\">Meeting Code</ion-label>\n        <ion-input autocomplete=\"off\" clearInput color=\"light\" type=\"password\" formControlName=\"meetingCode_form\"></ion-input>\n      </ion-item>\n      <br>\n      <ion-label color=\"danger\" *ngIf=\"meetingErr\">{{ meetingErr }}</ion-label>\n      <br>\n      <button type=\"submit\" class=\"btn btn-lg btn-success\" [disabled]=\"!rForm.valid\">Join Meeting!</button>\n    </div>\n  </form>\n</ion-content>\n";
    /***/
  },

  /***/
  "./src/app/join-meeting/join-meeting-routing.module.ts":
  /*!*************************************************************!*\
    !*** ./src/app/join-meeting/join-meeting-routing.module.ts ***!
    \*************************************************************/

  /*! exports provided: JoinMeetingPageRoutingModule */

  /***/
  function srcAppJoinMeetingJoinMeetingRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "JoinMeetingPageRoutingModule", function () {
      return JoinMeetingPageRoutingModule;
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


    var _join_meeting_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./join-meeting.page */
    "./src/app/join-meeting/join-meeting.page.ts");

    var routes = [{
      path: '',
      component: _join_meeting_page__WEBPACK_IMPORTED_MODULE_3__["JoinMeetingPage"]
    }];

    var JoinMeetingPageRoutingModule = function JoinMeetingPageRoutingModule() {
      _classCallCheck(this, JoinMeetingPageRoutingModule);
    };

    JoinMeetingPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], JoinMeetingPageRoutingModule);
    /***/
  },

  /***/
  "./src/app/join-meeting/join-meeting.module.ts":
  /*!*****************************************************!*\
    !*** ./src/app/join-meeting/join-meeting.module.ts ***!
    \*****************************************************/

  /*! exports provided: JoinMeetingPageModule */

  /***/
  function srcAppJoinMeetingJoinMeetingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "JoinMeetingPageModule", function () {
      return JoinMeetingPageModule;
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


    var _join_meeting_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./join-meeting-routing.module */
    "./src/app/join-meeting/join-meeting-routing.module.ts");
    /* harmony import */


    var _join_meeting_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./join-meeting.page */
    "./src/app/join-meeting/join-meeting.page.ts");

    var JoinMeetingPageModule = function JoinMeetingPageModule() {
      _classCallCheck(this, JoinMeetingPageModule);
    };

    JoinMeetingPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _join_meeting_routing_module__WEBPACK_IMPORTED_MODULE_5__["JoinMeetingPageRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"]],
      declarations: [_join_meeting_page__WEBPACK_IMPORTED_MODULE_6__["JoinMeetingPage"]]
    })], JoinMeetingPageModule);
    /***/
  },

  /***/
  "./src/app/join-meeting/join-meeting.page.scss":
  /*!*****************************************************!*\
    !*** ./src/app/join-meeting/join-meeting.page.scss ***!
    \*****************************************************/

  /*! exports provided: default */

  /***/
  function srcAppJoinMeetingJoinMeetingPageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "#form-container {\n  padding: 25px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.item-interactive {\n  --highlight-background: transparent !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FwdXRyb24vRGVza3RvcC9LcmlzaG5hL0JLUl9zZXJ2ZXIvQktSL0JLUl9Nb2JpbGVfQXBwL3NyYy9hcHAvam9pbi1tZWV0aW5nL2pvaW4tbWVldGluZy5wYWdlLnNjc3MiLCJzcmMvYXBwL2pvaW4tbWVldGluZy9qb2luLW1lZXRpbmcucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0FDQ0o7O0FERUE7RUFDSSw4Q0FBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvam9pbi1tZWV0aW5nL2pvaW4tbWVldGluZy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjZm9ybS1jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDI1cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uaXRlbS1pbnRlcmFjdGl2ZSB7XG4gICAgLS1oaWdobGlnaHQtYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgfSIsIiNmb3JtLWNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDI1cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uaXRlbS1pbnRlcmFjdGl2ZSB7XG4gIC0taGlnaGxpZ2h0LWJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/join-meeting/join-meeting.page.ts":
  /*!***************************************************!*\
    !*** ./src/app/join-meeting/join-meeting.page.ts ***!
    \***************************************************/

  /*! exports provided: JoinMeetingPage */

  /***/
  function srcAppJoinMeetingJoinMeetingPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "JoinMeetingPage", function () {
      return JoinMeetingPage;
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


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");

    var JoinMeetingPage = /*#__PURE__*/function () {
      function JoinMeetingPage(fb, router, httpClient) {
        _classCallCheck(this, JoinMeetingPage);

        this.fb = fb;
        this.router = router;
        this.httpClient = httpClient;
        this.name = '';
        this.meetingId = '';
        this.meetingCode = '';
        this.SERVER_URL = "https://192.168.1.16:5442";
        this.rForm = fb.group({
          'name_form': [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
          'meetingId_form': [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
          'meetingCode_form': [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
      }

      _createClass(JoinMeetingPage, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "joinMeeting",
        value: function joinMeeting(data) {
          var _this = this;

          this.nameErr = undefined;
          this.meetingErr = undefined;
          var navigationExtras = {
            state: {
              data: data,
              obj: "join"
            }
          };
          var postData = {
            meetingId: data.meetingId_form,
            meetingCode: data.meetingCode_form
          };

          if (data.name_form.trim() === "") {
            this.nameErr = "Please enter a valid name! >.<";
            this.name = "";
          }

          this.httpClient.post(this.SERVER_URL + "/user-api/check-id-code/", postData, {
            responseType: "text"
          }).toPromise().then(function (res) {
            console.log(res);

            if (res === "1") {
              _this.router.navigate(["session"], navigationExtras);
            } else {
              _this.meetingErr = "Looks like a wrong meeting ID or code! :(";
              _this.meetingId = "";
              _this.meetingCode = "";
            }
          });
        }
      }]);

      return JoinMeetingPage;
    }();

    JoinMeetingPage.ctorParameters = function () {
      return [{
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]
      }];
    };

    JoinMeetingPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-join-meeting',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./join-meeting.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/join-meeting/join-meeting.page.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./join-meeting.page.scss */
      "./src/app/join-meeting/join-meeting.page.scss"))["default"]]
    })], JoinMeetingPage);
    /***/
  }
}]);
//# sourceMappingURL=join-meeting-join-meeting-module-es5.js.map
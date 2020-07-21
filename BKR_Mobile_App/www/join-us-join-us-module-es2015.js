(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["join-us-join-us-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/join-us/join-us.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/join-us/join-us.page.html ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>Join Us</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-button (click)=\"joinWithGoogle()\">Join With Google</ion-button>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/join-us/join-us-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/join-us/join-us-routing.module.ts ***!
  \***************************************************/
/*! exports provided: JoinUsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JoinUsPageRoutingModule", function() { return JoinUsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _join_us_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./join-us.page */ "./src/app/join-us/join-us.page.ts");




const routes = [
    {
        path: '',
        component: _join_us_page__WEBPACK_IMPORTED_MODULE_3__["JoinUsPage"]
    }
];
let JoinUsPageRoutingModule = class JoinUsPageRoutingModule {
};
JoinUsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], JoinUsPageRoutingModule);



/***/ }),

/***/ "./src/app/join-us/join-us.module.ts":
/*!*******************************************!*\
  !*** ./src/app/join-us/join-us.module.ts ***!
  \*******************************************/
/*! exports provided: JoinUsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JoinUsPageModule", function() { return JoinUsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _join_us_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./join-us-routing.module */ "./src/app/join-us/join-us-routing.module.ts");
/* harmony import */ var _join_us_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./join-us.page */ "./src/app/join-us/join-us.page.ts");







let JoinUsPageModule = class JoinUsPageModule {
};
JoinUsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _join_us_routing_module__WEBPACK_IMPORTED_MODULE_5__["JoinUsPageRoutingModule"]
        ],
        declarations: [_join_us_page__WEBPACK_IMPORTED_MODULE_6__["JoinUsPage"]]
    })
], JoinUsPageModule);



/***/ }),

/***/ "./src/app/join-us/join-us.page.scss":
/*!*******************************************!*\
  !*** ./src/app/join-us/join-us.page.scss ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2pvaW4tdXMvam9pbi11cy5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/join-us/join-us.page.ts":
/*!*****************************************!*\
  !*** ./src/app/join-us/join-us.page.ts ***!
  \*****************************************/
/*! exports provided: JoinUsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JoinUsPage", function() { return JoinUsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _services_oauth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/oauth.service */ "./src/app/services/oauth.service.ts");



let JoinUsPage = class JoinUsPage {
    constructor(oauthService) {
        this.oauthService = oauthService;
    }
    ngOnInit() { }
    joinWithGoogle() {
        this.oauthService.joinWithGoogle();
    }
};
JoinUsPage.ctorParameters = () => [
    { type: _services_oauth_service__WEBPACK_IMPORTED_MODULE_2__["OauthService"] }
];
JoinUsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-join-us',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./join-us.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/join-us/join-us.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./join-us.page.scss */ "./src/app/join-us/join-us.page.scss")).default]
    })
], JoinUsPage);



/***/ })

}]);
//# sourceMappingURL=join-us-join-us-module-es2015.js.map
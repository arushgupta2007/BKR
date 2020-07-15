(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["create-meeting-create-meeting-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/create-meeting/create-meeting.page.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/create-meeting/create-meeting.page.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar color=\"dark\">\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"/\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Create Meeting</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <form [formGroup]=\"rForm\" (ngSubmit)=\"createMeeting(rForm.value)\">\n    <div id=\"form-container\">\n      <ion-item>\n        <ion-label position=\"floating\" color=\"light\">Your Name</ion-label>\n        <ion-input autocomplete=\"off\" clearInput color=\"light\" type=\"text\" formControlName=\"name_form\" [(ngModel)]=\"name\"></ion-input>\n      </ion-item>\n      <ion-label color=\"danger\" *ngIf=\"nameErr\">{{ nameErr }}</ion-label>\n      <ion-item>\n        <ion-label position=\"floating\" color=\"light\">Meeting Name</ion-label>\n        <ion-input autocomplete=\"off\" clearInput color=\"light\" type=\"text\" formControlName=\"meetingName_form\" [(ngModel)]=\"meetingName\"></ion-input>\n      </ion-item>\n      <ion-label color=\"danger\" *ngIf=\"meetingNameErr\">{{ meetingNameErr }}</ion-label>\n      <ion-item>\n        <ion-label position=\"floating\" color=\"light\">Meeting Code</ion-label>\n        <ion-input autocomplete=\"off\" clearInput color=\"light\" type=\"password\" formControlName=\"meetingCode_form\" [(ngModel)]=\"meetingCode\"></ion-input>\n      </ion-item>\n      <ion-label color=\"danger\" *ngIf=\"meetingCodeErr\">{{ meetingCodeErr }}</ion-label>\n      <ion-item>\n        <ion-label position=\"floating\" color=\"light\">Meeting Desc</ion-label>\n        <ion-textarea autocomplete=\"off\" color=\"light\" formControlName=\"meetingDesc_form\" [(ngModel)]=\"meetingDesc\"></ion-textarea>\n      </ion-item>\n      <br *ngIf=\"meetingDescErr\">\n      <ion-label color=\"danger\" *ngIf=\"meetingDescErr\">{{ meetingDescErr }}</ion-label>\n      <br><br>\n      <button type=\"submit\" class=\"btn btn-lg btn-warning\" [disabled]=\"!rForm.valid\">Create Meeting!</button>\n    </div>\n  </form>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/create-meeting/create-meeting-routing.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/create-meeting/create-meeting-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: CreateMeetingPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateMeetingPageRoutingModule", function() { return CreateMeetingPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _create_meeting_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./create-meeting.page */ "./src/app/create-meeting/create-meeting.page.ts");




const routes = [
    {
        path: '',
        component: _create_meeting_page__WEBPACK_IMPORTED_MODULE_3__["CreateMeetingPage"]
    }
];
let CreateMeetingPageRoutingModule = class CreateMeetingPageRoutingModule {
};
CreateMeetingPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], CreateMeetingPageRoutingModule);



/***/ }),

/***/ "./src/app/create-meeting/create-meeting.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/create-meeting/create-meeting.module.ts ***!
  \*********************************************************/
/*! exports provided: CreateMeetingPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateMeetingPageModule", function() { return CreateMeetingPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _create_meeting_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./create-meeting-routing.module */ "./src/app/create-meeting/create-meeting-routing.module.ts");
/* harmony import */ var _create_meeting_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./create-meeting.page */ "./src/app/create-meeting/create-meeting.page.ts");







let CreateMeetingPageModule = class CreateMeetingPageModule {
};
CreateMeetingPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _create_meeting_routing_module__WEBPACK_IMPORTED_MODULE_5__["CreateMeetingPageRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
        ],
        declarations: [_create_meeting_page__WEBPACK_IMPORTED_MODULE_6__["CreateMeetingPage"]]
    })
], CreateMeetingPageModule);



/***/ }),

/***/ "./src/app/create-meeting/create-meeting.page.scss":
/*!*********************************************************!*\
  !*** ./src/app/create-meeting/create-meeting.page.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#form-container {\n  padding: 25px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.item-interactive {\n  --highlight-background: transparent !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FwdXRyb24vRGVza3RvcC9LcmlzaG5hL0JLUl9zZXJ2ZXIvQktSL0JLUl9Nb2JpbGVfQXBwL3NyYy9hcHAvY3JlYXRlLW1lZXRpbmcvY3JlYXRlLW1lZXRpbmcucGFnZS5zY3NzIiwic3JjL2FwcC9jcmVhdGUtbWVldGluZy9jcmVhdGUtbWVldGluZy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7QUNDSjs7QURFQTtFQUNJLDhDQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9jcmVhdGUtbWVldGluZy9jcmVhdGUtbWVldGluZy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjZm9ybS1jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDI1cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uaXRlbS1pbnRlcmFjdGl2ZSB7XG4gICAgLS1oaWdobGlnaHQtYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgfSIsIiNmb3JtLWNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDI1cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uaXRlbS1pbnRlcmFjdGl2ZSB7XG4gIC0taGlnaGxpZ2h0LWJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG59Il19 */");

/***/ }),

/***/ "./src/app/create-meeting/create-meeting.page.ts":
/*!*******************************************************!*\
  !*** ./src/app/create-meeting/create-meeting.page.ts ***!
  \*******************************************************/
/*! exports provided: CreateMeetingPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateMeetingPage", function() { return CreateMeetingPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




let CreateMeetingPage = class CreateMeetingPage {
    constructor(fb, router) {
        this.fb = fb;
        this.router = router;
        this.name = '';
        this.meetingName = '';
        this.meetingCode = '';
        this.meetingDesc = '';
        this.rForm = fb.group({
            'name_form': [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            'meetingName_form': [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            'meetingCode_form': [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8)])],
            'meetingDesc_form': ''
        });
    }
    ngOnInit() { }
    alphanumeric(inputtxt) {
        var letters = /^[0-9a-zA-Z]+$/;
        return (inputtxt.match(letters));
    }
    createMeeting(data) {
        this.nameErr = undefined;
        this.meetingNameErr = undefined;
        this.meetingCodeErr = undefined;
        let navigationExtras = {
            state: {
                data: data,
                obj: "create"
            }
        };
        var toPass = true;
        if (data.name_form.trim() === "") {
            this.nameErr = "Please enter a valid name! >.<";
            this.name = "";
            toPass = false;
        }
        if (data.meetingName_form.trim() === "") {
            this.meetingNameErr = "Is your meeting that boring?! o.O";
            this.meetingName = "";
            toPass = false;
        }
        if (!this.alphanumeric(data.meetingCode_form)) {
            this.meetingCodeErr = "Atleast 8 characters alphanumeric";
            this.meetingCode = "";
            toPass = false;
        }
        if (data.meetingDesc_form.length > 500) {
            this.meetingDescErr = "0 - 500 characters only!";
            this.meetingDesc = "";
            toPass = false;
        }
        if (toPass) {
            this.router.navigate(["session"], navigationExtras);
        }
    }
};
CreateMeetingPage.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
CreateMeetingPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-create-meeting',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./create-meeting.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/create-meeting/create-meeting.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./create-meeting.page.scss */ "./src/app/create-meeting/create-meeting.page.scss")).default]
    })
], CreateMeetingPage);



/***/ })

}]);
//# sourceMappingURL=create-meeting-create-meeting-module-es2015.js.map
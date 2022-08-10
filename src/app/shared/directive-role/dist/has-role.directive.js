"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HasRoleDirective = void 0;
var core_1 = require("@angular/core");
var HasRoleDirective = /** @class */ (function () {
    function HasRoleDirective(_authService, viewContainerRef, templateRef) {
        this._authService = _authService;
        this.viewContainerRef = viewContainerRef;
        this.templateRef = templateRef;
        this.isVisible = false;
    }
    HasRoleDirective.prototype.ngOnInit = function () {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        var userRoles = this._authService.decode;
        if (!userRoles) {
            this.viewContainerRef.clear();
        }
        if (this._authService.roleMatch(this.appHasRole)) {
            if (!this.isVisible) {
                this.isVisible = true;
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
            else {
                this.isVisible = false;
                this.viewContainerRef.clear();
            }
        }
    };
    __decorate([
        core_1.Input()
    ], HasRoleDirective.prototype, "appHasRole");
    HasRoleDirective = __decorate([
        core_1.Directive({
            selector: '[appHasRole]' //*appHasRole
        })
    ], HasRoleDirective);
    return HasRoleDirective;
}());
exports.HasRoleDirective = HasRoleDirective;

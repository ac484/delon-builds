/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, Output, ViewEncapsulation, } from '@angular/core';
import { ActivationEnd, ActivationStart, Router } from '@angular/router';
import { InputBoolean, InputNumber } from '@delon/util';
import { fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { FullContentService } from './full-content.service';
/** @type {?} */
var wrapCls = "full-content__body";
/** @type {?} */
var openedCls = "full-content__opened";
/** @type {?} */
var hideTitleCls = "full-content__hidden-title";
var FullContentComponent = /** @class */ (function () {
    // #endregion
    function FullContentComponent(el, cdr, srv, router, doc) {
        this.el = el;
        this.cdr = cdr;
        this.srv = srv;
        this.router = router;
        this.doc = doc;
        this.inited = false;
        this.id = "_full-content-" + Math.random()
            .toString(36)
            .substring(2);
        this.scroll$ = null;
        this._height = 0;
        this.hideTitle = true;
        this.padding = 24;
        this.fullscreenChange = new EventEmitter();
    }
    /**
     * @private
     * @return {?}
     */
    FullContentComponent.prototype.updateCls = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var clss = this.bodyEl.classList;
        if (this.fullscreen) {
            clss.add(openedCls);
            if (this.hideTitle) {
                clss.add(hideTitleCls);
            }
        }
        else {
            clss.remove(openedCls);
            if (this.hideTitle) {
                clss.remove(hideTitleCls);
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    FullContentComponent.prototype.update = /**
     * @private
     * @return {?}
     */
    function () {
        this.updateCls();
        this.updateHeight();
        this.fullscreenChange.emit(this.fullscreen);
    };
    /**
     * @private
     * @return {?}
     */
    FullContentComponent.prototype.updateHeight = /**
     * @private
     * @return {?}
     */
    function () {
        this._height =
            this.bodyEl.getBoundingClientRect().height -
                ((/** @type {?} */ (this.el.nativeElement))).getBoundingClientRect().top -
                this.padding;
        this.cdr.detectChanges();
    };
    /**
     * @private
     * @return {?}
     */
    FullContentComponent.prototype.removeInBody = /**
     * @private
     * @return {?}
     */
    function () {
        this.bodyEl.classList.remove(wrapCls, openedCls, hideTitleCls);
    };
    /**
     * @return {?}
     */
    FullContentComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.inited = true;
        this.bodyEl = this.doc.querySelector('body');
        this.bodyEl.classList.add(wrapCls);
        ((/** @type {?} */ (this.el.nativeElement))).id = this.id;
        this.updateCls();
        // when window resize
        this.scroll$ = fromEvent(window, 'resize')
            .pipe(debounceTime(200))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.updateHeight(); }));
        // when servier changed
        this.srv$ = this.srv.change.pipe(filter((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res !== null; }))).subscribe((/**
         * @return {?}
         */
        function () { return _this.toggle(); }));
        // when router changed
        this.route$ = this.router.events
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e instanceof ActivationStart || e instanceof ActivationEnd; })), debounceTime(200))
            .subscribe((/**
         * @return {?}
         */
        function () {
            if (!!_this.doc.querySelector('#' + _this.id)) {
                _this.bodyEl.classList.add(wrapCls);
                _this.updateCls();
            }
            else {
                _this.removeInBody();
            }
        }));
    };
    /**
     * @return {?}
     */
    FullContentComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.fullscreen = !this.fullscreen;
        this.update();
        this.updateHeight();
    };
    /**
     * @return {?}
     */
    FullContentComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () { return _this.updateHeight(); }));
    };
    /**
     * @return {?}
     */
    FullContentComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        if (this.inited)
            this.update();
    };
    /**
     * @return {?}
     */
    FullContentComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeInBody();
        (/** @type {?} */ (this.scroll$)).unsubscribe();
        this.srv$.unsubscribe();
        this.route$.unsubscribe();
    };
    FullContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'full-content',
                    exportAs: 'fullContent',
                    template: "\n    <ng-content></ng-content>\n  ",
                    host: {
                        '[class.full-content]': 'true',
                        '[style.height.px]': '_height',
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    FullContentComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: FullContentService },
        { type: Router },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    FullContentComponent.propDecorators = {
        fullscreen: [{ type: Input }],
        hideTitle: [{ type: Input }],
        padding: [{ type: Input }],
        fullscreenChange: [{ type: Output }]
    };
    tslib_1.__decorate([
        InputBoolean(),
        tslib_1.__metadata("design:type", Boolean)
    ], FullContentComponent.prototype, "fullscreen", void 0);
    tslib_1.__decorate([
        InputBoolean(),
        tslib_1.__metadata("design:type", Object)
    ], FullContentComponent.prototype, "hideTitle", void 0);
    tslib_1.__decorate([
        InputNumber(),
        tslib_1.__metadata("design:type", Object)
    ], FullContentComponent.prototype, "padding", void 0);
    return FullContentComponent;
}());
export { FullContentComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FullContentComponent.prototype.bodyEl;
    /**
     * @type {?}
     * @private
     */
    FullContentComponent.prototype.inited;
    /**
     * @type {?}
     * @private
     */
    FullContentComponent.prototype.srv$;
    /**
     * @type {?}
     * @private
     */
    FullContentComponent.prototype.route$;
    /**
     * @type {?}
     * @private
     */
    FullContentComponent.prototype.id;
    /**
     * @type {?}
     * @private
     */
    FullContentComponent.prototype.scroll$;
    /** @type {?} */
    FullContentComponent.prototype._height;
    /** @type {?} */
    FullContentComponent.prototype.fullscreen;
    /** @type {?} */
    FullContentComponent.prototype.hideTitle;
    /** @type {?} */
    FullContentComponent.prototype.padding;
    /** @type {?} */
    FullContentComponent.prototype.fullscreenChange;
    /**
     * @type {?}
     * @private
     */
    FullContentComponent.prototype.el;
    /**
     * @type {?}
     * @private
     */
    FullContentComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    FullContentComponent.prototype.srv;
    /**
     * @type {?}
     * @private
     */
    FullContentComponent.prototype.router;
    /**
     * @type {?}
     * @private
     */
    FullContentComponent.prototype.doc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbC1jb250ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWxvbi9hYmMvZnVsbC1jb250ZW50LyIsInNvdXJjZXMiOlsiZnVsbC1jb250ZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUlMLE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQVMsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEQsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7SUFFdEQsT0FBTyxHQUFHLG9CQUFvQjs7SUFDOUIsU0FBUyxHQUFHLHNCQUFzQjs7SUFDbEMsWUFBWSxHQUFHLDRCQUE0QjtBQUVqRDtJQWlDRSxhQUFhO0lBRWIsOEJBQ1UsRUFBYyxFQUNkLEdBQXNCLEVBQ3RCLEdBQXVCLEVBQ3ZCLE1BQWMsRUFDSSxHQUFRO1FBSjFCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixRQUFHLEdBQUgsR0FBRyxDQUFvQjtRQUN2QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ0ksUUFBRyxHQUFILEdBQUcsQ0FBSztRQXhCNUIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUdmLE9B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dEIsbUNBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0aW9uRW5kLCBBY3RpdmF0aW9uU3RhcnQsIEV2ZW50LCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuLCBJbnB1dE51bWJlciB9IGZyb20gJ0BkZWxvbi91dGlsJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRnVsbENvbnRlbnRTZXJ2aWNlIH0gZnJvbSAnLi9mdWxsLWNvbnRlbnQuc2VydmljZSc7XG5cbmNvbnN0IHdyYXBDbHMgPSBgZnVsbC1jb250ZW50X19ib2R5YDtcbmNvbnN0IG9wZW5lZENscyA9IGBmdWxsLWNvbnRlbnRfX29wZW5lZGA7XG5jb25zdCBoaWRlVGl0bGVDbHMgPSBgZnVsbC1jb250ZW50X19oaWRkZW4tdGl0bGVgO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmdWxsLWNvbnRlbnQnLFxuICBleHBvcnRBczogJ2Z1bGxDb250ZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmZ1bGwtY29udGVudF0nOiAndHJ1ZScsXG4gICAgJ1tzdHlsZS5oZWlnaHQucHhdJzogJ19oZWlnaHQnLFxuICB9LFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEZ1bGxDb250ZW50Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgYm9keUVsOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBpbml0ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzcnYkOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgcm91dGUkOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgaWQgPSBgX2Z1bGwtY29udGVudC0ke01hdGgucmFuZG9tKClcbiAgICAudG9TdHJpbmcoMzYpXG4gICAgLnN1YnN0cmluZygyKX1gO1xuICBwcml2YXRlIHNjcm9sbCQ6IFN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuXG4gIF9oZWlnaHQgPSAwO1xuXG4gIC8vICNyZWdpb24gZmllbGRzXG5cbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIGZ1bGxzY3JlZW46IGJvb2xlYW47XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBoaWRlVGl0bGUgPSB0cnVlO1xuICBASW5wdXQoKSBASW5wdXROdW1iZXIoKSBwYWRkaW5nID0gMjQ7XG4gIEBPdXRwdXQoKSByZWFkb25seSBmdWxsc2NyZWVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8vICNlbmRyZWdpb25cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHNydjogRnVsbENvbnRlbnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2M6IGFueSxcbiAgKSB7fVxuXG4gIHByaXZhdGUgdXBkYXRlQ2xzKCkge1xuICAgIGNvbnN0IGNsc3MgPSB0aGlzLmJvZHlFbC5jbGFzc0xpc3Q7XG4gICAgaWYgKHRoaXMuZnVsbHNjcmVlbikge1xuICAgICAgY2xzcy5hZGQob3BlbmVkQ2xzKTtcbiAgICAgIGlmICh0aGlzLmhpZGVUaXRsZSkge1xuICAgICAgICBjbHNzLmFkZChoaWRlVGl0bGVDbHMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbHNzLnJlbW92ZShvcGVuZWRDbHMpO1xuICAgICAgaWYgKHRoaXMuaGlkZVRpdGxlKSB7XG4gICAgICAgIGNsc3MucmVtb3ZlKGhpZGVUaXRsZUNscyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGUoKSB7XG4gICAgdGhpcy51cGRhdGVDbHMoKTtcbiAgICB0aGlzLnVwZGF0ZUhlaWdodCgpO1xuICAgIHRoaXMuZnVsbHNjcmVlbkNoYW5nZS5lbWl0KHRoaXMuZnVsbHNjcmVlbik7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUhlaWdodCgpIHtcbiAgICB0aGlzLl9oZWlnaHQgPVxuICAgICAgdGhpcy5ib2R5RWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IC1cbiAgICAgICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtXG4gICAgICB0aGlzLnBhZGRpbmc7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVJbkJvZHkoKSB7XG4gICAgdGhpcy5ib2R5RWwuY2xhc3NMaXN0LnJlbW92ZSh3cmFwQ2xzLCBvcGVuZWRDbHMsIGhpZGVUaXRsZUNscyk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXRlZCA9IHRydWU7XG4gICAgdGhpcy5ib2R5RWwgPSB0aGlzLmRvYy5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgdGhpcy5ib2R5RWwuY2xhc3NMaXN0LmFkZCh3cmFwQ2xzKTtcbiAgICAodGhpcy5lbC5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5pZCA9IHRoaXMuaWQ7XG5cbiAgICB0aGlzLnVwZGF0ZUNscygpO1xuXG4gICAgLy8gd2hlbiB3aW5kb3cgcmVzaXplXG4gICAgdGhpcy5zY3JvbGwkID0gZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpXG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoMjAwKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGVIZWlnaHQoKSk7XG5cbiAgICAvLyB3aGVuIHNlcnZpZXIgY2hhbmdlZFxuICAgIHRoaXMuc3J2JCA9IHRoaXMuc3J2LmNoYW5nZS5waXBlKGZpbHRlcihyZXMgPT4gcmVzICE9PSBudWxsKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMudG9nZ2xlKCkpO1xuXG4gICAgLy8gd2hlbiByb3V0ZXIgY2hhbmdlZFxuICAgIHRoaXMucm91dGUkID0gdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKChlOiBFdmVudCkgPT4gZSBpbnN0YW5jZW9mIEFjdGl2YXRpb25TdGFydCB8fCBlIGluc3RhbmNlb2YgQWN0aXZhdGlvbkVuZCksXG4gICAgICAgIGRlYm91bmNlVGltZSgyMDApLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICghIXRoaXMuZG9jLnF1ZXJ5U2VsZWN0b3IoJyMnICsgdGhpcy5pZCkpIHtcbiAgICAgICAgICB0aGlzLmJvZHlFbC5jbGFzc0xpc3QuYWRkKHdyYXBDbHMpO1xuICAgICAgICAgIHRoaXMudXBkYXRlQ2xzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVJbkJvZHkoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5mdWxsc2NyZWVuID0gIXRoaXMuZnVsbHNjcmVlbjtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIHRoaXMudXBkYXRlSGVpZ2h0KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZUhlaWdodCgpKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmluaXRlZCkgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlSW5Cb2R5KCk7XG4gICAgdGhpcy5zY3JvbGwkIS51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc3J2JC51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMucm91dGUkLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==
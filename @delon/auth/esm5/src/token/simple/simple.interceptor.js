/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BaseInterceptor } from '../base.interceptor';
import { CheckSimple } from '../helper';
import { DA_SERVICE_TOKEN } from '../interface';
var SimpleInterceptor = /** @class */ (function (_super) {
    tslib_1.__extends(SimpleInterceptor, _super);
    function SimpleInterceptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} _options
     * @return {?}
     */
    SimpleInterceptor.prototype.isAuth = /**
     * @param {?} _options
     * @return {?}
     */
    function (_options) {
        this.model = (/** @type {?} */ (this.injector.get(DA_SERVICE_TOKEN).get()));
        return CheckSimple((/** @type {?} */ (this.model)));
    };
    /**
     * @param {?} req
     * @param {?} options
     * @return {?}
     */
    SimpleInterceptor.prototype.setReq = /**
     * @param {?} req
     * @param {?} options
     * @return {?}
     */
    function (req, options) {
        var _this = this;
        var token_send_template = options.token_send_template, token_send_key = options.token_send_key;
        /** @type {?} */
        var token = (/** @type {?} */ (token_send_template)).replace(/\$\{([\w]+)\}/g, (/**
         * @param {?} _
         * @param {?} g
         * @return {?}
         */
        function (_, g) { return _this.model[g]; }));
        switch (options.token_send_place) {
            case 'header':
                /** @type {?} */
                var obj = {};
                obj[(/** @type {?} */ (token_send_key))] = token;
                req = req.clone({
                    setHeaders: obj,
                });
                break;
            case 'body':
                /** @type {?} */
                var body = req.body || {};
                body[(/** @type {?} */ (token_send_key))] = token;
                req = req.clone({
                    body: body,
                });
                break;
            case 'url':
                req = req.clone({
                    params: req.params.append((/** @type {?} */ (token_send_key)), token),
                });
                break;
        }
        return req;
    };
    SimpleInterceptor.decorators = [
        { type: Injectable }
    ];
    return SimpleInterceptor;
}(BaseInterceptor));
export { SimpleInterceptor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlbG9uL2F1dGgvIiwic291cmNlcyI6WyJzcmMvdG9rZW4vc2ltcGxlL3NpbXBsZS5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDeEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBR2hEO0lBQ3VDLDZDQUFlO0lBRHREOztJQWlDQSxDQUFDOzs7OztJQS9CQyxrQ0FBTTs7OztJQUFOLFVBQU8sUUFBeUI7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFvQixDQUFDO1FBQzNFLE9BQU8sV0FBVyxDQUFDLG1CQUFBLElBQUksQ0FBQyxLQUFLLEVBQW9CLENBQUMsQ0FBQztJQUNyRCxDQUFDOzs7Ozs7SUFFRCxrQ0FBTTs7Ozs7SUFBTixVQUFPLEdBQXFCLEVBQUUsT0FBd0I7UUFBdEQsaUJBeUJDO1FBeEJTLElBQUEsaURBQW1CLEVBQUUsdUNBQWM7O1lBQ3JDLEtBQUssR0FBRyxtQkFBQSxtQkFBbUIsRUFBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0I7Ozs7O1FBQUUsVUFBQyxDQUFTLEVBQUUsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBYixDQUFhLEVBQUM7UUFDN0YsUUFBUSxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7WUFDaEMsS0FBSyxRQUFROztvQkFDTCxHQUFHLEdBQUcsRUFBRTtnQkFDZCxHQUFHLENBQUMsbUJBQUEsY0FBYyxFQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQzdCLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO29CQUNkLFVBQVUsRUFBRSxHQUFHO2lCQUNoQixDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNSLEtBQUssTUFBTTs7b0JBQ0gsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRTtnQkFDM0IsSUFBSSxDQUFDLG1CQUFBLGNBQWMsRUFBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztvQkFDZCxJQUFJLE1BQUE7aUJBQ0wsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDUixLQUFLLEtBQUs7Z0JBQ1IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7b0JBQ2QsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLG1CQUFBLGNBQWMsRUFBQyxFQUFFLEtBQUssQ0FBQztpQkFDbEQsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDVDtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7Z0JBaENGLFVBQVU7O0lBaUNYLHdCQUFDO0NBQUEsQUFqQ0QsQ0FDdUMsZUFBZSxHQWdDckQ7U0FoQ1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERlbG9uQXV0aENvbmZpZyB9IGZyb20gJy4uLy4uL2F1dGguY29uZmlnJztcbmltcG9ydCB7IEJhc2VJbnRlcmNlcHRvciB9IGZyb20gJy4uL2Jhc2UuaW50ZXJjZXB0b3InO1xuaW1wb3J0IHsgQ2hlY2tTaW1wbGUgfSBmcm9tICcuLi9oZWxwZXInO1xuaW1wb3J0IHsgREFfU0VSVklDRV9UT0tFTiB9IGZyb20gJy4uL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBTaW1wbGVUb2tlbk1vZGVsIH0gZnJvbSAnLi9zaW1wbGUubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2ltcGxlSW50ZXJjZXB0b3IgZXh0ZW5kcyBCYXNlSW50ZXJjZXB0b3Ige1xuICBpc0F1dGgoX29wdGlvbnM6IERlbG9uQXV0aENvbmZpZyk6IGJvb2xlYW4ge1xuICAgIHRoaXMubW9kZWwgPSB0aGlzLmluamVjdG9yLmdldChEQV9TRVJWSUNFX1RPS0VOKS5nZXQoKSBhcyBTaW1wbGVUb2tlbk1vZGVsO1xuICAgIHJldHVybiBDaGVja1NpbXBsZSh0aGlzLm1vZGVsIGFzIFNpbXBsZVRva2VuTW9kZWwpO1xuICB9XG5cbiAgc2V0UmVxKHJlcTogSHR0cFJlcXVlc3Q8YW55Piwgb3B0aW9uczogRGVsb25BdXRoQ29uZmlnKTogSHR0cFJlcXVlc3Q8YW55PiB7XG4gICAgY29uc3QgeyB0b2tlbl9zZW5kX3RlbXBsYXRlLCB0b2tlbl9zZW5kX2tleSB9ID0gb3B0aW9ucztcbiAgICBjb25zdCB0b2tlbiA9IHRva2VuX3NlbmRfdGVtcGxhdGUhLnJlcGxhY2UoL1xcJFxceyhbXFx3XSspXFx9L2csIChfOiBzdHJpbmcsIGcpID0+IHRoaXMubW9kZWxbZ10pO1xuICAgIHN3aXRjaCAob3B0aW9ucy50b2tlbl9zZW5kX3BsYWNlKSB7XG4gICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICBjb25zdCBvYmogPSB7fTtcbiAgICAgICAgb2JqW3Rva2VuX3NlbmRfa2V5IV0gPSB0b2tlbjtcbiAgICAgICAgcmVxID0gcmVxLmNsb25lKHtcbiAgICAgICAgICBzZXRIZWFkZXJzOiBvYmosXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvZHknOlxuICAgICAgICBjb25zdCBib2R5ID0gcmVxLmJvZHkgfHwge307XG4gICAgICAgIGJvZHlbdG9rZW5fc2VuZF9rZXkhXSA9IHRva2VuO1xuICAgICAgICByZXEgPSByZXEuY2xvbmUoe1xuICAgICAgICAgIGJvZHksXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3VybCc6XG4gICAgICAgIHJlcSA9IHJlcS5jbG9uZSh7XG4gICAgICAgICAgcGFyYW1zOiByZXEucGFyYW1zLmFwcGVuZCh0b2tlbl9zZW5kX2tleSEsIHRva2VuKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gcmVxO1xuICB9XG59XG4iXX0=
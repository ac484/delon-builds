/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
/**
 * @record
 */
export function AlainI18NService() { }
if (false) {
    /**
     * 调用 `use` 触发变更通知
     * @type {?}
     */
    AlainI18NService.prototype.change;
    /* Skipping unhandled member: [key: string]: any;*/
    /**
     * 变更语言
     * @param {?} lang 语言代码
     * @param {?=} emit 是否触发 `change`，默认：true
     * @return {?}
     */
    AlainI18NService.prototype.use = function (lang, emit) { };
    /**
     * 返回当前语言列表
     * @return {?}
     */
    AlainI18NService.prototype.getLangs = function () { };
    /**
     * 翻译
     * - `params` 模板所需要的参数对象
     * - `isSafe` 是否返回安全字符，自动调用 `bypassSecurityTrustHtml`
     * @param {?} key
     * @param {?=} params
     * @param {?=} isSafe
     * @return {?}
     */
    AlainI18NService.prototype.fanyi = function (key, params, isSafe) { };
}
/** @type {?} */
export const ALAIN_I18N_TOKEN = new InjectionToken('alainTranslatorToken', {
    providedIn: 'root',
    factory: ALAIN_I18N_TOKEN_FACTORY,
});
/**
 * @return {?}
 */
export function ALAIN_I18N_TOKEN_FACTORY() {
    return new AlainI18NServiceFake();
}
export class AlainI18NServiceFake {
    constructor() {
        this.change$ = new BehaviorSubject(null);
    }
    /**
     * @return {?}
     */
    get change() {
        return (/** @type {?} */ (this.change$.asObservable().pipe(filter((/**
         * @param {?} w
         * @return {?}
         */
        w => w != null)))));
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    use(lang) {
        this.change$.next(lang);
    }
    /**
     * @return {?}
     */
    getLangs() {
        return [];
    }
    /**
     * @param {?} key
     * @return {?}
     */
    fanyi(key) {
        return key;
    }
}
AlainI18NServiceFake.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ AlainI18NServiceFake.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AlainI18NServiceFake_Factory() { return new AlainI18NServiceFake(); }, token: AlainI18NServiceFake, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    AlainI18NServiceFake.prototype.change$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWxvbi90aGVtZS8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9pMThuL2kxOG4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUV4QyxzQ0EwQkM7Ozs7OztJQXBCQyxrQ0FBb0M7Ozs7Ozs7O0lBT3BDLDJEQUF3Qzs7Ozs7SUFLeEMsc0RBQWtCOzs7Ozs7Ozs7O0lBT2xCLHNFQUEwRDs7O0FBRzVELE1BQU0sT0FBTyxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FBbUIsc0JBQXNCLEVBQUU7SUFDM0YsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLHdCQUF3QjtDQUNsQyxDQUFDOzs7O0FBRUYsTUFBTSxVQUFVLHdCQUF3QjtJQUN0QyxPQUFPLElBQUksb0JBQW9CLEVBQUUsQ0FBQztBQUNwQyxDQUFDO0FBR0QsTUFBTSxPQUFPLG9CQUFvQjtJQURqQztRQUVVLFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsSUFBSSxDQUFDLENBQUM7S0FpQjVEOzs7O0lBZkMsSUFBSSxNQUFNO1FBQ1IsT0FBTyxtQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFDLENBQUMsRUFBc0IsQ0FBQztJQUN4RixDQUFDOzs7OztJQUVELEdBQUcsQ0FBQyxJQUFZO1FBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Ozs7O0lBRUQsS0FBSyxDQUFDLEdBQVc7UUFDZixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7OztZQWxCRixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7Ozs7OztJQUVoQyx1Q0FBMkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWxhaW5JMThOU2VydmljZSB7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcblxuICAvKipcbiAgICog6LCD55SoIGB1c2VgIOinpuWPkeWPmOabtOmAmuefpVxuICAgKi9cbiAgcmVhZG9ubHkgY2hhbmdlOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgLyoqXG4gICAqIOWPmOabtOivreiogFxuICAgKiBAcGFyYW0gbGFuZyDor63oqIDku6PnoIFcbiAgICogQHBhcmFtIGVtaXQg5piv5ZCm6Kem5Y+RIGBjaGFuZ2Vg77yM6buY6K6k77yadHJ1ZVxuICAgKi9cbiAgdXNlKGxhbmc6IHN0cmluZywgZW1pdD86IGJvb2xlYW4pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiDov5Tlm57lvZPliY3or63oqIDliJfooahcbiAgICovXG4gIGdldExhbmdzKCk6IGFueVtdO1xuXG4gIC8qKlxuICAgKiDnv7vor5FcbiAgICogLSBgcGFyYW1zYCDmqKHmnb/miYDpnIDopoHnmoTlj4LmlbDlr7nosaFcbiAgICogLSBgaXNTYWZlYCDmmK/lkKbov5Tlm57lronlhajlrZfnrKbvvIzoh6rliqjosIPnlKggYGJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sYFxuICAgKi9cbiAgZmFueWkoa2V5OiBzdHJpbmcsIHBhcmFtcz86IHt9LCBpc1NhZmU/OiBib29sZWFuKTogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgQUxBSU5fSTE4Tl9UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxBbGFpbkkxOE5TZXJ2aWNlPignYWxhaW5UcmFuc2xhdG9yVG9rZW4nLCB7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgZmFjdG9yeTogQUxBSU5fSTE4Tl9UT0tFTl9GQUNUT1JZLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBBTEFJTl9JMThOX1RPS0VOX0ZBQ1RPUlkoKSB7XG4gIHJldHVybiBuZXcgQWxhaW5JMThOU2VydmljZUZha2UoKTtcbn1cblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBbGFpbkkxOE5TZXJ2aWNlRmFrZSBpbXBsZW1lbnRzIEFsYWluSTE4TlNlcnZpY2Uge1xuICBwcml2YXRlIGNoYW5nZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuXG4gIGdldCBjaGFuZ2UoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2UkLmFzT2JzZXJ2YWJsZSgpLnBpcGUoZmlsdGVyKHcgPT4gdyAhPSBudWxsKSkgYXMgT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICB9XG5cbiAgdXNlKGxhbmc6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY2hhbmdlJC5uZXh0KGxhbmcpO1xuICB9XG5cbiAgZ2V0TGFuZ3MoKTogYW55W10ge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGZhbnlpKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGtleTtcbiAgfVxufVxuIl19
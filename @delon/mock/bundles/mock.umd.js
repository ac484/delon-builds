/**
 * @license ng-alain(cipchk@qq.com) v2.0.1
 * (c) 2018 Cipchk https://ng-alain.com/
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('@delon/theme')) :
    typeof define === 'function' && define.amd ? define('@delon/mock', ['exports', '@angular/core', '@angular/common/http', 'rxjs', 'rxjs/operators', '@delon/theme'], factory) :
    (factory((global.delon = global.delon || {}, global.delon.mock = {}),global.ng.core,global.ng.common.http,global.rxjs,global.rxjs.operators,global.delon.theme));
}(this, (function (exports,core,http,rxjs,operators,theme) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var MockStatusError = /** @class */ (function () {
        function MockStatusError(status, error) {
            this.status = status;
            this.error = error;
        }
        return MockStatusError;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DelonMockConfig = /** @class */ (function () {
        function DelonMockConfig() {
            /**
             * 请求延迟，单位：毫秒，默认：`300`
             */
            this.delay = 300;
            /**
             * 是否强制所有请求都Mock，`true` 表示当请求的URL不存在时直接返回 404 错误，`false` 表示未命中时发送真实HTTP请求
             */
            this.force = false;
            /**
             * 是否打印 Mock 请求信息，弥补浏览器无Network信息
             */
            this.log = true;
        }
        return DelonMockConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var MockService = /** @class */ (function () {
        function MockService(config) {
            this.config = config;
            this.cached = [];
            this.applyMock();
            delete this.config.data;
        }
        /**
         * @return {?}
         */
        MockService.prototype.applyMock = /**
         * @return {?}
         */
            function () {
                this.cached = [];
                try {
                    this.realApplyMock();
                }
                catch (e) {
                    this.outputError(e);
                }
            };
        /**
         * @return {?}
         */
        MockService.prototype.realApplyMock = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var data = this.config.data;
                if (!data)
                    return;
                Object.keys(data).forEach(function (key) {
                    /** @type {?} */
                    var rules = data[key];
                    if (!rules)
                        return;
                    Object.keys(rules).forEach(function (ruleKey) {
                        /** @type {?} */
                        var value = rules[ruleKey];
                        if (!(typeof value === 'function' ||
                            typeof value === 'object' ||
                            typeof value === 'string')) {
                            throw Error("mock value of [" + key + "-" + ruleKey + "] should be function or object or string, but got " + typeof value);
                        }
                        /** @type {?} */
                        var rule = _this.genRule(ruleKey, value);
                        if (['GET', 'POST', 'PUT', 'HEAD', 'DELETE', 'PATCH', 'OPTIONS'].indexOf(rule.method) === -1) {
                            throw Error("method of " + key + "-" + ruleKey + " is not valid");
                        }
                        /** @type {?} */
                        var item = _this.cached.find(function (w) { return w.url === rule.url && w.method === rule.method; });
                        if (item) {
                            item.callback = rule.callback;
                        }
                        else {
                            _this.cached.push(rule);
                        }
                    });
                });
                // regular ordering
                this.cached.sort(function (a, b) {
                    return (b.martcher || '').toString().length -
                        (a.martcher || '').toString().length;
                });
            };
        /**
         * @param {?} key
         * @param {?} callback
         * @return {?}
         */
        MockService.prototype.genRule = /**
         * @param {?} key
         * @param {?} callback
         * @return {?}
         */
            function (key, callback) {
                /** @type {?} */
                var method = 'GET';
                /** @type {?} */
                var url = key;
                if (key.indexOf(' ') > -1) {
                    /** @type {?} */
                    var splited = key.split(' ');
                    method = splited[0].toLowerCase();
                    url = splited[1];
                }
                /** @type {?} */
                var martcher = null;
                /** @type {?} */
                var segments = [];
                if (~url.indexOf(':')) {
                    segments = /** @type {?} */ ((url)).split('/').filter(function (segment) { return segment.startsWith(':'); }).map(function (v) { return v.substring(1); });
                    /** @type {?} */
                    var reStr = /** @type {?} */ ((url)).split('/').map(function (segment) { return (segment.startsWith(':') ? "([^/]+)" : segment); }).join('/');
                    martcher = new RegExp(reStr, 'i');
                }
                else if (/(\([^)]+\))/i.test(url)) {
                    martcher = new RegExp(url, 'i');
                }
                return {
                    url: url,
                    martcher: martcher,
                    segments: segments,
                    callback: callback,
                    method: method.toUpperCase(),
                };
            };
        /**
         * @param {?} error
         * @return {?}
         */
        MockService.prototype.outputError = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                /** @type {?} */
                var filePath = error.message.split(': ')[0];
                /** @type {?} */
                var errors = error.stack
                    .split('\n')
                    .filter(function (line) { return line.trim().indexOf('at ') !== 0; })
                    .map(function (line) { return line.replace(filePath + ": ", ''); });
                errors.splice(1, 0, ['']);
                console.group();
                console.warn("==========Failed to parse mock config.==========");
                console.log(errors.join('\n'));
                console.groupEnd();
                throw error;
            };
        // #endregion
        /**
         * @param {?} method
         * @param {?} url
         * @return {?}
         */
        MockService.prototype.getRule = /**
         * @param {?} method
         * @param {?} url
         * @return {?}
         */
            function (method, url) {
                method = (method || 'GET').toUpperCase();
                /** @type {?} */
                var params = {};
                /** @type {?} */
                var list = this.cached.filter(function (w) {
                    return w.method === method &&
                        (w.martcher ? w.martcher.test(url) : w.url === url);
                });
                if (list.length === 0)
                    return null;
                /** @type {?} */
                var ret = list.find(function (w) { return w.url === url; }) || list[0];
                if (ret.martcher) {
                    /** @type {?} */
                    var execArr = ret.martcher.exec(url);
                    execArr.slice(1).map(function (value, index) {
                        params[ret.segments[index]] = value;
                    });
                }
                return {
                    url: url,
                    method: ret.method,
                    params: params,
                    callback: ret.callback,
                };
            };
        /**
         * @return {?}
         */
        MockService.prototype.clearCache = /**
         * @return {?}
         */
            function () {
                this.cached = [];
            };
        Object.defineProperty(MockService.prototype, "rules", {
            get: /**
             * @return {?}
             */ function () {
                return this.cached;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        MockService.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.clearCache();
            };
        MockService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        MockService.ctorParameters = function () {
            return [
                { type: DelonMockConfig }
            ];
        };
        return MockService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var MockInterceptor = /** @class */ (function () {
        function MockInterceptor(injector) {
            this.injector = injector;
        }
        /**
         * @param {?} req
         * @param {?} next
         * @return {?}
         */
        MockInterceptor.prototype.intercept = /**
         * @param {?} req
         * @param {?} next
         * @return {?}
         */
            function (req, next) {
                /** @type {?} */
                var src = this.injector.get(MockService);
                /** @type {?} */
                var config = Object.assign({
                    delay: 300,
                    force: false,
                    log: true,
                }, this.injector.get(DelonMockConfig, null));
                /** @type {?} */
                var rule = src.getRule(req.method, req.url.split('?')[0]);
                if (!rule && !config.force) {
                    return next.handle(req);
                }
                /** @type {?} */
                var res;
                switch (typeof rule.callback) {
                    case 'function':
                        /** @type {?} */
                        var mockRequest_1 = {
                            original: req,
                            body: req.body,
                            queryString: {},
                            headers: {},
                            params: rule.params,
                        };
                        /** @type {?} */
                        var urlParams = req.url.split('?');
                        if (urlParams.length > 1) {
                            urlParams[1].split('&').forEach(function (item) {
                                /** @type {?} */
                                var itemArr = item.split('=');
                                /** @type {?} */
                                var key = itemArr[0];
                                /** @type {?} */
                                var value = itemArr[1];
                                // is array
                                if (Object.keys(mockRequest_1.queryString).includes(key)) {
                                    if (!Array.isArray(mockRequest_1.queryString[key])) {
                                        mockRequest_1.queryString[key] = [mockRequest_1.queryString[key]];
                                    }
                                    mockRequest_1.queryString[key].push(value);
                                }
                                else {
                                    mockRequest_1.queryString[key] = value;
                                }
                            });
                        }
                        req.params
                            .keys()
                            .forEach(function (key) { return (mockRequest_1.queryString[key] = req.params.get(key)); });
                        req.headers
                            .keys()
                            .forEach(function (key) { return (mockRequest_1.headers[key] = req.headers.get(key)); });
                        try {
                            res = rule.callback.call(this, mockRequest_1);
                        }
                        catch (e) {
                            /** @type {?} */
                            var errRes_1 = void 0;
                            if (e instanceof MockStatusError) {
                                errRes_1 = new http.HttpErrorResponse({
                                    url: req.url,
                                    headers: req.headers,
                                    status: e.status,
                                    statusText: e.statusText || 'Unknown Error',
                                    error: e.error,
                                });
                                if (config.log)
                                    console.log("%c\uD83D\uDC80" + req.method + "->" + req.url, 'background:#000;color:#bada55', errRes_1, req);
                            }
                            else {
                                console.log("%c\uD83D\uDC80" + req.method + "->" + req.url, 'background:#000;color:#bada55', "Please use MockStatusError to throw status error", e, req);
                            }
                            return new rxjs.Observable(function (observer) {
                                observer.error(errRes_1);
                            });
                        }
                        break;
                    default:
                        res = rule.callback;
                        break;
                }
                /** @type {?} */
                var response = new http.HttpResponse({
                    status: 200,
                    body: res,
                    url: req.url,
                });
                if (config.log) {
                    console.log("%c\uD83D\uDC7D" + req.method + "->" + req.url + "->request", 'background:#000;color:#bada55', req);
                    console.log("%c\uD83D\uDC7D" + req.method + "->" + req.url + "->response", 'background:#000;color:#bada55', response);
                }
                /** @type {?} */
                var hc = this.injector.get(theme._HttpClient, null);
                if (hc) {
                    hc.begin();
                }
                return rxjs.of(response).pipe(operators.delay(config.delay), operators.tap(function () {
                    if (hc) {
                        hc.end();
                    }
                }));
            };
        MockInterceptor.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        MockInterceptor.ctorParameters = function () {
            return [
                { type: core.Injector }
            ];
        };
        return MockInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DelonMockModule = /** @class */ (function () {
        function DelonMockModule() {
        }
        /**
         * @param {?} config
         * @return {?}
         */
        DelonMockModule.forRoot = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                return {
                    ngModule: DelonMockModule,
                    providers: [
                        MockService,
                        { provide: DelonMockConfig, useValue: config },
                        { provide: http.HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true },
                    ],
                };
            };
        /**
         * @return {?}
         */
        DelonMockModule.forChild = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: DelonMockModule,
                    providers: [
                        { provide: http.HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true },
                    ],
                };
            };
        DelonMockModule.decorators = [
            { type: core.NgModule, args: [{},] }
        ];
        return DelonMockModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.MockStatusError = MockStatusError;
    exports.MockService = MockService;
    exports.MockInterceptor = MockInterceptor;
    exports.DelonMockConfig = DelonMockConfig;
    exports.DelonMockModule = DelonMockModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BkZWxvbi9tb2NrL3NyYy9zdGF0dXMuZXJyb3IudHMiLCJuZzovL0BkZWxvbi9tb2NrL3NyYy9tb2NrLmNvbmZpZy50cyIsIm5nOi8vQGRlbG9uL21vY2svc3JjL21vY2suc2VydmljZS50cyIsIm5nOi8vQGRlbG9uL21vY2svc3JjL21vY2suaW50ZXJjZXB0b3IudHMiLCJuZzovL0BkZWxvbi9tb2NrL3NyYy9tb2NrLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTW9ja1N0YXR1c0Vycm9yIHtcbiAgc3RhdHVzVGV4dDogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RhdHVzOiBudW1iZXIsIHB1YmxpYyBlcnJvcj86IGFueSkge31cbn1cbiIsImV4cG9ydCBjbGFzcyBEZWxvbk1vY2tDb25maWcge1xuICAvKiogw6jCp8KEw6XCiMKZw6XCrsKaw6TCucKJw6bClcKww6bCjcKuICovXG4gIGRhdGE6IGFueTtcbiAgLyoqIMOowq/Ct8OmwrHCgsOlwrvCtsOowr/Cn8OvwrzCjMOlwo3ClcOkwr3CjcOvwrzCmsOmwq/Cq8OnwqfCksOvwrzCjMOpwrvCmMOowq7CpMOvwrzCmmAzMDBgICovXG4gIGRlbGF5PyA9IDMwMDtcbiAgLyoqIMOmwpjCr8OlwpDCpsOlwrzCusOlwojCtsOmwonCgMOmwpzCicOowq/Ct8OmwrHCgsOpwoPCvU1vY2vDr8K8woxgdHJ1ZWAgw6jCocKow6fCpMK6w6XCvcKTw6jCr8K3w6bCscKCw6fCmsKEVVJMw6TCuMKNw6XCrcKYw6XCnMKow6bCl8K2w6fCm8K0w6bCjsKlw6jCv8KUw6XCm8KeIDQwNCDDqcKUwpnDqMKvwq/Dr8K8woxgZmFsc2VgIMOowqHCqMOnwqTCusOmwpzCqsOlwpHCvcOkwrjCrcOmwpfCtsOlwo/CkcOpwoDCgcOnwpzCn8Olwq7CnkhUVFDDqMKvwrfDpsKxwoIgKi9cbiAgZm9yY2U/ID0gZmFsc2U7XG4gIC8qKiDDpsKYwq/DpcKQwqbDpsKJwpPDpcKNwrAgTW9jayDDqMKvwrfDpsKxwoLDpMK/wqHDpsKBwq/Dr8K8wozDpcK8wqXDqMKhwqXDpsK1wo/DqMKnwojDpcKZwqjDpsKXwqBOZXR3b3Jrw6TCv8Khw6bCgcKvICovXG4gIGxvZz8gPSB0cnVlO1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWxvbk1vY2tDb25maWcgfSBmcm9tICcuL21vY2suY29uZmlnJztcbmltcG9ydCB7IE1vY2tDYWNoZWRSdWxlLCBNb2NrUnVsZSB9IGZyb20gJy4vaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vY2tTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBjYWNoZWQ6IE1vY2tDYWNoZWRSdWxlW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogRGVsb25Nb2NrQ29uZmlnKSB7XG4gICAgdGhpcy5hcHBseU1vY2soKTtcbiAgICBkZWxldGUgdGhpcy5jb25maWcuZGF0YTtcbiAgfVxuXG4gIC8vICNyZWdpb24gcGFyc2UgcnVsZVxuXG4gIHByaXZhdGUgYXBwbHlNb2NrKCkge1xuICAgIHRoaXMuY2FjaGVkID0gW107XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucmVhbEFwcGx5TW9jaygpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMub3V0cHV0RXJyb3IoZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWFsQXBwbHlNb2NrKCkge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmNvbmZpZy5kYXRhO1xuICAgIGlmICghZGF0YSkgcmV0dXJuO1xuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBydWxlcyA9IGRhdGFba2V5XTtcbiAgICAgIGlmICghcnVsZXMpIHJldHVybjtcbiAgICAgIE9iamVjdC5rZXlzKHJ1bGVzKS5mb3JFYWNoKChydWxlS2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBydWxlc1tydWxlS2V5XTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICEoXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgfHxcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHxcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZydcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgYG1vY2sgdmFsdWUgb2YgWyR7a2V5fS0ke3J1bGVLZXl9XSBzaG91bGQgYmUgZnVuY3Rpb24gb3Igb2JqZWN0IG9yIHN0cmluZywgYnV0IGdvdCAke3R5cGVvZiB2YWx1ZX1gLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcnVsZSA9IHRoaXMuZ2VuUnVsZShydWxlS2V5LCB2YWx1ZSk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBbJ0dFVCcsICdQT1NUJywgJ1BVVCcsICdIRUFEJywgJ0RFTEVURScsICdQQVRDSCcsICdPUFRJT05TJ10uaW5kZXhPZihcbiAgICAgICAgICAgIHJ1bGUubWV0aG9kLFxuICAgICAgICAgICkgPT09IC0xXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IEVycm9yKGBtZXRob2Qgb2YgJHtrZXl9LSR7cnVsZUtleX0gaXMgbm90IHZhbGlkYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuY2FjaGVkLmZpbmQoXG4gICAgICAgICAgdyA9PiB3LnVybCA9PT0gcnVsZS51cmwgJiYgdy5tZXRob2QgPT09IHJ1bGUubWV0aG9kLFxuICAgICAgICApO1xuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgIGl0ZW0uY2FsbGJhY2sgPSBydWxlLmNhbGxiYWNrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2FjaGVkLnB1c2gocnVsZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIHJlZ3VsYXIgb3JkZXJpbmdcbiAgICB0aGlzLmNhY2hlZC5zb3J0KFxuICAgICAgKGEsIGIpID0+XG4gICAgICAgIChiLm1hcnRjaGVyIHx8ICcnKS50b1N0cmluZygpLmxlbmd0aCAtXG4gICAgICAgIChhLm1hcnRjaGVyIHx8ICcnKS50b1N0cmluZygpLmxlbmd0aCxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5SdWxlKGtleTogc3RyaW5nLCBjYWxsYmFjazogYW55KTogTW9ja0NhY2hlZFJ1bGUge1xuICAgIGxldCBtZXRob2QgPSAnR0VUJztcbiAgICBsZXQgdXJsID0ga2V5O1xuXG4gICAgaWYgKGtleS5pbmRleE9mKCcgJykgPiAtMSkge1xuICAgICAgY29uc3Qgc3BsaXRlZCA9IGtleS5zcGxpdCgnICcpO1xuICAgICAgbWV0aG9kID0gc3BsaXRlZFswXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdXJsID0gc3BsaXRlZFsxXTtcbiAgICB9XG5cbiAgICBsZXQgbWFydGNoZXI6IFJlZ0V4cCA9IG51bGw7XG4gICAgbGV0IHNlZ21lbnRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGlmICh+dXJsLmluZGV4T2YoJzonKSkge1xuICAgICAgc2VnbWVudHMgPSB1cmwhXG4gICAgICAgIC5zcGxpdCgnLycpXG4gICAgICAgIC5maWx0ZXIoc2VnbWVudCA9PiBzZWdtZW50LnN0YXJ0c1dpdGgoJzonKSlcbiAgICAgICAgLm1hcCh2ID0+IHYuc3Vic3RyaW5nKDEpKTtcbiAgICAgIGNvbnN0IHJlU3RyID0gdXJsIVxuICAgICAgICAuc3BsaXQoJy8nKVxuICAgICAgICAubWFwKHNlZ21lbnQgPT4gKHNlZ21lbnQuc3RhcnRzV2l0aCgnOicpID8gYChbXi9dKylgIDogc2VnbWVudCkpXG4gICAgICAgIC5qb2luKCcvJyk7XG4gICAgICBtYXJ0Y2hlciA9IG5ldyBSZWdFeHAocmVTdHIsICdpJyk7XG4gICAgfSBlbHNlIGlmICgvKFxcKFteKV0rXFwpKS9pLnRlc3QodXJsKSkge1xuICAgICAgbWFydGNoZXIgPSBuZXcgUmVnRXhwKHVybCwgJ2knKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdXJsLFxuICAgICAgbWFydGNoZXIsXG4gICAgICBzZWdtZW50cyxcbiAgICAgIGNhbGxiYWNrLFxuICAgICAgbWV0aG9kOiBtZXRob2QudG9VcHBlckNhc2UoKSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBvdXRwdXRFcnJvcihlcnJvcjogYW55KSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBlcnJvci5tZXNzYWdlLnNwbGl0KCc6ICcpWzBdO1xuICAgIGNvbnN0IGVycm9ycyA9IGVycm9yLnN0YWNrXG4gICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAuZmlsdGVyKGxpbmUgPT4gbGluZS50cmltKCkuaW5kZXhPZignYXQgJykgIT09IDApXG4gICAgICAubWFwKGxpbmUgPT4gbGluZS5yZXBsYWNlKGAke2ZpbGVQYXRofTogYCwgJycpKTtcbiAgICBlcnJvcnMuc3BsaWNlKDEsIDAsIFsnJ10pO1xuXG4gICAgY29uc29sZS5ncm91cCgpO1xuICAgIGNvbnNvbGUud2FybihgPT09PT09PT09PUZhaWxlZCB0byBwYXJzZSBtb2NrIGNvbmZpZy49PT09PT09PT09YCk7XG4gICAgY29uc29sZS5sb2coZXJyb3JzLmpvaW4oJ1xcbicpKTtcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG5cbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cblxuICBnZXRSdWxlKG1ldGhvZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IE1vY2tSdWxlIHtcbiAgICBtZXRob2QgPSAobWV0aG9kIHx8ICdHRVQnKS50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IHBhcmFtczogYW55ID0ge307XG4gICAgY29uc3QgbGlzdCA9XG4gICAgICB0aGlzLmNhY2hlZC5maWx0ZXIoXG4gICAgICAgIHcgPT5cbiAgICAgICAgICB3Lm1ldGhvZCA9PT0gbWV0aG9kICYmXG4gICAgICAgICAgKHcubWFydGNoZXIgPyB3Lm1hcnRjaGVyLnRlc3QodXJsKSA6IHcudXJsID09PSB1cmwpLFxuICAgICAgKTtcbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHJldCA9IGxpc3QuZmluZCh3ID0+IHcudXJsID09PSB1cmwpIHx8IGxpc3RbMF07XG4gICAgaWYgKHJldC5tYXJ0Y2hlcikge1xuICAgICAgY29uc3QgZXhlY0FyciA9IHJldC5tYXJ0Y2hlci5leGVjKHVybCk7XG4gICAgICBleGVjQXJyLnNsaWNlKDEpLm1hcCgodmFsdWU6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBwYXJhbXNbcmV0LnNlZ21lbnRzW2luZGV4XV0gPSB2YWx1ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdXJsLFxuICAgICAgbWV0aG9kOiByZXQubWV0aG9kLFxuICAgICAgcGFyYW1zLFxuICAgICAgY2FsbGJhY2s6IHJldC5jYWxsYmFjayxcbiAgICB9O1xuICB9XG5cbiAgY2xlYXJDYWNoZSgpIHtcbiAgICB0aGlzLmNhY2hlZCA9IFtdO1xuICB9XG5cbiAgZ2V0IHJ1bGVzKCkge1xuICAgIHJldHVybiB0aGlzLmNhY2hlZDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2xlYXJDYWNoZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgSHR0cEludGVyY2VwdG9yLFxuICBIdHRwUmVxdWVzdCxcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBTZW50RXZlbnQsXG4gIEh0dHBIZWFkZXJSZXNwb25zZSxcbiAgSHR0cFByb2dyZXNzRXZlbnQsXG4gIEh0dHBSZXNwb25zZSxcbiAgSHR0cFVzZXJFdmVudCxcbiAgSHR0cEVycm9yUmVzcG9uc2UsXG4gIEh0dHBFdmVudCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBfSHR0cENsaWVudCB9IGZyb20gJ0BkZWxvbi90aGVtZSc7XG5cbmltcG9ydCB7IERlbG9uTW9ja0NvbmZpZyB9IGZyb20gJy4vbW9jay5jb25maWcnO1xuaW1wb3J0IHsgTW9ja1NlcnZpY2UgfSBmcm9tICcuL21vY2suc2VydmljZSc7XG5pbXBvcnQgeyBNb2NrU3RhdHVzRXJyb3IgfSBmcm9tICcuL3N0YXR1cy5lcnJvcic7XG5pbXBvcnQgeyBNb2NrUmVxdWVzdCB9IGZyb20gJy4vaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vY2tJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7fVxuXG4gIGludGVyY2VwdChcbiAgICByZXE6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgbmV4dDogSHR0cEhhbmRsZXIsXG4gICk6IE9ic2VydmFibGU8XG4gICAgfCBIdHRwU2VudEV2ZW50XG4gICAgfCBIdHRwSGVhZGVyUmVzcG9uc2VcbiAgICB8IEh0dHBQcm9ncmVzc0V2ZW50XG4gICAgfCBIdHRwUmVzcG9uc2U8YW55PlxuICAgIHwgSHR0cFVzZXJFdmVudDxhbnk+XG4gID4ge1xuICAgIGNvbnN0IHNyYyA9IHRoaXMuaW5qZWN0b3IuZ2V0KE1vY2tTZXJ2aWNlKTtcbiAgICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKFxuICAgICAge1xuICAgICAgICBkZWxheTogMzAwLFxuICAgICAgICBmb3JjZTogZmFsc2UsXG4gICAgICAgIGxvZzogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICB0aGlzLmluamVjdG9yLmdldChEZWxvbk1vY2tDb25maWcsIG51bGwpLFxuICAgICk7XG4gICAgY29uc3QgcnVsZSA9IHNyYy5nZXRSdWxlKHJlcS5tZXRob2QsIHJlcS51cmwuc3BsaXQoJz8nKVswXSk7XG4gICAgaWYgKCFydWxlICYmICFjb25maWcuZm9yY2UpIHtcbiAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpO1xuICAgIH1cblxuICAgIGxldCByZXM6IGFueTtcbiAgICBzd2l0Y2ggKHR5cGVvZiBydWxlLmNhbGxiYWNrKSB7XG4gICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgIGNvbnN0IG1vY2tSZXF1ZXN0OiBNb2NrUmVxdWVzdCA9IHtcbiAgICAgICAgICBvcmlnaW5hbDogcmVxLFxuICAgICAgICAgIGJvZHk6IHJlcS5ib2R5LFxuICAgICAgICAgIHF1ZXJ5U3RyaW5nOiB7fSxcbiAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICBwYXJhbXM6IHJ1bGUucGFyYW1zLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB1cmxQYXJhbXMgPSByZXEudXJsLnNwbGl0KCc/Jyk7XG4gICAgICAgIGlmICh1cmxQYXJhbXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHVybFBhcmFtc1sxXS5zcGxpdCgnJicpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtQXJyID0gaXRlbS5zcGxpdCgnPScpO1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gaXRlbUFyclswXTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gaXRlbUFyclsxXTtcbiAgICAgICAgICAgIC8vIGlzIGFycmF5XG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMobW9ja1JlcXVlc3QucXVlcnlTdHJpbmcpLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG1vY2tSZXF1ZXN0LnF1ZXJ5U3RyaW5nW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgbW9ja1JlcXVlc3QucXVlcnlTdHJpbmdba2V5XSA9IFttb2NrUmVxdWVzdC5xdWVyeVN0cmluZ1trZXldXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBtb2NrUmVxdWVzdC5xdWVyeVN0cmluZ1trZXldLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbW9ja1JlcXVlc3QucXVlcnlTdHJpbmdba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJlcS5wYXJhbXNcbiAgICAgICAgICAua2V5cygpXG4gICAgICAgICAgLmZvckVhY2goa2V5ID0+IChtb2NrUmVxdWVzdC5xdWVyeVN0cmluZ1trZXldID0gcmVxLnBhcmFtcy5nZXQoa2V5KSkpO1xuICAgICAgICByZXEuaGVhZGVyc1xuICAgICAgICAgIC5rZXlzKClcbiAgICAgICAgICAuZm9yRWFjaChrZXkgPT4gKG1vY2tSZXF1ZXN0LmhlYWRlcnNba2V5XSA9IHJlcS5oZWFkZXJzLmdldChrZXkpKSk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXMgPSBydWxlLmNhbGxiYWNrLmNhbGwodGhpcywgbW9ja1JlcXVlc3QpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgbGV0IGVyclJlczogSHR0cEVycm9yUmVzcG9uc2U7XG4gICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBNb2NrU3RhdHVzRXJyb3IpIHtcbiAgICAgICAgICAgIGVyclJlcyA9IG5ldyBIdHRwRXJyb3JSZXNwb25zZSh7XG4gICAgICAgICAgICAgIHVybDogcmVxLnVybCxcbiAgICAgICAgICAgICAgaGVhZGVyczogcmVxLmhlYWRlcnMsXG4gICAgICAgICAgICAgIHN0YXR1czogZS5zdGF0dXMsXG4gICAgICAgICAgICAgIHN0YXR1c1RleHQ6IGUuc3RhdHVzVGV4dCB8fCAnVW5rbm93biBFcnJvcicsXG4gICAgICAgICAgICAgIGVycm9yOiBlLmVycm9yLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY29uZmlnLmxvZylcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYCVjw7DCn8KSwoAke3JlcS5tZXRob2R9LT4ke3JlcS51cmx9YCxcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZDojMDAwO2NvbG9yOiNiYWRhNTUnLFxuICAgICAgICAgICAgICAgIGVyclJlcyxcbiAgICAgICAgICAgICAgICByZXEsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICBgJWPDsMKfwpLCgCR7cmVxLm1ldGhvZH0tPiR7cmVxLnVybH1gLFxuICAgICAgICAgICAgICAnYmFja2dyb3VuZDojMDAwO2NvbG9yOiNiYWRhNTUnLFxuICAgICAgICAgICAgICBgUGxlYXNlIHVzZSBNb2NrU3RhdHVzRXJyb3IgdG8gdGhyb3cgc3RhdHVzIGVycm9yYCxcbiAgICAgICAgICAgICAgZSxcbiAgICAgICAgICAgICAgcmVxLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8SHR0cEV2ZW50PGFueT4+KSA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlcnJSZXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVzID0gcnVsZS5jYWxsYmFjaztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+ID0gbmV3IEh0dHBSZXNwb25zZSh7XG4gICAgICBzdGF0dXM6IDIwMCxcbiAgICAgIGJvZHk6IHJlcyxcbiAgICAgIHVybDogcmVxLnVybCxcbiAgICB9KTtcblxuICAgIGlmIChjb25maWcubG9nKSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCVjw7DCn8KRwr0ke3JlcS5tZXRob2R9LT4ke3JlcS51cmx9LT5yZXF1ZXN0YCxcbiAgICAgICAgJ2JhY2tncm91bmQ6IzAwMDtjb2xvcjojYmFkYTU1JyxcbiAgICAgICAgcmVxLFxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgJWPDsMKfwpHCvSR7cmVxLm1ldGhvZH0tPiR7cmVxLnVybH0tPnJlc3BvbnNlYCxcbiAgICAgICAgJ2JhY2tncm91bmQ6IzAwMDtjb2xvcjojYmFkYTU1JyxcbiAgICAgICAgcmVzcG9uc2UsXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBoYyA9IHRoaXMuaW5qZWN0b3IuZ2V0KF9IdHRwQ2xpZW50LCBudWxsKTtcbiAgICBpZiAoaGMpIHtcbiAgICAgIGhjLmJlZ2luKCk7XG4gICAgfVxuICAgIHJldHVybiBvZihyZXNwb25zZSkucGlwZShcbiAgICAgIGRlbGF5KGNvbmZpZy5kZWxheSksXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICBpZiAoaGMpIHtcbiAgICAgICAgICBoYy5lbmQoKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBEZWxvbk1vY2tDb25maWcgfSBmcm9tICcuL21vY2suY29uZmlnJztcbmltcG9ydCB7IE1vY2tTZXJ2aWNlIH0gZnJvbSAnLi9tb2NrLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9ja0ludGVyY2VwdG9yIH0gZnJvbSAnLi9tb2NrLmludGVyY2VwdG9yJztcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIERlbG9uTW9ja01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogRGVsb25Nb2NrQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEZWxvbk1vY2tNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTW9ja1NlcnZpY2UsXG4gICAgICAgIHsgcHJvdmlkZTogRGVsb25Nb2NrQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnIH0sXG4gICAgICAgIHsgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBNb2NrSW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZm9yQ2hpbGQoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEZWxvbk1vY2tNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IE1vY2tJbnRlcmNlcHRvciwgbXVsdGk6IHRydWUgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJIdHRwRXJyb3JSZXNwb25zZSIsIk9ic2VydmFibGUiLCJIdHRwUmVzcG9uc2UiLCJfSHR0cENsaWVudCIsIm9mIiwiZGVsYXkiLCJ0YXAiLCJJbmplY3RvciIsIkhUVFBfSU5URVJDRVBUT1JTIiwiTmdNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxRQUFBO1FBRUUseUJBQW1CLE1BQWMsRUFBUyxLQUFXO1lBQWxDLFdBQU0sR0FBTixNQUFNLENBQVE7WUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFNO1NBQUk7OEJBRjNEO1FBR0M7Ozs7OztBQ0hELFFBQUE7Ozs7O3lCQUlXLEdBQUc7Ozs7eUJB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
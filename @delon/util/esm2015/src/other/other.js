/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import extend from 'extend';
/**
 * 类似 `_.get`，根据 `path` 获取安全值
 * jsperf: https://jsperf.com/es-deep-getttps://jsperf.com/es-deep-get
 *
 * @param {?} obj 数据源，无效时直接返回 `defaultValue` 值
 * @param {?} path 若 `null`、`[]`、未定义及未找到时返回 `defaultValue` 值
 * @param {?=} defaultValue 默认值
 * @return {?}
 */
export function deepGet(obj, path, defaultValue) {
    if (!obj || path == null || path.length === 0)
        return defaultValue;
    if (!Array.isArray(path)) {
        path = ~path.indexOf('.') ? path.split('.') : [path];
    }
    if (path.length === 1) {
        /** @type {?} */
        const checkObj = obj[path[0]];
        return typeof checkObj === 'undefined' ? defaultValue : checkObj;
    }
    /** @type {?} */
    const res = path.reduce((/**
     * @param {?} o
     * @param {?} k
     * @return {?}
     */
    (o, k) => (o || {})[k]), obj);
    return typeof res === 'undefined' ? defaultValue : res;
}
/**
 * @param {?} obj
 * @return {?}
 */
export function deepCopy(obj) {
    /** @type {?} */
    const result = extend(true, {}, { _: obj });
    return result._;
}
/**
 * 复制内容至剪贴板
 * @param {?} value
 * @return {?}
 */
export function copy(value) {
    return new Promise((/**
     * @param {?} resolve
     * @return {?}
     */
    (resolve) => {
        /** @type {?} */
        let copyTextArea = null;
        try {
            copyTextArea = document.createElement('textarea');
            copyTextArea.style.height = '0px';
            copyTextArea.style.opacity = '0';
            copyTextArea.style.width = '0px';
            document.body.appendChild(copyTextArea);
            copyTextArea.value = value;
            copyTextArea.select();
            document.execCommand('copy');
            resolve(value);
        }
        finally {
            if (copyTextArea && copyTextArea.parentNode) {
                copyTextArea.parentNode.removeChild(copyTextArea);
            }
        }
    }));
}
/**
 * @param {?} original
 * @param {?} ingoreArray
 * @param {...?} objects
 * @return {?}
 */
export function deepMergeKey(original, ingoreArray, ...objects) {
    if (Array.isArray(original) || typeof original !== 'object')
        return original;
    /** @type {?} */
    const isObject = (/**
     * @param {?} v
     * @return {?}
     */
    (v) => typeof v === 'object' || typeof v === 'function');
    /** @type {?} */
    const merge = (/**
     * @param {?} target
     * @param {?} obj
     * @return {?}
     */
    (target, obj) => {
        Object.keys(obj)
            .filter((/**
         * @param {?} key
         * @return {?}
         */
        key => key !== '__proto__' && Object.prototype.hasOwnProperty.call(obj, key)))
            .forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            /** @type {?} */
            const oldValue = obj[key];
            /** @type {?} */
            const newValue = target[key];
            if (Array.isArray(newValue)) {
                target[key] = ingoreArray ? oldValue : [...newValue, ...oldValue];
            }
            else if (oldValue != null && isObject(oldValue) && newValue != null && isObject(newValue)) {
                target[key] = merge(newValue, oldValue);
            }
            else {
                target[key] = deepCopy(oldValue);
            }
        }));
        return target;
    });
    objects.filter((/**
     * @param {?} v
     * @return {?}
     */
    v => v != null && isObject(v))).forEach((/**
     * @param {?} v
     * @return {?}
     */
    v => merge(original, v)));
    return original;
}
/**
 * @param {?} original
 * @param {...?} objects
 * @return {?}
 */
export function deepMerge(original, ...objects) {
    return deepMergeKey(original, false, ...objects);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RoZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVsb24vdXRpbC8iLCJzb3VyY2VzIjpbInNyYy9vdGhlci9vdGhlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7O0FBVTVCLE1BQU0sVUFBVSxPQUFPLENBQUMsR0FBZSxFQUFFLElBQTBDLEVBQUUsWUFBa0I7SUFDckcsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUFFLE9BQU8sWUFBWSxDQUFDO0lBQ25FLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3hCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEQ7SUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOztjQUNmLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sT0FBTyxRQUFRLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztLQUNsRTs7VUFDSyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU07Ozs7O0lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRSxHQUFHLENBQUM7SUFDcEQsT0FBTyxPQUFPLEdBQUcsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ3pELENBQUM7Ozs7O0FBRUQsTUFBTSxV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QUE7SUFFRCxPQUFPLENBQUMsTUFBTTs7OztJQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPOzs7O0lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUM7SUFFL0UsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxRQUFhLEVBQUUsR0FBRyxPQUFjO0lBQ3hELE9BQU8sWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztBQUNuRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnO1xuXG4vKipcbiAqIOexu+S8vCBgXy5nZXRg77yM5qC55o2uIGBwYXRoYCDojrflj5blronlhajlgLxcbiAqIGpzcGVyZjogaHR0cHM6Ly9qc3BlcmYuY29tL2VzLWRlZXAtZ2V0dHRwczovL2pzcGVyZi5jb20vZXMtZGVlcC1nZXRcbiAqXG4gKiBAcGFyYW0gb2JqIOaVsOaNrua6kO+8jOaXoOaViOaXtuebtOaOpei/lOWbniBgZGVmYXVsdFZhbHVlYCDlgLxcbiAqIEBwYXJhbSBwYXRoIOiLpSBgbnVsbGDjgIFgW11g44CB5pyq5a6a5LmJ5Y+K5pyq5om+5Yiw5pe26L+U5ZueIGBkZWZhdWx0VmFsdWVgIOWAvFxuICogQHBhcmFtIGRlZmF1bHRWYWx1ZSDpu5jorqTlgLxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBHZXQob2JqOiBhbnkgfCBudWxsLCBwYXRoOiBzdHJpbmcgfCBzdHJpbmdbXSB8IG51bGwgfCB1bmRlZmluZWQsIGRlZmF1bHRWYWx1ZT86IGFueSk6IGFueSB7XG4gIGlmICghb2JqIHx8IHBhdGggPT0gbnVsbCB8fCBwYXRoLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHBhdGgpKSB7XG4gICAgcGF0aCA9IH5wYXRoLmluZGV4T2YoJy4nKSA/IHBhdGguc3BsaXQoJy4nKSA6IFtwYXRoXTtcbiAgfVxuICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICBjb25zdCBjaGVja09iaiA9IG9ialtwYXRoWzBdXTtcbiAgICByZXR1cm4gdHlwZW9mIGNoZWNrT2JqID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRWYWx1ZSA6IGNoZWNrT2JqO1xuICB9XG4gIGNvbnN0IHJlcyA9IHBhdGgucmVkdWNlKChvLCBrKSA9PiAobyB8fCB7fSlba10sIG9iaik7XG4gIHJldHVybiB0eXBlb2YgcmVzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRWYWx1ZSA6IHJlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBDb3B5KG9iajogYW55KTogYW55IHtcbiAgY29uc3QgcmVzdWx0ID0gZXh0ZW5kKHRydWUsIHt9LCB7IF86IG9iaiB9KTtcbiAgcmV0dXJuIHJlc3VsdC5fO1xufVxuXG4vKiog5aSN5Yi25YaF5a656Iez5Ymq6LS05p2/ICovXG5leHBvcnQgZnVuY3Rpb24gY29weSh2YWx1ZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUpOiB2b2lkID0+IHtcbiAgICBsZXQgY29weVRleHRBcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgdHJ5IHtcbiAgICAgIGNvcHlUZXh0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgICBjb3B5VGV4dEFyZWEuc3R5bGUuaGVpZ2h0ID0gJzBweCc7XG4gICAgICBjb3B5VGV4dEFyZWEuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgIGNvcHlUZXh0QXJlYS5zdHlsZS53aWR0aCA9ICcwcHgnO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb3B5VGV4dEFyZWEpO1xuICAgICAgY29weVRleHRBcmVhLnZhbHVlID0gdmFsdWU7XG4gICAgICBjb3B5VGV4dEFyZWEuc2VsZWN0KCk7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChjb3B5VGV4dEFyZWEgJiYgY29weVRleHRBcmVhLnBhcmVudE5vZGUpIHtcbiAgICAgICAgY29weVRleHRBcmVhLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY29weVRleHRBcmVhKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVlcE1lcmdlS2V5KG9yaWdpbmFsOiBhbnksIGluZ29yZUFycmF5OiBib29sZWFuLCAuLi5vYmplY3RzOiBhbnlbXSk6IGFueSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9yaWdpbmFsKSB8fCB0eXBlb2Ygb3JpZ2luYWwgIT09ICdvYmplY3QnKSByZXR1cm4gb3JpZ2luYWw7XG5cbiAgY29uc3QgaXNPYmplY3QgPSAodjogYW55KSA9PiB0eXBlb2YgdiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHYgPT09ICdmdW5jdGlvbic7XG5cbiAgY29uc3QgbWVyZ2UgPSAodGFyZ2V0OiBhbnksIG9iajoge30pID0+IHtcbiAgICBPYmplY3Qua2V5cyhvYmopXG4gICAgICAuZmlsdGVyKGtleSA9PiBrZXkgIT09ICdfX3Byb3RvX18nICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpXG4gICAgICAuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IG9ialtrZXldO1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRhcmdldFtrZXldO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdWYWx1ZSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IGluZ29yZUFycmF5ID8gb2xkVmFsdWUgOiBbLi4ubmV3VmFsdWUsIC4uLm9sZFZhbHVlXTtcbiAgICAgICAgfSBlbHNlIGlmIChvbGRWYWx1ZSAhPSBudWxsICYmIGlzT2JqZWN0KG9sZFZhbHVlKSAmJiBuZXdWYWx1ZSAhPSBudWxsICYmIGlzT2JqZWN0KG5ld1ZhbHVlKSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gbWVyZ2UobmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IGRlZXBDb3B5KG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICBvYmplY3RzLmZpbHRlcih2ID0+IHYgIT0gbnVsbCAmJiBpc09iamVjdCh2KSkuZm9yRWFjaCh2ID0+IG1lcmdlKG9yaWdpbmFsLCB2KSk7XG5cbiAgcmV0dXJuIG9yaWdpbmFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVlcE1lcmdlKG9yaWdpbmFsOiBhbnksIC4uLm9iamVjdHM6IGFueVtdKTogYW55IHtcbiAgcmV0dXJuIGRlZXBNZXJnZUtleShvcmlnaW5hbCwgZmFsc2UsIC4uLm9iamVjdHMpO1xufVxuIl19
import * as i0 from '@angular/core';
import { Injectable, inject, TemplateRef, Input, Directive, Host, ViewContainerRef, ChangeDetectorRef, EventEmitter, Output, ViewEncapsulation, ChangeDetectionStrategy, Component, ElementRef, DestroyRef, input, booleanAttribute, effect, numberAttribute, ViewChild, NgModule, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';
import * as i4 from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { ACLService } from '@delon/acl';
import * as i1 from '@delon/theme';
import { ALAIN_I18N_TOKEN, ModalHelper, DrawerHelper, DelonLocaleService, DatePipe, YNPipe } from '@delon/theme';
import { warn, deepCopy, deepGet, deepMergeKey } from '@delon/util/other';
import { HttpParams } from '@angular/common/http';
import { map, of, filter, finalize, catchError, throwError, isObservable, lastValueFrom } from 'rxjs';
import * as i2 from '@angular/common';
import { NgTemplateOutlet, DOCUMENT, DecimalPipe } from '@angular/common';
import * as i3 from '@delon/util/format';
import { XlsxService } from '@delon/abc/xlsx';
import * as i6 from '@angular/cdk/drag-drop';
import { moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as i1$1 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CellComponent } from '@delon/abc/cell';
import { AlainConfigService } from '@delon/util/config';
import { NzBadgeComponent } from 'ng-zorro-antd/badge';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import * as i3$1 from 'ng-zorro-antd/dropdown';
import { NzDropDownModule, NzContextMenuService } from 'ng-zorro-antd/dropdown';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import * as i2$1 from 'ng-zorro-antd/menu';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzRadioComponent } from 'ng-zorro-antd/radio';
import * as i5 from 'ng-zorro-antd/resizable';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import * as i4$1 from 'ng-zorro-antd/table';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzRangePickerComponent, NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';

class STRowSource {
    titles = {};
    rows = {};
    add(type, path, ref) {
        this[type === 'title' ? 'titles' : 'rows'][path] = ref;
    }
    getTitle(path) {
        return this.titles[path];
    }
    getRow(path) {
        return this.rows[path];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STRowSource, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STRowSource });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STRowSource, decorators: [{
            type: Injectable
        }] });
class STRowDirective {
    source = inject(STRowSource, { host: true });
    ref = inject(TemplateRef);
    id;
    type;
    ngOnInit() {
        this.source.add(this.type, this.id, this.ref);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STRowDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.1.2", type: STRowDirective, isStandalone: true, selector: "[st-row]", inputs: { id: ["st-row", "id"], type: "type" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STRowDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[st-row]'
                }]
        }], propDecorators: { id: [{
                type: Input,
                args: ['st-row']
            }], type: [{
                type: Input
            }] } });

class STWidgetRegistry {
    _widgets = {};
    get widgets() {
        return this._widgets;
    }
    register(type, widget) {
        this._widgets[type] = widget;
    }
    has(type) {
        return Object.prototype.hasOwnProperty.call(this._widgets, type);
    }
    get(type) {
        return this._widgets[type];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STWidgetRegistry, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STWidgetRegistry, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STWidgetRegistry, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class STColumnSource {
    dom = inject(DomSanitizer);
    rowSource = inject(STRowSource, { host: true });
    acl = inject(ACLService, { optional: true });
    i18nSrv = inject(ALAIN_I18N_TOKEN, { optional: true });
    stWidgetRegistry = inject(STWidgetRegistry);
    cog;
    setCog(val) {
        this.cog = val;
    }
    fixPop(i, def) {
        if (i.pop == null || i.pop === false) {
            i.pop = false;
            return;
        }
        let pop = {
            okType: 'primary',
            ...def
        };
        if (typeof i.pop === 'string') {
            pop.title = i.pop;
        }
        else if (typeof i.pop === 'object') {
            pop = {
                ...pop,
                ...i.pop
            };
        }
        if (typeof pop.condition !== 'function') {
            pop.condition = () => false;
        }
        if (this.i18nSrv) {
            if (pop.titleI18n)
                pop.title = this.i18nSrv.fanyi(pop.titleI18n);
            if (pop.okTextI18n)
                pop.okText = this.i18nSrv.fanyi(pop.okTextI18n);
            if (pop.cancelTextI18n)
                pop.cancelText = this.i18nSrv.fanyi(pop.cancelTextI18n);
        }
        i.pop = pop;
    }
    btnCoerce(list) {
        if (!list)
            return [];
        const ret = [];
        const { modal, drawer, pop, btnIcon } = this.cog;
        for (const item of list) {
            if (this.acl && item.acl && !this.acl.can(item.acl)) {
                continue;
            }
            if (item.type === 'modal' || item.type === 'static') {
                if (item.modal == null || item.modal.component == null) {
                    if (typeof ngDevMode === 'undefined' || ngDevMode) {
                        console.warn(`[st] Should specify modal parameter when type is modal or static`);
                    }
                    item.type = 'none';
                }
                else {
                    item.modal = { paramsName: 'record', size: 'lg', ...modal, ...item.modal };
                }
            }
            if (item.type === 'drawer') {
                if (item.drawer == null || item.drawer.component == null) {
                    if (typeof ngDevMode === 'undefined' || ngDevMode) {
                        console.warn(`[st] Should specify drawer parameter when type is drawer`);
                    }
                    item.type = 'none';
                }
                else {
                    item.drawer = { paramsName: 'record', size: 'lg', ...drawer, ...item.drawer };
                }
            }
            if (item.type === 'del' && typeof item.pop === 'undefined') {
                item.pop = true;
            }
            // pop
            this.fixPop(item, pop);
            if (typeof item.icon !== 'function') {
                item.icon = {
                    ...btnIcon,
                    ...(typeof item.icon === 'string' ? { type: item.icon } : item.icon)
                };
            }
            item.children = item.children && item.children.length > 0 ? this.btnCoerce(item.children) : [];
            // i18n
            if (item.i18n && this.i18nSrv) {
                item.text = this.i18nSrv.fanyi(item.i18n);
            }
            ret.push(item);
        }
        this.btnCoerceIf(ret);
        return ret;
    }
    btnCoerceIf(list) {
        for (const item of list) {
            item.iifBehavior = item.iifBehavior || this.cog.iifBehavior;
            if (item.children && item.children.length > 0) {
                this.btnCoerceIf(item.children);
            }
            else {
                item.children = [];
            }
        }
    }
    fixedCoerce(list, expand) {
        const countReduce = (a, b) => a + +b.width.toString().replace('px', '');
        const expandWidth = expand ? 50 : 0;
        // left width
        list
            .filter(w => w.fixed && w.fixed === 'left' && w.width)
            .forEach((item, idx) => (item._left = `${list.slice(0, idx).reduce(countReduce, 0) + expandWidth}px`));
        // right width
        list
            .filter(w => w.fixed && w.fixed === 'right' && w.width)
            .reverse()
            .forEach((item, idx) => (item._right = `${idx > 0 ? list.slice(-idx).reduce(countReduce, 0) : 0}px`));
    }
    sortCoerce(item) {
        const res = this.fixSortCoerce(item);
        res.reName = {
            ...this.cog.sortReName,
            ...res.reName
        };
        return res;
    }
    fixSortCoerce(item) {
        if (typeof item.sort === 'undefined') {
            return { enabled: false };
        }
        let res = {};
        if (typeof item.sort === 'string') {
            if (item.sort === 'ascend' || item.sort === 'descend') {
                res.directions = [item.sort, null];
            }
            else {
                res.key = item.sort;
            }
        }
        else if (typeof item.sort !== 'boolean') {
            res = item.sort;
        }
        else if (typeof item.sort === 'boolean') {
            res.compare = (a, b) => a[item.indexKey] - b[item.indexKey];
        }
        if (!res.key) {
            res.key = item.indexKey;
        }
        if (!Array.isArray(res.directions)) {
            res.directions = this.cog.sortDirections ?? ['ascend', 'descend', null];
        }
        res.enabled = true;
        return res;
    }
    filterCoerce(item) {
        if (item.filter == null) {
            return null;
        }
        let res = item.filter;
        res.type = res.type || 'default';
        res.showOPArea = res.showOPArea !== false;
        let icon = 'filter';
        let iconTheme = 'fill';
        let fixMenus = true;
        let value = undefined;
        switch (res.type) {
            case 'keyword':
                icon = 'search';
                iconTheme = 'outline';
                break;
            case 'number':
                icon = 'search';
                iconTheme = 'outline';
                res.number = {
                    step: 1,
                    min: -Infinity,
                    max: Infinity,
                    ...res.number
                };
                break;
            case 'date':
                icon = 'calendar';
                iconTheme = 'outline';
                res.date = {
                    range: false,
                    mode: 'date',
                    showToday: true,
                    showNow: false,
                    ...res.date
                };
                break;
            case 'custom':
                break;
            default:
                fixMenus = false;
                break;
        }
        if (fixMenus && (res.menus == null || res.menus.length === 0)) {
            res.menus = [{ value }];
        }
        if (res.menus?.length === 0) {
            return null;
        }
        if (typeof res.multiple === 'undefined') {
            res.multiple = true;
        }
        res.confirmText = res.confirmText || this.cog.filterConfirmText;
        res.clearText = res.clearText || this.cog.filterClearText;
        res.key = res.key || item.indexKey;
        res.icon = res.icon || icon;
        const baseIcon = { type: icon, theme: iconTheme };
        if (typeof res.icon === 'string') {
            res.icon = { ...baseIcon, type: res.icon };
        }
        else {
            res.icon = { ...baseIcon, ...res.icon };
        }
        this.updateDefault(res);
        if (this.acl) {
            res.menus = res.menus?.filter(w => this.acl.can(w.acl));
        }
        return res.menus?.length === 0 ? null : res;
    }
    restoreRender(item) {
        if (item.renderTitle) {
            item.__renderTitle =
                typeof item.renderTitle === 'string'
                    ? this.rowSource.getTitle(item.renderTitle)
                    : item.renderTitle;
        }
        if (item.render) {
            item.__render =
                typeof item.render === 'string' ? this.rowSource.getRow(item.render) : item.render;
        }
    }
    widgetCoerce(item) {
        if (item.type !== 'widget')
            return;
        if (item.widget == null || !this.stWidgetRegistry.has(item.widget.type)) {
            delete item.type;
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                warn(`st: No widget for type "${item.widget?.type}"`);
            }
        }
    }
    genHeaders(rootColumns) {
        const rows = [];
        const widths = [];
        const fillRowCells = (columns, colIndex, rowIndex = 0) => {
            // Init rows
            rows[rowIndex] = rows[rowIndex] || [];
            let currentColIndex = colIndex;
            const colSpans = columns.map(column => {
                const cell = {
                    column,
                    colStart: currentColIndex,
                    hasSubColumns: false
                };
                let colSpan = 1;
                const subColumns = column.children;
                if (Array.isArray(subColumns) && subColumns.length > 0) {
                    colSpan = fillRowCells(subColumns, currentColIndex, rowIndex + 1).reduce((total, count) => total + count, 0);
                    cell.hasSubColumns = true;
                }
                else {
                    widths.push(cell.column.width || '');
                }
                if ('colSpan' in column) {
                    colSpan = column.colSpan;
                }
                if ('rowSpan' in column) {
                    cell.rowSpan = column.rowSpan;
                }
                cell.colSpan = colSpan;
                cell.colEnd = cell.colStart + colSpan - 1;
                rows[rowIndex].push(cell);
                currentColIndex += colSpan;
                return colSpan;
            });
            return colSpans;
        };
        fillRowCells(rootColumns, 0);
        // Handle `rowSpan`
        const rowCount = rows.length;
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
            rows[rowIndex].forEach(cell => {
                if (!('rowSpan' in cell) && !cell.hasSubColumns) {
                    cell.rowSpan = rowCount - rowIndex;
                }
            });
        }
        return { headers: rows, headerWidths: rowCount > 1 ? widths : null };
    }
    cleanCond(list) {
        const res = [];
        const copyList = deepCopy(list);
        for (const item of copyList) {
            if (typeof item.iif === 'function' && !item.iif(item)) {
                continue;
            }
            if (this.acl && item.acl && !this.acl.can(item.acl)) {
                continue;
            }
            if (Array.isArray(item.children) && item.children.length > 0) {
                item.children = this.cleanCond(item.children);
            }
            res.push(item);
        }
        return res;
    }
    mergeClass(item) {
        const builtInClassNames = [];
        if (item._isTruncate) {
            builtInClassNames.push('text-truncate');
        }
        const rawClassName = item.className;
        if (!rawClassName) {
            const typeClass = {
                number: 'text-right',
                currency: 'text-right',
                date: 'text-center'
            }[item.type];
            if (typeClass) {
                builtInClassNames.push(typeClass);
            }
            item._className = builtInClassNames;
            return;
        }
        const rawClassNameIsArray = Array.isArray(rawClassName);
        if (!rawClassNameIsArray && typeof rawClassName === 'object') {
            const objClassNames = rawClassName;
            builtInClassNames.forEach(key => (objClassNames[key] = true));
            item._className = objClassNames;
            return;
        }
        const arrayClassNames = rawClassNameIsArray ? Array.from(rawClassName) : [rawClassName];
        arrayClassNames.splice(0, 0, ...builtInClassNames);
        item._className = [...new Set(arrayClassNames)].filter(w => !!w);
    }
    process(list, options) {
        if (!list || list.length === 0) {
            return { columns: [], headers: [], headerWidths: null };
        }
        const { noIndex } = this.cog;
        let checkboxCount = 0;
        let radioCount = 0;
        const columns = [];
        const processItem = (item) => {
            // index
            if (item.index) {
                if (!Array.isArray(item.index)) {
                    item.index = item.index.toString().split('.');
                }
                item.indexKey = item.index.join('.');
            }
            // #region title
            const tit = (typeof item.title === 'string' ? { text: item.title } : item.title) || {};
            if (tit.i18n && this.i18nSrv) {
                tit.text = this.i18nSrv.fanyi(tit.i18n);
            }
            if (tit.text) {
                tit._text = this.dom.bypassSecurityTrustHtml(tit.text);
            }
            item.title = tit;
            // #endregion
            // no
            if (item.type === 'no') {
                item.noIndex = item.noIndex == null ? noIndex : item.noIndex;
            }
            // checkbox
            if (item.selections == null) {
                item.selections = [];
            }
            if (item.type === 'checkbox') {
                ++checkboxCount;
                if (!item.width) {
                    item.width = `${item.selections.length > 0 ? 62 : 50}px`;
                }
            }
            if (this.acl) {
                item.selections = item.selections.filter(w => this.acl.can(w.acl));
            }
            // radio
            if (item.type === 'radio') {
                ++radioCount;
                item.selections = [];
                if (!item.width) {
                    item.width = '50px';
                }
            }
            // cell
            if (item.cell != null) {
                item.type = 'cell';
            }
            // types
            if (item.type === 'yn') {
                item.yn = { truth: true, ...this.cog.yn, ...item.yn };
            }
            // date
            if (item.type === 'date') {
                item.dateFormat = item.dateFormat || this.cog.date?.format;
            }
            if ((item.type === 'link' && typeof item.click !== 'function') ||
                (item.type === 'badge' && item.badge == null) ||
                (item.type === 'tag' && item.tag == null) ||
                (item.type === 'enum' && item.enum == null)) {
                item.type = '';
            }
            item._isTruncate = !!item.width && options.widthMode.strictBehavior === 'truncate' && item.type !== 'img';
            // className
            this.mergeClass(item);
            // width
            if (typeof item.width === 'number') {
                item._width = item.width;
                item.width = `${item.width}px`;
            }
            item._left = false;
            item._right = false;
            item.safeType = item.safeType ?? options.safeType;
            // sorter
            item._sort = this.sortCoerce(item);
            // filter
            item.filter = this.filterCoerce(item);
            // buttons
            item.buttons = this.btnCoerce(item.buttons);
            // widget
            this.widgetCoerce(item);
            // restore custom row
            this.restoreRender(item);
            // resizable
            item.resizable = {
                disabled: true,
                bounds: 'window',
                minWidth: 60,
                maxWidth: 360,
                preview: true,
                ...options.resizable,
                ...(typeof item.resizable === 'boolean' ? { disabled: !item.resizable } : item.resizable)
            };
            return item;
        };
        const processList = (data) => {
            for (const item of data) {
                columns.push(processItem(item));
                if (Array.isArray(item.children)) {
                    processList(item.children);
                }
            }
        };
        const copyList = this.cleanCond(list);
        processList(copyList);
        if (checkboxCount > 1) {
            throw new Error(`[st]: just only one column checkbox`);
        }
        if (radioCount > 1) {
            throw new Error(`[st]: just only one column radio`);
        }
        this.fixedCoerce(columns, options.expand);
        return {
            columns: columns.filter(w => !Array.isArray(w.children) || w.children.length === 0),
            ...this.genHeaders(copyList)
        };
    }
    restoreAllRender(columns) {
        columns.forEach(i => this.restoreRender(i));
    }
    updateDefault(filter) {
        if (filter.menus == null)
            return this;
        if (filter.type === 'default') {
            filter.default = filter.menus.findIndex(w => w.checked) !== -1;
        }
        else {
            filter.default = !!filter.menus[0].value;
        }
        return this;
    }
    cleanFilter(col) {
        const f = col.filter;
        f.default = false;
        if (f.type === 'default') {
            f.menus.forEach(i => (i.checked = false));
        }
        else {
            f.menus[0].value = undefined;
        }
        return this;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STColumnSource, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STColumnSource });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STColumnSource, decorators: [{
            type: Injectable
        }] });

class STDataSource {
    http;
    datePipe;
    ynPipe;
    numberPipe;
    currencySrv;
    dom;
    cog;
    sortTick = 0;
    constructor(http, datePipe, ynPipe, numberPipe, currencySrv, dom) {
        this.http = http;
        this.datePipe = datePipe;
        this.ynPipe = ynPipe;
        this.numberPipe = numberPipe;
        this.currencySrv = currencySrv;
        this.dom = dom;
    }
    setCog(val) {
        this.cog = val;
    }
    process(options) {
        let data$;
        let isRemote = false;
        const { data, res, total, page, pi, ps, paginator, columns, headers } = options;
        let retTotal;
        let retPs;
        let retList;
        let retPi;
        let rawData;
        let showPage = page.show;
        if (typeof data === 'string') {
            isRemote = true;
            data$ = this.getByRemote(data, options).pipe(map(result => {
                rawData = result;
                let ret;
                if (Array.isArray(result)) {
                    ret = result;
                    retTotal = ret.length;
                    retPs = retTotal;
                    showPage = false;
                }
                else {
                    const reName = res.reName;
                    if (typeof reName === 'function') {
                        const fnRes = reName(result, { pi, ps, total });
                        ret = fnRes.list;
                        retTotal = fnRes.total;
                    }
                    else {
                        // list
                        ret = deepGet(result, reName.list, []);
                        if (ret == null || !Array.isArray(ret)) {
                            ret = [];
                        }
                        // total
                        const resultTotal = reName.total && deepGet(result, reName.total, null);
                        retTotal = resultTotal == null ? total || 0 : +resultTotal;
                    }
                }
                return deepCopy(ret);
            }));
        }
        else if (data == null || Array.isArray(data)) {
            data$ = of(data ?? []);
        }
        else {
            // a cold observable
            data$ = data;
        }
        if (!isRemote) {
            data$ = data$.pipe(
            // sort
            map((result) => {
                rawData = result;
                let copyResult = deepCopy(result);
                const sorterFn = this.getSorterFn(headers);
                if (sorterFn) {
                    copyResult = copyResult.sort(sorterFn);
                }
                return copyResult;
            }), 
            // filter
            map((result) => {
                columns
                    .filter(w => w.filter)
                    .forEach(c => {
                    const filter = c.filter;
                    const values = this.getFilteredData(filter);
                    if (values.length === 0)
                        return;
                    const onFilter = filter.fn;
                    if (typeof onFilter !== 'function') {
                        if (typeof ngDevMode === 'undefined' || ngDevMode) {
                            console.warn(`[st] Muse provide the fn function in filter`);
                        }
                        return;
                    }
                    result = result.filter(record => values.some(v => onFilter(v, record)));
                });
                return result;
            }), 
            // paging
            map((result) => {
                if (paginator && page.front) {
                    const maxPageIndex = Math.ceil(result.length / ps);
                    retPi = Math.max(1, pi > maxPageIndex ? maxPageIndex : pi);
                    retTotal = result.length;
                    if (page.show === true) {
                        return result.slice((retPi - 1) * ps, retPi * ps);
                    }
                }
                return result;
            }));
        }
        // pre-process
        if (typeof res.process === 'function') {
            data$ = data$.pipe(map(result => res.process(result, rawData)));
        }
        data$ = data$.pipe(map(result => this.optimizeData({ result, columns, rowClassName: options.rowClassName })));
        return data$.pipe(map(result => {
            retList = result;
            const realTotal = retTotal || total;
            const realPs = retPs || ps;
            return {
                pi: retPi,
                ps: retPs,
                total: retTotal,
                list: retList,
                statistical: this.genStatistical(columns, retList, rawData),
                pageShow: typeof showPage === 'undefined' ? realTotal > realPs : showPage
            };
        }));
    }
    get(item, col, idx) {
        try {
            const safeHtml = col.safeType === 'safeHtml';
            if (col.format) {
                const formatRes = col.format(item, col, idx) || '';
                return {
                    text: formatRes,
                    _text: safeHtml ? this.dom.bypassSecurityTrustHtml(formatRes) : formatRes,
                    org: formatRes,
                    safeType: col.safeType
                };
            }
            const value = deepGet(item, col.index, col.default);
            let text = value;
            let color;
            let tooltip;
            switch (col.type) {
                case 'no':
                    text = this.getNoIndex(item, col, idx);
                    break;
                case 'img':
                    text = value ? `<img src="${value}" class="img">` : '';
                    break;
                case 'number':
                    text = this.numberPipe.transform(value, col.numberDigits);
                    break;
                case 'currency':
                    text = this.currencySrv.format(value, col.currency?.format);
                    break;
                case 'date':
                    text =
                        value == null || value === col.default || (typeof value === 'number' && value <= 0)
                            ? col.default
                            : this.datePipe.transform(value, col.dateFormat);
                    break;
                case 'yn':
                    text = this.ynPipe.transform(value === col.yn.truth, col.yn.yes, col.yn.no, col.yn.mode, false);
                    break;
                case 'enum':
                    text = col.enum[value];
                    break;
                case 'tag':
                case 'badge': {
                    const data = col.type === 'tag' ? col.tag : col.badge;
                    if (data && data[text]) {
                        const dataItem = data[text];
                        text = dataItem.text;
                        color = dataItem.color;
                        tooltip = dataItem.tooltip;
                    }
                    else {
                        text = '';
                    }
                    break;
                }
            }
            if (text == null)
                text = '';
            return {
                text,
                _text: safeHtml ? this.dom.bypassSecurityTrustHtml(text) : text,
                org: value,
                color,
                tooltip,
                safeType: col.safeType,
                buttons: []
            };
        }
        catch (ex) {
            const text = `INVALID DATA`;
            console.error(`Failed to get data`, item, col, ex);
            return { text, _text: text, org: text, buttons: [], safeType: 'text' };
        }
    }
    getByRemote(url, options) {
        const { req, page, paginator, pi, ps, singleSort, multiSort, columns, headers } = options;
        const method = (req.method || 'GET').toUpperCase();
        let params = {};
        const reName = req.reName;
        if (paginator) {
            if (req.type === 'page') {
                params = {
                    [reName.pi]: page.zeroIndexed ? pi - 1 : pi,
                    [reName.ps]: ps
                };
            }
            else {
                params = {
                    [reName.skip]: (pi - 1) * ps,
                    [reName.limit]: ps
                };
            }
        }
        params = {
            ...params,
            ...req.params,
            ...this.getReqSortMap(singleSort, multiSort, headers),
            ...this.getReqFilterMap(columns)
        };
        if (options.req.ignoreParamNull == true) {
            Object.keys(params).forEach(key => {
                if (params[key] == null)
                    delete params[key];
            });
        }
        let reqOptions = {
            params,
            body: req.body,
            headers: req.headers
        };
        if (method === 'POST' && req.allInBody === true) {
            reqOptions = {
                body: { ...req.body, ...params },
                headers: req.headers
            };
        }
        if (typeof req.process === 'function') {
            reqOptions = req.process(reqOptions);
        }
        if (!(reqOptions.params instanceof HttpParams)) {
            reqOptions.params = new HttpParams({ fromObject: reqOptions.params });
        }
        if (typeof options.customRequest === 'function') {
            return options.customRequest({ method, url, options: reqOptions });
        }
        return this.http.request(method, url, reqOptions);
    }
    getCell(c, item, idx) {
        const onCellResult = typeof c.onCell === 'function' ? c.onCell(item, idx) : null;
        const mergedColSpan = onCellResult?.colSpan ?? 1;
        const mergedRowSpan = onCellResult?.rowSpan ?? 1;
        return {
            colSpan: mergedColSpan <= 0 ? null : mergedColSpan,
            rowSpan: mergedRowSpan <= 0 ? null : mergedRowSpan
        };
    }
    optimizeData(options) {
        const { result, columns, rowClassName } = options;
        for (let i = 0, len = result.length; i < len; i++) {
            result[i]._values = columns.map(c => {
                const props = this.getCell(c, result[i], i);
                if (Array.isArray(c.buttons) && c.buttons.length > 0) {
                    return { buttons: this.genButtons(c.buttons, result[i], c), _text: '', props };
                }
                let cell;
                if (typeof c.cell === 'function') {
                    cell = c.cell(result[i], c);
                }
                return { ...this.get(result[i], c, i), props, cell };
            });
            result[i]._rowClassName = [rowClassName ? rowClassName(result[i], i) : null, result[i].className]
                .filter(w => !!w)
                .join(' ');
        }
        return result;
    }
    getNoIndex(item, col, idx) {
        return typeof col.noIndex === 'function' ? col.noIndex(item, col, idx) : col.noIndex + idx;
    }
    genButtons(_btns, item, col) {
        const fn = (btns) => {
            return deepCopy(btns).filter(btn => {
                const result = typeof btn.iif === 'function' ? btn.iif(item, btn, col) : true;
                const isRenderDisabled = btn.iifBehavior === 'disabled';
                btn._result = result;
                btn._disabled = !result && isRenderDisabled;
                if (btn.children?.length) {
                    btn.children = fn(btn.children);
                }
                return result || isRenderDisabled;
            });
        };
        const res = fn(_btns);
        const fnText = (btns) => {
            for (const btn of btns) {
                btn._text = typeof btn.text === 'function' ? btn.text(item, btn) : btn.text || '';
                btn._className = typeof btn.className === 'function' ? btn.className(item, btn) : btn.className;
                btn._icon = typeof btn.icon === 'function' ? btn.icon(item, btn) : btn.icon;
                if (btn.children?.length) {
                    btn.children = fnText(btn.children);
                }
            }
            return btns;
        };
        return this.fixMaxMultiple(fnText(res), col);
    }
    fixMaxMultiple(btns, col) {
        const curCog = col.maxMultipleButton;
        const btnSize = btns.length;
        if (curCog == null || btnSize <= 0)
            return btns;
        const cog = {
            ...this.cog.maxMultipleButton,
            ...(typeof curCog === 'number' ? { count: curCog } : curCog)
        };
        if (cog.count >= btnSize)
            return btns;
        const newBtns = btns.slice(0, cog.count);
        newBtns.push({ _text: cog.text, children: btns.slice(cog.count) });
        return newBtns;
    }
    // #region sort
    getValidSort(headers) {
        return headers.reduce((a, header) => {
            const ls = header
                .map(i => i.column)
                .filter(item => item._sort && item._sort.enabled && item._sort.default)
                .map(item => item._sort);
            return a.concat(...ls);
        }, []);
    }
    getSorterFn(headers) {
        const sortList = this.getValidSort(headers);
        if (sortList.length === 0) {
            return;
        }
        const sortItem = sortList[0];
        if (sortItem.compare === null) {
            return;
        }
        if (typeof sortItem.compare !== 'function') {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                console.warn(`[st] Muse provide the compare function in sort`);
            }
            return;
        }
        return (a, b) => {
            const result = sortItem.compare(a, b);
            if (result !== 0) {
                return sortItem.default === 'descend' ? -result : result;
            }
            return 0;
        };
    }
    get nextSortTick() {
        return ++this.sortTick;
    }
    getReqSortMap(singleSort, multiSort, headers) {
        let ret = {};
        const sortList = this.getValidSort(headers);
        if (multiSort) {
            const ms = {
                key: 'sort',
                separator: '-',
                nameSeparator: '.',
                keepEmptyKey: true,
                arrayParam: false,
                ...multiSort
            };
            const sortMap = sortList
                .sort((a, b) => a.tick - b.tick)
                .map(item => item.key + ms.nameSeparator + ((item.reName || {})[item.default] || item.default));
            ret = { [ms.key]: ms.arrayParam ? sortMap : sortMap.join(ms.separator) };
            return sortMap.length === 0 && ms.keepEmptyKey === false ? {} : ret;
        }
        if (sortList.length === 0)
            return ret;
        const mapData = sortList[0];
        let sortFiled = mapData.key;
        let sortValue = (sortList[0].reName || {})[mapData.default] || mapData.default;
        if (singleSort) {
            sortValue = sortFiled + (singleSort.nameSeparator || '.') + sortValue;
            sortFiled = singleSort.key || 'sort';
        }
        ret[sortFiled] = sortValue;
        return ret;
    }
    // #endregion
    // #region filter
    getFilteredData(filter) {
        return filter.type === 'default' ? filter.menus.filter(f => f.checked === true) : filter.menus.slice(0, 1);
    }
    getReqFilterMap(columns) {
        let ret = {};
        columns
            .filter(w => w.filter && w.filter.default === true)
            .forEach(col => {
            const filter = col.filter;
            const values = this.getFilteredData(filter);
            let obj = {};
            if (filter.reName) {
                obj = filter.reName(filter.menus, col);
            }
            else {
                obj[filter.key] = values.map(i => i.value).join(',');
            }
            ret = { ...ret, ...obj };
        });
        return ret;
    }
    // #endregion
    // #region statistical
    genStatistical(columns, list, rawData) {
        const res = {};
        columns.forEach((col, index) => {
            res[col.key || col.indexKey || index] =
                col.statistical == null ? {} : this.getStatistical(col, index, list, rawData);
        });
        return res;
    }
    getStatistical(col, index, list, rawData) {
        const val = col.statistical;
        const item = {
            digits: 2,
            currency: undefined,
            ...(typeof val === 'string' ? { type: val } : val)
        };
        let res = { value: 0 };
        let currency = false;
        if (typeof item.type === 'function') {
            res = item.type(this.getValues(index, list), col, list, rawData);
            currency = true;
        }
        else {
            switch (item.type) {
                case 'count':
                    res.value = list.length;
                    break;
                case 'distinctCount':
                    res.value = this.getValues(index, list).filter((value, idx, self) => self.indexOf(value) === idx).length;
                    break;
                case 'sum':
                    res.value = this.toFixed(this.getSum(index, list), item.digits);
                    currency = true;
                    break;
                case 'average':
                    res.value = this.toFixed(this.getSum(index, list) / list.length, item.digits);
                    currency = true;
                    break;
                case 'max':
                    res.value = Math.max(...this.getValues(index, list));
                    currency = true;
                    break;
                case 'min':
                    res.value = Math.min(...this.getValues(index, list));
                    currency = true;
                    break;
            }
        }
        if (item.currency === true || (item.currency == null && currency === true)) {
            res.text = this.currencySrv.format(res.value, col.currency?.format);
        }
        else {
            res.text = String(res.value);
        }
        return res;
    }
    toFixed(val, digits) {
        if (isNaN(val) || !isFinite(val)) {
            return 0;
        }
        return parseFloat(val.toFixed(digits));
    }
    getValues(index, list) {
        return list.map(i => i._values[index].org).map(i => (i === '' || i == null ? 0 : i));
    }
    getSum(index, list) {
        return this.getValues(index, list).reduce((p, i) => (p += parseFloat(String(i))), 0);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STDataSource, deps: [{ token: i1._HttpClient }, { token: i1.DatePipe, host: true }, { token: i1.YNPipe, host: true }, { token: i2.DecimalPipe, host: true }, { token: i3.CurrencyService }, { token: i4.DomSanitizer }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STDataSource });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STDataSource, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1._HttpClient }, { type: i1.DatePipe, decorators: [{
                    type: Host
                }] }, { type: i1.YNPipe, decorators: [{
                    type: Host
                }] }, { type: i2.DecimalPipe, decorators: [{
                    type: Host
                }] }, { type: i3.CurrencyService }, { type: i4.DomSanitizer }] });

class STExport {
    xlsxSrv = inject(XlsxService);
    _stGet(item, col, index, colIndex) {
        const ret = { t: 's', v: '' };
        if (col.format) {
            ret.v = col.format(item, col, index);
        }
        else {
            const val = item._values ? item._values[colIndex].text : deepGet(item, col.index, '');
            ret.v = val;
            if (val != null) {
                switch (col.type) {
                    case 'currency':
                        ret.t = 'n';
                        break;
                    case 'date':
                        // Can't be a empty value, it will cause `#NULL!`
                        // See https://github.com/SheetJS/sheetjs/blob/master/docbits/52_datatype.md
                        if (`${val}`.length > 0) {
                            ret.t = 'd';
                            // Number Formats: https://github.com/SheetJS/sheetjs/blob/master/docbits/63_numfmt.md
                            ret.z = col.dateFormat;
                        }
                        break;
                    case 'yn': {
                        const yn = col.yn;
                        ret.v = val === yn.truth ? yn.yes : yn.no;
                        break;
                    }
                }
            }
        }
        ret.v = ret.v ?? '';
        return ret;
    }
    genSheet(opt) {
        const sheets = {};
        const sheet = (sheets[opt.sheetname || 'Sheet1'] = {});
        const dataLen = opt.data.length;
        const columns = opt.columens;
        let validColCount = 0;
        let wpx = false;
        const invalidFn = (col) => col.exported === false || !col.index || !(!col.buttons || col.buttons.length === 0);
        for (const [idx, col] of columns.entries()) {
            if (invalidFn(col))
                continue;
            if (!wpx && col._width != null)
                wpx = true;
            ++validColCount;
            const columnName = this.xlsxSrv.numberToSchema(validColCount);
            sheet[`${columnName}1`] = {
                t: 's',
                v: typeof col.title === 'object' ? col.title.text : col.title
            };
            for (let dataIdx = 0; dataIdx < dataLen; dataIdx++) {
                sheet[`${columnName}${dataIdx + 2}`] = this._stGet(opt.data[dataIdx], col, dataIdx, idx);
            }
        }
        if (wpx) {
            // wpx: width in screen pixels https://github.com/SheetJS/sheetjs#column-properties
            sheet['!cols'] = columns.filter(col => !invalidFn(col)).map(col => ({ wpx: col._width }));
        }
        if (validColCount > 0 && dataLen > 0) {
            sheet['!ref'] = `A1:${this.xlsxSrv.numberToSchema(validColCount)}${dataLen + 1}`;
        }
        return sheets;
    }
    async export(opt) {
        const sheets = this.genSheet(opt);
        return this.xlsxSrv.export({
            sheets,
            filename: opt.filename,
            callback: opt.callback
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STExport, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STExport });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STExport, decorators: [{
            type: Injectable
        }] });

class STWidgetHostDirective {
    stWidgetRegistry = inject(STWidgetRegistry);
    viewContainerRef = inject(ViewContainerRef);
    record;
    column;
    ngOnInit() {
        const widget = this.column.widget;
        const componentType = this.stWidgetRegistry.get(widget.type);
        this.viewContainerRef.clear();
        const componentRef = this.viewContainerRef.createComponent(componentType);
        const { record, column } = this;
        const data = widget.params ? widget.params({ record, column }) : { record };
        Object.keys(data).forEach(key => {
            componentRef.instance[key] = data[key];
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STWidgetHostDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.1.2", type: STWidgetHostDirective, isStandalone: true, selector: "[st-widget-host]", inputs: { record: "record", column: "column" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STWidgetHostDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[st-widget-host]'
                }]
        }], propDecorators: { record: [{
                type: Input
            }], column: [{
                type: Input
            }] } });

class STFilterComponent {
    cdr = inject(ChangeDetectorRef);
    visible = false;
    col;
    locale = {};
    f;
    n = new EventEmitter();
    handle = new EventEmitter();
    get icon() {
        return this.f.icon;
    }
    stopPropagation($event) {
        $event.stopPropagation();
    }
    checkboxChange() {
        this.n.emit(this.f.menus?.filter(w => w.checked));
    }
    radioChange(item) {
        this.f.menus.forEach(i => (i.checked = false));
        item.checked = !item.checked;
        this.n.emit(item);
    }
    close(result) {
        if (result != null)
            this.handle.emit(result);
        this.visible = false;
        this.cdr.detectChanges();
    }
    confirm() {
        this.handle.emit(true);
        return this;
    }
    reset() {
        this.handle.emit(false);
        return this;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STFilterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.1.2", type: STFilterComponent, isStandalone: true, selector: "st-filter", inputs: { col: "col", locale: "locale", f: "f" }, outputs: { n: "n", handle: "handle" }, host: { properties: { "class.ant-table-filter-trigger-container": "true", "class.st__filter": "true", "class.ant-table-filter-trigger-container-open": "visible" } }, ngImport: i0, template: `
    <span
      class="ant-table-filter-trigger"
      [class.active]="visible || f.default"
      nz-dropdown
      [nzDropdownMenu]="filterMenu"
      nzTrigger="click"
      [nzClickHide]="false"
      [(nzVisible)]="visible"
      nzOverlayClassName="st__filter-wrap"
      (click)="stopPropagation($event)"
    >
      <nz-icon [nzType]="icon.type" [nzTheme]="icon.theme!" />
    </span>
    <nz-dropdown-menu #filterMenu="nzDropdownMenu">
      <div class="ant-table-filter-dropdown">
        @switch (f.type) {
          @case ('keyword') {
            <div class="st__filter-keyword">
              <input
                type="text"
                nz-input
                [attr.placeholder]="f.placeholder"
                [(ngModel)]="f.menus![0]!.value"
                (ngModelChange)="n.emit($event)"
                (keyup.enter)="confirm()"
              />
            </div>
          }
          @case ('number') {
            <div class="p-sm st__filter-number">
              <nz-input-number
                [(ngModel)]="f.menus![0]!.value"
                (ngModelChange)="n.emit($event)"
                [nzMin]="f.number!.min!"
                [nzMax]="f.number!.max!"
                [nzStep]="f.number!.step!"
                [nzPrecision]="f.number!.precision || null"
                [nzPlaceHolder]="f.placeholder!"
                class="width-100"
              />
            </div>
          }
          @case ('date') {
            <div class="p-sm st__filter-date">
              @if (f.date!.range) {
                <nz-range-picker
                  nzInline
                  [nzMode]="$any(f.date!.mode)"
                  [(ngModel)]="f.menus![0]!.value"
                  (ngModelChange)="n.emit($event)"
                  [nzShowNow]="f.date!.showNow"
                  [nzShowToday]="f.date!.showToday"
                  [nzDisabledDate]="f.date!.disabledDate"
                  [nzDisabledTime]="f.date!.disabledTime"
                />
              } @else {
                <nz-date-picker
                  nzInline
                  [nzMode]="$any(f.date!.mode)"
                  [(ngModel)]="f.menus![0]!.value"
                  (ngModelChange)="n.emit($event)"
                  [nzShowNow]="f.date!.showNow"
                  [nzShowToday]="f.date!.showToday"
                  [nzDisabledDate]="f.date!.disabledDate"
                  [nzDisabledTime]="f.date!.disabledTime"
                />
              }
            </div>
          }
          @case ('custom') {
            <div class="st__filter-custom">
              <ng-template
                [ngTemplateOutlet]="f.custom!"
                [ngTemplateOutletContext]="{ $implicit: f, col: col, handle: this }"
              />
            </div>
          }
          @default {
            <ul nz-menu>
              @for (filter of f.menus; track $index) {
                <li nz-menu-item>
                  @if (f.multiple) {
                    <label nz-checkbox [(ngModel)]="filter.checked" (ngModelChange)="checkboxChange()">
                      {{ filter.text }}
                    </label>
                  } @else {
                    <label nz-radio [ngModel]="filter.checked" (ngModelChange)="radioChange(filter)">
                      {{ filter.text }}
                    </label>
                  }
                </li>
              }
            </ul>
          }
        }
        @if (f.showOPArea) {
          <div class="ant-table-filter-dropdown-btns">
            <a class="ant-table-filter-dropdown-link confirm" (click)="confirm()">
              <span>{{ f.confirmText || locale.filterConfirm }}</span>
            </a>
            <a class="ant-table-filter-dropdown-link clear" (click)="reset()">
              <span>{{ f.clearText || locale.filterReset }}</span>
            </a>
          </div>
        }
      </div>
    </nz-dropdown-menu>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i2$1.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i2$1.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i3$1.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i3$1.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "directive", type: NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: ["nzBorderless", "nzVariant", "nzSize", "nzStepperless", "nzStatus", "disabled"], exportAs: ["nzInput"] }, { kind: "component", type: NzInputNumberComponent, selector: "nz-input-number", inputs: ["nzId", "nzSize", "nzPlaceHolder", "nzStatus", "nzVariant", "nzStep", "nzMin", "nzMax", "nzPrecision", "nzParser", "nzFormatter", "nzDisabled", "nzReadOnly", "nzAutoFocus", "nzBordered", "nzKeyboard", "nzControls"], outputs: ["nzBlur", "nzFocus", "nzOnStep"], exportAs: ["nzInputNumber"] }, { kind: "directive", type: NzRangePickerComponent, selector: "nz-range-picker", exportAs: ["nzRangePicker"] }, { kind: "component", type: NzDatePickerComponent, selector: "nz-date-picker,nz-week-picker,nz-month-picker,nz-quarter-picker,nz-year-picker,nz-range-picker", inputs: ["nzAllowClear", "nzAutoFocus", "nzDisabled", "nzBorderless", "nzInputReadOnly", "nzInline", "nzOpen", "nzDisabledDate", "nzLocale", "nzPlaceHolder", "nzPopupStyle", "nzDropdownClassName", "nzSize", "nzStatus", "nzFormat", "nzVariant", "nzDateRender", "nzDisabledTime", "nzRenderExtraFooter", "nzShowToday", "nzMode", "nzShowNow", "nzRanges", "nzDefaultPickerValue", "nzSeparator", "nzSuffixIcon", "nzBackdrop", "nzId", "nzPlacement", "nzShowWeekNumber", "nzShowTime"], outputs: ["nzOnPanelChange", "nzOnCalendarChange", "nzOnOk", "nzOnOpenChange"], exportAs: ["nzDatePicker"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzMenuModule }, { kind: "component", type: NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId", "nzName"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { kind: "component", type: NzRadioComponent, selector: "[nz-radio],[nz-radio-button]", inputs: ["nzValue", "nzDisabled", "nzAutoFocus", "nz-radio-button"], exportAs: ["nzRadio"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'st-filter',
                    template: `
    <span
      class="ant-table-filter-trigger"
      [class.active]="visible || f.default"
      nz-dropdown
      [nzDropdownMenu]="filterMenu"
      nzTrigger="click"
      [nzClickHide]="false"
      [(nzVisible)]="visible"
      nzOverlayClassName="st__filter-wrap"
      (click)="stopPropagation($event)"
    >
      <nz-icon [nzType]="icon.type" [nzTheme]="icon.theme!" />
    </span>
    <nz-dropdown-menu #filterMenu="nzDropdownMenu">
      <div class="ant-table-filter-dropdown">
        @switch (f.type) {
          @case ('keyword') {
            <div class="st__filter-keyword">
              <input
                type="text"
                nz-input
                [attr.placeholder]="f.placeholder"
                [(ngModel)]="f.menus![0]!.value"
                (ngModelChange)="n.emit($event)"
                (keyup.enter)="confirm()"
              />
            </div>
          }
          @case ('number') {
            <div class="p-sm st__filter-number">
              <nz-input-number
                [(ngModel)]="f.menus![0]!.value"
                (ngModelChange)="n.emit($event)"
                [nzMin]="f.number!.min!"
                [nzMax]="f.number!.max!"
                [nzStep]="f.number!.step!"
                [nzPrecision]="f.number!.precision || null"
                [nzPlaceHolder]="f.placeholder!"
                class="width-100"
              />
            </div>
          }
          @case ('date') {
            <div class="p-sm st__filter-date">
              @if (f.date!.range) {
                <nz-range-picker
                  nzInline
                  [nzMode]="$any(f.date!.mode)"
                  [(ngModel)]="f.menus![0]!.value"
                  (ngModelChange)="n.emit($event)"
                  [nzShowNow]="f.date!.showNow"
                  [nzShowToday]="f.date!.showToday"
                  [nzDisabledDate]="f.date!.disabledDate"
                  [nzDisabledTime]="f.date!.disabledTime"
                />
              } @else {
                <nz-date-picker
                  nzInline
                  [nzMode]="$any(f.date!.mode)"
                  [(ngModel)]="f.menus![0]!.value"
                  (ngModelChange)="n.emit($event)"
                  [nzShowNow]="f.date!.showNow"
                  [nzShowToday]="f.date!.showToday"
                  [nzDisabledDate]="f.date!.disabledDate"
                  [nzDisabledTime]="f.date!.disabledTime"
                />
              }
            </div>
          }
          @case ('custom') {
            <div class="st__filter-custom">
              <ng-template
                [ngTemplateOutlet]="f.custom!"
                [ngTemplateOutletContext]="{ $implicit: f, col: col, handle: this }"
              />
            </div>
          }
          @default {
            <ul nz-menu>
              @for (filter of f.menus; track $index) {
                <li nz-menu-item>
                  @if (f.multiple) {
                    <label nz-checkbox [(ngModel)]="filter.checked" (ngModelChange)="checkboxChange()">
                      {{ filter.text }}
                    </label>
                  } @else {
                    <label nz-radio [ngModel]="filter.checked" (ngModelChange)="radioChange(filter)">
                      {{ filter.text }}
                    </label>
                  }
                </li>
              }
            </ul>
          }
        }
        @if (f.showOPArea) {
          <div class="ant-table-filter-dropdown-btns">
            <a class="ant-table-filter-dropdown-link confirm" (click)="confirm()">
              <span>{{ f.confirmText || locale.filterConfirm }}</span>
            </a>
            <a class="ant-table-filter-dropdown-link clear" (click)="reset()">
              <span>{{ f.clearText || locale.filterReset }}</span>
            </a>
          </div>
        }
      </div>
    </nz-dropdown-menu>
  `,
                    host: {
                        '[class.ant-table-filter-trigger-container]': `true`,
                        '[class.st__filter]': `true`,
                        '[class.ant-table-filter-trigger-container-open]': `visible`
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    imports: [
                        FormsModule,
                        NzDropDownModule,
                        NzIconDirective,
                        NzInputDirective,
                        NzInputNumberComponent,
                        NzRangePickerComponent,
                        NzDatePickerComponent,
                        NgTemplateOutlet,
                        NzMenuModule,
                        NzCheckboxComponent,
                        NzRadioComponent
                    ]
                }]
        }], propDecorators: { col: [{
                type: Input
            }], locale: [{
                type: Input
            }], f: [{
                type: Input
            }], n: [{
                type: Output
            }], handle: [{
                type: Output
            }] } });

const ST_DEFAULT_CONFIG = {
    pi: 1,
    ps: 10,
    size: 'default',
    responsive: true,
    responsiveHideHeaderFooter: false,
    req: {
        type: 'page',
        method: 'GET',
        allInBody: false,
        lazyLoad: false,
        ignoreParamNull: false,
        reName: { pi: 'pi', ps: 'ps', skip: 'skip', limit: 'limit' }
    },
    res: {
        reName: { list: ['list'], total: ['total'] }
    },
    page: {
        front: true,
        zeroIndexed: false,
        position: 'bottom',
        placement: 'right',
        show: true,
        showSize: false,
        pageSizes: [10, 20, 30, 40, 50],
        showQuickJumper: false,
        total: true,
        toTop: true,
        toTopOffset: 100,
        itemRender: null,
        simple: false
    },
    modal: {
        paramsName: 'record',
        size: 'lg',
        exact: true
    },
    drawer: {
        paramsName: 'record',
        size: 'md',
        footer: true,
        footerHeight: 55
    },
    pop: {
        title: '确认删除吗？',
        trigger: 'click',
        placement: 'top'
    },
    btnIcon: {
        theme: 'outline',
        spin: false
    },
    noIndex: 1,
    expandRowByClick: false,
    expandAccordion: false,
    widthMode: {
        type: 'default',
        strictBehavior: 'truncate'
    },
    virtualItemSize: 54,
    virtualMaxBufferPx: 200,
    virtualMinBufferPx: 100,
    iifBehavior: 'hide',
    loadingDelay: 0,
    safeType: 'safeHtml',
    date: {
        format: `yyyy-MM-dd HH:mm`
    },
    yn: {
        truth: true,
        yes: '是',
        mode: 'icon'
    },
    maxMultipleButton: {
        text: '更多',
        count: 2
    }
};

class STTdComponent {
    stComp = inject(STComponent, { host: true });
    router = inject(Router);
    modalHelper = inject(ModalHelper);
    drawerHelper = inject(DrawerHelper);
    c;
    cIdx;
    data;
    i;
    index;
    n = new EventEmitter();
    get routerState() {
        const { pi, ps, total } = this.stComp;
        return { pi, ps, total };
    }
    report(type) {
        this.n.emit({ type, item: this.i, col: this.c });
    }
    _checkbox(value) {
        this.i.checked = value;
        this.report('checkbox');
    }
    _radio() {
        this.data.filter(w => !w.disabled).forEach(i => (i.checked = false));
        this.i.checked = true;
        this.report('radio');
    }
    _link(e) {
        this._stopPropagation(e);
        const res = this.c.click(this.i, this.stComp);
        if (typeof res === 'string') {
            this.router.navigateByUrl(res, { state: this.routerState });
        }
        return false;
    }
    _client() {
        this.c.click?.(this.i, this.stComp);
    }
    _stopPropagation(ev) {
        ev.preventDefault();
        ev.stopPropagation();
    }
    _btn(btn, ev) {
        ev?.stopPropagation();
        const cog = this.stComp.cog;
        let record = this.i;
        if (btn.type === 'modal' || btn.type === 'static') {
            if (cog.modal.pureRecoard === true) {
                record = this.stComp.pureItem(record);
            }
            const modal = btn.modal;
            const obj = { [modal.paramsName]: record };
            this.modalHelper[btn.type === 'modal' ? 'create' : 'createStatic'](modal.component, { ...obj, ...(modal.params && modal.params(record)) }, deepMergeKey({}, true, cog.modal, modal))
                .pipe(filter(w => typeof w !== 'undefined'))
                .subscribe((res) => this.btnCallback(record, btn, res));
            return;
        }
        else if (btn.type === 'drawer') {
            if (cog.drawer.pureRecoard === true) {
                record = this.stComp.pureItem(record);
            }
            const drawer = btn.drawer;
            const obj = { [drawer.paramsName]: record };
            this.drawerHelper
                .create(drawer.title, drawer.component, { ...obj, ...(drawer.params && drawer.params(record)) }, deepMergeKey({}, true, cog.drawer, drawer))
                .pipe(filter(w => typeof w !== 'undefined'))
                .subscribe(res => this.btnCallback(record, btn, res));
            return;
        }
        else if (btn.type === 'link') {
            const clickRes = this.btnCallback(record, btn);
            if (typeof clickRes === 'string') {
                this.router.navigateByUrl(clickRes, { state: this.routerState });
            }
            return;
        }
        this.btnCallback(record, btn);
    }
    btnCallback(record, btn, modal) {
        if (!btn.click)
            return;
        if (typeof btn.click === 'string') {
            switch (btn.click) {
                case 'load':
                    this.stComp.load();
                    break;
                case 'reload':
                    this.stComp.reload();
                    break;
            }
        }
        else {
            return btn.click(record, modal, this.stComp);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STTdComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.1.2", type: STTdComponent, isStandalone: true, selector: "st-td", inputs: { c: "c", cIdx: "cIdx", data: "data", i: "i", index: "index" }, outputs: { n: "n" }, ngImport: i0, template: "<ng-template #btnTpl let-i let-child=\"child\">\n  @if (i.tooltip) {\n    <span nz-tooltip [nzTooltipTitle]=\"i.tooltip\" [class.d-block]=\"child\" [class.width-100]=\"child\">\n      <ng-template [ngTemplateOutlet]=\"btnItemTpl\" [ngTemplateOutletContext]=\"{ $implicit: i }\" />\n    </span>\n  } @else {\n    <ng-template [ngTemplateOutlet]=\"btnItemTpl\" [ngTemplateOutletContext]=\"{ $implicit: i }\" />\n  }\n</ng-template>\n<ng-template #btnItemTpl let-i>\n  @if (i.pop) {\n    @let pop = i.pop;\n    <a\n      nz-popconfirm\n      [nzPopconfirmTitle]=\"pop.title\"\n      [nzIcon]=\"pop.icon\"\n      [nzCondition]=\"pop.condition(i)\"\n      [nzCancelText]=\"pop.cancelText\"\n      [nzOkText]=\"pop.okText\"\n      [nzOkType]=\"pop.okType\"\n      (nzOnConfirm)=\"_btn(i)\"\n      class=\"st__btn-text\"\n      [class]=\"i._className\"\n      (click)=\"_stopPropagation($event)\"\n    >\n      <ng-template [ngTemplateOutlet]=\"btnTextTpl\" [ngTemplateOutletContext]=\"{ $implicit: i }\" />\n    </a>\n  } @else {\n    <a (click)=\"_btn(i, $event)\" class=\"st__btn-text\" [class]=\"i._className\">\n      <ng-template [ngTemplateOutlet]=\"btnTextTpl\" [ngTemplateOutletContext]=\"{ $implicit: i }\" />\n    </a>\n  }\n</ng-template>\n<ng-template #btnTextTpl let-i>\n  @if (i._icon) {\n    @let icon = i._icon;\n    @if (icon.iconfont) {\n      <nz-icon [nzIconfont]=\"icon.iconfont\" />\n    } @else {\n      <nz-icon [nzType]=\"icon.type\" [nzTheme]=\"icon.theme\" [nzSpin]=\"icon.spin\" [nzTwotoneColor]=\"icon.twoToneColor\" />\n    }\n  }\n  <span [innerHTML]=\"i._text\" [class.pl-xs]=\"i._icon\"></span>\n</ng-template>\n@if (c.__render) {\n  <ng-template [ngTemplateOutlet]=\"c.__render!\" [ngTemplateOutletContext]=\"{ $implicit: i, index: index, column: c }\" />\n} @else {\n  @let col = i._values[cIdx];\n  @switch (c.type) {\n    @case ('checkbox') {\n      <label nz-checkbox [nzDisabled]=\"i.disabled\" [ngModel]=\"i.checked\" (ngModelChange)=\"_checkbox($event)\"></label>\n    }\n    @case ('radio') {\n      <label nz-radio [nzDisabled]=\"i.disabled\" [ngModel]=\"i.checked\" (ngModelChange)=\"_radio()\"></label>\n    }\n    @case ('link') {\n      <a (click)=\"_link($event)\" [innerHTML]=\"col._text\" [attr.title]=\"col.text\"></a>\n    }\n    @case ('tag') {\n      <nz-tag [nzColor]=\"col.color\" [nz-tooltip]=\"col.tooltip\">\n        <span [innerHTML]=\"col._text\"></span>\n      </nz-tag>\n    }\n    @case ('badge') {\n      <nz-badge [nzStatus]=\"col.color\" [nzText]=\"col.text\" [nz-tooltip]=\"col.tooltip\" />\n    }\n    @case ('cell') {\n      <cell [value]=\"col.text\" [options]=\"col.cell ?? c.cell\" (click)=\"_client()\" />\n    }\n    @case ('widget') {\n      <ng-template st-widget-host [record]=\"i\" [column]=\"c\" />\n    }\n    @default {\n      @if (c.safeType === 'text') {\n        <span [innerText]=\"col._text\" [attr.title]=\"c._isTruncate ? col.text : null\"></span>\n      } @else {\n        <span [innerHTML]=\"col._text\" [attr.title]=\"c._isTruncate ? col.text : null\"></span>\n      }\n    }\n  }\n  @for (btn of col.buttons; track $index) {\n    @if (btn.children!.length > 0) {\n      <a nz-dropdown [nzDropdownMenu]=\"btnMenu\" nzOverlayClassName=\"st__btn-sub\">\n        <span [innerHTML]=\"btn._text\"></span>\n        <nz-icon nzType=\"down\" />\n      </a>\n      <nz-dropdown-menu #btnMenu=\"nzDropdownMenu\">\n        <ul nz-menu>\n          @for (subBtn of btn.children; track $index) {\n            @if (subBtn.type === 'divider') {\n              <li nz-menu-divider></li>\n            } @else {\n              <li nz-menu-item [class.st__btn-disabled]=\"subBtn._disabled\">\n                <ng-template\n                  [ngTemplateOutlet]=\"btnTpl\"\n                  [ngTemplateOutletContext]=\"{ $implicit: subBtn, child: true }\"\n                />\n              </li>\n            }\n          }\n        </ul>\n      </nz-dropdown-menu>\n    } @else {\n      <span [class.st__btn-disabled]=\"btn._disabled\">\n        <ng-template [ngTemplateOutlet]=\"btnTpl\" [ngTemplateOutletContext]=\"{ $implicit: btn, child: false }\" />\n      </span>\n    }\n    @if (!$last) {\n      <nz-divider nzType=\"vertical\" />\n    }\n  }\n}\n", dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "cdkConnectedOverlayPush", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: NzPopconfirmDirective, selector: "[nz-popconfirm]", inputs: ["nzPopconfirmArrowPointAtCenter", "nzPopconfirmTitle", "nzPopconfirmTitleContext", "nz-popconfirm", "nzPopconfirmTrigger", "nzPopconfirmPlacement", "nzPopconfirmOrigin", "nzPopconfirmMouseEnterDelay", "nzPopconfirmMouseLeaveDelay", "nzPopconfirmOverlayClassName", "nzPopconfirmOverlayStyle", "nzPopconfirmVisible", "nzBeforeConfirm", "nzIcon", "nzCondition", "nzPopconfirmShowArrow", "nzPopconfirmBackdrop", "nzAutofocus", "nzOkText", "nzOkType", "nzCancelText", "nzOkButtonProps", "nzCancelButtonProps", "nzOkDisabled", "nzOkDanger"], outputs: ["nzPopconfirmVisibleChange", "nzOnCancel", "nzOnConfirm"], exportAs: ["nzPopconfirm"] }, { kind: "directive", type: NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId", "nzName"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { kind: "component", type: NzRadioComponent, selector: "[nz-radio],[nz-radio-button]", inputs: ["nzValue", "nzDisabled", "nzAutoFocus", "nz-radio-button"], exportAs: ["nzRadio"] }, { kind: "component", type: NzTagComponent, selector: "nz-tag", inputs: ["nzMode", "nzColor", "nzChecked", "nzBordered"], outputs: ["nzOnClose", "nzCheckedChange"], exportAs: ["nzTag"] }, { kind: "component", type: NzBadgeComponent, selector: "nz-badge", inputs: ["nzShowZero", "nzShowDot", "nzStandalone", "nzDot", "nzOverflowCount", "nzColor", "nzStyle", "nzText", "nzTitle", "nzStatus", "nzCount", "nzOffset", "nzSize"], exportAs: ["nzBadge"] }, { kind: "component", type: CellComponent, selector: "cell, [cell]", inputs: ["value", "options", "loading", "disabled"], outputs: ["valueChange"], exportAs: ["cell"] }, { kind: "directive", type: STWidgetHostDirective, selector: "[st-widget-host]", inputs: ["record", "column"] }, { kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i2$1.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i2$1.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i2$1.NzMenuDividerDirective, selector: "[nz-menu-divider]", exportAs: ["nzMenuDivider"] }, { kind: "directive", type: i3$1.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "directive", type: i3$1.NzDropDownADirective, selector: "a[nz-dropdown]" }, { kind: "component", type: i3$1.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "ngmodule", type: NzMenuModule }, { kind: "component", type: NzDividerComponent, selector: "nz-divider", inputs: ["nzText", "nzType", "nzOrientation", "nzVariant", "nzDashed", "nzPlain"], exportAs: ["nzDivider"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STTdComponent, decorators: [{
            type: Component,
            args: [{ selector: 'st-td', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, imports: [
                        FormsModule,
                        NzTooltipDirective,
                        NgTemplateOutlet,
                        NzPopconfirmDirective,
                        NzIconDirective,
                        NzCheckboxComponent,
                        NzRadioComponent,
                        NzTagComponent,
                        NzBadgeComponent,
                        CellComponent,
                        STWidgetHostDirective,
                        NzDropDownModule,
                        NzMenuModule,
                        NzDividerComponent
                    ], template: "<ng-template #btnTpl let-i let-child=\"child\">\n  @if (i.tooltip) {\n    <span nz-tooltip [nzTooltipTitle]=\"i.tooltip\" [class.d-block]=\"child\" [class.width-100]=\"child\">\n      <ng-template [ngTemplateOutlet]=\"btnItemTpl\" [ngTemplateOutletContext]=\"{ $implicit: i }\" />\n    </span>\n  } @else {\n    <ng-template [ngTemplateOutlet]=\"btnItemTpl\" [ngTemplateOutletContext]=\"{ $implicit: i }\" />\n  }\n</ng-template>\n<ng-template #btnItemTpl let-i>\n  @if (i.pop) {\n    @let pop = i.pop;\n    <a\n      nz-popconfirm\n      [nzPopconfirmTitle]=\"pop.title\"\n      [nzIcon]=\"pop.icon\"\n      [nzCondition]=\"pop.condition(i)\"\n      [nzCancelText]=\"pop.cancelText\"\n      [nzOkText]=\"pop.okText\"\n      [nzOkType]=\"pop.okType\"\n      (nzOnConfirm)=\"_btn(i)\"\n      class=\"st__btn-text\"\n      [class]=\"i._className\"\n      (click)=\"_stopPropagation($event)\"\n    >\n      <ng-template [ngTemplateOutlet]=\"btnTextTpl\" [ngTemplateOutletContext]=\"{ $implicit: i }\" />\n    </a>\n  } @else {\n    <a (click)=\"_btn(i, $event)\" class=\"st__btn-text\" [class]=\"i._className\">\n      <ng-template [ngTemplateOutlet]=\"btnTextTpl\" [ngTemplateOutletContext]=\"{ $implicit: i }\" />\n    </a>\n  }\n</ng-template>\n<ng-template #btnTextTpl let-i>\n  @if (i._icon) {\n    @let icon = i._icon;\n    @if (icon.iconfont) {\n      <nz-icon [nzIconfont]=\"icon.iconfont\" />\n    } @else {\n      <nz-icon [nzType]=\"icon.type\" [nzTheme]=\"icon.theme\" [nzSpin]=\"icon.spin\" [nzTwotoneColor]=\"icon.twoToneColor\" />\n    }\n  }\n  <span [innerHTML]=\"i._text\" [class.pl-xs]=\"i._icon\"></span>\n</ng-template>\n@if (c.__render) {\n  <ng-template [ngTemplateOutlet]=\"c.__render!\" [ngTemplateOutletContext]=\"{ $implicit: i, index: index, column: c }\" />\n} @else {\n  @let col = i._values[cIdx];\n  @switch (c.type) {\n    @case ('checkbox') {\n      <label nz-checkbox [nzDisabled]=\"i.disabled\" [ngModel]=\"i.checked\" (ngModelChange)=\"_checkbox($event)\"></label>\n    }\n    @case ('radio') {\n      <label nz-radio [nzDisabled]=\"i.disabled\" [ngModel]=\"i.checked\" (ngModelChange)=\"_radio()\"></label>\n    }\n    @case ('link') {\n      <a (click)=\"_link($event)\" [innerHTML]=\"col._text\" [attr.title]=\"col.text\"></a>\n    }\n    @case ('tag') {\n      <nz-tag [nzColor]=\"col.color\" [nz-tooltip]=\"col.tooltip\">\n        <span [innerHTML]=\"col._text\"></span>\n      </nz-tag>\n    }\n    @case ('badge') {\n      <nz-badge [nzStatus]=\"col.color\" [nzText]=\"col.text\" [nz-tooltip]=\"col.tooltip\" />\n    }\n    @case ('cell') {\n      <cell [value]=\"col.text\" [options]=\"col.cell ?? c.cell\" (click)=\"_client()\" />\n    }\n    @case ('widget') {\n      <ng-template st-widget-host [record]=\"i\" [column]=\"c\" />\n    }\n    @default {\n      @if (c.safeType === 'text') {\n        <span [innerText]=\"col._text\" [attr.title]=\"c._isTruncate ? col.text : null\"></span>\n      } @else {\n        <span [innerHTML]=\"col._text\" [attr.title]=\"c._isTruncate ? col.text : null\"></span>\n      }\n    }\n  }\n  @for (btn of col.buttons; track $index) {\n    @if (btn.children!.length > 0) {\n      <a nz-dropdown [nzDropdownMenu]=\"btnMenu\" nzOverlayClassName=\"st__btn-sub\">\n        <span [innerHTML]=\"btn._text\"></span>\n        <nz-icon nzType=\"down\" />\n      </a>\n      <nz-dropdown-menu #btnMenu=\"nzDropdownMenu\">\n        <ul nz-menu>\n          @for (subBtn of btn.children; track $index) {\n            @if (subBtn.type === 'divider') {\n              <li nz-menu-divider></li>\n            } @else {\n              <li nz-menu-item [class.st__btn-disabled]=\"subBtn._disabled\">\n                <ng-template\n                  [ngTemplateOutlet]=\"btnTpl\"\n                  [ngTemplateOutletContext]=\"{ $implicit: subBtn, child: true }\"\n                />\n              </li>\n            }\n          }\n        </ul>\n      </nz-dropdown-menu>\n    } @else {\n      <span [class.st__btn-disabled]=\"btn._disabled\">\n        <ng-template [ngTemplateOutlet]=\"btnTpl\" [ngTemplateOutletContext]=\"{ $implicit: btn, child: false }\" />\n      </span>\n    }\n    @if (!$last) {\n      <nz-divider nzType=\"vertical\" />\n    }\n  }\n}\n" }]
        }], propDecorators: { c: [{
                type: Input
            }], cIdx: [{
                type: Input
            }], data: [{
                type: Input
            }], i: [{
                type: Input
            }], index: [{
                type: Input
            }], n: [{
                type: Output
            }] } });
class STComponent {
    i18nSrv = inject(ALAIN_I18N_TOKEN);
    el = inject(ElementRef).nativeElement;
    cdr = inject(ChangeDetectorRef);
    doc = inject(DOCUMENT);
    exportSrv = inject(STExport);
    columnSource = inject(STColumnSource);
    dataSource = inject(STDataSource);
    cms = inject(NzContextMenuService, { optional: true });
    destroy$ = inject(DestroyRef);
    cogSrv = inject(AlainConfigService);
    totalTpl = ``;
    inied = false;
    cog;
    _req;
    _res;
    _page;
    _widthMode;
    customWidthConfig = false;
    _widthConfig = [];
    locale = inject(DelonLocaleService).valueSignal('st');
    _loading = false;
    _data = [];
    _statistical = {};
    _isPagination = true;
    _allChecked = false;
    _allCheckedDisabled = false;
    _indeterminate = false;
    _headers = [];
    _columns = [];
    contextmenuList = [];
    orgTable;
    contextmenuTpl;
    get req() {
        return this._req;
    }
    set req(value) {
        this._req = deepMergeKey({}, true, this.cog.req, value);
    }
    /** 返回体配置 */
    get res() {
        return this._res;
    }
    set res(value) {
        const item = (this._res = deepMergeKey({}, true, this.cog.res, value));
        const reName = item.reName;
        if (typeof reName !== 'function') {
            if (!Array.isArray(reName.list))
                reName.list = reName.list.split('.');
            if (!Array.isArray(reName.total))
                reName.total = reName.total.split('.');
        }
        this._res = item;
    }
    get page() {
        return this._page;
    }
    set page(value) {
        this._page = { ...this.cog.page, ...value };
        this.updateTotalTpl();
    }
    data;
    delay = false;
    columns;
    contextmenu;
    ps = 10;
    pi = 1;
    total = 0;
    loading = null;
    loadingDelay = 0;
    loadingIndicator = null;
    bordered = false;
    size;
    scroll = { x: null, y: null };
    drag = input(null, ...(ngDevMode ? [{ debugName: "drag", transform: v => {
                const obj = typeof v === 'object' ? v : booleanAttribute(v) ? {} : null;
                if (obj == null)
                    return null;
                if (typeof obj.dropped !== 'function') {
                    obj.dropped = e => {
                        moveItemInArray(this._data, e.previousIndex, e.currentIndex);
                        this.cd();
                    };
                }
                return obj;
            } }] : [{
            transform: v => {
                const obj = typeof v === 'object' ? v : booleanAttribute(v) ? {} : null;
                if (obj == null)
                    return null;
                if (typeof obj.dropped !== 'function') {
                    obj.dropped = e => {
                        moveItemInArray(this._data, e.previousIndex, e.currentIndex);
                        this.cd();
                    };
                }
                return obj;
            }
        }]));
    singleSort;
    _multiSort;
    get multiSort() {
        return this._multiSort;
    }
    set multiSort(value) {
        if ((typeof value === 'boolean' && !booleanAttribute(value)) ||
            (typeof value === 'object' && Object.keys(value).length === 0)) {
            this._multiSort = undefined;
            return;
        }
        this._multiSort = {
            ...(typeof value === 'object' ? value : {})
        };
    }
    rowClassName;
    clickRowClassName;
    set widthMode(value) {
        this._widthMode = { ...this.cog.widthMode, ...value };
    }
    get widthMode() {
        return this._widthMode;
    }
    set widthConfig(val) {
        this._widthConfig = val;
        this.customWidthConfig = val && val.length > 0;
    }
    _resizable;
    set resizable(val) {
        this._resizable = typeof val === 'object' ? val : { disabled: !booleanAttribute(val) };
    }
    header;
    showHeader = true;
    footer;
    bodyHeader;
    body;
    expandRowByClick = false;
    expandAccordion = false;
    expand = null;
    expandIcon = null;
    noResult;
    responsive = true;
    responsiveHideHeaderFooter;
    error = new EventEmitter();
    change = new EventEmitter();
    virtualScroll = false;
    virtualItemSize = 54;
    virtualMaxBufferPx = 200;
    virtualMinBufferPx = 100;
    customRequest;
    virtualForTrackBy = index => index;
    trackBy = (_, item) => item;
    /**
     * Get the number of the current page
     */
    get count() {
        return this._data.length;
    }
    /**
     * Get the data of the current page
     */
    get list() {
        return this._data;
    }
    get noColumns() {
        return this.columns == null;
    }
    constructor() {
        effect(() => {
            this.locale();
            if (this._columns.length > 0) {
                this.updateTotalTpl();
                this.cd();
            }
        });
        this.i18nSrv.change
            .pipe(takeUntilDestroyed(), filter(() => this._columns.length > 0))
            .subscribe(() => this.refreshColumns());
        this.setCog(this.cogSrv.merge('st', ST_DEFAULT_CONFIG));
    }
    setCog(cog) {
        const copyMultiSort = { ...cog.multiSort };
        // Because multiSort.global will affect the result, it should be removed first, and multiSort will be operated again after processing.
        delete cog.multiSort;
        this.cog = cog;
        Object.assign(this, cog);
        if (copyMultiSort.global !== false) {
            this.multiSort = copyMultiSort;
        }
        this.columnSource.setCog(cog);
        this.dataSource.setCog(cog);
    }
    cd() {
        this.cdr.detectChanges();
        return this;
    }
    refreshData() {
        this._data = [...this._data];
        return this.cd();
    }
    renderTotal(total, range) {
        return this.totalTpl
            ? this.totalTpl.replace('{{total}}', total).replace('{{range[0]}}', range[0]).replace('{{range[1]}}', range[1])
            : '';
    }
    changeEmit(type, data) {
        const res = {
            type,
            pi: this.pi,
            ps: this.ps,
            total: this.total
        };
        if (data != null) {
            res[type] = data;
        }
        this.change.emit(res);
    }
    // #region data
    /**
     * 获取过滤后所有数据
     * - 本地数据：包含排序、过滤后不分页数据
     * - 远程数据：不传递 `pi`、`ps` 两个参数
     */
    get filteredData() {
        return this.loadData({ paginator: false }).pipe(map(res => res.list));
    }
    updateTotalTpl() {
        const { total } = this.page;
        if (typeof total === 'string' && total.length) {
            this.totalTpl = total;
        }
        else if (booleanAttribute(total)) {
            this.totalTpl = this.locale().total;
        }
        else {
            this.totalTpl = '';
        }
    }
    setLoading(val) {
        if (this.loading == null) {
            this._loading = val;
            this.cdr.detectChanges();
        }
    }
    loadData(options) {
        const { pi, ps, data, req, res, page, total, singleSort, multiSort, rowClassName, _columns, _headers } = this;
        return this.dataSource
            .process({
            pi,
            ps,
            total,
            data,
            req,
            res,
            page,
            columns: _columns,
            headers: _headers,
            singleSort,
            multiSort,
            rowClassName,
            paginator: true,
            customRequest: this.customRequest || this.cog.customRequest,
            ...options
        })
            .pipe(takeUntilDestroyed(this.destroy$));
    }
    loadPageData() {
        this.setLoading(true);
        return this.loadData().pipe(finalize(() => this.setLoading(false)), catchError(error => {
            this.error.emit({ type: 'req', error });
            return throwError(() => error);
        }), map(result => {
            const undefinedString = 'undefined';
            if (typeof result.pi !== undefinedString) {
                this.pi = result.pi;
            }
            if (typeof result.ps !== undefinedString) {
                this.ps = result.ps;
            }
            if (typeof result.total !== undefinedString) {
                this.total = result.total;
            }
            if (typeof result.pageShow !== undefinedString) {
                this._isPagination = result.pageShow;
            }
            this._data = result.list ?? [];
            this._statistical = result.statistical;
            // Should be re-render in next tike when using virtual scroll
            // https://github.com/ng-alain/ng-alain/issues/1836
            if (this.cdkVirtualScrollViewport != null) {
                Promise.resolve().then(() => this.cdkVirtualScrollViewport?.checkViewportSize());
            }
            this._refCheck();
            this.changeEmit('loaded', result.list);
            return this;
        }));
    }
    /** 清空所有数据 */
    clear(cleanStatus = true) {
        if (cleanStatus) {
            this.clearStatus();
        }
        this._data = [];
        return this.cd();
    }
    /** 清空所有状态 */
    clearStatus() {
        return this.clearCheck().clearRadio().clearFilter().clearSort();
    }
    /**
     * 根据页码重新加载数据
     *
     * @param pi 指定当前页码，默认：`1`
     * @param extraParams 重新指定 `extraParams` 值
     * @param options 选项
     */
    load(pi = 1, extraParams, options) {
        if (pi !== -1)
            this.pi = pi;
        if (typeof extraParams !== 'undefined') {
            this.req.params = options && options.merge ? { ...this.req.params, ...extraParams } : extraParams;
        }
        this._change('pi', options);
        return this;
    }
    /**
     * 重新刷新当前页
     *
     * @param extraParams 重新指定 `extraParams` 值
     */
    reload(extraParams, options) {
        return this.load(-1, extraParams, options);
    }
    /**
     * 重置且重新设置 `pi` 为 `1`，包含以下值：
     * - `check` 数据
     * - `radio` 数据
     * - `sort` 数据
     * - `fileter` 数据
     *
     * @param extraParams 重新指定 `extraParams` 值
     */
    reset(extraParams, options) {
        this.clearStatus().load(1, extraParams, options);
        return this;
    }
    _toTop(enforce) {
        if (!(enforce == null ? this.page.toTop : enforce))
            return;
        const el = this.el;
        el.scrollIntoView();
        // fix header height
        this.doc.documentElement.scrollTop -= this.page.toTopOffset;
        if (this.scroll) {
            if (this.cdkVirtualScrollViewport) {
                this.cdkVirtualScrollViewport.scrollTo({
                    top: 0,
                    left: 0
                });
            }
            else {
                el.querySelector('.ant-table-body, .ant-table-content')?.scrollTo(0, 0);
            }
        }
    }
    _change(type, options) {
        if (type === 'pi' || (type === 'ps' && this.pi <= Math.ceil(this.total / this.ps))) {
            this.loadPageData().subscribe(() => this._toTop(options?.toTop));
        }
        this.changeEmit(type);
    }
    closeOtherExpand(item) {
        if (this.expandAccordion === false)
            return;
        this._data.filter(i => i !== item).forEach(i => (i.expand = false));
    }
    _rowClick(e, item, index, dbl) {
        const el = e.target;
        if (el.nodeName === 'INPUT')
            return;
        const { expand, expandRowByClick } = this;
        if (!!expand && item.showExpand !== false && expandRowByClick) {
            item.expand = !item.expand;
            this.closeOtherExpand(item);
            this.changeEmit('expand', item);
            return;
        }
        const data = { e, item, index };
        if (dbl) {
            this.changeEmit('dblClick', data);
        }
        else {
            this._clickRowClassName(el, item, index);
            this.changeEmit('click', data);
        }
    }
    _clickRowClassName(el, item, index) {
        const cr = this.clickRowClassName;
        if (cr == null)
            return;
        const config = {
            exclusive: false,
            ...(typeof cr === 'string' ? { fn: () => cr } : cr)
        };
        const className = config.fn(item, index);
        const trEl = el.closest('tr');
        if (config.exclusive) {
            trEl.parentElement.querySelectorAll('tr').forEach((a) => a.classList.remove(className));
        }
        if (trEl.classList.contains(className)) {
            trEl.classList.remove(className);
        }
        else {
            trEl.classList.add(className);
        }
    }
    _expandChange(item, expand) {
        item.expand = expand;
        this.closeOtherExpand(item);
        this.changeEmit('expand', item);
    }
    _stopPropagation(ev) {
        ev.stopPropagation();
    }
    _refColAndData() {
        this._columns.forEach((c, cIdx) => {
            this._data.forEach((i, idx) => {
                const values = i._values;
                if (c.type === 'no') {
                    const text = `${this.dataSource.getNoIndex(i, c, idx)}`;
                    values[cIdx] = {
                        text,
                        _text: text,
                        org: idx,
                        safeType: 'text'
                    };
                }
                values[cIdx].props = this.dataSource.getCell(c, i, idx);
            });
        });
        return this.refreshData();
    }
    /**
     * Add a rows in the table, like this:
     *
     * ```
     * this.st.addRow(stDataItem)
     * ```
     *
     * **TIPS:** Don't change the `total` value, it is recommended to use the `reload` method if needed
     */
    addRow(data, options) {
        if (!Array.isArray(data))
            data = [data];
        this._data.splice(options?.index ?? 0, 0, ...data);
        return this.optimizeData()._refColAndData();
    }
    /**
     * Remove a row in the table, like this:
     *
     * ```
     * this.st.removeRow(0)
     * this.st.removeRow(stDataItem)
     * ```
     *
     * **TIPS:** Don't change the `total` value, it is recommended to use the `reload` method if needed
     */
    removeRow(data) {
        if (typeof data === 'number') {
            this._data.splice(data, 1);
        }
        else {
            if (!Array.isArray(data)) {
                data = [data];
            }
            const curData = this._data;
            for (let i = curData.length; i >= 0; i--) {
                if (data.indexOf(curData[i]) !== -1) {
                    curData.splice(i, 1);
                }
            }
        }
        return this._refCheck()._refColAndData();
    }
    /**
     * Sets the row value for the `index` in the table, like this:
     *
     * - `optinos.refreshSchema` Whether to refresh of st schemas
     * - `optinos.emitReload` Whether to trigger a reload http request when data is url
     *
     * ```
     * this.st.setRow(0, { price: 100 })
     * this.st.setRow(0, { price: 100, name: 'asdf' })
     * this.st.setRow(item, { price: 100 })
     * ```
     */
    setRow(index, item, options) {
        options = { refreshSchema: false, emitReload: false, ...options };
        if (typeof index !== 'number') {
            index = this._data.indexOf(index);
        }
        this._data[index] = deepMergeKey(this._data[index], options?.arrayProcessMethod ?? false, item);
        this.optimizeData();
        if (options.refreshSchema) {
            this.resetColumns({ emitReload: options.emitReload });
            return this;
        }
        return this.refreshData();
    }
    // #endregion
    // #region sort
    sort(col, value) {
        if (this.multiSort) {
            col._sort.default = value;
            col._sort.tick = this.dataSource.nextSortTick;
        }
        else {
            this._headers.forEach(row => {
                row.forEach(item => (item.column._sort.default = item.column === col ? value : null));
            });
        }
        this.cdr.detectChanges();
        this.loadPageData().subscribe(() => {
            const res = {
                value,
                map: this.dataSource.getReqSortMap(this.singleSort, this.multiSort, this._headers),
                column: col
            };
            this.changeEmit('sort', res);
        });
    }
    clearSort() {
        this._headers.forEach(row => {
            row.forEach(item => (item.column._sort.default = null));
        });
        return this;
    }
    // #endregion
    // #region filter
    _handleFilter(col, confirm) {
        if (!confirm) {
            this.columnSource.cleanFilter(col);
        }
        // 过滤表示一种数据的变化应重置页码为 `1`
        this.pi = 1;
        this.columnSource.updateDefault(col.filter);
        this.loadPageData().subscribe(() => this.changeEmit('filter', col));
    }
    handleFilterNotify(value) {
        this.changeEmit('filterChange', value);
    }
    clearFilter() {
        this._columns.filter(w => w.filter && w.filter.default === true).forEach(col => this.columnSource.cleanFilter(col));
        return this;
    }
    // #endregion
    // #region checkbox
    /** 清除所有 `checkbox` */
    clearCheck() {
        return this.checkAll(false);
    }
    _refCheck() {
        const validData = this._data.filter(w => !w.disabled);
        const checkedList = validData.filter(w => w.checked === true);
        this._allChecked = checkedList.length > 0 && checkedList.length === validData.length;
        const allUnChecked = validData.every(value => !value.checked);
        this._indeterminate = !this._allChecked && !allUnChecked;
        this._allCheckedDisabled = this._data.length === this._data.filter(w => w.disabled).length;
        return this.cd();
    }
    checkAll(checked) {
        checked = typeof checked === 'undefined' ? this._allChecked : checked;
        this._data.filter(w => !w.disabled).forEach(i => (i.checked = checked));
        return this._refCheck()._checkNotify().refreshData();
    }
    _rowSelection(row) {
        row.select(this._data);
        return this._refCheck()._checkNotify();
    }
    _checkNotify() {
        const res = this._data.filter(w => !w.disabled && w.checked === true);
        this.changeEmit('checkbox', res);
        return this;
    }
    // #endregion
    // #region radio
    /** 清除所有 `radio` */
    clearRadio() {
        this._data.filter(w => w.checked).forEach(item => (item.checked = false));
        this.changeEmit('radio', null);
        return this.refreshData();
    }
    // #endregion
    _handleTd(ev) {
        switch (ev.type) {
            case 'checkbox':
                this._refCheck()._checkNotify();
                break;
            case 'radio':
                this.changeEmit('radio', ev.item);
                this.refreshData();
                break;
        }
    }
    // #region export
    /**
     * 导出当前页，确保已经注册 `XlsxModule`
     *
     * @param newData 重新指定数据；若为 `true` 表示使用 `filteredData` 数据
     * @param opt 额外参数
     */
    export(newData, opt) {
        const data = Array.isArray(newData)
            ? this.dataSource.optimizeData({ columns: this._columns, result: newData })
            : this._data;
        (newData === true ? this.filteredData : of(data)).subscribe((res) => this.exportSrv.export({
            columens: this._columns,
            ...opt,
            data: res
        }));
    }
    // #endregion
    // #region resizable
    colResize({ width }, column) {
        column.width = `${width}px`;
        this.changeEmit('resize', column);
    }
    // #endregion
    // #region contextmenu
    onContextmenu(event) {
        if (!this.contextmenu) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        const colEl = event.target.closest('[data-col-index]');
        if (!colEl) {
            return;
        }
        const colIndex = Number(colEl.dataset.colIndex);
        const rowIndex = Number(colEl.closest('tr').dataset.index);
        const isTitle = isNaN(rowIndex);
        const obs$ = this.contextmenu({
            event,
            type: isTitle ? 'head' : 'body',
            rowIndex: isTitle ? null : rowIndex,
            colIndex,
            data: isTitle ? null : this.list[rowIndex],
            column: this._columns[colIndex]
        });
        (isObservable(obs$) ? obs$ : of(obs$))
            .pipe(takeUntilDestroyed(this.destroy$), filter(res => res.length > 0))
            .subscribe(res => {
            this.contextmenuList = res.map(i => {
                if (!Array.isArray(i.children)) {
                    i.children = [];
                }
                return i;
            });
            this.cdr.detectChanges();
            this.cms?.create(event, this.contextmenuTpl);
        });
    }
    // #endregion
    get cdkVirtualScrollViewport() {
        return this.orgTable?.cdkVirtualScrollViewport;
    }
    _resetColumns(options) {
        options = { emitReload: true, preClearData: false, ...options };
        if (typeof options.columns !== 'undefined') {
            this.columns = options.columns;
        }
        if (typeof options.pi !== 'undefined') {
            this.pi = options.pi;
        }
        if (typeof options.ps !== 'undefined') {
            this.ps = options.ps;
        }
        if (options.emitReload) {
            // Should clean data, Because of changing columns may cause inaccurate data
            options.preClearData = true;
        }
        if (options.preClearData) {
            this._data = [];
        }
        this.refreshColumns();
        if (options.emitReload) {
            return this.loadPageData();
        }
        else {
            this.cd();
            return of(this);
        }
    }
    resetColumns(options) {
        return lastValueFrom(this._resetColumns(options));
    }
    refreshColumns() {
        const res = this.columnSource.process(this.columns, {
            widthMode: this.widthMode,
            resizable: this._resizable,
            safeType: this.cog.safeType,
            expand: this.expand != null
        });
        this._columns = res.columns;
        this._headers = res.headers;
        if (this.customWidthConfig === false && res.headerWidths != null) {
            this._widthConfig = res.headerWidths;
        }
        return this;
    }
    optimizeData() {
        this._data = this.dataSource.optimizeData({
            columns: this._columns,
            result: this._data,
            rowClassName: this.rowClassName
        });
        return this;
    }
    /**
     * Return pure data, `st` internally maintains a set of data for caching, this part of data may affect the backend
     *
     * 返回纯净数据，`st` 内部会维护一组用于缓存的数据，这部分数据可能会影响后端
     */
    pureItem(itemOrIndex) {
        if (typeof itemOrIndex === 'number') {
            itemOrIndex = this._data[itemOrIndex];
        }
        if (!itemOrIndex) {
            return null;
        }
        const copyItem = deepCopy(itemOrIndex);
        ['_values', '_rowClassName'].forEach(key => delete copyItem[key]);
        return copyItem;
    }
    ngAfterViewInit() {
        if (!this.delay)
            this.refreshColumns();
        if (!this.req.lazyLoad)
            this.loadPageData().subscribe();
        this.inied = true;
    }
    ngOnChanges(changes) {
        if (changes.loading) {
            this._loading = changes.loading.currentValue;
        }
        if (!this.inied)
            return;
        if (changes.columns) {
            this.refreshColumns().optimizeData();
        }
        if (changes.data) {
            this.loadPageData().subscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.1.2", type: STComponent, isStandalone: true, selector: "st", inputs: { req: { classPropertyName: "req", publicName: "req", isSignal: false, isRequired: false, transformFunction: null }, res: { classPropertyName: "res", publicName: "res", isSignal: false, isRequired: false, transformFunction: null }, page: { classPropertyName: "page", publicName: "page", isSignal: false, isRequired: false, transformFunction: null }, data: { classPropertyName: "data", publicName: "data", isSignal: false, isRequired: false, transformFunction: null }, delay: { classPropertyName: "delay", publicName: "delay", isSignal: false, isRequired: false, transformFunction: null }, columns: { classPropertyName: "columns", publicName: "columns", isSignal: false, isRequired: false, transformFunction: null }, contextmenu: { classPropertyName: "contextmenu", publicName: "contextmenu", isSignal: false, isRequired: false, transformFunction: null }, ps: { classPropertyName: "ps", publicName: "ps", isSignal: false, isRequired: false, transformFunction: (v) => numberAttribute(v, 10) }, pi: { classPropertyName: "pi", publicName: "pi", isSignal: false, isRequired: false, transformFunction: (v) => numberAttribute(v, 1) }, total: { classPropertyName: "total", publicName: "total", isSignal: false, isRequired: false, transformFunction: (v) => numberAttribute(v, 0) }, loading: { classPropertyName: "loading", publicName: "loading", isSignal: false, isRequired: false, transformFunction: null }, loadingDelay: { classPropertyName: "loadingDelay", publicName: "loadingDelay", isSignal: false, isRequired: false, transformFunction: numberAttribute }, loadingIndicator: { classPropertyName: "loadingIndicator", publicName: "loadingIndicator", isSignal: false, isRequired: false, transformFunction: null }, bordered: { classPropertyName: "bordered", publicName: "bordered", isSignal: false, isRequired: false, transformFunction: booleanAttribute }, size: { classPropertyName: "size", publicName: "size", isSignal: false, isRequired: false, transformFunction: null }, scroll: { classPropertyName: "scroll", publicName: "scroll", isSignal: false, isRequired: false, transformFunction: null }, drag: { classPropertyName: "drag", publicName: "drag", isSignal: true, isRequired: false, transformFunction: null }, singleSort: { classPropertyName: "singleSort", publicName: "singleSort", isSignal: false, isRequired: false, transformFunction: null }, multiSort: { classPropertyName: "multiSort", publicName: "multiSort", isSignal: false, isRequired: false, transformFunction: null }, rowClassName: { classPropertyName: "rowClassName", publicName: "rowClassName", isSignal: false, isRequired: false, transformFunction: null }, clickRowClassName: { classPropertyName: "clickRowClassName", publicName: "clickRowClassName", isSignal: false, isRequired: false, transformFunction: null }, widthMode: { classPropertyName: "widthMode", publicName: "widthMode", isSignal: false, isRequired: false, transformFunction: null }, widthConfig: { classPropertyName: "widthConfig", publicName: "widthConfig", isSignal: false, isRequired: false, transformFunction: null }, resizable: { classPropertyName: "resizable", publicName: "resizable", isSignal: false, isRequired: false, transformFunction: null }, header: { classPropertyName: "header", publicName: "header", isSignal: false, isRequired: false, transformFunction: null }, showHeader: { classPropertyName: "showHeader", publicName: "showHeader", isSignal: false, isRequired: false, transformFunction: booleanAttribute }, footer: { classPropertyName: "footer", publicName: "footer", isSignal: false, isRequired: false, transformFunction: null }, bodyHeader: { classPropertyName: "bodyHeader", publicName: "bodyHeader", isSignal: false, isRequired: false, transformFunction: null }, body: { classPropertyName: "body", publicName: "body", isSignal: false, isRequired: false, transformFunction: null }, expandRowByClick: { classPropertyName: "expandRowByClick", publicName: "expandRowByClick", isSignal: false, isRequired: false, transformFunction: booleanAttribute }, expandAccordion: { classPropertyName: "expandAccordion", publicName: "expandAccordion", isSignal: false, isRequired: false, transformFunction: booleanAttribute }, expand: { classPropertyName: "expand", publicName: "expand", isSignal: false, isRequired: false, transformFunction: null }, expandIcon: { classPropertyName: "expandIcon", publicName: "expandIcon", isSignal: false, isRequired: false, transformFunction: null }, noResult: { classPropertyName: "noResult", publicName: "noResult", isSignal: false, isRequired: false, transformFunction: null }, responsive: { classPropertyName: "responsive", publicName: "responsive", isSignal: false, isRequired: false, transformFunction: booleanAttribute }, responsiveHideHeaderFooter: { classPropertyName: "responsiveHideHeaderFooter", publicName: "responsiveHideHeaderFooter", isSignal: false, isRequired: false, transformFunction: booleanAttribute }, virtualScroll: { classPropertyName: "virtualScroll", publicName: "virtualScroll", isSignal: false, isRequired: false, transformFunction: booleanAttribute }, virtualItemSize: { classPropertyName: "virtualItemSize", publicName: "virtualItemSize", isSignal: false, isRequired: false, transformFunction: numberAttribute }, virtualMaxBufferPx: { classPropertyName: "virtualMaxBufferPx", publicName: "virtualMaxBufferPx", isSignal: false, isRequired: false, transformFunction: numberAttribute }, virtualMinBufferPx: { classPropertyName: "virtualMinBufferPx", publicName: "virtualMinBufferPx", isSignal: false, isRequired: false, transformFunction: numberAttribute }, customRequest: { classPropertyName: "customRequest", publicName: "customRequest", isSignal: false, isRequired: false, transformFunction: null }, virtualForTrackBy: { classPropertyName: "virtualForTrackBy", publicName: "virtualForTrackBy", isSignal: false, isRequired: false, transformFunction: null }, trackBy: { classPropertyName: "trackBy", publicName: "trackBy", isSignal: false, isRequired: false, transformFunction: null } }, outputs: { error: "error", change: "change" }, host: { properties: { "class.st": "true", "class.st__p-left": "page.placement === 'left'", "class.st__p-center": "page.placement === 'center'", "class.st__width-strict": "widthMode.type === 'strict'", "class.st__row-class": "rowClassName", "class.ant-table-rep": "responsive", "class.ant-table-rep__hide-header-footer": "responsiveHideHeaderFooter" } }, providers: [STDataSource, STRowSource, STColumnSource, STExport, DatePipe, YNPipe, DecimalPipe], viewQueries: [{ propertyName: "orgTable", first: true, predicate: ["table"], descendants: true }, { propertyName: "contextmenuTpl", first: true, predicate: ["contextmenuTpl"], descendants: true }], exportAs: ["st"], usesOnChanges: true, ngImport: i0, template: "<ng-template #titleTpl let-i>\n  <span [innerHTML]=\"i._text\"></span>\n  @if (i.optional) {\n    <small class=\"st__head-optional\" [innerHTML]=\"i.optional\"></small>\n  }\n  @if (i.optionalHelp) {\n    <nz-icon class=\"st__head-tip\" nz-tooltip [nzTooltipTitle]=\"i.optionalHelp\" nzType=\"question-circle\" />\n  }\n</ng-template>\n<ng-template #chkAllTpl let-custom>\n  <label\n    nz-checkbox\n    class=\"st__checkall\"\n    [nzDisabled]=\"_allCheckedDisabled\"\n    [(ngModel)]=\"_allChecked\"\n    [nzIndeterminate]=\"_indeterminate\"\n    (ngModelChange)=\"checkAll()\"\n    [class.ant-table-selection-select-all-custom]=\"custom\"\n  ></label>\n</ng-template>\n<nz-table\n  #table\n  [nzData]=\"_data\"\n  [(nzPageIndex)]=\"pi\"\n  (nzPageIndexChange)=\"_change('pi')\"\n  [(nzPageSize)]=\"ps\"\n  (nzPageSizeChange)=\"_change('ps')\"\n  [nzTotal]=\"total\"\n  [nzShowPagination]=\"_isPagination\"\n  [nzFrontPagination]=\"false\"\n  [nzBordered]=\"bordered\"\n  [nzSize]=\"size\"\n  [nzLoading]=\"noColumns || _loading\"\n  [nzLoadingDelay]=\"loadingDelay\"\n  [nzLoadingIndicator]=\"loadingIndicator\"\n  [nzTitle]=\"header!\"\n  [nzFooter]=\"footer!\"\n  [nzScroll]=\"scroll\"\n  [nzVirtualItemSize]=\"virtualItemSize\"\n  [nzVirtualMaxBufferPx]=\"virtualMaxBufferPx\"\n  [nzVirtualMinBufferPx]=\"virtualMinBufferPx\"\n  [nzVirtualForTrackBy]=\"virtualForTrackBy\"\n  [nzNoResult]=\"noResult!\"\n  [nzPageSizeOptions]=\"page.pageSizes!\"\n  [nzShowQuickJumper]=\"page.showQuickJumper\"\n  [nzShowSizeChanger]=\"page.showSize\"\n  [nzPaginationPosition]=\"page.position!\"\n  [nzPaginationType]=\"page.type!\"\n  [nzItemRender]=\"page.itemRender!\"\n  [nzSimple]=\"page.simple\"\n  [nzShowTotal]=\"totalTpl\"\n  [nzWidthConfig]=\"_widthConfig\"\n  (contextmenu)=\"onContextmenu($event)\"\n  [class.st__no-column]=\"noColumns\"\n>\n  @if (showHeader) {\n    <thead>\n      @for (row of _headers; track row) {\n        <tr>\n          @if ($first && expand) {\n            <th nzWidth=\"50px\" [rowSpan]=\"_headers.length\" [nzLeft]=\"row[0].column._left ? true : false\"></th>\n          }\n          @for (h of row; track h; let index = $index; let last = $last) {\n            @let _c = h.column;\n            <th\n              [colSpan]=\"h.colSpan\"\n              [rowSpan]=\"h.rowSpan\"\n              [nzWidth]=\"$any(_c).width\"\n              [nzLeft]=\"_c._left\"\n              [nzRight]=\"_c._right\"\n              [class]=\"_c._className\"\n              [attr.data-col]=\"_c.indexKey\"\n              [attr.data-col-index]=\"index\"\n              [nzShowSort]=\"_c._sort.enabled\"\n              [nzSortDirections]=\"_c._sort.directions!\"\n              [nzSortOrder]=\"$any(_c)._sort.default\"\n              (nzSortOrderChange)=\"sort(_c, $event)\"\n              [nzCustomFilter]=\"!!_c.filter\"\n              [class.st__has-filter]=\"_c.filter\"\n              nz-resizable\n              [nzDisabled]=\"last || $any(_c).resizable.disabled\"\n              [nzMaxWidth]=\"$any(_c).resizable.maxWidth\"\n              [nzMinWidth]=\"$any(_c).resizable.minWidth\"\n              [nzBounds]=\"$any(_c).resizable.bounds\"\n              [nzPreview]=\"$any(_c).resizable.preview\"\n              (nzResizeEnd)=\"colResize($event, _c)\"\n            >\n              @if ($any(!last && !$any(_c).resizable.disabled)) {\n                <nz-resize-handle nzDirection=\"right\" (click)=\"_stopPropagation($event)\">\n                  <i></i>\n                </nz-resize-handle>\n              }\n              @if (_c.__renderTitle) {\n                <ng-template\n                  [ngTemplateOutlet]=\"_c.__renderTitle!\"\n                  [ngTemplateOutletContext]=\"{ $implicit: h.column, index: index }\"\n                />\n              } @else {\n                @switch (_c.type) {\n                  @case ('checkbox') {\n                    @if (_c.selections!.length === 0) {\n                      <ng-template [ngTemplateOutlet]=\"chkAllTpl\" [ngTemplateOutletContext]=\"{ $implicit: false }\" />\n                    } @else {\n                      <div class=\"ant-table-selection\">\n                        <ng-template [ngTemplateOutlet]=\"chkAllTpl\" [ngTemplateOutletContext]=\"{ $implicit: true }\" />\n                        @if (_c.selections!.length) {\n                          <div class=\"ant-table-selection-extra\">\n                            <div\n                              nz-dropdown\n                              nzPlacement=\"bottomLeft\"\n                              [nzDropdownMenu]=\"selectionMenu\"\n                              class=\"ant-table-selection-down st__checkall-selection\"\n                            >\n                              <nz-icon nzType=\"down\" />\n                            </div>\n                          </div>\n                        }\n                        <nz-dropdown-menu #selectionMenu=\"nzDropdownMenu\">\n                          <ul nz-menu class=\"ant-table-selection-menu\">\n                            @for (rw of _c.selections; track $index) {\n                              <li nz-menu-item (click)=\"_rowSelection(rw)\" [innerHTML]=\"rw.text\"></li>\n                            }\n                          </ul>\n                        </nz-dropdown-menu>\n                      </div>\n                    }\n                  }\n                  @default {\n                    <ng-template [ngTemplateOutlet]=\"titleTpl\" [ngTemplateOutletContext]=\"{ $implicit: _c.title }\" />\n                  }\n                }\n              }\n              @if (_c.filter) {\n                <ng-container *ngTemplateOutlet=\"filterTpl\"></ng-container>\n              }\n              <ng-template #filterTpl>\n                <st-filter\n                  nz-th-extra\n                  [col]=\"h.column\"\n                  [f]=\"_c.filter!\"\n                  [locale]=\"locale()\"\n                  (n)=\"handleFilterNotify($event)\"\n                  (handle)=\"_handleFilter(_c, $event)\"\n                />\n              </ng-template>\n            </th>\n          }\n        </tr>\n      }\n    </thead>\n  }\n  <tbody\n    class=\"st__body\"\n    cdkDropList\n    [cdkDropListDisabled]=\"drag() === null\"\n    (cdkDropListDropped)=\"drag()?.dropped?.($event)\"\n    (cdkDropListEntered)=\"drag()?.entered?.($event)\"\n    (cdkDropListExited)=\"drag()?.exited?.($event)\"\n    (cdkDropListSorted)=\"drag()?.sorted?.($event)\"\n  >\n    @if (!_loading) {\n      <ng-template [ngTemplateOutlet]=\"bodyHeader!\" [ngTemplateOutletContext]=\"{ $implicit: _statistical }\" />\n    }\n    <ng-template #bodyTpl let-i let-index=\"index\">\n      <tr\n        [attr.data-index]=\"index\"\n        (click)=\"_rowClick($event, i, index, false)\"\n        (dblclick)=\"_rowClick($event, i, index, true)\"\n        [class]=\"i._rowClassName\"\n        cdkDrag\n      >\n        @if (expand) {\n          <td\n            [nzShowExpand]=\"expand && i.showExpand !== false\"\n            [nzExpand]=\"i.expand\"\n            [nzExpandIcon]=\"expandIcon ? wrapExpandIcon : null\"\n            (nzExpandChange)=\"_expandChange(i, $event)\"\n            (click)=\"_stopPropagation($event)\"\n            nzWidth=\"50px\"\n            [nzLeft]=\"_columns[0]._left ? true : false\"\n          ></td>\n          <ng-template #wrapExpandIcon>\n            <span (click)=\"_expandChange(i, !i.expand)\">\n              <ng-template [ngTemplateOutlet]=\"expandIcon\" [ngTemplateOutletContext]=\"{ $implicit: i, index: index }\" />\n            </span>\n          </ng-template>\n        }\n        @for (c of _columns; track cIdx; let cIdx = $index) {\n          @let props = i._values[cIdx].props;\n          @if (props?.colSpan > 0 && props?.rowSpan > 0) {\n            <td\n              [nzLeft]=\"c._left\"\n              [nzRight]=\"c._right\"\n              [attr.data-col-index]=\"cIdx\"\n              [class]=\"c._className\"\n              [attr.colspan]=\"props?.colSpan === 1 ? null : props?.colSpan\"\n              [attr.rowspan]=\"props?.rowSpan === 1 ? null : props?.rowSpan\"\n            >\n              @if (responsive) {\n                <span class=\"ant-table-rep__title\">\n                  <ng-template [ngTemplateOutlet]=\"titleTpl\" [ngTemplateOutletContext]=\"{ $implicit: c.title }\" />\n                </span>\n              }\n              <st-td [data]=\"_data\" [i]=\"i\" [index]=\"index\" [c]=\"c\" [cIdx]=\"cIdx\" (n)=\"_handleTd($event)\" />\n            </td>\n          }\n        }\n      </tr>\n      <tr [nzExpand]=\"i.expand\">\n        <ng-template [ngTemplateOutlet]=\"expand\" [ngTemplateOutletContext]=\"{ $implicit: i, index: index }\" />\n      </tr>\n    </ng-template>\n    @if (virtualScroll) {\n      <ng-template nz-virtual-scroll let-i let-index=\"index\">\n        <ng-template [ngTemplateOutlet]=\"bodyTpl\" [ngTemplateOutletContext]=\"{ $implicit: i, index: index }\" />\n      </ng-template>\n    } @else {\n      @for (i of _data; track trackBy($index, i)) {\n        <ng-template [ngTemplateOutlet]=\"bodyTpl\" [ngTemplateOutletContext]=\"{ $implicit: i, index: $index }\" />\n      }\n    }\n    @if (!_loading) {\n      <ng-template [ngTemplateOutlet]=\"body!\" [ngTemplateOutletContext]=\"{ $implicit: _statistical }\" />\n    }\n  </tbody>\n  <ng-template #totalTpl let-range=\"range\" let-total>{{ renderTotal(total, range) }}</ng-template>\n</nz-table>\n<nz-dropdown-menu #contextmenuTpl=\"nzDropdownMenu\">\n  <ul nz-menu class=\"st__contextmenu\">\n    @for (i of contextmenuList; track $index) {\n      @if (i.children!.length === 0) {\n        <li nz-menu-item (click)=\"i.fn!(i)\" [innerHTML]=\"i.text\"></li>\n      } @else {\n        <li nz-submenu [nzTitle]=\"i.text\">\n          <ul>\n            @for (ci of i.children; track $index) {\n              <li nz-menu-item (click)=\"ci.fn!(ci)\" [innerHTML]=\"ci.text\"></li>\n            }\n          </ul>\n        </li>\n      }\n    }\n  </ul>\n</nz-dropdown-menu>\n", dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: NzTableModule }, { kind: "component", type: i4$1.NzTableComponent, selector: "nz-table", inputs: ["nzTableLayout", "nzShowTotal", "nzItemRender", "nzTitle", "nzFooter", "nzNoResult", "nzPageSizeOptions", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualForTrackBy", "nzLoadingDelay", "nzPageIndex", "nzPageSize", "nzTotal", "nzWidthConfig", "nzData", "nzCustomColumn", "nzPaginationPosition", "nzScroll", "noDataVirtualHeight", "nzPaginationType", "nzFrontPagination", "nzTemplateMode", "nzShowPagination", "nzLoading", "nzOuterBordered", "nzLoadingIndicator", "nzBordered", "nzSize", "nzShowSizeChanger", "nzHideOnSinglePage", "nzShowQuickJumper", "nzSimple"], outputs: ["nzPageSizeChange", "nzPageIndexChange", "nzQueryParams", "nzCurrentPageDataChange", "nzCustomColumnChange"], exportAs: ["nzTable"] }, { kind: "component", type: i4$1.NzThAddOnComponent, selector: "th[nzColumnKey], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]", inputs: ["nzColumnKey", "nzFilterMultiple", "nzSortOrder", "nzSortPriority", "nzSortDirections", "nzFilters", "nzSortFn", "nzFilterFn", "nzShowSort", "nzShowFilter", "nzCustomFilter"], outputs: ["nzCheckedChange", "nzSortOrderChange", "nzFilterChange"] }, { kind: "directive", type: i4$1.NzTableCellDirective, selector: "th:not(.nz-disable-th), td:not(.nz-disable-td)" }, { kind: "directive", type: i4$1.NzThMeasureDirective, selector: "th", inputs: ["nzWidth", "colspan", "colSpan", "rowspan", "rowSpan"] }, { kind: "component", type: i4$1.NzTdAddOnComponent, selector: "td[nzChecked], td[nzDisabled], td[nzIndeterminate], td[nzIndentSize], td[nzExpand], td[nzShowExpand], td[nzShowCheckbox]", inputs: ["nzChecked", "nzDisabled", "nzIndeterminate", "nzLabel", "nzIndentSize", "nzShowExpand", "nzShowCheckbox", "nzExpand", "nzExpandIcon"], outputs: ["nzCheckedChange", "nzExpandChange"] }, { kind: "component", type: i4$1.NzTheadComponent, selector: "thead:not(.ant-table-thead)", outputs: ["nzSortOrderChange"] }, { kind: "component", type: i4$1.NzTbodyComponent, selector: "tbody" }, { kind: "directive", type: i4$1.NzTrDirective, selector: "tr:not([nz-table-measure-row]):not([nzExpand]):not([nz-table-fixed-row])" }, { kind: "directive", type: i4$1.NzTableVirtualScrollDirective, selector: "[nz-virtual-scroll]", exportAs: ["nzVirtualScroll"] }, { kind: "directive", type: i4$1.NzCellFixedDirective, selector: "td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]", inputs: ["nzRight", "nzLeft", "colspan", "colSpan"] }, { kind: "directive", type: i4$1.NzTrExpandDirective, selector: "tr[nzExpand]", inputs: ["nzExpand"] }, { kind: "component", type: i4$1.NzTableFixedRowComponent, selector: "tr[nz-table-fixed-row], tr[nzExpand]" }, { kind: "directive", type: NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "cdkConnectedOverlayPush", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { kind: "component", type: NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId", "nzName"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { kind: "ngmodule", type: NzResizableModule }, { kind: "directive", type: i5.NzResizableDirective, selector: "[nz-resizable]", inputs: ["nzBounds", "nzMaxHeight", "nzMaxWidth", "nzMinHeight", "nzMinWidth", "nzGridColumnCount", "nzMaxColumn", "nzMinColumn", "nzLockAspectRatio", "nzPreview", "nzDisabled"], outputs: ["nzResize", "nzResizeEnd", "nzResizeStart"], exportAs: ["nzResizable"] }, { kind: "component", type: i5.NzResizeHandleComponent, selector: "nz-resize-handle, [nz-resize-handle]", inputs: ["nzDirection", "nzCursorType"], outputs: ["nzMouseDown"], exportAs: ["nzResizeHandle"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzDropDownModule }, { kind: "directive", type: i2$1.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i2$1.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "component", type: i2$1.NzSubMenuComponent, selector: "[nz-submenu]", inputs: ["nzMenuClassName", "nzPaddingLeft", "nzTitle", "nzIcon", "nzTriggerSubMenuAction", "nzOpen", "nzDisabled", "nzPlacement"], outputs: ["nzOpenChange"], exportAs: ["nzSubmenu"] }, { kind: "directive", type: i3$1.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i3$1.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzMenuModule }, { kind: "component", type: STFilterComponent, selector: "st-filter", inputs: ["col", "locale", "f"], outputs: ["n", "handle"] }, { kind: "component", type: STTdComponent, selector: "st-td", inputs: ["c", "cIdx", "data", "i", "index"], outputs: ["n"] }, { kind: "ngmodule", type: DragDropModule }, { kind: "directive", type: i6.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "cdkDropListData", "cdkDropListOrientation", "id", "cdkDropListLockAxis", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListAutoScrollDisabled", "cdkDropListAutoScrollStep", "cdkDropListElementContainer", "cdkDropListHasAnchor"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { kind: "directive", type: i6.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer", "cdkDragScale"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STComponent, decorators: [{
            type: Component,
            args: [{ selector: 'st', exportAs: 'st', providers: [STDataSource, STRowSource, STColumnSource, STExport, DatePipe, YNPipe, DecimalPipe], host: {
                        '[class.st]': `true`,
                        '[class.st__p-left]': `page.placement === 'left'`,
                        '[class.st__p-center]': `page.placement === 'center'`,
                        '[class.st__width-strict]': `widthMode.type === 'strict'`,
                        '[class.st__row-class]': `rowClassName`,
                        '[class.ant-table-rep]': `responsive`,
                        '[class.ant-table-rep__hide-header-footer]': `responsiveHideHeaderFooter`
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, imports: [
                        FormsModule,
                        NzTableModule,
                        NzTooltipDirective,
                        NzCheckboxComponent,
                        NzResizableModule,
                        NgTemplateOutlet,
                        NzDropDownModule,
                        NzIconDirective,
                        NzMenuModule,
                        STFilterComponent,
                        STTdComponent,
                        DragDropModule
                    ], template: "<ng-template #titleTpl let-i>\n  <span [innerHTML]=\"i._text\"></span>\n  @if (i.optional) {\n    <small class=\"st__head-optional\" [innerHTML]=\"i.optional\"></small>\n  }\n  @if (i.optionalHelp) {\n    <nz-icon class=\"st__head-tip\" nz-tooltip [nzTooltipTitle]=\"i.optionalHelp\" nzType=\"question-circle\" />\n  }\n</ng-template>\n<ng-template #chkAllTpl let-custom>\n  <label\n    nz-checkbox\n    class=\"st__checkall\"\n    [nzDisabled]=\"_allCheckedDisabled\"\n    [(ngModel)]=\"_allChecked\"\n    [nzIndeterminate]=\"_indeterminate\"\n    (ngModelChange)=\"checkAll()\"\n    [class.ant-table-selection-select-all-custom]=\"custom\"\n  ></label>\n</ng-template>\n<nz-table\n  #table\n  [nzData]=\"_data\"\n  [(nzPageIndex)]=\"pi\"\n  (nzPageIndexChange)=\"_change('pi')\"\n  [(nzPageSize)]=\"ps\"\n  (nzPageSizeChange)=\"_change('ps')\"\n  [nzTotal]=\"total\"\n  [nzShowPagination]=\"_isPagination\"\n  [nzFrontPagination]=\"false\"\n  [nzBordered]=\"bordered\"\n  [nzSize]=\"size\"\n  [nzLoading]=\"noColumns || _loading\"\n  [nzLoadingDelay]=\"loadingDelay\"\n  [nzLoadingIndicator]=\"loadingIndicator\"\n  [nzTitle]=\"header!\"\n  [nzFooter]=\"footer!\"\n  [nzScroll]=\"scroll\"\n  [nzVirtualItemSize]=\"virtualItemSize\"\n  [nzVirtualMaxBufferPx]=\"virtualMaxBufferPx\"\n  [nzVirtualMinBufferPx]=\"virtualMinBufferPx\"\n  [nzVirtualForTrackBy]=\"virtualForTrackBy\"\n  [nzNoResult]=\"noResult!\"\n  [nzPageSizeOptions]=\"page.pageSizes!\"\n  [nzShowQuickJumper]=\"page.showQuickJumper\"\n  [nzShowSizeChanger]=\"page.showSize\"\n  [nzPaginationPosition]=\"page.position!\"\n  [nzPaginationType]=\"page.type!\"\n  [nzItemRender]=\"page.itemRender!\"\n  [nzSimple]=\"page.simple\"\n  [nzShowTotal]=\"totalTpl\"\n  [nzWidthConfig]=\"_widthConfig\"\n  (contextmenu)=\"onContextmenu($event)\"\n  [class.st__no-column]=\"noColumns\"\n>\n  @if (showHeader) {\n    <thead>\n      @for (row of _headers; track row) {\n        <tr>\n          @if ($first && expand) {\n            <th nzWidth=\"50px\" [rowSpan]=\"_headers.length\" [nzLeft]=\"row[0].column._left ? true : false\"></th>\n          }\n          @for (h of row; track h; let index = $index; let last = $last) {\n            @let _c = h.column;\n            <th\n              [colSpan]=\"h.colSpan\"\n              [rowSpan]=\"h.rowSpan\"\n              [nzWidth]=\"$any(_c).width\"\n              [nzLeft]=\"_c._left\"\n              [nzRight]=\"_c._right\"\n              [class]=\"_c._className\"\n              [attr.data-col]=\"_c.indexKey\"\n              [attr.data-col-index]=\"index\"\n              [nzShowSort]=\"_c._sort.enabled\"\n              [nzSortDirections]=\"_c._sort.directions!\"\n              [nzSortOrder]=\"$any(_c)._sort.default\"\n              (nzSortOrderChange)=\"sort(_c, $event)\"\n              [nzCustomFilter]=\"!!_c.filter\"\n              [class.st__has-filter]=\"_c.filter\"\n              nz-resizable\n              [nzDisabled]=\"last || $any(_c).resizable.disabled\"\n              [nzMaxWidth]=\"$any(_c).resizable.maxWidth\"\n              [nzMinWidth]=\"$any(_c).resizable.minWidth\"\n              [nzBounds]=\"$any(_c).resizable.bounds\"\n              [nzPreview]=\"$any(_c).resizable.preview\"\n              (nzResizeEnd)=\"colResize($event, _c)\"\n            >\n              @if ($any(!last && !$any(_c).resizable.disabled)) {\n                <nz-resize-handle nzDirection=\"right\" (click)=\"_stopPropagation($event)\">\n                  <i></i>\n                </nz-resize-handle>\n              }\n              @if (_c.__renderTitle) {\n                <ng-template\n                  [ngTemplateOutlet]=\"_c.__renderTitle!\"\n                  [ngTemplateOutletContext]=\"{ $implicit: h.column, index: index }\"\n                />\n              } @else {\n                @switch (_c.type) {\n                  @case ('checkbox') {\n                    @if (_c.selections!.length === 0) {\n                      <ng-template [ngTemplateOutlet]=\"chkAllTpl\" [ngTemplateOutletContext]=\"{ $implicit: false }\" />\n                    } @else {\n                      <div class=\"ant-table-selection\">\n                        <ng-template [ngTemplateOutlet]=\"chkAllTpl\" [ngTemplateOutletContext]=\"{ $implicit: true }\" />\n                        @if (_c.selections!.length) {\n                          <div class=\"ant-table-selection-extra\">\n                            <div\n                              nz-dropdown\n                              nzPlacement=\"bottomLeft\"\n                              [nzDropdownMenu]=\"selectionMenu\"\n                              class=\"ant-table-selection-down st__checkall-selection\"\n                            >\n                              <nz-icon nzType=\"down\" />\n                            </div>\n                          </div>\n                        }\n                        <nz-dropdown-menu #selectionMenu=\"nzDropdownMenu\">\n                          <ul nz-menu class=\"ant-table-selection-menu\">\n                            @for (rw of _c.selections; track $index) {\n                              <li nz-menu-item (click)=\"_rowSelection(rw)\" [innerHTML]=\"rw.text\"></li>\n                            }\n                          </ul>\n                        </nz-dropdown-menu>\n                      </div>\n                    }\n                  }\n                  @default {\n                    <ng-template [ngTemplateOutlet]=\"titleTpl\" [ngTemplateOutletContext]=\"{ $implicit: _c.title }\" />\n                  }\n                }\n              }\n              @if (_c.filter) {\n                <ng-container *ngTemplateOutlet=\"filterTpl\"></ng-container>\n              }\n              <ng-template #filterTpl>\n                <st-filter\n                  nz-th-extra\n                  [col]=\"h.column\"\n                  [f]=\"_c.filter!\"\n                  [locale]=\"locale()\"\n                  (n)=\"handleFilterNotify($event)\"\n                  (handle)=\"_handleFilter(_c, $event)\"\n                />\n              </ng-template>\n            </th>\n          }\n        </tr>\n      }\n    </thead>\n  }\n  <tbody\n    class=\"st__body\"\n    cdkDropList\n    [cdkDropListDisabled]=\"drag() === null\"\n    (cdkDropListDropped)=\"drag()?.dropped?.($event)\"\n    (cdkDropListEntered)=\"drag()?.entered?.($event)\"\n    (cdkDropListExited)=\"drag()?.exited?.($event)\"\n    (cdkDropListSorted)=\"drag()?.sorted?.($event)\"\n  >\n    @if (!_loading) {\n      <ng-template [ngTemplateOutlet]=\"bodyHeader!\" [ngTemplateOutletContext]=\"{ $implicit: _statistical }\" />\n    }\n    <ng-template #bodyTpl let-i let-index=\"index\">\n      <tr\n        [attr.data-index]=\"index\"\n        (click)=\"_rowClick($event, i, index, false)\"\n        (dblclick)=\"_rowClick($event, i, index, true)\"\n        [class]=\"i._rowClassName\"\n        cdkDrag\n      >\n        @if (expand) {\n          <td\n            [nzShowExpand]=\"expand && i.showExpand !== false\"\n            [nzExpand]=\"i.expand\"\n            [nzExpandIcon]=\"expandIcon ? wrapExpandIcon : null\"\n            (nzExpandChange)=\"_expandChange(i, $event)\"\n            (click)=\"_stopPropagation($event)\"\n            nzWidth=\"50px\"\n            [nzLeft]=\"_columns[0]._left ? true : false\"\n          ></td>\n          <ng-template #wrapExpandIcon>\n            <span (click)=\"_expandChange(i, !i.expand)\">\n              <ng-template [ngTemplateOutlet]=\"expandIcon\" [ngTemplateOutletContext]=\"{ $implicit: i, index: index }\" />\n            </span>\n          </ng-template>\n        }\n        @for (c of _columns; track cIdx; let cIdx = $index) {\n          @let props = i._values[cIdx].props;\n          @if (props?.colSpan > 0 && props?.rowSpan > 0) {\n            <td\n              [nzLeft]=\"c._left\"\n              [nzRight]=\"c._right\"\n              [attr.data-col-index]=\"cIdx\"\n              [class]=\"c._className\"\n              [attr.colspan]=\"props?.colSpan === 1 ? null : props?.colSpan\"\n              [attr.rowspan]=\"props?.rowSpan === 1 ? null : props?.rowSpan\"\n            >\n              @if (responsive) {\n                <span class=\"ant-table-rep__title\">\n                  <ng-template [ngTemplateOutlet]=\"titleTpl\" [ngTemplateOutletContext]=\"{ $implicit: c.title }\" />\n                </span>\n              }\n              <st-td [data]=\"_data\" [i]=\"i\" [index]=\"index\" [c]=\"c\" [cIdx]=\"cIdx\" (n)=\"_handleTd($event)\" />\n            </td>\n          }\n        }\n      </tr>\n      <tr [nzExpand]=\"i.expand\">\n        <ng-template [ngTemplateOutlet]=\"expand\" [ngTemplateOutletContext]=\"{ $implicit: i, index: index }\" />\n      </tr>\n    </ng-template>\n    @if (virtualScroll) {\n      <ng-template nz-virtual-scroll let-i let-index=\"index\">\n        <ng-template [ngTemplateOutlet]=\"bodyTpl\" [ngTemplateOutletContext]=\"{ $implicit: i, index: index }\" />\n      </ng-template>\n    } @else {\n      @for (i of _data; track trackBy($index, i)) {\n        <ng-template [ngTemplateOutlet]=\"bodyTpl\" [ngTemplateOutletContext]=\"{ $implicit: i, index: $index }\" />\n      }\n    }\n    @if (!_loading) {\n      <ng-template [ngTemplateOutlet]=\"body!\" [ngTemplateOutletContext]=\"{ $implicit: _statistical }\" />\n    }\n  </tbody>\n  <ng-template #totalTpl let-range=\"range\" let-total>{{ renderTotal(total, range) }}</ng-template>\n</nz-table>\n<nz-dropdown-menu #contextmenuTpl=\"nzDropdownMenu\">\n  <ul nz-menu class=\"st__contextmenu\">\n    @for (i of contextmenuList; track $index) {\n      @if (i.children!.length === 0) {\n        <li nz-menu-item (click)=\"i.fn!(i)\" [innerHTML]=\"i.text\"></li>\n      } @else {\n        <li nz-submenu [nzTitle]=\"i.text\">\n          <ul>\n            @for (ci of i.children; track $index) {\n              <li nz-menu-item (click)=\"ci.fn!(ci)\" [innerHTML]=\"ci.text\"></li>\n            }\n          </ul>\n        </li>\n      }\n    }\n  </ul>\n</nz-dropdown-menu>\n" }]
        }], ctorParameters: () => [], propDecorators: { orgTable: [{
                type: ViewChild,
                args: ['table']
            }], contextmenuTpl: [{
                type: ViewChild,
                args: ['contextmenuTpl']
            }], req: [{
                type: Input
            }], res: [{
                type: Input
            }], page: [{
                type: Input
            }], data: [{
                type: Input
            }], delay: [{
                type: Input
            }], columns: [{
                type: Input
            }], contextmenu: [{
                type: Input
            }], ps: [{
                type: Input,
                args: [{ transform: (v) => numberAttribute(v, 10) }]
            }], pi: [{
                type: Input,
                args: [{ transform: (v) => numberAttribute(v, 1) }]
            }], total: [{
                type: Input,
                args: [{ transform: (v) => numberAttribute(v, 0) }]
            }], loading: [{
                type: Input
            }], loadingDelay: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], loadingIndicator: [{
                type: Input
            }], bordered: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], size: [{
                type: Input
            }], scroll: [{
                type: Input
            }], singleSort: [{
                type: Input
            }], multiSort: [{
                type: Input
            }], rowClassName: [{
                type: Input
            }], clickRowClassName: [{
                type: Input
            }], widthMode: [{
                type: Input
            }], widthConfig: [{
                type: Input
            }], resizable: [{
                type: Input
            }], header: [{
                type: Input
            }], showHeader: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], footer: [{
                type: Input
            }], bodyHeader: [{
                type: Input
            }], body: [{
                type: Input
            }], expandRowByClick: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], expandAccordion: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], expand: [{
                type: Input
            }], expandIcon: [{
                type: Input
            }], noResult: [{
                type: Input
            }], responsive: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], responsiveHideHeaderFooter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], error: [{
                type: Output
            }], change: [{
                type: Output
            }], virtualScroll: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], virtualItemSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], virtualMaxBufferPx: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], virtualMinBufferPx: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], customRequest: [{
                type: Input
            }], virtualForTrackBy: [{
                type: Input
            }], trackBy: [{
                type: Input
            }] } });

const COMPONENTS = [STComponent, STRowDirective, STWidgetHostDirective];
class STModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.1.2", ngImport: i0, type: STModule, imports: [STComponent, STRowDirective, STWidgetHostDirective], exports: [STComponent, STRowDirective, STWidgetHostDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STModule, imports: [STComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.2", ngImport: i0, type: STModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS,
                    exports: COMPONENTS
                }]
        }] });

/**
 * Just only using Standalone widgets
 */
function provideSTWidgets(...widgets) {
    return makeEnvironmentProviders([
        provideEnvironmentInitializer(() => {
            const srv = inject(STWidgetRegistry);
            widgets.forEach(widget => srv.register(widget.KEY, widget.type));
        })
    ]);
}

/**
 * Generated bundle index. Do not edit.
 */

export { STColumnSource, STComponent, STDataSource, STExport, STModule, STRowDirective, STWidgetHostDirective, STWidgetRegistry, ST_DEFAULT_CONFIG, provideSTWidgets };
//# sourceMappingURL=st.mjs.map

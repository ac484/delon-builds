import { CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDragSortEvent } from '@angular/cdk/drag-drop';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import * as i0 from '@angular/core';
import { TemplateRef, AfterViewInit, OnChanges, EventEmitter, TrackByFunction, SimpleChange, SimpleChanges, ElementRef, OnInit, EnvironmentProviders } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeType } from '@ant-design/icons-angular';
import { CellOptions } from '@delon/abc/cell';
import { ACLCanType } from '@delon/acl';
import * as _delon_theme from '@delon/theme';
import { ModalHelperOptions, DrawerHelperOptions, YNMode, _HttpClient, DatePipe, YNPipe } from '@delon/theme';
import { CurrencyFormatOptions, CurrencyService } from '@delon/util/format';
import { NgClassType, NzSafeAny, NgStyleInterface } from 'ng-zorro-antd/core/types';
import { DisabledTimeFn } from 'ng-zorro-antd/date-picker';
import { NzDrawerOptions } from 'ng-zorro-antd/drawer';
import { ModalOptions } from 'ng-zorro-antd/modal';
import { PaginationItemRenderContext } from 'ng-zorro-antd/pagination';
import { NzTableComponent, NzTableSortOrder, NzTablePaginationType } from 'ng-zorro-antd/table';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AlainSTConfig } from '@delon/util/config';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { DecimalPipe } from '@angular/common';
import { XlsxExportResult } from '@delon/abc/xlsx';

/**
 * @inner
 */
type _STTdNotifyType = 'checkbox' | 'radio';
/**
 * @inner
 */
interface _STTdNotify {
    type: _STTdNotifyType;
    item: STData;
    col: _STColumn;
}
/**
 * @inner
 */
interface _STColumn extends STColumn {
    children?: _STColumn[];
    indexKey?: string;
    /**
     * 是否需要截短行为
     * - `type: 'img'` 强制非必要
     */
    _isTruncate?: boolean;
    /**
     * 校验需要未自定义 `className` 时应检查 `_isTruncate` 是否需要截短行为
     */
    _className?: string | string[] | Set<string> | Record<string, any> | null;
    _sort: STSortMap;
    _width?: number;
    _left: string | boolean;
    _right: string | boolean;
    __renderTitle?: TemplateRef<any>;
    __render?: TemplateRef<any>;
}
/**
 * @inner
 */
interface _STHeader {
    /**
     * 是否有子列
     */
    hasSubColumns: boolean;
    colSpan: number;
    rowSpan: number;
    column: _STColumn;
}
/**
 * @inner
 */
interface _STColumnButton<T extends STData = any> extends STColumnButton<T> {
    _text?: string;
    _className?: NgClassType | null;
    /**
     * 图标
     */
    _icon?: STIcon | null;
    children?: Array<_STColumnButton<T>>;
}
/**
 * @inner
 */
interface _STDataValue {
    text: string;
    _text: SafeHtml;
    org?: any;
    color?: string;
    tooltip?: string;
    safeType: STColumnSafeType;
    buttons?: _STColumnButton[];
    props?: STOnCellResult | null;
    cell?: CellOptions;
}

declare class STComponent implements AfterViewInit, OnChanges {
    private readonly i18nSrv;
    private readonly el;
    private readonly cdr;
    private readonly doc;
    private readonly exportSrv;
    private readonly columnSource;
    private readonly dataSource;
    private readonly cms;
    private readonly destroy$;
    private readonly cogSrv;
    private totalTpl;
    private inied;
    cog: AlainSTConfig;
    private _req;
    private _res;
    private _page;
    private _widthMode;
    private customWidthConfig;
    _widthConfig: string[];
    locale: i0.Signal<_delon_theme.STLocaleData>;
    _loading: boolean;
    _data: STData[];
    _statistical: STStatisticalResults;
    _isPagination: boolean;
    _allChecked: boolean;
    _allCheckedDisabled: boolean;
    _indeterminate: boolean;
    _headers: _STHeader[][];
    _columns: _STColumn[];
    contextmenuList: STContextmenuItem[];
    readonly orgTable: NzTableComponent<STData>;
    readonly contextmenuTpl: NzDropdownMenuComponent;
    get req(): STReq;
    set req(value: STReq);
    /** 返回体配置 */
    get res(): STRes;
    set res(value: STRes);
    get page(): STPage;
    set page(value: STPage);
    data?: string | STData[] | Observable<STData[]>;
    delay?: boolean;
    columns?: STColumn[] | null;
    contextmenu?: STContextmenuFn | null;
    ps: number;
    pi: number;
    total: number;
    loading: boolean | null;
    loadingDelay: number;
    loadingIndicator: TemplateRef<void> | null;
    bordered: boolean;
    size: 'small' | 'middle' | 'default';
    scroll: {
        x?: string | null;
        y?: string | null;
    };
    drag: i0.InputSignalWithTransform<STDragOptions | null, unknown>;
    singleSort?: STSingleSort | null;
    private _multiSort?;
    get multiSort(): NzSafeAny;
    set multiSort(value: NzSafeAny);
    rowClassName?: STRowClassName | null;
    clickRowClassName?: STClickRowClassName | null;
    set widthMode(value: STWidthMode);
    get widthMode(): STWidthMode;
    set widthConfig(val: string[]);
    private _resizable?;
    set resizable(val: STResizable | boolean | string);
    header?: string | TemplateRef<void> | null;
    showHeader: boolean;
    footer?: string | TemplateRef<void> | null;
    bodyHeader?: TemplateRef<{
        $implicit: STStatisticalResults;
    }> | null;
    body?: TemplateRef<{
        $implicit: STStatisticalResults;
    }> | null;
    expandRowByClick: boolean;
    expandAccordion: boolean;
    expand: TemplateRef<{
        $implicit: STData;
        index: number;
    }> | null;
    expandIcon: TemplateRef<{
        $implicit: STData;
        index: number;
    }> | null;
    noResult?: string | TemplateRef<void> | null;
    responsive: boolean;
    responsiveHideHeaderFooter?: boolean;
    readonly error: EventEmitter<STError>;
    readonly change: EventEmitter<STChange<any>>;
    virtualScroll: boolean;
    virtualItemSize: number;
    virtualMaxBufferPx: number;
    virtualMinBufferPx: number;
    customRequest?: (options: STCustomRequestOptions) => Observable<NzSafeAny>;
    virtualForTrackBy: TrackByFunction<STData>;
    trackBy: TrackByFunction<STData>;
    /**
     * Get the number of the current page
     */
    get count(): number;
    /**
     * Get the data of the current page
     */
    get list(): STData[];
    get noColumns(): boolean;
    constructor();
    private setCog;
    cd(): this;
    private refreshData;
    renderTotal(total: string, range: string[]): string;
    private changeEmit;
    /**
     * 获取过滤后所有数据
     * - 本地数据：包含排序、过滤后不分页数据
     * - 远程数据：不传递 `pi`、`ps` 两个参数
     */
    get filteredData(): Observable<STData[]>;
    private updateTotalTpl;
    private setLoading;
    private loadData;
    private loadPageData;
    /** 清空所有数据 */
    clear(cleanStatus?: boolean): this;
    /** 清空所有状态 */
    clearStatus(): this;
    /**
     * 根据页码重新加载数据
     *
     * @param pi 指定当前页码，默认：`1`
     * @param extraParams 重新指定 `extraParams` 值
     * @param options 选项
     */
    load(pi?: number, extraParams?: NzSafeAny, options?: STLoadOptions): this;
    /**
     * 重新刷新当前页
     *
     * @param extraParams 重新指定 `extraParams` 值
     */
    reload(extraParams?: NzSafeAny, options?: STLoadOptions): this;
    /**
     * 重置且重新设置 `pi` 为 `1`，包含以下值：
     * - `check` 数据
     * - `radio` 数据
     * - `sort` 数据
     * - `fileter` 数据
     *
     * @param extraParams 重新指定 `extraParams` 值
     */
    reset(extraParams?: NzSafeAny, options?: STLoadOptions): this;
    private _toTop;
    _change(type: 'pi' | 'ps', options?: STLoadOptions): void;
    private closeOtherExpand;
    _rowClick(e: Event, item: STData, index: number, dbl: boolean): void;
    private _clickRowClassName;
    _expandChange(item: STData, expand: boolean): void;
    _stopPropagation(ev: Event): void;
    private _refColAndData;
    /**
     * Add a rows in the table, like this:
     *
     * ```
     * this.st.addRow(stDataItem)
     * ```
     *
     * **TIPS:** Don't change the `total` value, it is recommended to use the `reload` method if needed
     */
    addRow(data: STData | STData[], options?: {
        index?: number;
    }): this;
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
    removeRow(data: STData | STData[] | number): this;
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
    setRow(index: number | STData, item: STData, options?: {
        refreshSchema?: boolean;
        emitReload?: boolean;
        /**
         *
         * @param arrayProcessMethod 数组处理方式
         *  - `true` 表示替换新值，不管新值为哪种类型
         *  - `false` 表示会合并整个数组（将旧数据与新数据合并成新数组）
         */
        arrayProcessMethod?: boolean;
    }): this;
    sort(col: _STColumn, value: NzSafeAny): void;
    clearSort(): this;
    _handleFilter(col: _STColumn, confirm: boolean): void;
    handleFilterNotify(value?: unknown): void;
    clearFilter(): this;
    /** 清除所有 `checkbox` */
    clearCheck(): this;
    private _refCheck;
    checkAll(checked?: boolean): this;
    _rowSelection(row: STColumnSelection): this;
    _checkNotify(): this;
    /** 清除所有 `radio` */
    clearRadio(): this;
    _handleTd(ev: _STTdNotify): void;
    /**
     * 导出当前页，确保已经注册 `XlsxModule`
     *
     * @param newData 重新指定数据；若为 `true` 表示使用 `filteredData` 数据
     * @param opt 额外参数
     */
    export(newData?: STData[] | true, opt?: STExportOptions): void;
    colResize({ width }: NzResizeEvent, column: _STColumn): void;
    onContextmenu(event: MouseEvent): void;
    get cdkVirtualScrollViewport(): CdkVirtualScrollViewport | undefined;
    private _resetColumns;
    resetColumns(options?: STResetColumnsOption): Promise<this>;
    private refreshColumns;
    private optimizeData;
    /**
     * Return pure data, `st` internally maintains a set of data for caching, this part of data may affect the backend
     *
     * 返回纯净数据，`st` 内部会维护一组用于缓存的数据，这部分数据可能会影响后端
     */
    pureItem(itemOrIndex: STData | number): STData | null;
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [P in keyof this]?: SimpleChange;
    } & SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<STComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<STComponent, "st", ["st"], { "req": { "alias": "req"; "required": false; }; "res": { "alias": "res"; "required": false; }; "page": { "alias": "page"; "required": false; }; "data": { "alias": "data"; "required": false; }; "delay": { "alias": "delay"; "required": false; }; "columns": { "alias": "columns"; "required": false; }; "contextmenu": { "alias": "contextmenu"; "required": false; }; "ps": { "alias": "ps"; "required": false; }; "pi": { "alias": "pi"; "required": false; }; "total": { "alias": "total"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "loadingDelay": { "alias": "loadingDelay"; "required": false; }; "loadingIndicator": { "alias": "loadingIndicator"; "required": false; }; "bordered": { "alias": "bordered"; "required": false; }; "size": { "alias": "size"; "required": false; }; "scroll": { "alias": "scroll"; "required": false; }; "drag": { "alias": "drag"; "required": false; "isSignal": true; }; "singleSort": { "alias": "singleSort"; "required": false; }; "multiSort": { "alias": "multiSort"; "required": false; }; "rowClassName": { "alias": "rowClassName"; "required": false; }; "clickRowClassName": { "alias": "clickRowClassName"; "required": false; }; "widthMode": { "alias": "widthMode"; "required": false; }; "widthConfig": { "alias": "widthConfig"; "required": false; }; "resizable": { "alias": "resizable"; "required": false; }; "header": { "alias": "header"; "required": false; }; "showHeader": { "alias": "showHeader"; "required": false; }; "footer": { "alias": "footer"; "required": false; }; "bodyHeader": { "alias": "bodyHeader"; "required": false; }; "body": { "alias": "body"; "required": false; }; "expandRowByClick": { "alias": "expandRowByClick"; "required": false; }; "expandAccordion": { "alias": "expandAccordion"; "required": false; }; "expand": { "alias": "expand"; "required": false; }; "expandIcon": { "alias": "expandIcon"; "required": false; }; "noResult": { "alias": "noResult"; "required": false; }; "responsive": { "alias": "responsive"; "required": false; }; "responsiveHideHeaderFooter": { "alias": "responsiveHideHeaderFooter"; "required": false; }; "virtualScroll": { "alias": "virtualScroll"; "required": false; }; "virtualItemSize": { "alias": "virtualItemSize"; "required": false; }; "virtualMaxBufferPx": { "alias": "virtualMaxBufferPx"; "required": false; }; "virtualMinBufferPx": { "alias": "virtualMinBufferPx"; "required": false; }; "customRequest": { "alias": "customRequest"; "required": false; }; "virtualForTrackBy": { "alias": "virtualForTrackBy"; "required": false; }; "trackBy": { "alias": "trackBy"; "required": false; }; }, { "error": "error"; "change": "change"; }, never, never, true, never>;
    static ngAcceptInputType_ps: unknown;
    static ngAcceptInputType_pi: unknown;
    static ngAcceptInputType_total: unknown;
    static ngAcceptInputType_loadingDelay: unknown;
    static ngAcceptInputType_bordered: unknown;
    static ngAcceptInputType_showHeader: unknown;
    static ngAcceptInputType_expandRowByClick: unknown;
    static ngAcceptInputType_expandAccordion: unknown;
    static ngAcceptInputType_responsive: unknown;
    static ngAcceptInputType_responsiveHideHeaderFooter: unknown;
    static ngAcceptInputType_virtualScroll: unknown;
    static ngAcceptInputType_virtualItemSize: unknown;
    static ngAcceptInputType_virtualMaxBufferPx: unknown;
    static ngAcceptInputType_virtualMinBufferPx: unknown;
}

type STColumnSafeType = 'text' | 'html' | 'safeHtml';
interface STWidthMode {
    /**
     * 宽度类型
     * - `default` 默认行为
     * - `strict` 严格模式，即强制按 `width` 指定的宽度呈现，并根据 `strictBehavior` 类型处理
     */
    type?: 'strict' | 'default';
    /**
     * 严格模式的处理行为
     * - `wrap` 强制换行
     * - `truncate` 截短
     */
    strictBehavior?: 'wrap' | 'truncate';
}
interface STResetColumnsOption {
    pi?: number;
    ps?: number;
    columns?: STColumn[];
    /**
     * Whether to pre-clear data, Default: `false`
     */
    preClearData?: boolean;
    /**
     * Whether to trigger a data load, Default: `true`
     */
    emitReload?: boolean;
}
interface STReq {
    /**
     * 分页类型，默认：`page`
     * - `page` 使用 `pi`，`ps` 组合
     * - `skip` 使用 `skip`，`limit` 组合
     */
    type?: 'page' | 'skip';
    /**
     * 额外请求参数，默认自动附加 `pi`、`ps` 至URL
     * - `{ status: 'new' }` => `url?pi=1&ps=10&status=new`
     */
    params?: any;
    /**
     * Whether to ignore `null` or `unfind` values in parameters
     *
     * 是否忽略参数中 `null` 或 `undefind` 值
     */
    ignoreParamNull?: boolean;
    /** 请求方法，默认：`GET` */
    method?: string;
    /** 请求体 `body` */
    body?: any;
    /** 请求体 `Header` */
    headers?: any;
    /**
     * 重命名参数 `pi`、`ps`，默认：`{ pi: 'pi', ps: 'ps' }`
     * - `{ pi: 'Page' }` => `pi` 会被替换成 Page
     */
    reName?: STReqReNameType;
    /**
     * 是否将请求所有参数数据都放入 `body` 当中（`url` 地址本身参数除外），仅当 `method: 'POST'` 时有效，默认：`false`
     */
    allInBody?: boolean;
    /**
     * 是否延迟加载数据，即渲染结束后不会主动发起请求，在适当的时机调用 `resetColumns` 来渲染，默认：`false`
     */
    lazyLoad?: boolean;
    /**
     * 请求前数据处理
     */
    process?: (requestOptions: STRequestOptions) => STRequestOptions;
}
interface STRequestOptions {
    body?: any;
    headers?: HttpHeaders | Record<string, string | string[]>;
    params?: HttpParams | Record<string, string | string[]>;
    observe?: 'body' | 'events' | 'response';
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
}
interface STLoadOptions {
    /** 是否合并，默认：`false` */
    merge?: boolean;
    /** 是否跳转至顶部，若不指定由 `page.toTop` 来决定 */
    toTop?: boolean;
}
interface STRes<T extends STData = any> {
    /**
     * 重命名返回参数 `total`、`list`
     * - `{ total: 'Total' }` => Total 会被当作 `total`
     */
    reName?: STResReNameType | ((result: any, options: {
        pi: number;
        ps: number;
        total: number;
    }) => {
        total: number;
        list: T[];
    });
    /**
     * 数据预处理
     */
    process?: (data: T[], rawData?: any) => T[];
}
interface STPage {
    /**
     * 前端分页，当 `data` 为`any[]` 或 `Observable<any[]>` 有效，默认：`true`
     * - `true` 由 `st` 根据 `data` 长度受控分页，包括：排序、过滤等
     * - `false` 由用户通过 `total` 和 `data` 参数受控分页，并维护 `(change)` 当分页变更时重新加载数据
     */
    front?: boolean;
    /**
     * 后端分页是否采用`0`基索引，只在`data`类型为`string`时有效，默认：`false`
     */
    zeroIndexed?: boolean;
    /**
     * 指定分页显示的位置，默认：`bottom`
     */
    position?: 'top' | 'bottom' | 'both';
    /**
     * 指定分页显示的尺寸，默认：`default`
     */
    type?: NzTablePaginationType;
    /**
     * 指定分页分页方向，默认：`right`
     */
    placement?: 'left' | 'center' | 'right';
    /**
     * 是否显示分页器，默认：`true`
     */
    show?: boolean;
    /**
     * 是否显示分页器中改变页数，默认：`false`
     */
    showSize?: boolean;
    /**
     * 分页器中每页显示条目数下拉框值，默认：`[10, 20, 30, 40, 50]`
     */
    pageSizes?: number[];
    /**
     * 是否显示分页器中快速跳转，默认：`false`
     */
    showQuickJumper?: boolean;
    /**
     * 用于自定义页码的结构，用法参照 Pagination 组件
     */
    itemRender?: TemplateRef<PaginationItemRenderContext> | null;
    /**
     * 当添加该属性时，显示为简单分页，默认：`false`
     */
    simple?: boolean;
    /**
     * 是否显示总数据量
     * - `boolean` 类型显示与否，默认模板：`共 {{total}} 条`
     * - `string` 自定义模板，模板变量：
     *  - `{{total}}` 表示数据总量
     *  - `{{range[0]}}` 表示当前页开始数量值
     *  - `{{range[1]}}` 表示当前页结束数量值
     */
    total?: string | boolean;
    /**
     * 切换分页时返回顶部，默认：`true`
     */
    toTop?: boolean;
    /**
     * 返回顶部偏移值，默认：`100`
     */
    toTopOffset?: number;
}
/**
 * 数据源
 */
interface STData {
    /**
     * Select or radio button `checked` status value
     *
     * 选择框或单选框状态值
     */
    checked?: boolean;
    /**
     * Select or radio button `disabled` status value
     *
     * 选择框或单选框 `disabled` 值
     */
    disabled?: boolean;
    /**
     * Whether to expand the status value
     *
     * 是否展开状态
     */
    expand?: boolean;
    /**
     * Whether show expand icon
     *
     * 是否显示展开按钮
     */
    showExpand?: boolean;
    /**
     * Class name of the row
     *
     * 行样式
     */
    className?: string;
    [key: string]: any;
}
/**
 * 列描述
 */
interface STColumn<T extends STData = any> {
    /**
     * 用于定义数据源主键，例如：`statistical`
     */
    key?: string;
    /**
     * 列标题
     */
    title?: string | STColumnTitle;
    /**
     * 列数据在数据项中对应的 key，支持 `a.b.c` 的嵌套写法，例如：
     * - `id` (需要指定类型才能智能提示)
     * - `price.market`
     * - `[ 'price', 'market' ]`
     */
    index?: keyof T | (string & {
        _?: never;
    }) | string[] | null;
    /**
     * 类型
     * - `no` 行号，计算规则：`index + noIndex`
     * - `checkbox` 多选
     * - `radio` 单选
     * - `link` 链接，务必指定 `click`
     * - `badge` [徽标](https://ng.ant.design/components/badge/zh)，务必指定 `badge` 参数配置徽标对应值
     * - `tag` [标签](https://ng.ant.design/components/tag/zh)，务必指定 `tag` 参数配置标签对应值
     * - `enum` 枚举转换，务必指定 `enum` 参数配置标签对应值
     * - `img` 图片且居中(若 `className` 存在则优先)
     * - `number` 数字且居右(若 `className` 存在则优先)
     * - `currency` 货币且居右(若 `className` 存在则优先)
     * - `date` 日期格式且居中(若 `className` 存在则优先)，使用 `dateFormat` 自定义格式
     * - `yn` 将`boolean`类型徽章化 [document](https://ng-alain.com/docs/data-render#yn)
     * - `cell` 可指定 `click`，使用 `cell` 组件渲染 [document](https://ng-alain.com/components/cell)
     * - `widget` 使用自定义小部件动态创建
     */
    type?: '' | 'checkbox' | 'link' | 'badge' | 'tag' | 'enum' | 'radio' | 'img' | 'currency' | 'number' | 'date' | 'yn' | 'no' | 'cell' | 'widget';
    /**
     * `cell` component options
     *
     * `cell` 组件配置项
     */
    cell?: CellOptions | ((record: T, column: STColumn) => CellOptions);
    /**
     * 链接回调，若返回一个字符串表示导航URL会自动触发 `router.navigateByUrl`
     */
    click?: (record: T, instance?: STComponent) => any;
    /**
     * 按钮组
     */
    buttons?: Array<STColumnButton<T>>;
    /**
     * Max button option can be showed, and the extra part are auto generated under `more`
     *
     * 配置最多显示多少个按钮，多余部分自动生成至 `更多` 下面
     *
     * > 注意：若在 `buttons` 下配置过按钮组会导致其失效
     */
    maxMultipleButton?: STColumnMaxMultipleButton | number;
    /**
     * 自定义渲染ID
     *
     * @example
     * <ng-template st-row="custom" let-item let-index="index" let-column="column">
     *  {{ c.title }}
     * </ng-template>
     */
    render?: string | TemplateRef<void> | TemplateRef<{
        $implicit: T;
        index: number;
    }>;
    /**
     * 标题自定义渲染ID
     *
     * @example
     * <ng-template st-row="custom" type="title" let-c>
     *  {{ item | json }}
     * </ng-template>
     */
    renderTitle?: string | TemplateRef<void> | TemplateRef<{
        $implicit: STColumn;
        index: number;
    }>;
    /**
     * 列宽（数字型表示 `px` 值），例如：`100`、`10%`、`100px`
     *
     * **注意：** 若固定列必须是数字
     */
    width?: string | number;
    /**
     * 排序配置项，远程数据配置**优先**规则：
     * - `true` 表示允许排序，且若数据源为本地时自动生成 `compare: (a, b) => a[index] - b[index]` 方法
     * - `ascend` 表示升序
     * - `descend` 表示降序
     * - `string` 表示远程数据排序相对应 `key` 值
     */
    sort?: true | STColumnSort<T> | 'ascend' | 'descend' | string;
    /**
     * 过滤配置项
     */
    filter?: STColumnFilter<T>;
    /**
     * 格式化列值
     */
    format?: (item: T, col: STColumn, index: number) => string;
    /**
     * Safe rendering type, default: `safeHtml`, Support [global config](https://ng-alain.com/docs/global-config)
     *
     * 安全渲染方式，默认：`safeHtml`，支持[全局配置](https://ng-alain.com/docs/global-config/zh)
     */
    safeType?: STColumnSafeType;
    /**
     * 自定义全/反选选择项
     */
    selections?: Array<STColumnSelection<T>>;
    /**
     * 列 `class` 属性值（注：无须 `.` 点）多个用空格隔开，例如：
     * - `text-center` 居中
     * - `text-right` 居右
     * - `text-success` 成功色
     * - `text-error` 异常色
     */
    className?: NgClassType;
    /**
     * Table cell supports `colSpan` and `rowSpan`. When each of them is set to 0, the cell will not be rendered.
     *
     * 表格支持行/列合并，若返回的 `colSpan` 或者 `rowSpan` 设值为 0 时表示不会渲染
     */
    onCell?: (item: T, index: number) => STOnCellResult;
    /**
     * 数字格式，`type=number` 有效
     */
    numberDigits?: string;
    /**
     * 日期格式，`type=date` 有效，（默认：`yyyy-MM-dd HH:mm`）
     */
    dateFormat?: string;
    /**
     * Currency format option, `type=currency` is valid, pls refer of [CurrencyService.commas](https://ng-alain.com/util/format/#commas).
     *
     * 货币格式选项，`type=currency` 有效。
     */
    currency?: STcolumnCurrency;
    /**
     * 当 `type=yn` 有效
     */
    yn?: STColumnYn;
    /**
     * 是否允许导出，默认 `true`
     */
    exported?: boolean;
    /**
     * 权限，等同 [ACLCanType](https://ng-alain.com/acl/getting-started/#ACLCanType) 参数值
     */
    acl?: ACLCanType;
    /** 当不存在数据时以默认值替代 */
    default?: string;
    /**
     * 固定前后列，当指定时务必指定 `width` 否则视为无效，有若干 **注意：** 项：
     *
     * - 若列头与内容不对齐或出现列重复，请指定列的宽度 `width`
     * - 建议指定 `scroll.x` 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 `scroll.x`
     */
    fixed?: 'left' | 'right';
    /**
     * 徽标配置项
     */
    badge?: STColumnBadge | null;
    /**
     * 标签配置项
     */
    tag?: STColumnTag | null;
    /**
     * 行号索引，默认：`1`
     * - 计算规则为：`index + noIndex`
     * - 支持自定义方法
     */
    noIndex?: number | ((item: T, col: STColumn, idx: number) => number);
    /**
     * 条件表达式
     * - 仅赋值 `columns` 时执行一次
     * - 可调用 `resetColumns()` 再一次触发
     */
    iif?: (item: STColumn<T>) => boolean;
    /**
     * 统计列数据
     * - 若使用自定义统计函数可无须指定 `index`
     * - 可以根据 `key` 来定义生成后需要的键名，如果未指定 `key` 则使用 `index` 来表示键名
     * - 当无法找到有效键名时，使用下标（从 `0` 开始）来代替
     */
    statistical?: STStatisticalType | STStatistical<T>;
    widget?: STWidgetColumn<T>;
    enum?: {
        [key: string]: string;
        [key: number]: string;
    };
    /**
     * 分组表头
     */
    children?: Array<STColumn<T>>;
    colSpan?: number;
    rowSpan?: number;
    /**
     * 调整表头配置
     * - 注意：**不要忘记**在 `src/styles` 下增加 `nz-resizable` Less 样式文件：`@import 'ng-zorro-antd/resizable/style/entry.less';`
     * - **不支持多表头**
     */
    resizable?: STResizable | boolean;
}
interface STWidgetColumn<T extends STData = any> {
    type: string;
    params?: (options: {
        record: T;
        column: STColumn;
    }) => Record<string, unknown>;
}
interface STColumnTitle {
    [key: string]: any;
    /**
     * Text of header, can be choose one of `text` or `i18n`
     */
    text?: string;
    /**
     * I18n key of header, can be choose one of `text` or `i18n`
     */
    i18n?: string;
    /**
     * Optional information of header
     */
    optional?: string;
    /**
     * Optional help of header
     */
    optionalHelp?: string;
}
type STStatisticalType = 'count' | 'distinctCount' | 'sum' | 'average' | 'max' | 'min';
type STStatisticalFn<T extends STData = any> = (values: number[], col: STColumn, list: T[], rawData?: any) => STStatisticalResult;
interface STStatistical<T extends STData = any> {
    type: STStatisticalType | STStatisticalFn<T>;
    /**
     * 保留小数位数，默认：`2`
     */
    digits?: number;
    /**
     * 是否需要货币格式化，默认以下情况为 `true`
     * - `type` 为 `STStatisticalFn`、 `sum`、`average`、`max`、`min`
     */
    currency?: boolean;
}
interface STStatisticalResults {
    [key: string]: STStatisticalResult;
    [index: number]: STStatisticalResult;
}
interface STStatisticalResult {
    value: number;
    text?: string;
}
interface STColumnSort<T extends STData = any> {
    /**
     * 排序的默认受控属性
     */
    default?: 'ascend' | 'descend' | null;
    /**
     * 本地数据的排序函数，使用一个函数(参考 [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 的 compareFunction)
     * - `null` 忽略本地排序，但保持排序功能
     * - 若数据源为本地时自动生成 `(a, b) => a[index] - b[index]` 方法
     */
    compare?: ((a: T, b: T) => number) | null;
    /**
     * 远程数据的排序时后端相对应的KEY，默认使用 `index` 属性
     * - 若 `multiSort: false` 时：`key: 'name' => ?name=1&pi=1`
     * - 若 `multiSort: true` 允许多个排序 key 存在，或使用 `STMultiSort` 指定多列排序key合并规则
     */
    key?: string | null;
    /**
     * 远程数据的排序时后端相对应的VALUE
     * - `{ ascend: '0', descend: '1' }` 结果 `?name=1&pi=1`
     * - `{ ascend: 'asc', descend: 'desc' }` 结果 `?name=desc&pi=1`
     */
    reName?: {
        ascend?: string;
        descend?: string;
    };
    /**
     * 支持的排序方式
     *
     * Supported sort order
     */
    directions?: NzTableSortOrder[];
}
interface STSortMap<T extends STData = any> extends STColumnSort<T> {
    [key: string]: any;
    /** 是否启用排序 */
    enabled?: boolean;
}
interface STColumnFilter<T extends STData = any> {
    /**
     * 搜索方式
     * - `defualt` 默认形式
     * - `keyword` 文本框形式
     * - `number` 数字框形式
     * - `date` 日期形式
     * - `custom` 自定义模式，需设置 [custom] 参数
     */
    type?: 'default' | 'keyword' | 'number' | 'date' | 'custom';
    /**
     * 表头的筛选菜单项，至少一项才会生效
     * - 当 `type` 为 `keyword` `custom` 时可为空
     */
    menus?: STColumnFilterMenu[];
    /**
     * 本地数据的筛选函数
     */
    fn?: ((filter: STColumnFilterMenu, record: T) => boolean) | null;
    /**
     * 标识数据是否已过滤，筛选图标会高亮
     */
    default?: boolean;
    /**
     * 自定义 filter 图标
     * - 当 `type='default'` 默认 `filter`
     * - 当 `type='keyword'` 默认 `search`
     */
    icon?: string | STIcon;
    /**
     * 确认按钮文本，默认 `确认`
     */
    confirmText?: string;
    /**
     * 清除按钮文本，默认 `重置`
     */
    clearText?: string;
    /**
     * 是否多选，默认 `true`
     */
    multiple?: boolean;
    /**
     * 远程数据的过滤时后端相对应的KEY，默认使用 `index` 属性
     * `key: 'name'` 结果 `?name=1&pi=1`
     */
    key?: string | null;
    /**
     * 远程数据的过滤时后端相对应的VALUE
     * - 默认当 `multiple: true` 时以英文逗号拼接的字符串
     *
     * @return 返回为 Object 对象
     */
    reName?: (list: STColumnFilterMenu[], col: STColumn) => Record<string, unknown>;
    /**
     * 自定义过滤器，请参考 [Custom Data](https://ng-alain.com/components/st/en?#components-st-custom-data) 示例。
     */
    custom?: TemplateRef<{
        $implicit: STColumnFilter;
        col: STColumn;
        handle: STColumnFilterHandle;
    }>;
    /**
     * Whether to display the operation area, default: `true`
     *
     * 是否显示操作区域，默认：`true`
     */
    showOPArea?: boolean;
    /**
     * 在文字框中显示提示讯息
     */
    placeholder?: string;
    number?: {
        precision?: number;
        min?: number;
        max?: number;
        step?: number;
    };
    date?: {
        range?: boolean;
        mode?: 'year' | 'month' | 'week' | 'date';
        showToday?: boolean;
        showNow?: boolean;
        disabledDate?: (d: Date) => boolean;
        disabledTime?: DisabledTimeFn;
    };
}
interface STColumnFilterHandle {
    /**
     * Close pannel, if `result` is set, it will trigger confirm or reset action
     *
     * 关闭面板，当指定 `result` 时会触发确认或重置动作
     */
    close: (result?: boolean) => void;
    /**
     * Trigger confirm (You can call `close` to close the panel)
     *
     * 触发确认（可以调用 `close` 来关闭面板）
     */
    confirm: () => STColumnFilterHandle;
    /**
     * Trigger reset (You can call `close` to close the panel)
     *
     * 触发重置（可以调用 `close` 来关闭面板）
     */
    reset: () => STColumnFilterHandle;
}
interface STColumnFilterMenu {
    /**
     * 文本
     * - 当 `type: 'keyword'` 时表示 `placeholder`
     */
    text?: string;
    /**
     * 值
     */
    value?: any;
    /**
     * 是否选中
     */
    checked?: boolean;
    /**
     * 权限，等同 [ACLCanType](https://ng-alain.com/acl/getting-started/#ACLCanType) 参数值
     */
    acl?: ACLCanType;
    [key: string]: any;
}
interface STColumnSelection<T extends STData = any> {
    /**
     * 选择项显示的文字
     */
    text: string;
    /**
     * 选择项点击回调，允许对参数 `data.checked` 进行操作
     */
    select: (data: T[]) => void;
    /** 权限，等同 `can()` 参数值 */
    acl?: ACLCanType;
}
interface STcolumnCurrency {
    /**
     * See [CurrencyService.commas](https://ng-alain.com/util/format/en#format)
     */
    format?: CurrencyFormatOptions;
}
/** 当 `type=yn` 有效 */
interface STColumnYn {
    /**
     * 真值条件，（默认：`true`）
     */
    truth?: any;
    /**
     * 徽章 `true` 时文本，（默认：`是`）
     */
    yes?: string;
    /**
     * 徽章 `false` 时文本，（默认：`否`）
     */
    no?: string;
    /**
     * 徽章显示风格
     * - `full` 图标和文本
     * - `icon` 图标
     * - `text` 文本
     */
    mode?: YNMode;
}
interface STIcon {
    /** 图标类型 */
    type: string;
    /** 图标主题风格，默认：`outline` */
    theme?: ThemeType;
    /** 是否有旋转动画，默认：`false` */
    spin?: boolean;
    /** 仅适用双色图标，设置双色图标的主要颜色，仅对当前 icon 生效 */
    twoToneColor?: string;
    /** 指定来自 IconFont 的图标类型 */
    iconfont?: string;
}
/**
 * 按钮配置
 */
interface STColumnButton<T extends STData = any> {
    /**
     * 文本
     */
    text?: string | ((record: T, btn: STColumnButton<T>) => string);
    /**
     * 文本 i18n
     */
    i18n?: string;
    /**
     * 图标
     */
    icon?: string | STIcon | ((record: T, btn: STColumnButton<T>) => STIcon | null | undefined);
    /**
     * 按钮类型
     * - `none` 无任何互动
     * - `del` 删除，默认开启 `pop: true`
     * - `modal` 对话框，需要指定 `component` 才会生效
     * - `static` 静态对话框，需要指定 `component` 才会生效
     * - `drawer` 抽屉，需要指定 `component` 才会生效
     * - `link` 链接，当 `click` 返回字符串时自动调用 `navigateByUrl` 导航
     * - `divider` 分割线
     */
    type?: 'none' | 'del' | 'modal' | 'static' | 'drawer' | 'link' | 'divider';
    /**
     * 点击回调
     * - Function
     *  - `type=modal` 只会在当有传回值时才会触发回调
     * - reload：重新刷新当前页
     * - load：重新加载数据，并重置页码为：`1`
     *
     * @todo Bad parameter design
     */
    click?: 'reload' | 'load' | ((record: T, modal?: any, instance?: STComponent) => any);
    /**
     * 气泡确认框参数，若 `string` 类型表示标题
     */
    pop?: boolean | string | STColumnButtonPop;
    /**
     * 对话框参数
     */
    modal?: STColumnButtonModal;
    /**
     * 抽屉参数
     */
    drawer?: STColumnButtonDrawer;
    /**
     * 下拉菜单，当存在时以 `dropdown` 形式渲染
     * - 只支持一级
     */
    children?: Array<STColumnButton<T>>;
    /**
     * 权限，等同 [ACLCanType](https://ng-alain.com/acl/getting-started/#ACLCanType) 参数值
     */
    acl?: ACLCanType;
    /**
     * Conditional expression
     *
     * @todo Bad parameter design
     */
    iif?: (item: T, btn: STColumnButton<T>, column: STColumn) => boolean;
    /**
     * Conditional expression rendering behavior, can be set to `hide` (default) or `disabled`
     */
    iifBehavior?: IifBehaviorType;
    tooltip?: string;
    /**
     * 按钮 `class` 属性值（注：无须 `.` 点）多个用空格隔开，例如：
     * - `text-success` 成功色
     * - `text-error` 错误色
     */
    className?: NgClassType | ((record: T, btn: STColumnButton<T>) => NgClassType | null | undefined);
    [key: string]: any;
}
interface STColumnMaxMultipleButton {
    /**
     * 更多按钮文本，默认：`更多`
     */
    text?: string;
    /**
     * 超出数量自动合并，默认：`2`
     */
    count?: number;
}
type IifBehaviorType = 'hide' | 'disabled';
interface STColumnButtonModal<T extends STData = any> extends ModalHelperOptions {
    /**
     * 对话框组件对象
     */
    component?: any;
    /**
     * 对话框参数
     */
    params?: (record: T) => Record<string, unknown>;
    /**
     * 对话框目标组件的接收参数名，默认：`record`
     */
    paramsName?: string;
}
interface STColumnButtonModalConfig {
    /**
     * 指定模态框目标组件的接收参数名，默认：`record`
     */
    paramsName?: string;
    /** 大小；例如：lg、600，默认：`lg` */
    size?: 'sm' | 'md' | 'lg' | 'xl' | '' | number;
    /** 对话框 [ModalOptions](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/modal/modal-types.ts) 参数 */
    modalOptions?: ModalOptions;
    /** 是否精准（默认：`true`），若返回值非空值（`null`或`undefined`）视为成功，否则视为错误 */
    exact?: boolean;
}
interface STColumnButtonDrawer<T extends STData = any> extends DrawerHelperOptions {
    /**
     * 标题
     */
    title?: string;
    /**
     * 抽屉组件对象
     */
    component?: any;
    /**
     * 抽屉参数
     */
    params?: (record: T) => Record<string, unknown>;
    /**
     * 抽屉目标组件的接收参数名，默认：`record`
     */
    paramsName?: string;
}
interface STColumnButtonDrawerConfig {
    /**
     * 抽屉目标组件的接收参数名，默认：`record`
     */
    paramsName?: string;
    /**
     * 大小；例如：lg、600，默认：`md`
     *
     * | 类型 | 默认大小 |
     * | --- | ------ |
     * | `sm` | `300` |
     * | `md` | `600` |
     * | `lg` | `900` |
     * | `xl` | `1200` |
     *
     * > 以上值，可通过覆盖相应的LESS参数自行调整
     */
    size?: 'sm' | 'md' | 'lg' | 'xl' | number;
    /**
     * 是否包含底部工具条，默认：`true`
     */
    footer?: boolean;
    /**
     * 底部工具条高度，默认：`55`
     */
    footerHeight?: number;
    /** 抽屉 [NzDrawerOptions](https://ng.ant.design/components/drawer/zh#nzdraweroptions) 参数 */
    drawerOptions?: NzDrawerOptions;
}
interface STColumnButtonPop<T extends STData = any> {
    /**
     * Title of the popover, default: `确认删除吗？`
     */
    title?: string;
    titleI18n?: string;
    /**
     * Popover trigger mode, default: `click`
     */
    trigger?: 'click' | 'focus' | 'hover';
    /**
     * The position of the popover relative to the target, default: `top`
     */
    placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
    /**
     * Class name of the popover card
     */
    overlayClassName?: string;
    /**
     * Style of the popover card
     */
    overlayStyle?: NgStyleInterface;
    /**
     * Text of the Cancel button
     */
    cancelText?: string;
    cancelTextI18n?: string;
    /**
     * Text of the Confirm button
     */
    okText?: string;
    okTextI18n?: string;
    /**
     * Button `type` of the Confirm button
     */
    okType?: 'primary' | 'ghost' | 'dashed' | 'danger' | 'default';
    /**
     * Customize icon of confirmation
     */
    icon?: string;
    /**
     * Whether to directly emit `onConfirm` without showing Popconfirm, default: `() => false`
     */
    condition?: (item: T) => boolean;
}
interface STReqReNameType {
    pi?: string;
    ps?: string;
    skip?: string;
    limit?: string;
}
interface STResReNameType {
    total?: string | string[];
    list?: string | string[];
}
interface STExportOptions<T extends STData = any> {
    /**
     * Specify the currently exported data, default the current table data
     */
    data?: T[];
    /**
     * Specify the currently exported column configuration, default the current table data
     */
    columens?: STColumn[];
    /** 工作溥名 */
    sheetname?: string;
    /** 文件名 */
    filename?: string;
    /** triggers when saveas */
    callback?: (wb: any) => void;
}
/**
 * 单排序规则
 * - 若不指定，则返回：`columnName=ascend|descend`
 * - 若指定，则返回：`sort=columnName.(ascend|descend)`
 */
interface STSingleSort {
    /** 请求参数名，默认：`sort` */
    key?: string;
    /** 列名与状态间分隔符，默认：`.` */
    nameSeparator?: string;
}
/**
 * 多排序相同排序 key 时合并规则
 */
interface STMultiSort {
    /** 请求参数名，默认：`sort` */
    key?: string;
    /** 不同属性间分隔符，默认：`-` */
    separator?: string;
    /** 列名与状态间分隔符，默认：`.` */
    nameSeparator?: string;
    /**
     * 是否以数组的形式传递参数，默认：`false`
     * - `true` 表示使用 `url?sort=name.asc&sort=age.desc` 形式
     * - `false` 表示使用 `url?sort=name.asc-age.desc` 形式
     */
    arrayParam?: boolean;
    /**
     * 是否保持空值的键名，默认：`true`
     * - `true` 表示不管是否有排序都会发送 `key` 键名
     * - `false` 表示无排序动作时不会发送 `key` 键名
     */
    keepEmptyKey?: boolean;
    /**
     * ## 仅限全局配置项有效
     *
     * 是否全局多排序模式，默认：`true`
     * - `true` 表示所有 `st` 默认为多排序
     * - `false` 表示需要为每个 `st` 添加 `multiSort` 才会视为多排序模式
     */
    global?: boolean;
}
type STMultiSortResultType = Record<string, string | string[]>;
/**
 * 徽标信息
 */
interface STColumnBadge {
    [key: number]: STColumnBadgeValue;
    [key: string]: STColumnBadgeValue;
}
interface STColumnBadgeValue {
    /**
     * 文本
     */
    text?: string;
    /**
     * 徽标颜色值
     */
    color?: 'success' | 'processing' | 'default' | 'error' | 'warning';
    /**
     * Text popup tip
     *
     * 文字提示
     */
    tooltip?: string;
}
/**
 * 标签信息
 */
interface STColumnTag {
    [key: number]: STColumnTagValue;
    [key: string]: STColumnTagValue;
}
interface STColumnTagValue {
    /**
     * 文本
     */
    text?: string;
    /**
     * 颜色值，支持预设和色值
     * - 预设：geekblue,blue,purple,success,red,volcano,orange,gold,lime,green,cyan
     * - 色值：#f50,#ff0
     */
    color?: 'geekblue' | 'blue' | 'purple' | 'success' | 'red' | 'volcano' | 'orange' | 'gold' | 'lime' | 'green' | 'cyan' | string;
    /**
     * Text popup tip
     *
     * 文字提示
     */
    tooltip?: string;
}
type STChangeType = 'loaded' | 'pi' | 'ps' | 'checkbox' | 'radio' | 'sort' | 'filter' | 'filterChange' | 'click' | 'dblClick' | 'expand' | 'resize';
/**
 * 回调数据
 */
interface STChange<T extends STData = any> {
    /**
     * 回调类型
     */
    type: STChangeType;
    /**
     * 当前页码
     */
    pi: number;
    /**
     * 每页数量
     */
    ps: number;
    /**
     * 数据总量
     */
    total: number;
    /**
     * `loaded` 参数
     */
    loaded?: T[];
    /**
     * `checkbox` 参数
     */
    checkbox?: T[];
    /**
     * `radio` 参数
     */
    radio?: T;
    /**
     * 排序参数
     */
    sort?: STChangeSort;
    /**
     * 过滤参数
     */
    filter?: STColumn;
    /**
     * 行点击参数
     */
    click?: STChangeRowClick<T>;
    /**
     * 行双击参数
     */
    dblClick?: STChangeRowClick<T>;
    /**
     * `expand` 参数
     */
    expand?: T;
    /**
     * `resize` 参数
     */
    resize?: STColumn;
    /**
     * `filterChange` 参数，支持 `keyword`、`radio`、`checkbox` 三种类型的数据
     */
    filterChange?: unknown;
}
/** 行单击参数 */
interface STChangeSort {
    value?: 'ascend' | 'descend';
    map?: Record<string, string>;
    column?: STColumn;
}
/** 行单击参数 */
interface STChangeRowClick<T extends STData = any> {
    e?: Event;
    item?: T;
    index?: number;
}
interface STError {
    type?: 'req';
    error?: any;
}
type STRowClassName<T extends STData = any> = (record: T, index: number) => string;
type STClickRowClassName<T extends STData = any> = string | STClickRowClassNameType<T>;
interface STClickRowClassNameType<T extends STData = any> {
    fn: (record: T, index: number) => string;
    /**
     * Whether mutually exclusive, default: `false`
     *
     * 是否互斥，默认：`false`
     */
    exclusive?: boolean;
}
interface STColumnGroupType {
    column: STColumn;
    colStart: number;
    colEnd?: number;
    colSpan?: number;
    rowSpan?: number;
    hasSubColumns?: boolean;
}
interface STResizable {
    /**
     * Disable resize, Default: `true`
     */
    disabled?: boolean;
    /**
     * Specifies resize boundaries, Default: `window`
     */
    bounds?: 'window' | 'parent' | ElementRef<HTMLElement>;
    /**
     * Maximum width of resizable elemen, Default: `60`
     */
    maxWidth?: number;
    /**
     * Minimum width of resizable element, Default: `360`
     */
    minWidth?: number;
    /**
     * Enable preview when resizing, Default: `true`
     */
    preview?: boolean;
}
type STContextmenuFn<T extends STData = any> = (options: STContextmenuOptions<T>) => Observable<STContextmenuItem[]> | STContextmenuItem[];
interface STContextmenuOptions<T extends STData = any> {
    event: MouseEvent;
    /**
     * Contextmenu position
     */
    type: 'head' | 'body';
    column: STColumn;
    data: T | null;
    /**
     * Row index, when `type === 'body'` valid
     *
     * 所在行下标，当 `type === 'body'` 时有效
     */
    rowIndex: number | null;
    /**
     * Column index
     *
     * 所在列下标
     */
    colIndex: number;
}
interface STContextmenuItem {
    key?: string;
    /**
     * Text of the context menu item
     */
    text: string;
    fn?: (item: STContextmenuItem) => void;
    /**
     * Only supports one level
     *
     * 只支持一级
     */
    children?: STContextmenuItem[];
    [key: string]: any;
}
interface STCustomRequestOptions {
    method: string;
    url: string;
    options: STRequestOptions;
}
interface STOnCellResult {
    rowSpan?: number | null;
    colSpan?: number | null;
}
interface STDragOptions {
    /**
     * Emits when the user drops an item inside the container, default: `moveItemInArray()`
     */
    dropped?: (e: CdkDragDrop<any, any, any>) => void;
    /**
     * Emits when the user has moved a new drag item into this container.
     */
    entered?: (e: CdkDragEnter<any>) => void;
    /**
     * Emits when the user removes an item from the container by dragging it into another container.
     */
    exited?: (e: CdkDragExit<any>) => void;
    /**
     * Emits as the user is swapping items while actively dragging.
     */
    sorted?: (e: CdkDragSortEvent<any>) => void;
}

interface STColumnSourceProcessOptions {
    widthMode: STWidthMode;
    resizable?: STResizable;
    safeType: STColumnSafeType;
    expand: boolean;
}
declare class STColumnSource {
    private readonly dom;
    private readonly rowSource;
    private readonly acl;
    private readonly i18nSrv;
    private readonly stWidgetRegistry;
    private cog;
    setCog(val: AlainSTConfig): void;
    private fixPop;
    private btnCoerce;
    private btnCoerceIf;
    private fixedCoerce;
    private sortCoerce;
    private fixSortCoerce;
    private filterCoerce;
    private restoreRender;
    private widgetCoerce;
    private genHeaders;
    private cleanCond;
    private mergeClass;
    process(list: STColumn[], options: STColumnSourceProcessOptions): {
        columns: _STColumn[];
        headers: _STHeader[][];
        headerWidths: string[] | null;
    };
    restoreAllRender(columns: _STColumn[]): void;
    updateDefault(filter: STColumnFilter): this;
    cleanFilter(col: _STColumn): this;
    static ɵfac: i0.ɵɵFactoryDeclaration<STColumnSource, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<STColumnSource>;
}

interface STDataSourceOptions {
    pi: number;
    ps: number;
    paginator: boolean;
    data?: string | STData[] | Observable<STData[]>;
    total: number;
    req: STReq;
    res: STRes;
    page: STPage;
    columns: _STColumn[];
    headers: _STHeader[][];
    singleSort?: STSingleSort | null;
    multiSort?: STMultiSort;
    rowClassName?: STRowClassName | null;
    customRequest?: (options: STCustomRequestOptions) => Observable<NzSafeAny>;
}
interface STDataSourceResult {
    /** 是否需要显示分页器 */
    pageShow: boolean;
    /** 新 `pi`，若返回 `undefined` 表示用户受控 */
    pi: number;
    /** 新 `ps`，若返回 `undefined` 表示用户受控 */
    ps: number;
    /** 新 `total`，若返回 `undefined` 表示用户受控 */
    total: number;
    /** 数据 */
    list: STData[];
    /** 统计数据 */
    statistical: STStatisticalResults;
}
declare class STDataSource {
    private http;
    private datePipe;
    private ynPipe;
    private numberPipe;
    private currencySrv;
    private dom;
    private cog;
    private sortTick;
    constructor(http: _HttpClient, datePipe: DatePipe, ynPipe: YNPipe, numberPipe: DecimalPipe, currencySrv: CurrencyService, dom: DomSanitizer);
    setCog(val: AlainSTConfig): void;
    process(options: STDataSourceOptions): Observable<STDataSourceResult>;
    private get;
    private getByRemote;
    getCell(c: STColumn, item: STData, idx: number): STOnCellResult;
    optimizeData(options: {
        columns: _STColumn[];
        result: STData[];
        rowClassName?: STRowClassName | null;
    }): STData[];
    getNoIndex(item: STData, col: _STColumn, idx: number): number;
    private genButtons;
    private fixMaxMultiple;
    private getValidSort;
    private getSorterFn;
    get nextSortTick(): number;
    getReqSortMap(singleSort: STSingleSort | undefined | null, multiSort: STMultiSort | undefined, headers: _STHeader[][]): STMultiSortResultType;
    private getFilteredData;
    private getReqFilterMap;
    private genStatistical;
    private getStatistical;
    private toFixed;
    private getValues;
    private getSum;
    static ɵfac: i0.ɵɵFactoryDeclaration<STDataSource, [null, { host: true; }, { host: true; }, { host: true; }, null, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<STDataSource>;
}

declare class STExport {
    private readonly xlsxSrv;
    private _stGet;
    private genSheet;
    export(opt: STExportOptions): Promise<XlsxExportResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<STExport, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<STExport>;
}

declare class STWidgetRegistry {
    private _widgets;
    get widgets(): NzSafeAny;
    register(type: string, widget: NzSafeAny): void;
    has(type: string): boolean;
    get(type: string): NzSafeAny;
    static ɵfac: i0.ɵɵFactoryDeclaration<STWidgetRegistry, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<STWidgetRegistry>;
}

declare class STWidgetHostDirective implements OnInit {
    private readonly stWidgetRegistry;
    private readonly viewContainerRef;
    record: STData;
    column: STColumn;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<STWidgetHostDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<STWidgetHostDirective, "[st-widget-host]", never, { "record": { "alias": "record"; "required": false; }; "column": { "alias": "column"; "required": false; }; }, {}, never, never, true, never>;
}

declare class STRowDirective implements OnInit {
    private readonly source;
    private readonly ref;
    id: string;
    type?: 'title';
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<STRowDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<STRowDirective, "[st-row]", never, { "id": { "alias": "st-row"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, {}, never, never, true, never>;
}

declare const ST_DEFAULT_CONFIG: AlainSTConfig;

declare class STModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<STModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<STModule, never, [typeof STComponent, typeof STRowDirective, typeof STWidgetHostDirective], [typeof STComponent, typeof STRowDirective, typeof STWidgetHostDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<STModule>;
}

interface STWidgetProvideConfig {
    KEY: string;
    type: NzSafeAny;
}
/**
 * Just only using Standalone widgets
 */
declare function provideSTWidgets(...widgets: STWidgetProvideConfig[]): EnvironmentProviders;

export { STColumnSource, STComponent, STDataSource, STExport, STModule, STRowDirective, STWidgetHostDirective, STWidgetRegistry, ST_DEFAULT_CONFIG, provideSTWidgets };
export type { IifBehaviorType, STChange, STChangeRowClick, STChangeSort, STChangeType, STClickRowClassName, STClickRowClassNameType, STColumn, STColumnBadge, STColumnBadgeValue, STColumnButton, STColumnButtonDrawer, STColumnButtonDrawerConfig, STColumnButtonModal, STColumnButtonModalConfig, STColumnButtonPop, STColumnFilter, STColumnFilterHandle, STColumnFilterMenu, STColumnGroupType, STColumnMaxMultipleButton, STColumnSafeType, STColumnSelection, STColumnSort, STColumnSourceProcessOptions, STColumnTag, STColumnTagValue, STColumnTitle, STColumnYn, STContextmenuFn, STContextmenuItem, STContextmenuOptions, STCustomRequestOptions, STData, STDataSourceOptions, STDataSourceResult, STDragOptions, STError, STExportOptions, STIcon, STLoadOptions, STMultiSort, STMultiSortResultType, STOnCellResult, STPage, STReq, STReqReNameType, STRequestOptions, STRes, STResReNameType, STResetColumnsOption, STResizable, STRowClassName, STSingleSort, STSortMap, STStatistical, STStatisticalFn, STStatisticalResult, STStatisticalResults, STStatisticalType, STWidgetColumn, STWidgetProvideConfig, STWidthMode, STcolumnCurrency, _STColumn, _STColumnButton, _STDataValue, _STHeader, _STTdNotify, _STTdNotifyType };

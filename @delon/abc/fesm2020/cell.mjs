import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Injectable, Directive, Input, Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, NgModule } from '@angular/core';
import { updateHostClass } from '@delon/util/browser';
import { InputBoolean } from '@delon/util/decorator';
import { WINDOW } from '@delon/util/token';
import { of, map } from 'rxjs';
import { yn } from '@delon/theme';
import { formatDate } from '@delon/util/date-time';
import * as i3 from '@delon/util/format';
import { formatMask } from '@delon/util/format';
import { deepMerge, warn } from '@delon/util/other';
import * as i1 from '@delon/util/config';
import * as i2 from 'ng-zorro-antd/i18n';
import * as i4 from '@angular/platform-browser';
import * as i2$1 from '@angular/router';
import * as i3$1 from 'ng-zorro-antd/image';
import * as i4$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from 'ng-zorro-antd/badge';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import * as i6 from 'ng-zorro-antd/tag';
import { NzTagModule } from 'ng-zorro-antd/tag';
import * as i7 from 'ng-zorro-antd/tooltip';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import * as i8 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/experimental/image';

class CellService {
    constructor(configSrv, nzI18n, currency, dom) {
        this.nzI18n = nzI18n;
        this.currency = currency;
        this.dom = dom;
        this.widgets = {
            date: {
                type: 'fn',
                ref: (value, opt) => {
                    return { text: formatDate(value, opt.date.format, this.nzI18n.getDateLocale()) };
                }
            },
            mega: {
                type: 'fn',
                ref: (value, opt) => {
                    const res = this.currency.mega(value, opt.mega);
                    return { text: res.value, unit: res.unitI18n };
                }
            },
            currency: {
                type: 'fn',
                ref: (value, opt) => {
                    return { text: this.currency.format(value, opt.currency) };
                }
            },
            cny: {
                type: 'fn',
                ref: (value, opt) => {
                    return { text: this.currency.cny(value, opt.cny) };
                }
            },
            boolean: {
                type: 'fn',
                ref: (value, opt) => {
                    return { text: this.dom.bypassSecurityTrustHtml(yn(value, opt.boolean)) };
                }
            },
            img: {
                type: 'fn',
                ref: value => {
                    return { text: Array.isArray(value) ? value : [value] };
                }
            }
        };
        this.globalOptions = configSrv.merge('cell', {
            date: { format: 'yyyy-MM-dd HH:mm:ss' },
            img: { size: 32, big: true }
        });
    }
    registerWidget(key, widget) {
        this.widgets[key] = { type: 'widget', ref: widget };
    }
    getWidget(key) {
        return this.widgets[key];
    }
    genType(value, options) {
        if (options.type != null)
            return options.type;
        const typeOf = typeof value;
        // When is timestamp
        if (typeOf === 'number' && /^[0-9]{13}$/g.test(value))
            return 'date';
        if (value instanceof Date || options.date != null)
            return 'date';
        // Auto detection
        if (options.widget != null)
            return 'widget';
        else if (options.mega != null)
            return 'mega';
        else if (options.currency != null)
            return 'currency';
        else if (options.cny != null)
            return 'cny';
        else if (options.img != null)
            return 'img';
        else if (options.link != null)
            return 'link';
        else if (options.html != null)
            return 'html';
        else if (options.badge != null)
            return 'badge';
        else if (options.tag != null)
            return 'tag';
        else if (typeOf === 'number')
            return 'number';
        else if (typeOf === 'boolean' || options.boolean != null)
            return 'boolean';
        else
            return 'string';
    }
    fixOptions(options) {
        return deepMerge({}, this.globalOptions, options);
    }
    get(value, options) {
        const type = this.genType(value, { ...options });
        const opt = this.fixOptions(options);
        let res = {
            type: 'string',
            result: typeof value === 'object' ? value : { text: value == null ? '' : `${value}` },
            options: opt
        };
        const widget = this.widgets[type];
        if (widget?.type === 'fn') {
            res.result = widget.ref(value, opt);
        }
        return (typeof value === 'function' ? value(value, opt) : of(res.result)).pipe(map(text => {
            res.result = text;
            res.type = type;
            switch (type) {
                case 'badge':
                    res.result = { color: 'default', ...(opt.badge?.data ?? {})[value] };
                    break;
                case 'tag':
                    res.result = (opt.tag?.data ?? {})[value];
                    break;
                case 'html':
                    res.safeHtml = opt.html?.safe;
                    break;
            }
            if (opt.mask != null) {
                res.result.text = formatMask(res.result.text, opt.mask);
            }
            return res;
        }));
    }
}
CellService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: CellService, deps: [{ token: i1.AlainConfigService }, { token: i2.NzI18nService }, { token: i3.CurrencyService }, { token: i4.DomSanitizer }], target: i0.ɵɵFactoryTarget.Injectable });
CellService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: CellService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: CellService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.AlainConfigService }, { type: i2.NzI18nService }, { type: i3.CurrencyService }, { type: i4.DomSanitizer }]; } });

class CellHostDirective {
    constructor(srv, viewContainerRef) {
        this.srv = srv;
        this.viewContainerRef = viewContainerRef;
    }
    ngOnInit() {
        const widget = this.data.options.widget;
        const componentType = this.srv.getWidget(widget.key)?.ref;
        if (componentType == null) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                warn(`cell: No widget for type "${widget.key}"`);
            }
            return;
        }
        this.viewContainerRef.clear();
        const componentRef = this.viewContainerRef.createComponent(componentType);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        componentRef.instance.data = this.data;
    }
}
CellHostDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: CellHostDirective, deps: [{ token: CellService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
CellHostDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.2", type: CellHostDirective, selector: "[cell-widget-host]", inputs: { data: "data" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: CellHostDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[cell-widget-host]' }]
        }], ctorParameters: function () { return [{ type: CellService }, { type: i0.ViewContainerRef }]; }, propDecorators: { data: [{
                type: Input
            }] } });

class CellComponent {
    constructor(srv, router, cdr, el, renderer, imgSrv, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    win) {
        this.srv = srv;
        this.router = router;
        this.cdr = cdr;
        this.el = el;
        this.renderer = renderer;
        this.imgSrv = imgSrv;
        this.win = win;
        this.showDefault = false;
        this.default = '-';
        this.defaultCondition = null;
        this.truncate = false;
        this.loading = false;
    }
    /**
     * 货币快捷项
     *
     * @example
     * <cell [currency]="1000"></cell>
     * 等同于
     * <cell [value]="1000" [options]="{type: 'currency'}"></cell>
     */
    set currency(value) {
        this.value = value;
        this.options = { type: 'currency' };
        this.updateValue();
    }
    /**
     * 日期快捷项
     *
     * @example
     * <cell [date]="1000"></cell>
     * 等同于
     * <cell [value]="1000" [options]="{type: 'date'}"></cell>
     */
    set date(value) {
        this.value = value;
        this.options = { type: 'date' };
        this.updateValue();
    }
    get safeOpt() {
        return this.res?.options;
    }
    get isText() {
        return this.res?.safeHtml === 'text';
    }
    get hostData() {
        return {
            value: this.value,
            default: this.default,
            defaultCondition: this.defaultCondition,
            options: this.srv.fixOptions(this.options),
            truncate: this.truncate
        };
    }
    updateValue() {
        this.destroy$?.unsubscribe();
        this.destroy$ = this.srv.get(this.value, this.options).subscribe(res => {
            this.res = res;
            this.showDefault = this.value == this.defaultCondition;
            this._text = res.result?.text ?? '';
            this._unit = res.result?.unit ?? this.unit;
            this.cdr.detectChanges();
            this.setClass();
        });
    }
    setClass() {
        const { el, renderer } = this;
        updateHostClass(el.nativeElement, renderer, {
            [`cell`]: true,
            [`cell__${this.type}`]: this.type != null,
            [`cell__${this.size}`]: this.size != null,
            [`cell__has-unit`]: this._unit,
            [`cell__has-default`]: this.showDefault
        });
        el.nativeElement.dataset.type = this.safeOpt.type;
    }
    ngOnChanges() {
        this.updateValue();
    }
    _link(e) {
        e.preventDefault();
        e.stopPropagation();
        const link = this.safeOpt.link;
        const url = link?.url;
        if (url == null)
            return;
        if (url.startsWith('/')) {
            this.router.navigateByUrl(url);
        }
        else {
            this.win.open(url, link?.target);
        }
    }
    _showImg(img) {
        const config = this.safeOpt.img;
        if (config == null || config.big === false)
            return;
        let idx = -1;
        const list = this._text.map((p, index) => {
            if (idx === -1 && p === img)
                idx = index;
            return typeof config.big === 'function' ? config.big(p) : p;
        });
        this.imgSrv
            .preview(list.map(p => ({ src: p })), config.previewOptions)
            .switchTo(idx);
    }
    ngOnDestroy() {
        this.destroy$?.unsubscribe();
    }
}
CellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: CellComponent, deps: [{ token: CellService }, { token: i2$1.Router }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i3$1.NzImageService }, { token: WINDOW }], target: i0.ɵɵFactoryTarget.Component });
CellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.2", type: CellComponent, selector: "cell, [cell]", inputs: { value: "value", default: "default", defaultCondition: "defaultCondition", options: "options", unit: "unit", truncate: "truncate", loading: "loading", type: "type", size: "size", currency: "currency", date: "date" }, exportAs: ["cell"], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #text>
      <ng-container [ngSwitch]="res?.type">
        <a
          *ngSwitchCase="'link'"
          (click)="_link($event)"
          [attr.target]="safeOpt.link?.target"
          [innerHTML]="_text"
          [attr.title]="truncate ? value : null"
        ></a>
        <nz-tag *ngSwitchCase="'tag'" [nzColor]="res?.result?.color">
          <span [innerHTML]="_text"></span>
        </nz-tag>
        <nz-badge *ngSwitchCase="'badge'" [nzStatus]="res?.result?.color" nzText="{{ _text }}"></nz-badge>
        <ng-template *ngSwitchCase="'widget'" cell-widget-host [data]="hostData"></ng-template>
        <ng-container *ngSwitchCase="'img'">
          <img
            *ngFor="let i of $any(_text)"
            [attr.src]="i"
            [attr.height]="safeOpt.img?.size"
            [attr.width]="safeOpt.img?.size"
            (click)="_showImg(i)"
            class="img"
            [class.point]="safeOpt.img?.big"
          />
        </ng-container>
        <ng-container *ngSwitchDefault>
          <span *ngIf="!isText" [innerHTML]="_text" [attr.title]="truncate ? value : null"></span>
          <span *ngIf="isText" [innerText]="_text" [attr.title]="truncate ? value : null"></span>
          <span *ngIf="_unit" class="unit">{{ _unit }}</span>
        </ng-container>
      </ng-container>
    </ng-template>
    <ng-template #textWrap>
      <ng-container *ngIf="showDefault">{{ default }}</ng-container>
      <ng-container *ngIf="!showDefault">
        <span *ngIf="safeOpt?.tooltip; else text" nz-tooltip [nzTooltipTitle]="safeOpt.tooltip">
          <ng-template [ngTemplateOutlet]="text"></ng-template>
        </span>
      </ng-container>
    </ng-template>
    <span *ngIf="loading; else textWrap" nz-icon nzType="loading"></span>
  `, isInline: true, dependencies: [{ kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4$1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i4$1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: i5.NzBadgeComponent, selector: "nz-badge", inputs: ["nzShowZero", "nzShowDot", "nzStandalone", "nzDot", "nzOverflowCount", "nzColor", "nzStyle", "nzText", "nzTitle", "nzStatus", "nzCount", "nzOffset", "nzSize"], exportAs: ["nzBadge"] }, { kind: "component", type: i6.NzTagComponent, selector: "nz-tag", inputs: ["nzMode", "nzColor", "nzChecked"], outputs: ["nzOnClose", "nzCheckedChange"], exportAs: ["nzTag"] }, { kind: "directive", type: i7.NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { kind: "directive", type: i8.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "directive", type: CellHostDirective, selector: "[cell-widget-host]", inputs: ["data"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], CellComponent.prototype, "truncate", void 0);
__decorate([
    InputBoolean()
], CellComponent.prototype, "loading", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: CellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cell, [cell]',
                    template: `
    <ng-template #text>
      <ng-container [ngSwitch]="res?.type">
        <a
          *ngSwitchCase="'link'"
          (click)="_link($event)"
          [attr.target]="safeOpt.link?.target"
          [innerHTML]="_text"
          [attr.title]="truncate ? value : null"
        ></a>
        <nz-tag *ngSwitchCase="'tag'" [nzColor]="res?.result?.color">
          <span [innerHTML]="_text"></span>
        </nz-tag>
        <nz-badge *ngSwitchCase="'badge'" [nzStatus]="res?.result?.color" nzText="{{ _text }}"></nz-badge>
        <ng-template *ngSwitchCase="'widget'" cell-widget-host [data]="hostData"></ng-template>
        <ng-container *ngSwitchCase="'img'">
          <img
            *ngFor="let i of $any(_text)"
            [attr.src]="i"
            [attr.height]="safeOpt.img?.size"
            [attr.width]="safeOpt.img?.size"
            (click)="_showImg(i)"
            class="img"
            [class.point]="safeOpt.img?.big"
          />
        </ng-container>
        <ng-container *ngSwitchDefault>
          <span *ngIf="!isText" [innerHTML]="_text" [attr.title]="truncate ? value : null"></span>
          <span *ngIf="isText" [innerText]="_text" [attr.title]="truncate ? value : null"></span>
          <span *ngIf="_unit" class="unit">{{ _unit }}</span>
        </ng-container>
      </ng-container>
    </ng-template>
    <ng-template #textWrap>
      <ng-container *ngIf="showDefault">{{ default }}</ng-container>
      <ng-container *ngIf="!showDefault">
        <span *ngIf="safeOpt?.tooltip; else text" nz-tooltip [nzTooltipTitle]="safeOpt.tooltip">
          <ng-template [ngTemplateOutlet]="text"></ng-template>
        </span>
      </ng-container>
    </ng-template>
    <span *ngIf="loading; else textWrap" nz-icon nzType="loading"></span>
  `,
                    exportAs: 'cell',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: CellService }, { type: i2$1.Router }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i3$1.NzImageService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [WINDOW]
                }] }]; }, propDecorators: { value: [{
                type: Input
            }], default: [{
                type: Input
            }], defaultCondition: [{
                type: Input
            }], options: [{
                type: Input
            }], unit: [{
                type: Input
            }], truncate: [{
                type: Input
            }], loading: [{
                type: Input
            }], type: [{
                type: Input
            }], size: [{
                type: Input
            }], currency: [{
                type: Input
            }], date: [{
                type: Input
            }] } });

const COMPS = [CellComponent];
class CellModule {
}
CellModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: CellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CellModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.2", ngImport: i0, type: CellModule, declarations: [CellComponent, CellHostDirective], imports: [CommonModule, NzBadgeModule, NzTagModule, NzToolTipModule, NzIconModule, NzImageModule], exports: [CellComponent] });
CellModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: CellModule, imports: [CommonModule, NzBadgeModule, NzTagModule, NzToolTipModule, NzIconModule, NzImageModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: CellModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NzBadgeModule, NzTagModule, NzToolTipModule, NzIconModule, NzImageModule],
                    declarations: [...COMPS, CellHostDirective],
                    exports: COMPS
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { CellComponent, CellHostDirective, CellModule, CellService };
//# sourceMappingURL=cell.mjs.map

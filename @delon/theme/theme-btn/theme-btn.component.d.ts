/**
 * TIPS: When it does not take effect, you need to run it once: npm run theme
 */
import { Platform } from '@angular/cdk/platform';
import { OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AlainConfigService } from '@delon/util';
declare type SiteTheme = 'default' | 'dark' | 'compact';
export declare class ThemeBtnComponent implements OnInit, OnDestroy {
    private renderer;
    private configSrv;
    private platform;
    theme: SiteTheme;
    private el;
    constructor(renderer: Renderer2, configSrv: AlainConfigService, platform: Platform);
    ngOnInit(): void;
    private initTheme;
    private updateChartTheme;
    onThemeChange(theme: SiteTheme): void;
    ngOnDestroy(): void;
}
export {};

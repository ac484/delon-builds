import { NgModule } from '@angular/core';
import { STModule } from '@delon/abc/table';
export { ɵa, STComponent, STRowDirective, STConfig, STModule, STColumnSource, STDataSource, STExport } from '@delon/abc/table';
import { SVModule } from '@delon/abc/view';
export { SVContainerComponent, SVTitleComponent, SVComponent, SVConfig, SVModule } from '@delon/abc/view';
import { SEModule } from '@delon/abc/edit';
export { SEContainerComponent, SEErrorComponent, SETitleComponent, SEComponent, SEConfig, SEModule } from '@delon/abc/edit';
import { ErrorCollectModule } from '@delon/abc/error-collect';
export { ErrorCollectComponent, ErrorCollectConfig, ErrorCollectModule } from '@delon/abc/error-collect';
import { FooterToolbarModule } from '@delon/abc/footer-toolbar';
export { FooterToolbarComponent, FooterToolbarModule } from '@delon/abc/footer-toolbar';
import { SidebarNavModule } from '@delon/abc/sidebar-nav';
export { SidebarNavComponent, SidebarNavModule } from '@delon/abc/sidebar-nav';
import { DownFileModule } from '@delon/abc/down-file';
export { DownFileDirective, DownFileModule } from '@delon/abc/down-file';
import { ImageModule } from '@delon/abc/image';
export { ImageDirective, ImageConfig, ImageModule } from '@delon/abc/image';
import { AvatarListModule } from '@delon/abc/avatar-list';
export { AvatarListItemComponent, AvatarListComponent, AvatarListModule } from '@delon/abc/avatar-list';
import { EllipsisModule } from '@delon/abc/ellipsis';
export { EllipsisComponent, EllipsisModule } from '@delon/abc/ellipsis';
import { GlobalFooterModule } from '@delon/abc/global-footer';
export { GlobalFooterComponent, GlobalFooterItemComponent, GlobalFooterModule } from '@delon/abc/global-footer';
import { ExceptionModule } from '@delon/abc/exception';
export { ExceptionComponent, ExceptionModule } from '@delon/abc/exception';
import { NoticeIconModule } from '@delon/abc/notice-icon';
export { NoticeIconTabComponent, NoticeIconComponent, NoticeIconModule } from '@delon/abc/notice-icon';
import { PageHeaderModule } from '@delon/abc/page-header';
export { PageHeaderConfig, PageHeaderComponent, PageHeaderModule } from '@delon/abc/page-header';
import { ResultModule } from '@delon/abc/result';
export { ResultComponent, ResultModule } from '@delon/abc/result';
import { TagSelectModule } from '@delon/abc/tag-select';
export { TagSelectComponent, TagSelectModule } from '@delon/abc/tag-select';
import { CountDownModule } from '@delon/abc/count-down';
export { CountDownComponent, CountDownModule } from '@delon/abc/count-down';
import { ReuseTabModule } from '@delon/abc/reuse-tab';
export { ReuseTabContextMenuComponent, ReuseTabContextComponent, ReuseTabContextDirective, ReuseTabContextService, ReuseTabComponent, ReuseTabService, ReuseTabStrategy, ReuseTabModule, ReuseTabMatchMode } from '@delon/abc/reuse-tab';
import { FullContentModule } from '@delon/abc/full-content';
export { FullContentComponent, FullContentService, FullContentToggleDirective, FullContentModule } from '@delon/abc/full-content';
import { XlsxModule } from '@delon/abc/xlsx';
export { XlsxConfig, XlsxService, XlsxDirective, XlsxModule } from '@delon/abc/xlsx';
import { ZipModule } from '@delon/abc/zip';
export { ZipService, ZipModule, ZipConfig } from '@delon/abc/zip';
import { NumberToChineseModule } from '@delon/abc/number-to-chinese';
export { numberToChinese, NaNumberToChinesePipe, NumberToChineseModule } from '@delon/abc/number-to-chinese';
import { LodopModule } from '@delon/abc/lodop';
export { LodopService, LodopConfig, LodopModule } from '@delon/abc/lodop';
import { QuickMenuModule } from '@delon/abc/quick-menu';
export { QuickMenuComponent, QuickMenuModule } from '@delon/abc/quick-menu';
import { QRModule } from '@delon/abc/qr';
export { QRService, QRComponent, QRConfig, QRModule } from '@delon/abc/qr';
import { DatePickerModule } from '@delon/abc/date-picker';
export { RangePickerComponent, DatePickerModule, DateRangePickerConfig, DatePickerConfig } from '@delon/abc/date-picker';
import { SGModule } from '@delon/abc/grid';
export { SGContainerComponent, SGComponent, SGConfig, SGModule } from '@delon/abc/grid';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const MODULES = [
    ErrorCollectModule,
    FooterToolbarModule,
    SidebarNavModule,
    DownFileModule,
    ImageModule,
    AvatarListModule,
    EllipsisModule,
    GlobalFooterModule,
    ExceptionModule,
    NoticeIconModule,
    PageHeaderModule,
    ResultModule,
    TagSelectModule,
    CountDownModule,
    STModule,
    ReuseTabModule,
    FullContentModule,
    XlsxModule,
    ZipModule,
    NumberToChineseModule,
    LodopModule,
    QuickMenuModule,
    QRModule,
    SVModule,
    SEModule,
    SGModule,
    DatePickerModule,
];
class DelonABCRootModule {
}
DelonABCRootModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    ErrorCollectModule.forRoot(),
                    FooterToolbarModule.forRoot(),
                    SidebarNavModule.forRoot(),
                    DownFileModule.forRoot(),
                    ImageModule.forRoot(),
                    AvatarListModule.forRoot(),
                    EllipsisModule.forRoot(),
                    ExceptionModule.forRoot(),
                    ExceptionModule.forRoot(),
                    NoticeIconModule.forRoot(),
                    PageHeaderModule.forRoot(),
                    ResultModule.forRoot(),
                    TagSelectModule.forRoot(),
                    CountDownModule.forRoot(),
                    STModule.forRoot(),
                    ReuseTabModule.forRoot(),
                    FullContentModule.forRoot(),
                    XlsxModule.forRoot(),
                    ZipModule.forRoot(),
                    NumberToChineseModule.forRoot(),
                    LodopModule.forRoot(),
                    QuickMenuModule.forRoot(),
                    QRModule.forRoot(),
                    SVModule.forRoot(),
                    SEModule.forRoot(),
                    SGModule.forRoot(),
                    DatePickerModule.forRoot(),
                ],
                exports: MODULES,
            },] }
];
class DelonABCModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return { ngModule: DelonABCRootModule };
    }
}
DelonABCModule.decorators = [
    { type: NgModule, args: [{ exports: MODULES },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { DelonABCRootModule, DelonABCModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJjLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AZGVsb24vYWJjL2FiYy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy8gI3JlZ2lvbiBhbGwgbW9kdWxlc1xuaW1wb3J0IHsgU1RNb2R1bGUgfSBmcm9tICdAZGVsb24vYWJjL3RhYmxlJztcbmltcG9ydCB7IFNWTW9kdWxlIH0gZnJvbSAnQGRlbG9uL2FiYy92aWV3JztcbmltcG9ydCB7IFNFTW9kdWxlIH0gZnJvbSAnQGRlbG9uL2FiYy9lZGl0JztcbmltcG9ydCB7IEVycm9yQ29sbGVjdE1vZHVsZSB9IGZyb20gJ0BkZWxvbi9hYmMvZXJyb3ItY29sbGVjdCc7XG5pbXBvcnQgeyBGb290ZXJUb29sYmFyTW9kdWxlIH0gZnJvbSAnQGRlbG9uL2FiYy9mb290ZXItdG9vbGJhcic7XG5pbXBvcnQgeyBTaWRlYmFyTmF2TW9kdWxlIH0gZnJvbSAnQGRlbG9uL2FiYy9zaWRlYmFyLW5hdic7XG5pbXBvcnQgeyBEb3duRmlsZU1vZHVsZSB9IGZyb20gJ0BkZWxvbi9hYmMvZG93bi1maWxlJztcbmltcG9ydCB7IEltYWdlTW9kdWxlIH0gZnJvbSAnQGRlbG9uL2FiYy9pbWFnZSc7XG5pbXBvcnQgeyBBdmF0YXJMaXN0TW9kdWxlIH0gZnJvbSAnQGRlbG9uL2FiYy9hdmF0YXItbGlzdCc7XG5pbXBvcnQgeyBFbGxpcHNpc01vZHVsZSB9IGZyb20gJ0BkZWxvbi9hYmMvZWxsaXBzaXMnO1xuaW1wb3J0IHsgR2xvYmFsRm9vdGVyTW9kdWxlIH0gZnJvbSAnQGRlbG9uL2FiYy9nbG9iYWwtZm9vdGVyJztcbmltcG9ydCB7IEV4Y2VwdGlvbk1vZHVsZSB9IGZyb20gJ0BkZWxvbi9hYmMvZXhjZXB0aW9uJztcbmltcG9ydCB7IE5vdGljZUljb25Nb2R1bGUgfSBmcm9tICdAZGVsb24vYWJjL25vdGljZS1pY29uJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJNb2R1bGUgfSBmcm9tICdAZGVsb24vYWJjL3BhZ2UtaGVhZGVyJztcbmltcG9ydCB7IFJlc3VsdE1vZHVsZSB9IGZyb20gJ0BkZWxvbi9hYmMvcmVzdWx0JztcbmltcG9ydCB7IFRhZ1NlbGVjdE1vZHVsZSB9IGZyb20gJ0BkZWxvbi9hYmMvdGFnLXNlbGVjdCc7XG5pbXBvcnQgeyBDb3VudERvd25Nb2R1bGUgfSBmcm9tICdAZGVsb24vYWJjL2NvdW50LWRvd24nO1xuaW1wb3J0IHsgUmV1c2VUYWJNb2R1bGUgfSBmcm9tICdAZGVsb24vYWJjL3JldXNlLXRhYic7XG5pbXBvcnQgeyBGdWxsQ29udGVudE1vZHVsZSB9IGZyb20gJ0BkZWxvbi9hYmMvZnVsbC1jb250ZW50JztcbmltcG9ydCB7IFhsc3hNb2R1bGUgfSBmcm9tICdAZGVsb24vYWJjL3hsc3gnO1xuaW1wb3J0IHsgWmlwTW9kdWxlIH0gZnJvbSAnQGRlbG9uL2FiYy96aXAnO1xuaW1wb3J0IHsgTnVtYmVyVG9DaGluZXNlTW9kdWxlIH0gZnJvbSAnQGRlbG9uL2FiYy9udW1iZXItdG8tY2hpbmVzZSc7XG5pbXBvcnQgeyBMb2RvcE1vZHVsZSB9IGZyb20gJ0BkZWxvbi9hYmMvbG9kb3AnO1xuaW1wb3J0IHsgUXVpY2tNZW51TW9kdWxlIH0gZnJvbSAnQGRlbG9uL2FiYy9xdWljay1tZW51JztcbmltcG9ydCB7IFFSTW9kdWxlIH0gZnJvbSAnQGRlbG9uL2FiYy9xcic7XG5pbXBvcnQgeyBEYXRlUGlja2VyTW9kdWxlIH0gZnJvbSAnQGRlbG9uL2FiYy9kYXRlLXBpY2tlcic7XG5pbXBvcnQgeyBTR01vZHVsZSB9IGZyb20gJ0BkZWxvbi9hYmMvZ3JpZCc7XG5cbmNvbnN0IE1PRFVMRVMgPSBbXG4gIEVycm9yQ29sbGVjdE1vZHVsZSxcbiAgRm9vdGVyVG9vbGJhck1vZHVsZSxcbiAgU2lkZWJhck5hdk1vZHVsZSxcbiAgRG93bkZpbGVNb2R1bGUsXG4gIEltYWdlTW9kdWxlLFxuICBBdmF0YXJMaXN0TW9kdWxlLFxuICBFbGxpcHNpc01vZHVsZSxcbiAgR2xvYmFsRm9vdGVyTW9kdWxlLFxuICBFeGNlcHRpb25Nb2R1bGUsXG4gIE5vdGljZUljb25Nb2R1bGUsXG4gIFBhZ2VIZWFkZXJNb2R1bGUsXG4gIFJlc3VsdE1vZHVsZSxcbiAgVGFnU2VsZWN0TW9kdWxlLFxuICBDb3VudERvd25Nb2R1bGUsXG4gIFNUTW9kdWxlLFxuICBSZXVzZVRhYk1vZHVsZSxcbiAgRnVsbENvbnRlbnRNb2R1bGUsXG4gIFhsc3hNb2R1bGUsXG4gIFppcE1vZHVsZSxcbiAgTnVtYmVyVG9DaGluZXNlTW9kdWxlLFxuICBMb2RvcE1vZHVsZSxcbiAgUXVpY2tNZW51TW9kdWxlLFxuICBRUk1vZHVsZSxcbiAgU1ZNb2R1bGUsXG4gIFNFTW9kdWxlLFxuICBTR01vZHVsZSxcbiAgRGF0ZVBpY2tlck1vZHVsZSxcbl07XG5cbi8vICNlbmRyZWdpb25cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEVycm9yQ29sbGVjdE1vZHVsZS5mb3JSb290KCksXG4gICAgRm9vdGVyVG9vbGJhck1vZHVsZS5mb3JSb290KCksXG4gICAgU2lkZWJhck5hdk1vZHVsZS5mb3JSb290KCksXG4gICAgRG93bkZpbGVNb2R1bGUuZm9yUm9vdCgpLFxuICAgIEltYWdlTW9kdWxlLmZvclJvb3QoKSxcbiAgICBBdmF0YXJMaXN0TW9kdWxlLmZvclJvb3QoKSxcbiAgICBFbGxpcHNpc01vZHVsZS5mb3JSb290KCksXG4gICAgRXhjZXB0aW9uTW9kdWxlLmZvclJvb3QoKSxcbiAgICBFeGNlcHRpb25Nb2R1bGUuZm9yUm9vdCgpLFxuICAgIE5vdGljZUljb25Nb2R1bGUuZm9yUm9vdCgpLFxuICAgIFBhZ2VIZWFkZXJNb2R1bGUuZm9yUm9vdCgpLFxuICAgIFJlc3VsdE1vZHVsZS5mb3JSb290KCksXG4gICAgVGFnU2VsZWN0TW9kdWxlLmZvclJvb3QoKSxcbiAgICBDb3VudERvd25Nb2R1bGUuZm9yUm9vdCgpLFxuICAgIFNUTW9kdWxlLmZvclJvb3QoKSxcbiAgICBSZXVzZVRhYk1vZHVsZS5mb3JSb290KCksXG4gICAgRnVsbENvbnRlbnRNb2R1bGUuZm9yUm9vdCgpLFxuICAgIFhsc3hNb2R1bGUuZm9yUm9vdCgpLFxuICAgIFppcE1vZHVsZS5mb3JSb290KCksXG4gICAgTnVtYmVyVG9DaGluZXNlTW9kdWxlLmZvclJvb3QoKSxcbiAgICBMb2RvcE1vZHVsZS5mb3JSb290KCksXG4gICAgUXVpY2tNZW51TW9kdWxlLmZvclJvb3QoKSxcbiAgICBRUk1vZHVsZS5mb3JSb290KCksXG4gICAgU1ZNb2R1bGUuZm9yUm9vdCgpLFxuICAgIFNFTW9kdWxlLmZvclJvb3QoKSxcbiAgICBTR01vZHVsZS5mb3JSb290KCksXG4gICAgRGF0ZVBpY2tlck1vZHVsZS5mb3JSb290KCksXG4gIF0sXG4gIGV4cG9ydHM6IE1PRFVMRVMsXG59KVxuZXhwb3J0IGNsYXNzIERlbG9uQUJDUm9vdE1vZHVsZSB7fVxuXG5ATmdNb2R1bGUoeyBleHBvcnRzOiBNT0RVTEVTIH0pXG5leHBvcnQgY2xhc3MgRGVsb25BQkNNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4geyBuZ01vZHVsZTogRGVsb25BQkNSb290TW9kdWxlIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQStCQSxNQUFNLE9BQU8sR0FBRztJQUNkLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLGVBQWU7SUFDZixlQUFlO0lBQ2YsUUFBUTtJQUNSLGNBQWM7SUFDZCxpQkFBaUI7SUFDakIsVUFBVTtJQUNWLFNBQVM7SUFDVCxxQkFBcUI7SUFDckIsV0FBVztJQUNYLGVBQWU7SUFDZixRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7SUFDUixRQUFRO0lBQ1IsZ0JBQWdCO0NBQ2pCLENBQUM7QUFvQ0Y7OztZQWhDQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtvQkFDNUIsbUJBQW1CLENBQUMsT0FBTyxFQUFFO29CQUM3QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7b0JBQzFCLGNBQWMsQ0FBQyxPQUFPLEVBQUU7b0JBQ3hCLFdBQVcsQ0FBQyxPQUFPLEVBQUU7b0JBQ3JCLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtvQkFDMUIsY0FBYyxDQUFDLE9BQU8sRUFBRTtvQkFDeEIsZUFBZSxDQUFDLE9BQU8sRUFBRTtvQkFDekIsZUFBZSxDQUFDLE9BQU8sRUFBRTtvQkFDekIsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO29CQUMxQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7b0JBQzFCLFlBQVksQ0FBQyxPQUFPLEVBQUU7b0JBQ3RCLGVBQWUsQ0FBQyxPQUFPLEVBQUU7b0JBQ3pCLGVBQWUsQ0FBQyxPQUFPLEVBQUU7b0JBQ3pCLFFBQVEsQ0FBQyxPQUFPLEVBQUU7b0JBQ2xCLGNBQWMsQ0FBQyxPQUFPLEVBQUU7b0JBQ3hCLGlCQUFpQixDQUFDLE9BQU8sRUFBRTtvQkFDM0IsVUFBVSxDQUFDLE9BQU8sRUFBRTtvQkFDcEIsU0FBUyxDQUFDLE9BQU8sRUFBRTtvQkFDbkIscUJBQXFCLENBQUMsT0FBTyxFQUFFO29CQUMvQixXQUFXLENBQUMsT0FBTyxFQUFFO29CQUNyQixlQUFlLENBQUMsT0FBTyxFQUFFO29CQUN6QixRQUFRLENBQUMsT0FBTyxFQUFFO29CQUNsQixRQUFRLENBQUMsT0FBTyxFQUFFO29CQUNsQixRQUFRLENBQUMsT0FBTyxFQUFFO29CQUNsQixRQUFRLENBQUMsT0FBTyxFQUFFO29CQUNsQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7aUJBQzNCO2dCQUNELE9BQU8sRUFBRSxPQUFPO2FBQ2pCOztBQUlEOzs7O0lBQ0UsT0FBTyxPQUFPO1FBQ1osT0FBTyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxDQUFDO0tBQ3pDOzs7WUFKRixRQUFRLFNBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7In0=
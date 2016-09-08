import { EventEmitter } from '@angular/core';
import { MdSidenav } from '@angular2-material/sidenav';
import { TdLayoutService } from '../services/layout.service';
export declare class TdLayoutManageListComponent {
    private layoutService;
    _sideNav: MdSidenav;
    /**
     * method thats called when menu is clicked
     */
    onOpenMenu: EventEmitter<void>;
    constructor(layoutService: TdLayoutService);
    menuClick(): void;
    /**
     * Proxy toggle method to access sidenav from outside (from td-layout template).
     */
    toggle(): void;
    /**
     * Proxy open method to access sidenav from outside (from td-layout template).
     */
    open(): void;
    /**
     * Proxy close method to access sidenav from outside (from td-layout template).
     */
    close(): void;
    /**
     * emits menuEvent
     */
    private _onMenuClick();
}

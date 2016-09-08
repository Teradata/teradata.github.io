import { OnDestroy, AfterViewInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MdSidenav } from '@angular2-material/sidenav';
import { TdLayoutService } from './services/layout.service';
export declare class TdLayoutComponent implements OnDestroy, AfterViewInit {
    private layoutService;
    private _showUserMenu;
    private _subcriptions;
    _sideNav: MdSidenav;
    /**
     * title in sideNav menu
     */
    title: string;
    /**
     * icon for title in sideNav menu
     */
    icon: string;
    /**
     * logo file for title in sideNav menu
     */
    logo: string;
    /**
     * displayName in menu for users
     */
    displayName: string;
    /**
     * method thats called when logout is clicked
     */
    onLogoutEvent: EventEmitter<void>;
    constructor(layoutService: TdLayoutService);
    /**
     * removes subscriptions when destroyed
     */
    ngOnDestroy(): void;
    /**
     * subscribes as observable to the onClose() event from the sideNav to hide userMenu when closed.
     */
    ngAfterViewInit(): void;
    logoutClick(): void;
    /**
     * toggle userMenu to hide/show
     */
    toggleUserMenu(): void;
    isShowUserMenu(): boolean;
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
     * emits logoutEvent
     */
    private _onLogout();
}

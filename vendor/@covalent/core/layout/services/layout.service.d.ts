import { Observable } from 'rxjs/Observable';
export declare class TdLayoutService {
    private _openSidenavSources;
    private _openSidenavObservables;
    registerSidenav(name: string): Observable<any>;
    openSideNav(name: string): void;
}

import { Observable } from 'rxjs/Observable';
export declare class TdMediaService {
    private _queryMap;
    private _querySources;
    private _queryObservables;
    constructor();
    /**
     * Used to evaluate whether a given media query is true or false given the current device's screen / window size.
     */
    query(query: string): boolean;
    /**
     * Registers a media query and returns an [Observable] that will re-evaluate and
     * return if the given media query matches on window resize.
     * Note: don't forget to unsubscribe from [Observable] when finished watching.
     */
    registerQuery(query: string): Observable<any>;
    private _onResize();
}

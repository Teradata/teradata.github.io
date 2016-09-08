import { Headers, RequestOptionsArgs, Response, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
export interface IRestTransform {
    (response: Response): any;
}
export interface IRestConfig {
    baseHeaders?: Headers;
    baseUrl: string;
    path?: string;
    transform?: IRestTransform;
}
export interface IRestQuery {
    [key: string]: boolean | number | string;
}
export interface IHttp {
    delete: (url: string, options?: RequestOptionsArgs) => Observable<Response>;
    get: (url: string, options?: RequestOptionsArgs) => Observable<Response>;
    head: (url: string, options?: RequestOptionsArgs) => Observable<Response>;
    patch: (url: string, body: any, options?: RequestOptionsArgs) => Observable<Response>;
    post: (url: string, body: any, options?: RequestOptionsArgs) => Observable<Response>;
    put: (url: string, body: any, options?: RequestOptionsArgs) => Observable<Response>;
    request: (url: string | Request, options?: RequestOptionsArgs) => Observable<Response>;
}
export declare abstract class RESTService<T> {
    private _path;
    private _base;
    private _baseHeaders;
    protected transform: IRestTransform;
    protected http: IHttp;
    constructor(http: IHttp, config: IRestConfig);
    query(query?: IRestQuery): Observable<Array<T>>;
    get(id: string | number): Observable<T>;
    create(obj: T): Observable<T>;
    update(id: string | number, obj: T): Observable<T>;
    delete(id: string | number): Observable<any>;
    protected buildRequestOptions(): RequestOptionsArgs;
    protected buildUrl(id?: string | number, query?: IRestQuery): string;
    protected buildQuery(query: IRestQuery): string;
}

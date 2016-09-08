import { Type, Injector } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
export interface IHttpInterceptor {
    onRequest?: (requestOptions: RequestOptionsArgs) => RequestOptionsArgs;
    onResponse?: (response: Response) => Response;
    onResponseError?: (error: Response) => Response;
}
export declare class HttpInterceptorService {
    private _http;
    private _injector;
    requestInterceptors: IHttpInterceptor[];
    constructor(_http: Http, _injector: Injector, requestInterceptors: Type[]);
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>;
    delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
    get(url: string, options?: RequestOptionsArgs): Observable<Response>;
    head(url: string, options?: RequestOptionsArgs): Observable<Response>;
    patch(url: string, data: any, options?: RequestOptionsArgs): Observable<Response>;
    post(url: string, data: any, options?: RequestOptionsArgs): Observable<Response>;
    put(url: string, data: any, options?: RequestOptionsArgs): Observable<Response>;
    private _requestConfig(requestOptions);
    private _responseResolve(response);
    private _errorResolve(error);
}
export declare function provideInterceptors(requestInterceptors?: Type[]): any[];

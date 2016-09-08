import { ComponentFactoryResolver, NgZone } from '@angular/core';
import { Injector, ViewContainerRef, TemplateRef } from '@angular/core';
import { LoadingType } from '../loading.component';
export interface ILoadingOptions {
    name: string;
    type?: LoadingType;
}
export declare class TdLoadingService {
    private _componentFactoryResolver;
    private _injector;
    private _ngZone;
    private _context;
    private _loadingSources;
    private _loadingObservables;
    constructor(_componentFactoryResolver: ComponentFactoryResolver, _injector: Injector, _ngZone: NgZone);
    /**
     * params:
     * - options: ILoadingOptions {
     *     name: string;
     *     type?: LoadingType;
     * }
     * - viewContainerRef: ViewContainerRef
     *
     * Creates an fullscreen loading mask and attaches it to the viewContainerRef.
     * Only displayed when the mask has a request registered on it.
     */
    createOverlayComponent(options: ILoadingOptions, viewContainerRef: ViewContainerRef): void;
    /**
     * params:
     * - options: ILoadingOptions {
     *     name: string;
     *     type?: LoadingType;
     * }
     * - viewContainerRef: ViewContainerRef
     * - templateRef: TemplateRef<Object>
     *
     * Creates an replace loading mask and attaches it to the viewContainerRef.
     * Replaces the templateRef with the mask when a request is registered on it.
     */
    createReplaceComponent(options: ILoadingOptions, viewContainerRef: ViewContainerRef, templateRef: TemplateRef<Object>): void;
    /**
     * params:
     * - name: string
     *
     * Removes loading mask from service context.
     */
    removeComponent(name: string): void;
    /**
     * params:
     * - name: string
     * - registers?: number
     * returns: true if successful
     *
     * Resolves a request for the loading mask referenced by the name parameter.
     * Can optionally pass registers argument to set a number of register calls.
     */
    register(name: string, registers?: number): boolean;
    /**
     * params:
     * - name: string
     * - resolves?: number
     * returns: true if successful
     *
     * Registers a request for the loading mask referenced by the name parameter.
     * Can optionally pass resolves argument to set a number of resolve calls.
     */
    resolve(name: string, resolves?: number): boolean;
    /**
     * Creates a generic [TdLoadingComponent] and its context.
     * Returns a promise that resolves to a [ILoadingRef] with the created [ComponentRef] and its referenced [Observable].
     */
    private _createComponent(options);
    /**
     * Maps the [IInternalLoadingOptions] object to the [TdLoadingComponent] instance.
     */
    private _mapOptions(options, instance);
    /**
     * Creates an observable for the parameter name reference, and returns it.
     */
    private _registerLoadingComponent(name);
}

import { OnInit, OnDestroy } from '@angular/core';
import { ViewContainerRef, TemplateRef } from '@angular/core';
import { LoadingType } from '../loading.component';
import { TdLoadingService } from '../services/loading.service';
export declare class TdLoadingDirective implements OnInit, OnDestroy {
    private _viewContainer;
    private _templateRef;
    private _loadingService;
    private _type;
    private _name;
    /**
     * tdLoading?: string
     * Name reference of the loading mask, used to register/resolve requests to the mask.
     */
    name: string;
    /**
     * loadingType?: LoadingType or ['linear' | 'circular']
     * Sets the type of loading mask depending on value.
     * Defaults to [LoadingType.Circular | 'circular'].
     */
    type: LoadingType;
    constructor(_viewContainer: ViewContainerRef, _templateRef: TemplateRef<Object>, _loadingService: TdLoadingService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Creates [TdLoadingComponent] and attaches it to this directive's [ViewContainerRef].
     * Passes this directive's [TemplateRef] to detach/attach it from DOM when loading mask is on.
     */
    private _registerComponent();
}

import { Observable } from 'rxjs/Observable';
export declare enum LoadingType {
    Circular,
    Linear,
}
export declare class TdLoadingComponent {
    private _animationIn;
    private _animationOut;
    private _animation;
    private _overlay;
    /**
     * Flag for animation
     */
    animation: boolean;
    /**
     * overlay: boolean
     * Sets if [TdLoadingComponent] is fullscreen or not.
     */
    overlay: boolean;
    /**
     * height: number
     * Sets height of [TdLoadingComponent].
     */
    height: number;
    /**
     * type: LoadingType
     * Sets type of [TdLoadingComponent] rendered.
     */
    type: LoadingType;
    getHeight(): string;
    getCircleDiameter(): string;
    isCircular(): boolean;
    isLinear(): boolean;
    inAnimationCompleted(): void;
    outAnimationCompleted(): void;
    /**
     * Starts in animation and returns an observable for completition event.
     */
    startInAnimation(): Observable<any>;
    /**
     * Starts out animation and returns an observable for completition event.
     */
    startOutAnimation(): Observable<any>;
}

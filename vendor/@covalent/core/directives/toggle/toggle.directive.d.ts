import { ElementRef, Renderer } from '@angular/core';
export declare class TdToggleDirective {
    private _renderer;
    private _element;
    private _state;
    private _hiddenState;
    private _defaultDisplay;
    private _timeoutNumber;
    /**
     * duration?: number
     * Sets duration of toggle animation in miliseconds.
     * Defaults to 250 ms.
     */
    duration: number;
    /**
     * tdToggle: boolean
     * Toggles element, hides if its 'true', shows if its 'false'.
     */
    state: boolean;
    /**
     * Binds native 'aria-expanded' attribute.
     */
    ariaExpandedBinding: boolean;
    /**
     * Binds native 'aria-hidden' attribute.
     */
    ariaHiddenBinding: boolean;
    /**
     * Binds 'hidden' attribute.
     */
    hiddenBinding: boolean;
    constructor(_renderer: Renderer, _element: ElementRef);
    /**
     * Hides element: sets "display:[default]" so animation is shown,
     * starts animation and adds "display:'none'" style at the end.
     */
    hide(): void;
    /**
     * Shows element: sets "display:[default]" so animation is shown,
     * starts animation and adds "display:[default]" style again at the end.
     */
    show(): void;
}

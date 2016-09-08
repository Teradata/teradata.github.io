import { EventEmitter } from '@angular/core';
export declare enum StepState {
    None,
    Required,
    Complete,
}
export declare class TdStepComponent {
    private _number;
    private _active;
    private _state;
    private _disabled;
    /**
     * Number assigned by [TdStepsComponent] parent element.
     */
    number: number;
    /**
     * label?: string
     * Sets label of [TdStepComponent] header.
     * Defaults to 'Step #'
     */
    label: string;
    /**
     * sublabel?: string
     * Sets sublabel of [TdStepComponent] header.
     */
    sublabel: string;
    /**
     * active?: boolean
     * Toggles [TdStepComponent] between active/deactive.
     */
    active: boolean;
    /**
     * disabled?: boolean
     * Disables icon and header, blocks click event and sets [TdStepComponent] to deactive if 'true'.
     */
    disabled: boolean;
    /**
     * state?: StepState or ['none' | 'required' | 'complete']
     * Sets state of [TdStepComponent] depending on value.
     * Defaults to [StepState.None | 'none'].
     */
    state: any;
    /**
     * activated?: function
     * Event emitted when [TdStepComponent] is activated.
     */
    onActivated: EventEmitter<void>;
    /**
     * deactivated?: function
     * Event emitted when [TdStepComponent] is deactivated.
     */
    onDeactivated: EventEmitter<void>;
    /**
     * Toggle active state of [TdStepComponent]
     * retuns 'true' if successful, else 'false'.
     */
    toggle(): boolean;
    /**
     * Opens [TdStepComponent]
     * retuns 'true' if successful, else 'false'.
     */
    open(): boolean;
    /**
     * Closes [TdStepComponent]
     * retuns 'true' if successful, else 'false'.
     */
    close(): boolean;
    /**
     * Returns 'true' if [state] equals to [StepState.Complete | 'complete'], else 'false'.
     */
    isComplete(): boolean;
    /**
     * Returns 'true' if [state] equals to [StepState.Required | 'required'], else 'false'.
     */
    isRequired(): boolean;
    /**
     * Method to change active state internally and emit the [onActivated] event if 'true' or [onDeactivated]
     * event if 'false'. (Blocked if [disabled] is 'true')
     * returns true if successfully changed state
     */
    private _setActive(newActive);
    private _onActivated();
    private _onDeactivated();
}

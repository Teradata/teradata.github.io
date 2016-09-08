import { OnDestroy, AfterContentInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
export interface IStepChangeEvent {
    newStep: number;
    prevStep: number;
}
export declare class TdStepsComponent implements OnDestroy, AfterContentInit {
    private _prevStep;
    private _subcriptions;
    private _multiple;
    private _steps;
    /**
     * multiple?: boolean
     * Defines if there can be one or multiple [TdStepComponent] elements active at the same time.
     */
    multiple: any;
    /**
     * stepChange?: function
     * Method to be executed when [onStepChange] event is emitted.
     * Emits an [IStepChangeEvent] implemented object.
     */
    onStepChange: EventEmitter<IStepChangeEvent>;
    /**
     * Executed after content is initialized, loops through any [TdStepComponent] children elements,
     * assigns them a number and subscribes as an observer to their [onActivated] event.
     */
    ngAfterContentInit(): void;
    /**
     * Unsubscribes from [TdStepComponent] children elements when component is destroyed.
     */
    ngOnDestroy(): void;
    /**
     * Wraps previous and new [TdStepComponent] numbers in an object that implements [IStepChangeEvent]
     * and emits [onStepChange] event.
     */
    private _onStepSelection(stepNumber);
    /**
     * Loops through [TdStepComponent] children elements and deactivates them ignoring the one passed as an argument.
     */
    private _deactivateAllBut(activeStep);
}

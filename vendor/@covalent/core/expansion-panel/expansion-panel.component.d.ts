import { EventEmitter } from '@angular/core';
export declare class TdExpansionPanelComponent {
    private _expand;
    private _disabled;
    /**
     * label?: string
     * Sets label of [TdExpansionPanelComponent] header.
     * Defaults to 'Click to expand'
     */
    label: string;
    /**
     * sublabel?: string
     * Sets sublabel of [TdExpansionPanelComponent] header.
     */
    sublabel: string;
    /**
     * expand?: boolean
     * Toggles [TdExpansionPanelComponent] between expand/collapse.
     */
    expand: boolean;
    /**
     * disabled?: boolean
     * Disables icon and header, blocks click event and sets [TdStepComponent] to deactive if 'true'.
     */
    disabled: boolean;
    /**
     * expanded?: function
     * Event emitted when [TdExpansionPanelComponent] is expanded.
     */
    expanded: EventEmitter<void>;
    /**
     * collapsed?: function
     * Event emitted when [TdExpansionPanelComponent] is collapsed.
     */
    collapsed: EventEmitter<void>;
    /**
     * Method executed when [TdExpansionPanelComponent] is clicked.
     */
    clickEvent(): void;
    /**
     * Method to change expand state internally and emit the [onExpanded] event if 'true' or [onCollapsed]
     * event if 'false'. (Blocked if [disabled] is 'true')
     */
    private _setExpand(newExpand);
    private _onExpanded();
    private _onCollapsed();
}

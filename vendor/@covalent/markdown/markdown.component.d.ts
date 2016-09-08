import { AfterViewInit, ElementRef } from '@angular/core';
export declare class TdMarkdownComponent implements AfterViewInit {
    content: ElementRef;
    ngAfterViewInit(): void;
    render(contents: string): string;
}

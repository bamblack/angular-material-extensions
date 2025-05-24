import { Component, ElementRef, input, Input, SecurityContext } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
    selector: 'amx-grid-default-cell-renderer',
    standalone: true,
    template: '',
    styles: [
        ':host { align-items: center; display: flex; }'
    ]
})
export class AmxGridDefaultCellRenderer {
    @Input() set value(val: any) {
        const safeHtml = this.sanitizeHtml(val);
        this.elementRef.nativeElement.innerHTML = safeHtml;
    };

    constructor(
        private elementRef: ElementRef,
        private sanitizer: DomSanitizer
    ) { }

    private sanitizeHtml(val: any): SafeHtml {
        return this.sanitizer.sanitize(SecurityContext.HTML, val) ?? '';
    }
}

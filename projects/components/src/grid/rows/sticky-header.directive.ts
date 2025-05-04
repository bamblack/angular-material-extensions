import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    Self,
    SimpleChanges,
} from '@angular/core';

@Directive({
    selector: '[amxGridStickyHeader]',
    exportAs: 'amxGridStickyHeader',
})
export class AmxGridStickyHeader implements OnChanges, AfterViewInit, OnDestroy {
    @Input({ alias: 'amxGridStickyHeader', required: true })
    public offsetContainer!: ElementRef<HTMLElement>;
    @Input({ alias: 'amxGridStickyHeaderSticky', required: true })
    public sticky!: boolean;

    public resizeObserver!: ResizeObserver;

    constructor(@Self() private self: ElementRef<HTMLElement>) {}

    /////////////////////
    // Lifecycle Hooks //
    /////////////////////
    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['sticky'] && !changes['sticky'].firstChange) {
            this.handleResize(); // re-evaluate sticky header on changes
        }
    }

    public ngAfterViewInit(): void {
        this.handleResize(); // initial load
        this.resizeObserver = new ResizeObserver(() => {
            this.handleResize();
        });
        this.resizeObserver.observe(this.offsetContainer.nativeElement);
    }

    public ngOnDestroy(): void {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        this.self.nativeElement.style.removeProperty('--amx-sticky-header-top');
    }

    ////////////////////
    // Public Methods //
    ////////////////////
    public handleResize(): void {
        if (this.sticky) {
            this.self.nativeElement.style.setProperty(
                '--amx-sticky-header-top',
                `${this.offsetContainer.nativeElement.offsetHeight}px`
            );
        } else {
            this.self.nativeElement.style.removeProperty('--amx-sticky-header-top');
        }
    }
}

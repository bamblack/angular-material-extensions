import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmxGridStickyHeader } from './sticky-header.directive';

@Component({
    template: `
        <div #offsetEl style="height: 100px;"></div>
        <div
            #stickyHeader
            #stickyDir="amxGridStickyHeader"
            [amxGridStickyHeader]="offsetElRef"
            [amxGridStickyHeaderSticky]="true"
        ></div>
    `,
    imports: [AmxGridStickyHeader],
})
class TestHostComponent {
    @ViewChild('offsetEl', { static: true, read: ElementRef })
    offsetElRef!: ElementRef<HTMLElement>;
    @ViewChild('stickyDir', { static: true, read: AmxGridStickyHeader })
    stickyDir!: AmxGridStickyHeader;
    @ViewChild('stickyHeader', { static: true, read: ElementRef })
    targetElRef!: ElementRef<HTMLElement>;
}

describe('AmxGridStickyHeaderDirective', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let component: TestHostComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestHostComponent],
        });

        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should use a ResizeObserver to observe the target element', () => {
        expect(component.stickyDir.resizeObserver.observe).toHaveBeenCalledWith(
            component.offsetElRef.nativeElement
        );
    });

    it('should disconnect the ResizeObserver on destroy', () => {
        component.stickyDir.ngOnDestroy();
        expect(component.stickyDir.resizeObserver.disconnect).toHaveBeenCalled();
    })
});

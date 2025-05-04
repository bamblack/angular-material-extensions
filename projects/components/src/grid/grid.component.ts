import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ColDef } from './columns/column';
import { AmxGridColumnAPi } from './columns/column.api';
import { AmxGridApi } from './grid.api';
import { AmxGridRowsApi } from './rows/rows.api';

@Component({
    selector: 'amx-grid',
    imports: [CommonModule, MatPaginatorModule, MatSortModule, MatTableModule],
    styleUrl: './grid.component.css',
    templateUrl: './grid.component.html',
    providers: [AmxGridColumnAPi, AmxGridApi, AmxGridRowsApi],
    exportAs: 'amxGrid',
})
export class AmxGrid<TData = any> implements OnChanges, OnInit, AfterViewInit {
    @Input({ required: true }) columnDefinitions: ColDef[] = [];
    @Input() dataSource?: TData[];
    @Input() stickyFooter = true;
    @Input() stickyHeader = true;


    @ViewChild('aboveTableContainer', { static: true, read: ElementRef })
    protected aboveTableContainer!: ElementRef<HTMLElement>;
    protected stickyHeaderOffset = 0;

    private aboveTableContainerResizeObserver!: ResizeObserver;

    constructor(public api: AmxGridApi<TData>) {}

    /////////////////////
    // Lifecycle Hooks //
    /////////////////////
    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['columnDefinitions']) {
            this.api.columns.setColumnDefinitions(
                changes['columnDefinitions'].currentValue
            );
        }

        if (changes['dataSource']) {
            this.api.rows.setGridData(changes['dataSource'].currentValue);
        }
    }

    public ngOnInit(): void {}

    public ngAfterViewInit(): void {
        this.handleAboveTableContainerResize(); // initial load
        this.aboveTableContainerResizeObserver = new ResizeObserver(() => {
            this.handleAboveTableContainerResize();
        });
        this.aboveTableContainerResizeObserver.observe(this.aboveTableContainer.nativeElement);
    }

    /////////////////////
    // Private Methods //
    /////////////////////
    private handleAboveTableContainerResize(): void {
        this.stickyHeaderOffset = this.aboveTableContainer.nativeElement.offsetHeight;
    }
}

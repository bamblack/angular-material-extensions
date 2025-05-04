import { CommonModule } from '@angular/common';
import {
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
import { Observable } from 'rxjs';
import { ColDef } from './columns/column';
import { AmxGridColumnAPi } from './columns/column.api';
import { AmxGridDataApi } from './data/data.api';
import { AmxGridApi } from './grid.api';
import { AmxGridRowsApi } from './rows/rows.api';
import { AmxGridStickyHeader } from './rows/sticky-header.directive';

@Component({
    selector: 'amx-grid',
    imports: [
        // Agular modules
        CommonModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        // AmxGrid sub-modules
        AmxGridStickyHeader,
    ],
    styleUrl: './grid.component.css',
    templateUrl: './grid.component.html',
    providers: [AmxGridApi, AmxGridColumnAPi, AmxGridDataApi, AmxGridRowsApi],
    exportAs: 'amxGrid',
})
export class AmxGrid<TData = any> implements OnChanges, OnInit {
    @Input({ required: true }) columnDefinitions: ColDef[] = [];
    @Input() dataSource?: TData[] | Observable<TData[]>;
    @Input() stickyFooter = true;
    @Input() stickyHeader = true;

    @ViewChild('aboveTableContainer', { static: true, read: ElementRef })
    protected aboveTableElement!: ElementRef<HTMLElement>;
    protected stickyHeaderOffset = 0;

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
            this.api.data.initializeLocalDataSource(
                changes['dataSource'].currentValue
            );
        }
    }

    public ngOnInit(): void {}
}

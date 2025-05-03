import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ColDef } from './columns/column';
import { AmxGridColumnAPi } from './columns/column.api';
import { AmxGridApi } from './grid.api';

@Component({
    selector: 'amx-grid',
    imports: [CommonModule, MatPaginatorModule, MatSortModule, MatTableModule],
    styleUrl: './grid.component.css',
    templateUrl: './grid.component.html',
    providers: [AmxGridColumnAPi, AmxGridApi],
    exportAs: 'amxGrid',
})
export class AmxGrid implements OnChanges, OnInit {
    @Input() columnDefinitions: ColDef[] = [];

    constructor(
        public api: AmxGridApi
    ) { }

    /////////////////////
    // Lifecycle Hooks //
    /////////////////////
    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['columnDefinitions']) {
            this.api.columns.setColumnDefinitions(changes['columnDefinitions'].currentValue);
        }
    }

    public ngOnInit(): void { }
}

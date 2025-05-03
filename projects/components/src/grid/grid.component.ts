import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AmxGridApi } from './grid.api';

@Component({
    selector: 'amx-grid',
    imports: [MatPaginatorModule, MatSortModule, MatTableModule],
    templateUrl: './grid.component.html',
    styleUrl: './grid.component.css',
    providers: [AmxGridApi],
    exportAs: 'amxGrid',
})
export class AmxGrid {
    protected displayedColumns: string[] = [
        'position',
        'name',
        'weight',
        'symbol',
    ];
}

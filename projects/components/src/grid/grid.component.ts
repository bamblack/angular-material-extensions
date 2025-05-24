import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    Component,
    ContentChild,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AmxGridCellsApi } from './cells/cells.api';
import { AmxGridCellRendererOutlet } from './cells/rendering/cell-rendering-outlet.directive';
import { ColDef } from './columns/column';
import { AmxGridColumnsApi } from './columns/columns.api';
import { AmxGridDataApi } from './data/data.api';
import { AmxGridEventsApi } from './events/events.api';
import { AmxGridFiltersApi } from './filters/filters.api';
import { AmxGridApi } from './grid.api';
import { AmxGridFiltersContainer } from './public-api';
import { RowGroupingParams } from './rows/grouping';
import { RowDef } from './rows/row';
import { AmxGridRowsApi } from './rows/rows.api';
import { AmxGridStickyHeader } from './rows/sticky-header.directive';

@Component({
    selector: 'amx-grid',
    imports: [
        // Agular modules
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        PortalModule,
        // AmxGrid sub-modules
        AmxGridCellRendererOutlet,
        AmxGridStickyHeader
    ],
    styleUrl: './grid.component.css',
    templateUrl: './grid.component.html',
    providers: [
        AmxGridApi,
        AmxGridCellsApi,
        AmxGridColumnsApi,
        AmxGridDataApi,
        AmxGridEventsApi,
        AmxGridFiltersApi,
        AmxGridRowsApi,
    ],
    exportAs: 'amxGrid',
})
export class AmxGrid<TData = any>
    implements OnChanges, OnInit, AfterContentInit
{
    @Input({ required: true }) columnDefinitions: ColDef[] = [];
    @Input() dataSource?: TData[] | Observable<TData[]>;
    @Input() grouping?: RowGroupingParams;
    @Input() stickyFooter = true;
    @Input() stickyHeader = true;

    //////////////////
    // View Members //
    //////////////////
    @ViewChild('aboveTableContainer', { static: true, read: ElementRef })
    protected aboveTableElement!: ElementRef<HTMLElement>;
    protected stickyHeaderOffset = 0;
    protected filtersContainerPortal?: TemplatePortal;

    ////////////////////////
    // Projected  Members //
    ////////////////////////
    protected collapsedDataRowPredicate = (index: number, row: RowDef<TData>) => {
        return row.group !== true && (!row.groupPath || !row.groupPath!.every(group => this.api.rows.expandedGroups.has(group)));
    };
    protected collapsedGroupRowPredicate = (index: number, row: RowDef<TData>) => {
        if (row.group !== true) return false;

        const ancestorGroups = row.groupPath?.slice(0, -1) ?? [];
        return !ancestorGroups.every(groupId => this.api.rows.expandedGroups.has(groupId));
    };
    protected dataRowPredicate = (index: number, row: RowDef<TData>) => {
        return row.group !== true && (!row.groupPath || row.groupPath!.every(group => this.api.rows.expandedGroups.has(group)));
    };
    @ContentChild(AmxGridFiltersContainer, { static: false })
    protected filtersContainer?: AmxGridFiltersContainer;
    protected groupRowPredicate = (index: number, row: RowDef<TData>) => {
        if (row.group !== true) return false;

        const ancestorGroups = row.groupPath?.slice(0, -1) ?? [];
        return ancestorGroups.every(groupId => this.api.rows.expandedGroups.has(groupId));
    };

    constructor(
        public api: AmxGridApi<TData>,
        private viewContainerRef: ViewContainerRef
    ) {}

    /////////////////////
    // Lifecycle Hooks //
    /////////////////////
    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['grouping'] && !changes['grouping'].isFirstChange()) {
            this.api.rows.setGroupingParams(changes['grouping'].currentValue ?? {});

            if (!changes['columnDefinitions']) {
                this.api.columns.setColumnDefinitions(this.columnDefinitions);
            }
        }

        if (changes['columnDefinitions'] && !changes['columnDefinitions'].isFirstChange()) {
            this.api.columns.setColumnDefinitions(
                changes['columnDefinitions'].currentValue
            );
        }

        if (changes['dataSource'] && !changes['dataSource'].isFirstChange()) {
            this.api.data.initializeLocalDataSource(
                changes['dataSource'].currentValue
            );
        }
    }

    public ngOnInit(): void {
        this.api.rows.setGroupingParams(this.grouping ?? {});
        this.api.columns.setColumnDefinitions(this.columnDefinitions);
        this.api.data.initializeLocalDataSource(this.dataSource ?? []);
    }

    public ngAfterContentInit(): void {
        if (this.filtersContainer) {
            this.filtersContainerPortal = new TemplatePortal(
                this.filtersContainer.template,
                this.viewContainerRef
            );
        }
    }

    /////////////////////////
    // Protected Accessors //
    /////////////////////////
    protected get hasFiltersContainer(): boolean {
        return !!this.filtersContainer;
    }

    ///////////////////////
    // Protected Methods //
    ///////////////////////
    protected toggleGroup(groupId: string): void {
        this.api.rows.toggleGroup(groupId);
        // TODO: need to rework this eventually, okay for now
        this.api.data.dataSource.data = [...this.api.data.dataSource.data];
    }
}

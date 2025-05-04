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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ColDef } from './columns/column';
import { AmxGridColumnAPi } from './columns/column.api';
import { AmxGridDataApi } from './data/data.api';
import { AmxGridEventsApi } from './events/events.api';
import { AmxGridFiltersApi } from './filters/filters.api';
import { AmxGridApi } from './grid.api';
import { AmxGridFiltersContainer } from './public-api';
import { AmxGridRowsApi } from './rows/rows.api';
import { AmxGridStickyHeader } from './rows/sticky-header.directive';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'amx-grid',
    imports: [
        // Agular modules
        CommonModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        PortalModule,
        // AmxGrid sub-modules
        AmxGridStickyHeader,
    ],
    styleUrl: './grid.component.css',
    templateUrl: './grid.component.html',
    providers: [
        AmxGridApi,
        AmxGridColumnAPi,
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
    @ContentChild(AmxGridFiltersContainer, { static: false })
    protected filtersContainer?: AmxGridFiltersContainer;

    constructor(
        public api: AmxGridApi<TData>,
        private viewContainerRef: ViewContainerRef
    ) {}

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
    public get hasFiltersContainer(): boolean {
        return !!this.filtersContainer;
    }
}

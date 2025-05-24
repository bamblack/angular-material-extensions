import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, ReplaySubject, Subject, tap, withLatestFrom } from 'rxjs';
import { AmxGridCellsApi } from '../cells/cells.api';
import { ColDef } from '../columns/column';
import { AmxGridColumnsApi } from '../columns/columns.api';
import { AmxGridEventsApi } from '../events/events.api';
import { AmxGridEvent } from '../events/grid-event';
import { AmxGridFiltersApi } from '../filters/filters.api';
import { RowDef } from '../rows/row';
import { AmxGridRowsApi } from '../rows/rows.api';

@Injectable()
export class AmxGridDataApi<TData = any> {
    private __dataObs$: Subject<TData[]> = new ReplaySubject<TData[]>(1);
    private __FilteredDataObs$: Subject<TData[]> = new ReplaySubject<TData[]>(1);
    private __filteredCount = 0;
    private __totalCount = 0;
    private __dataSource: MatTableDataSource<RowDef<TData>> = new MatTableDataSource();
    private __dataSourceType!: 'local' | 'remote';

    constructor(
        private cells: AmxGridCellsApi,
        private columns: AmxGridColumnsApi,
        private destroyRef: DestroyRef,
        private events: AmxGridEventsApi<TData>,
        private filters: AmxGridFiltersApi,
        private rows: AmxGridRowsApi
    ) {
        this.__dataObs$
            .pipe(
                tap(data => {
                    this.rows.clearExpandedGroups();
                    this.__filteredCount = data.length;
                    this.__totalCount = data.length;
                }),
                map(data => this.mapToRows(data, this.columns.groupColumns)),
                tap(() => {
                    if (this.rows.groupingParams.autoExpandTo === 0) return;
                })
            )
            .subscribe((data: RowDef<TData>[]) => {
                this.cells.clearCache();
                this.__dataSource.data = data;
            });

        this.__FilteredDataObs$
            .pipe(
                tap(data => {
                    this.__filteredCount = data.length;
                }),
                map(data => this.mapToRows(data, this.columns.groupColumns))
            )
            .subscribe((data: RowDef<TData>[]) => {
                this.cells.clearCache();
                this.__dataSource.data = data;
            });
    }

    //////////////////////
    // Public Accessors //
    //////////////////////
    public get dataSource(): MatTableDataSource<RowDef<TData>> {
        return this.__dataSource;
    }

    public get filteredCount(): number {
        return this.__filteredCount;
    }

    public get isLocalDataSource(): boolean {
        return this.__dataSourceType === 'local';
    }

    public get isRemoteDataSource(): boolean {
        return this.__dataSourceType === 'remote';
    }

    public get totalCount(): number {
        return this.__totalCount;
    }

    ////////////////////
    // Public Methods //
    ////////////////////
    /**
     * Initialize a local data source for the grid. This is used when the data
     * is provided directly as an array or an Observable of data.
     */
    public initializeLocalDataSource(
        dataSource: TData[] | Observable<TData[]>
    ): void {
        this.__dataSourceType = 'local';

        if (Array.isArray(dataSource)) {
            this.__dataObs$.next(dataSource);
        } else if (dataSource instanceof Observable) {
            dataSource
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((data: TData[]) => {
                    this.__dataObs$.next(data);
                });
        } else {
            throw new Error(
                'Invalid data source provided. Must be an array or an Observable.'
            );
        }

        this.events.on(AmxGridEvent.FiltersChanged)
            .pipe(
                withLatestFrom(this.__dataObs$.asObservable()),
                map(([filters, data]) => {
                    const filteredData = this.applyFilters(
                        filters,
                        data
                    );

                    return filteredData;
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(this.__FilteredDataObs$);
    }

    public setGridData(data: TData[]): void {
        if (Array.isArray(data)) {
            this.__dataObs$.next(data);
        } else {
            console.warn("Data provided to AmxGridRowsApi.setGridData is not an array.");
        }
    }

    /////////////////////
    // Private Methods //
    /////////////////////
    private applyFilters(
        filters: Readonly<Record<string, any>>,
        data: TData[]
    ): TData[] {
        if (Object.keys(filters).length === 0) return data;

        return data.filter(item => {
            for (const [filterKey, filterValue] of Object.entries(filters)) {
                const comparator = this.filters.getComparatorFn(filterKey);
                if (comparator && !comparator(item, filterValue)) {
                    return false;
                }
            }

            return true;
        });
    }

    private flattenGroupedData(
        groupedData: RowDef<TData>[],
        result: RowDef<TData>[] = []
    ): RowDef<TData>[] {
        for (const item of groupedData) {
            if (item.group) {
                result.push(item);
                this.flattenGroupedData(item.children ?? [], result);
            } else {
                result.push(item);
            }
        }
        return result;
    }

    private groupData(
        data: TData[],
        groupCols: ReadonlyMap<number, ColDef>,
        level: number = 1,
        path: string[] = []
    ): RowDef<TData>[] {
        const col = groupCols.get(level);
        if (!col) {
            return data.map((row, index) => ({
                data: row,
                group: false,
                groupPath: path,
                id: index
            }));
        }

        const grouped = new Map<any, TData[]>();
        for (const item of data) {
            const key = item[col.field as keyof TData];
            if (!grouped.has(key)) {
                grouped.set(key, []);
            }

            grouped.get(key)!.push(item);
        }

        const result: RowDef<TData>[] = [];
        for (const [key, items] of grouped.entries()) {
            const groupId = `groupCol--${col.id}--${key}`;
            const groupPath = [...path, groupId];
            result.push({
                group: true,
                groupCol: col.id,
                groupLevel: level,
                groupName: key,
                groupPath: groupPath,
                id: groupId,
                children: this.groupData(items, groupCols, level + 1, groupPath)
            });
        }
        return result;
    }

    private mapToRows(
        data: TData[],
        groupCols: ReadonlyMap<number, ColDef>
    ): RowDef<TData>[] {
        if (groupCols.size === 0) {
            return data.map((row, index) => ({
                data: row,
                group: false,
                id: index
            }));
        } else {
            const groupedData = this.groupData(data, groupCols);
            const flattenedGroupData = this.flattenGroupedData(groupedData);
            return flattenedGroupData;
        }
    }
}

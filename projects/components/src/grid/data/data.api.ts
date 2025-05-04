import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, ReplaySubject, Subject, tap, withLatestFrom } from 'rxjs';
import { AmxGridEventsApi } from '../events/events.api';
import { AmxGridEvent } from '../events/grid-event';
import { AmxGridFiltersApi } from '../filters/filters.api';

@Injectable()
export class AmxGridDataApi<TData = any> {
    private __dataObs$: Subject<TData[]> = new ReplaySubject<TData[]>(1);
    private __FilteredDataObs$: Subject<TData[]> = new ReplaySubject<TData[]>(1);
    private __filteredCount = 0;
    private __totalCount = 0;
    private __dataSource: MatTableDataSource<TData> = new MatTableDataSource();
    private __dataSourceType!: 'local' | 'remote';

    constructor(
        private destroyRef: DestroyRef,
        private events: AmxGridEventsApi<TData>,
        private filters: AmxGridFiltersApi
    ) {
        this.__dataObs$.subscribe((data: TData[]) => {
            this.__dataSource.data = data;
            this.__filteredCount = data.length;
            this.__totalCount = data.length;
        });

        this.__FilteredDataObs$.subscribe((data: TData[]) => {
            this.__filteredCount = data.length;
            this.__dataSource.data = data;
        });
    }

    //////////////////////
    // Public Accessors //
    //////////////////////
    public get dataSource(): MatTableDataSource<TData> {
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
}

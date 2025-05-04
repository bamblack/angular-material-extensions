import { Injectable } from "@angular/core";
import { filterShouldBeApplied } from "./filter-should-be-applied";
import { AmxGridEventsApi } from "../events/events.api";
import { AmxGridEvent } from "../events/grid-event";
import { ComparatorFn } from "./comparator-fn";

@Injectable()
export class AmxGridFiltersApi<TData = unknown> {
    private __comparatorFns: Map<string, ComparatorFn<TData>> = new Map();
    private __currentFilters: Record<string, any> = {};
    private __filters: Map<string, any> = new Map();

    constructor(
        private events: AmxGridEventsApi
    ) {}

    //////////////////////
    // Public Accessors //
    //////////////////////
    public get currentFilters(): Readonly<Record<string, any>> {
        return this.__currentFilters;
    }

    ////////////////////
    // Public Methods //
    ////////////////////
    public clearFilters(): void {
        for (const [key, value] of Object.entries(this.__currentFilters)) {
            this.events.emit(AmxGridEvent.FilterCleared, { filterKey: key });
            delete this.__currentFilters[key];
        }

        this.__filters.clear();
        this.events.emit(AmxGridEvent.FiltersChanged, this.__currentFilters);
    }

    public getComparatorFn(key: string): ComparatorFn<TData> | undefined {
        return this.__comparatorFns.get(key);
    }

    public registerComparator(
        key: string,
        compareWithFn: ComparatorFn<TData>
    ): void {
        this.__comparatorFns.set(key, compareWithFn);
    }

    public updateFilter(
        key: string,
        value: any
    ): void {
        if (filterShouldBeApplied(value)) {
            this.__filters.set(key, value);
        } else {
            this.__filters.delete(key);
        }
        this.__currentFilters = Object.fromEntries(this.__filters.entries());

        this.events.emit(AmxGridEvent.FiltersChanged, this.__currentFilters);
    }
}

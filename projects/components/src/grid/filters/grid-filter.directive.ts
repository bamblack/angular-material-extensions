import {
    DestroyRef,
    Directive,
    Input,
    OnDestroy,
    OnInit,
    Self,
    SkipSelf,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { AmxGridApi } from '../grid.api';
import { ComparatorFn } from './comparator-fn';
import { AmxGridFiltersApi } from './filters.api';
import { AmxGridDataApi } from '../public-api';
import { AmxGridEventsApi } from '../events/events.api';
import { AmxGridEvent } from '../events/grid-event';

@Directive({
    selector: '[amxGridFilter]',
})
export class AmxGridFilter<TData = unknown> implements OnInit, OnDestroy {
    @Input({ alias: 'amxGridFilter', required: true }) key!: string;
    @Input('amxGridFilterDebounce') debounce = 0;
    @Input('amxGridFilterCompareWith') compareWith?: ComparatorFn<TData>

    constructor(
        @SkipSelf() private api: AmxGridApi<TData>,
        @SkipSelf() private data: AmxGridDataApi<TData>,
        @Self() private destroyRef: DestroyRef,
        @SkipSelf() private events: AmxGridEventsApi<TData>,
        @SkipSelf() private filters: AmxGridFiltersApi<TData>,
        @Self() public ngControl: NgControl
    ) {}

    public ngOnInit(): void {
        if (!this.ngControl.control) return;

        if (this.compareWith) {
            this.filters.registerComparator(this.key, this.compareWith);
        }

        if (this.data.isLocalDataSource) {
            this.events.on(AmxGridEvent.FilterCleared)
                .pipe(filter(event => event.filterKey === this.key))
                .subscribe(() => {
                    this.ngControl.control?.setValue(null, { emitEvent: false });
                })
        }

        this.ngControl.control.valueChanges
            .pipe(
                debounceTime(this.debounce),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((value) => {
                this.api.filters.updateFilter(
                    this.key,
                    value
                );
            });
    }

    public ngOnDestroy(): void {}
}

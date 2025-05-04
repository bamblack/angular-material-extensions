import { Observable } from 'rxjs';
import { FiltersChangedEvent } from './filters-changed.event';
import { FilterClearedEvent } from './filter-cleared.event';

export enum AmxGridEvent {
    FiltersChanged = 'filtersChanged',
    FilterCleared = 'filterCleared'
}

/**
 * Utility function that takes a provided object and enforces that it has a key for each event in the AmxGridEvent
 * enum by extending it with Record
 */
const enforceEnumMembers = <T extends Record<AmxGridEvent, unknown>>(
    mapping: T
) => mapping;

/**
 * @returns an object with each event in the AmxGridEvent enum as a key, with the value being an object casted to
 * the type of data that is input to the API in order to fire the event.
 */
const eventInputs = <TData = unknown>() =>
    enforceEnumMembers({
        [AmxGridEvent.FiltersChanged]: {} as FiltersChangedEvent,
        [AmxGridEvent.FilterCleared]: {} as FilterClearedEvent
    });

/**
 * @returns an object with each event in the AmxGridEvent enum as a key, with the value being an object casted to
 * the type of data that is output from the API when the event is fired.
 */
const eventPayloads = <TData = unknown>() =>
    enforceEnumMembers({
        [AmxGridEvent.FiltersChanged]: {} as FiltersChangedEvent,
        [AmxGridEvent.FilterCleared]: {} as FilterClearedEvent
    });

/**
 * Utility type that extract the member types of the eventPayload const and cretes a new type with the same keys and
 * the values of the keys being the type of the value of the key in the eventPayloads object.
 */
export type AmxGridEventPayloads<TData> = ReturnType<
    typeof eventPayloads<TData>
>;
/**
 * Utility type that extract the member types of the eventInputs const and creates a new type with the same keys and
 * the values of the keys being the type of the value of the key in the eventInputs object.
 */
export type AmxGridEventInputs<TData> = ReturnType<typeof eventInputs<TData>>;
/**
 * Utility type that extracts the keys of AmxGridEvent where the input type specified in AmxGridEventInputs
 * is not the same as the output type specified in AmxGridEventPayloads and requires that a transformation
 * function is provided for each.
 */
export type AmxGridEventTransforms<TData> = {
    [P in AmxGridEvent as AmxGridEventInputs<TData>[P] extends AmxGridEventPayloads<TData>[P]
        ? never
        : P]: (
        input: AmxGridEventInputs<TData>[P]
    ) => AmxGridEventPayloads<TData>[P];
};

export interface AmxGridObservableEventsApi<TData = unknown> {
    on<E extends AmxGridEvent>(
        event: E
    ): Observable<AmxGridEventPayloads<TData>[E]>;
    emit<E extends AmxGridEvent>(
        event: E,
        payload: AmxGridEventPayloads<TData>[E]
    ): void;
};

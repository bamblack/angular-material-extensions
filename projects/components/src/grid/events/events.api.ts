import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
    AmxGridEvent,
    AmxGridEventInputs,
    AmxGridEventPayloads,
    AmxGridObservableEventsApi,
} from './grid-event';

@Injectable()
export class AmxGridEventsApi<TData = unknown>
    implements AmxGridObservableEventsApi<TData>
{
    private __subjects: {
        [P in AmxGridEvent]: Subject<AmxGridEventInputs<TData>[P]>;
    } = Object.fromEntries(
        Object.values(AmxGridEvent).map((event) => [event, new Subject()])
    ) as unknown as {
        [P in AmxGridEvent]: Subject<AmxGridEventInputs<TData>[P]>;
    };

    emit<E extends AmxGridEvent>(
        event: E,
        payload: AmxGridEventInputs<TData>[E]
    ): void {
        this.__subjects[event].next(payload);
    }

    on<E extends AmxGridEvent>(
        event: E
    ): Observable<AmxGridEventPayloads<TData>[E]> {
        const obs$ = this.__subjects[event].asObservable();
        return obs$;
    }
}

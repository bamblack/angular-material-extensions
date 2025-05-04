import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AmxGridRowsApi } from '../rows/rows.api';

@Injectable()
export class AmxGridDataApi<TData = any> {
    constructor(private rows: AmxGridRowsApi) {}

    /**
     * Initialize a local data source for the grid. This is used when the data
     * is provided directly as an array or an Observable of data.
     */
    public initializeLocalDataSource(
        dataSource: TData[] | Observable<TData[]>
    ): void {
        if (Array.isArray(dataSource)) {
            this.rows.setGridData(dataSource);
        } else if (dataSource instanceof Observable) {
            dataSource.subscribe((data: TData[]) => {
                this.rows.setGridData(data);
            });
        } else {
            throw new Error(
                'Invalid data source provided. Must be an array or an Observable.'
            );
        }
    }
}

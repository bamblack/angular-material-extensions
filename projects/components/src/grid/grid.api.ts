import { Injectable } from "@angular/core";
import { AmxGridColumnAPi } from "./columns/column.api";
import { AmxGridDataApi } from "./data/data.api";
import { AmxGridFiltersApi } from "./filters/filters.api";
import { AmxGridRowsApi } from "./rows/rows.api";

@Injectable()
export class AmxGridApi<TData = any> {
    constructor(
        public columns: AmxGridColumnAPi,
        public data: AmxGridDataApi<TData>,
        public filters: AmxGridFiltersApi,
        public rows: AmxGridRowsApi<TData>
    ) { }
}

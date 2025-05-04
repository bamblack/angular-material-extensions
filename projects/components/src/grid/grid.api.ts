import { Injectable } from "@angular/core";
import { AmxGridColumnAPi } from "./columns/column.api";
import { AmxGridRowsApi } from "./rows/rows.api";
import { AmxGridDataApi } from "./data/data.api";

@Injectable()
export class AmxGridApi<TData = any> {
    constructor(
        public columns: AmxGridColumnAPi,
        public data: AmxGridDataApi<TData>,
        public rows: AmxGridRowsApi<TData>
    ) { }
}

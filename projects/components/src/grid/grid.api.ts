import { Injectable } from "@angular/core";
import { AmxGridColumnAPi } from "./columns/column.api";
import { AmxGridRowsApi } from "./rows/rows.api";

@Injectable()
export class AmxGridApi<TData = any> {
    constructor(
        public columns: AmxGridColumnAPi,
        public rows: AmxGridRowsApi<TData>
    ) { }
}

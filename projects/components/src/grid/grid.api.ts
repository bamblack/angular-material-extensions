import { Injectable } from "@angular/core";
import { AmxGridColumnsApi } from "./columns/columns.api";
import { AmxGridDataApi } from "./data/data.api";
import { AmxGridFiltersApi } from "./filters/filters.api";
import { AmxGridRowsApi } from "./rows/rows.api";
import { AmxGridCellsApi } from "./cells/cells.api";

@Injectable()
export class AmxGridApi<TData = any> {
    constructor(
        public cells: AmxGridCellsApi<TData>,
        public columns: AmxGridColumnsApi<TData>,
        public data: AmxGridDataApi<TData>,
        public filters: AmxGridFiltersApi<TData>,
        public rows: AmxGridRowsApi<TData>
    ) { }
}

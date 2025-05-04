import { Injectable } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

@Injectable()
export class AmxGridRowsApi<TData = any> {
    private __dataSource: MatTableDataSource<TData> = new MatTableDataSource();

    //////////////////////
    // Public Accessors //
    //////////////////////
    public get dataSource(): MatTableDataSource<TData> {
        return this.__dataSource;
    }

    ////////////////////
    // Public Methods //
    ////////////////////
    public setGridData(data: TData): void {
        if (Array.isArray(data)) {
            this.__dataSource.data = data;
        } else {
            console.warn("Data provided to AmxGridRowsApi.setGridData is not an array.");
        }
    }
}

import { Injectable } from "@angular/core";
import { ColDef } from "./column";

@Injectable()
export class AmxGridColumnAPi {
    private __columnDefinitions: ColDef[] = [];
    private __columnMap: Map<string, ColDef> = new Map();
    private __matColumns: string[] = [];

    //////////////////////
    // Public Accessors //
    //////////////////////
    public get columnDefintions(): ReadonlyArray<ColDef> {
        return this.__columnDefinitions;
    }

    public get columnMap(): ReadonlyMap<string, ColDef> {
        return this.__columnMap;
    }

    public get matColumns(): ReadonlyArray<string> {
        return this.__matColumns;
    }

    ////////////////////
    // Public Methods //
    ////////////////////
    public setColumnDefinitions(columns: ColDef[]): void {
        this.__columnMap.clear();
        if (!columns || !Array.isArray(columns)) {
            throw new Error("Invalid column definitions provided. Expected an array of ColDef.");
        }

        this.__columnDefinitions = columns;
        columns.forEach(col => {
            if (!col) {
                throw new Error("Column definition cannot be null or undefined.");
            }

            if (!col.id) {
                throw new Error("Each column definition must have an 'id' property.");
            }

            if (this.__columnMap.has(col.id)) {
                throw new Error(`Duplicate column ID found: ${col.id}. Each column must have a unique 'id' property.`);
            }

            this.__columnMap.set(col.id, col);
            this.__matColumns.push(col.id);
        });
    }
}

import { Injectable } from "@angular/core";
import { AmxGridRowsApi } from "../rows/rows.api";
import { ColDef } from "./column";

@Injectable()
export class AmxGridColumnsApi<TData = any> {
    private __columnDefinitions: ColDef<TData>[] = [];
    private __columnMap: Map<string, ColDef<TData>> = new Map();
    private __groupColumns: Map<number, ColDef<TData>> = new Map();
    private __matColumns: Set<string> = new Set();
    private __matColumnsArr: string[] = [];

    constructor(
        private rows: AmxGridRowsApi
    ) { }

    //////////////////////
    // Public Accessors //
    //////////////////////
    public get columnDefintions(): ReadonlyArray<ColDef<TData>> {
        return this.__columnDefinitions;
    }

    public get columnMap(): ReadonlyMap<string, ColDef<TData>> {
        return this.__columnMap;
    }

    public get groupColumns(): ReadonlyMap<number, ColDef<TData>> {
        return this.__groupColumns;
    }

    public get matColumns(): ReadonlyArray<string> {
        return this.__matColumnsArr;
    }

    ////////////////////
    // Public Methods //
    ////////////////////
    public getColumnDefinition(id: string): ColDef<TData> | undefined {
        return this.__columnMap.get(id);
    }

    public setColumnDefinitions(columns: ColDef<TData>[]): void {
        this.__columnMap.clear();
        this.__groupColumns.clear();

        if (!columns || !Array.isArray(columns)) {
            throw new Error("Invalid column definitions provided. Expected an array of ColDef.");
        }

        // TODO: add built-in columns here

        columns
            // sort the columns so that our group columns appear first
            .sort((a, b) => {
                const aIsGroup = !!a.group;
                const bIsGroup = !!b.group;

                if (aIsGroup && bIsGroup) {
                    const aLevel = a.groupLevel ?? 0;
                    const bLevel = b.groupLevel ?? 0;
                    return aLevel - bLevel;
                }

                return aIsGroup ? -1 : bIsGroup ? 1 : 0;
            })
            // then register them with the API
            .forEach(col => {
                if (!col) {
                    throw new Error("Column definition cannot be null or undefined.");
                }

                if (!col.id) {
                    throw new Error("Each column definition must have an 'id' property.");
                }

                if (this.__columnMap.has(col.id)) {
                    throw new Error(`Duplicate column ID found: ${col.id}. Each column must have a unique 'id' property.`);
                }

                const localCol = { ...col }; // create a shallow copy
                this.__columnMap.set(localCol.id, localCol);
                this.__columnDefinitions.push(localCol);

                if (col.group) {
                    this.__groupColumns.set(localCol.groupLevel ?? this.__groupColumns.size + 1, localCol);

                    if (this.rows.groupingParams.mode === 'groupCol' && !this.__matColumns.has('amxGroup')) {
                        this.__matColumns.add('amxGroup');
                    }
                } else {
                    this.__matColumns.add(localCol.id);
                }
            });

        this.__matColumnsArr = Array.from(this.__matColumns.values());
    }
}

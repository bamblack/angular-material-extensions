import { Injectable } from "@angular/core";
import { ColDef } from "../columns/column";
import { RowDef } from "../rows/row";

@Injectable()
export class AmxGridCellsApi<TData = any> {
    private __cellValueCache: Map<string, any> = new Map();

    public clearCache(): void {
        this.__cellValueCache.clear();
    }

    /**
     * Clear the cached value, if it exists, for a specific cell in the grid.
     */
    public clearCacheForCell(colDef: ColDef<TData>, row: RowDef<TData>): void {
        const cellKey = `${colDef.id}_${row.id}`;
        this.__cellValueCache.delete(cellKey);
    }

    /**
     * Retrieve a value for a specific cell in the grid.
     */
    public getCellValue(colDef: ColDef<TData>, row: RowDef<TData>): any {
        const cellKey = `${colDef.id}_${row.id}`;
        if (this.__cellValueCache.has(cellKey)) {
            return this.__cellValueCache.get(cellKey);
        }

        let value, formattedValue;
        if (colDef.valueGetter) {
            value = colDef.valueGetter({ row });
        } else if (row.data && colDef.field) {
            value = row.data[colDef.field];
        } else {
            value = undefined;
        }

        if (colDef.valueFormatter) {
            formattedValue = colDef.valueFormatter({ row, value });
        } else {
            formattedValue = value;
        }

        return formattedValue;
    }
}

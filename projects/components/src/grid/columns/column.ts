import { AmxGridCellRenderer } from "../cells/rendering/cell-renderer";
import { RowDef } from "../rows/row";

export type ColStickyPosition = 'left' | 'right' | 'none';
export type ColType = 'string' | 'number' | 'date' | 'boolean' | 'object';

export type AmxGridValueFormatterParams<TData = any> = {
    row: RowDef<TData>;
    value: any;
};
export type AmxGridValueGetterParams<TData = any> = {
    row: RowDef<TData>;
};

export type ColDef<TData = any> = {
    /**
     * A custom cell renderer to use for this column. Optional.
     */
    cellRenderer?: AmxGridCellRenderer<TData>;
    /**
     * The field name of the column, which corresponds to a property in the data object. Optional.
     * If specifying a group column, this is required.
     */
    field?: keyof TData;
    /**
     * Whether or not the grid should group the data by the values in this column. Defaults to false.
     */
    group?: boolean;
    /**
     * What level the grid should group this data at. If no group level is specified multiple groups are handled
     * in the order in which they are passed to the grid.
     */
    groupLevel?: number;
    /**
     * The header name of the column, which is displayed in the grid header. If this is not supplied
     * the field name will be used as the header name.
     */
    headerName?: string;
    /**
     * Whether or not the column is visible in the grid. Defaults to false.
     */
    hidden?: boolean;
    /**
     * The unique identifier for the column. This is used to reference the column in the grid API.
     */
    id: string;
    /**
     * Whether or not the column is sortable. Defaults to false.
     */
    sortable?: boolean;
    /**
     * The sticky position of the column. Can be 'left', 'right', or 'none'. Defaults to 'none'.
     */
    sticky?: ColStickyPosition;
    /**
     * The type of data in the column. Defaults to 'string'.
     */
    type?: ColType;

    valueFormatter?: (params: AmxGridValueFormatterParams<TData>) => any;
    /**
     * Custom function to execute to retrieve the value to display in this cell. Optional.
     */
    valueGetter?: (params: AmxGridValueGetterParams<TData>) => any;
}

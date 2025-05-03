export type ColStickyPosition = 'left' | 'right' | 'none';
export type ColType = 'string' | 'number' | 'date' | 'boolean' | 'object';

export type ColDef = {
    /**
     * The field name of the column, which corresponds to a property in the data object.
     */
    field: string;
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
}

export type RowDef<TData = any> = {
    /**
     * If this row is a group specifies the data that is contained within the group.
     */
    children?: RowDef<TData>[],
    /**
     * If this row is not a group specifies the data to display on the row.
     */
    data?: TData;
    /**
     * Whether or not this row is a group.
     */
    group: boolean;
    /**
     * If this row is a group specifies what column this group is for.
     */
    groupCol?: string;
    /**
     * If this row is a group specifies the level that the group is within a group hierarchy. Starts at 1.
     */
    groupLevel?: number;
    /**
     * If this row is a group specifies the value of the group.
     */
    groupName?: string;
    /**
     * If this row is a group or is contained in a group specifies the path of one or more groups it is a child of.
     */
    groupPath?: string[];
    id: any;
}

import { Type } from "@angular/core";
import { ColDef } from "../../columns/column";
import { RowDef } from "../../rows/row";

export type AmxGridCellRendererParams<TData = any> = {
    colDef: ColDef;
    row: RowDef<TData>;
    value: any;
};
export type AmxGridCellRendererFn<TData = any> = (params: AmxGridCellRendererParams<TData>) => any;
export interface IAmxGridCellRenderer<TData = any> {
    amxOnInit(params: AmxGridCellRendererParams<TData>): void;
    amxOnRefresh?(): void;
}

export type AmxGridCellRenderer<TData = any> =
    AmxGridCellRendererFn<TData> |
    Type<IAmxGridCellRenderer<TData>>;

export function isRendererComponent<T>(
    renderer: AmxGridCellRenderer<T>
): renderer is Type<IAmxGridCellRenderer<T>> {
    return typeof renderer === 'function' && !!(renderer as any).ɵcmp;
}

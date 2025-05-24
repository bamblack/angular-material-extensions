import { Directive, Injector, Input, OnChanges, SimpleChanges, ViewContainerRef } from "@angular/core";
import { ColDef } from "../../columns/column";
import { AmxGridApi } from "../../grid.api";
import { RowDef } from "../../rows/row";
import { AmxGridCellRenderer, AmxGridCellRendererParams, isRendererComponent } from "./cell-renderer";
import { AmxGridDefaultCellRenderer } from "../renderers/default-renderer.component";

@Directive({
    selector: '[amxGridCellRendererOutlet]',
    standalone: true
})
export class AmxGridCellRendererOutlet<TData = any> implements OnChanges {
    @Input('amxGridCellRendererOutlet') cellRenderer?: AmxGridCellRenderer<TData>;
    @Input('amxGridCellRendererOutletColDef') colDef!: ColDef;
    @Input('amxGridCellRendererOutletRow') row!: RowDef<TData>;

    constructor(
        private api: AmxGridApi,
        private injector: Injector,
        private vcr: ViewContainerRef
      ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['cellRenderer'] && this.cellRenderer) {
            this.vcr.clear();
            const params: AmxGridCellRendererParams<TData> = {
                colDef: this.colDef,
                row: this.row,
                value: this.api.cells.getCellValue(this.colDef, this.row),
            }

            if  (isRendererComponent(this.cellRenderer)) {
                const componentRef = this.vcr.createComponent(this.cellRenderer, {
                    injector: this.injector
                });
                componentRef.instance.amxOnInit(params);
            } else {
                const renderValue = this.cellRenderer(params);
                const componentRef = this.vcr.createComponent(AmxGridDefaultCellRenderer);
                componentRef.instance.value = renderValue;
            }
        } else {
            const renderValue = this.api.cells.getCellValue(this.colDef, this.row);
            const componentRef = this.vcr.createComponent(AmxGridDefaultCellRenderer);
            componentRef.instance.value = renderValue;
        }
    }
}

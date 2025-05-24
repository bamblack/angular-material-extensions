import { Injectable } from "@angular/core";
import { RowGroupingParams } from "./grouping";

const ROW_GROUPING_PARAMS_DEFAULTS: RowGroupingParams = {
    autoExpandTo: 0,
    mode: 'groupRows'
};

@Injectable()
export class AmxGridRowsApi<TData = any> {
    private __expandedGroups: Set<string> = new Set<string>();
    private __groupingParams!: RowGroupingParams;

    //////////////////////
    // Public Accessors //
    //////////////////////
    public get expandedGroups(): ReadonlySet<string> {
        return this.__expandedGroups;
    }

    public get groupingParams(): RowGroupingParams {
        return this.__groupingParams;
    }

    ////////////////////
    // Public Methods //
    ////////////////////
    public clearExpandedGroups(): void {
        this.__expandedGroups.clear();
    }

    public setGroupingParams(params: RowGroupingParams): void {
        this.__groupingParams = Object.assign({}, ROW_GROUPING_PARAMS_DEFAULTS, params);
    }

    public toggleGroup(groupId: string): void {
        if (this.__expandedGroups.has(groupId)) {
            this.__expandedGroups.delete(groupId);
        } else {
            this.__expandedGroups.add(groupId);
        }
    }
}

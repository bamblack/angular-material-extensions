import { Injectable } from "@angular/core";
import { AmxGridColumnAPi } from "./columns/column.api";

@Injectable()
export class AmxGridApi {
    constructor(
        public columns: AmxGridColumnAPi
    ) { }
}

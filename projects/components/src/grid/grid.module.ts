import { NgModule } from '@angular/core';
import { AmxGrid } from './grid.component';
import { AmxGridFilter, AmxGridFiltersContainer } from './public-api';

@NgModule({
    imports: [AmxGrid, AmxGridFilter, AmxGridFiltersContainer],
    exports: [AmxGrid, AmxGridFilter, AmxGridFiltersContainer],
})
export class AmxGridModule {}

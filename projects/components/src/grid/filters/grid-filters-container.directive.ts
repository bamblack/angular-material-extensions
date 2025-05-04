import { Directive, Self, TemplateRef } from '@angular/core';

@Directive({
    selector: 'ng-template[amxGridFiltersContainer]',
})
export class AmxGridFiltersContainer {
    constructor(@Self() public template: TemplateRef<any>) {}
}

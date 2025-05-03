import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmxGrid } from './grid.component';

describe('GridComponent', () => {
    let component: AmxGrid;
    let fixture: ComponentFixture<AmxGrid>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AmxGrid],
        }).compileComponents();

        fixture = TestBed.createComponent(AmxGrid);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

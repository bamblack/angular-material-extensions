import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { argsToTemplate, moduleMetadata, StoryObj } from '@storybook/angular';
import periodicData from '../../documentation/periodic-table.json';
import { AmxGrid } from './grid.component';
import { AmxGridModule } from './grid.module';

const meta = {
    title: 'Components/Grid',
    component: AmxGrid,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [
                CommonModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
                ReactiveFormsModule,
                AmxGridModule,
            ],
        }),
    ],
    args: {
        dataSource: periodicData,
        columnDefinitions: [
            {
                id: 'number',
                field: 'number',
                headerName: 'Number',
                type: 'number',
            },
            { id: 'name', field: 'name', headerName: 'Name', type: 'string' },
            {
                id: 'symbol',
                field: 'symbol',
                headerName: 'Symbol',
                type: 'string',
            },
            {
                id: 'weight',
                field: 'atomic_mass',
                headerName: 'Weight',
                type: 'number',
            },
            {
                id: 'category',
                field: 'category',
                headerName: 'Category',
                type: 'string',
            },
            {
                id: 'group',
                field: 'group',
                headerName: 'Group',
                type: 'string',
            },
            {
                id: 'period',
                field: 'period',
                headerName: 'Period',
                type: 'number',
            },
            {
                id: 'discovered_by',
                field: 'discovered_by',
                headerName: 'Discovered By',
                type: 'string',
            },
            {
                id: 'named_by',
                field: 'named_by',
                headerName: 'Named By',
                type: 'string',
            },
        ],
        stickyHeader: false,
    },
    render: ({ ...args }) => ({
        props: {
            ...args,
            categoryCtrl: new FormControl(null),
            categoryOptions: [
                { label: 'Diatomic Nonmetal', value: 'diatomic nonmetal' },
                { label: 'Noble Gas', value: 'noble gas' },
                { label: 'Alkali Metal', value: 'alkali metal' },
                { label: 'Alkaline Earth Metal', value: 'alkaline earth metal' },
                { label: 'Metalloid', value: 'metalloid' },
                { label: 'Polyatomic Nonmetal', value: 'polyatomic nonmetal' },
                { label: 'Post-Transition Metal', value: 'post-transition metal' },
                { label: 'Transition Metal', value: 'transition metal' },
                { label: 'Lanthanide', value: 'lanthanide' },
                { label: 'Actinide', value: 'actinide' },
            ],
            categoryFilterFn: (data: any, filterValue: string[]) => {
                return filterValue.some(val => data.category === val);
            },
            nameCtrl: new FormControl(''),
            nameCtrlDebounce: 500,
            nameFilterFn: (data: any, filterValue: string) => {
                return data.name.toLowerCase().includes(filterValue.toLowerCase());
            }
        },
        template: `
        <amx-grid ${argsToTemplate(args)}>
            <ng-template amxGridFiltersContainer>
                <div style="display: flex; gap: 16px; padding: 16px 24px;">
                    <mat-form-field subscriptSizing="dynamic" appearance="outline" floatLabel="always">
                        <mat-label>Name</mat-label>
                        <input
                            amxGridFilter="name"
                            [amxGridFilterCompareWith]="nameFilterFn"
                            [amxGridFilterDebounce]="nameCtrlDebounce"
                            [formControl]="nameCtrl"
                            matInput
                            placeholder="Filter by name"
                            type="text" />
                    </mat-form-field>
                    <mat-form-field subscriptSizing="dynamic" appearance="outline" floatLabel="always">
                        <mat-label>Category</mat-label>
                        <mat-select
                            amxGridFilter="category"
                            [amxGridFilterCompareWith]="categoryFilterFn"
                            [formControl]="categoryCtrl"
                            [multiple]="true"
                            placeholder="Filter by category"
                        >
                            <mat-option *ngFor="let option of categoryOptions" [value]="option.value">
                                {{ option.label }}
                            </mat-option>
                        </mat-select>
                    </mat-form-field>
                </div>
            </ng-template>
        </amx-grid>
        `,
    }),
};
export default meta;

type Story = StoryObj<AmxGrid>;
export const Basic: Story = {};

import { StoryObj } from '@storybook/angular';
import { AmxGrid } from './grid.component';
import periodicData from '../../documentation/periodic-table.json';

const meta = {
    title: 'Components/Grid',
    component: AmxGrid,
    tags: ['autodocs'],
    args: {
        dataSource: periodicData,
        columnDefinitions: [
            { id: 'number', field: 'number', headerName: 'Number', type: 'number' },
            { id: 'name', field: 'name', headerName: 'Name', type: 'string' },
            { id: 'symbol', field: 'symbol', headerName: 'Symbol', type: 'string' },
            { id: 'weight', field: 'atomic_mass', headerName: 'Weight', type: 'number' },
            { id: 'category', field: 'category', headerName: 'Category', type: 'string' },
            { id: 'group', field: 'group', headerName: 'Group', type: 'string' },
            { id: 'period', field: 'period', headerName: 'Period', type: 'number' },
            { id: "discovered_by", field: "discovered_by", headerName: "Discovered By", type: "string" },
            { id: "named_by", field: "named_by", headerName: "Named By", type: "string" }
        ],
        stickyHeader: false
    }
};
export default meta;

type Story = StoryObj<AmxGrid>;
export const Basic: Story = {};

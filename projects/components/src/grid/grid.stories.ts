import { StoryObj } from '@storybook/angular';
import { AmxGrid } from './grid.component';

const meta = {
    title: 'Components/Grid',
    component: AmxGrid,
    tags: ['autodocs'],
    args: {
        columnDefinitions: [
            { id: 'atomicNumber', field: 'atomicNumber', headerName: 'Atomic Number', type: 'number' },
            { id: 'name', field: 'name', headerName: 'Name', type: 'string' },
            { id: 'symbol', field: 'symbol', headerName: 'Symbol', type: 'string' },
            { id: 'weight', field: 'weight', headerName: 'Weight', type: 'number' }
        ]
    }
};
export default meta;

type Story = StoryObj<AmxGrid>;
export const Basic: Story = {};

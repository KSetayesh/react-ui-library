import type { Meta, StoryObj } from '@storybook/react';
import CheckBoxComponent from './Checkbox';

const meta = {
    title: 'Components/Checkbox',
    component: CheckBoxComponent,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        checked: {
            control: 'boolean',
            description: 'Whether the checkbox is checked',
        },
        label: {
            control: 'text',
            description: 'Label displayed next to the checkbox',
        },
        name: {
            control: 'text',
            description: 'Name attribute of the checkbox',
        },
        onChange: { action: 'changed' },
    },
} satisfies Meta<typeof CheckBoxComponent>;  // Fixed here

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: 'default-checkbox',
        checked: false,
        label: 'Default Checkbox',
        onChange: () => { }
    },
};

export const Checked: Story = {
    args: {
        name: 'checked-checkbox',
        checked: true,
        label: 'Checked Checkbox',
        onChange: () => { }
    },
};

export const WithLongLabel: Story = {
    args: {
        name: 'long-label-checkbox',
        checked: false,
        label: 'This is a checkbox with a much longer label that demonstrates how the component handles longer text',
        onChange: () => { }
    },
};

export const Required: Story = {
    args: {
        name: 'required-checkbox',
        checked: false,
        label: 'Required Checkbox *',
        onChange: () => { }
    },
};
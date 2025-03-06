import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import CheckBoxComponent, { CheckBoxComponentProps } from './Checkbox';

// Create a wrapper component that manages its own state
const CheckboxWithState = (args: CheckBoxComponentProps) => {
    const [checked, setChecked] = useState(args.checked || false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        args.onChange && args.onChange(event);
    };

    // Return a regular JavaScript object instead of JSX directly
    const props = {
        ...args,
        checked,
        onChange: handleChange
    };

    // Render the component with the modified props
    return React.createElement(CheckBoxComponent, props);
};

const meta = {
    title: 'Components/Checkbox',
    component: CheckboxWithState,
    parameters: {
        componentSubtitle: 'Checkbox Component',
        docs: {
            description: {
                component: 'A Material UI based checkbox component with custom styling.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        checked: {
            control: 'boolean',
            description: 'Whether the checkbox is checked',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            }
        },
        label: {
            control: 'text',
            description: 'Label displayed next to the checkbox',
            table: {
                type: { summary: 'string' },
            }
        },
        name: {
            control: 'text',
            description: 'Name attribute of the checkbox',
            table: {
                type: { summary: 'string' },
            }
        },
        onChange: {
            action: 'changed',
            description: 'Function called when the checkbox state changes'
        },
    },
} as Meta<typeof CheckBoxComponent>;

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
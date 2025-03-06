import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import RadioButtonComponent, { RadioButtonComponentProps } from './RadioButton';

// Create a wrapper component that manages its own state
const RadioButtonWithState = (args: RadioButtonComponentProps) => {
    const [value, setValue] = useState(args.value || '');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        args.onChange && args.onChange(event);
    };

    // Return a regular JavaScript object instead of JSX directly
    const props = {
        ...args,
        value,
        onChange: handleChange
    };

    // Render the component with the modified props
    return React.createElement(RadioButtonComponent, props);

};

// Define meta configuration
const meta = {
    title: 'Components/RadioButton',
    component: RadioButtonWithState,
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: 'Radio Button Component',
        docs: {
            description: {
                component: 'A Material UI based radio button group component with custom styling.'
            }
        }
    },
    argTypes: {
        name: {
            control: 'text',
            description: 'Name attribute of the radio button group',
            table: {
                type: { summary: 'string' },
            }
        },
        value: {
            control: 'text',
            description: 'Currently selected value',
            table: {
                type: { summary: 'string | number' },
            }
        },
        label: {
            control: 'text',
            description: 'Label for the radio button group',
            table: {
                type: { summary: 'string' },
            }
        },
        options: {
            control: 'object',
            description: 'Array of options for the radio buttons',
            table: {
                type: { summary: 'Array<{ value: string | number, label: string }>' },
            }
        },
        onChange: {
            action: 'changed',
            description: 'Function called when selection changes'
        },
    },
} as Meta<typeof RadioButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic radio button group with default options
export const Default: Story = {
    args: {
        name: 'default-radio',
        value: 'option1',
        label: 'Select an option',
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
        ],
    },
    parameters: {
        docs: {
            storyDescription: 'Basic radio button group with three options',
        }
    },
};

// Radio button group with a different default selection
export const DifferentSelection: Story = {
    args: {
        name: 'selection-radio',
        value: 'option2',
        label: 'Select an option',
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
        ],
    },
    parameters: {
        docs: {
            storyDescription: 'Radio button group with second option pre-selected',
        }
    },
};

// Radio button group with numeric values
export const NumericValues: Story = {
    args: {
        name: 'numeric-radio',
        value: 1,
        label: 'Select a number',
        options: [
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
            { value: 3, label: 'Three' },
        ],
    },
    parameters: {
        docs: {
            storyDescription: 'Radio button group with numeric values',
        }
    },
};

// Radio button group with many options
export const ManyOptions: Story = {
    args: {
        name: 'many-options-radio',
        value: 'option1',
        label: 'Select from many options',
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
            { value: 'option4', label: 'Option 4' },
            { value: 'option5', label: 'Option 5' },
            { value: 'option6', label: 'Option 6' },
        ],
    },
    parameters: {
        docs: {
            storyDescription: 'Radio button group with many options to demonstrate how they wrap',
        }
    },
};

// Radio button group with long labels
export const LongLabels: Story = {
    args: {
        name: 'long-labels-radio',
        value: 'option1',
        label: 'Select an option with long descriptions',
        options: [
            { value: 'option1', label: 'This is a very long description for the first option that might wrap to multiple lines' },
            { value: 'option2', label: 'This is another long description for the second option to show how long text is handled' },
            { value: 'option3', label: 'A third option with an extensive description to demonstrate text wrapping behavior' },
        ],
    },
    parameters: {
        docs: {
            storyDescription: 'Radio button group with long labels to demonstrate text wrapping',
        }
    },
};
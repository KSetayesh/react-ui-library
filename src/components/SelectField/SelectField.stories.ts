import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import SelectFieldComponent, { SelectFieldComponentProps } from './SelectField';
import { SelectChangeEvent } from '@mui/material';

// Create a wrapper component that manages its own state
const SelectFieldWithState = (args: SelectFieldComponentProps) => {
    const [value, setValue] = useState(args.value || '');

    const handleChange = (event: SelectChangeEvent<string | number>) => {
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
    return React.createElement(SelectFieldComponent, props);

};

// Define meta configuration
const meta = {
    title: 'Components/SelectField',
    component: SelectFieldWithState,
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: 'Select Field Component',
        docs: {
            description: {
                component: 'A Material UI based select field component with custom styling.'
            }
        }
    },
    argTypes: {
        name: {
            control: 'text',
            description: 'Name attribute of the select field',
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
        placeholder: {
            control: 'text',
            description: 'Placeholder/label text for the select field',
            table: {
                type: { summary: 'string' },
            }
        },
        options: {
            control: 'object',
            description: 'Array of options for the select field',
            table: {
                type: { summary: 'Array<{ value: string | number, label: string }>' },
            }
        },
        onChange: {
            action: 'changed',
            description: 'Function called when selection changes'
        },
    },
} as Meta<typeof SelectFieldComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic select field with string options
export const Default: Story = {
    args: {
        name: 'default-select',
        value: '',
        placeholder: 'Select an option',
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
        ],
    },
    parameters: {
        docs: {
            storyDescription: 'Basic select field with three options',
        }
    },
};

// Select field with a preselected value
export const WithPreselectedValue: Story = {
    args: {
        name: 'preselected-select',
        value: 'option2',
        placeholder: 'Select an option',
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
        ],
    },
    parameters: {
        docs: {
            storyDescription: 'Select field with a preselected value',
        }
    },
};

// Select field with numeric values
export const NumericValues: Story = {
    args: {
        name: 'numeric-select',
        value: 1,
        placeholder: 'Select a number',
        options: [
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
            { value: 3, label: 'Three' },
            { value: 4, label: 'Four' },
            { value: 5, label: 'Five' },
        ],
    },
    parameters: {
        docs: {
            storyDescription: 'Select field with numeric values',
        }
    },
};

// Select field with many options
export const ManyOptions: Story = {
    args: {
        name: 'many-options-select',
        value: '',
        placeholder: 'Select from many options',
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
            { value: 'option4', label: 'Option 4' },
            { value: 'option5', label: 'Option 5' },
            { value: 'option6', label: 'Option 6' },
            { value: 'option7', label: 'Option 7' },
            { value: 'option8', label: 'Option 8' },
            { value: 'option9', label: 'Option 9' },
            { value: 'option10', label: 'Option 10' },
            { value: 'option11', label: 'Option 11' },
            { value: 'option12', label: 'Option 12' },
            { value: 'option13', label: 'Option 13' },
            { value: 'option14', label: 'Option 14' },
            { value: 'option15', label: 'Option 15' },
            { value: 'option16', label: 'Option 16' },
            { value: 'option17', label: 'Option 17' },
            { value: 'option18', label: 'Option 18' },
            { value: 'option19', label: 'Option 19' },
            { value: 'option20', label: 'Option 20' },
        ],
    },
    parameters: {
        docs: {
            storyDescription: 'Select field with many options to demonstrate scrolling behavior',
        }
    },
};

// Select field with long option labels
export const LongLabels: Story = {
    args: {
        name: 'long-labels-select',
        value: '',
        placeholder: 'Select an item with a long description',
        options: [
            { value: 'item1', label: 'This is a very long description for the first item that might get truncated' },
            { value: 'item2', label: 'Another lengthy option description to demonstrate text handling within the dropdown' },
            { value: 'item3', label: 'A third option with substantial text to show overflow handling in menus' },
        ],
    },
    parameters: {
        docs: {
            storyDescription: 'Select field with long option labels to demonstrate text handling',
        }
    },
};

// Select field with a custom placeholder
export const CustomPlaceholder: Story = {
    args: {
        name: 'custom-placeholder-select',
        value: '',
        placeholder: 'Please choose one of the following options...',
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
        ],
    },
    parameters: {
        docs: {
            storyDescription: 'Select field with a custom, more detailed placeholder',
        }
    },
};
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import TextFieldComponent, { TextFieldComponentProps } from './TextField';

// Create a wrapper component that manages its own state
const TextFieldWithState = (args: TextFieldComponentProps) => {
    const [value, setValue] = useState(args.value || '');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    return React.createElement(TextFieldComponent, props);

};

// Define meta configuration
const meta = {
    title: 'Components/TextField',
    component: TextFieldWithState,
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: 'Text Field Component',
        docs: {
            description: {
                component: 'A Material UI based text field component with custom styling.'
            }
        }
    },
    argTypes: {
        name: {
            control: 'text',
            description: 'Name attribute of the text field',
            table: {
                type: { summary: 'string' },
            }
        },
        value: {
            control: 'text',
            description: 'Current value of the text field',
            table: {
                type: { summary: 'string | number' },
            }
        },
        type: {
            control: 'select',
            options: ['text', 'number'],
            description: 'Type of the text field',
            table: {
                type: { summary: 'text | number' },
                defaultValue: { summary: 'text' },
            }
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder/label text for the text field',
            table: {
                type: { summary: 'string' },
            }
        },
        step: {
            control: 'text',
            description: 'Step attribute for number input',
            table: {
                type: { summary: 'string' },
            }
        },
        onChange: {
            action: 'changed',
            description: 'Function called when input value changes'
        },
    },
} as Meta<typeof TextFieldComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic text field
export const Default: Story = {
    args: {
        name: 'default-text',
        value: '',
        placeholder: 'Enter text',
        type: 'text',
    },
    parameters: {
        docs: {
            storyDescription: 'Basic text field with default styling',
        }
    },
};

// Text field with initial value
export const WithInitialValue: Story = {
    args: {
        name: 'prefilled-text',
        value: 'Initial text value',
        placeholder: 'Enter text',
        type: 'text',
    },
    parameters: {
        docs: {
            storyDescription: 'Text field with an initial value',
        }
    },
};

// Number input field
export const NumberInput: Story = {
    args: {
        name: 'number-input',
        value: '',
        placeholder: 'Enter a number',
        type: 'number',
        step: '1',
    },
    parameters: {
        docs: {
            storyDescription: 'Number input field with step control',
        }
    },
};

// Number input with initial value
export const NumberInputWithValue: Story = {
    args: {
        name: 'number-input-value',
        value: 42,
        placeholder: 'Enter a number',
        type: 'number',
        step: '1',
    },
    parameters: {
        docs: {
            storyDescription: 'Number input field with an initial value',
        }
    },
};

// Number input with decimal step
export const DecimalNumberInput: Story = {
    args: {
        name: 'decimal-number',
        value: 0,
        placeholder: 'Enter a decimal number',
        type: 'number',
        step: '0.01',
    },
    parameters: {
        docs: {
            storyDescription: 'Number input field with decimal precision',
        }
    },
};

// Text field with long placeholder
export const LongPlaceholder: Story = {
    args: {
        name: 'long-placeholder',
        value: '',
        placeholder: 'This is a very long placeholder text to demonstrate how it appears in the component',
        type: 'text',
    },
    parameters: {
        docs: {
            storyDescription: 'Text field with a long placeholder to show label text handling',
        }
    },
};
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ToggleSwitchComponent, { ToggleSwitchProps, SwitchSize, SwitchColor } from './ToggleSwitch';

// Create a wrapper component that manages its own state
const ToggleSwitchWithState = (args: ToggleSwitchProps) => {
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
    return React.createElement(ToggleSwitchComponent, props);

};

const meta = {
    title: 'Components/ToggleSwitch',
    component: ToggleSwitchWithState,
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: 'Toggle Switch Component',
        layout: 'centered',
        docs: {
            description: {
                component: 'A Material UI based toggle switch component with custom styling and theming options.'
            }
        }
    },
    argTypes: {
        name: {
            control: 'text',
            description: 'Name attribute of the toggle switch',
            table: {
                type: { summary: 'string' },
            }
        },
        checked: {
            control: 'boolean',
            description: 'Whether the switch is checked/on',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            }
        },
        label: {
            control: 'text',
            description: 'Label displayed next to the switch',
            table: {
                type: { summary: 'string' },
            }
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the switch is disabled',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            }
        },
        size: {
            control: 'select',
            options: Object.values(SwitchSize),
            description: 'Size of the switch component',
            table: {
                type: { summary: 'SwitchSize' },
                defaultValue: { summary: SwitchSize.MEDIUM },
            }
        },
        color: {
            control: 'select',
            options: Object.values(SwitchColor),
            description: 'Theme variant to use for the switch',
            table: {
                type: { summary: 'SwitchColor' },
                defaultValue: { summary: SwitchColor.PRIMARY },
            }
        },
        onChange: {
            action: 'changed',
            description: 'Function called when the switch state changes'
        },
    },
} as Meta<typeof ToggleSwitchComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic switch with default styling
export const Default: Story = {
    args: {
        name: 'default-switch',
        checked: false,
        label: 'Toggle me',
    },
    parameters: {
        docs: {
            storyDescription: 'Basic toggle switch with default styling',
        }
    },
};

// Switch that's initially turned on
export const InitiallyOn: Story = {
    args: {
        name: 'on-switch',
        checked: true,
        label: 'I am switched on',
    },
    parameters: {
        docs: {
            storyDescription: 'Toggle switch that begins in the on position',
        }
    },
};

// Small-sized switch
export const SmallSize: Story = {
    args: {
        name: 'small-switch',
        checked: false,
        label: 'Small switch',
        size: SwitchSize.SMALL,
    },
    parameters: {
        docs: {
            storyDescription: 'Toggle switch with small size variant',
        }
    },
};

// Disabled switch
export const Disabled: Story = {
    args: {
        name: 'disabled-switch',
        checked: false,
        label: 'Cannot toggle me',
        disabled: true,
    },
    parameters: {
        docs: {
            storyDescription: 'Disabled toggle switch that cannot be interacted with',
        }
    },
};

// Disabled and checked switch
export const DisabledAndChecked: Story = {
    args: {
        name: 'disabled-checked-switch',
        checked: true,
        label: 'Cannot toggle me off',
        disabled: true,
    },
    parameters: {
        docs: {
            storyDescription: 'Disabled toggle switch in the on position',
        }
    },
};

export const PrimaryColor: Story = {
    args: {
        name: 'primary-switch',
        checked: true,
        label: 'Primary theme',
        color: SwitchColor.PRIMARY,
    },
    parameters: {
        docs: {
            storyDescription: 'Toggle switch with primary theme',
        }
    },
};

export const SecondaryColor: Story = {
    args: {
        name: 'secondary-switch',
        checked: true,
        label: 'Secondary theme',
        color: SwitchColor.SECONDARY,
    },
    parameters: {
        docs: {
            storyDescription: 'Toggle switch with secondary theme',
        }
    },
};

export const SuccessColor: Story = {
    args: {
        name: 'success-switch',
        checked: true,
        label: 'Success theme',
        color: SwitchColor.SUCCESS,
    },
    parameters: {
        docs: {
            storyDescription: 'Toggle switch with success theme',
        }
    },
};

export const ErrorColor: Story = {
    args: {
        name: 'error-switch',
        checked: true,
        label: 'Error theme',
        color: SwitchColor.ERROR,
    },
    parameters: {
        docs: {
            storyDescription: 'Toggle switch with error theme',
        }
    },
};

export const WarningColor: Story = {
    args: {
        name: 'warning-switch',
        checked: true,
        label: 'Warning theme',
        color: SwitchColor.WARNING,
    },
    parameters: {
        docs: {
            storyDescription: 'Toggle switch with warning theme',
        }
    },
};

export const InfoColor: Story = {
    args: {
        name: 'info-switch',
        checked: true,
        label: 'Info theme',
        color: SwitchColor.INFO,
    },
    parameters: {
        docs: {
            storyDescription: 'Toggle switch with info theme',
        }
    },
};

export const DefaultColor: Story = {
    args: {
        name: 'default-switch',
        checked: true,
        label: 'Default theme',
        color: SwitchColor.DEFAULT,
    },
    parameters: {
        docs: {
            storyDescription: 'Toggle switch with default theme',
        }
    },
};

// With long label
export const LongLabel: Story = {
    args: {
        name: 'long-label-switch',
        checked: false,
        label: 'This is a switch with a much longer label text to demonstrate how the component handles extended text content',
    },
    parameters: {
        docs: {
            storyDescription: 'Toggle switch with a long label to demonstrate text wrapping',
        }
    },
};
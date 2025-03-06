import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@mui/material';
import EnhancedTooltip from './ToolTip';

// Create a wrapper component if needed
const TooltipWrapper = (args: any) => {
    // Modify args to match the new button prop structure
    const buttonArgs = args.buttonText
        ? {
            button: {
                buttonText: args.buttonText,
                onButtonClick: () => console.log(`${args.buttonText} clicked`)
            }
        }
        : {};

    return React.createElement(EnhancedTooltip, {
        ...args,
        ...buttonArgs,
        children: React.createElement(Button, { variant: 'contained' }, 'Hover Me')
    });
};

const meta = {
    title: 'Components/EnhancedTooltip',
    component: TooltipWrapper,
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: 'Enhanced Tooltip Component',
        layout: 'centered',
        docs: {
            description: {
                component: 'A customizable tooltip component with advanced styling and placement options.'
            }
        }
    },
    argTypes: {
        title: {
            control: 'text',
            description: 'The main title of the tooltip',
            table: {
                type: { summary: 'string' },
            }
        },
        description: {
            control: 'text',
            description: 'Optional detailed description for the tooltip',
            table: {
                type: { summary: 'string' },
            }
        },
        placement: {
            control: 'select',
            options: [
                'bottom', 'bottom-end', 'bottom-start',
                'left', 'left-end', 'left-start',
                'right', 'right-end', 'right-start',
                'top', 'top-end', 'top-start'
            ],
            description: 'Placement of the tooltip',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'bottom' },
            }
        },
        buttonText: {
            control: 'text',
            description: 'Text displayed on the button (used to construct button prop)',
            table: {
                type: { summary: 'string' },
            }
        },
    },
} as Meta<typeof EnhancedTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic tooltip
export const Default: Story = {
    args: {
        title: 'Simple Tooltip',
        description: 'This is a default tooltip with a descriptive text.',
        button: {
            buttonText: '', // Purposely put empty string, to make sure it defaults to "Button"
            onButtonClick() {
                return;
            },
        }
    },
    parameters: {
        docs: {
            storyDescription: 'Basic tooltip with default styling',
        }
    },
};

// Tooltip with description
export const WithDescription: Story = {
    args: {
        title: 'Advanced Tooltip',
        description: 'This is a more detailed explanation of the tooltip content. It provides additional context and information.',
        button: {
            buttonText: 'Button',
            onButtonClick() {
                return;
            },
        }
    },
    parameters: {
        docs: {
            storyDescription: 'Tooltip with an additional descriptive text',
        }
    },
};

// Tooltip placements
export const TopPlacement: Story = {
    args: {
        title: 'Top Placement',
        description: 'Tooltip positioned above the element with descriptive text.',
        placement: 'top',
        button: {
            buttonText: 'Button',
            onButtonClick() {
                return;
            },
        }
    },
    parameters: {
        docs: {
            storyDescription: 'Tooltip positioned above the element',
        }
    },
};

export const RightPlacement: Story = {
    args: {
        title: 'Right Placement',
        description: 'Tooltip positioned to the right of the element with additional details.',
        placement: 'right',
        button: {
            buttonText: 'Button',
            onButtonClick() {
                return;
            },
        }
    },
    parameters: {
        docs: {
            storyDescription: 'Tooltip positioned to the right of the element',
        }
    },
};

export const BottomPlacement: Story = {
    args: {
        title: 'Bottom Placement',
        description: 'Tooltip positioned below the element with explanatory text.',
        placement: 'bottom',
        button: {
            buttonText: 'Button',
            onButtonClick() {
                return;
            },
        }
    },
    parameters: {
        docs: {
            storyDescription: 'Tooltip positioned below the element',
        }
    },
};

export const LeftPlacement: Story = {
    args: {
        title: 'Left Placement',
        description: 'Tooltip positioned to the left of the element with contextual information.',
        placement: 'left',
        button: {
            buttonText: 'Button',
            onButtonClick() {
                return;
            },
        }
    },
    parameters: {
        docs: {
            storyDescription: 'Tooltip positioned to the left of the element',
        }
    },
};

// Long content tooltip
export const LongContent: Story = {
    args: {
        title: 'Comprehensive Tooltip',
        description: 'This is a very long description that demonstrates how the tooltip handles extensive text content while maintaining readability and visual appeal. It shows how the component can accommodate more detailed explanations.',
        button: {
            buttonText: 'Button',
            onButtonClick() {
                return;
            },
        }
    },
    parameters: {
        docs: {
            storyDescription: 'Tooltip with extensive content to show text handling',
        }
    },
};

// Tooltip with custom button
export const CustomButton: Story = {
    args: {
        title: 'Custom Button Tooltip',
        description: 'This tooltip demonstrates a custom button with a unique action.',
        button: {
            buttonText: 'Button',
            onButtonClick() {
                return;
            },
        }
    },
    parameters: {
        docs: {
            storyDescription: 'Tooltip with a customized button text',
        }
    },
};

// Tooltip without button
export const NoButton: Story = {
    args: {
        title: 'Tooltip Without Button',
        description: 'This tooltip demonstrates a tooltip that does not have a button.',
    },
    parameters: {
        docs: {
            storyDescription: 'Tooltip without a button action',
        }
    },
};
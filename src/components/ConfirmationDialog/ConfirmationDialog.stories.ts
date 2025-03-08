import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState, JSX } from 'react';

import ConfirmationDialog from './ConfirmationDialog';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Components/ConfirmationDialog',
    component: ConfirmationDialog,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        open: {
            control: 'boolean',
        },
        title: {
            control: 'text',
        },
        content: {
            control: 'text',
        },
        onClose: { action: 'closed' },
        onConfirm: { action: 'confirmed' },
    },
    args: {
        open: true,
        onClose: fn(),
        onConfirm: fn(),
        title: 'Confirm Action',
        content: 'Are you sure you want to proceed?',
    },
} satisfies Meta<typeof ConfirmationDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const Default: Story = {
//     args: {
//         open: false,
//         title: 'Confirm Action',
//         content: 'Are you sure you want to proceed?',
//     },
// };

// export const Open: Story = {
//     args: {
//         open: false,
//         title: 'Open Dialog',
//         content: 'This dialog is open.',
//     },
// };

// export const Closed: Story = {
//     args: {
//         open: false,
//         title: 'Closed Dialog',
//         content: 'This dialog is closed.',
//     },
// };

const ClickMeButtonStory = (args: any) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleConfirm = () => {
        setOpen(false);
        console.log('Confirmed');
    };

    return React.createElement(React.Fragment, null,
        React.createElement('button', { onClick: () => setOpen(true) }, 'Click Me'),
        React.createElement(ConfirmationDialog, {
            open: open,
            onClose: handleClose,
            onConfirm: handleConfirm,
            title: 'Confirm Action',
            content: 'Are you sure you want to proceed?'
        }),
    );
};

export const ClickMeButton: Story = {
    render: () => React.createElement(ClickMeButtonStory),
};
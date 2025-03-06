// import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';

// import { Button } from './Button';

// // More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
// const meta = {
//     title: 'Example/Button',
//     component: Button,
//     parameters: {
//         // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
//         layout: 'centered',
//     },
//     // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
//     tags: ['autodocs'],
//     // More on argTypes: https://storybook.js.org/docs/api/argtypes
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
//     // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
//     args: { onClick: fn() },
// } satisfies Meta<typeof Button>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// export const Primary: Story = {
//     args: {
//         primary: true,
//         label: 'Button',
//     },
// };

// export const Secondary: Story = {
//     args: {
//         label: 'Button',
//     },
// };

// export const Large: Story = {
//     args: {
//         size: 'large',
//         label: 'Button',
//     },
// };

// export const Small: Story = {
//     args: {
//         size: 'small',
//         label: 'Button',
//     },
// };

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { CustomButtonComponent } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Components/Button',
    component: CustomButtonComponent,
    parameters: {
        // Optional parameter to center the component in the Canvas
        layout: 'centered',
    },
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        // Remove backgroundColor control as it's now handled by the styled component
        variant: {
            control: 'select',
            options: ['contained', 'outlined', 'text']
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large']
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'error', 'info', 'warning']
        },
        disabled: {
            control: 'boolean'
        }
    },
    args: { onClick: fn() },
} satisfies Meta<typeof CustomButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Updated stories with appropriate args for MUI Button
export const Primary: Story = {
    args: {
        variant: 'contained',
        buttonTitle: 'Primary Button',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'outlined',
        buttonTitle: 'Secondary Button',
    },
};

export const Large: Story = {
    args: {
        size: 'large',
        buttonTitle: 'Large Button',
    },
};

export const Small: Story = {
    args: {
        size: 'small',
        buttonTitle: 'Small Button',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        buttonTitle: 'Disabled Button',
    },
};

export const TextButton: Story = {
    args: {
        variant: 'text',
        buttonTitle: 'Text Button',
    },
};
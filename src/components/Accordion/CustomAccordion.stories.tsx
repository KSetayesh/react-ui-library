import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

// Material-UI imports
import {
    Box,
    TextField,
    Button,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    useTheme
} from '@mui/material';

// Icon imports
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Component import
import CustomAccordion from './CustomAccordion';

const meta: Meta<typeof CustomAccordion> = {
    title: 'Components/CustomAccordion',
    component: CustomAccordion,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A customizable accordion component that can contain any type of content.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            description: 'The title of the accordion',
            control: 'text',
        },
        subtitle: {
            description: 'Optional subtitle text displayed below the title',
            control: 'text',
        },
        icon: {
            description: 'Optional icon displayed before the title',
            control: { disable: true },
        },
        defaultExpanded: {
            description: 'Whether the accordion is expanded by default',
            control: 'boolean',
        },
        children: {
            description: 'The content of the accordion',
            control: { disable: true },
        },
        onEdit: {
            description: 'Callback fired when the edit button is clicked',
            action: 'edited',
        },
        onDelete: {
            description: 'Callback fired when the delete button is clicked',
            action: 'deleted',
        },
        showActions: {
            description: 'Whether to show the edit and delete buttons',
            control: 'boolean',
        },
        elevation: {
            description: 'The elevation of the accordion',
            control: { type: 'range', min: 0, max: 24, step: 1 },
        },
        disabled: {
            description: 'Whether the accordion is disabled',
            control: 'boolean',
        },
        className: {
            description: 'Additional CSS class name',
            control: 'text',
        },
        headerBackgroundColor: {
            description: 'Background color of the accordion header',
            control: 'color',
        },
    },
    args: {
        title: 'Accordion Title',
        subtitle: 'Optional subtitle text',
        defaultExpanded: false,
        showActions: true,
        elevation: 2,
        disabled: false,
        headerBackgroundColor: '',
    },
};

export default meta;
type Story = StoryObj<typeof CustomAccordion>;

// Basic example with text content
export const Basic: Story = {
    args: {
        title: 'Basic Accordion',
        subtitle: 'With simple text content',
        icon: <InfoIcon />,
        children: (
            <Typography variant="body1">
                This is a basic accordion with simple text content. The accordion component
                is designed to be flexible and can contain any type of content.
            </Typography>
        ),
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByText('Basic Accordion'));
    },
};

// Example with form content
export const WithForm: Story = {
    args: {
        title: 'Contact Form',
        subtitle: 'Fill out the form below',
        icon: <PersonIcon />,
        headerBackgroundColor: '#e3f2fd',
        children: (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Name" fullWidth />
                <TextField label="Email" fullWidth type="email" />
                <TextField label="Message" fullWidth multiline rows={4} />
                <Button variant="contained" color="primary">
                    Submit
                </Button>
            </Box>
        ),
    },
};

// Example with list content
export const WithList: Story = {
    args: {
        title: 'Benefits',
        icon: <AttachMoneyIcon />,
        headerBackgroundColor: '#fff8e1',
        children: (
            <List>
                {[
                    'Higher returns on investment',
                    'Improved user experience',
                    'Better performance metrics',
                    'Enhanced security features',
                    'Simplified maintenance'
                ].map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem>
                            <ListItemIcon>
                                <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                        </ListItem>
                        {index < 4 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
        ),
    },
};

// Example with nested accordions
export const NestedAccordions: Story = {
    args: {
        title: 'Parent Accordion',
        icon: <HomeIcon />,
        defaultExpanded: true,
        children: (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body1" paragraph>
                    This accordion contains nested child accordions. You can create complex
                    hierarchical structures using this pattern.
                </Typography>
                <CustomAccordion
                    title="Child Accordion 1"
                    headerBackgroundColor="#f5f5f5"
                    elevation={1}
                >
                    <Typography variant="body2">
                        This is the content of the first child accordion.
                    </Typography>
                </CustomAccordion>
                <CustomAccordion
                    title="Child Accordion 2"
                    headerBackgroundColor="#f5f5f5"
                    elevation={1}
                >
                    <Typography variant="body2">
                        This is the content of the second child accordion.
                    </Typography>
                </CustomAccordion>
            </Box>
        ),
    },
};

// Disabled example
export const Disabled: Story = {
    args: {
        title: 'Disabled Accordion',
        subtitle: 'This accordion cannot be interacted with',
        disabled: true,
        children: (
            <Typography variant="body1">
                This content is not accessible because the accordion is disabled.
            </Typography>
        ),
    },
};

// Actions example
export const WithActions: Story = {
    args: {
        title: 'Accordion with Actions',
        subtitle: 'Shows edit and delete buttons when expanded',
        showActions: true,
        defaultExpanded: true,
        children: (
            <Typography variant="body1">
                This accordion displays action buttons (edit and delete) when expanded.
                Try clicking on the buttons in the header.
            </Typography>
        ),
    },
};

// Custom styled example
export const CustomStyling: Story = {
    args: {
        title: 'Custom Styled Accordion',
        headerBackgroundColor: '#4caf50',
        elevation: 8,
        children: (
            <Box sx={{ p: 2, backgroundColor: '#f1f8e9', borderRadius: 1 }}>
                <Typography variant="body1" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                    This accordion has custom styling applied to both the header and content.
                </Typography>
            </Box>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'This example demonstrates how to apply custom styling to the accordion.',
            },
        },
    },
};

// Example with different theme colors
export const ThemeColors: Story = {
    render: () => {
        const theme = useTheme();
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600 }}>
                <CustomAccordion
                    title="Primary Color"
                    headerBackgroundColor={theme.palette.primary.light}
                    defaultExpanded
                >
                    <Box sx={{ p: 2, backgroundColor: theme.palette.primary.main, color: 'white', borderRadius: 1 }}>
                        <Typography>Primary theme color content</Typography>
                    </Box>
                </CustomAccordion>

                <CustomAccordion
                    title="Secondary Color"
                    headerBackgroundColor={theme.palette.secondary.light}
                >
                    <Box sx={{ p: 2, backgroundColor: theme.palette.secondary.main, color: 'white', borderRadius: 1 }}>
                        <Typography>Secondary theme color content</Typography>
                    </Box>
                </CustomAccordion>

                <CustomAccordion
                    title="Error Color"
                    headerBackgroundColor={theme.palette.error.light}
                >
                    <Box sx={{ p: 2, backgroundColor: theme.palette.error.main, color: 'white', borderRadius: 1 }}>
                        <Typography>Error theme color content</Typography>
                    </Box>
                </CustomAccordion>

                <CustomAccordion
                    title="Warning Color"
                    headerBackgroundColor={theme.palette.warning.light}
                >
                    <Box sx={{ p: 2, backgroundColor: theme.palette.warning.main, color: 'white', borderRadius: 1 }}>
                        <Typography>Warning theme color content</Typography>
                    </Box>
                </CustomAccordion>

                <CustomAccordion
                    title="Info Color"
                    headerBackgroundColor={theme.palette.info.light}
                >
                    <Box sx={{ p: 2, backgroundColor: theme.palette.info.main, color: 'white', borderRadius: 1 }}>
                        <Typography>Info theme color content</Typography>
                    </Box>
                </CustomAccordion>

                <CustomAccordion
                    title="Success Color"
                    headerBackgroundColor={theme.palette.success.light}
                >
                    <Box sx={{ p: 2, backgroundColor: theme.palette.success.main, color: 'white', borderRadius: 1 }}>
                        <Typography>Success theme color content</Typography>
                    </Box>
                </CustomAccordion>
            </Box>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'This example shows the accordion with different theme colors.',
            },
        },
    },
};
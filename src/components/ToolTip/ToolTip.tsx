import React from 'react';
import {
    Tooltip,
    TooltipProps,
    Button,
    Typography,
    Box,
    Link
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom styled tooltip
const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .MuiTooltip-tooltip`]: {
        backgroundColor: '#2C2C2C', // Slightly lighter dark background
        color: '#FFFFFF',
        maxWidth: 320,
        padding: theme.spacing(2),
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        fontSize: '14px',
    },
}));

interface ToolTipButton {
    buttonText: string;
    onButtonClick: () => void;
}

// Enhanced Tooltip Component
interface EnhancedTooltipProps extends Omit<TooltipProps, 'title'> {
    title: string;
    description?: string;
    onLearnMore?: () => void;
    button?: ToolTipButton;
}

const ModernTooltip: React.FC<EnhancedTooltipProps> = ({
    title,
    children,
    description,
    onLearnMore,
    button,
    ...props
}) => {
    return (
        <CustomTooltip
            title={
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        alignItems: 'stretch'
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
                            {title}
                        </Typography>
                        {description && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'rgba(255,255,255,0.7)',
                                    lineHeight: 1.4
                                }}
                            >
                                {description}
                            </Typography>
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Link
                            component="button"
                            onClick={onLearnMore}
                            sx={{
                                color: '#4285F4',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            Learn more
                        </Link>
                        {button && (
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={button.onButtonClick}
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: '4px',
                                    padding: '6px 12px'
                                }}
                            >
                                {button.buttonText || 'Button'}
                            </Button>
                        )}
                    </Box>
                </Box>
            }
            {...props}
        >
            {children}
        </CustomTooltip>
    );
};

// Example Usage Component
const TooltipDemo: React.FC = () => {
    const handleLearnMore = () => {
        console.log('Learn more clicked');
    };

    const handleButtonClick = () => {
        console.log('Button clicked');
    };

    return (
        <ModernTooltip
            title="This is some tooltip text."
            description="This box shows the maximum amount of text that should appear inside. Use a modal if more room is needed."
            onLearnMore={handleLearnMore}
            button={{
                buttonText: "Action",
                onButtonClick: handleButtonClick
            }}
        >
            <Button variant="outlined">Hover for Tooltip</Button>
        </ModernTooltip>
    );
};

export default ModernTooltip;
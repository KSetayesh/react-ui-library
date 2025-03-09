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

// Styling Configurations
const tooltipStyles = {
    tooltip: {
        backgroundColor: '#2C2C2C',
        color: '#FFFFFF',
        maxWidth: 320,
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        fontSize: '14px',
    },
    titleBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'stretch'
    },
    titleContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold'
    },
    descriptionText: {
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 1.4
    },
    actionBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    learnMoreLink: {
        color: '#4285F4',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    actionButton: {
        textTransform: 'none',
        borderRadius: '4px',
        padding: '6px 12px'
    }
};

// Custom styled tooltip
const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .MuiTooltip-tooltip`]: tooltipStyles.tooltip,
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
                <Box sx={tooltipStyles.titleBox}>
                    <Box sx={tooltipStyles.titleContent}>
                        <Typography variant="body1" sx={tooltipStyles.titleText}>
                            {title}
                        </Typography>
                        {description && (
                            <Typography
                                variant="body2"
                                sx={tooltipStyles.descriptionText}
                            >
                                {description}
                            </Typography>
                        )}
                    </Box>
                    <Box sx={tooltipStyles.actionBox}>
                        <Link
                            component="button"
                            onClick={onLearnMore}
                            sx={tooltipStyles.learnMoreLink}
                        >
                            Learn more
                        </Link>
                        {button && (
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={button.onButtonClick}
                                sx={tooltipStyles.actionButton}
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
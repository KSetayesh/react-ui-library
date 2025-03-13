import React, { ReactNode, useState } from 'react';

// Material-UI imports
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Paper,
    IconButton,
    useTheme,
    styled
} from '@mui/material';

// Icon imports
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Styled Components
const StyledAccordionWrapper = styled(Paper)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    transition: 'all 0.3s ease',
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    minHeight: 48,
    '&.Mui-expanded': {
        minHeight: 48,
    },
    '& .MuiAccordionSummary-content': {
        margin: 0,
        '&.Mui-expanded': {
            margin: 0,
        },
    },
}));

const StyledTitleWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
});

const StyledIconContainer = styled(Box)({
    marginRight: 8,
    display: 'flex',
    alignItems: 'center',
});

const StyledHeaderContent = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
});

const StyledActionsWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    padding: theme.spacing(3),
}));

export interface CustomAccordionProps {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    defaultExpanded?: boolean;
    children: ReactNode;
    onEdit?: () => void;
    onDelete?: () => void;
    showActions?: boolean;
    elevation?: number;
    disabled?: boolean;
    className?: string;
    headerBackgroundColor?: string;
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({
    title,
    subtitle,
    icon,
    defaultExpanded = false,
    children,
    onEdit,
    onDelete,
    showActions = false,
    elevation = 2,
    disabled = false,
    className = '',
    headerBackgroundColor
}) => {
    const theme = useTheme();
    const [expanded, setExpanded] = useState<boolean>(defaultExpanded);

    // Use the provided headerBackgroundColor or default to the theme's primary light color
    const headerBgColor = headerBackgroundColor || theme.palette.primary.light;

    const handleChange = () => {
        if (!disabled) {
            setExpanded(!expanded);
        }
    };

    const handleActionClick = (
        event: React.MouseEvent<HTMLButtonElement>,
        action: () => void
    ) => {
        event.stopPropagation();
        action();
    };

    return (
        <StyledAccordionWrapper
            elevation={elevation}
            className={className}
            sx={{
                opacity: disabled ? 0.7 : 1,
            }}
        >
            <Accordion
                expanded={expanded}
                onChange={handleChange}
                disabled={disabled}
                disableGutters
                sx={{
                    '&.Mui-disabled': {
                        backgroundColor: 'transparent',
                    }
                }}
            >
                <StyledAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${title}-content`}
                    id={`${title}-header`}
                    sx={{
                        backgroundColor: headerBgColor,
                        paddingX: 2,
                        minHeight: subtitle ? 64 : 48,
                        '&.Mui-expanded': {
                            minHeight: subtitle ? 64 : 48,
                        },
                        '& .MuiAccordionSummary-content': {
                            margin: subtitle ? '12px 0' : '0',
                            '&.Mui-expanded': {
                                margin: subtitle ? '12px 0' : '0',
                            },
                        },
                    }}
                >
                    <StyledTitleWrapper>
                        <StyledHeaderContent>
                            {icon && (
                                <StyledIconContainer>
                                    {icon}
                                </StyledIconContainer>
                            )}
                            <Box>
                                <Typography variant="h6" component="div">
                                    {title}
                                </Typography>
                                {subtitle && (
                                    <Typography variant="body2" color="text.secondary">
                                        {subtitle}
                                    </Typography>
                                )}
                            </Box>
                        </StyledHeaderContent>

                        {showActions && (
                            <StyledActionsWrapper
                                sx={{
                                    visibility: expanded ? 'visible' : 'hidden',
                                }}
                            >
                                {onEdit && (
                                    <IconButton
                                        size="small"
                                        onClick={(e) => handleActionClick(e, onEdit)}
                                        sx={{ color: theme.palette.text.secondary }}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                )}
                                {onDelete && (
                                    <IconButton
                                        size="small"
                                        onClick={(e) => handleActionClick(e, onDelete)}
                                        sx={{ color: theme.palette.error.main }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </StyledActionsWrapper>
                        )}
                    </StyledTitleWrapper>
                </StyledAccordionSummary>

                <StyledAccordionDetails
                    sx={{
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    {children}
                </StyledAccordionDetails>
            </Accordion>
        </StyledAccordionWrapper>
    );
};

export default CustomAccordion;
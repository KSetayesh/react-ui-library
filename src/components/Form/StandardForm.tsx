import React from 'react';
import {
    Box,
    Paper,
    PaperProps,
    Typography,
    Button,
    Stack,
    SelectChangeEvent,
    Divider,
    alpha,
    useTheme,
    CircularProgress,
    Tooltip,
    Alert,
    Collapse,
    IconButton,
    useMediaQuery
} from '@mui/material';
import TextFieldComponent from '../TextField/TextField';
import SelectFieldComponent from '../SelectField/SelectField';
import CheckBoxComponent from '../Checkbox/Checkbox';
import RadioButtonComponent from '../RadioButton/RadioButton';
import { InputType } from '../../types';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SaveIcon from '@mui/icons-material/Save';
import ResetIcon from '@mui/icons-material/RestartAlt';

export type Options = { value: string | number; label: string }[];

export type FormValue = {
    name: string;
    value: number | string | boolean | undefined;
    options?: Options;
    type: InputType;
    step?: string;
    required?: boolean;
    description?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    validation?: (value: any) => string | null;
};

export type FormProperty = {
    title: string;
    description?: string;
    values: FormValue[];
    collapsible?: boolean;
    initiallyExpanded?: boolean;
};

export interface FormProps<T> {
    formDetails: FormProperty[];
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    setFormData: React.Dispatch<React.SetStateAction<T>>;
    buttonTitle: string;
    columnsPerRow?: number; // Optional prop for number of columns per row
    buttonDisableLogic?: () => boolean;
    title?: string;
    subtitle?: string;
    isSubmitting?: boolean;
    submitError?: string;
    submitSuccess?: string;
    resetForm?: () => void;
    formErrors?: Record<string, string>;
    formTouched?: Record<string, boolean>;
    elevation?: number;
    paperProps?: PaperProps;
    variant?: 'outlined' | 'elevation';
    dense?: boolean;
    helpText?: string;
}

const StandardForm = <T,>({
    formDetails,
    handleSubmit,
    setFormData,
    buttonTitle,
    columnsPerRow = 3,
    buttonDisableLogic,
    title = 'Form',
    subtitle,
    isSubmitting = false,
    submitError,
    submitSuccess,
    resetForm,
    formErrors = {},
    formTouched = {},
    elevation = 3,
    paperProps = {},
    variant = 'elevation',
    dense = false,
    helpText
}: FormProps<T>) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({});
    const [alertOpen, setAlertOpen] = React.useState<boolean>(!!submitSuccess || !!submitError);

    React.useEffect(() => {
        // Initialize expanded sections based on initiallyExpanded property
        const initialExpandedState: Record<string, boolean> = {};
        formDetails.forEach((section, index) => {
            if (section.collapsible) {
                initialExpandedState[`section-${index}`] = section.initiallyExpanded ?? true;
            } else {
                initialExpandedState[`section-${index}`] = true;
            }
        });
        setExpandedSections(initialExpandedState);
    }, [formDetails]);

    React.useEffect(() => {
        if (submitSuccess || submitError) {
            setAlertOpen(true);
        }
    }, [submitSuccess, submitError]);

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target;
        let _value: string | boolean | number;

        if (type === 'checkbox') {
            _value = (event.target as HTMLInputElement).checked;
        } else if (type === 'number') {
            _value = value === '' ? '' : parseFloat(value);
        } else {
            _value = value;
        }

        setFormData((prevFormData: T) => ({
            ...prevFormData,
            [name]: _value,
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
        const { name, value } = event.target;

        setFormData((prevFormData: T) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const renderInputField = (valueDetail: FormValue) => {
        const hasError = formTouched[valueDetail.name] && !!formErrors[valueDetail.name];
        const errorMessage = formTouched[valueDetail.name] ? formErrors[valueDetail.name] : '';

        const commonProps = {
            error: hasError,
            helperText: errorMessage,
            disabled: valueDetail.disabled,
            fullWidth: valueDetail.fullWidth ?? true,
            label: valueDetail.label || valueDetail.name,
            required: valueDetail.required,
            size: dense ? 'small' : 'medium',
        };

        const fieldLabel = (
            <Box display="flex" alignItems="center" mb={0.5}>
                <Typography variant="body2" fontWeight={500}>
                    {valueDetail.label || valueDetail.name}
                    {valueDetail.required && <span style={{ color: theme.palette.error.main }}> *</span>}
                </Typography>
                {valueDetail.description && (
                    <Tooltip title={valueDetail.description} arrow>
                        <IconButton size="small" sx={{ ml: 0.5, p: 0 }}>
                            <InfoOutlinedIcon fontSize="small" color="action" />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
        );

        switch (valueDetail.type) {
            case InputType.TEXT:
                return (
                    <Box>
                        {fieldLabel}
                        <TextFieldComponent
                            name={valueDetail.name}
                            value={valueDetail.value as string || ''}
                            onChange={handleChange}
                            placeholder={valueDetail.placeholder || valueDetail.name}
                            {...commonProps}
                        />
                    </Box>
                );
            case InputType.NUMBER:
                return (
                    <Box>
                        {fieldLabel}
                        <TextFieldComponent
                            name={valueDetail.name}
                            value={valueDetail.value as number}
                            onChange={handleChange}
                            type="number"
                            placeholder={valueDetail.placeholder || valueDetail.name}
                            step={valueDetail.step || '1'}
                            {...commonProps}
                        />
                    </Box>
                );
            case InputType.SELECT:
                return (
                    <Box>
                        {fieldLabel}
                        <SelectFieldComponent
                            name={valueDetail.name}
                            value={valueDetail.value as string | number}
                            onChange={handleSelectChange}
                            options={valueDetail.options || []}
                            placeholder={valueDetail.placeholder || valueDetail.name}
                            {...commonProps}
                        />
                    </Box>
                );
            case InputType.CHECKBOX:
                return (
                    <Box mt={1}>
                        <CheckBoxComponent
                            name={valueDetail.name}
                            checked={valueDetail.value ? valueDetail.value.toString().toLowerCase() === 'true' : false}
                            onChange={handleChange}
                            label={valueDetail.label || valueDetail.name}
                            disabled={valueDetail.disabled}
                            required={valueDetail.required}
                        />
                        {hasError && (
                            <Typography variant="caption" color="error">
                                {errorMessage}
                            </Typography>
                        )}
                    </Box>
                );
            case InputType.RADIO:
                return (
                    <Box>
                        {fieldLabel}
                        <RadioButtonComponent
                            name={valueDetail.name}
                            value={valueDetail.value as string | number}
                            onChange={handleChange}
                            options={valueDetail.options || []}
                            label={valueDetail.label || valueDetail.name}
                            disabled={valueDetail.disabled}
                            required={valueDetail.required}
                        />
                        {hasError && (
                            <Typography variant="caption" color="error">
                                {errorMessage}
                            </Typography>
                        )}
                    </Box>
                );
            default:
                return null;
        }
    };

    const createFormProperty = (detail: FormProperty, index: number) => {
        const sectionId = `section-${index}`;
        const isExpanded = expandedSections[sectionId] ?? true;

        return (
            <Box key={index} sx={{ mb: 3, width: '100%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: detail.collapsible ? 'pointer' : 'default',
                        mb: 1,
                        pb: 1,
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`
                    }}
                    onClick={detail.collapsible ? () => toggleSection(sectionId) : undefined}
                >
                    <Box>
                        <Typography variant="h6" color="primary">
                            {detail.title}
                        </Typography>
                        {detail.description && (
                            <Typography variant="body2" color="text.secondary">
                                {detail.description}
                            </Typography>
                        )}
                    </Box>
                    {detail.collapsible && (
                        <Button
                            size="small"
                            variant="text"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleSection(sectionId);
                            }}
                        >
                            {isExpanded ? 'Hide' : 'Show'}
                        </Button>
                    )}
                </Box>

                <Collapse in={isExpanded}>
                    <Stack
                        direction={isMobile ? 'column' : 'row'}
                        flexWrap="wrap"
                        sx={{ mx: -1 }}
                    >
                        {detail.values.map((valueDetail, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    width: isMobile ? '100%' : `${100 / columnsPerRow}%`,
                                    p: 1,
                                    transition: 'all 0.2s'
                                }}
                            >
                                {renderInputField(valueDetail)}
                            </Box>
                        ))}
                    </Stack>
                </Collapse>
            </Box>
        );
    };

    const isButtonDisabled = (): boolean => {
        return buttonDisableLogic ? buttonDisableLogic() : Object.keys(formErrors).length > 0 || isSubmitting;
    };

    // Separate the sx prop from other Paper props
    const { sx: paperSx, ...otherPaperProps } = paperProps as any;

    const actualPaperProps = {
        elevation: variant === 'outlined' ? 0 : elevation,
        variant: variant,
        ...otherPaperProps
    };

    return (
        <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
            <Paper
                {...actualPaperProps}
                sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    backgroundColor: theme.palette.background.paper,
                    ...(paperSx || {})
                }}
            >
                <Box mb={4}>
                    <Typography variant="h5" component="h1" align="center" gutterBottom fontWeight="medium">
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography variant="subtitle1" align="center" color="text.secondary">
                            {subtitle}
                        </Typography>
                    )}
                    {helpText && (
                        <Alert severity="info" sx={{ mt: 2 }}>
                            {helpText}
                        </Alert>
                    )}
                </Box>

                <Collapse in={alertOpen}>
                    {submitSuccess && (
                        <Alert
                            severity="success"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => setAlertOpen(false)}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 3 }}
                        >
                            {submitSuccess}
                        </Alert>
                    )}

                    {submitError && (
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => setAlertOpen(false)}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 3 }}
                        >
                            {submitError}
                        </Alert>
                    )}
                </Collapse>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        {formDetails.map((detail: FormProperty, index: number) => (
                            createFormProperty(detail, index)
                        ))}
                    </Stack>

                    <Box
                        mt={4}
                        display="flex"
                        justifyContent="center"
                        gap={2}
                        flexWrap="wrap"
                    >
                        {resetForm && (
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={resetForm}
                                disabled={isSubmitting}
                                startIcon={<ResetIcon />}
                            >
                                Reset
                            </Button>
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isButtonDisabled()}
                            startIcon={isSubmitting ? undefined : <SaveIcon />}
                            sx={{ minWidth: 120 }}
                        >
                            {isSubmitting ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                buttonTitle
                            )}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default StandardForm;
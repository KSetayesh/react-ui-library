import React from 'react';
import { Switch, FormControlLabel, styled } from '@mui/material';

// Define explicit types for the props
export enum SwitchSize {
    SMALL = 'small',
    MEDIUM = 'medium'
};

export enum SwitchColor {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning',
    DEFAULT = 'default'
};

export type ToggleSwitchProps = {
    name: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    disabled?: boolean;
    size?: SwitchSize;
    color?: SwitchColor;
};

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    margin: theme.spacing(0.5),
    '.MuiSwitch-root': {
        padding: 8,
    },
    '.MuiSwitch-track': {
        borderRadius: 22 / 2,
    },
    '.MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

const ToggleSwitchComponent: React.FC<ToggleSwitchProps> = ({
    name,
    checked,
    onChange,
    label,
    disabled = false,
    size = SwitchSize.MEDIUM,
    color = SwitchColor.PRIMARY,
}) => {
    return (
        <StyledFormControlLabel
            control={
                <Switch
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    size={size}
                    color={color}
                />
            }
            label={label}
        />
    );
};

export default ToggleSwitchComponent;
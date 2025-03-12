import React from 'react';
import { FormControlLabel, Checkbox, styled } from '@mui/material';

export type CheckBoxComponentProps = {
    name: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    disabled?: boolean;
    required?: boolean;
};

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const CheckBoxComponent: React.FC<CheckBoxComponentProps> = (
    { name, checked, onChange, label, disabled, required }: CheckBoxComponentProps
) => {
    return (
        <StyledFormControlLabel
            control={<Checkbox checked={checked} onChange={onChange} name={name} disabled={disabled} required={required} />}
            label={label}
        />
    );
};

export default CheckBoxComponent;

// import React from 'react';

// import './button.css';

// export interface ButtonProps {
//     /** Is this the principal call to action on the page? */
//     primary?: boolean;
//     /** What background color to use */
//     backgroundColor?: string;
//     /** How large should the button be? */
//     size?: 'small' | 'medium' | 'large';
//     /** Button contents */
//     label: string;
//     /** Optional click handler */
//     onClick?: () => void;
// }

// /** Primary UI component for user interaction */
// export const Button = ({
//     primary = false,
//     size = 'medium',
//     backgroundColor,
//     label,
//     ...props
// }: ButtonProps) => {
//     const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
//     return (
//         <button
//             type="button"
//             className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
//             style={{ backgroundColor }}
//             {...props}
//         >
//             {label}
//         </button>
//     );
// };

import React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

// Define the CustomButton component with specific styles
const CustomButton = styled(Button)({
    borderRadius: '8px',
    color: 'black',
    border: '1px solid transparent',
    padding: '0.6em 1.2em',
    fontSize: '1em',
    fontWeight: 500,
    fontFamily: 'inherit',
    backgroundColor: '#317cff', // Original Button Color
    cursor: 'pointer',
    transition: 'background-color 0.25s, border-color 0.25s',
    '&:hover': {
        backgroundColor: '#4791db', // Slightly lighter color for hover
        borderColor: '#317cff', // Original border color for hover
    },
    '&.Mui-disabled': {
        backgroundColor: '#a1cfff', // Disabled button color
        color: '#fff',
    },
    marginLeft: '5px', // Add margin left
    marginRight: '5px', // Add margin right
});

export interface CustomButtonProps extends ButtonProps {
    buttonTitle?: string;
};

export const CustomButtonComponent: React.FC<CustomButtonProps> = ({
    buttonTitle,
    ...props
}) => {
    return <CustomButton {...props}>{buttonTitle ? buttonTitle : 'Submit'} </CustomButton>;
};

export default CustomButtonComponent;



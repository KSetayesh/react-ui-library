import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import StandardForm from './StandardForm';
import { InputType } from '../../types';

// Define the mock form data type
interface FormDataType {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    role: string;
    department: string;
    isActive: boolean;
    notificationType: string;
    salary: number;
    bio?: string;
    skills?: string[];
    agreeToTerms?: boolean;
}

// Storybook metadata
const meta = {
    title: 'Components/StandardForm',
    component: StandardForm,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A flexible form component that supports various input types and layouts.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        formDetails: {
            description: 'Array of form property objects that define form structure and fields',
            control: 'object'
        },
        handleSubmit: {
            description: 'Function to handle form submission',
            action: 'submitted'
        },
        setFormData: {
            description: 'Function to update form data state'
        },
        buttonTitle: {
            description: 'Text to display on the submit button',
            control: 'text',
            defaultValue: 'Submit'
        },
        columnsPerRow: {
            description: 'Number of columns to display per row',
            control: { type: 'range', min: 1, max: 4, step: 1 },
            defaultValue: 3
        },
        buttonDisableLogic: {
            description: 'Function that returns boolean to determine if submit button should be disabled'
        },
        title: {
            description: 'Title displayed at the top of the form',
            control: 'text'
        },
        subtitle: {
            description: 'Subtitle displayed below the title',
            control: 'text'
        },
        isSubmitting: {
            description: 'Whether the form is currently submitting',
            control: 'boolean'
        },
        submitError: {
            description: 'Error message to display after submission failure',
            control: 'text'
        },
        submitSuccess: {
            description: 'Success message to display after successful submission',
            control: 'text'
        },
        elevation: {
            description: 'Elevation level of the form card',
            control: { type: 'range', min: 0, max: 24, step: 1 },
            defaultValue: 3
        },
        variant: {
            description: 'Paper variant',
            control: 'radio',
            options: ['outlined', 'elevation']
        },
        dense: {
            description: 'Whether to use a more compact layout',
            control: 'boolean'
        },
        helpText: {
            description: 'Help text to display at the top of the form',
            control: 'text'
        }
    }
} satisfies Meta<typeof StandardForm>;

export default meta;
type Story = StoryObj<typeof StandardForm>;

// Template for creating stories
const Template = (args: any) => {
    const [formData, setFormData] = useState<FormDataType>({
        firstName: '',
        lastName: '',
        age: 0,
        email: '',
        role: '',
        department: '',
        isActive: false,
        notificationType: 'email',
        salary: 0,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formTouched, setFormTouched] = useState<Record<string, boolean>>({});

    const validateForm = () => {
        const errors: Record<string, string> = {};
        const touched: Record<string, boolean> = {};

        // Simple validation rules
        if (!formData.firstName) {
            errors.firstName = 'First name is required';
        }
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (formData.age < 18) {
            errors.age = 'Age must be at least 18';
        }

        // Mark all fields as touched for validation
        Object.keys(formData).forEach(key => {
            touched[key] = true;
        });

        setFormErrors(errors);
        setFormTouched(touched);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            setSubmitError('Please fix the validation errors before submitting.');
            return;
        }

        setIsSubmitting(true);
        setSubmitSuccess('');
        setSubmitError('');

        try {
            console.log('Form submitted with data:', formData);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSubmitSuccess('Form submitted successfully!');
        } catch (error) {
            setSubmitError('An error occurred while submitting the form.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            age: 0,
            email: '',
            role: '',
            department: '',
            isActive: false,
            notificationType: 'email',
            salary: 0,
        });
        setFormErrors({});
        setFormTouched({});
        setSubmitSuccess('');
        setSubmitError('');
    };

    return (
        <StandardForm
            {...args}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            isSubmitting={args.isSubmitting !== undefined ? args.isSubmitting : isSubmitting}
            submitSuccess={args.submitSuccess !== undefined ? args.submitSuccess : submitSuccess}
            submitError={args.submitError !== undefined ? args.submitError : submitError}
            formErrors={formErrors}
            formTouched={formTouched}
            resetForm={resetForm}
        />
    );
};

// Basic form with all input types
export const BasicForm: Story = {
    render: (args) => <Template {...args} />,
    args: {
        title: 'Employee Registration Form',
        subtitle: 'Please fill out all required fields',
        buttonTitle: 'Submit Form',
        helpText: 'Fields marked with * are required.',
        formDetails: [
            {
                title: 'Personal Information',
                description: 'Your basic information',
                values: [
                    {
                        name: 'firstName',
                        value: '',
                        type: InputType.TEXT,
                        label: 'First Name',
                        placeholder: 'Enter your first name',
                        required: true,
                        description: 'Your legal first name as it appears on your ID'
                    },
                    {
                        name: 'lastName',
                        value: '',
                        type: InputType.TEXT,
                        label: 'Last Name',
                        placeholder: 'Enter your last name',
                        required: true
                    },
                    {
                        name: 'age',
                        value: 0,
                        type: InputType.NUMBER,
                        label: 'Age',
                        placeholder: 'Enter your age',
                        required: true,
                        description: 'You must be at least 18 years old'
                    },
                ],
            },
            {
                title: 'Contact Information',
                collapsible: true,
                initiallyExpanded: true,
                values: [
                    {
                        name: 'email',
                        value: '',
                        type: InputType.TEXT,
                        label: 'Email Address',
                        placeholder: 'Enter your email',
                        required: true,
                        description: 'We will use this email for all communications'
                    },
                ],
            },
            {
                title: 'Job Information',
                collapsible: true,
                values: [
                    {
                        name: 'role',
                        value: '',
                        type: InputType.SELECT,
                        label: 'Role',
                        placeholder: 'Select your role',
                        required: true,
                        options: [
                            { value: 'developer', label: 'Developer' },
                            { value: 'designer', label: 'Designer' },
                            { value: 'manager', label: 'Manager' },
                            { value: 'tester', label: 'Tester' },
                        ],
                    },
                    {
                        name: 'department',
                        value: '',
                        type: InputType.SELECT,
                        label: 'Department',
                        placeholder: 'Select your department',
                        required: true,
                        options: [
                            { value: 'engineering', label: 'Engineering' },
                            { value: 'product', label: 'Product' },
                            { value: 'marketing', label: 'Marketing' },
                            { value: 'operations', label: 'Operations' },
                        ],
                    },
                    {
                        name: 'salary',
                        value: 0,
                        type: InputType.NUMBER,
                        label: 'Expected Salary',
                        placeholder: 'Enter expected salary',
                        step: "1000",
                    },
                ],
            },
            {
                title: 'Preferences',
                values: [
                    {
                        name: 'isActive',
                        value: false,
                        type: InputType.CHECKBOX,
                        label: 'Available to start immediately',
                    },
                    {
                        name: 'notificationType',
                        value: 'email',
                        type: InputType.RADIO,
                        label: 'Preferred Notification Method',
                        required: true,
                        options: [
                            { value: 'email', label: 'Email' },
                            { value: 'sms', label: 'SMS' },
                            { value: 'push', label: 'Push Notification' },
                        ],
                    },
                ],
            },
        ],
    },
};

// Form with validation and success/error state
export const FormWithValidation: Story = {
    render: (args) => <Template {...args} />,
    args: {
        ...BasicForm.args,
        title: 'Validated Form Example',
        subtitle: 'This form has built-in validation',
    },
};

// Form with two columns layout
export const TwoColumnsForm: Story = {
    render: (args) => <Template {...args} />,
    args: {
        ...BasicForm.args,
        columnsPerRow: 2,
        buttonTitle: 'Save Changes',
        title: 'Two-Column Layout Form',
    },
};

// Form with one column layout
export const OneColumnForm: Story = {
    render: (args) => <Template {...args} />,
    args: {
        ...BasicForm.args,
        columnsPerRow: 1,
        buttonTitle: 'Register',
        title: 'Single Column Form',
    },
};

// Form with disabled button
export const DisabledButtonForm: Story = {
    render: (args) => {
        const [formData, setFormData] = useState<FormDataType>({
            firstName: '',
            lastName: '',
            age: 0,
            email: '',
            role: '',
            department: '',
            isActive: false,
            notificationType: 'email',
            salary: 0,
        });

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            console.log('Form submitted with data:', formData);
        };

        const buttonDisableLogic = () => {
            return !formData.firstName || !formData.lastName || !formData.email;
        };

        return (
            <StandardForm
                {...args}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                buttonDisableLogic={buttonDisableLogic}
            />
        );
    },
    args: {
        ...BasicForm.args,
        buttonTitle: 'Submit Form',
        title: 'Form with Disabled Button Logic',
        subtitle: 'Button is disabled until required fields are filled',
        helpText: 'Fill out First Name, Last Name, and Email to enable the submit button',
    },
};

// Loading state
export const LoadingStateForm: Story = {
    render: (args) => <Template {...args} />,
    args: {
        ...BasicForm.args,
        isSubmitting: true,
        title: 'Form in Loading State',
        subtitle: 'Shows a loading spinner on the submit button',
    },
};

// Error state
export const ErrorStateForm: Story = {
    render: (args) => <Template {...args} />,
    args: {
        ...BasicForm.args,
        submitError: 'There was an error submitting the form. Please try again.',
        title: 'Form with Error State',
        subtitle: 'Displays an error message after submission failure',
    },
};

// Success state
export const SuccessStateForm: Story = {
    render: (args) => <Template {...args} />,
    args: {
        ...BasicForm.args,
        submitSuccess: 'Form submitted successfully! We will contact you soon.',
        title: 'Form with Success State',
        subtitle: 'Displays a success message after submission',
    },
};

// Outlined variant
export const OutlinedForm: Story = {
    render: (args) => <Template {...args} />,
    args: {
        ...BasicForm.args,
        variant: 'outlined',
        title: 'Outlined Form Variant',
        subtitle: 'Uses the outlined Paper variant instead of elevated',
    },
};

// Dense form
export const DenseForm: Story = {
    render: (args) => <Template {...args} />,
    args: {
        ...BasicForm.args,
        dense: true,
        title: 'Dense Form Layout',
        subtitle: 'More compact form layout for space efficiency',
    },
};

// Pre-filled form
export const PrefilledForm: Story = {
    render: (args) => {
        const [formData, setFormData] = useState<FormDataType>({
            firstName: 'John',
            lastName: 'Doe',
            age: 30,
            email: 'john.doe@example.com',
            role: 'developer',
            department: 'engineering',
            isActive: true,
            notificationType: 'email',
            salary: 75000,
        });

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            console.log('Form submitted with data:', formData);
            alert(JSON.stringify(formData, null, 2));
        };

        return (
            <StandardForm
                {...args}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
            />
        );
    },
    args: {
        title: 'Edit Profile',
        subtitle: 'Update your information',
        buttonTitle: 'Update Profile',
        formDetails: [
            {
                title: 'Personal Information',
                values: [
                    {
                        name: 'firstName',
                        value: 'John',
                        type: InputType.TEXT,
                        label: 'First Name',
                        required: true,
                    },
                    {
                        name: 'lastName',
                        value: 'Doe',
                        type: InputType.TEXT,
                        label: 'Last Name',
                        required: true,
                    },
                    {
                        name: 'age',
                        value: 30,
                        type: InputType.NUMBER,
                        label: 'Age',
                        required: true,
                    },
                ],
            },
            {
                title: 'Contact Information',
                values: [
                    {
                        name: 'email',
                        value: 'john.doe@example.com',
                        type: InputType.TEXT,
                        label: 'Email Address',
                        required: true,
                    },
                ],
            },
            {
                title: 'Job Information',
                values: [
                    {
                        name: 'role',
                        value: 'developer',
                        type: InputType.SELECT,
                        label: 'Role',
                        options: [
                            { value: 'developer', label: 'Developer' },
                            { value: 'designer', label: 'Designer' },
                            { value: 'manager', label: 'Manager' },
                            { value: 'tester', label: 'Tester' },
                        ],
                    },
                    {
                        name: 'department',
                        value: 'engineering',
                        type: InputType.SELECT,
                        label: 'Department',
                        options: [
                            { value: 'engineering', label: 'Engineering' },
                            { value: 'product', label: 'Product' },
                            { value: 'marketing', label: 'Marketing' },
                            { value: 'operations', label: 'Operations' },
                        ],
                    },
                    {
                        name: 'salary',
                        value: 75000,
                        type: InputType.NUMBER,
                        label: 'Salary',
                        step: "1000",
                    },
                ],
            },
            {
                title: 'Preferences',
                values: [
                    {
                        name: 'isActive',
                        value: true,
                        type: InputType.CHECKBOX,
                        label: 'Active Employee',
                    },
                    {
                        name: 'notificationType',
                        value: 'email',
                        type: InputType.RADIO,
                        label: 'Notification Preference',
                        options: [
                            { value: 'email', label: 'Email' },
                            { value: 'sms', label: 'SMS' },
                            { value: 'push', label: 'Push Notification' },
                        ],
                    },
                ],
            },
        ],
    },
};
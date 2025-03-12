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
}

const meta: Meta<typeof StandardForm> = {
    title: 'Components/StandardForm',
    component: StandardForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert(JSON.stringify(formData, null, 2));
    };

    return <StandardForm {...args} setFormData={setFormData} handleSubmit={handleSubmit} />;
};

// Basic form with all input types
export const BasicForm: Story = {
    render: (args) => <Template {...args} />,
    args: {
        buttonTitle: 'Submit Form',
        formDetails: [
            {
                title: 'Personal Information',
                values: [
                    {
                        name: 'firstName',
                        value: '',
                        type: InputType.TEXT,
                    },
                    {
                        name: 'lastName',
                        value: '',
                        type: InputType.TEXT,
                    },
                    {
                        name: 'age',
                        value: 0,
                        type: InputType.NUMBER,
                    },
                ],
            },
            {
                title: 'Contact Information',
                values: [
                    {
                        name: 'email',
                        value: '',
                        type: InputType.TEXT,
                    },
                ],
            },
            {
                title: 'Job Information',
                values: [
                    {
                        name: 'role',
                        value: '',
                        type: InputType.SELECT,
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
                        step: "1000",
                    },
                ],
            },
            {
                title: 'Preferences',
                values: [
                    {
                        name: 'isActive',
                        value: '', //true,
                        type: InputType.CHECKBOX,
                    },
                    {
                        name: 'notificationType',
                        value: 'email',
                        type: InputType.RADIO,
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

// Form with two columns layout
export const TwoColumnsForm: Story = {
    render: (args) => <Template {...args} />,
    args: {
        ...BasicForm.args,
        columnsPerRow: 2,
        buttonTitle: 'Save Changes',
    },
};

// Form with one column layout
export const OneColumnForm: Story = {
    render: (args) => <Template {...args} />,
    args: {
        ...BasicForm.args,
        columnsPerRow: 1,
        buttonTitle: 'Register',
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
        buttonTitle: 'Update Profile',
        formDetails: [
            {
                title: 'Personal Information',
                values: [
                    {
                        name: 'firstName',
                        value: 'John',
                        type: InputType.TEXT,
                    },
                    {
                        name: 'lastName',
                        value: 'Doe',
                        type: InputType.TEXT,
                    },
                    {
                        name: 'age',
                        value: 30,
                        type: InputType.NUMBER,
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
                        step: "1000",
                    },
                ],
            },
            {
                title: 'Preferences',
                values: [
                    {
                        name: 'isActive',
                        value: '', //true,
                        type: InputType.CHECKBOX,
                    },
                    {
                        name: 'notificationType',
                        value: 'email',
                        type: InputType.RADIO,
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
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

import { TableComponent } from '../component/TableComponent';
import { BasicTable, BasicTableI, ExportOptions } from '../models/BasicTable';
import { BasicColumn, BasicColumnI } from '../models/BasicColumn';
import { InputType } from '../../../types/InputType';
import { FileType } from '../../../types/FileType';

// Example data type
type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    salary: number;
    lastLogin: Date;
    createdAt: Date;
};

// Example Column implementation for storybook - providing all required properties
class UserColumn<T> extends BasicColumn<T> {
    constructor(config: BasicColumnI<T>) {
        super(config);
    }
}

// Example Table implementation for storybook
class UserTable extends BasicTable<User> {
    constructor(
        data: User[],
        options: {
            isSortable?: boolean;
            isFilterable?: boolean;
            isEditable?: boolean;
            isDeletable?: boolean;
            isPageable?: boolean;
            isSelectable?: boolean;
            isMultiSelectable?: boolean;
            isSearchable?: boolean;
            showExportOptions?: boolean;
        } = {}
    ) {
        const {
            isSortable = true,
            isFilterable = true,
            isEditable = true,
            isDeletable = true,
            isPageable = true,
            isSelectable = true,
            isMultiSelectable = true,
            isSearchable = true,
            showExportOptions = true
        } = options;

        // Define columns with all required properties
        const columns: UserColumn<User>[] = [
            new UserColumn({
                key: 'id',
                title: 'ID',
                accessor: (item) => item.id,
                inputType: InputType.NUMBER,
                isUrl: false,
                isDollarAmount: false,
                addSuffix: '',
                showColumn: true,
                isEditable: false,
                isSortable: true,
                detailedDescription: 'Unique identifier for the user'
            }),
            new UserColumn({
                key: 'name',
                title: 'Name',
                accessor: (item) => item.name,
                inputType: InputType.TEXT,
                isUrl: false,
                isDollarAmount: false,
                addSuffix: '',
                showColumn: true,
                isEditable: true,
                isSortable: true,
                detailedDescription: 'User\'s full name',
                routeTo: '/user/profile'
            }),
            new UserColumn({
                key: 'email',
                title: 'Email',
                accessor: (item) => item.email,
                inputType: InputType.EMAIL,
                isUrl: true,
                isDollarAmount: false,
                addSuffix: '',
                showColumn: true,
                isEditable: true,
                isSortable: true,
                detailedDescription: 'User\'s email address'
            }),
            new UserColumn({
                key: 'role',
                title: 'Role',
                accessor: (item) => item.role,
                inputType: InputType.TEXT,
                isUrl: false,
                isDollarAmount: false,
                addSuffix: '',
                showColumn: true,
                isEditable: true,
                isSortable: true,
                detailedDescription: 'User\'s role in the system'
            }),
            new UserColumn({
                key: 'status',
                title: 'Status',
                accessor: (item) => item.status,
                inputType: InputType.TEXT,
                isUrl: false,
                isDollarAmount: false,
                addSuffix: '',
                showColumn: true,
                isEditable: false,
                isSortable: true,
                detailedDescription: 'Current user status'
            }),
            new UserColumn({
                key: 'salary',
                title: 'Salary',
                accessor: (item) => item.salary,
                inputType: InputType.NUMBER,
                isUrl: false,
                isDollarAmount: true,
                addSuffix: '',
                showColumn: true,
                isEditable: true,
                isSortable: true,
                detailedDescription: 'User\'s annual salary'
            }),
            new UserColumn({
                key: 'lastLogin',
                title: 'Last Login',
                accessor: (item) => item.lastLogin,
                inputType: InputType.DATE,
                isUrl: false,
                isDollarAmount: false,
                addSuffix: '',
                showColumn: true,
                isEditable: false,
                isSortable: true,
                detailedDescription: 'Date and time of last login'
            }),
            new UserColumn({
                key: 'createdAt',
                title: 'Created At',
                accessor: (item) => item.createdAt,
                inputType: InputType.DATE,
                isUrl: false,
                isDollarAmount: false,
                addSuffix: '',
                showColumn: true,
                isEditable: false,
                isSortable: true,
                detailedDescription: 'Date and time when the user was created'
            })
        ];

        const exportOptions: ExportOptions | undefined = showExportOptions ? {
            buttonName: 'Export Users',
            isEnabled: true,
            filename: 'users_export',
            includeHeaders: true,
            formats: [FileType.CSV, FileType.XLSX, FileType.PDF]
        } : undefined;

        const tableProps: BasicTableI<User> = {
            data: data,
            columns: columns,
            title: 'User Management',
            description: 'View and manage system users',
            isSortable: isSortable,
            isFilterable: isFilterable,
            isEditable: isEditable,
            isDeletable: isDeletable,
            isPageable: isPageable,
            isSelectable: isSelectable,
            isMultiSelectable: isMultiSelectable,
            isSearchable: isSearchable,
            exportOptions: exportOptions,
        };
        // Use the new configuration object approach for BasicTable
        super(tableProps);
    }
}

// Sample data for storybook
const sampleUsers: User[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        status: 'active',
        salary: 85000,
        lastLogin: new Date('2023-03-15T10:30:00'),
        createdAt: new Date('2022-01-10')
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'Editor',
        status: 'active',
        salary: 72500,
        lastLogin: new Date('2023-03-14T09:15:00'),
        createdAt: new Date('2022-02-15')
    },
    {
        id: 3,
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        role: 'Viewer',
        status: 'inactive',
        salary: 65000,
        lastLogin: new Date('2023-02-28T14:45:00'),
        createdAt: new Date('2022-03-20')
    },
    {
        id: 4,
        name: 'Emily Brown',
        email: 'emily.brown@example.com',
        role: 'Editor',
        status: 'active',
        salary: 70000,
        lastLogin: new Date('2023-03-10T11:20:00'),
        createdAt: new Date('2022-04-05')
    },
    {
        id: 5,
        name: 'Michael Wilson',
        email: 'michael.wilson@example.com',
        role: 'Admin',
        status: 'active',
        salary: 90000,
        lastLogin: new Date('2023-03-12T16:30:00'),
        createdAt: new Date('2022-05-12')
    },
    {
        id: 6,
        name: 'Sarah Taylor',
        email: 'sarah.taylor@example.com',
        role: 'Viewer',
        status: 'inactive',
        salary: 62000,
        lastLogin: new Date('2023-02-20T08:45:00'),
        createdAt: new Date('2022-06-22')
    },
    {
        id: 7,
        name: 'David Martinez',
        email: 'david.martinez@example.com',
        role: 'Editor',
        status: 'active',
        salary: 75000,
        lastLogin: new Date('2023-03-08T13:15:00'),
        createdAt: new Date('2022-07-30')
    },
    {
        id: 8,
        name: 'Jennifer Anderson',
        email: 'jennifer.anderson@example.com',
        role: 'Viewer',
        status: 'active',
        salary: 63500,
        lastLogin: new Date('2023-03-05T10:10:00'),
        createdAt: new Date('2022-08-15')
    },
    {
        id: 9,
        name: 'Thomas Clark',
        email: 'thomas.clark@example.com',
        role: 'Admin',
        status: 'active',
        salary: 88000,
        lastLogin: new Date('2023-03-14T16:45:00'),
        createdAt: new Date('2022-09-05')
    },
    {
        id: 10,
        name: 'Lisa Rodriguez',
        email: 'lisa.rodriguez@example.com',
        role: 'Editor',
        status: 'inactive',
        salary: 69500,
        lastLogin: new Date('2023-02-25T09:30:00'),
        createdAt: new Date('2022-10-12')
    },
    {
        id: 11,
        name: 'James Lee',
        email: 'james.lee@example.com',
        role: 'Viewer',
        status: 'active',
        salary: 64000,
        lastLogin: new Date('2023-03-11T13:20:00'),
        createdAt: new Date('2022-11-20')
    },
    {
        id: 12,
        name: 'Patricia White',
        email: 'patricia.white@example.com',
        role: 'Editor',
        status: 'active',
        salary: 71500,
        lastLogin: new Date('2023-03-09T15:15:00'),
        createdAt: new Date('2022-12-01')
    },
];

// Create a wrapper component for storybook
const TableComponentWrapper = (args: any) => {
    const {
        isSortable = true,
        isFilterable = true,
        isEditable = true,
        isDeletable = true,
        isPageable = true,
        isSelectable = true,
        isMultiSelectable = true,
        isSearchable = true,
        showExportOptions = true,
        ...otherArgs
    } = args;

    // Create table instance with the specified features using the new options object
    const table = new UserTable(
        sampleUsers,
        {
            isSortable,
            isFilterable,
            isEditable,
            isDeletable,
            isPageable,
            isSelectable,
            isMultiSelectable,
            isSearchable,
            showExportOptions
        }
    );

    // Handler for row click
    const handleRowClick = (row: User) => {
        console.log('Row clicked:', row);
    };

    // Handler for selection change
    const handleSelectionChange = (selectedRows: User[]) => {
        console.log('Selection changed:', selectedRows);
    };

    return (
        <TableComponent
            table={table}
            onRowClick={handleRowClick}
            onSelectionChange={handleSelectionChange}
            {...otherArgs}
        />
    );
};

// Storybook metadata
const meta = {
    title: 'Components/TableComponent',
    component: TableComponentWrapper,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        elevation: {
            control: { type: 'range', min: 0, max: 24, step: 1 },
            description: 'Elevation of the table card',
            defaultValue: 2
        },
        dense: {
            control: 'boolean',
            description: 'Whether to use dense table rows',
            defaultValue: false
        },
        isSortable: {
            control: 'boolean',
            description: 'Enable sorting functionality',
            defaultValue: true
        },
        isFilterable: {
            control: 'boolean',
            description: 'Enable filtering functionality',
            defaultValue: true
        },
        isEditable: {
            control: 'boolean',
            description: 'Enable row editing',
            defaultValue: true
        },
        isDeletable: {
            control: 'boolean',
            description: 'Enable row deletion',
            defaultValue: true
        },
        isPageable: {
            control: 'boolean',
            description: 'Enable pagination',
            defaultValue: true
        },
        isSelectable: {
            control: 'boolean',
            description: 'Enable row selection',
            defaultValue: true
        },
        isMultiSelectable: {
            control: 'boolean',
            description: 'Enable multi-row selection',
            defaultValue: true
        },
        isSearchable: {
            control: 'boolean',
            description: 'Enable search functionality',
            defaultValue: true
        },
        showExportOptions: {
            control: 'boolean',
            description: 'Show export options',
            defaultValue: true
        },
        onRowClick: { action: 'rowClicked' },
        onSelectionChange: { action: 'selectionChanged' }
    },
} satisfies Meta<typeof TableComponentWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with all features enabled
export const Default: Story = {
    args: {
        elevation: 2,
        dense: false,
        isSortable: true,
        isFilterable: true,
        isEditable: true,
        isDeletable: true,
        isPageable: true,
        isSelectable: true,
        isMultiSelectable: true,
        isSearchable: true,
        showExportOptions: true
    },
};

// Story with dense rows
export const DenseTable: Story = {
    args: {
        dense: true
    },
};

// Story with limited features for read-only view
export const ReadOnly: Story = {
    args: {
        isEditable: false,
        isDeletable: false,
        isSelectable: false
    },
};

// Story with only essential features
export const Minimal: Story = {
    args: {
        isSortable: true,
        isFilterable: false,
        isEditable: false,
        isDeletable: false,
        isPageable: true,
        isSelectable: false,
        isMultiSelectable: false,
        isSearchable: true,
        showExportOptions: false,
        elevation: 1
    },
};

// Story with flat (no elevation) design
export const Flat: Story = {
    args: {
        elevation: 0
    },
};

// Story with advanced filtering but no editing
export const AnalyticsView: Story = {
    args: {
        isSortable: true,
        isFilterable: true,
        isEditable: false,
        isDeletable: false,
        isPageable: true,
        isSelectable: true,
        isMultiSelectable: true,
        isSearchable: true,
        showExportOptions: true
    },
};

// Story showing the table in a management view
export const ManagementView: Story = {
    args: {
        isSortable: true,
        isFilterable: true,
        isEditable: true,
        isDeletable: true,
        isPageable: true,
        isSelectable: true,
        isMultiSelectable: true,
        isSearchable: true,
        showExportOptions: true
    },
};
// import React, { useState } from 'react';
// import type { Meta, StoryObj } from '@storybook/react';
// import AbstractTable, { AbstractTableProps, ColumnDetail, InputType } from './AbstractTable';
// import { ThemeProvider, createTheme } from '@mui/material';

import AbstractTable from "./AbstractTable";

// // Mock data
// interface User {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     age: number;
//     status: 'active' | 'inactive' | 'pending';
//     lastLogin: Date;
//     website: string;
//     isAdmin: boolean;
//     salary: number;
// };

// const mockUsers: User[] = Array.from({ length: 20 }, (_, i) => ({
//     id: i + 1,
//     firstName: `John${i + 1}`,
//     lastName: `Doe${i + 1}`,
//     email: `john.doe${i + 1}@example.com`,
//     age: 25 + Math.floor(Math.random() * 30),
//     status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)] as User['status'],
//     lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
//     website: `https://example${i + 1}.com`,
//     isAdmin: Math.random() > 0.8,
//     salary: Math.round(50000 + (Math.random() * 50000)),
// }));

// // Column definitions
// const columns: ColumnDetail[] = [
//     {
//         title: 'ID',
//         accessor: 'id',
//         inputType: InputType.NUMBER,
//         showColumn: true,
//         isSortable: true,
//         isEditable: false,
//         detailedDescription: 'Unique identifier for the user',
//         width: '80px',
//         align: 'center'
//     },
//     {
//         title: 'First Name',
//         accessor: 'firstName',
//         inputType: InputType.TEXT,
//         showColumn: true,
//         isEditable: true,
//         isSortable: true,
//         detailedDescription: 'User\'s first name'
//     },
//     {
//         title: 'Last Name',
//         accessor: 'lastName',
//         inputType: InputType.TEXT,
//         showColumn: true,
//         isEditable: true,
//         isSortable: true,
//         detailedDescription: 'User\'s last name'
//     },
//     {
//         title: 'Email',
//         accessor: 'email',
//         inputType: InputType.TEXT,
//         showColumn: true,
//         isEditable: true,
//         isSortable: true,
//         detailedDescription: 'User\'s email address'
//     },
//     {
//         title: 'Age',
//         accessor: 'age',
//         inputType: InputType.NUMBER,
//         showColumn: true,
//         isEditable: true,
//         isSortable: true,
//         addSuffix: ' years',
//         detailedDescription: 'User\'s age in years',
//         align: 'right'
//     },
//     {
//         title: 'Status',
//         accessor: 'status',
//         inputType: InputType.SELECT,
//         showColumn: true,
//         isEditable: true,
//         isSortable: true,
//         detailedDescription: 'Current account status',
//         options: [
//             { value: 'active', label: 'Active' },
//             { value: 'inactive', label: 'Inactive' },
//             { value: 'pending', label: 'Pending' }
//         ]
//     },
//     {
//         title: 'Last Login',
//         accessor: 'lastLogin',
//         inputType: InputType.DATE,
//         showColumn: true,
//         isEditable: false,
//         isSortable: true,
//         detailedDescription: 'Date of last login'
//     },
//     {
//         title: 'Website',
//         accessor: 'website',
//         inputType: InputType.TEXT,
//         isUrl: true,
//         showColumn: true,
//         isEditable: true,
//         isSortable: true,
//         detailedDescription: 'User\'s website URL'
//     },
//     {
//         title: 'Admin',
//         accessor: 'isAdmin',
//         inputType: InputType.CHECKBOX,
//         showColumn: true,
//         isEditable: true,
//         isSortable: true,
//         detailedDescription: 'Whether the user has admin privileges',
//         align: 'center'
//     },
//     {
//         title: 'Salary',
//         accessor: 'salary',
//         inputType: InputType.NUMBER,
//         isDollarAmount: true,
//         showColumn: true,
//         isEditable: true,
//         isSortable: true,
//         detailedDescription: 'User\'s annual salary',
//         align: 'right'
//     },
//     {
//         title: 'Actions',
//         accessor: 'id',
//         inputType: InputType.CUSTOM,
//         showColumn: true,
//         isSortable: false,
//         detailedDescription: 'User actions'
//     }
// ];

// // Create a theme for the table
// const theme = createTheme();

// // Router wrapper for navigation (simplified without routing)
// // const WithTheme = (Story: React.ComponentType) => (
// //     <ThemeProvider theme= { theme } >
// //     <Story />
// //     </ThemeProvider>
// // );

// // Create a wrapper component for state management
// const TableWithState = (args: AbstractTableProps<T>) => {
//     const [data, setData] = useState(mockUsers);

//     const handleCellEdit = (newValue: any, row: User, accessor: string) => {
//         const updatedData = data.map(item => {
//             if (item.id === row.id) {
//                 return { ...item, [accessor]: newValue };
//             }
//             return item;
//         });

//         setData(updatedData);
//     };

//     const handleRowClick = (row: User) => {
//         console.log('Row clicked:', row);
//     };

//     // Return a regular JavaScript object instead of JSX directly
//     const props = {
//         ...args,
//         data,
//         columns,
//         onCellEdit={ handleCellEdit },
//         onRowClick={ args.onRowClick ? handleRowClick : undefined }
//     };


//     return React.createElement(AbstractTable, props);

// //     return (
// //         <div style= {{ padding: '20px', maxWidth: '1200px' }
// // }>
// //     <AbstractTable
// //                 { ...args }
// // data = { data }
// // columns = { columns }
// // onCellEdit = { handleCellEdit }
// // onRowClick = { args.onRowClick ? handleRowClick : undefined }
// //     />
// //     </div>
// //     );
// };

// const meta = {
//     title: 'Components/AbstractTable',
//     component: TableWithState,
//     // decorators: [WithTheme],
//     tags: ['autodocs'],
//     parameters: {
//         componentSubtitle: 'A versatile data table component with sorting, pagination, and editing capabilities',
//         layout: 'fullscreen',
//         docs: {
//             description: {
//                 component: 'A Material UI based table component that supports sorting, pagination, in-line editing, and more.'
//             }
//         }
//     },
//     argTypes: {
//         enablePagination: {
//             control: 'boolean',
//             description: 'Whether to enable pagination',
//             table: {
//                 category: 'Pagination',
//                 type: { summary: 'boolean' },
//                 defaultValue: { summary: 'true' }
//             }
//         },
//         defaultPageSize: {
//             control: 'number',
//             description: 'Default number of rows per page',
//             table: {
//                 category: 'Pagination',
//                 type: { summary: 'number' },
//                 defaultValue: { summary: 10 }
//             }
//         },
//         stickyHeader: {
//             control: 'boolean',
//             description: 'Whether the table header should stick to the top during scrolling',
//             table: {
//                 category: 'Appearance',
//                 type: { summary: 'boolean' },
//                 defaultValue: { summary: 'true' }
//             }
//         },
//         striped: {
//             control: 'boolean',
//             description: 'Whether to apply alternating row colors',
//             table: {
//                 category: 'Appearance',
//                 type: { summary: 'boolean' },
//                 defaultValue: { summary: 'true' }
//             }
//         },
//         hoverable: {
//             control: 'boolean',
//             description: 'Whether rows should highlight on hover',
//             table: {
//                 category: 'Appearance',
//                 type: { summary: 'boolean' },
//                 defaultValue: { summary: 'true' }
//             }
//         },
//         dense: {
//             control: 'boolean',
//             description: 'Whether to use more compact spacing',
//             table: {
//                 category: 'Appearance',
//                 type: { summary: 'boolean' },
//                 defaultValue: { summary: 'false' }
//             }
//         },
//         elevation: {
//             control: { type: 'range', min: 0, max: 24, step: 1 },
//             description: 'The elevation of the paper component',
//             table: {
//                 category: 'Appearance',
//                 type: { summary: 'number' },
//                 defaultValue: { summary: 1 }
//             }
//         },
//         onRowClick: {
//             control: 'boolean',
//             description: 'Whether rows should be clickable',
//             table: {
//                 category: 'Behavior',
//                 type: { summary: 'function' }
//             }
//         },
//         emptyStateMessage: {
//             control: 'text',
//             description: 'Message to display when there is no data',
//             table: {
//                 category: 'Content',
//                 type: { summary: 'string' },
//                 defaultValue: { summary: 'No data available' }
//             }
//         },
//         showTableTitle: {
//             control: 'boolean',
//             description: 'Whether to show a title above the table',
//             table: {
//                 category: 'Appearance',
//                 type: { summary: 'boolean' },
//                 defaultValue: { summary: 'false' }
//             }
//         },
//         tableTitle: {
//             control: 'text',
//             description: 'Title to display above the table',
//             table: {
//                 category: 'Content',
//                 type: { summary: 'string' },
//                 defaultValue: { summary: 'Data Table' }
//             }
//         },
//         highlightedRowId: {
//             control: 'number',
//             description: 'ID of row to highlight',
//             table: {
//                 category: 'Behavior',
//                 type: { summary: 'string | number' }
//             }
//         },
//         defaultSortColumn: {
//             control: 'select',
//             options: ['id', 'firstName', 'lastName', 'email', 'age', 'status', 'salary'],
//             description: 'Column to sort by default',
//             table: {
//                 category: 'Sorting',
//                 type: { summary: 'string' }
//             }
//         },
//         defaultSortDirection: {
//             control: 'radio',
//             options: ['asc', 'desc'],
//             description: 'Direction of default sort',
//             table: {
//                 category: 'Sorting',
//                 type: { summary: 'asc | desc' },
//                 defaultValue: { summary: 'asc' }
//             }
//         },
//         isLoading: {
//             control: 'boolean',
//             description: 'Whether to show a loading state',
//             table: {
//                 category: 'State',
//                 type: { summary: 'boolean' },
//                 defaultValue: { summary: 'false' }
//             }
//         }
//     },
//     args: {
//         enablePagination: true,
//         defaultPageSize: 10,
//         stickyHeader: true,
//         striped: true,
//         hoverable: true,
//         dense: false,
//         elevation: 1,
//         emptyStateMessage: 'No data available',
//         showTableTitle: false,
//         tableTitle: 'User Data',
//         onRowClick: false,
//         isLoading: false
//     }
// } as Meta<typeof AbstractTable>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// // Default table with all features
// export const Default: Story = {
//     args: {},
//     parameters: {
//         docs: {
//             storyDescription: 'Default table with all features enabled',
//         }
//     },
// };

// // Table with title
// export const WithTableTitle: Story = {
//     args: {
//         showTableTitle: true,
//         tableTitle: 'User Management',
//     },
//     parameters: {
//         docs: {
//             storyDescription: 'Table with a visible title',
//         }
//     },
// };

// // Compact table
// export const CompactTable: Story = {
//     args: {
//         dense: true,
//     },
//     parameters: {
//         docs: {
//             storyDescription: 'Compact table with reduced row height',
//         }
//     },
// };

// // Loading state
// export const LoadingState: Story = {
//     args: {
//         isLoading: true,
//     },
//     parameters: {
//         docs: {
//             storyDescription: 'Table in loading state',
//         }
//     },
// };

// // Clickable rows
// export const ClickableRows: Story = {
//     args: {
//         onRowClick: true,
//     },
//     parameters: {
//         docs: {
//             storyDescription: 'Table with clickable rows',
//         }
//     },
// };

// // Sorted table
// export const SortedTable: Story = {
//     args: {
//         defaultSortColumn: 'lastName',
//         defaultSortDirection: 'asc',
//     },
//     parameters: {
//         docs: {
//             storyDescription: 'Table pre-sorted by last name',
//         }
//     },
// };

// // Highlighted row
// export const HighlightedRow: Story = {
//     args: {
//         highlightedRowId: 3,
//     },
//     parameters: {
//         docs: {
//             storyDescription: 'Table with a highlighted row (ID: 3)',
//         }
//     },
// };

// // Without pagination
// export const WithoutPagination: Story = {
//     args: {
//         enablePagination: false,
//     },
//     parameters: {
//         docs: {
//             storyDescription: 'Table without pagination controls',
//         }
//     },
// };

// // Plain style (no striping or hover effects)
// export const PlainStyle: Story = {
//     args: {
//         striped: false,
//         hoverable: false,
//     },
//     parameters: {
//         docs: {
//             storyDescription: 'Table with plain styling (no row striping or hover effects)',
//         }
//     },
// };

// // Empty table
// export const EmptyTable: Story = {
//     render: (args) => {
//         return (
//             <div style= {{ padding: '20px', maxWidth: '1200px' }
//     }>
//     <AbstractTable
//                     { ...args }
// data = { []}
// columns = { columns }
//     />
//     </div>
//         );
//     },
// args: {
//     emptyStateMessage: 'No users found. Try adjusting your filters.',
//     },
// parameters: {
//     docs: {
//         storyDescription: 'Table with no data showing custom empty state message',
//         }
// },
// };

export default {
    title: 'Components/AbstractTable',
    component: AbstractTable,
};
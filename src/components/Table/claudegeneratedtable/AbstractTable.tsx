import React from 'react';
// import React, { useState, useEffect, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TableSortLabel,
//     TablePagination,
//     Paper,
//     TextField,
//     Checkbox,
//     IconButton,
//     Button,
//     Link,
//     Typography,
//     CircularProgress,
//     Box,
//     styled,
//     Tooltip,
//     Chip,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     OutlinedInput,
//     InputAdornment
// } from '@mui/material';
// import { Edit as EditIcon, Link as LinkIcon, ArrowDropDown } from '@mui/icons-material';

// // Import the column type (uncomment if in a separate file)
// // import { ColumnDetail } from './types';

// // Enum for input types (should match what you're using)
// export enum InputType {
//     TEXT = 'text',
//     SELECT = 'select',
//     NUMBER = 'number',
//     DATE = 'date',
//     CHECKBOX = 'checkbox',
//     TEXTAREA = 'textarea',
//     CUSTOM = 'custom'
// }

// // Define the column type if it's not imported
// export type ColumnDetail = {
//     title: string;
//     accessor: string;
//     inputType: InputType;
//     isUrl?: boolean;
//     isDollarAmount?: boolean;
//     addSuffix?: string;
//     showColumn?: boolean;
//     isEditable?: boolean;
//     isSortable?: boolean;
//     detailedDescription?: string;
//     routeTo?: string;
//     width?: string;
//     minWidth?: string;
//     align?: 'left' | 'center' | 'right';
//     customRender?: (value: any, row: any, index: number) => React.ReactNode;
//     options?: Array<{ value: string; label: string }>;
// };

// // Table props
// export interface AbstractTableProps<T extends Record<string, any>> {
//     data: T[];
//     columns: ColumnDetail[];
//     isLoading?: boolean;
//     onRowClick?: (row: T, index: number) => void;
//     onCellEdit?: (newValue: any, row: T, accessor: string, rowIndex: number) => void;
//     emptyStateMessage?: string;
//     enablePagination?: boolean;
//     defaultPageSize?: number;
//     pageSizeOptions?: number[];
//     className?: string;
//     elevation?: number;
//     stickyHeader?: boolean;
//     striped?: boolean;
//     hoverable?: boolean;
//     dense?: boolean;
//     highlightedRowId?: string | number;
//     rowKeyField?: string;
//     defaultSortColumn?: string;
//     defaultSortDirection?: 'asc' | 'desc';
//     showTableTitle?: boolean;
//     tableTitle?: string;
// }

// // Styled components
// const StyledTableRow = styled(TableRow, {
//     shouldForwardProp: (prop) =>
//         prop !== 'highlighted' &&
//         prop !== 'isStriped' &&
//         prop !== 'isHoverable' &&
//         prop !== 'isClickable'
// })<{
//     highlighted: boolean;
//     isStriped: boolean;
//     isHoverable: boolean;
//     isClickable: boolean;
// }>(({ theme, highlighted, isStriped, isHoverable, isClickable }) => ({
//     ...(highlighted && {
//         backgroundColor: theme.palette.action.selected,
//     }),
//     ...(isStriped && {
//         '&:nth-of-type(odd)': {
//             backgroundColor: theme.palette.action.hover,
//         },
//     }),
//     ...(isHoverable && {
//         '&:hover': {
//             backgroundColor: theme.palette.action.hover,
//         },
//     }),
//     ...(isClickable && {
//         cursor: 'pointer',
//     }),
// }));

// const StyledTableCell = styled(TableCell, {
//     shouldForwardProp: (prop) => prop !== 'isEditable'
// })<{ isEditable: boolean }>(({ theme, isEditable }) => ({
//     ...(isEditable && {
//         cursor: 'pointer',
//         '&:hover': {
//             '& .edit-icon': {
//                 opacity: 1,
//             },
//         },
//     }),
// }));

// const EditIconStyled = styled(EditIcon)({
//     fontSize: '0.875rem',
//     marginLeft: '8px',
//     opacity: 0,
//     transition: 'opacity 0.2s',
// });

// const LoadingOverlay = styled(Box)({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '2rem',
//     width: '100%',
// });

// const EmptyStateContainer = styled(Box)({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '2rem',
//     width: '100%',
// });


// // const RadioButtonComponent: React.FC<RadioButtonComponentProps> = ({ name, value, onChange, options, label }) => {
// // The main AbstractTable component

// // const AbstractTable = <K extends TableType, Y, X>({
// const AbstractTable = <T extends Record<string, any>>({
//     data,
//     columns,
//     isLoading = false,
//     onRowClick,
//     onCellEdit,
//     emptyStateMessage = 'No data available',
//     enablePagination = true,
//     defaultPageSize = 10,
//     pageSizeOptions = [5, 10, 25, 50],
//     className = '',
//     elevation = 1,
//     stickyHeader = true,
//     striped = true,
//     hoverable = true,
//     dense = false,
//     highlightedRowId,
//     rowKeyField = 'id',
//     defaultSortColumn,
//     defaultSortDirection = 'asc',
//     showTableTitle = false,
//     tableTitle = 'Data Table'
// }: AbstractTableProps<T>) => {



//     // export const AbstractTable: React.FC<T extends Record<string, any>> = ({
//     //     data,
//     //     columns,
//     //     isLoading = false,
//     //     onRowClick,
//     //     onCellEdit,
//     //     emptyStateMessage = 'No data available',
//     //     enablePagination = true,
//     //     defaultPageSize = 10,
//     //     pageSizeOptions = [5, 10, 25, 50],
//     //     className = '',
//     //     elevation = 1,
//     //     stickyHeader = true,
//     //     striped = true,
//     //     hoverable = true,
//     //     dense = false,
//     //     highlightedRowId,
//     //     rowKeyField = 'id',
//     //     defaultSortColumn,
//     //     defaultSortDirection = 'asc',
//     //     showTableTitle = false,
//     //     tableTitle = 'Data Table'
//     // }: AbstractTableProps<T>)  => {



//     // export function AbstractTable<T extends Record<string, any>>({
//     //     data,
//     //     columns,
//     //     isLoading = false,
//     //     onRowClick,
//     //     onCellEdit,
//     //     emptyStateMessage = 'No data available',
//     //     enablePagination = true,
//     //     defaultPageSize = 10,
//     //     pageSizeOptions = [5, 10, 25, 50],
//     //     className = '',
//     //     elevation = 1,
//     //     stickyHeader = true,
//     //     striped = true,
//     //     hoverable = true,
//     //     dense = false,
//     //     highlightedRowId,
//     //     rowKeyField = 'id',
//     //     defaultSortColumn,
//     //     defaultSortDirection = 'asc',
//     //     showTableTitle = false,
//     //     tableTitle = 'Data Table'
//     // }: AbstractTableProps<T>) {
//     const navigate = useNavigate();

//     // State for pagination
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);

//     // State for sorting
//     const [sortConfig, setSortConfig] = useState<{
//         key: string;
//         direction: 'asc' | 'desc';
//     } | null>(defaultSortColumn ? { key: defaultSortColumn, direction: defaultSortDirection } : null);

//     // State for cell editing
//     const [editingCell, setEditingCell] = useState<{
//         rowIndex: number;
//         accessor: string;
//         value: any;
//     } | null>(null);

//     // Reset to first page when data changes
//     useEffect(() => {
//         setPage(0);
//     }, [data]);

//     // Filter columns that should be visible
//     const visibleColumns = useMemo(() => {
//         return columns.filter(col => col.showColumn !== false);
//     }, [columns]);

//     // Sort data based on current sort configuration
//     const sortedData = useMemo(() => {
//         if (!sortConfig) return data;

//         return [...data].sort((a, b) => {
//             const aValue = a[sortConfig.key];
//             const bValue = b[sortConfig.key];

//             if (aValue === undefined || aValue === null) return sortConfig.direction === 'asc' ? -1 : 1;
//             if (bValue === undefined || bValue === null) return sortConfig.direction === 'asc' ? 1 : -1;

//             // Handle different data types
//             if (typeof aValue === 'string' && typeof bValue === 'string') {
//                 return sortConfig.direction === 'asc'
//                     ? aValue.localeCompare(bValue)
//                     : bValue.localeCompare(aValue);
//             }

//             // Handle Date objects
//             if (aValue instanceof Date && bValue instanceof Date) {
//                 return sortConfig.direction === 'asc'
//                     ? aValue.getTime() - bValue.getTime()
//                     : bValue.getTime() - aValue.getTime();
//             }

//             return sortConfig.direction === 'asc'
//                 ? (aValue > bValue ? 1 : -1)
//                 : (aValue < bValue ? 1 : -1);
//         });
//     }, [data, sortConfig]);

//     // Get current page data if pagination is enabled
//     const currentData = useMemo(() => {
//         if (!enablePagination) return sortedData;

//         const startIndex = page * rowsPerPage;
//         return sortedData.slice(startIndex, startIndex + rowsPerPage);
//     }, [sortedData, page, rowsPerPage, enablePagination]);

//     // Handle page change
//     const handleChangePage = (event: unknown, newPage: number) => {
//         setPage(newPage);
//     };

//     // Handle rows per page change
//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     // Handle column sort
//     const handleSort = (accessor: string) => {
//         const column = columns.find(col => col.accessor === accessor);
//         if (!column || column.isSortable === false) return;

//         setSortConfig(prevSort => {
//             if (!prevSort || prevSort.key !== accessor) {
//                 return { key: accessor, direction: 'asc' };
//             }
//             if (prevSort.direction === 'asc') {
//                 return { key: accessor, direction: 'desc' };
//             }
//             return null; // Remove sorting
//         });
//     };

//     // Handle cell click for editing
//     const handleCellClick = (rowIndex: number, accessor: string, row: T) => {
//         const column = columns.find(col => col.accessor === accessor);

//         if (column?.isEditable) {
//             setEditingCell({
//                 rowIndex,
//                 accessor,
//                 value: row[accessor]
//             });
//         }

//         if (column?.routeTo) {
//             let route = column.routeTo;

//             // Replace any route parameters with values from the row
//             const routeParams = route.match(/:(\w+)/g);
//             if (routeParams) {
//                 routeParams.forEach(param => {
//                     const key = param.substring(1); // Remove the colon
//                     if (row[key] !== undefined) {
//                         route = route.replace(param, row[key]);
//                     }
//                 });
//             }

//             navigate(route);
//         }
//     };

//     // Handle cell edit save
//     const handleCellEditSave = (rowIndex: number, accessor: string) => {
//         if (editingCell && onCellEdit && currentData[rowIndex]) {
//             onCellEdit(editingCell.value, currentData[rowIndex], accessor, rowIndex);
//         }
//         setEditingCell(null);
//     };

//     // Handle cell edit cancel
//     const handleCellEditCancel = () => {
//         setEditingCell(null);
//     };

//     // Handle cell edit change
//     const handleCellEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         if (editingCell) {
//             setEditingCell({
//                 ...editingCell,
//                 value: e.target.value
//             });
//         }
//     };

//     // Handle checkbox change
//     const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (editingCell) {
//             setEditingCell({
//                 ...editingCell,
//                 value: e.target.checked
//             });
//         }
//     };

//     // Handle key down for cell editor
//     const handleEditorKeyDown = (e: React.KeyboardEvent) => {
//         if (e.key === 'Enter') {
//             e.preventDefault();
//             if (editingCell) {
//                 handleCellEditSave(editingCell.rowIndex, editingCell.accessor);
//             }
//         } else if (e.key === 'Escape') {
//             e.preventDefault();
//             handleCellEditCancel();
//         }
//     };

//     // Render cell editor based on input type
//     const renderCellEditor = (column: ColumnDetail) => {
//         if (!editingCell) return null;

//         switch (column.inputType) {
//             case InputType.TEXT:
//                 return (
//                     <TextField
//                         variant="outlined"
//                         size="small"
//                         fullWidth
//                         autoFocus
//                         value={editingCell.value || ''}
//                         onChange={handleCellEditChange}
//                         onKeyDown={handleEditorKeyDown}
//                         onBlur={() => handleCellEditSave(editingCell.rowIndex, editingCell.accessor)}
//                     />
//                 );

//             case InputType.NUMBER:
//                 return (
//                     <TextField
//                         variant="outlined"
//                         size="small"
//                         fullWidth
//                         type="number"
//                         autoFocus
//                         value={editingCell.value || ''}
//                         onChange={handleCellEditChange}
//                         onKeyDown={handleEditorKeyDown}
//                         onBlur={() => handleCellEditSave(editingCell.rowIndex, editingCell.accessor)}
//                         InputProps={column.isDollarAmount ? {
//                             startAdornment: <InputAdornment position="start">$</InputAdornment>,
//                         } : undefined}
//                     />
//                 );

//             case InputType.DATE:
//                 return (
//                     <TextField
//                         variant="outlined"
//                         size="small"
//                         fullWidth
//                         type="date"
//                         autoFocus
//                         value={editingCell.value instanceof Date
//                             ? editingCell.value.toISOString().split('T')[0]
//                             : editingCell.value || ''
//                         }
//                         onChange={handleCellEditChange}
//                         onKeyDown={handleEditorKeyDown}
//                         onBlur={() => handleCellEditSave(editingCell.rowIndex, editingCell.accessor)}
//                     />
//                 );

//             case InputType.CHECKBOX:
//                 return (
//                     <Checkbox
//                         checked={!!editingCell.value}
//                         onChange={handleCheckboxChange}
//                         onKeyDown={handleEditorKeyDown}
//                         onBlur={() => handleCellEditSave(editingCell.rowIndex, editingCell.accessor)}
//                         autoFocus
//                     />
//                 );

//             case InputType.TEXTAREA:
//                 return (
//                     <TextField
//                         variant="outlined"
//                         size="small"
//                         fullWidth
//                         multiline
//                         rows={3}
//                         autoFocus
//                         value={editingCell.value || ''}
//                         onChange={handleCellEditChange}
//                         onKeyDown={handleEditorKeyDown}
//                         onBlur={() => handleCellEditSave(editingCell.rowIndex, editingCell.accessor)}
//                     />
//                 );

//             case InputType.SELECT:
//                 return (
//                     <FormControl variant="outlined" size="small" fullWidth>
//                         <Select
//                             value={editingCell.value || ''}
//                             onChange={(e) => {
//                                 if (editingCell) {
//                                     setEditingCell({
//                                         ...editingCell,
//                                         value: e.target.value
//                                     });
//                                 }
//                             }}
//                             onKeyDown={handleEditorKeyDown}
//                             onBlur={() => handleCellEditSave(editingCell.rowIndex, editingCell.accessor)}
//                             autoFocus
//                             input={<OutlinedInput />}
//                         >
//                             {column.options?.map((option) => (
//                                 <MenuItem key={option.value} value={option.value}>
//                                     {option.label}
//                                 </MenuItem>
//                             )) || []}
//                         </Select>
//                     </FormControl>
//                 );

//             default:
//                 return (
//                     <TextField
//                         variant="outlined"
//                         size="small"
//                         fullWidth
//                         autoFocus
//                         value={editingCell.value || ''}
//                         onChange={handleCellEditChange}
//                         onKeyDown={handleEditorKeyDown}
//                         onBlur={() => handleCellEditSave(editingCell.rowIndex, editingCell.accessor)}
//                     />
//                 );
//         }
//     };

//     // Render cell content
//     const renderCellContent = (row: T, column: ColumnDetail, rowIndex: number) => {
//         const { accessor, customRender, isUrl, isDollarAmount, addSuffix, isEditable } = column;
//         const value = row[accessor];

//         // Check if we should render the cell editor
//         if (editingCell &&
//             editingCell.rowIndex === rowIndex &&
//             editingCell.accessor === accessor) {
//             return renderCellEditor(column);
//         }

//         // Use custom render function if provided
//         if (customRender) {
//             return customRender(value, row, rowIndex);
//         }

//         // Handle URL rendering
//         if (isUrl && value) {
//             return (
//                 <Link
//                     href={value}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     sx={{ display: 'flex', alignItems: 'center' }}
//                 >
//                     {value}
//                     <LinkIcon fontSize="small" sx={{ ml: 0.5 }} />
//                 </Link>
//             );
//         }

//         // Handle dollar amount rendering
//         if (isDollarAmount && value !== undefined && value !== null) {
//             return `$${parseFloat(value).toFixed(2)}`;
//         }

//         // Handle suffix
//         if (addSuffix && value !== undefined && value !== null) {
//             return `${value}${addSuffix}`;
//         }

//         // Default rendering based on data type
//         if (value === undefined || value === null) {
//             return '';
//         }

//         if (typeof value === 'boolean') {
//             return (
//                 <Checkbox
//                     checked={value}
//                     disableRipple
//                     disabled={!isEditable}
//                     readOnly={!isEditable}
//                 />
//             );
//         }

//         if (value instanceof Date) {
//             return value.toLocaleDateString();
//         }

//         return String(value);
//     };

//     // If loading, show loading indicator
//     if (isLoading) {
//         return (
//             <Paper
//                 elevation={elevation}
//                 className={className}
//                 sx={{ width: '100%', overflow: 'hidden' }}
//             >
//                 <LoadingOverlay>
//                     <CircularProgress size={40} />
//                     <Typography variant="body1" sx={{ mt: 2 }}>
//                         Loading...
//                     </Typography>
//                 </LoadingOverlay>
//             </Paper>
//         );
//     }

//     // If no data, show empty state
//     if (data.length === 0) {
//         return (
//             <Paper
//                 elevation={elevation}
//                 className={className}
//                 sx={{ width: '100%', overflow: 'hidden' }}
//             >
//                 <EmptyStateContainer>
//                     <Typography variant="body1" color="text.secondary">
//                         {emptyStateMessage}
//                     </Typography>
//                 </EmptyStateContainer>
//             </Paper>
//         );
//     }

//     return (
//         <Paper
//             elevation={elevation}
//             className={className}
//             sx={{ width: '100%', overflow: 'hidden' }}
//         >
//             {showTableTitle && (
//                 <Box sx={{ padding: 2, borderBottom: 1, borderColor: 'divider' }}>
//                     <Typography variant="h6" component="h2">
//                         {tableTitle}
//                     </Typography>
//                 </Box>
//             )}

//             <TableContainer sx={{ maxHeight: stickyHeader ? 440 : undefined }}>
//                 <Table
//                     stickyHeader={stickyHeader}
//                     size={dense ? 'small' : 'medium'}
//                 >
//                     <TableHead>
//                         <TableRow>
//                             {visibleColumns.map((column) => (
//                                 <TableCell
//                                     key={column.accessor}
//                                     align={column.align || 'left'}
//                                     style={{
//                                         width: column.width,
//                                         minWidth: column.minWidth,
//                                     }}
//                                     sortDirection={sortConfig && sortConfig.key === column.accessor ? sortConfig.direction : false}
//                                 >
//                                     {column.isSortable !== false ? (
//                                         <Tooltip title={column.detailedDescription || ''}>
//                                             <TableSortLabel
//                                                 active={sortConfig?.key === column.accessor}
//                                                 direction={sortConfig?.key === column.accessor ? sortConfig.direction : 'asc'}
//                                                 onClick={() => handleSort(column.accessor)}
//                                             >
//                                                 {column.title}
//                                             </TableSortLabel>
//                                         </Tooltip>
//                                     ) : (
//                                         <Tooltip title={column.detailedDescription || ''}>
//                                             <Typography variant="subtitle2">
//                                                 {column.title}
//                                             </Typography>
//                                         </Tooltip>
//                                     )}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {currentData.map((row, rowIndex) => (
//                             <StyledTableRow
//                                 key={rowKeyField && row[rowKeyField] ? row[rowKeyField] : rowIndex}
//                                 highlighted={!!highlightedRowId && row[rowKeyField] === highlightedRowId}
//                                 isStriped={striped}
//                                 isHoverable={hoverable}
//                                 isClickable={!!onRowClick}
//                                 onClick={() => onRowClick && onRowClick(row, rowIndex)}
//                                 tabIndex={onRowClick ? 0 : undefined}
//                             >
//                                 {visibleColumns.map((column) => (
//                                     <StyledTableCell
//                                         key={column.accessor}
//                                         align={column.align || 'left'}
//                                         isEditable={!!column.isEditable}
//                                         onClick={(e) => {
//                                             // Prevent triggering row click when cell is clicked for editing
//                                             if (column.isEditable || column.routeTo) {
//                                                 e.stopPropagation();
//                                                 handleCellClick(rowIndex, column.accessor, row);
//                                             }
//                                         }}
//                                     >
//                                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                             {renderCellContent(row, column, rowIndex)}
//                                             {column.isEditable && (
//                                                 <EditIconStyled className="edit-icon" />
//                                             )}
//                                         </Box>
//                                     </StyledTableCell>
//                                 ))}
//                             </StyledTableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {enablePagination && (
//                 <TablePagination
//                     rowsPerPageOptions={pageSizeOptions}
//                     component="div"
//                     count={sortedData.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//             )}
//         </Paper>
//     );
// }

// export default AbstractTable;

const AbstractTable = () => {
    return (
        <div>
            <h1>AbstractTable</h1>
        </div>
    );
}

export default AbstractTable;
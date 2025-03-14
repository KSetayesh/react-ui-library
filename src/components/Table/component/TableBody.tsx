import React from 'react';
import {
    TableBody as MuiTableBody,
    TableRow,
    TableCell,
    Checkbox,
    Typography,
    Link,
    IconButton,
    Tooltip,
    Box,
    styled
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { BasicTable } from '../models/BasicTable';
import { BasicColumn, TableCellValue } from '../models/BasicColumn';

// Styled Components
const StyledTableBodyCell = styled(TableCell)(({ theme }) => ({
    borderRight: '1px solid rgba(224, 224, 224, 1)',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    padding: theme.spacing(1),
    textAlign: 'center'
}));

const StyledSelectTableBodyCell = styled(TableCell)(({ theme }) => ({
    borderRight: '1px solid rgba(224, 224, 224, 1)',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    padding: theme.spacing(1)
}));

const ActionsCell = styled(TableCell)(({ theme }) => ({
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    padding: theme.spacing(1)
}));

type TableBodyProps<T> = {
    table: BasicTable<T>;
    data: T[];
    columns: BasicColumn<T>[];
    page: number;
    rowsPerPage: number;
    selectedRows: Set<number>;
    onRowClick?: (row: T) => void;
    onRowSelect: (event: React.MouseEvent<unknown>, index: number) => void;
    onEdit: (event: React.MouseEvent<unknown>, row: T) => void;
    onDelete: (event: React.MouseEvent<unknown>, index: number) => void;
};

// Helper function to access nested properties
export function getNestedProperty<T>(obj: T, accessor: (item: T) => TableCellValue): TableCellValue {
    // If the accessor key points to a nested object (e.g., 'listingDetails'),
    // we return the whole nested object to be processed by formatCellValue
    return accessor(obj);
}

function TableBody<T>({
    table,
    data,
    columns,
    page,
    rowsPerPage,
    selectedRows,
    onRowClick,
    onRowSelect,
    onEdit,
    onDelete
}: TableBodyProps<T>) {
    const isSelected = (index: number) =>
        selectedRows.has(page * rowsPerPage + index);

    if (data.length === 0) {
        return (
            <MuiTableBody>
                <TableRow>
                    <StyledTableBodyCell
                        colSpan={
                            columns.length +
                            (table.isSelectable ? 1 : 0) +
                            ((table.isEditable || table.isDeletable) ? 1 : 0)
                        }
                        align="center"
                    >
                        <Typography variant="body1" color="text.secondary">
                            No data available
                        </Typography>
                    </StyledTableBodyCell>
                </TableRow>
            </MuiTableBody>
        );
    }

    return (
        <MuiTableBody>
            {data.map((row, index) => {
                const isItemSelected = isSelected(index);
                const labelId = `table-checkbox-${index}`;

                return (
                    <TableRow
                        hover
                        onClick={() => onRowClick && onRowClick(row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                        sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                    >
                        {table.isSelectable && (
                            <StyledSelectTableBodyCell>
                                <Checkbox
                                    checked={isItemSelected}
                                    aria-labelledby={labelId}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onRowSelect(event, index);
                                    }}
                                />
                            </StyledSelectTableBodyCell>
                        )}

                        {columns.map(column => {
                            // Get the value at the path specified by accessor
                            const cellValue: TableCellValue = getNestedProperty(row, column.accessor);

                            // For nested properties like 'listingDetails', we might need to 
                            // pass the entire row to formatCellValue if the column knows how to extract nested values
                            // const valueToFormat = cellValue !== undefined ? cellValue : row;

                            // Use the column's formatCellValue method
                            const displayValue = column.formatCellValue(cellValue);

                            return (
                                <StyledTableBodyCell key={column.key}>
                                    {column.shouldRenderAsLink(cellValue) ? (
                                        <Link
                                            href={column.getLinkUrl(cellValue)}
                                            target={column.isUrl ? "_blank" : undefined}
                                            rel={column.isUrl ? "noopener noreferrer" : undefined}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {displayValue}
                                        </Link>
                                    ) : (
                                        displayValue
                                    )}
                                </StyledTableBodyCell>
                            );
                        })}

                        {(table.isEditable || table.isDeletable) && (
                            <ActionsCell align="right">
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {table.isEditable && (
                                        <Tooltip title="Edit">
                                            <IconButton
                                                size="small"
                                                onClick={(event) => onEdit(event, row)}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    )}

                                    {table.isDeletable && (
                                        <Tooltip title="Delete">
                                            <IconButton
                                                size="small"
                                                onClick={(event) => onDelete(event, index)}
                                                color="error"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Box>
                            </ActionsCell>
                        )}
                    </TableRow>
                );
            })}
        </MuiTableBody>
    );
}

export default TableBody;
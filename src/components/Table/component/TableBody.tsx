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
import { AbstractTable } from '../models/AbstractTable';
import { AbstractColumn } from '../models/AbstractColumn';

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
    table: AbstractTable<T>;
    data: T[];
    columns: AbstractColumn<T>[];
    page: number;
    rowsPerPage: number;
    selectedRows: Set<number>;
    onRowClick?: (row: T) => void;
    onRowSelect: (event: React.MouseEvent<unknown>, index: number) => void;
    onEdit: (event: React.MouseEvent<unknown>, row: T) => void;
    onDelete: (event: React.MouseEvent<unknown>, index: number) => void;
};

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
                            const cellValue = row[column.accessor];
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
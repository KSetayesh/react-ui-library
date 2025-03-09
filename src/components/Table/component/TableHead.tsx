import React from 'react';
import {
    TableHead as MuiTableHead,
    TableRow,
    TableCell,
    Checkbox,
    Tooltip,
    TableSortLabel,
    Typography,
    styled
} from '@mui/material';
import { SortState, SortDirection } from '../types/TableTypes';
import { AbstractTable } from '../models/AbstractTable';
import { AbstractColumn } from '../models/AbstractColumn';

// Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderRight: '1px solid rgba(224, 224, 224, 1)',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    fontWeight: 600,
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(1),
    textAlign: 'center'
}));

const StyledSelectTableCell = styled(TableCell)(({ theme }) => ({
    borderRight: '1px solid rgba(224, 224, 224, 1)',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    padding: theme.spacing(1)
}));

type TableHeadProps<T> = {
    table: AbstractTable<T>;
    columns: AbstractColumn<T>[];
    sortState: SortState;
    onSort: (columnKey: string) => void;
    selectedRows: Set<number>;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowsInPage: number;
};

function TableHead<T>({
    table,
    columns,
    sortState,
    onSort,
    selectedRows,
    onSelectAllClick,
    rowsInPage
}: TableHeadProps<T>) {
    // Calculate if all rows are selected
    const numSelected = selectedRows.size;
    const isAllSelected = rowsInPage > 0 && numSelected === rowsInPage;

    return (
        <MuiTableHead>
            <TableRow>
                {table.isSelectable && (
                    <StyledSelectTableCell>
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowsInPage}
                            checked={isAllSelected}
                            onChange={onSelectAllClick}
                            inputProps={{ 'aria-label': 'select all' }}
                        />
                    </StyledSelectTableCell>
                )}

                {columns.map((column, index) => (
                    <StyledTableCell key={column.key}>
                        {column.isSortable ? (
                            <Tooltip title={column.detailedDescription || ""} arrow>
                                <TableSortLabel
                                    active={sortState.column === column.key}
                                    direction={
                                        sortState.column === column.key
                                            ? sortState.direction
                                            : SortDirection.ASC
                                    }
                                    onClick={() => onSort(column.key)}
                                >
                                    {column.title}
                                </TableSortLabel>
                            </Tooltip>
                        ) : (
                            <Tooltip title={column.detailedDescription || ""} arrow>
                                <Typography variant="subtitle2">
                                    {column.title}
                                </Typography>
                            </Tooltip>
                        )}
                    </StyledTableCell>
                ))}

                {(table.isEditable || table.isDeletable) && (
                    <StyledTableCell align="right">
                        Actions
                    </StyledTableCell>
                )}
            </TableRow>
        </MuiTableHead>
    );
}

export default TableHead;
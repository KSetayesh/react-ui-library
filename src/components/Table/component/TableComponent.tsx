import React, { useEffect } from 'react';
import {
    Card,
    TableContainer,
    Table,
    Paper,
    Divider,
    styled
} from '@mui/material';

// Component imports
import TableHeader from './TableHeader';
import TableFilters from './FilterChips';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TablePagination from './TablePagination';
import FilterMenu from './FilterMenu';

// Hooks and Types
import { TableComponentProps } from '../../../types/TableTypes';
import { useTableState } from '../hooks/UseTableState';
import { FilterCriteria } from '../models/TableFilter';
import DeleteConfirmDialog from './DeleteConfirmationDialog';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2]
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    overflowX: 'auto',
    boxShadow: 'none',
    border: 'none'
}));

const StyledTable = styled(Table)(({ theme }) => ({
    minWidth: '100%',
    borderCollapse: 'separate',
    borderSpacing: `0 ${theme.spacing(1)}`
}));

export function TableComponent<T>({
    table,
    onRowClick,
    onSelectionChange,
    elevation = 2,
    dense = false,
}: TableComponentProps<T>) {
    // Use custom hook for table state management
    const tableState = useTableState(table);

    const {
        data,
        paginatedData,
        columns,
        sortState,
        filterState,
        selectedRows,
        page,
        rowsPerPage,
        searchQuery,
        handleSort,
        applyFilters,
        resetFilters,
        handleSearch,
        handleSelectAllClick,
        handleRowSelect,
        handleChangePage,
        handleChangeRowsPerPage,
        setOnSelectionChange
    } = tableState;

    // Set onSelectionChange callback when component mounts
    useEffect(() => {
        if (onSelectionChange) {
            setOnSelectionChange(onSelectionChange);
        }
    }, [onSelectionChange, setOnSelectionChange]);

    // Handle edit
    const handleEdit = (event: React.MouseEvent<unknown>, row: T) => {
        event.stopPropagation();
        console.log('Edit row:', row);
        // Implement your edit logic here
    };

    // State for menus and dialogs
    const [filterMenuAnchor, setFilterMenuAnchor] = React.useState<null | HTMLElement>(null);
    const [exportMenuAnchor, setExportMenuAnchor] = React.useState<null | HTMLElement>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [rowToDelete, setRowToDelete] = React.useState<number | null>(null);

    // Handle delete
    const handleDeleteClick = (event: React.MouseEvent<unknown>, index: number) => {
        event.stopPropagation();
        setRowToDelete(page * rowsPerPage + index);
        setDeleteDialogOpen(true);
    };

    // Confirm delete
    const handleDeleteConfirm = () => {
        if (rowToDelete !== null) {
            // Use the table's delete method
            table.deleteRow(rowToDelete);

            // Close dialog
            setDeleteDialogOpen(false);
            setRowToDelete(null);
        }
    };

    // Cancel delete
    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setRowToDelete(null);
    };

    // Handle export
    const handleExportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setExportMenuAnchor(event.currentTarget);
    };

    const handleExport = (format: string) => {
        // Use the table's export method
        table.exportData(format as any);
        setExportMenuAnchor(null);
    };

    return (
        <StyledCard elevation={elevation}>
            {/* Table Header with Search, Filter, and Export */}
            <TableHeader
                table={table}
                searchQuery={searchQuery}
                onSearch={handleSearch}
                onFilterClick={(e) => setFilterMenuAnchor(e.currentTarget)}
                onExportClick={handleExportClick}
            />

            {/* Active Filters Display */}
            {filterState.isActive && (
                <TableFilters
                    filters={filterState.filters}
                    table={table}
                    onRemoveFilter={(index) => {
                        const newFilters = [...filterState.filters];
                        newFilters.splice(index, 1);
                        applyFilters(newFilters);
                    }}
                    onClearAll={resetFilters}
                />
            )}

            <Divider />

            <StyledTableContainer>
                <StyledTable size={dense ? "small" : "medium"} aria-label={table.title}>
                    {/* Table Head with Sorting and Selection */}
                    <TableHead
                        table={table}
                        columns={columns}
                        sortState={sortState}
                        onSort={handleSort}
                        selectedRows={selectedRows}
                        onSelectAllClick={handleSelectAllClick}
                        rowsInPage={paginatedData.length}
                    />

                    {/* Table Body with Row Rendering */}
                    <TableBody
                        table={table}
                        data={paginatedData}
                        columns={columns}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        selectedRows={selectedRows}
                        onRowClick={onRowClick}
                        onRowSelect={handleRowSelect}
                        onEdit={handleEdit}
                        onDelete={handleDeleteClick}
                    />
                </StyledTable>
            </StyledTableContainer>

            {/* Pagination */}
            {table.isPageable && (
                <TablePagination
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}

            {/* Filter Menu */}
            <FilterMenu
                open={Boolean(filterMenuAnchor)}
                anchorEl={filterMenuAnchor}
                onClose={() => setFilterMenuAnchor(null)}
                table={table}
                columns={columns}
                onApplyFilters={(newFilters: FilterCriteria<T>[]) => {
                    const updatedFilters = [...filterState.filters, ...newFilters];
                    applyFilters(updatedFilters);
                }}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            />
        </StyledCard>
    );
}

export default TableComponent;
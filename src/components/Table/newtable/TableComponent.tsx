import React, { useState, useEffect, JSX } from 'react';
import { AbstractTable, ExportFormat } from './AbstractTable_2.helper';
import { AbstractColumn } from './AbstractColumn_2.helper';
import { FilterCriteria, FilterOperator } from './TableFilter';

// Material-UI Imports
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TableSortLabel,
    Paper,
    Checkbox,
    IconButton,
    Button,
    Typography,
    Box,
    Chip,
    Tooltip,
    Menu,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputAdornment,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Stack,
    Link
} from '@mui/material';

// Material-UI Icons
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    FilterList as FilterListIcon,
    Clear as ClearIcon,
    GetApp as DownloadIcon,
    Add as AddIcon,
    Search as SearchIcon
} from '@mui/icons-material';

enum SortDirection {
    ASC = 'asc',
    DESC = 'desc'
}

// Types
type SortState = {
    column: string | null;
    direction: SortDirection; // 'asc' | 'desc';
};

type FilterState<T> = {
    filters: FilterCriteria<T>[];
    isActive: boolean;
};

export type TableComponentProps<T> = {
    table: AbstractTable<T>;
    onRowClick?: (row: T) => void;
    onSelectionChange?: (selectedRows: T[]) => void;
    elevation?: number;
    dense?: boolean;
};

export function TableComponent<T>({
    table,
    onRowClick,
    onSelectionChange,
    elevation = 2,
    dense = false,
}: TableComponentProps<T>): JSX.Element {
    // State
    const [data, setData] = useState<T[]>(table.data);
    const [columns, setColumns] = useState<AbstractColumn<T>[]>(
        table.columnsCollection.columns.filter(col => col.showColumn)
    );
    const [sortState, setSortState] = useState<SortState>({ column: null, direction: SortDirection.ASC });
    const [filterState, setFilterState] = useState<FilterState<T>>({ filters: [], isActive: false });
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [rowToDelete, setRowToDelete] = useState<number | null>(null);

    // Calculate total number of pages
    const totalItems = data.length;

    // Handle sort changes
    const handleSort = (columnKey: string) => {
        const column = table.columnsCollection.columnsAsMap.get(columnKey);

        if (!column || !column.isSortable) {
            return;
        }

        const isAsc = sortState.column === columnKey && sortState.direction === SortDirection.ASC;
        const direction = isAsc ? SortDirection.DESC : SortDirection.ASC;

        // Update sort state
        setSortState({ column: columnKey, direction });

        // Sort the data
        table.sortTable(columnKey, !isAsc);
        setData([...table.data]);
    };

    // Handle filter changes
    const applyFilters = (filters: FilterCriteria<T>[]) => {
        const filteredData = table.filterOn(filters);
        setFilterState({ filters, isActive: filters.length > 0 });
        setData([...filteredData]);
        setPage(0); // Reset to first page when filtering
    };

    // Reset filters
    const resetFilters = () => {
        table.resetFilters();
        setFilterState({ filters: [], isActive: false });
        setData([...table.data]);
        setPage(0); // Reset to first page when clearing filters
    };

    // Handle simple search (across all visible columns)
    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (!query.trim()) {
            // If the search query is empty, reset to original data or keep current filters
            if (filterState.isActive) {
                applyFilters(filterState.filters);
            } else {
                resetFilters();
            }
            return;
        }

        // Use the table's search method
        const searchResults = table.searchData(query, columns);
        setData(searchResults);
        setPage(0); // Reset to first page when searching
    };

    // Pagination handlers
    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Row selection handlers
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = new Set(
                data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((_, index) => page * rowsPerPage + index)
            );
            setSelectedRows(newSelected);

            if (onSelectionChange) {
                const selectedData = Array.from(newSelected).map(idx => data[idx]);
                onSelectionChange(selectedData);
            }
        } else {
            setSelectedRows(new Set());

            if (onSelectionChange) {
                onSelectionChange([]);
            }
        }
    };

    const handleRowSelect = (_event: React.MouseEvent<unknown>, index: number) => {
        const actualIndex = page * rowsPerPage + index;
        const newSelectedRows = new Set(selectedRows);

        if (selectedRows.has(actualIndex)) {
            newSelectedRows.delete(actualIndex);
        } else {
            newSelectedRows.add(actualIndex);
        }

        setSelectedRows(newSelectedRows);

        if (onSelectionChange) {
            const selectedData = Array.from(newSelectedRows).map(idx => data[idx]);
            onSelectionChange(selectedData);
        }
    };

    const isSelected = (index: number) => selectedRows.has(page * rowsPerPage + index);

    // Handle row edit
    const handleEdit = (event: React.MouseEvent<unknown>, row: T) => {
        event.stopPropagation();
        console.log('Edit row:', row);
        // Implement your edit logic here
    };

    // Handle row delete
    const handleDeleteClick = (event: React.MouseEvent<unknown>, index: number) => {
        event.stopPropagation();
        setRowToDelete(page * rowsPerPage + index);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (rowToDelete !== null) {
            // Use the table's delete method
            table.deleteRow(rowToDelete);
            setData([...table.data]);

            // Close dialog
            setDeleteDialogOpen(false);
            setRowToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setRowToDelete(null);
    };

    // Filter dialog component
    const FilterMenu = () => {
        const [filterColumn, setFilterColumn] = useState<string>('');
        const [filterOperator, setFilterOperator] = useState<FilterOperator>(FilterOperator.EQUALS);
        const [filterValue, setFilterValue] = useState<string>('');

        const handleFilterClose = () => {
            setFilterMenuAnchor(null);
        };

        const addFilter = () => {
            if (!filterColumn) return;

            const column = table.columnsCollection.columnsAsMap.get(filterColumn);
            if (!column) return;

            const newFilter = {
                columnKey: filterColumn,
                operator: filterOperator,
                value: filterValue
            } as FilterCriteria<T>;

            const updatedFilters = [...filterState.filters, newFilter];
            applyFilters(updatedFilters);

            // Reset filter form
            setFilterColumn('');
            setFilterValue('');

            // Close menu
            handleFilterClose();
        };

        return (
            <Menu
                anchorEl={filterMenuAnchor}
                open={Boolean(filterMenuAnchor)}
                onClose={handleFilterClose}
                slotProps={{
                    paper: {
                        sx: { width: 320, maxWidth: '100%', p: 2 }
                    }
                }}
            >
                <Typography variant="subtitle1" gutterBottom>
                    Add Filter
                </Typography>

                <FormControl fullWidth margin="dense">
                    <InputLabel>Column</InputLabel>
                    <Select
                        value={filterColumn}
                        onChange={(e) => setFilterColumn(e.target.value as string)}
                        label="Column"
                    >
                        {columns.map(col => (
                            <MenuItem key={col.key} value={col.key}>
                                {col.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="dense">
                    <InputLabel>Operator</InputLabel>
                    <Select
                        value={filterOperator}
                        onChange={(e) => setFilterOperator(e.target.value as FilterOperator)}
                        label="Operator"
                    >
                        <MenuItem value={FilterOperator.EQUALS}>Equals</MenuItem>
                        <MenuItem value={FilterOperator.NOT_EQUALS}>Not Equals</MenuItem>
                        <MenuItem value={FilterOperator.CONTAINS}>Contains</MenuItem>
                        <MenuItem value={FilterOperator.STARTS_WITH}>Starts With</MenuItem>
                        <MenuItem value={FilterOperator.ENDS_WITH}>Ends With</MenuItem>
                        <MenuItem value={FilterOperator.GREATER_THAN}>Greater Than</MenuItem>
                        <MenuItem value={FilterOperator.LESS_THAN}>Less Than</MenuItem>
                        <MenuItem value={FilterOperator.GREATER_THAN_OR_EQUAL}>Greater Than or Equal</MenuItem>
                        <MenuItem value={FilterOperator.LESS_THAN_OR_EQUAL}>Less Than or Equal</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    margin="dense"
                    label="Value"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                />

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        onClick={addFilter}
                        startIcon={<AddIcon />}
                        disabled={!filterColumn || !filterValue}
                    >
                        Add Filter
                    </Button>
                </Box>
            </Menu>
        );
    };

    // Export options menu
    const [exportMenuAnchor, setExportMenuAnchor] = useState<null | HTMLElement>(null);

    const handleExportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setExportMenuAnchor(event.currentTarget);
    };

    const handleExportClose = () => {
        setExportMenuAnchor(null);
    };

    const handleExport = (format: ExportFormat) => {
        // Use the table's export method
        table.exportData(format);
        handleExportClose();
    };

    // Calculate the slice of data to show on current page
    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Calculate if all rows on current page are selected
    const numSelected = selectedRows.size;
    const rowsInPage = Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const isAllSelected = rowsInPage > 0 && numSelected === rowsInPage;

    // Render the table
    return (
        <Card elevation={elevation}>
            <CardHeader
                title={
                    <Typography variant="h6">{table.title}</Typography>
                }
                subheader={table.description && (
                    <Typography variant="body2" color="text.secondary">
                        {table.description}
                    </Typography>
                )}
                action={
                    <Stack direction="row" spacing={1}>
                        {table.isSearchable && (
                            <TextField
                                placeholder="Search..."
                                size="small"
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize="small" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: searchQuery && (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleSearch('')}
                                                    edge="end"
                                                >
                                                    <ClearIcon fontSize="small" />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                                sx={{ width: 200 }}
                            />
                        )}

                        {table.isFilterable && (
                            <Button
                                startIcon={<FilterListIcon />}
                                onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
                                variant={filterState.isActive ? "contained" : "outlined"}
                                color={filterState.isActive ? "primary" : "inherit"}
                                size="small"
                            >
                                Filter
                            </Button>
                        )}

                        {table.exportOptions?.isEnabled && (
                            <>
                                <Button
                                    startIcon={<DownloadIcon />}
                                    onClick={handleExportClick}
                                    variant="outlined"
                                    size="small"
                                >
                                    {table.exportOptions.buttonName || "Export"}
                                </Button>

                                <Menu
                                    anchorEl={exportMenuAnchor}
                                    open={Boolean(exportMenuAnchor)}
                                    onClose={handleExportClose}
                                >
                                    {table.exportOptions.formats?.map((format) => (
                                        <MenuItem key={format} onClick={() => handleExport(format)}>
                                            Export as {format.toUpperCase()}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        )}
                    </Stack>
                }
            />

            {filterState.isActive && (
                <Box sx={{ px: 2, pb: 2 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2">Active Filters:</Typography>
                        {filterState.filters.map((filter, index) => {
                            const column = table.columnsCollection.columnsAsMap.get(filter.columnKey);
                            return (
                                <Chip
                                    key={index}
                                    label={`${column?.title || filter.columnKey} ${filter.operator} ${filter.value}`}
                                    size="small"
                                    onDelete={() => {
                                        const newFilters = [...filterState.filters];
                                        newFilters.splice(index, 1);
                                        applyFilters(newFilters);
                                    }}
                                />
                            );
                        })}
                        <Button
                            size="small"
                            startIcon={<ClearIcon />}
                            onClick={resetFilters}
                        >
                            Clear All
                        </Button>
                    </Stack>
                </Box>
            )}

            <Divider />

            <TableContainer component={Paper} elevation={0}>
                <Table size={dense ? "small" : "medium"} aria-label={table.title}>
                    <TableHead>
                        <TableRow>
                            {table.isSelectable && (
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={numSelected > 0 && numSelected < rowsInPage}
                                        checked={rowsInPage > 0 && isAllSelected}
                                        onChange={handleSelectAllClick}
                                        inputProps={{ 'aria-label': 'select all' }}
                                    />
                                </TableCell>
                            )}

                            {columns.map(column => (
                                <TableCell
                                    key={column.key}
                                    sortDirection={sortState.column === column.key ? sortState.direction : false}
                                >
                                    {column.isSortable ? (
                                        <Tooltip title={column.detailedDescription || ""} arrow>
                                            <TableSortLabel
                                                active={sortState.column === column.key}
                                                direction={sortState.column === column.key ? sortState.direction : SortDirection.ASC}
                                                onClick={() => handleSort(column.key)}
                                            >
                                                {column.title}
                                            </TableSortLabel>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title={column.detailedDescription || ""} arrow>
                                            <Typography variant="subtitle2">{column.title}</Typography>
                                        </Tooltip>
                                    )}
                                </TableCell>
                            ))}

                            {(table.isEditable || table.isDeletable) && (
                                <TableCell align="right">Actions</TableCell>
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, index) => {
                                const isItemSelected = isSelected(index);
                                const labelId = `table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => onRowClick && onRowClick(row)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                        sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                                    >
                                        {table.isSelectable && (
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleRowSelect(event, index);
                                                    }}
                                                />
                                            </TableCell>
                                        )}

                                        {columns.map(column => {
                                            const cellValue = row[column.accessor];
                                            // Use the column's formatCellValue method
                                            const displayValue: React.ReactNode = column.formatCellValue(cellValue);

                                            return (
                                                <TableCell key={column.key}>
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
                                                </TableCell>
                                            );
                                        })}

                                        {(table.isEditable || table.isDeletable) && (
                                            <TableCell align="right">
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    {table.isEditable && (
                                                        <Tooltip title="Edit">
                                                            <IconButton
                                                                size="small"
                                                                onClick={(event) => handleEdit(event, row)}
                                                            >
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}

                                                    {table.isDeletable && (
                                                        <Tooltip title="Delete">
                                                            <IconButton
                                                                size="small"
                                                                onClick={(event) => handleDeleteClick(event, index)}
                                                                color="error"
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                </Box>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={
                                        columns.length +
                                        (table.isSelectable ? 1 : 0) +
                                        ((table.isEditable || table.isDeletable) ? 1 : 0)
                                    }
                                    align="center"
                                    sx={{ py: 3 }}
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        No data available
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {table.isPageable && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={totalItems}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}

            {/* Filter Menu Dialog */}
            <FilterMenu />

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this item? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default TableComponent;
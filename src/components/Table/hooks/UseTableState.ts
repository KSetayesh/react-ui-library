import { useState, useCallback, useRef, useMemo } from 'react';
import { SortDirection, SortState, FilterState } from '../types/TableTypes';
import { AbstractTable } from '../models/AbstractTable';
import { AbstractColumn } from '../models/AbstractColumn';
import { useTablePagination } from './UseTablePagination';
import { FilterCriteria } from '../models/TableFilter';

export function useTableState<T>(table: AbstractTable<T>) {
    // Data state
    const [data, setData] = useState<T[]>(table.data);

    // Columns state (only show visible columns)
    const [columns, setColumns] = useState<AbstractColumn<T>[]>(
        table.columnsCollection.columns.filter(col => col.showColumn)
    );

    // Sort state
    const [sortState, setSortState] = useState<SortState>({
        column: null,
        direction: SortDirection.ASC
    });

    // Filter state
    const [filterState, setFilterState] = useState<FilterState<T>>({
        filters: [],
        isActive: false
    });

    // Selected rows state
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

    // Search query state
    const [searchQuery, setSearchQuery] = useState('');

    // Use pagination hook
    const {
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        getPaginatedData
    } = useTablePagination(data.length);

    // Ref to store onSelectionChange callback
    const onSelectionChangeRef = useRef<((selectedRows: T[]) => void) | null>(null);

    // Memoized paginated data
    const paginatedData = useMemo(() =>
        getPaginatedData(data),
        [data, page, rowsPerPage]
    );

    // Sort handler
    const handleSort = useCallback((columnKey: string) => {
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
    }, [sortState, table]);

    // Filter handler
    const applyFilters = useCallback((filters: FilterCriteria<T>[]) => {
        const filteredData = table.filterOn(filters);
        setFilterState({ filters, isActive: filters.length > 0 });
        setData([...filteredData]);
        setPage(0); // Reset to first page when filtering
    }, [table, setPage]);

    // Reset filters
    const resetFilters = useCallback(() => {
        table.resetFilters();
        setFilterState({ filters: [], isActive: false });
        setData([...table.data]);
        setPage(0); // Reset to first page when clearing filters
    }, [table, setPage]);

    // Search handler
    const handleSearch = useCallback((query: string) => {
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
    }, [columns, filterState, table, applyFilters, resetFilters, setPage]);

    // Row selection handler for selecting/deselecting a single row
    const handleRowSelect = useCallback((event: React.MouseEvent<unknown>, index: number) => {
        const actualIndex = page * rowsPerPage + index;
        const newSelectedRows = new Set(selectedRows);

        if (selectedRows.has(actualIndex)) {
            newSelectedRows.delete(actualIndex);
        } else {
            newSelectedRows.add(actualIndex);
        }

        setSelectedRows(newSelectedRows);

        // Call onSelectionChange if ref is set
        if (onSelectionChangeRef.current) {
            const selectedData = Array.from(newSelectedRows).map(idx => data[idx]);
            onSelectionChangeRef.current(selectedData);
        }
    }, [selectedRows, page, rowsPerPage, data]);

    // Select all rows on current page
    const handleSelectAllClick = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = new Set(
                paginatedData
                    .map((_, index) => page * rowsPerPage + index)
            );
            setSelectedRows(newSelected);

            // Call onSelectionChange if ref is set
            if (onSelectionChangeRef.current) {
                const selectedData = Array.from(newSelected).map(idx => data[idx]);
                onSelectionChangeRef.current(selectedData);
            }
        } else {
            setSelectedRows(new Set());

            // Call onSelectionChange if ref is set
            if (onSelectionChangeRef.current) {
                onSelectionChangeRef.current([]);
            }
        }
    }, [paginatedData, page, rowsPerPage, data]);

    return {
        data,
        setData,
        columns,
        setColumns,
        sortState,
        setSortState,
        filterState,
        setFilterState,
        selectedRows,
        setSelectedRows,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        searchQuery,
        setSearchQuery,
        paginatedData,
        handleSort,
        applyFilters,
        resetFilters,
        handleSearch,
        handleRowSelect,
        handleSelectAllClick,
        handleChangePage,
        handleChangeRowsPerPage,
        // Method to set onSelectionChange callback
        setOnSelectionChange: (callback: (selectedRows: T[]) => void) => {
            onSelectionChangeRef.current = callback;
        }
    };
}
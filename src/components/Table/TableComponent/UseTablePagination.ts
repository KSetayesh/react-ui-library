import { useState, useCallback } from 'react';

export function useTablePagination(totalItems: number, initialRowsPerPage = 10) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

    // Handle page change
    const handleChangePage = useCallback((_event: unknown, newPage: number) => {
        setPage(newPage);
    }, []);

    // Handle rows per page change
    const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0); // Reset to first page
    }, []);

    // Get paginated data slice
    const getPaginatedData = useCallback((data: any[]) => {
        return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [page, rowsPerPage]);

    return {
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        getPaginatedData,
        totalPages: Math.ceil(totalItems / rowsPerPage)
    };
}
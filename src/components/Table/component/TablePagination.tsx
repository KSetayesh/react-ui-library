import React from 'react';
import {
    TablePagination as MuiTablePagination
} from '@mui/material';

type TablePaginationProps = {
    count: number;
    rowsPerPage: number;
    page: number;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowsPerPageOptions?: number[];
};

const TablePagination: React.FC<TablePaginationProps> = ({
    count,
    rowsPerPage,
    page,
    onPageChange,
    onRowsPerPageChange,
    rowsPerPageOptions = [5, 10, 25, 50, 100]
}) => {
    return (
        <MuiTablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
        />
    );
};

export default TablePagination;
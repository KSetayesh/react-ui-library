// Export main table component
export { default as TableComponent } from './component/TableComponent';

// Export types
export * from './types/TableTypes';
export * from './types/InputType';
export * from './types/FileType';
export * from './types/FilterOperator';

// Export models
export { BasicTable, BasicTableI } from './models/BasicTable';
export { BasicColumn, BasicColumnI } from './models/BasicColumn';
export { TableFilter } from './models/TableFilter';

// Export hooks
export { useTableState } from './hooks/UseTableState';
export { useTablePagination } from './hooks/UseTablePagination';

// Export individual components if needed
// export { default as DeleteConfirmationDialog } from './components/DeleteConfirmationDialog';
// export { default as FilterMenu } from './components/FilterMenu';
// export { default as TableBody } from './components/TableBody';
// export { default as TableHead } from './components/TableHead';
// export { default as TableHeader } from './components/TableHeader';
// export { default as TablePagination } from './components/TablePagination';
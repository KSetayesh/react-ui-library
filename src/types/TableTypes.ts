import { BasicColumn } from "../components/Table/models/BasicColumn";
import { BasicTable } from "../components/Table/models/BasicTable";
import { FilterCriteria } from "../components/Table/models/TableFilter";

// Enum for sort direction
export enum SortDirection {
    ASC = 'asc',
    DESC = 'desc'
}

// Sort state type
export type SortState = {
    column: string | null;
    direction: SortDirection;
};

// Filter state type
export type FilterState<T> = {
    filters: FilterCriteria<T>[];
    isActive: boolean;
};

// Table component props
export type TableComponentProps<T> = {
    table: BasicTable<T>;
    onRowClick?: (row: T) => void;
    onSelectionChange?: (selectedRows: T[]) => void;
    elevation?: number;
    dense?: boolean;
};

// Export format type (assuming it's defined in AbstractTable)
export type ExportFormat = 'csv' | 'json' | 'xlsx';

// Filter menu props
export type FilterMenuProps<T> = {
    table: BasicTable<T>;
    filterState: FilterState<T>;
    onApplyFilters: (filters: FilterCriteria<T>[]) => void;
    columns: BasicColumn<T>[];
};
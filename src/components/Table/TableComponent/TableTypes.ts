import { AbstractColumn } from "../AbstractColumn.helper";
import { AbstractTable } from "../AbstractTable.helper";
import { FilterCriteria } from "../TableFilter";

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
    table: AbstractTable<T>;
    onRowClick?: (row: T) => void;
    onSelectionChange?: (selectedRows: T[]) => void;
    elevation?: number;
    dense?: boolean;
};

// Export format type (assuming it's defined in AbstractTable)
export type ExportFormat = 'csv' | 'json' | 'xlsx';

// Filter menu props
export type FilterMenuProps<T> = {
    table: AbstractTable<T>;
    filterState: FilterState<T>;
    onApplyFilters: (filters: FilterCriteria<T>[]) => void;
    columns: AbstractColumn<T>[];
};
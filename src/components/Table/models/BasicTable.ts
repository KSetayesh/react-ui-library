import { BasicColumn } from "./BasicColumn";
import { FileType } from "../../../types/FileType";
import { FilterCriteria, TableFilter } from "./TableFilter";

export type CollumnsCollection<T> = {
    columns: BasicColumn<T>[];
    columnsAsMap: Map<string, BasicColumn<T>>;
};

export type ExportFormat = FileType.CSV | FileType.XLSX | FileType.PDF;

export type ExportOptions = {
    buttonName: string;
    isEnabled: boolean;
    filename?: string;
    includeHeaders?: boolean;
    formats?: ExportFormat[];
};

export interface BasicTableI<T> {
    data: T[];
    columns: BasicColumn<T>[];
    title: string;
    description: string;
    isSortable: boolean;
    isFilterable: boolean;
    isEditable: boolean;
    isDeletable: boolean;
    isPageable: boolean;
    isSelectable: boolean;
    isMultiSelectable: boolean;
    isSearchable: boolean;
    exportOptions?: ExportOptions;
};

export class BasicTable<T> {
    protected _data: T[];
    protected _originalData: T[];
    protected _columnsCollection: CollumnsCollection<T>;
    protected _title: string;
    protected _description: string;
    protected _isSortable: boolean;
    protected _isFilterable: boolean;
    protected _isEditable: boolean;
    protected _isDeletable: boolean;
    protected _isPageable: boolean;
    protected _isSelectable: boolean;
    protected _isMultiSelectable: boolean;
    protected _isSearchable: boolean;
    protected _exportOptions?: ExportOptions;

    constructor(config: BasicTableI<T>) {
        this._data = [...config.data]; // Create a copy
        this._originalData = [...config.data];
        this._columnsCollection = this.setColumnData(config.columns);
        this._title = config.title;
        this._description = config.description || '';
        this._isSortable = config.isSortable ?? true;
        this._isFilterable = config.isFilterable ?? true;
        this._isEditable = config.isEditable ?? false;
        this._isDeletable = config.isDeletable ?? false;
        this._isPageable = config.isPageable ?? true;
        this._isSelectable = config.isSelectable ?? false;
        this._isMultiSelectable = config.isMultiSelectable ?? false;
        this._isSearchable = config.isSearchable ?? true;
        this._exportOptions = config.exportOptions;
    }

    private setColumnData(columns: BasicColumn<T>[]): CollumnsCollection<T> {
        const columnsMap = new Map<string, BasicColumn<T>>();
        columns.forEach((column) => {
            columnsMap.set(column.key, column);
        });
        return {
            columns: columns,
            columnsAsMap: columnsMap,
        };
    }

    /**
        * Sort the table data by a specific column
        * 
        * @param columnKey The key of the column to sort by
        * @param ascending Whether to sort in ascending order (default: true)
    */
    sortTable(columnKey: string, ascending: boolean = true): void {
        const hasColumn: boolean = this.columnsCollection.columnsAsMap.has(columnKey);
        if (!hasColumn) {
            throw new Error(`Column with key ${columnKey} not found`);
        }

        const column = this.columnsCollection.columnsAsMap.get(columnKey)!;
        if (!column.isSortable) {
            throw new Error(`Column with key ${columnKey} is not sortable`);
        }

        this.data.sort((a: T, b: T) => {
            const aValue = a[column.accessor];
            const bValue = b[column.accessor];

            if (aValue < bValue) {
                return ascending ? -1 : 1;
            }
            if (aValue > bValue) {
                return ascending ? 1 : -1;
            }
            return 0;
        });
    }

    searchData(query: string, columns?: BasicColumn<T>[]): T[] {
        if (!query.trim()) {
            return [...this._data];
        }

        const columnsToSearch = columns || this._columnsCollection.columns.filter(col => col.showColumn);
        const queryLower = query.toLowerCase();

        return this._originalData.filter(item => {
            return columnsToSearch.some(column => {
                const value = item[column.accessor];
                if (value === null || value === undefined) return false;
                return String(value).toLowerCase().includes(queryLower);
            });
        });
    }

    exportData(format: ExportFormat): void {
        if (!this._exportOptions?.isEnabled) {
            throw new Error('Export is not enabled for this table');
        }

        if (!this._exportOptions.formats?.includes(format)) {
            throw new Error(`Export format ${format} is not supported`);
        }

        // Implement export logic based on format
        console.log(`Exporting data in ${format} format`);
        // ...implementation for each format
    }

    // Add to AbstractTable
    deleteRow(index: number): void {
        if (!this.isDeletable) {
            throw new Error('This table does not support deletion');
        }

        if (index < 0 || index >= this._data.length) {
            throw new Error('Index out of bounds');
        }

        // Remove the row
        this._data.splice(index, 1);
    }

    /**
     * Filter the table data based on specified criteria
     * 
     * @param filters An array of filter criteria to apply
     * @param applyToData Whether to apply filter to the table's data (default: true)
     * @returns Filtered data array
     */
    filterOn(filters: FilterCriteria<T>[], applyToData: boolean = true): T[] {
        if (!this.isFilterable) {
            throw new Error('This table does not support filtering');
        }

        // Use the external TableFilter utility to handle filtering logic
        const filteredData = TableFilter.filter(
            applyToData ? this.data : this.originalData,
            filters,
            this.columnsCollection.columnsAsMap
        );

        // Apply the filtered data to the table if requested
        if (applyToData) {
            this._data = filteredData;
        }

        return filteredData;
    }

    /**
     * Reset all filters and restore the table to its original data
     */
    resetFilters(): void {
        if (!this.isFilterable) {
            throw new Error('This table does not support filtering');
        }

        this._data = [...this.originalData];
    }

    get data(): T[] {
        return this._data;
    }

    get originalData(): T[] {
        return this._originalData;
    }

    get columnsCollection(): CollumnsCollection<T> {
        return this._columnsCollection;
    }

    get title(): string {
        return this._title;
    }

    get description(): string {
        return this._description;
    }

    get isSortable(): boolean {
        return this._isSortable;
    }

    get isFilterable(): boolean {
        return this._isFilterable;
    }

    get isEditable(): boolean {
        return this._isEditable;
    }

    get isDeletable(): boolean {
        return this._isDeletable;
    }

    get isPageable(): boolean {
        return this._isPageable;
    }

    get isSelectable(): boolean {
        return this._isSelectable;
    }

    get isMultiSelectable(): boolean {
        return this._isMultiSelectable;
    }

    get isSearchable(): boolean {
        return this._isSearchable;
    }

    get exportOptions(): ExportOptions | undefined {
        return this._exportOptions;
    }

}
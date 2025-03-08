import { AbstractColumn } from "./AbstractColumn_2.helper";
import { FileType } from "./FileType";
import { FilterCriteria, TableFilter } from "./TableFilter";

export type CollumnsCollection<T> = {
    columns: AbstractColumn<T>[];
    columnsAsMap: Map<string, AbstractColumn<T>>;
};

export type ExportOptions = {
    buttonName: string;
    isEnabled: boolean;
    filename?: string;
    includeHeaders?: boolean;
    formats?: (FileType.CSV | FileType.XLSX | FileType.PDF)[];
};

export abstract class AbstractTable<T> {
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
    // private isExpandable: boolean;
    // private isCollapsible: boolean;

    constructor(
        data: T[],
        columns: AbstractColumn<T>[],
        title: string,
        description: string,
        isSortable: boolean,
        isFilterable: boolean,
        isEditable: boolean,
        isDeletable: boolean,
        isPageable: boolean,
        isSelectable: boolean,
        isMultiSelectable: boolean,
        isSearchable: boolean,
        exportOptions?: ExportOptions,
    ) {
        this._data = [...data]; // Create a copy
        this._originalData = [...data];
        this._columnsCollection = this.setColumnData(columns);
        this._title = title;
        this._description = description;
        this._isSortable = isSortable;
        this._isFilterable = isFilterable;
        this._isEditable = isEditable;
        this._isDeletable = isDeletable;
        this._isPageable = isPageable;
        this._isSelectable = isSelectable;
        this._isMultiSelectable = isMultiSelectable;
        this._isSearchable = isSearchable;
        this._exportOptions = exportOptions;
    }

    private setColumnData(columns: AbstractColumn<T>[]): CollumnsCollection<T> {
        const columnsMap = new Map<string, AbstractColumn<T>>();
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
import { AbstractColumn } from "./AbstractColumn.helper";

// Define filter operation types
export enum FilterOperator {
    EQUALS = 'equals',
    NOT_EQUALS = 'notEquals',
    GREATER_THAN = 'greaterThan',
    LESS_THAN = 'lessThan',
    GREATER_THAN_OR_EQUAL = 'greaterThanOrEqual',
    LESS_THAN_OR_EQUAL = 'lessThanOrEqual',
    CONTAINS = 'contains',
    STARTS_WITH = 'startsWith',
    ENDS_WITH = 'endsWith',
    IN = 'in',
    NOT_IN = 'notIn',
    IS_NULL = 'isNull',
    IS_NOT_NULL = 'isNotNull',
    BETWEEN = 'between'
}

// Define value types for different operators
export type EqualsValue = string | number | boolean | Date | null;
export type ComparisonValue = number | Date | string;
export type ArrayValue<V> = V[];
export type BetweenValue<V> = [V, V];

// Define filter criteria type with proper value typing
export type FilterCriteria<T> =
    | {
        columnKey: string;
        operator: FilterOperator.EQUALS | FilterOperator.NOT_EQUALS;
        value: EqualsValue;
        caseSensitive?: boolean;
    }
    | {
        columnKey: string;
        operator: FilterOperator.GREATER_THAN | FilterOperator.LESS_THAN |
        FilterOperator.GREATER_THAN_OR_EQUAL | FilterOperator.LESS_THAN_OR_EQUAL;
        value: ComparisonValue;
        caseSensitive?: boolean;
    }
    | {
        columnKey: string;
        operator: FilterOperator.CONTAINS | FilterOperator.STARTS_WITH | FilterOperator.ENDS_WITH;
        value: string;
        caseSensitive?: boolean;
    }
    | {
        columnKey: string;
        operator: FilterOperator.IN | FilterOperator.NOT_IN;
        value: ArrayValue<EqualsValue>;
        caseSensitive?: boolean;
    }
    | {
        columnKey: string;
        operator: FilterOperator.BETWEEN;
        value: BetweenValue<ComparisonValue>;
        caseSensitive?: boolean;
    }
    | {
        columnKey: string;
        operator: FilterOperator.IS_NULL | FilterOperator.IS_NOT_NULL;
        value?: undefined;
        caseSensitive?: boolean;
    };

// Processed filter with resolved column
export type ProcessedFilter<T> = FilterCriteria<T> & {
    column: AbstractColumn<T>;
};

/**
 * TableFilter class provides filtering functionality for table data
 */
export class TableFilter {
    /**
     * Filter data based on specified criteria
     * 
     * @param data The dataset to filter
     * @param filters An array of filter criteria to apply
     * @param columnsMap Map of column keys to AbstractColumn objects
     * @returns Filtered data array
     */
    static filter<T>(
        data: T[],
        filters: FilterCriteria<T>[],
        columnsMap: Map<string, AbstractColumn<T>>
    ): T[] {
        if (!filters || filters.length === 0) {
            return [...data];
        }

        // Process each filter and validate columns
        const processedFilters = filters.map(filter => {
            const { columnKey } = filter;

            // Validate column exists
            const column = columnsMap.get(columnKey);
            if (!column) {
                throw new Error(`Column with key ${columnKey} not found`);
            }

            return {
                ...filter,
                column
            } as ProcessedFilter<T>;
        });

        // Filter the data
        return data.filter(item => {
            // Item must pass ALL filter criteria (AND logic)
            return processedFilters.every(filter =>
                TableFilter.evaluateFilter(item, filter)
            );
        });
    }

    /**
     * Evaluate a single filter against an item
     * 
     * @param item The data item to evaluate
     * @param filter The processed filter to apply
     * @returns Whether the item passes the filter
     */
    private static evaluateFilter<T>(
        item: T,
        filter: ProcessedFilter<T>
    ): boolean {
        const { column, operator, value, caseSensitive = false } = filter;
        const itemValue = item[column.accessor];

        // Handle null/undefined values explicitly
        if (itemValue === null || itemValue === undefined) {
            if (operator === FilterOperator.IS_NULL) return true;
            if (operator === FilterOperator.IS_NOT_NULL) return false;
            // Most other operations on null/undefined return false
            return false;
        }

        // For string operations, handle case sensitivity
        if (typeof itemValue === 'string' && !caseSensitive) {
            const normalizedItemValue = itemValue.toLowerCase();

            switch (operator) {
                case FilterOperator.CONTAINS:
                case FilterOperator.STARTS_WITH:
                case FilterOperator.ENDS_WITH:
                    const stringValue = value as string;
                    const normalizedValue = stringValue.toLowerCase();

                    if (operator === FilterOperator.CONTAINS)
                        return normalizedItemValue.includes(normalizedValue);
                    else if (operator === FilterOperator.STARTS_WITH)
                        return normalizedItemValue.startsWith(normalizedValue);
                    else if (operator === FilterOperator.ENDS_WITH)
                        return normalizedItemValue.endsWith(normalizedValue);
                    break;

                case FilterOperator.EQUALS:
                case FilterOperator.NOT_EQUALS:
                    if (typeof value === 'string') {
                        const normalizedValue = value.toLowerCase();
                        return operator === FilterOperator.EQUALS
                            ? normalizedItemValue === normalizedValue
                            : normalizedItemValue !== normalizedValue;
                    }
                    break;
            }
        }

        // Handle general operations
        switch (operator) {
            case FilterOperator.EQUALS:
                return itemValue === value;
            case FilterOperator.NOT_EQUALS:
                return itemValue !== value;
            case FilterOperator.GREATER_THAN:
                return itemValue > value;
            case FilterOperator.LESS_THAN:
                return itemValue < value;
            case FilterOperator.GREATER_THAN_OR_EQUAL:
                return itemValue >= value;
            case FilterOperator.LESS_THAN_OR_EQUAL:
                return itemValue <= value;
            case FilterOperator.CONTAINS:
                return String(itemValue).includes(value as string);
            case FilterOperator.STARTS_WITH:
                return String(itemValue).startsWith(value as string);
            case FilterOperator.ENDS_WITH:
                return String(itemValue).endsWith(value as string);
            case FilterOperator.IN:
                return (value as ArrayValue<EqualsValue>).includes(itemValue as EqualsValue);
            case FilterOperator.NOT_IN:
                return !(value as ArrayValue<EqualsValue>).includes(itemValue as EqualsValue);
            case FilterOperator.IS_NULL:
                return itemValue === null || itemValue === undefined;
            case FilterOperator.IS_NOT_NULL:
                return itemValue !== null && itemValue !== undefined;
            case FilterOperator.BETWEEN:
                const [minValue, maxValue] = value as BetweenValue<ComparisonValue>;
                return itemValue >= minValue && itemValue <= maxValue;
            default:
                return true;
        }
    }
}
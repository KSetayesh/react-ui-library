// First, define filter operation types
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
};

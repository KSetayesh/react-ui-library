export enum InputType {
    TEXT = 'text',
    SELECT = 'select',
    NUMBER = 'number',
    RADIO = 'radio',
    STRING = 'string',
    CHECKBOX = 'checkbox',
};

export interface CreatePropertiesInBulkRequest {
    csvData: Record<string, string | number>[];
};

export interface TitleAndName {
    title: string;
    name: string;
};

export type AddFormTitlesAndLabel<T> = {
    [K in keyof T]: TitleAndName;
};

export enum SortDirection {
    ASCENDING = 'ascending',
    DESCENDING = 'descending',
};

export type PrimitiveType = string | boolean | number | undefined;

export type ValidationValue = {
    isValid: boolean;
    message?: string;
};

export type IsValidFunction = (newValue: PrimitiveType) => ValidationValue;

export type ColumnDetail = {
    title: string;
    accessor: string;
    inputType: InputType;
    isUrl: boolean;
    isDollarAmount: boolean;
    addSuffix: string;
    showColumn: boolean,
    isEditable: boolean,
    isSortable: boolean,
    detailedDescription: string,
    routeTo?: string,
    // tableTypeDetails?: TableTypeDetails<T>,
    // } & {
    // [T in TableType]?: TableTypeDetails<T>;
};

// Define the type for the sortMap structure
// export type ColumnsDetails = {
//     [key in TableColumnDetailsEnum]: ColumnDetail;
// };

export enum DefaultTableType {
    DEFAULT = 'DEFAULT',
}

export type ExportOption = {
    buttonName: string;
    enabled: boolean;
};

export type TableDetailType = { //<T extends keyof TableTypeMapping> = {
    title: string;
    // tableType: T;
    isEditable: boolean;
    canDeleteFromTable: boolean;
    isSortable: boolean;
    pageable: boolean;
    exportToCSV: ExportOption;
    // subTables: TableTypeMapping[T];
};



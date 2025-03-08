// import { tableDetails } from "../config/TableConfig";
// import { columnDetails } from "../config/TableColumnConfig";
import { AbstractColumn } from "./AbstractColumn_1.helper";
import { ColumnDetail, ExportOption, PrimitiveType, SortDirection, TableDetailType } from "./ClientTypes";

// export type TableColumn = {
//     columnKey: string; //TableColumnDetailsEnum;
//     columnDetails: ColumnDetail;
// };

export type TableData<Y, X> = {
    subTable: X;
    columns: AbstractColumn[]; //TableColumn[];
    rows: Y[];
};

export type SortConfig = {
    columnKey: string; //TableColumnDetailsEnum;
    direction: SortDirection;
};

export abstract class AbstractTable<Y, X> { //<K extends TableType, Y, X> {
    // private details: TableDetailType; //<K>;
    // // private _subTables: TableTypeMapping[K];
    // // private _tableType: K;
    // private _title: string;
    // private _canDeleteFromTable: boolean;
    // private _isEditable: boolean;
    // private _isSortable: boolean;
    // private _pageable: boolean;
    // private _exportToCSV: ExportOption;

    // constructor(tableDetails: any) { //(tableType: K) {
    //     // this._tableType = tableType;
    //     this.details = tableDetails; // tableDetails[tableType];
    //     // this._subTables = this.details.subTables;
    //     this._title = this.details.title;
    //     this._canDeleteFromTable = this.details.canDeleteFromTable;
    //     this._isEditable = this.details.isEditable;
    //     this._isSortable = this.details.isSortable;
    //     this._pageable = this.details.pageable;
    //     this._exportToCSV = this.details.exportToCSV;
    // }

    // // get tableType(): TableType {
    // //     return this._tableType;
    // // }

    // get title(): string {
    //     return this._title;
    // }

    // get canDeleteFromTable(): boolean {
    //     return this._canDeleteFromTable;
    // }

    // get isEditable(): boolean {
    //     return this._isEditable;
    // }

    // get isSortable(): boolean {
    //     return this._isSortable;
    // }

    // get pageable(): boolean {
    //     return this._pageable;
    // }

    // get exportToCSV(): ExportOption {
    //     return this._exportToCSV;
    // }

    // // get subTables(): TableTypeMapping[K] {
    // //     return this._subTables;
    // // }

    // // getAllSubTableTypes(): X[] {
    // //     return Object.keys(this.subTables) as X[];
    // // }

    // sort(
    //     tableData: TableData<Y, X>,
    //     sortConfig?: SortConfig,
    // ): TableData<Y, X> {

    //     if (!this.isSortable || !sortConfig) {
    //         return tableData;
    //     }

    //     const genericSort = (
    //         aValue: PrimitiveType,
    //         bValue: PrimitiveType,
    //         sortDirection: SortDirection
    //     ): number => {
    //         if (typeof aValue === 'string' && typeof bValue === 'string') {
    //             return sortDirection === SortDirection.ASCENDING
    //                 ? aValue.localeCompare(bValue)
    //                 : bValue.localeCompare(aValue);
    //         }

    //         if (typeof aValue === 'number' && typeof bValue === 'number') {
    //             return sortDirection === SortDirection.ASCENDING
    //                 ? aValue - bValue
    //                 : bValue - aValue;
    //         }

    //         if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
    //             return sortDirection === SortDirection.ASCENDING
    //                 ? (aValue === bValue ? 0 : aValue ? -1 : 1)
    //                 : (aValue === bValue ? 0 : aValue ? 1 : -1);
    //         }

    //         // For mixed types or unhandled types, treat as equal
    //         return 0;
    //     };

    //     // tableData.rows.sort((a, b) => {
    //     //     // const subTableType: X = tableData.subTable;
    //     //     const tableColumn: AbstractColumn = this.getColumnDetails(subTableType, sortConfig.columnKey);
    //     //     const cellValue_a: PrimitiveType = this.getColumnValue(a, tableColumn);
    //     //     const cellValue_b: PrimitiveType = this.getColumnValue(b, tableColumn);
    //     //     return genericSort(cellValue_a, cellValue_b, sortConfig.direction);
    //     // });

    //     return tableData;
    // }

    // getTableData(listOfData: Y[], subTableType: X = this.getDefaultTableType()): TableData<Y, X> {
    //     return {
    //         subTable: subTableType,
    //         columns: this.getAllSubTableColumnDetails(subTableType),
    //         rows: listOfData,
    //     };
    // }

    // getColumnValueToBeDisplayed(item: Y, tableColumn: AbstractColumn): PrimitiveType {
    //     const columnValue: PrimitiveType = this.getColumnValue(item, tableColumn);
    //     const columnDetails: ColumnDetail = tableColumn.details;
    //     return this.formatValueToBeDisplayed(columnValue, columnDetails);
    // }

    // updateValue(item: Y, newValue: PrimitiveType, tableColumn: AbstractColumn): void {
    //     const columnDetails: ColumnDetail = tableColumn.details;
    //     if (!this.isEditable || !columnDetails.isEditable) {
    //         return;
    //     }
    //     this.setColumnValue(item, newValue, tableColumn);
    // }

    // // protected getColumnDetails(subTableType: X, columnType: string): AbstractColumn { //TableColumnDetailsEnum): TableColumn {
    // //     // const tableColumnEnums: Set<TableColumnDetailsEnum> = this.getAllSubTableColumnsAsSet(subTableType);
    // //     const tableColumnEnums: Set<string> = this.getAllSubTableColumnsAsSet(subTableType);
    // //     if (!tableColumnEnums.has(columnType)) {
    // //         throw new Error('Error with table structure');
    // //     }
    // //     return {
    // //         columnKey: columnType,
    // //         columnDetails: columnDetails[columnType],
    // //     };
    // // }

    // // private getAllSubTableColumnDetails(subTableType: X): AbstractColumn[] {
    // //     // const subTableColumns: TableColumnDetailsEnum[] = this.getAllSubTableColumns(subTableType);
    // //     const subTableColumns: string[] = this.getAllSubTableColumns(subTableType);
    // //     return subTableColumns.map(column => this.getColumnDetails(subTableType, column));
    // // }

    // private formatValueToBeDisplayed(cellData: PrimitiveType, columnDetails: ColumnDetail): PrimitiveType {

    //     const formatDollarAmount = (amount: number): string => {
    //         return amount.toLocaleString('en-US', {
    //             style: 'currency',
    //             currency: 'USD',
    //         });
    //     };

    //     const booleanToYesNo = (value: boolean | undefined) => value ? 'Yes' : 'No';

    //     const ensureAbsoluteUrl = (url: string): string => {
    //         if (!url.startsWith('http://') && !url.startsWith('https://')) {
    //             return 'http://' + url;  // Defaulting to http if no protocol is specified
    //         }
    //         return url;
    //     };

    //     const renderCellData = (cellData: PrimitiveType, columnDetails: ColumnDetail): string => {
    //         const isDollarAmount: boolean = columnDetails.isDollarAmount;
    //         const addSuffix: string = columnDetails.addSuffix;

    //         let toReturn = '';
    //         if (typeof cellData === 'boolean') {
    //             toReturn = booleanToYesNo(cellData);
    //         }
    //         else if (typeof cellData === 'string') {
    //             toReturn = cellData.toString();
    //         }
    //         else if (typeof cellData === 'number') {
    //             toReturn = isDollarAmount ? formatDollarAmount(cellData) : cellData.toString();
    //         }
    //         // else if (Array.isArray(cellData)) {
    //         //     toReturn = cellData.join(', '); // Example: array to comma-separated string
    //         // }
    //         else if (typeof cellData === 'object' && cellData !== null) {
    //             toReturn = JSON.stringify(cellData); // Or extract specific properties to render
    //         }

    //         toReturn = toReturn === '' ? toReturn : toReturn + (addSuffix ? addSuffix : ''); // Fallback for undefined or null

    //         if (columnDetails.isUrl) {
    //             toReturn = ensureAbsoluteUrl(toReturn);
    //         }
    //         if (columnDetails.routeTo) {
    //             toReturn = `/${columnDetails.routeTo}/${toReturn}`;
    //         }

    //         return toReturn;
    //     };

    //     return renderCellData(cellData, columnDetails);
    // }

    // private getAllSubTableColumnsAsSet(subTableType: X): Set<string> { // Set<TableColumnDetailsEnum> {
    //     return new Set(this.getAllSubTableColumns(subTableType));
    // }

    // private getAllSubTableColumns(subTableType: X): string[] { //TableColumnDetailsEnum[] {
    //     return this._getAllSubTableColumns(subTableType).filter((column) => {
    //         const details = columnDetails[column]; // Directly access columnDetails instead of calling getColumnDetails()
    //         return details ? details.showColumn : false;
    //     });
    // }

    // protected abstract _getAllSubTableColumns(subTableType?: X): string[]; //TableColumnDetailsEnum[];

    // protected abstract getColumnValue(item: Y, tableColumn: AbstractColumn): PrimitiveType;

    // protected abstract setColumnValue(
    //     item: Y,
    //     newValue: PrimitiveType,
    //     tableColumn: AbstractColumn,
    // ): void;

    // abstract getDefaultTableType(): X;

}
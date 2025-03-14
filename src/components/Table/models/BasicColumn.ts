import { InputType } from "../../../types/InputType";

// Define a type for primitive values commonly displayed in tables
export type TableCellValue = string | number | boolean | Date | null | undefined;

export interface BasicColumnI<T> {
    key: string;
    title: string;
    // accessor: keyof T;
    accessor: (item: T) => TableCellValue;
    inputType: InputType;
    isUrl: boolean;
    isDollarAmount: boolean;
    addSuffix: string;
    showColumn: boolean;
    isEditable: boolean;
    isSortable: boolean;
    detailedDescription: string;
    routeTo?: string;
};

export class BasicColumn<T> {

    protected _key: string;
    protected _title: string;
    // protected _accessor: keyof T;
    protected _accessor: (item: T) => TableCellValue;
    protected _inputType: InputType;
    protected _isUrl: boolean;
    protected _isDollarAmount: boolean;
    protected _addSuffix: string;
    protected _showColumn: boolean;
    protected _isEditable: boolean;
    protected _isSortable: boolean;
    protected _detailedDescription: string;
    protected _routeTo?: string;

    constructor(config: BasicColumnI<T>) {
        this._key = config.key;
        this._title = config.title;
        this._accessor = config.accessor;
        this._inputType = config.inputType;
        this._isUrl = config.isUrl ?? false;
        this._isDollarAmount = config.isDollarAmount ?? false;
        this._addSuffix = config.addSuffix ?? '';
        this._showColumn = config.showColumn ?? true;
        this._isEditable = config.isEditable ?? false;
        this._isSortable = config.isSortable ?? true;
        this._detailedDescription = config.detailedDescription ?? '';
        this._routeTo = config.routeTo;
    }

    get key(): string {
        return this._key;
    }

    get title(): string {
        return this._title;
    }

    get accessor(): (item: T) => TableCellValue { // keyof T {
        return this._accessor;
    }

    get inputType(): InputType {
        return this._inputType;
    }

    get isUrl(): boolean {
        return this._isUrl;
    }

    get isDollarAmount(): boolean {
        return this._isDollarAmount;
    }

    get addSuffix(): string {
        return this._addSuffix;
    }

    get showColumn(): boolean {
        return this._showColumn;
    }

    get isEditable(): boolean {
        return this._isEditable;
    }

    get isSortable(): boolean {
        return this._isSortable;
    }

    get detailedDescription(): string {
        return this._detailedDescription;
    }

    get routeTo(): string | undefined {
        return this._routeTo;
    }

    // Add this method to AbstractColumn
    formatCellValue(value: any): React.ReactNode {
        if (value === null || value === undefined) {
            return '';
        }

        // Format based on column properties
        if (this.isDollarAmount && typeof value === 'number') {
            return `$${value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`;
        } else if (this.addSuffix && value !== null && value !== undefined) {
            return `${value}${this.addSuffix}`;
        } else if (value instanceof Date) {
            return value.toLocaleDateString();
        }

        return String(value);
    }

    // Add to AbstractColumn
    shouldRenderAsLink(value: any): boolean {
        return (this.isUrl && typeof value === 'string') || this.routeTo !== undefined;
    }

    getLinkUrl(value: any): string {
        if (this.isUrl && typeof value === 'string') {
            return value;
        } else if (this.routeTo) {
            return `${this.routeTo}/${value}`;
        }
        return '';
    }

}
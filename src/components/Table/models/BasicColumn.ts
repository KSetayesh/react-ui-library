import { InputType } from "../types/InputType";


export class BasicColumn<T> {

    protected _key: string;
    protected _title: string;
    protected _accessor: keyof T;
    protected _inputType: InputType;
    protected _isUrl: boolean;
    protected _isDollarAmount: boolean;
    protected _addSuffix: string;
    protected _showColumn: boolean;
    protected _isEditable: boolean;
    protected _isSortable: boolean;
    protected _detailedDescription: string;
    protected _routeTo?: string;

    constructor(
        key: string,
        title: string,
        accessor: keyof T,
        inputType: InputType,
        isUrl: boolean,
        isDollarAmount: boolean,
        addSuffix: string,
        showColumn: boolean,
        isEditable: boolean,
        isSortable: boolean,
        detailedDescription: string,
        routeTo?: string
    ) {

        this._key = key;
        this._title = title;
        this._accessor = accessor;
        this._inputType = inputType;
        this._isUrl = isUrl;
        this._isDollarAmount = isDollarAmount;
        this._addSuffix = addSuffix;
        this._showColumn = showColumn;
        this._isEditable = isEditable;
        this._isSortable = isSortable;
        this._detailedDescription = detailedDescription;
        this._routeTo = routeTo;
    }

    get key(): string {
        return this._key;
    }

    get title(): string {
        return this._title;
    }

    get accessor(): keyof T {
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
import { ColumnDetail, InputType } from "./ClientTypes";

export abstract class AbstractColumn {
    
    protected columnKey: string; 
    protected title: string;
    protected accessor: string;
    protected inputType: InputType;
    protected isUrl: boolean;
    protected isDollarAmount: boolean;
    protected addSuffix: string;
    protected showColumn: boolean;
    protected isEditable: boolean;
    protected isSortable: boolean;
    protected detailedDescription: string;
    protected routeTo?: string;

    constructor(columnKey: string,
        title: string,
        accessor: string,
        inputType: InputType,
        isUrl: boolean,
        isDollarAmount: boolean,
        addSuffix: string,
        showColumn: boolean,
        isEditable: boolean,
        isSortable: boolean,
        detailedDescription: string,
        routeTo?: string) 
    {
        this.columnKey = columnKey;
        this.title = title;
        this.accessor = accessor;
        this.inputType = inputType;
        this.isUrl = isUrl;
        this.isDollarAmount = isDollarAmount;
        this.addSuffix = addSuffix;
        this.showColumn = showColumn;
        this.isEditable = isEditable;
        this.isSortable = isSortable;
        this.detailedDescription = detailedDescription;
        this.routeTo = routeTo;
    }

     
}
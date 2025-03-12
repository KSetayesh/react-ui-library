import React, { useState } from 'react';
import {
    Menu,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Box,
    styled
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { BasicTable } from '../models/BasicTable';
import { BasicColumn } from '../models/BasicColumn';
import { FilterCriteria } from '../models/TableFilter';
import { FilterOperator } from '../types/FilterOperator';

// Styled Components
const StyledMenu = styled(Menu)(() => ({
    '& .MuiPaper-root': {
        width: 320,
        maxWidth: '100%',
        padding: '16px'
    }
}));

const FilterButton = styled(Button)(() => ({
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'flex-end'
}));

type FilterMenuProps<T> = {
    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    table: BasicTable<T>;
    columns: BasicColumn<T>[];
    onApplyFilters: (filters: FilterCriteria<T>[]) => void;
};

function FilterMenu<T>({
    open,
    anchorEl,
    onClose,
    table,
    columns,
    onApplyFilters
}: FilterMenuProps<T>) {
    const [filterColumn, setFilterColumn] = useState<string>('');
    const [filterOperator, setFilterOperator] = useState<FilterOperator>(FilterOperator.EQUALS);
    const [filterValue, setFilterValue] = useState<string>('');

    const addFilter = () => {
        if (!filterColumn) return;

        const column = table.columnsCollection.columnsAsMap.get(filterColumn);
        if (!column) return;

        const newFilter = {
            columnKey: filterColumn,
            operator: filterOperator,
            value: filterValue
        } as FilterCriteria<T>;

        onApplyFilters([newFilter]);

        // Reset form
        setFilterColumn('');
        setFilterOperator(FilterOperator.EQUALS);
        setFilterValue('');
        onClose();
    };

    return (
        <StyledMenu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Typography variant="subtitle1" gutterBottom>
                Add Filter
            </Typography>

            <FormControl fullWidth margin="dense">
                <InputLabel>Column</InputLabel>
                <Select
                    value={filterColumn}
                    onChange={(e) => setFilterColumn(e.target.value as string)}
                    label="Column"
                >
                    {columns.map(col => (
                        <MenuItem key={col.key} value={col.key}>
                            {col.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth margin="dense">
                <InputLabel>Operator</InputLabel>
                <Select
                    value={filterOperator}
                    onChange={(e) => setFilterOperator(e.target.value as FilterOperator)}
                    label="Operator"
                >
                    <MenuItem value={FilterOperator.EQUALS}>Equals</MenuItem>
                    <MenuItem value={FilterOperator.NOT_EQUALS}>Not Equals</MenuItem>
                    <MenuItem value={FilterOperator.CONTAINS}>Contains</MenuItem>
                    <MenuItem value={FilterOperator.STARTS_WITH}>Starts With</MenuItem>
                    <MenuItem value={FilterOperator.ENDS_WITH}>Ends With</MenuItem>
                    <MenuItem value={FilterOperator.GREATER_THAN}>Greater Than</MenuItem>
                    <MenuItem value={FilterOperator.LESS_THAN}>Less Than</MenuItem>
                    <MenuItem value={FilterOperator.GREATER_THAN_OR_EQUAL}>Greater Than or Equal</MenuItem>
                    <MenuItem value={FilterOperator.LESS_THAN_OR_EQUAL}>Less Than or Equal</MenuItem>
                </Select>
            </FormControl>

            <TextField
                fullWidth
                margin="dense"
                label="Value"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
            />

            <FilterButton>
                <Button
                    variant="contained"
                    onClick={addFilter}
                    startIcon={<AddIcon />}
                    disabled={!filterColumn || !filterValue}
                >
                    Add Filter
                </Button>
            </FilterButton>
        </StyledMenu>
    );
}

export default FilterMenu;
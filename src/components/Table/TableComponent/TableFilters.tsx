import React from 'react';
import {
    Box,
    Stack,
    Typography,
    Chip,
    Button,
    styled
} from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';
import { FilterCriteria } from '../TableFilter';
import { AbstractTable } from '../AbstractTable.helper';

// Styled Components
const FilterContainer = styled(Box)(({ theme }) => ({
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
}));

const FilterStack = styled(Stack)(() => ({
    flexWrap: 'wrap',
}));

const FilterTitleTypography = styled(Typography)(({ theme }) => ({
    marginRight: theme.spacing(1),
}));

type TableFiltersProps<T> = {
    filters: FilterCriteria<T>[];
    table: AbstractTable<T>;
    onRemoveFilter: (index: number) => void;
    onClearAll: () => void;
};

function TableFilters<T>({
    filters,
    table,
    onRemoveFilter,
    onClearAll
}: TableFiltersProps<T>) {
    return (
        <FilterContainer>
            <FilterStack
                direction="row"
                spacing={1}
                alignItems="center"
                useFlexGap
            >
                <FilterTitleTypography variant="body2">
                    Active Filters:
                </FilterTitleTypography>

                {filters.map((filter, index) => {
                    // Get the column from the table's columns collection
                    const column = table.columnsCollection.columnsAsMap.get(filter.columnKey);

                    return (
                        <Chip
                            key={index}
                            label={`${column?.title || filter.columnKey} ${filter.operator} ${filter.value}`}
                            size="small"
                            onDelete={() => onRemoveFilter(index)}
                        />
                    );
                })}

                {filters.length > 0 && (
                    <Button
                        size="small"
                        startIcon={<ClearIcon />}
                        onClick={onClearAll}
                        variant="text"
                        color="inherit"
                    >
                        Clear All
                    </Button>
                )}
            </FilterStack>
        </FilterContainer>
    );
}

export default TableFilters;
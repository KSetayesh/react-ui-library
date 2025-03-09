import React, { useState } from 'react';
import {
    Typography,
    TextField,
    Button,
    Stack,
    InputAdornment,
    IconButton,
    styled
} from '@mui/material';
import {
    FilterList as FilterListIcon,
    GetApp as DownloadIcon,
    Search as SearchIcon,
    Clear as ClearIcon
} from '@mui/icons-material';
import { AbstractTable } from '../models/AbstractTable';

// Styled Components
const HeaderStack = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
}));

const ActionStack = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1)
}));

const SearchTextField = styled(TextField)(() => ({
    width: 200
}));

type TableHeaderProps = {
    table: AbstractTable<any>;
    searchQuery: string;
    onSearch: (query: string) => void;
    onFilterClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onExportClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const TableHeader: React.FC<TableHeaderProps> = ({
    table,
    searchQuery,
    onSearch,
    onFilterClick,
    onExportClick
}) => {
    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setLocalSearchQuery(query);
        onSearch(query);
    };

    const handleClearSearch = () => {
        setLocalSearchQuery('');
        onSearch('');
    };

    return (
        <HeaderStack>
            <Typography variant="h6">{table.title}</Typography>

            <ActionStack>
                {table.isSearchable && (
                    <SearchTextField
                        placeholder="Search..."
                        size="small"
                        value={localSearchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                            endAdornment: localSearchQuery && (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        onClick={handleClearSearch}
                                        edge="end"
                                    >
                                        <ClearIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                )}

                {table.isFilterable && (
                    <Button
                        startIcon={<FilterListIcon />}
                        onClick={onFilterClick}
                        variant="outlined"
                        size="small"
                    >
                        Filter
                    </Button>
                )}

                {table.exportOptions?.isEnabled && (
                    <Button
                        startIcon={<DownloadIcon />}
                        onClick={onExportClick}
                        variant="outlined"
                        size="small"
                    >
                        {table.exportOptions.buttonName || "Export"}
                    </Button>
                )}
            </ActionStack>
        </HeaderStack>
    );
};

export default TableHeader;
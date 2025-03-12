import React, { useState } from 'react';
import {
    Typography,
    Button,
    Stack,
    InputAdornment,
    IconButton,
    styled,
    OutlinedInput,
    FormControl
} from '@mui/material';
import {
    FilterList as FilterListIcon,
    GetApp as DownloadIcon,
    Search as SearchIcon,
    Clear as ClearIcon
} from '@mui/icons-material';
import { BasicTable } from '../models/BasicTable';

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

const SearchOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
    width: 200,
    '& .MuiOutlinedInput-input': {
        padding: theme.spacing(1)
    },
    '& .MuiInputAdornment-root': {
        margin: 0
    }
}));

type TableHeaderProps = {
    table: BasicTable<any>;
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
                    <FormControl variant="outlined" size="small">
                        <SearchOutlinedInput
                            placeholder="Search..."
                            value={localSearchQuery}
                            onChange={handleSearchChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            }
                            endAdornment={
                                localSearchQuery ? (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            onClick={handleClearSearch}
                                            edge="end"
                                        >
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                ) : null
                            }
                        />
                    </FormControl>
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
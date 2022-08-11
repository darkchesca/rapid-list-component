import React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

interface Data {
    name: string;
}

interface HeadCell {
    id: keyof Data;
    label: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        label: 'INFO',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}

function EnhancedTableHead({
    onSelectAllClick, numSelected, rowCount,
}: EnhancedTableProps) {

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all rows',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align="left"
                        padding="normal"
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    indexes: number[];
}

function EnhancedTableToolbar({ indexes }: EnhancedTableToolbarProps) {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(indexes.length > 0 && {
                    bgcolor: (theme) => alpha(
                        theme.palette.primary.main,
                        theme.palette.action.activatedOpacity,
                    ),
                }),
            }}
        >
            <Box sx={{ overflowWrap: 'anywhere', minHeight: 120 }}>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {`Selected items: ${indexes.toString()}`}
                </Typography>
            </Box>
        </Toolbar>
    );
}

interface ListProps {
    data: any[],
    infoCell: Function
}

export default function List({ data, infoCell }: ListProps) {
    const rows = React.useMemo(() => data, [data]);
    const [selectedIndexes, setSelectedIndexes] = React.useState<number[]>([]);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n, index) => index);
            setSelectedIndexes(newSelected);

            return;
        }
        setSelectedIndexes([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, index: number) => {
        const newVal = index;
        let selectedValues: number[] = [];
        // if selected has this value deselect element
        if (selectedIndexes.includes(newVal)) {
            selectedValues = selectedIndexes.filter((el) => el !== newVal);
            setSelectedIndexes(selectedValues.sort());

            // else add it to the selected options
        } else {
            selectedValues = [...selectedIndexes, newVal];
            setSelectedIndexes(selectedValues.sort());
        }
    };

    const isSelected = (index: number) => selectedIndexes.indexOf(index) !== -1;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{
                width: '100%', mb: 2, overflow: 'hidden',
            }}
            >
                <EnhancedTableToolbar
                    indexes={selectedIndexes}
                />
                <TableContainer sx={{ maxHeight: 750 }}>
                    <Table
                        stickyHeader
                        aria-label="sticky table"
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size="small"
                    >
                        <EnhancedTableHead
                            numSelected={selectedIndexes.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.map((row, index) => {
                                const isItemSelected = isSelected(index);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, index)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={`${row.name}-${row.phone}`}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {infoCell(row)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

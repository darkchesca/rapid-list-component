import * as React from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import { CssBaseline } from '@mui/material';
import List from './components/List';
import { makeData } from './utils';

// render function, rendering cell prop to be passed to list component
const render = (row:object, labelId: string) => {
    const values = Object.values(row);

    return (
        <TableCell
            component="th"
            id={labelId}
            scope="row"
            padding="none"
        >
            {/* value can be  string or number depending on object */}
            {values.map((value: any) => <p key={value}>{value}</p>)}
        </TableCell>
    );
};

/**
 * @name App
 * @description root component
 * */
export default function App() {
    const data = makeData(100, false);

    return (
        <Container>
            <CssBaseline />
            <AppBar>
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <Typography variant="h6" component="div">
                        A simple List component
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Container>
                <Box sx={{ p: 1 }}>
                    <List data={data} infoCell={render} />
                </Box>
            </Container>
        </Container>
    );
}

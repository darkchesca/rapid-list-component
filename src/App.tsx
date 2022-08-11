import * as React from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CssBaseline } from '@mui/material';
import List from './components/List';
import { makeData } from './utils';

/**
 * @name App
 * @description root component
 * */

export default function App() {
    const data = makeData(100, false);
    const render = (row:any) => {
        const values = Object.values(row);

        return (
            <React.Fragment>
                {values.map((value: any) => <p key={value}>{value}</p>)}
            </React.Fragment>
        );
    };

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

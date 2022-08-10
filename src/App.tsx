import * as React from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CssBaseline } from '@mui/material';
import StickyHeadTable from './components/List';

/**
 * @name App
 * @description root component
 * */

export default function App() {
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
                    <StickyHeadTable />
                </Box>
            </Container>
        </Container>
    );
}

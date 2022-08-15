import React from 'react';

import {
    Link
} from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from "@mui/material/Button"

export default function TopBar() {

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleCloseNavMenu = () => {
        console.log("clicked")
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Toolbar disableGutters sx={{ paddingLeft: 5 }}>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Link to="/">
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Dashboard
                        </Button>
                    </Link>
                    <Link to="/segment">
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Trip Segment
                        </Button>
                    </Link>
                </Box>
                <Button variant="contained" color="success" sx={{ marginRight: 5 }}>Save</Button>
            </Toolbar>
        </AppBar>
    );
}
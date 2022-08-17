import React, { useState } from 'react';

import { useNavigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from "@mui/material/Button"

import './styles.css'

import logo from '../../assets/logo.svg'
import Typography from '@mui/material/Typography/Typography';

export default function TopBar() {

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [activePage, setActivePage] = useState('/')
    const navigate = useNavigate()

    const handleNav = (path: string) => {
        navigate(path, { replace: true })
        setActivePage(path)
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <div className='signature-bar'>
                <img className='logo-img' src={logo} alt="" />
                <Typography variant='h5' sx={{ fontWeight: 600 }}>LET'S PLAN A TRIP</Typography>
            </div>
            <Toolbar disableGutters sx={{ paddingLeft: 5 }}>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {/* <Link to="/"> */}
                    <Typography
                        className='fake-btn'
                        variant='h5'
                        onClick={() => { handleNav('/') }}
                        sx={{ my: 2, fontWeight: 600, marginRight: 2 }}
                    >
                        <span className={activePage == '/' ? 'underlined' : ''}>Dashboard</span>
                    </Typography>
                    {/* </Link>
                    <Link to="/segment"> */}
                    <Typography
                        className='fake-btn'
                        variant='h5'
                        onClick={() => { handleNav('/segment') }}
                        sx={{ my: 2, fontWeight: 600 }}
                    >
                        <span className={activePage == '/segment' ? 'underlined' : ''}>Trip Segment</span>
                    </Typography>
                    {/* </Link> */}
                </Box>
                <Typography
                    className='fake-btn'
                    variant='h5'
                    sx={{ my: 2, fontWeight: 600, marginRight: 5 }}
                >
                    <span className={activePage == '/save' ? 'underlined' : ''}>Save</span>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
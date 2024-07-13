import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const HeaderMenu = () => {
    return (
        <AppBar position="static">
            <Container>
                <Toolbar>                
                    <Button color="inherit" component={Link} to="/">HOME</Button>
                    <Button color="inherit" component={Link} to="/dashboard">DASHBOARD</Button>
                    <Button color="inherit" component={Link} to="/contact">CONTACT</Button>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default HeaderMenu
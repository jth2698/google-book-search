import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    }
}));

// Because I am using Material UI, the only component I have is the Navbar. Other items (like the book cards) could also be components, but I left them in the applicable page for this project given that the scale was fairly small.  

export default function NavBar() {

    const classes = useStyles();

    return (
        <AppBar position="relative" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                    (React) Google Books Search
                </Typography>
                <nav>
                    <Link variant="button" color="textPrimary" href="/search" className={classes.link}>
                        Search
                    </Link>
                    <Link variant="button" color="textPrimary" href="/saved" className={classes.link}>
                        Saved
                    </Link>
                </nav>
            </Toolbar>
        </AppBar>
    )
}
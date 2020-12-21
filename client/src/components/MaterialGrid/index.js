import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        alignItems: "flex-bottom"
        // alignContent: "center"
    }
}));

export default function MaterialGrid({ children }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>

                {children}

            </Grid>
        </div >
    );
}

// export default function MaterialGridItem({ children }) {
//     const classes = useStyles();

//     return (
//         <div className={classes.root}>
//             <Grid item>
//                 {children}
//             </Grid>
//         </div >
//     );
// }
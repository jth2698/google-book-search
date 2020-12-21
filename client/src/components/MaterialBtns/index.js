import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export function PrimaryBtn({ link }) {
    return (
        <Button href={link} variant="contained" color="primary" name="view">
            View
        </Button>
    );
}

export function SecondaryBtn({ onClick }) {
    return (
        <Button variant="contained" color="secondary" name="save" type="submit" onClick={onClick}>
            Save
        </Button>
    );
}
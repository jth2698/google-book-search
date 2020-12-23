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

export function ViewBtn({ link }) {
    return (
        <a href={link}>
            {/* <Button size="small" name="view">
                View
        </Button> */}
        </a>
    );
}

export function SaveBtn({ onClick }) {
    return (
        <Button size="small" name="save" type="submit" onClick={onClick}>
            Save
        </Button>
    );
}

export function DeleteBtn({ onClick }) {
    return (
        <Button size="small" name="save" type="submit" onClick={onClick}>
            Delete
        </Button>
    );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PrimaryBtn, SecondaryBtn } from "../MaterialBtns";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        paddingBottom: 20,
        marginBottom: 20,
    },
    card: {
        minHeight: 280,
        backgroundSize: "cover"
    },
    media: {
        height: 300,
    },
    body: {
        alignSelf: "stretch",
        textAlign: "center"
    },
    actions: {
        // display: "flex",
        justifyContent: "space-between"
    },
});

export default function MaterialCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h4">
                        {props.author}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {props.description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </CardActionArea>
            <CardActions>
                <PrimaryBtn link={props.link}></PrimaryBtn>
                <SecondaryBtn onClick={props.onClick}></SecondaryBtn>
            </CardActions>
        </Card>
    );
}
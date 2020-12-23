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
import { ViewBtn, SaveBtn } from "../MaterialBtns";
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    root: {
        // display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            // width: theme.spacing(75),
            // height: theme.spacing(75),
        },
        maxWidth: 345,
        minHeight: 550,
        paddingBottom: 20,

    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    media: {
        height: 400,
        paddingTop: '56.25%', // 16:9
    },
    content: {
        minHeight: 150,
    },
    // cardActions: {
    //     alignSelf: gutterBottom,
    // },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }
}));

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
                <CardContent
                    className={classes.content}>
                    <Typography gutterBottom variant="h6" component="h6">
                        {props.title}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h6">
                        {props.author}
                    </Typography>
                </CardContent>
                <CardActions>
                    <ViewBtn link={props.link}></ViewBtn>
                    <SaveBtn onClick={props.onClick}></SaveBtn>
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
        </Card>
    );
}
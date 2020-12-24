import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import API from "../utils/API";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        height: 400,
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
        minHeight: 150,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
}));

function Saved() {

    const classes = useStyles();

    const [books, setBooks] = useState([]);
    const [expanded, setExpanded] = React.useState(false);

    useEffect(() => {
        loadBooks()
    }, []);

    function loadBooks() {
        API.getBooks()
            .then(res => setBooks(res.data))
            .catch(err => console.log(err))
    };

    function handleDelete(id) {
        API.deleteBook(id)
            .then(res => loadBooks())
            .catch(err => console.log(err))
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Container>
            {/* Hero unit */}
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Saved Books
                    </Typography>
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                {books.length ? (
                    <Grid container spacing={4}>
                        {books.map((book) => (
                            <Grid item key={book.id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={book.image}
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {book.title}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                color="primary"
                                                href={book.link}>
                                                View
                                            </Button>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={() => handleDelete(book._id)}>
                                                Delete
                                            </Button>
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
                                                    {book.description}
                                                </Typography>
                                            </CardContent>
                                        </Collapse>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                        <h5 className="text-center">No Saved Books to Display...Yet</h5>

                    )}
            </Container>
        </Container>
    )
};

export default Saved;
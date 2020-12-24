import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import API from "../utils/API";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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

function Search() {

    const classes = useStyles();

    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState("");
    const [expanded, setExpanded] = React.useState(false);

    function handleInputChange({ target }) {
        const { value } = target;
        setQuery(value);
        console.log(query);
    };

    function handleSearch(e) {
        e.preventDefault();
        API.searchBooks(query)
            .then(res => {
                setBooks([]);
                const qualifyingResults = res.data.items.filter(book =>
                    book.id !== undefined &&
                    book.volumeInfo.imageLinks !== undefined &&
                    book.volumeInfo.title !== undefined &&
                    book.volumeInfo.authors !== undefined &&
                    book.volumeInfo.description !== undefined &&
                    book.volumeInfo.previewLink !== undefined
                );
                const newBooks = qualifyingResults.map(result => {
                    return ({
                        id: result.id,
                        image: result.volumeInfo.imageLinks.thumbnail,
                        title: result.volumeInfo.title,
                        authors: result.volumeInfo.authors,
                        description: result.volumeInfo.description,
                        link: result.volumeInfo.previewLink
                    })
                });
                setBooks([...newBooks])
            })
            .catch(err => console.log(err));
    };

    function handleSave(e, id) {
        e.preventDefault();
        const dbBook = books.filter(book => book.id === id);
        API.saveBook(dbBook);
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
                        Book Search
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="serach"
                            label="Search for a Book"
                            name="search"
                            autoFocus
                            onChange={handleInputChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(e) => handleSearch(e)}
                        >
                            Search
                        </Button>
                    </form>
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
                                                onClick={(e) => {
                                                    handleSave(e, book.id)
                                                }}>
                                                Save
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
                        <h5 className="text-center">No Results to Display...Yet</h5>

                    )}
            </Container>
        </Container>
    )
};


export default Search;
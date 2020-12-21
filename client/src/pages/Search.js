import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import API from "../utils/API"
import MaterialContainer from "../components/MaterialContainer"
import Jumbotron from "../components/Jumbotron";
import { Input, FormBtn } from "../components/Form";
import MaterialGrid from "../components/MaterialGrid";
import { Grid } from "@material-ui/core/";
import MaterialCard from "../components/MaterialCard";

const useStyles = makeStyles((theme) => ({
    Grid: {
        alignItems: "align-bottom"
    }
}));

function Search() {

    const classes = useStyles();

    const [books, setBooks] = useState([]);

    const [query, setQuery] = useState("");

    useEffect(() => {
        console.log(books)
    }, [books]);

    function handleInputChange({ target }) {
        const { value } = target;
        console.log(value);
        setQuery(value);
    }

    function handleSearch(event) {
        event.preventDefault();
        API.searchBooks(query)
            .then(res => {
                setBooks([]);
                // console.log(books);
                // console.log(res.data.items);
                const qualifyingResults = res.data.items.filter(book =>
                    book.id !== undefined &&
                    book.volumeInfo.imageLinks !== undefined &&
                    book.volumeInfo.title !== undefined &&
                    book.volumeInfo.authors !== undefined &&
                    book.volumeInfo.description !== undefined &&
                    book.volumeInfo.previewLink !== undefined
                );
                const newBooks = qualifyingResults.map(result => {
                    console.log(result);
                    return ({
                        id: result.id,
                        image: result.volumeInfo.imageLinks.thumbnail,
                        title: result.volumeInfo.title,
                        authors: result.volumeInfo.authors,
                        description: result.volumeInfo.description,
                        link: result.volumeInfo.previewLink
                    })
                });
                setBooks([...books, ...newBooks])
            })
            .catch(err => console.log(err));
    }

    function handleSave(e, id) {
        e.preventDefault();
        console.log(books);
        console.log("passed id: " + id);
        const dbBook = books.filter(book => book.id === id);
        console.log(dbBook);
        API.saveBook(dbBook);
    }

    return (
        <div className={classes.root}>
            <MaterialContainer>
                <MaterialContainer>
                    <Jumbotron>
                        <h1>(React) Google Books Search</h1>
                        <h2>Search For and Save Books of Interest</h2>
                    </Jumbotron>
                </MaterialContainer>
                <MaterialContainer>
                    <h3 className="p-3">Book Search</h3>
                    <form className="p-3">
                        <Input
                            onChange={handleInputChange}
                            name="search"
                            placeholder="Search for a book!"
                        />
                        <FormBtn
                            onClick={handleSearch}
                        >
                            Search
                        </FormBtn>
                    </form>
                </MaterialContainer>
                <MaterialContainer>
                    <h3 className="p-3">Results</h3>
                    {books.length ? (
                        <MaterialGrid>
                            {books.map(book => (
                                <Grid item xs={3}>
                                    <MaterialCard
                                        key={book.id}
                                        image={book.image}
                                        title={book.title}
                                        author={book.authors[0]}
                                        description={book.description}
                                        link={book.previewLink}
                                        onClick={(event) => { handleSave(event, book.id) }}
                                    >
                                    </MaterialCard>
                                    {/* <ViewBtn onClick={() => viewBook(book.id)} />
                                    <SaveBtn onClick={() => saveBook(book.id)} /> */}
                                </Grid>

                            ))}
                        </MaterialGrid>
                    ) : (
                            <h5 className="text-center">No Results to Display...Yet</h5>

                        )}

                </MaterialContainer>
            </MaterialContainer>
        </div>
    )
}


export default Search;
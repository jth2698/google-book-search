import React, { useState, useEffect } from "react";
import API from "../utils/API"
import MaterialContainer from "../components/MaterialContainer"
import Jumbotron from "../components/Jumbotron";
import { Input, FormBtn } from "../components/Form";
import MaterialGrid from "../components/MaterialGrid";
import { Grid } from "@material-ui/core/";
import MaterialCard from "../components/MaterialCard";
import { ViewBtn, SaveBtn } from "../components/MaterialBtns";


function Search() {

    const [books, setBooks] = useState([]);

    const [query, setQuery] = useState("");

    useEffect(() => {
        console.log(query);
        console.log(books);
        // (e) => handleSearch();
    }, [books]);

    function handleInputChange({ target }) {
        const { value } = target;
        setQuery(value);
        console.log(query);
    }

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
                        onClick={(e) => handleSearch(e)}
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
                            <Grid item xs={4} key={book.id}>
                                <MaterialCard
                                    image={book.image}
                                    title={book.title}
                                    author={book.authors[0]}
                                    description={book.description}>
                                    <ViewBtn
                                        onClick={book.link}>
                                    </ViewBtn>
                                    <SaveBtn
                                        onClick={(e) => {
                                            handleSave(e, book.id)
                                        }}>
                                    </SaveBtn>

                                </MaterialCard>
                            </Grid>

                        ))}
                    </MaterialGrid>
                ) : (
                        <h5 className="text-center">No Results to Display...Yet</h5>

                    )}

            </MaterialContainer>
        </MaterialContainer>
    )
}


export default Search;
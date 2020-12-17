import React, { useState, useEffect } from "react";
import API from "../utils/API"
import { Container, Row, Col } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { Input, FormBtn } from "../components/Form";
import { Card } from "../components/BookCard";
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom";
import { ViewBtn, SaveBtn } from "../components/BookBtns";


function Search() {

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

    function handleFormSubmit(event) {
        event.preventDefault();
        API.searchBooks(query)
            .then(res => {
                console.log(res);
                setBooks(...books, res.data.items)
            })
            .catch(err => console.log(err));
    }

    return (
        <Container>
            <Container>
                <Jumbotron>
                    <h1>(React) Google Books Search</h1>
                    <h2>Search For and Save Books of Interest</h2>
                </Jumbotron>
            </Container>
            <Container pb mb border>
                <h3 className="p-3">Book Search</h3>
                <form className="p-3">
                    <Input
                        onChange={handleInputChange}
                        name="search"
                        placeholder="Search for a book!"
                    />
                    <FormBtn
                        disabled=""
                        onClick={handleFormSubmit}
                    >
                        Search
                    </FormBtn>
                </form>
            </Container>
            <Container pb mb border>
                <h3 className="p-3">Results</h3>
                {books.length ? (
                    <Row>
                        {books.map(book => (
                            <Col size="4">
                                <Card
                                    key={book.id}
                                    size="18"
                                    image={book.volumeInfo.imageLinks.thumbnail}
                                    title={book.volumeInfo.title}
                                    author={book.volumeInfo.authors[0]}
                                    description={book.volumeInfo.description}
                                >
                                </Card>
                                <ViewBtn onClick={() => viewBook(book.id)} />
                                <SaveBtn onClick={() => saveBook(book.id)} />
                            </Col>
                        ))}
                    </Row>
                ) : (
                        <h5 className="text-center">No Results to Display...Yet</h5>
                    )}
            </Container>
        </Container >
    )
}

export default Search;
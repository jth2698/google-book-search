import React, { useState, useEffect } from "react";
import API from "../utils/API"
import { Container, Row, Col } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { Input, FormBtn } from "../components/Form";
import MediaCard from "../components/MaterialCard"


function Search() {

    const [books, setBooks] = useState([{
        image: ""
    }]);

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
                const qualifyingResults = res.data.items.filter(book =>
                    book.volumeInfo.imageLinks !== undefined &&
                    book.volumeInfo.title !== undefined &&
                    book.volumeInfo.authors !== undefined &&
                    book.volumeInfo.description !== undefined &&
                    book.volumeInfo.previewLink !== undefined
                );
                qualifyingResults.forEach(result => {
                    console.log(result);
                    setBooks([
                        ...books,
                        { image: result.volumeInfo.imageLinks.thumbnail }
                    ])

                })
            })
            .catch(err => console.log(err));
        setQuery("");
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
            <Container fluid pb mb border>
                <h3 className="p-3">Results</h3>
                {books.length ? (
                    <Row>
                        {books.map(book => (
                            <Col size="4">
                                <MediaCard
                                    key={book.id}
                                // image={book.volumeInfo.imageLinks.thumbnail}
                                // title={book.volumeInfo.title}
                                // author={book.volumeInfo.authors[0]}
                                // description={book.volumeInfo.description}
                                // link={book.volumeInfo.previewLink}
                                >
                                </MediaCard>
                                {/* <ViewBtn onClick={() => viewBook(book.id)} />
                                <SaveBtn onClick={() => saveBook(book.id)} /> */}
                            </Col>
                        ))}
                    </Row>
                ) : (
                        <h5 className="text-center">No Results to Display...Yet</h5>
                    )}
            </Container>
        </Container>
    )
}

export default Search;
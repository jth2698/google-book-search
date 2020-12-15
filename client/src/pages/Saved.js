import React from "react";
import { Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { Input, FormBtn } from "../components/Form";
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom";
import { ViewBtn, SaveBtn } from "../components/BookBtns";


function Saved() {

    return (
        <Container>
            <Container>
                <Jumbotron>
                    <h1>(React) Google Books Search</h1>
                    <h2>Search For and Save Books of Interest</h2>
                </Jumbotron>
            </Container>
            <Container pb mb border>
                <h3 className="p-3">Saved Books</h3>
                {/* {books.length ? (
                    <List>
                        {books.map(book => (
                            <ListItem key={book._id}>
                                <Link to={"/books/" + book._id}>
                                    <strong>
                                        {book.title} by {book.author}
                                    </strong>
                                </Link>
                                <ViewBtn onClick={() => viewBook(book._id)} />
                                <SaveBtn onClick={() => saveBook(book._id)} />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                        <h3>No Results to Display</h3>
                    )} */}
            </Container>
        </Container>
    )
}

export default Saved;
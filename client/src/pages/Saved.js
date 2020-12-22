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
    // Grid: {
    //     alignItems: "align-bottom"
    // }
}));

function Saved() {

    const classes = useStyles();

    const [books, setBooks] = useState([]);

    useEffect(() => {
        loadBooks()
    }, []);

    function loadBooks() {
        API.getBooks()
            .then(res => setBooks(res.data))
            .catch(err => console.log(err))
    };

    return (
        <div className={classes.root}>
            <MaterialContainer>
                <h3 className="p-3">Saved Books</h3>
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
                            </Grid>
                        ))}
                    </MaterialGrid>
                ) : (
                        <h5 className="text-center">No Saved Books to Display...Yet</h5>
                    )}
            </MaterialContainer>
        </div>
    )
}

export default Saved;
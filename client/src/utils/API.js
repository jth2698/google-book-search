require('dotenv').config();

import axios from "axios";
const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=";
const APIKEY = `&key${process.env.API_KEY}`;

// The API util consists of functions using axios to make calls to the Google Books API and mongo db

export default {
    // Search GoogleBooks
    searchBooks: function (query) {
        return axios.get(BASEURL + query + APIKEY)
    },
    // Gets all books
    getBooks: function () {
        return axios.get("/api/books");
    },
    // Gets the book with the given id
    getBook: function (id) {
        return axios.get("/api/books/" + id);
    },
    // Deletes the book with the given id
    deleteBook: function (id) {
        return axios.delete("/api/books/" + id);
    },
    // Saves a book to the database
    saveBook: function (bookData) {
        return axios.post("/api/books", bookData);
    }
};
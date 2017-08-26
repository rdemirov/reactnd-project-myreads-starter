import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import MyReads from './components/MyReads';
import { Switch, Route } from 'react-router-dom'
import SearchBooks from './components/SearchBooks';
import './App.css'

class BooksApp extends React.Component {
  state = {
    shelves: [
      { title: 'Currently Reading', name: 'currentlyReading' },
      { title: 'Read', name: 'read' },
      { title: 'Want To Read', name: 'wantToRead' }
    ],
    books: [],
    searchResults: []

  }

  constructor() {
    super();
    this.moveBookToShelf = this.moveBookToShelf.bind(this);
    this.onSearchBooks = this.onSearchBooks.bind(this);
    this.onSearchPageLoad = this.onSearchPageLoad.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) =>
        this.setState({ books })
      );
  }

  moveBookToShelf(bookData) {
    let { book, newShelf } = bookData;
    let bookIndex;
    BooksAPI.update(book, newShelf)
      .then((result) => {
        this.setState((state) => {
          bookIndex = state.books.findIndex((element) => {
            return element.id === book.id;
          });
          if (bookIndex !== -1) state.books[bookIndex]['shelf'] = newShelf;
          else {
            book.shelf = newShelf;
            state.books.push(book);
          }
          if (state.searchResults && !state.searchResults.error && state.searchResults.length > 0) {
            bookIndex = state.searchResults.findIndex((element) => {
              return element.id === book.id;
            });
            if (bookIndex !== -1) state.searchResults[bookIndex]['shelf'] = newShelf;
          }
          return state;
        })
      });
  }

  onSearchBooks(searchQuery) {
    let { query, maxResults } = searchQuery;
    let results;
    if (query && query !== '') {
      BooksAPI.search(query, maxResults)
        .then((searchResults) => {
          if (searchResults.error) {
            if (searchResults.error === 'empty query') results = { error: 'No matching books found' }
            else results = { error: searchResults.error }
          }
          else {
            let book;
            searchResults = searchResults.map((element) => {
              book = this.state.books.find((object) => object.id === element.id);
              if (book) {
                element.shelf = book.shelf
              }
              return element;
            }, this);
            results = searchResults;
          }
          this.setState({ searchResults: results });
        });
    } else this.setState({ searchResults: [] });

  }

  onSearchPageLoad() {
    this.setState({ searchResults: [] });
  }

  render() {
    return (
      <Switch>
        <Route exact path="/"
          render={props => {
            return (<div className="app">
              <MyReads
                shelves={this.state.shelves}
                books={this.state.books}
                onSelectChange={this.moveBookToShelf}
              />
            </div>)
          }} />
        <Route path="/search"
          render={props => {
            return (
              <SearchBooks
                {...props}
                onSearchBooks={this.onSearchBooks}
                searchResults={this.state.searchResults}
                onSelectChange={this.moveBookToShelf}
                onSearchPageLoad={this.onSearchPageLoad}
              />
            )
          }} />
      </Switch>
    )
  }
}

export default BooksApp

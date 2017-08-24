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
    searchResults: [],
    searchQuery: {
      query: '',
      maxResults: 0
    }

  }

  constructor() {
    super();
    this.moveBookToShelf = this.moveBookToShelf.bind(this);
    this.onSearchBooks = this.onSearchBooks.bind(this);
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
          else state.books.push(book);
          return state;
        })
      });
  }

  onSearchBooks(searchQuery) {
    let { query, maxResults } = searchQuery;
    BooksAPI.search(query, maxResults)
      .then((searchResults) => {
        this.setState({ searchResults });
      });
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
                searchQuery={this.state.searchQuery}
                searchResults={this.state.searchResults}
                onSelectChange={this.moveBookToShelf}
              />
            )
          }} />
      </Switch>
    )
  }
}

export default BooksApp

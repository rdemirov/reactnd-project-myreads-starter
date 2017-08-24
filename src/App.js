import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import MyReads from './components/MyReads';
import { Switch, Route } from 'react-router-dom'
import SearchBooks from './components/SearchBooks';
import './App.css'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    shelves: [
      { title: 'Currently Reading', name: 'currentlyReading' },
      { title: 'Read', name: 'read' },
      { title: 'Want To Read', name: 'wantToRead' }
    ],
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) =>
        this.setState({ books })
      );
  }

  moveBookToShelf(event) {
    let bookId = event.bookId;
    let newShelf = event.newShelf;
    let index = this.state.books.findIndex((element) => {
      return element.id === bookId
    });
    if (index !== -1) {
      this.setState((prevState) => prevState.books[index].shelf = newShelf);
    }

  }

  render() {
    return (
      <Switch>
        <Route exact path="/"
          render={props => {
            return (<div className="app">
              <MyReads shelves={this.state.shelves} books={this.state.books} onMoveToShelf={(e) => this.moveBookToShelf(e)} />
            </div>)
          }} />
        <Route path="/search" component={SearchBooks} />
      </Switch>
    )
  }
}

export default BooksApp

import React from 'react'
import * as BooksAPI from './BooksAPI'
import MyReads from './MyReads';
import SearchBooks from './SearchBooks';
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
   let bookId=event.bookId;
   let newShelf=event.newShelf;
   let index = this.state.books.findIndex((element) => {
    return element.id===bookId
   });
   if(index!==-1) {
     this.setState((prevState)=> prevState.books[index].shelf=newShelf);
   }

  }

  render() {
    return (
      <div className="app">
        <SearchBooks showSearchPage={this.state.showSearchPage} />
        <MyReads shelves={this.state.shelves} books={this.state.books} onMoveToShelf={(e)=>this.moveBookToShelf(e)} />
      </div>
    )
  }
}

export default BooksApp

import React from 'react';
import Book from './Book';
import {Link} from 'react-router-dom';

class MyReads extends React.Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.props.shelves.map((shelf) => {
                            return (
                                <div className="bookshelf" key={shelf.name}>
                                    <h2 className="bookshelf-title" >{shelf.title}</h2>
                                    <div className="bookshelf-books" >
                                        <ol className="books-grid" >
                                            {
                                                this.props.books.filter((book) => {
                                                    return book.shelf === shelf.name;
                                                })
                                                    .map((book) => 
                                                       { return <li key={book.id}><Book book={book} onMoveToShelf={this.props.onMoveToShelf}/></li>},
                                                        this)
                                            }
                                        </ol>
                                    </div>
                                </div>
                            );
                        },this)}
                    </div>
                </div>   
             <div className="open-search">
            <Link to='/search'>Add a book</Link>
           </div>
           </div>
        )
    }
}

export default MyReads;
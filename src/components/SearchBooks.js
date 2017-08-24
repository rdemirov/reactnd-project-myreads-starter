import React from 'react';
import Book from './Book';
import allowedSearchTerms from '../utils/allowedSearchTerms';

class SearchBooks extends React.Component {

    render()  {
        return (
                <div className="search-books">
                  <div className="search-books-bar">
                    <a className="close-search" onClick={() => this.props.history.push('/')}>Close</a>
                    <div className="search-books-input-wrapper">
                      <input type="text" placeholder="Search by title or author"/>
                    </div>
                  </div>
                  <div className="search-books-results">
                    <ol className="books-grid">
                    {this.props.searchResults.map((book) =>
                        { return <li key={book.id}><Book book={book} onSelectChange={this.props.onSelectChange} /> </li> }
                      )}
                      </ol>
                  </div>
                </div>
        );
    }

}

export default SearchBooks;
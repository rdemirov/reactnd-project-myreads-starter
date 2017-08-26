import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
import allowedSearchTerms from '../utils/allowedSearchTerms';

class SearchBooks extends React.Component {

  static PropTypes = {
    searchResults: PropTypes.array.isRequired,
    onSearchBooks: PropTypes.object.isRequired,
    onSelectChange: PropTypes.func.isRequired,
    onSearchPageLoad:PropTypes.func.isRequired
  }

componentDidMount() {
  this.props.onSearchPageLoad();
}

  render() {
    let results = this.props.searchResults.map((book, index) => <li key={book.id}><Book book={book} onSelectChange={this.props.onSelectChange} /> </li>);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.props.history.push('/')}>Close</a>
          <div className="search-books-input-wrapper" width="80%">
            <input type="text" onChange={(e) => {
              let allowedSearch;
              if (allowedSearchTerms.indexOf(e.target.value) !== -1) allowedSearch = true;
              this.props.onSearchBooks({
                query: e.target.value,
                maxResults: 20,
                allowedSearch
              })
            }} placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results}
          </ol>
        </div>
      </div>
    );
  }

}

export default SearchBooks;
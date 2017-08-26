import React from 'react';
import propTypes from 'prop-types';
class Book extends React.Component {
  render() {
    let book = this.props.book;
    let bookCoverStyle = { width: 128, height: 193 };
    if (book.imageLinks) bookCoverStyle.backgroundImage = `url(${book.imageLinks.thumbnail})`;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={bookCoverStyle}></div>
          <div className="book-shelf-changer">
            <select defaultValue={book.shelf || 'none'} onChange={(event) => {
              let newShelf = event.target.value;
              this.props.onSelectChange({ book, newShelf })
            }
            } >
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading" >Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              ({book.shelf && book.shelf !== 'none' && (<option value="none" >None</option>)})
            </select>
          </div>
        </div>
        <div className="book-title">{book.title || ''}</div>
        <div className="book-authors">{(book.authors) ? book.authors.join(',') : ''}</div>
      </div>
    )
  }

  static propTypes = {
    book: PropTypes.object.isRequired,
    onSelectChange: PropTypes.func.isRequired

  }
}

export default Book;
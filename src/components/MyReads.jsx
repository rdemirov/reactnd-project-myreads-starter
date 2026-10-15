import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

function MyReads({ shelves, books, onSelectChange }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) => (
            <div className="bookshelf" key={shelf.name}>
              <h2 className="bookshelf-title">{shelf.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books
                    .filter((book) => book.shelf === shelf.name)
                    .map((book) => (
                      <li key={book.id}>
                        <Book book={book} onSelectChange={onSelectChange} />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}

MyReads.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  onSelectChange: PropTypes.func.isRequired
}

export default MyReads

import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import Book from './Book'

function SearchBooks({ searchResults, onSearchBooks, onSelectChange, onSearchPageLoad }) {
  const navigate = useNavigate()

  useEffect(() => {
    onSearchPageLoad()
  }, [onSearchPageLoad])

  let results
  if (searchResults.error) {
    results = <p>{searchResults.error}</p>
  } else {
    results = searchResults.map((book) => (
      <li key={book.id}>
        <Book book={book} onSelectChange={onSelectChange} />
      </li>
    ))
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={() => navigate('/')}>Close</a>
        <div className="search-books-input-wrapper" width="80%">
          <input
            type="text"
            onChange={(e) => {
              onSearchBooks({
                query: e.target.value,
                maxResults: 20
              })
            }}
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {results}
        </ol>
      </div>
    </div>
  )
}

SearchBooks.propTypes = {
  searchResults: PropTypes.array.isRequired,
  onSearchBooks: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  onSearchPageLoad: PropTypes.func.isRequired
}

export default SearchBooks

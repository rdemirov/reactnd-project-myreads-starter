import { useState, useEffect, useCallback } from 'react'
import * as BooksAPI from './utils/BooksAPI'
import MyReads from './components/MyReads'
import { Routes, Route } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import './App.css'

const SHELVES = [
  { title: 'Currently Reading', name: 'currentlyReading' },
  { title: 'Read', name: 'read' },
  { title: 'Want To Read', name: 'wantToRead' }
]

function BooksApp() {
  const [books, setBooks] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    BooksAPI.getAll().then(setBooks)
  }, [])

  const moveBookToShelf = useCallback(({ book, newShelf }) => {
    BooksAPI.update(book, newShelf).then(() => {
      setBooks((prevBooks) => {
        const index = prevBooks.findIndex((element) => element.id === book.id)
        if (index !== -1) {
          return prevBooks.map((element) =>
            element.id === book.id ? { ...element, shelf: newShelf } : element
          )
        }
        return [...prevBooks, { ...book, shelf: newShelf }]
      })
      setSearchResults((prevResults) => {
        if (!Array.isArray(prevResults)) return prevResults
        return prevResults.map((element) =>
          element.id === book.id ? { ...element, shelf: newShelf } : element
        )
      })
    })
  }, [])

  const onSearchBooks = useCallback(({ query, maxResults }) => {
    if (!query) {
      setSearchResults([])
      return
    }
    BooksAPI.search(query, maxResults).then((response) => {
      if (response.error) {
        setSearchResults({
          error: response.error === 'empty query'
            ? 'No matching books found'
            : response.error
        })
        return
      }
      setSearchResults(
        response.map((element) => {
          const match = books.find((object) => object.id === element.id)
          return match ? { ...element, shelf: match.shelf } : element
        })
      )
    })
  }, [books])

  const onSearchPageLoad = useCallback(() => {
    setSearchResults([])
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <MyReads
              shelves={SHELVES}
              books={books}
              onSelectChange={moveBookToShelf}
            />
          </div>
        }
      />
      <Route
        path="/search"
        element={
          <SearchBooks
            onSearchBooks={onSearchBooks}
            searchResults={searchResults}
            onSelectChange={moveBookToShelf}
            onSearchPageLoad={onSearchPageLoad}
          />
        }
      />
    </Routes>
  )
}

export default BooksApp

import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

vi.mock('./utils/BooksAPI', () => ({
  getAll: vi.fn(() =>
    Promise.resolve([
      {
        id: '1',
        title: 'Test Book',
        authors: ['Test Author'],
        shelf: 'currentlyReading',
        imageLinks: { thumbnail: 'http://example.com/cover.jpg' }
      }
    ])
  ),
  update: vi.fn(() => Promise.resolve({})),
  search: vi.fn(() => Promise.resolve([]))
}))

it('renders the MyReads shelves and loads books', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByText('MyReads')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Test Book')).toBeInTheDocument()
  })
})

it('renders the search page without crashing', () => {
  render(
    <MemoryRouter initialEntries={['/search']}>
      <App />
    </MemoryRouter>
  )
  expect(screen.getByPlaceholderText('Search by title or author')).toBeInTheDocument()
})

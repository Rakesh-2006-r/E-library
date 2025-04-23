import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [favoriteBooks, setFavoriteBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('No token found')
        }

        const response = await axios.get('http://localhost:5000/api/favorites', {
          headers: { Authorization: `Bearer ${token}` }
        })

        setFavoriteBooks(response.data.data.books)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch user data')
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back!</p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Favorite Books</h2>
          </div>
          <div className="border-t border-gray-200">
            {favoriteBooks.length === 0 ? (
              <div className="px-4 py-5 sm:px-6 text-gray-500">
                You haven't added any books to your favorites yet.{' '}
                <Link to="/books" className="text-indigo-600 hover:text-indigo-500">
                  Browse books
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {favoriteBooks.map((book) => (
                  <Link key={book._id} to={`/books/${book._id}`} className="group">
                    <div className="aspect-w-3 aspect-h-4 w-full overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className="mt-4 space-y-2">
                      <h3 className="text-lg font-medium text-gray-900">{book.title}</h3>
                      <p className="text-sm text-gray-500">{book.author}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
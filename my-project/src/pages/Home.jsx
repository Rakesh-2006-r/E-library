import { Link } from 'react-router-dom'

export default function Home() {
  const featuredBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3",
      category: "Fiction"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3",
      category: "Fiction"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3",
      category: "Fiction"
    }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative bg-indigo-600 py-16 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Welcome to E-Library
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-indigo-100">
              Discover thousands of digital books at your fingertips. Read anywhere, anytime.
            </p>
            <div className="mt-10">
              <Link
                to="/books"
                className="rounded-md bg-white px-8 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50"
              >
                Browse Books
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Books Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Books</h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {featuredBooks.map((book) => (
            <Link key={book.id} to={`/books/${book.id}`} className="group">
              <div className="aspect-w-3 aspect-h-4 w-full overflow-hidden rounded-lg">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{book.title}</h3>
              <p className="text-sm text-gray-500">{book.author}</p>
              <p className="mt-1 text-sm text-indigo-600">{book.category}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Vast Collection</h3>
              <p className="mt-2 text-gray-600">Access thousands of books across various genres and categories.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Analytics</h3>
              <p className="mt-2 text-gray-600">Track your reading progress and get personalized recommendations.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Multi-device Access</h3>
              <p className="mt-2 text-gray-600">Read your books on any device, anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">About</h3>
            <p className="text-gray-600">
              E-Library is your digital gateway to a world of knowledge. Access thousands of books anytime, anywhere.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-indigo-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-gray-600 hover:text-indigo-600">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-indigo-600">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/books?category=fiction" className="text-gray-600 hover:text-indigo-600">
                  Fiction
                </Link>
              </li>
              <li>
                <Link to="/books?category=non-fiction" className="text-gray-600 hover:text-indigo-600">
                  Non-Fiction
                </Link>
              </li>
              <li>
                <Link to="/books?category=academic" className="text-gray-600 hover:text-indigo-600">
                  Academic
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: support@elibrary.com</li>
              <li className="text-gray-600">Phone: (555) 123-4567</li>
              <li className="text-gray-600">Address: 123 Library Street</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} E-Library. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 
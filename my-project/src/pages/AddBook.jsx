import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddBook() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    isbn: '',
    category: 'fiction',
    price: 0,
    quantity: 1,
  })
  const [coverFile, setCoverFile] = useState(null)
  const [pdfFile, setPdfFile] = useState(null)
  const [errors, setErrors] = useState({})

  const categories = [
    { id: 'programming', name: 'Programming' },
    { id: 'web-development', name: 'Web Development' },
    { id: 'ai', name: 'AI' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    if (type === 'cover') {
      if (file && !file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          cover: 'Please upload an image file'
        }))
        return
      }
      setCoverFile(file)
    } else if (type === 'pdf') {
      if (file && file.type !== 'application/pdf') {
        setErrors(prev => ({
          ...prev,
          pdf: 'Please upload a PDF file'
        }))
        return
      }
      setPdfFile(file)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title) newErrors.title = 'Title is required'
    if (!formData.author) newErrors.author = 'Author is required'
    if (!formData.description) newErrors.description = 'Description is required'
    if (!formData.isbn) newErrors.isbn = 'ISBN is required'
    if (!coverFile) newErrors.cover = 'Cover image is required'
    if (!pdfFile) newErrors.pdf = 'PDF file is required'
    if (formData.quantity < 1) newErrors.quantity = 'Quantity must be at least 1'
    return newErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // Upload cover image
      const formDataCover = new FormData();
      formDataCover.append("file", coverFile);
      const coverResponse = await axios.post("http://localhost:5000/api/upload", formDataCover);
      console.log("Cover response:", coverResponse.data); // Debug log
      // Upload PDF file
      const formDataPdf = new FormData();
      formDataPdf.append("file", pdfFile);
      const pdfResponse = await axios.post("http://localhost:5000/api/upload", formDataPdf);
       console.log("PDF response:", pdfResponse.data); // Debug log
      // Create book with uploaded file URLs
      const bookData = {
        ...formData,
        cover: coverResponse.data.url,
        pdfUrl: pdfResponse.data.url,
      };

      const response = await axios.post("http://localhost:5000/api/books", bookData);
      console.log("Book added successfully:", response.data);

      // Navigate to the book details page
      navigate(`/books/${response.data.data.book._id}`);
    } catch (error) {
      console.error("Error adding book:", error);
      setErrors({
        submit: error.response?.data?.message || "Failed to add book. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Book</h1>
          <p className="mt-2 text-gray-600">Share a book with the E-Library community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow sm:rounded-lg p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  className={`block w-full rounded-md shadow-sm ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  } focus:border-indigo-500 focus:ring-indigo-500`}
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="author"
                  id="author"
                  required
                  className={`block w-full rounded-md shadow-sm ${
                    errors.author ? 'border-red-300' : 'border-gray-300'
                  } focus:border-indigo-500 focus:ring-indigo-500`}
                  value={formData.author}
                  onChange={handleChange}
                />
                {errors.author && (
                  <p className="mt-2 text-sm text-red-600">{errors.author}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  className={`block w-full rounded-md shadow-sm ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  } focus:border-indigo-500 focus:ring-indigo-500`}
                  value={formData.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
                BN
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="isbn"
                  id="isbn"
                  required
                  className={`block w-full rounded-md shadow-sm ${
                    errors.isbn ? 'border-red-300' : 'border-gray-300'
                  } focus:border-indigo-500 focus:ring-indigo-500`}
                  value={formData.isbn}
                  onChange={handleChange}
                />
                {errors.isbn && (
                  <p className="mt-2 text-sm text-red-600">{errors.isbn}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="mt-1">
                <select
                  id="category"
                  name="category"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="price"
                  id="price"
                  min="0"
                  step="0.01"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  min="1"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.quantity}
                  onChange={handleChange}
                />
                {errors.quantity && (
                  <p className="mt-2 text-sm text-red-600">{errors.quantity}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cover Image
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'cover')}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {errors.cover && (
                  <p className="mt-2 text-sm text-red-600">{errors.cover}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                PDF File
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, 'pdf')}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {errors.pdf && (
                  <p className="mt-2 text-sm text-red-600">{errors.pdf}</p>
                )}
              </div>
            </div>
          </div>

          {errors.submit && (
            <div className="text-sm text-red-600 text-center">{errors.submit}</div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Adding Book...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
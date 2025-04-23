import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BookDetails() {
  const { id } = useParams(); // Extract `id` from the URL
  const navigate = useNavigate(); // To redirect after deletion
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data.data);
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to fetch book details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook(); // Only fetch if `id` is defined
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      alert("Book deleted successfully!");
      navigate("/books"); // Redirect to the books list page
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete the book. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-gray-700">By {book.author}</p>
      <img
        src={`http://localhost:5000${book.cover}`}
        alt={book.title}
        className="mt-4 w-full max-w-sm"
      />
      <p className="mt-4">{book.description}</p>
      <a
        href={`http://localhost:5000${book.pdfUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-indigo-600 hover:underline"
      >
        Download PDF
      </a>
      <div className="mt-6">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Delete Book
        </button>
      </div>
    </div>
  );
}
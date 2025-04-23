const express = require("express");
const booksApp = express.Router();
const { getBooksCollection } = require("./db");
const { ObjectId } = require("mongodb");

// Get all books
booksApp.get("/", async (req, res) => {
  try {
    const booksCollection = getBooksCollection();
    const books = await booksCollection.find().toArray();
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Add a new book
booksApp.post("/", async (req, res) => {
  try {
    const booksCollection = getBooksCollection();
    const newBook = req.body;

    // Insert the new book into the database
    const result = await booksCollection.insertOne(newBook);

    // Return the inserted book with its ID
    res.status(201).json({
      data: {
        book: { _id: result.insertedId, ...newBook },
      },
    });
  } catch (err) {
    console.error("Error saving book:", err); // Debug log
    res.status(500).json({
      message: "Failed to add book",
      error: err.message,
    });
  }
});

// Get a book by ID
booksApp.get("/:id", async (req, res) => {
  try {
    const booksCollection = getBooksCollection();
    const bookId = req.params.id;

    // Validate the ID
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({ success: false, message: "Invalid book ID" });
    }

    // Fetch the book from the database
    const book = await booksCollection.findOne({ _id: new ObjectId(bookId) });

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Delete a book by ID
booksApp.delete("/:id", async (req, res) => {
  try {
    const booksCollection = getBooksCollection();
    const bookId = req.params.id;

    // Validate the ID
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({ success: false, message: "Invalid book ID" });
    }

    // Delete the book from the database
    const result = await booksCollection.deleteOne({ _id: new ObjectId(bookId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = { booksApp };
const express = require("express");
const app = express();
const cors = require("cors");
const { connectToMongo } = require("./db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body from frontend
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Create upload directories
const createUploadDirectories = () => {
  const imageDir = path.join(__dirname, "uploads/images");
  const pdfDir = path.join(__dirname, "uploads/pdfs");

  if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });
  if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });
};

createUploadDirectories();

// Connect to MongoDB and start the server
(async () => {
  try {
    await connectToMongo();
    console.log("Connected to MongoDB");

    // Users APIs
    const { userApp } = require("./usersApi");
    app.use("/api/users", userApp);

    // Books APIs
    const { booksApp } = require("./booksApi");
    app.use("/api/books", booksApp);

    // Start the server
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
})();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, path.join(__dirname, "uploads/images"));
    } else if (file.mimetype === "application/pdf") {
      cb(null, path.join(__dirname, "uploads/pdfs"));
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

// Upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  const fileUrl = `/uploads/${req.file.mimetype.startsWith("image/") ? "images" : "pdfs"}/${req.file.filename}`;
  res.status(200).json({ success: true, url: fileUrl });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


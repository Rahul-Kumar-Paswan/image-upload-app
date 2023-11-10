const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 5000;

// Get the absolute path to the "uploads" directory
const uploadsDir = path.join(__dirname, 'uploads');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'Rahul@123',
  database: 'image_upload_db',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected');
  }
});

app.use(cors());
app.use(express.json());

// Use the absolute path to the "uploads" directory to serve static files
app.use('/uploads', express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});



const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
  const { filename, path } = req.file;
  // console.log('Received file:', filename, path); // Add this line for debugging
  // console.log("File Name is:",filename);
  // console.log("File Path is :",path)

  if (!filename || !path) {
    res.status(400).send('Invalid file data');
    return;
  }

  const sql = 'INSERT INTO images (filename, filepath) VALUES (?, ?)';
  db.query(sql, [filename, path], (err) => {
    if (err) {
      res.status(500).send('Error uploading the file');
    } else {
      res.send('File uploaded successfully');
    }
  });
});

app.get('/images', (req, res) => {
  const sql = 'SELECT * FROM images';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching images:', err);
      res.status(500).send('Error fetching images');
    } else {
      res.json(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

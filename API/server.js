import express from 'express';
import mysql from 'mysql';

const app = express();
const PORT = 3000;
const ROUTE = '/api/students';
const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'student-db',
});

database.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Content-Type', 'application/json');
  next();
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toLocaleString()}`);
  next();
});

// get
app.get(ROUTE, (req, res) => {
  const query = 'SELECT * FROM students';
  database.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

// post
app.post(ROUTE, (req, res) => {
  const query = 'INSERT INTO students VALUES(?, ?, ?)';
  const {id, firstName, lastName} = req.body;
  database.query(query, [id, firstName, lastName], (err, result) => {
    if (err) res.status(400).json(err);
    res.status(201).json(result);
  });
});

// put
app.put(ROUTE, (req, res) => {
  const query = 'UPDATE students SET firstName = ?, lastName = ? WHERE id = ?';
  const {id, firstName, lastName} = req.body;
  database.query(query, [firstName, lastName, id], (err, result) => {
    if (err) res.status(400).json(err);
    res.status(200).json(result);
  });
});

// delete
app.delete(ROUTE, (req, res) => {
  const query = 'DELETE FROM students WHERE id = ?';
  const {id} = req.body;
  database.query(query, [id], (err, result) => {
    if (err) res.status(400).json(err);
    res.status(200).json(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

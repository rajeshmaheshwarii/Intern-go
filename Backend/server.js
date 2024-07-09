const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Database connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '', // replace with your MySQL password
  database: 'intern_go', // replace with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Error handler function
const errorHandler = (err, res) => {
  console.error('Database error:', err);
  res.status(500).json({ error: 'An unexpected error occurred.' });
};

app.get("/", (req, res) => {
  res.json({
    status: "connected",
  });
});

// Register endpoint
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const [existingUser] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'User already registered' }); // 409 Conflict
    }

    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );

    res.status(201).json({ id: result.insertId, message: 'User added successfully!' });
  } catch (err) {
    errorHandler(err, res);
  }
});


// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found or invalid credentials.' });
    }

    res.json(rows[0]); // Return user data
  } catch (err) {
    errorHandler(err, res);
  }
});

// User profile endpoints
app.post('/profile', async (req, res) => {
  const profileFields = [
    'userId', 'howDidYouHear', 'countryRegion', 'firstName', 'lastName',
    'phoneCode', 'mobileNumber1', 'mobileNumber2', 'emailAddress', 'githubLink',
    'linkedinLink', 'educationStatus', 'collegeName', 'degree', 'fieldOfStudy',
    'passingYear', 'state'
  ];
  const values = profileFields.map(field => req.body[field] || null); // Ensure null values for missing fields

  // Validate and parse userId
  const userId = parseInt(req.body.userId, 10);
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO userprofile (${profileFields.join(', ')}) VALUES (${Array(values.length).fill('?').join(', ')})`,
      values
    );

    res.status(201).json({ id: result.insertId, message: 'User profile added successfully!' });
  } catch (err) {
    errorHandler(err, res);
  }
});

app.get('/profile/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM userprofile WHERE userId = ?',
      [userId]
    );

    if (rows.length === 0) {
      res.status(404).json({
        userId,
        lastName: null,
        howDidYouHear: null,
        countryRegion: null,
        phoneCode: null,
        mobileNumber1: null,
        mobileNumber2: null,
        githubLink: null,
        linkedinLink: null,
        educationStatus: null,
        collegeName: null,
        degree: null,
        fieldOfStudy: null,
        passingYear: null,
        state: null
      });
    } else {
      res.json(rows[0]); // Return user profile data
    }
  } catch (err) {
    errorHandler(err, res);
  }
});

app.put('/profile/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10); // Parse userId as integer
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }
  const profileFields = [
    'howDidYouHear', 'countryRegion', 'firstName', 'lastName',
    'phoneCode', 'mobileNumber1', 'mobileNumber2', 'emailAddress', 'githubLink',
    'linkedinLink', 'educationStatus', 'collegeName', 'degree', 'fieldOfStudy',
    'passingYear', 'state'
  ];
  const values = profileFields.map(field => req.body[field] || null); // Ensure null values for missing fields
  values.push(userId); // Add userId to the end of the values array

  try {
    const [existingProfileRows] = await pool.execute(
      'SELECT * FROM userprofile WHERE userId = ?',
      [userId]
    );

    if (existingProfileRows.length === 0) {
      // User profile not found, insert new profile
      await pool.execute(
        `INSERT INTO userprofile (userId, ${profileFields.join(', ')}) VALUES (?, ${Array(values.length - 1).fill('?').join(', ')})`,
        [userId, ...values.slice(0, -1)]
      );

      res.status(201).json({ message: 'User profile created successfully!' });
    } else {
      // User profile found, update existing profile
      await pool.execute(
        `UPDATE userprofile SET ${profileFields.map(field => `${field} = ?`).join(', ')} WHERE userId = ?`,
        values
      );

      res.json({ message: 'User profile updated successfully!' });
    }
  } catch (err) {
    errorHandler(err, res);
  }
});

// User internships endpoints
app.post('/user_internships', async (req, res) => {
  const { user_Id, internship_Id, join_date, completion_date } = req.body;

  try {
    // Check if the entry already exists for the given user and internship
    const [existingRows] = await pool.execute(
      'SELECT * FROM user_internships WHERE user_Id = ? AND internship_Id = ?',
      [user_Id, internship_Id]
    );

    if (existingRows.length > 0) {
      return res.status(409).json({ error: 'User already joined this internship' });
    }

    // Insert new entry if it doesn't already exist
    const [result] = await pool.execute(
      'INSERT INTO user_internships (user_Id, internship_Id, join_date, completion_date) VALUES (?, ?, ?, ?)',
      [user_Id, internship_Id, join_date, completion_date]
    );

    res.status(201).json({ message: 'Internship joined successfully', id: result.insertId });
  } catch (err) {
    console.error('Error joining internship:', err);
    res.status(500).json({ error: 'Failed to join internship' });
  }
});

app.get('/user_internships', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM user_internships');
    res.json(rows);
  } catch (err) {
    errorHandler(err, res);
  }
});

// Fetch for dashboard
app.get('/user_internships/:id', async (req, res) => {
  const user_Id = req.params.id;

  try {
    const sql = 'SELECT * FROM user_internships WHERE user_Id = ?';
    const [rows] = await pool.execute(sql, [user_Id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No internship data found for the user ID' });
    }

    res.json(rows);
  } catch (err) {
    errorHandler(err, res);
  }
});

app.put('/user_internships/:internshipId', async (req, res) => {
  const { internshipId } = req.params;
  const { userId, completion_date } = req.body;

  try {
    // Update completion_date in user_internships table
    const [result] = await pool.execute(
      'UPDATE user_internships SET completion_date = ? WHERE user_Id = ? AND internship_Id = ?',
      [completion_date, userId, internshipId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Internship not found for the user.' });
    }

    // Send success response
    res.status(200).json({ message: 'Internship marked as complete' });
  } catch (error) {
    console.error('Error marking internship as complete:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

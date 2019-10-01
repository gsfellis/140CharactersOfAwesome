const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();


// connect to database
connectDB();


// init middleware
app.use(express.json({ extended: false }));

// define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));
// Serve static routes
// if (process.env.Node_ENV === 'production') {
//   // set static folder

// }


// comment this back in before push
app.use(express.static('client/build'));

app.get('*', (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  res.sendStatus(400);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

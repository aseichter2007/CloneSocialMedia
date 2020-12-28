const connectDB = require(`./startup/db`);
const posts = require('./routes/posts');
const users = require('./routes/users');
const comments = require('./routes/comments');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
const cors = require('cors');
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/posts', posts);
app.use('/api/comments', comments);
app.use('/api/users', users);
app.use('/api/auth', auth)
const port = process.env.PORT||5000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});

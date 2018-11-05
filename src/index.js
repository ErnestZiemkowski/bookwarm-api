import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from 'bluebird';
import auth from './routes/auth.js';
import users from './routes/users.js';
import books from "./routes/books.js";

const app = express();

dotenv.config();
app.use(bodyParser.json());

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.connection.once('open', () => {
    console.log('connected to MLab');
});

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/books', books);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => console.log('Server listening on 127.0.0.1:8080'));

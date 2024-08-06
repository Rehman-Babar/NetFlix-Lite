import express from 'express';
import dotenv from 'dotenv'

import MongoDbConnection from './db/mongoDbConnection.js';

import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import tvSeasonRoutes from './routes/tvSeasonRoutes.js';
import searchRoutes from './routes/searchRoutes.js';

import { protectedRoutes } from './middlewares/protectedRoutes.js';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 5000

const app = express();

dotenv.config();


// middleware
app.use(express.json({limit:"3mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())



app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/movie',protectedRoutes, movieRoutes)
app.use('/api/v1/tv',protectedRoutes, tvSeasonRoutes)
app.use('/api/v2/search',protectedRoutes, searchRoutes)

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    MongoDbConnection();
})
import express from 'express';
import dotenv from 'dotenv'
import path from 'path'

import MongoDbConnection from './db/mongoDbConnection.js';

import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import tvSeasonRoutes from './routes/tvSeasonRoutes.js';
import searchRoutes from './routes/searchRoutes.js';

import { protectedRoutes } from './middlewares/protectedRoutes.js';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 5000

const app = express();

const __dirname = path.resolve()

dotenv.config();


// middleware
app.use(express.json({limit:"3mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())



app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/movie',protectedRoutes, movieRoutes)
app.use('/api/v1/tv',protectedRoutes, tvSeasonRoutes)
app.use('/api/v2/search',protectedRoutes, searchRoutes)

// if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
    
// }

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    MongoDbConnection();
})
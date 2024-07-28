import express from 'express';
import { getcategreyMovies, GetMovieDetails, GetMovieTrailer, GetSimmilerMovies, GetTrandingMovie } from '../controllers/movieControllers.js';

const router = express.Router();

router.get('/trending', GetTrandingMovie)
router.get('/:id/trailers', GetMovieTrailer)
router.get('/:id/details', GetMovieDetails)
router.get('/:id/simmiler', GetSimmilerMovies)
router.get('/:category', getcategreyMovies)

export default router;

import express from 'express';
import { GetSimmilerTVShows, getTrendingTvShows, getTVShowsCategory, getTvShowsDetails, getTVTrailer } from '../controllers/tvShowsControllers.js';

const router = express.Router();

router.get('/trending', getTrendingTvShows)
router.get('/:id/trailers', getTVTrailer)
router.get('/:id/details', getTvShowsDetails)
router.get('/:id/simmiler', GetSimmilerTVShows)
router.get('/:category', getTVShowsCategory)

export default router
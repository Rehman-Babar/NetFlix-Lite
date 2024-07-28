import express from 'express';
import { DeleteSearchHistory, GetSearchHistory, SearchMovies, SearchPerson, SearchTV } from '../controllers/searchControllers.js';

const router = express.Router();

router.get('/person/:query', SearchPerson)
router.get('/movie/:query', SearchMovies)
router.get('/tv/:query', SearchTV)
router.get('/history', GetSearchHistory)
router.delete('/history/:id', DeleteSearchHistory)

export default router
const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movies')

router.get('/',movieController.GetMovies);
router.get('/list',movieController.GetMoviesList);
router.get('/addMovie',movieController.getAddMovie);
router.post('/addMovie',movieController.postAddMovie);
router.get('/edit/:id',movieController.getEditMovie);
router.post('/edit',movieController.postEditMovie);
router.get('/delete/:id',movieController.getdeleteMovie);
router.post('/search',movieController.postSearchMovie);
router.get('/get/:id',movieController.getGetByCatMovie);
router.get('/detail/:id',movieController.getDetailMovie);
//router.get('/getCategory/:id',categoryController.getDeleteCategory);
module.exports = router;

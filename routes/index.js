var express = require("express");
const Joi = require("joi");
const movie = require("../controllers/movie");
//const Movie = require("../models/movie");

var router = express.Router();

var HandlerGenerator = require("../handlegenerator.js");
var middleware = require("../middleware/middleware.js");

HandlerGenerator = new HandlerGenerator();

/* GET home page. */
router.get("/", middleware.checkToken, HandlerGenerator.index);

router.post("/login", HandlerGenerator.login);

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

//Ruta de registro
router.post("/register", HandlerGenerator.register);

//Ruta de todas las peliculas
router.get("/movies", middleware.checkToken, HandlerGenerator.getMovies);

//Ruta de una pelicula
router.get("/movies/:id", middleware.checkToken, HandlerGenerator.getMovie);

//Ruta de crear una pelicula
router.post("/movies", middleware.checkToken, HandlerGenerator.createMovie);

//Ruta de actualizar una pelicula
router.put("/movies/:id", middleware.checkToken, HandlerGenerator.updateMovie);

//Ruta de eliminar una pelicula
router.delete(
  "/movies/:id",
  middleware.checkToken,
  HandlerGenerator.deleteMovie
);

router.get(
  "/users/",
  middleware.checkToken,
  middleware.checkAdminRole,
  HandlerGenerator.getUsers
);

module.exports = router;

let jwt = require("jsonwebtoken");
let config = require("./config");
let users = require("./controllers/users");
let movie = require("./controllers/movie");

// Clase encargada de la creación del token
class HandlerGenerator {
  getUsers(req, res) {
    users.getUsers().then((users) => {
      console.log("Users", users);
      res.send(users);
    });
  }

  deleteMovie(req, res) {
    movie.deleteMovie(req.params.id).then((movie) => {
      console.log("movie", movie);
      if (movie.deletedCount === 0) {
        return res.sendStatus(404).send("La película con el id no existe");
      }
      res.sendStatus(204);
    });
  }
  updateMovie(req, res) {
    movie.updateMovie(req.params.id, req.body).then((movie) => {
      console.log("movie", movie);
      if (movie.matchedCount === 0) {
        return res.sendStatus(404).send("La película con el id no existe");
      }
      res.send(movie);
    });
  }

  createMovie(req, res) {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(404).send(error);
    }

    movie.createMovie(req.body).then((movie) => {
      console.log("Movies", movie);
      res.send(movie);
    });
  }

  getMovies(req, res) {
    movie.getMovies().then((movies) => {
      console.log("Movies", movies);
      res.send(movies);
    });
  }

  getMovie(req, res) {
    movie.getMovie(req.params.id).then((movie) => {
      console.log("Movies", movie);
      if (movie === null) {
        res.status(404).send("La película con el id no existe");
      }
      res.send(movie);
    });
  }

  register(req, res) {
    let user = req.body.username;
    let password = req.body.password;
    let role = req.body.role;
    users.createUser(user, password, role).then((user) => {
      res.json({
        success: true,
        message: "User created",
        user: user,
      });
    });
  }

  async login(req, res) {
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username = req.body.username;
    let password = users.hash(req.body.password);

    // Este usuario y contraseña, en un ambiente real, deben ser traidos de la BD
    const user = await users.getUser(username);

    console.log(user);

    let mockedUsername = user.username;
    let mockedPassword = user.passwordHash;

    // Si se especifico un usuario y contraseña, proceda con la validación
    // de lo contrario, un mensaje de error es retornado
    if (username && password) {
      // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
      // de lo contrario, un mensaje de error es
      if (username === mockedUsername && password === mockedPassword) {
        // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
        let token = jwt.sign({ username: username }, config.secret, {
          expiresIn: "24h",
        });

        users.updateUserToken(username, token);
        // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
        res.json({
          success: true,
          message: "Authentication successful!",
          token: token,
        });
      } else {
        // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
        res.status(403).json({
          success: false,
          message: "Incorrect username or password",
        });
      }
    } else {
      // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
      res.send(400).json({
        success: false,
        message: "Authentication failed! Please check the request",
      });
    }
  }

  index(req, res) {
    // Retorna una respuesta exitosa con previa validación del token
    res.json({
      success: true,
      message: "Index page",
    });
  }
}

module.exports = HandlerGenerator;

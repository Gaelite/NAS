

const express = require('express');
const router = express.Router();
const consultasController = require('./consultasController');

// Ruta para manejar las consultas
router.get('/consultas', consultasController.realizarConsulta);

module.exports = router;

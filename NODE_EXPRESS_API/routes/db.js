import express from 'express';
const router = express.Router();
import { realizarConsulta } from './consultasController';

// Ruta para manejar las consultas
router.get('/consultas', realizarConsulta);

export default router;

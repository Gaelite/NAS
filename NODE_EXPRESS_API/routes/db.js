import express from 'express';
const router = express.Router();
import { realizarConsulta } from '../controllers/consultasController.js'; // Corrected file extension

router.get('/consultas', realizarConsulta);

export default router;

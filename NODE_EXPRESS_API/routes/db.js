import express from 'express';
const router = express.Router();
import { realizarConsulta } from '../controllers/consultasController.js'; 

router.get('/consultas', realizarConsulta);

export default router;

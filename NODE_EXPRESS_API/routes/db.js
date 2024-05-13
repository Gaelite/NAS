import express from 'express';
const router = express.Router();
import { realizarConsulta,solicitarMemoria,solicitarCPU } from '../controllers/consultasController.js'; 

router.get('/consultas', realizarConsulta);
router.post('/Memoria', solicitarMemoria);
router.post('/CPU',solicitarCPU);

export default router;

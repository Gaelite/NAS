import express from 'express';

import { getTopology, test }from '../controllers/conf.js';

const router = express.Router(); 

// all routes in here are starting with /users
router.get('/', test );

export default router;

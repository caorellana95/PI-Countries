const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const countryR = require('./countries')
const activityR = require('./activities')



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countryR)
router.use('/activities', activityR)





module.exports = router;
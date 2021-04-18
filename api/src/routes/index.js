const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRouter = require('./recipe.js');
const dietRouter = require('./diet.js');
const userRouter = require('./user.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipe', recipeRouter);
router.use('/types', dietRouter);
router.use('/user', userRouter);

module.exports = router;

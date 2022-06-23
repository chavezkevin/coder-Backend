const { Router } = require('express');
const router = Router();
const productos = require('./productos');
const {routerController} = require('../controllers/routeController')

router.get('/', routerController)
router.use('/productos', productos);



module.exports = router;
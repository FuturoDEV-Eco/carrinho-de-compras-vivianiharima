const {Router} = require ('express');
const ProductsController = require('../controllers/ProductsController');

const productsRouter = new Router();

productsRouter.post('/', ProductsController.cadastrar);


module.exports = productsRouter;

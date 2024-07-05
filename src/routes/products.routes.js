const {Router} = require ('express');
const ProductController = require('../controllers/ProductController');

const productsRouter = new Router();

productsRouter.post('/', ProductController.cadastrar);
productsRouter.get('/:id', ProductController.listarProduto)


module.exports = productsRouter;

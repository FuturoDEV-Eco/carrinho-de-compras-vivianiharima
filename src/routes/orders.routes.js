const {Router} = require('express');
const OrderController = require('../controllers/OrderController');

const ordersRoute = new Router();

ordersRoute.post('/', OrderController.cadastrar)

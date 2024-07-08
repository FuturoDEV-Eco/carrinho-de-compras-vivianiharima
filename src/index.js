const express = require('express')

const clientsRoutes = require('./routes/clients.routes');
const productsRouter = require('./routes/products.routes');
const ordersRoutes = require('./routes/orders.routes');


const app = express();

app.use(express.json());
app.use('/clients', clientsRoutes);
app.use('/products', productsRouter);
app.use('/orders', ordersRoutes)


app.listen(3001, () => {
    console.log("Servidor online :)")
});
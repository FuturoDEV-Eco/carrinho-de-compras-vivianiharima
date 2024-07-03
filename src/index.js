const express = require('express')

const clientsRoutes = require('./routes/clients.routes');
const productsRouter = require('./routes/products.routes');


const app = express();

app.use(express.json());
app.use('/clients', clientsRoutes);
app.use('/produts', productsRouter);


app.listen(3001, () => {
    console.log("Servidor online :)")
})
const express = require('express');
const app = express();

const routerCart = require('./routes/cart/index.js')
const routerProds = require('./routes/products/index.js')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/cart/index.js', routerCart)
app.use('/api/productos/index.js', routerProds)

const port = 8080;

const server = app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});
server.on('error', error => {
  console.log('Error en servidor', error);
});
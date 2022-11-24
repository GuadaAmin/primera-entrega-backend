const {Router} = require('express');
const routerCart = new Router;
const cartController = require('../../controllers/Cart.js')

routerCart.get('/', (req, res) => {
    res.send('Esta es la API')
})

module.exports = routerCart;
const {Router} = require('express');
const routerProds = new Router;
const productController = require('../../controllers/Products');


routerProds.get('/', async (req, res) => {
    const getProductos = await productController.getAll();
    res.send(getProductos);
})

routerProds.get("/:id", async (req, res) => {
    const productosById = await productController.getById(req.params.id);
    res.send(productosById);
})

routerProds.post('/', async (req, res) => {
    const { body } = req;
    await productController.save({ body });
    const getProductos = await productController.getAll();
    res.send(getProductos);
})

routerProds.put("/:id", async (req, res) => {
    const productosById = await productController.update(req.params.id, req.body);
    res.send(productosById);
})

routerProds.delete("/:id", async (req, res) => {
    await productController.deleteById(req.params.id);
    res.send('El producto fue eliminado');
})


module.exports = routerProds;

productController.save({name: 'nombre', price:200, description:'descripcion', code: 01, url: 'url', stock: 20})
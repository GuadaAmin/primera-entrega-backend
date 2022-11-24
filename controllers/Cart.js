const fs = require ('fs')

class Cart {
    constructor() {
        this.path = '/carts.json';
        this.cart = [];
    }

    async newCart () {
        const carts = JSON.parse(await fs.readFile('/carts.json', "utf-8"));

        let newId;
        if(carts.length === 0) {
            newId = 1;
        } else {
            newId = carts[carts.length - 1].id + 1;
        }

        const newObj = {
            timestamp: new Date.now(),
            id: newId,
        }
        carts.push(newObj)
        console.log(carts)

        try {
            await fs.writeFile(`/carts.json`, JSON.stringify(carts, null, 2));
            return newObj;
        } catch (error) {
            throw new Error('Ocurrió un error al crear el carrito')
        } 
    }

    async deleteCartById(id) {
        const carts = JSON.parse(await fs.readFile('/carts.json', "utf-8"));
        const index = carts.findIndex(o => o.id == id)
        if (index == -1) {
          throw new Error(`Error al borrar: no se encontró el carrito con id ${id}`)
        }
    
        carts.splice(index, 1)
        try {
          await fs.writeFile('/carts.json', JSON.stringify(carts, null, 2))
        } catch (error) {
          throw new Error(`Error al borrar: ${error}`)
        }
    }

    async getProductsInCart (id) {
        const carts = JSON.parse(await fs.readFile('/carts.json', "utf-8"));
        const index = carts.findIndex(o => o.id == id)
        if (index == -1) {
          throw new Error(`Error al borrar: no se encontró el carrito con id ${id}`)
        }

        const productsInCart = carts[index].products;
        return productsInCart;
    }

    async addToCart(id) {
        const products = JSON.parse(await fs.readFile('./productos.json','utf-8'));
        const index = products.findIndex(o => o.id == id)
        const productsInCart = await this.getProductsInCart;
        productsInCart.push = products[index];
    }




    async addToCart (req, res) {
        try {
            if (fs.existsSync('./carts.json')) {
                const data = await fs.readFile('./cart.json', 'utf-8', async(error, cont) => {
                    const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));
                    const cart = JSON.parse(fs.readFileSync('./cart.json', 'utf-8'));
                    const selectedProduct = products.filter(o => o.id === req.body.id);
                    const productIndex = products.findIndex(o => o.id === req.body.id);
                    delete selectedProduct.stock;
                    selectedProduct.quantity = req.body.quantity;
                    products[productIndex].stock -= req.body.quantity;
                    cart.push(selectedProduct);
                    const writeProds = await fs.writeFileSync('/products.json', JSON.stringify(products, null, 2 ));  
                    const writeCart = await fs.writeFileSync('/cart.json', JSON.stringify(cart, null, 2));    
                    res.status(201).send('El producto fue agregado al carrito exitosamente');
                })
            }
        } catch (error) {
            throw new Error('Ocurrió un error al guardar el producto', error);
        }
    }
}

const cartController = new Cart();
module.exports = cartController;
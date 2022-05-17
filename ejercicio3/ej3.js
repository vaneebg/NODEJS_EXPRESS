const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const products = {
    description: 'Productos',
    items: [
        { id: 1, nombre: 'Taza de Harry Potter', precio: 300 },
        { id: 2, nombre: 'FIFA 22 PS5', precio: 1000 },
        { id: 3, nombre: 'Figura Goku Super Saiyan', precio: 100 },
        { id: 4, nombre: 'Zelda Breath of the Wild', precio: 200 },
        { id: 5, nombre: 'Skin Valorant', precio: 120 },
        { id: 6, nombre: 'Taza de Star Wars', precio: 220 }
    ]
}
const { items } = products
// const { items } = products PARA LA PROXIMA, PRUEBO DESESTRUCTURING (tengo que cambiar abajo products.items por items solo)
// Al llamar a localhost:3000/products se debe mostrar el siguiente JSON:
// {
//   description: 'Productos',
//   items: [
//     { id: 1, nombre: 'Taza de Harry Potter' , precio: 300},
//     { id: 2, nombre: 'FIFA 22 PS5' , precio: 1000},
//     {  id: 3, nombre: 'Figura Goku Super Saiyan' , precio: 100},
//     {  id: 4,  nombre: 'Zelda Breath of the Wild' , precio: 200},
//     {  id: 5,  nombre: 'Skin Valorant' , precio: 120},
//     {  id: 6, nombre: 'Taza de Star Wars' , precio: 220}
//   ]
// }
app.get("/products", (req, res) => {

    res.send(products.items);
});

// Crear endpoint para poder crear un producto nuevo

app.post("/products", (req, res) => {
    const newProduct = {
        id: items.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio,
    };
    if (!req.body.nombre || !req.body.precio) {
        res.status(400).send("Por favor rellena todos los campos");
    } else {
        products.items.push(newProduct);
        const response = { newProduct, products }
        res.status(201).send(response);
    }
});
// Crear endpoint para poder actualizar un producto
app.put('/products/:id', (req, res) => {
        const found = items.some(item => item.id === +req.params.id) // devuelve true o false
        if (found) {
            items.forEach(item => {
                if (+req.params.id === item.id) {
                    item.nombre = req.body.nombre ? req.body.nombre : item.nombre
                    item.precio = req.body.precio ? req.body.precio : item.precio
                    res.send(item)
                }
            })
        } else {
            res.status(404).send(`Member with id ${req.params.id} no tá`)
        }
    })
    // Crear endpoint para poder eliminar un producto
app.delete('/products/:id', (req, res) => {
        const found = items.some(item => item.id === +req.params.id)

        if (found) {
            const productsFiltered = items.filter(item => item.id !== +req.params.id)
            res.send({ msg: `Producto con id ${req.params.id} voló`, productsFiltered })
        } else {
            res.status(404).send(`Producto con id ${req.params.id} no tá`)
        }
    })
    // Crear filtro por precio de producto
app.get("/products/por_precio/:precio", (req, res) => {

    const found = items.some((item) => item.precio === +req.params.precio);

    if (found) {
        res.send(items.filter((item) => item.precio === +req.params.precio));
    } else {
        res.status(404).send(`Producto con este precio ${req.params.precio} not found`);
    }
});
// Crear filtro que muestre los productos con un precio entre 50 y 250.
// Crear un filtro que cuando busque en postman por parámetro el id de un producto me devuelva ese producto
app.get("/products/:id", (req, res) => {

    const found = items.some((item) => item.id === +req.params.id);

    if (found) {
        res.send(items.filter((item) => item.id === +req.params.id));
    } else {
        res.status(404).send(`Producto con id ${req.params.id} not found`);
    }
});
// Crear un filtro que cuando busque en postman por parámetro el nombre de un producto me devuelva ese producto
app.get("/products/por_nombre/:nombre", (req, res) => {

    console.log(typeof req.params.nombre);
    const found = items.some((item) => item.nombre === req.params.nombre);

    if (found) {
        res.send(items.filter((item) => item.nombre === req.params.nombre));
    } else {
        res.status(404).send(`Producto con nombre ${req.params.nombre} not found`);
    }
});





app.listen(port, () => {
    console.log(`Servidor levantado en ${port}`);
});
import express from "express"
import createHttpError from "http-errors"
import Product from "../model/Product.js"

const ProductRouter = express.Router()

ProductRouter.get('/', async (req, res, next) => {
    try {
        const products = await Product.find({})
        if (!products) throw createHttpError.NotFound()
        res.send(products)
    } catch (error) {
        next(error)
    }
})

ProductRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) throw createHttpError.NotFound();
        res.send(product);
        return product;
    } catch (error) {
        next(error);
    }
});

ProductRouter.get('/type/:type', async (req, res, next) => {
    try {
        const { type } = req.params;
        const products = await Product.find({ type: type });
        if (!products || products.length === 0) throw createHttpError.NotFound();
        res.send(products);
        return products;
    } catch (error) {
        next(error);
    }
});

ProductRouter.post('/create', async (req, res, next) => {
    try {
        const { name } = req.body
        if (!name) throw createHttpError.BadRequest()

        const existProduct = await Product.findOne({ name: name })
        if (existProduct) throw createHttpError.Conflict(`${title} already existing.`)
        const savedProduct = await Product.create({ name })
        res.send(savedProduct)
    } catch (error) {
        next(error)
    }
})

export default ProductRouter
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
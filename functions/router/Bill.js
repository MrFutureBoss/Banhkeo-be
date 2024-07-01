import express from "express"
import createHttpError from "http-errors"
import Bill from "../model/Bill.js"

const BillRouter = express.Router()

BillRouter.get('/', async (req, res, next) => {
    try {
        const bills = await Bill.find({})
        if (!bills) throw createHttpError.NotFound()
        res.send(bills)
    } catch (error) {
        next(error)
    }
})

BillRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Bill.findById(id);
        if (!product) throw createHttpError.NotFound();
        res.send(product);
        return product;
    } catch (error) {
        next(error);
    }
});

BillRouter.get('/type/:type', async (req, res, next) => {
    try {
        const { type } = req.params;
        const bills = await Product.find({ type: type });
        if (!bills || bills.length === 0) throw createHttpError.NotFound();
        res.send(bills);
        return bills;
    } catch (error) {
        next(error);
    }
});

BillRouter.post('/create', async (req, res, next) => {
    try {
        const { name, email, phone, location, total, description } = req.body;

        // Kiểm tra name có tồn tại hay không
        if (!name) {
            throw createHttpError.BadRequest('Name is required');
        }

        // Kiểm tra xem Bill đã tồn tại hay chưa
        const existBill = await Bill.findOne({ name });
        if (existBill) {
            throw createHttpError.Conflict(`${name} already exists.`);
        }

        // Tạo một instance mới của Bill
        const newBill = new Bill({
            name,
            email,
            phone,
            location,
            total,
            description
        });

        // Lưu Bill vào MongoDB
        const savedBill = await newBill.save();

        res.status(201).json(savedBill); // Trả về Bill đã lưu thành công
    } catch (error) {
        next(error); // Chuyển lỗi tới middleware error handling
    }
});

export default BillRouter
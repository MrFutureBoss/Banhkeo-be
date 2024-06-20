import express from "express"
import createHttpError from "http-errors"
import User from "../model/User.js"

const UserRouter = express.Router()

UserRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.find({})
        if (!users) throw createHttpError.NotFound()
        res.send(users)
    } catch (error) {
        next(error)
    }
})

// UserRouter.post('/create', async (req, res, next) => {
//     try {
//         const { name } = req.body
//         if (!name) throw createHttpError.BadRequest()

//         const existUser = await User.findOne({ name: name })
//         if (existUser) throw createHttpError.Conflict(`${title} already existing.`)
//         const savedUser = await User.create({ name })
//         res.send(savedUser)
//     } catch (error) {
//         next(error)
//     }
// })


// Get by _id
UserRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) throw createHttpError.NotFound();
        res.send(user);
        return user;
    } catch (error) {
        next(error);
    }
});

export default UserRouter
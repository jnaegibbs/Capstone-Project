const orderRouter = require("express").Router();

const prisma = require("../db/client");
const { requireUser } = require('./utils');



// GET /api/pets/order
orderRouter.get("/", requireUser, async (req, res, next) => {
    try {
        const orders = await prisma.order.findMany();

        res.send({ orders });
    } catch (error) {
        next(error);
    }
});

// GET /api/pets/order/:orderId
orderRouter.get("/:orderId", requireUser, async (req, res, next) => {
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: Number(req.params.orderId)
            }
        });

        res.send({ order });
    } catch (error) {
        next(error);
    }
});


// POST /api/pets/order
orderRouter.post("/", requireUser, async (req, res, next) => {
    try {
        const { orderId, quantity } = req.body;
        const userId = req.user.id;

        const newOrder = await prisma.order.create({
            data: {
                orderId,
                userId,
                quantity,
            },
        });

        res.status(201).json({ newOrder });

    } catch (error) {
        next(error)
    }
})

// PATCH /api/pets/order/:orderId
orderRouter.patch("/:orderId", requireUser, async (req, res, next) => {
    try {
        const updateOrder = await prisma.order.update({
            where: {
                id: Number(req.params.orderId)
            },
            data: {
                quantity: req.body.quantity
            }
        })
        res.status(200).send({ updateOrder });
    } catch (error) {
        next(error)
    }
})


// DELETE /api/pets/order/:orderId
orderRouter.delete("/:orderId", requireUser, async (req, res, next) => {
    try {
        const deleteOrder = await prisma.order.delete({
            where: {
                id: Number(req.params.orderId)
            },
        })
        res.status(204).send({deleteOrder})
    } catch (error) {
        next (error)
    }
})



module.exports = orderRouter;
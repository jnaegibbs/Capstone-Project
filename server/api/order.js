const orderRouter = require("express").Router();

const prisma = require("../db/client");
//const  {requireUser} = require('./utils');

// GET /api/pets/order
orderRouter.get("/", async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany();
    res.send({ orders });
  } catch (error) {
    next(error);
  }
});

// GET /api/pets/order/user/:userid
orderRouter.get("/user/:userId", async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: Number(req.params.userId),
      }
    });
    res.send({orders} );
  } catch (error) {
    next(error);
  }
});

// GET /api/pets/order/:orderId
orderRouter.get("/:orderId", async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: Number(req.params.orderId),
      },
    });

    res.send({ order });
  } catch (error) {
    next(error);
  }
});

// POST /api/pets/order
orderRouter.post("/", async (req, res, next) => {
  try {
    const { productId, quantity, userId } = req.body;

    const newOrder = await prisma.order.create({
      data: {
        product: { connect: { id: productId } },
        user: { connect: { id: userId } },
        quantity: Number(quantity),
      },
    });
    console.log(newOrder);
    res.status(201).send({ newOrder });
  } catch (error) {
    next(error);
  }
});

// PUT /api/pets/order/:orderId
orderRouter.put("/:orderId", async (req, res, next) => {
  try {
    const { productId, quantity, userId } = req.body;
    const updateOrder = await prisma.order.update({
      where: {
        id: Number(req.params.orderId),
      },
      data: {
        product: { connect: { id: productId } },
        user: { connect: { id: userId } },
        quantity: Number(quantity),
      },
    });
    res.status(200).send({ updateOrder });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/pets/order/:orderId
orderRouter.delete("/:orderId", async (req, res, next) => {
  try {
    const deleteOrder = await prisma.order.delete({
      where: {
        id: Number(req.params.orderId),
      },
    });
    console.log(deleteOrder);
    res.status(200).send(deleteOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = orderRouter;

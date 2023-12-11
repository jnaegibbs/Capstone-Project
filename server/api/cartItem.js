const cartItemRouter = require("express").Router();

const prisma = require("../db/client");
//const  {requireUser} = require('./utils');

// GET /api/pets/cartItem
cartItemRouter.get("/", async (req, res, next) => {
  try {
    const cartItems = await prisma.cartItem.findMany();
    res.send({ cartItems });
  } catch (error) {
    next(error);
  }
});

// GET /api/pets/cartItem/:cartItemId
cartItemRouter.get("/:cartItemId", async (req, res, next) => {
  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: Number(req.params.cartItemId),
      },
    });

    res.send({ cartItem });
  } catch (error) {
    next(error);
  }
});

// POST /api/pets/cartItem
cartItemRouter.post("/", async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const productId = parseInt(req.body.productId, 10);
    const cartId = parseInt(req.body.cartId, 10);
    if (isNaN(cartId)) {
      console.error("Invalid cartId provided");
      // Handle the error or return an appropriate response
      return res.status(400).json({ error: "Invalid cartId provided" });
    }

    const newCartItem = await prisma.cartItem.create({
      data: {
        product: { connect: { id: productId } },
        cart: { connect: { id: Number(cartId) } },
        quantity: Number(quantity),
      },
    });

    res.status(201).json({ newCartItem });
  } catch (error) {
    next(error);
  }
});

// PUT /api/pets/cartItem/:cartItemId
cartItemRouter.put("/:cartItemId", async (req, res, next) => {
  try {
    const { productId, quantity, cartId } = req.body;
    const updateCartItem = await prisma.cartItem.update({
      where: {
        id: Number(req.params.cartItemId),
      },
      data: {
        product: { connect: { id: productId } },
        cart: { connect: { id: cartId } },
        quantity: Number(quantity),
      },
    });
    res.status(200).send({ updateCartItem });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/pets/cartItem/:cartItemId
cartItemRouter.patch("/:cartItemId", async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const updateCartItem = await prisma.cartItem.update({
      where: {
        id: Number(req.params.cartItemId),
      },
      data: {
        quantity: Number(quantity),
      },
    });

    res.status(200).send({ updateCartItem });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/pets/cartItem/:cartItemId
cartItemRouter.delete("/:cartItemId", async (req, res, next) => {
  try {
    const deleteItem = await prisma.cartItem.delete({
      where: {
        id: Number(req.params.cartItemId),
      },
    });

    res.status(200).send(deleteItem);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/pets/cartItem/cart/:cartId
cartItemRouter.delete("/cart/:cartId", async (req, res, next) => {
  try {
    const deletecartItem = await prisma.cartItem.deleteMany({
      where: {
        cartId: Number(req.params.cartId),
      },
    });
    res.send({ deletecartItem });
  } catch (error) {
    next(error);
  }
});

//GET /api/pets/cartItem/cart/:cartId
cartItemRouter.get("/cart/:cartId", async (req, res, next) => {
  try {
    const getCartItems = await prisma.cartItem.findMany({
      where: {
        cartId: Number(req.params.cartId),
      },
      include: {
        product: true,
      },
    });
    res.send(getCartItems);
  } catch (error) {
    next(error);
  }
});

module.exports = cartItemRouter;

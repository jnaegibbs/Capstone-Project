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
               id: Number(req.params.cartItemId)
           }
       });


       res.send({ cartItem });
   } catch (error) {
       next(error);
   }
});




// POST /api/pets/cartItem
cartItemRouter.post("/", async (req, res, next) => {
   try {
       const { productId, quantity, cartId } = req.body;
       const newCartItem = await prisma.cartItem.create({
           data: {
            
               product: {connect: {id: Number(productId)}},
               cart: {connect: {id: Number(cartId)}},
               quantity: Number(quantity),
           },
       });


       res.status(201).json({ newCartItem });


   } catch (error) {
       next(error)
   }
})


// PUT /api/pets/cartItem/:cartItemId
cartItemRouter.put("/:cartItemId", async (req, res, next) => {
   try {
       const { productId, quantity, cartId } = req.body;
       const updateCartItem = await prisma.cartItem.update({
           where: {
               id: Number(req.params.cartItemId)
           },
           data: {
               product: {connect: {id: productId}},
               cart: {connect: {id: cartId}},
               quantity: Number(quantity),
           }
       })
       res.status(200).send({ updateCartItem });
   } catch (error) {
       next(error)
   }
})




// DELETE /api/pets/cartItem/:cartItemId
cartItemRouter.delete("/:cartItemId", async (req, res, next) => {
   try {
       const deleteItem = await prisma.cartItem.delete({
           where: {
               id: Number(req.params.cartItemId)
           },
       })
       console.log(deleteItem)
       res.status(200).send(deleteItem)
   } catch (error) {
       next (error)
   }
})




module.exports = cartItemRouter;
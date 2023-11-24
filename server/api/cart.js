const cartRouter = require("express").Router();


const prisma = require("../db/client");
// const  {requireUser} = require('./utils');


// GET /api/pets/cart
cartRouter.get("/", async (req, res, next) => {
   try {
       const cart = await prisma.cart.findMany();
       res.json({ cart });
   } catch (error) {
       next(error);
   }
});


// GET /api/pets/cart/user
// cartRouter.get("/user", requireUser, async (req, res, next) => {
//     try {


//         const userId = req.user.id;


//         const userCart = await prisma.cart.findMany({
//             where: {
//                 userId: userId,
//             },
//             include: {
//                 cartItem: true,
//             },
//         });


//         res.json({ userCart });
//     } catch (error) {
//         next(error);
//     }
// });


// GET /api/pets/cart/:cartId
cartRouter.get("/:cartId", async (req, res, next) => {
   try {
       const cart = await prisma.cart.findUnique({
           where: {
               id: Number(req.params.cartId)
           }
       });


       res.send({ cart });
   } catch (error) {
       next(error);
   }
});


// POST /api/pets/cart
cartRouter.post("/", async (req, res, next) => {
   try {
       const {userId } = req.body;
     
       const newCart = await prisma.cart.create({
           data: {
               user: {connect: {id: userId}},
           },
       });
     
       res.status(201).send({ newCart });


   } catch (error) {
       next(error)
   }
})




// PUT /api/pets/cart/:cartId
cartRouter.put("/:cartId", async (req, res, next) => {
   try {
       const {userId } = req.body;


       const updateCart = await prisma.cart.update({
           where: {
               id: Number(req.params.cartId)
           },
           data: {
               user: {connect: {id: userId}},
           }
       })
       res.status(200).send({ updateCart });
   } catch (error) {
       next(error)
   }
})




// DELETE /api/pets/cart/:cartId
cartRouter.delete("/:cartId", async (req, res, next) => {
   try {
       const deleteCart = await prisma.cart.delete({
           where: {
               id: Number(req.params.cartId)
           },
       })
       console.log(deleteCart)
       res.status(200).send(deleteCart)
   } catch (error) {
       next (error)
   }
})






module.exports = cartRouter;
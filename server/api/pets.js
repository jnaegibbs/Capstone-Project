const router = require("express").Router();

const prisma = require('../db/client');


router.get("/", async (req, res, next) => {
    try {
      const pets = prisma.category.findMany();
      res.send({pets});
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const pet = await prisma.category.create({
        data:{
          products: req.body.product,
          petsName:req.body.petsName
        }
      });
      console.log(pet);
      res.status(201).send({pet});
    } catch (error) {
      next(error);
    }
  });

 
  module.exports = router;
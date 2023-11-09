const productRouter = require("express").Router();

const prisma = require("../db/client");

// GET /api/pets/product
productRouter.get("/", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany();

    res.send({ products});
  } catch ({name,message}) {
    next({name,message});
  }
});

 // GET /api/pets/product/:productId
 productRouter.get("/:productId", async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where:{
        id:Number(req.params.productId)
      }
    });

    res.send({ product });
  } catch ({name,message}) {
    next({name,message});
  }});

// POST /api/pets/product
productRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        categoryName:req.body.categoryName,
        petCategory: req.body.petCategory,
       },
    });

    res.status(201).send({ newProduct});
  } catch ({name,message}) {
    next({name,message});
  }
});

// PUT /api/pets/product/:productId
productRouter.put("/:productId", async (req, res, next) => {
  try {
    const updateProduct = await prisma.product.update({
      where:{
         id:Number(req.params.productId)
      },
      data: {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        categoryName:req.body.categoryName,
        petCategory: req.body.petCategory,
       },
    });

    res.status(200).send({ updateProduct});
  } catch ({name,message}) {
    next({name,message});
  }
});

// DELETE /api/pets/product/:productId
productRouter.delete("/:productId", async (req, res, next) => {
  try {
    const deleteProduct = await prisma.product.delete({
      where:{
         id:Number(req.params.productId)
      }
      
    });

    res.status(204).send({ deleteProduct});
  } catch ({name,message}) {
    next({name,message});
  }
});

module.exports = productRouter;

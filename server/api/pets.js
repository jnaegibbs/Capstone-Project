const router = require("express").Router();

const prisma = require("../db/client");

// GET /api/pets
router.get("/", async (req, res, next) => {
  try {
    const pets = await prisma.category.findMany();

    res.send({ pets });
  } catch ({name,message}) {
    next({name,message});
  }
});

// POST /api/pets
router.post("/", async (req, res, next) => {
  try {
    const newCategory = await prisma.category.create({
      data: {
        productType: req.body.productType,
        products: {
          create: {
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            description: req.body.description,
            productCount: req.body.productCount,
            petCategory: req.body.petCategory,
          },
        },
        petCategory: req.body.petCategory,
       
      },
    });

    res.status(201).send({ newCategory});
  } catch ({name,message}) {
    next({name,message});
  }
});

module.exports = router;

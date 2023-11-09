const categoryRouter = require("express").Router();

const prisma = require("../db/client");

const reqUser = require('../utils');


// GET /api/pets/category
categoryRouter.get("/", async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany();

    res.send({ categories });
  } catch ({name,message}) {
    next({name,message});
  }
});

// GET /api/pets/category/:categoryId
categoryRouter.get("/:categoryId", async (req, res, next) => {
  try {
    const category = await prisma.category.findUnique({
      where:{
        id:Number(req.params.categoryId)
      }
    });

    res.send({ category });
  } catch ({name,message}) {
    next({name,message});
  }
});

// POST /api/pets/category
categoryRouter.post("/", async (req, res, next) => {
  try {
    const newCategory = await prisma.category.create({
      data: {
        categoryName:req.body.categoryName,
        petCategory: req.body.petCategory
       
      },
    });

    res.status(201).send({ newCategory});
  } catch ({name,message}) {
    next({name,message});
  }
});

//PUT /api/pets/category/:categoryId
categoryRouter.put("/:categoryId",async(req,res,next)=>{

  try{
    const updatedCategory = await prisma.category.update({
      where:{
       id: Number(req.params.categoryId)
       
      } ,
      data:{
            categoryName:req.body.categoryName,
            petCategory: req.body.petCategory,
           }

      })
  

   res.status(200).send({updatedCategory});
  } catch ({name,message}) {
    next({name,message});
  }
})

//DELETE /api/pets/category/:categoryId
categoryRouter.delete("/:categoryId",async (req,res,next)=>{
  try{
    const deleteCategory = await prisma.category.delete({
      where :{
       id: Number(req.params.categoryId)
      },
      
    })
   res.status(200).send({deleteCategory});
  }catch ({name,message}) {
    next({name,message});
  }
})

module.exports = categoryRouter;

const categoryRouter = require("express").Router();

const prisma = require("../db/client");


// GET /api/pets/category
categoryRouter.get("/", async (req, res, next) => {
  try {
    const pets = await prisma.category.findMany();

    res.send({ pets });
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
    console.log("categoryId===="+req.params.categoryId)
  try{
    const updateCategory = await prisma.category.update({
      where:{
       id: Number(req.params.categoryId)
       
      } ,
      data:{
            categoryName:req.body.categoryName,
            petCategory: req.body.petCategory,
           }

      })
  

   res.sendStatus(200).send(updateCategory);
  } catch ({name,message}) {
    next({name,message});
  }
})

//DELETE /api/pets/category/:categoryId
categoryRouter.delete("/:categoryId",async (req,res,next)=>{
  try{
    const deleteCategory = await prisma.category.deleteMany({
      where :{
       id: Number(req.params.categoryId)
      },
      
    })
   res.sendStatus(200).send({message:"deleted successfully"}, deleteCategory);
  }catch ({name,message}) {
    next({name,message});
  }
})

module.exports = categoryRouter;

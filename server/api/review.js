const reviewRouter = require("express").Router();

const prisma = require("../db/client");

// GET /api/pets/review
reviewRouter.get("/", async (req, res, next) => {
    try {
      const reviews = await prisma.review.findMany();
  
      res.send({ reviews});
    } catch ({name,message}) {
      next({name,message});
    }
  });

  // GET /api/pets/review/:reviewId
 reviewRouter.get("/:reviewId", async (req, res, next) => {
    try {
      const review = await prisma.review.findUnique({
        where:{
          id:Number(req.params.reviewId)
        }
      });
  
      res.send({review });
    } catch ({name,message}) {
      next({name,message});
    }});

//POST /api/pets/review  
reviewRouter.post("/",async (req,res,next)=>{
    
    try{
        const newReview = await prisma.review.create({
            data:{
                content : req.body.content,
                rating:Number(req.body.rating),
                user:{connect:{id:Number(req.body.userId)}},
                product: {connect: {id:Number(req.body.productId)}},

                },
                
        })
        res.status(201).send({newReview})
    }catch({name,message}){
        next({name, message})
    }
})

//PUT /api/pets/review/:reviewId  
reviewRouter.put("/:reviewId",async (req,res,next)=>{
    
    try{
        const updateReview = await prisma.review.update({
            where:{
                id:Number(req.params.reviewId)
            },
            data:{
                content : req.body.content,
                rating:Number(req.body.rating),
                user:{connect:{id:Number(req.body.userId)}},
                product: {connect: {id:Number(req.body.productId)}},

                },
                
        })
        res.status(201).send({updateReview})
    }catch({name,message}){
        next({name, message})
    }
})

// DELETE /api/pets/review/:reviewId
reviewRouter.delete("/:reviewId", async (req, res, next) => {
    try {
      const deleteReview = await prisma.review.delete({
        where:{
           id:Number(req.params.reviewId)
        }
        
      });
  
      res.status(200).send({ deleteReview});
    } catch ({name,message}) {
      next({name,message});
    }
  });

module.exports = reviewRouter;
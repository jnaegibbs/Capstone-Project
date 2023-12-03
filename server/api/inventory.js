const inventoryRouter = require("express").Router();
const { requireAdmin } = require("./utils");

const prisma = require("../db/client");

//GET /api/pets/inventory
inventoryRouter.get("/", async (req, res, next) => {
    try{
        const inventories = await prisma.inventory.findMany({
            include: {
                product: {
                    select: {
                        name: true,
                        image: true,
                        price: true,
                        categoryName: true,
                        petCategory: true,
                    }
                }
            }
        })
        res.send({inventories})
    }catch({name,message}){
        next({name,message})
    }
})

//GET /api/pets/inventory/:inventoryId
inventoryRouter.get("/:inventoryId", async (req, res, next) => {
    try{
        const inventory = await prisma.inventory.findUnique({
            where: {
                id:Number(req.params.inventoryId)
            }
        });

        res.send({inventory})

    }catch({name, message}){
        next({name, message})
    }
})


//POST /api/pets/inventory
inventoryRouter.post("/", requireAdmin, async (req, res, next) => {
    try{
        const { productId, quantity } = req.body; 
        const newInventory = await prisma.inventory.create({
            data: {
                    product: {connect: {id: productId}},
                    quantity
                    },
        });
        res.status(201).send({newInventory})
    }catch({name,message}){
        next({name, message})
    }
})

//PUT /api/pets/inventory/:inventoryId
inventoryRouter.put("/:inventoryId", requireAdmin, async (req, res, next) => {
    try{
        const updateInventory = await prisma.inventory.update({
            where:{
                id: Number(req.params.inventoryId)
            },
            data: {
                product:{
                    connect: { id:(req.body.productId) },
                },
                quantity:(req.body.quantity)
            },
           
        });

        res.status(200).send({updateInventory})
    }catch({name,message}){
        next({name,message})
    }
});

//DELETE /api/pets/inventory/:inventoryId
inventoryRouter.delete("/:inventoryId", requireAdmin, async (req, res, next) => {
    try{
        const deleteInventory = await prisma.inventory.delete({
            where: {
                id:Number(req.params.inventoryId)
            }
        });
        
        res.status(200).send('Inventory deleted successfully');    
        console.log("DELETED SUCCESSFULLY")

    }catch({name, message}){
        next({name, message})
    }
})

module.exports = inventoryRouter;

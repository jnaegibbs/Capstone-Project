const inventoryRouter = require("express").Router();

const prisma = require("../db/client");

//Todo : write api here

//GET /api/pets/inventory
inventoryRouter.get("/", async (req, res, next) => {
    try{
        const inventories = await prisma.inventory.findMany()
        res.send(inventories)

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
inventoryRouter.post("/", async (req, res, next) => {
    try{
        const newInventory = await prisma.inventory.create({
            data: {
                    product: req.body.product,
                    productId: req.body.productId,
                    quantity: req.body.quantity,
                    },
        });
        res.status(201).send({newInventory})
    }catch({name,message}){
        next({name, message})
    }
})

//PUT /api/pets/inventory/:inventoryId
inventoryRouter.put("/:inventoryId", async (req, res, next) => {
    try{
        const updateInventory = await prisma.inventory.update({
            where:{
                id: Number(req.params.inventoryId)
            },
            data: {
                product: req.body.name,
                quantity: req.body.quantity
            }
        });

        res.status(201).send({updateInventory})
    }catch({name,message}){
        next({name,message})
    }
});

//DELETE /api/pets/inventory/:inventoryId
inventoryRouter.delete("/:inventoryId", async (req, res, next) => {
    try{
        const deleteInventory = await prisma.inventory.delete({
            where: {
                id:Number(req.params.inventoryId)
            }
        });

        res.status(201).send({deleteInventory});

    }catch({name, message}){
        next({name, message})
    }
})

module.exports = inventoryRouter;

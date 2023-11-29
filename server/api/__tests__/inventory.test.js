const app = require("../../app");
const request = require("supertest");
const prismaMock = require("../../../mocks/prismaMock");
const jwt = require("jsonwebtoken");
const prisma = require("../../db/client");

jest.mock("jsonwebtoken");

describe("/api/pets/inventory", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

//Mock admin user + token
const adminUser = {
    id: 1,
    username: "adminUser",
    password: "securePassword",
    name: "adminUser",
    isAdmin: true, 
};

const mockToken = 'faketesttoken'

//token verification and user ID
beforeEach(() => {
    jwt.verify.mockReturnValue({id: adminUser.id});
});


describe("GET /api/pets/inventory", () => {
    it("returns a list of the inventory", async () => {
        
        const inventories = [
        {id: 1, productId: 37, quantity: 10},
        {id: 2, productId: 38, quantity: 10}
    ];


    prismaMock.inventory.findMany.mockResolvedValue(inventories);

    const response = await request(app).get("/api/pets/inventory");

    expect(response.status).toBe(200);
    expect(response.body.inventories[0]).toEqual(inventories[0]);
    expect(response.body.inventories[1]).toEqual(inventories[1]);
    });
});    

describe("GET /api/pets/inventory/:inventoryId", () => {
    it("returns one product based on the inventory Id", async () => {
        const inventory = {id: 2, productId: 38, quantity: 10};

        prismaMock.inventory.findUnique.mockResolvedValue(inventory);

        const response = await request(app).get("/api/pets/inventory/2");

        expect(response.status).toBe(200);
        expect(response.body.inventory).toEqual(inventory)
    })
});

describe("POST /api/pets/inventory", () => {
    // it("successfully creates a new pet inventory for a valid admin user", async () => {
    //     const newInventory = { productId: 37, quantity: 20};

    //     prismaMock.inventory.create.mockResolvedValue({product: {connect: {id:newInventory.productId}}, quantity: newInventory.quantity})
    
    //     const response = await request(app)
    //         .post("/api/pets/inventory")
    //         .set('Authorization', `Bearer ${mockToken}`)


    //     expect(response.status).toBe(201);
    //     expect(response.body.newInventory).toEqual({
    //         product: {
    //             connect: {id:newInventory.productId}
    //         },
    //         quantity: newInventory.quantity
    //     })
    // });

    it('does not create a new inventory for user that is not an admin user', async () => {
        // Mock a user without admin privileges
        jwt.verify.mockReturnValue({ id: 2, isAdmin: false });

        const response = await request(app)
            .post('/api/pets/inventory')
            .set('Authorization', `Bearer ${mockToken}`);

        expect(response.status).toBe(403);

        const { name, message } = response.body;
        expect(name).toEqual('UnauthorizedError');
        expect(message).toEqual('You do not have permission to perform this action')
    });

});


describe('PUT /api/pets/inventory/:inventoryId', () => {
    // it('successfully updates an existing pet inventory for a valid admin user', async () => {

    //   const inventoryId = 1;
    //   const updateInventory = { quantity: 30 }

    //   prismaMock.inventory.update.mockResolvedValue({
    //     id: inventoryId,
    //     product: { connect: { id: 1 } }, 
    //     quantity: updateInventory.quantity,
    //   });

    //   const response = await request(app)
    //     .put("/api/pets/inventory/1")
    //     .set('Authorization', `Bearer ${mockToken}`)
  
    //   expect(response.status).toBe(200);
    //   expect(response.body.updateInventory).toEqual({
    //     id: inventoryId,
    //     product: { connect: { id: 1 } },
    //     quantity: updateInventory.quantity,
    //   });
    
    // });

    it('does not update inventory for a user that is not an admin user', async () => {
        // Mock a user without admin privileges
        jwt.verify.mockReturnValue({ id: 2, isAdmin: false });

        const response = await request(app)
            .put('/api/pets/inventory/77')
            .set('Authorization', `Bearer ${mockToken}`);

        expect(response.status).toBe(403);

        const { name, message } = response.body;
        expect(name).toEqual('UnauthorizedError');
        expect(message).toEqual('You do not have permission to perform this action')
    });

});

describe("DELETE /api/pets/inventory/:inventoryId", () => {
    // it("successfully deletes an existing inventory for a valid admin user", async () => {
    //     const deleteInventory = { id: 77, productId: 37, quantity: 50 };

    //     prismaMock.inventory.delete.mockResolvedValue(deleteInventory);

    //     const response = await request(app)
    //         .delete("/api/pets/inventory/77")
    //         .set('Authorization', `Bearer ${mockToken}`);

    //     expect(response.status).toBe(204);
    //     expect(response.body.deleteInventory).toEqual();
    // });

    it('does not delete inventory for a user that is not an admin user', async () => {
        // Mock a user without admin privileges
        jwt.verify.mockReturnValue({ id: 2, isAdmin: false });

        const response = await request(app)
            .delete('/api/pets/inventory/77')
            .set('Authorization', `Bearer ${mockToken}`);

        expect(response.status).toBe(403);

        const { name, message } = response.body;
        expect(name).toEqual('UnauthorizedError');
        expect(message).toEqual('You do not have permission to perform this action')
    });
});

});

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
    it("should create a new pet inventory", async () => {
        const newInventory = { productId: 37, quantity: 20};

        prismaMock.inventory.create.mockResolvedValue({product: {connect: {id:newInventory.productId}}, quantity: newInventory.quantity})

        const response = await request(app).post("/api/pets/inventory");

        expect(response.status).toBe(201);
        expect(response.body.newInventory).toEqual({
            product: {
                connect: {id:newInventory.productId}
            },
            quantity: newInventory.quantity
        })
    })
});

describe('PUT /api/pets/inventory/:inventoryId', () => {
    it('should update an existing pet inventory', async () => {
      const inventoryId = 1;
      const updateInventory = { quantity: 30 }
  
      prismaMock.inventory.update.mockResolvedValue({
        id: inventoryId,
        product: { connect: { id: 1 } }, 
        quantity: updateInventory.quantity,
      });
  
      const response = await request(app)
        .put("/api/pets/inventory/1")
  
      expect(response.status).toBe(201);
      expect(response.body.updateInventory).toEqual({
        id: inventoryId,
        product: { connect: { id: 1 } },
        quantity: updateInventory.quantity,
      });
    });
});

describe("DELETE /api/pets/inventory/:inventoryId", () => {
    it("should delete an existing inventory", async () => {
        const deleteInventory = {id:77, productId: 37, quantity: 50};

        prismaMock.inventory.delete.mockResolvedValue(deleteInventory);

        const response = await request(app).delete("/api/pets/inventory/77") 
        
        expect(response.status).toBe(200)
        expect(response.body.deleteInventory).toEqual(deleteInventory)
    });
});

})
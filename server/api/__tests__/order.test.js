const app = require("../../app");
const request = require("supertest");
const prismaMock = require("../../../mocks/prismaMock");

jest.mock("jsonwebtoken");


describe("/api/pets/order", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
    
    describe("GET /api/pets/order", () => {
        it("returns all orders", async () => {
            const orders = [
                {id: 1, productId: 1, userId: 1, quantity: 1},
                {id: 2, productId: 2, userId: 2, quantity: 1}
            ];

            prismaMock.order.findMany.mockResolvedValue(orders);

            const response = await request(app).get("/api/pets/order");

            expect(response.status).toBe(200);
            expect(response.body.orders[0]).toEqual(orders[0]);
            expect(response.body.orders[1]).toEqual(orders[1]);

        });
    });

    describe("GET /api/pets/order/:orderId", () => {
        it("returns an order based on the order Id", async () => {
            const order = {id: 1, productId: 1, userId: 1, quantity: 1};

            prismaMock.order.findUnique.mockResolvedValue(order);

            const response = await request(app).get("/api/pets/order/1");

            expect(response.status).toBe(200);
            expect(response.body.order).toEqual(order);
        });
    });

    describe("POST /api/pets/order", () => {
        it("creates a new order", async () => {
            const newOrder = {productId: 1, userId: 1, quantity: 3};

            prismaMock.order.create.mockResolvedValue({
                product: {connect: {id:newOrder.productId}},
                user: {connect: {id:newOrder.userId}},
                quantity: newOrder.quantity
            });
    
            const response = await request(app)
                .post("/api/pets/order")
    
    
            expect(response.status).toBe(201);
            expect(response.body.newOrder).toEqual({
                product: {
                    connect: {id:newOrder.productId}
                },
                user: {
                    connect: {id:newOrder.userId}
                },
                quantity: newOrder.quantity
            });
        });
    });
    
});
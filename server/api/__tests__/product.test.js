const app = require("../../app");
const request = require("supertest");
const prismaMock = require("../../../mocks/prismaMock");

jest.mock("jsonwebtoken");


describe("/api/pets/product", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
    
    describe("GET /api/pets/product", () => {
        it("returns all products", async () => {
            const products = [
                { id: 1, name: "toy", image: "toy.jpeg", price: "1", description: "toy", categoryName: "toy", petCategory: "dog"},
                {id: 2, name: "food", image: "food.jpeg", price: "1", description: "food", categoryName: "food", petCategory: "cat"},

            ];

            prismaMock.product.findMany.mockResolvedValue(products);

            const response = await request(app).get("/api/pets/product");

            expect(response.status).toBe(200);
            expect(response.body.products[0]).toEqual(products[0]);
            expect(response.body.products[1]).toEqual(products[1]);

        });
    });

    describe("GET /api/pets/product/:productId", () => {
        it("returns a product based on the product Id", async () => {
            const product = { 
                id: 1, 
                name: "toy", 
                image: "toy.jpeg", 
                price: "1", 
                description: "toy", 
                categoryName: "toy", 
                petCategory: "dog"}

            prismaMock.product.findUnique.mockResolvedValue(product);

            const response = await request(app).get("/api/pets/product/1");

            expect(response.status).toBe(200);
            expect(response.body.product).toEqual(product);
        });
    });

    describe("POST /api/pets/product", () => {
        it("creates a new product", async () => {
            const newProduct = { 
                id: 1, 
                name: "toy", 
                image: "toy.jpeg", 
                price: "1", 
                description: "toy", 
                categoryName: "toy", 
                petCategory: "dog"}

            prismaMock.product.create.mockResolvedValue({
               id: newProduct.id,
               name: newProduct.name,
               image: newProduct.image,
               price: newProduct.price,
               description: newProduct.description,
               categoryName: newProduct.categoryName,
               petCategory: newProduct.petCategory,
            });
    
            const response = await request(app)
                .post("/api/pets/product")
                .send(newProduct);
    
    
            expect(response.status).toBe(201);
            expect(response.body.newProduct).toEqual(newProduct); 
        });
    });

    
    describe("PUT api/pets/product/:productId", () => {
        it("updates an existing order based on its Id", async () => {

            const productId = 1;
            const updateProduct ={ 
                id: productId, 
                name: "toy", 
                image: "toy.jpeg", 
                price: "1", 
                description: "toy", 
                categoryName: "toy", 
                petCategory: "dog"}


            prismaMock.product.update.mockResolvedValue({
                id: updateProduct.id,
                name: updateProduct.name,
                image: updateProduct.image,
                price: updateProduct.price,
                description: updateProduct.description,
                categoryName: updateProduct.categoryName,
                petCategory: updateProduct.petCategory,
            });

            const response = await request(app)
            .put(`/api/pets/product/${productId}`)
            .send(updateProduct);

        expect(response.status).toBe(200);
        expect(response.body.updateProduct).toEqual(updateProduct);
        });
    });
    
    


    describe("DELETE api/pets/product/:productId", () => {
        it("deletes an existing product based on its Id", async () => {
            const deletedProduct = { 
                id: 1, 
                name: "toy", 
                image: "toy.jpeg", 
                price: "1", 
                description: "toy", 
                categoryName: "toy", 
                petCategory: "dog"
            };
    
            prismaMock.product.delete.mockResolvedValue(deletedProduct);
    
            const response = await request(app).delete("/api/pets/product/1");
    
            expect(response.status).toBe(204);
            expect(response.body).toEqual({});
        });
    });
    
    
});

const app = require("../../app");
const request = require("supertest");
const prismaMock = require("../../../mocks/prismaMock");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");

describe("/api/pets/category", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("GET /api/pets/category", () => {
    it("returns all the category", async () => {
      const categories = [
        { id: 1, categoryName: "toy", petName: "dog" },
        { id: 2, categoryName: "toy", petName: "cat" },
      ];

      prismaMock.category.findMany.mockResolvedValue(categories);

      const response = await request(app).get("/api/pets/category");

      expect(response.status).toBe(200);
      expect(response.body.categories[0]).toEqual(categories[0]);
      expect(response.body.categories[1]).toEqual(categories[1]);
    });
  });

  describe("GET /api/pets/category/:categoryid", () => {
    it("returns all the category", async () => {
      const category = [{ id: 1, categoryName: "toy", petName: "dog" }];

      prismaMock.category.findUnique.mockResolvedValue(category);

      const response = await request(app).get("/api/pets/category/1");

      expect(response.status).toBe(200);
      expect(response.body.category).toEqual(category);
    });
  });

  describe("POST /api/pets/category", () => {
    it("should create a new category", async () => {
      const newCategory = {
        id: 1,
        categoryName: "toy",
        petsName: "dog",
      };
      prismaMock.category.create.mockResolvedValue(newCategory);

      const response = await request(app).post("/api/pets/category");

      const category = response.body;

      expect(response.status).toBe(201);
      expect(category.newCategory.id).toEqual(newCategory.id);
      expect(category.newCategory.categoryName).toEqual(
        newCategory.categoryName
      );
      expect(category.newCategory.petsName).toEqual(newCategory.petsName);
      expect(prismaMock.category.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("PUT /api/pets/category/:categoryId", () => {
    it("should update a existing category", async () => {
      const newCategory = {
        id: 1,
        categoryName: "toy",
        petCategory: "dog",
      };

      prismaMock.category.findUnique.mockResolvedValue(newCategory);

      const updateCategory = {
        id: 1,
        categoryName: "toy",
        petCategory: "cat",
      };

      prismaMock.category.update.mockResolvedValue(updateCategory);
    
      const response = await request(app).put("/api/pets/category/1");
     
      const category = response.body;
      expect(response.status).toBe(200);
      expect(category.updatedCategory.id).toEqual(updateCategory.id);
      expect(category.updatedCategory.categoryName).toEqual(
        updateCategory.categoryName
      );
      expect(category.updatedCategory.petCategory).toEqual(updateCategory.petCategory);
      expect(prismaMock.category.update).toHaveBeenCalledTimes(1);
    });
  });

  describe("DELETE /api/pets/category/:categoryId", () => {
    it("should delete a existing category", async () => {
      const categoryToDelete = {
        id: 1,
        categoryName: "toy",
        petCategory: "dog",
      };
      prismaMock.category.findUnique.mockResolvedValue(categoryToDelete)
      prismaMock.category.delete.mockResolvedValue(categoryToDelete);

      const response = await request(app).delete("/api/pets/category/1");

      const category = response.body;
      console.log(category);
      expect(response.status).toBe(200);
      expect(category.deleteCategory.id).toEqual(categoryToDelete.id);
      expect(category.deleteCategory.categoryName).toEqual(
        categoryToDelete.categoryName
      );
      expect(category.deleteCategory.petCategory).toEqual(categoryToDelete.petCategory);
      expect(prismaMock.category.delete).toHaveBeenCalledTimes(1);
    });
  });

});

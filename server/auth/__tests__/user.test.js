const app = require("../../app");
const request = require("supertest");
const prismaMock = require("../../../mocks/prismaMock");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

jest.mock("jsonwebtoken");
jest.mock("bcrypt");

describe("Authentication", () => {
  beforeEach(() => {
    jwt.sign.mockReset();
    bcrypt.hash.mockReset();
  });

  describe("/auth/user", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    describe("GET /auth/user", () => {
      it("should return all users with passwords removed", async () => {
        prismaMock.user.findMany.mockResolvedValueOnce([
          { id: 1, username: "user1", password: "password1" },
        ]);
        const response = await request(app).get("/auth/user");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, username: "user1" }]);
      });
    });

    describe("POST /auth/user/register", () => {
      it("does not create a user if user if the username already exists", async () => {
        const existingUser = {
          username: "testuser",
        };
        const newUser = {
          username: "testuser",
          name: "test user",
          password: "testpassword",
        };

        prismaMock.user.findUnique.mockResolvedValue(existingUser);

        const response = await request(app)
          .post("/auth/user/register")
          .send(newUser);

        expect(response.status).toBe(403);
        expect(response.body.name).toBe("UserExistsError");

        expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
          where: {
            username: existingUser.username,
          },
        });

        // ensure none of the other register code has run
        //     expect(prismaMock.user.create).toHaveBeenCalledTimes(0);
        //    expect(bcrypt.hash).toHaveBeenCalledTimes(0);
        //   expect(jwt.sign).toHaveBeenCalledTimes(0);
      });
      it("should create a new user and return user details with token", async () => {
        const newUser = {
          username: "newuser",
          name: "New User",
          password: "password123",
          // isAdmin: false,
          // age: 25,
          // email: "newuser@example.com",
        };
        const registeredUser = {
          id: 1,
          ...newUser,
        };
        const token = "mocktoken";
        const hashedPassword = "hashedPassword";
        bcrypt.hash.mockResolvedValue(hashedPassword);

        prismaMock.user.create.mockResolvedValue(registeredUser);
        jwt.sign.mockReturnValue(token);

        const response = await request(app)
          .post("/auth/user/register")
          .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body.user.id).toEqual(registeredUser.id);
        //  expect(response.body.user.email).toEqual(registeredUser.email);
        expect(response.body.token).toEqual(token);
        expect(response.body.user.password).toBeUndefined();
        expect(bcrypt.hash).toHaveBeenCalledTimes(1);
        expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
        expect(prismaMock.user.create).toHaveBeenCalledWith({
          data: {
            //   email: newUser.email,
            password: hashedPassword,
            //    isAdmin: newUser.isAdmin,
            name: newUser.name,
            username: newUser.username,
          },
        });
      });
      //------------------LOGIN----------------------------//

      describe("POST /auth/user/login", () => {
        it("should login a user and return user details with token", async () => {
          const existingUser = {
            username: "testuser",
            password: "testpassword",
          };
          prismaMock.user.findUnique.mockResolvedValue(existingUser);

          const token = "mocktoken";
          const hashedPassword = "hashedpassword";

          bcrypt.compare.mockResolvedValue(existingUser, hashedPassword);
          jwt.sign.mockReturnValue(token);

          const response = await request(app)
            .post("/auth/user/login")
            .send(existingUser); //.set("Authorization", "Bearer" + token);

          //expect(response.status).toBe(200);
          expect(response.body.token).toEqual(token);
          expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
          expect(bcrypt.compare).toHaveBeenCalledTimes(1);
          expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
            where: {
              username: "testuser",
            },
          });
        });
      });
      it("should not log in a user with an invalid username", async () => {
        prismaMock.user.findUnique.mockResolvedValueOnce(null);
        const response = await request(app)
          .post("/auth/user/login")
          .send({ username: "nonexistentuser", password: "password123" });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "User not found" });
        expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
      });

      it("should not log in a user with an invalid password", async () => {
        const existingUser = {
          username: "testuser",
          password: "testpassword"
        };
        prismaMock.user.findUnique.mockResolvedValue(existingUser);
        bcrypt.compare.mockResolvedValue(false);
        jwt.sign.mockReturnValue("mocktoken");

        const response = await request(app).post("/auth/user/login").send({
          username: "testuser",
          password: "invalidpassword"
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Invalid password");
        expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
        expect(bcrypt.compare).toHaveBeenCalledTimes(1);
        expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
          where: {
            username: "testuser"
          }
        })
      });
    });
  });
});

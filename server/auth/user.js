const userRouter = require("express").Router();

const prisma = require("../db/client");
const jwt = require("jsonwebtoken");
const SALT_COUNT = 10;
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

//GET /auth/user
userRouter.get("/", async (req, res, next) => {
  try {
    const allUsers = await prisma.user.findMany();
    allUsers.forEach((user) => delete user.password);
    res.send(allUsers);
  } catch (error) {
    next(error);
  }
});

//POST /auth/user/register
userRouter.post("/register", async (req, res, next) => {
  try {
    const { username, name, password, isAdmin, email, phone, address } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const userExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (userExists) {
      res.status(403);
      next({ name: "UserExistsError" });
    }
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        isAdmin,
        profile: {
          create: {
            name,
            email,
            phoneNumber: Number(phone),
            address,
          },
        },
        cart: {
          create: {}
        }
      },
      include: {
        profile: true,
        order: true,
        cart: true
      },
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    delete user.password;
    res.status(201).send({ user, token });
  } catch (error) {
    next(error);
  }
});

//POST /auth/user/login
userRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        profile: true,
        order: true,
        cart: true
      },
    });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(201).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    delete user.password;
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
});

//POST /auth/user/guest
userRouter.post("/guest", async (req, res, next) => {
  try {
    const { username, name, password, isAdmin, email, phone, address } =
      req.body;
    // const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const userExists = await prisma.profile.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      res.send(userExists);
    } else {
      const user = await prisma.user.create({
        data: {
          username,
          password,
          isAdmin,
          profile: {
            create: {
              name,
              email,
              phoneNumber: Number(phone),
              address,
            },
          },
          cart: {
            create: {}
          }
        },
        include: {
          profile: true,
          order: true,
          cart: true
        },
      });
      console.log(user);
      // const token = jwt.sign({ id: user.id }, JWT_SECRET);
      // delete user.password;
      // res.status(201).send({ user, token });
      res.status(201).send({ user });
    }
  } catch (error) {
    next(error);
  }
});

//PUT /auth/user/register/:userId
userRouter.put("/register/:userId", async (req, res, next) => {
  try {
    const { username, name, password, isAdmin, email, phone, address } =
      req.body;
    const userId = Number(req.params.userId);
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const userExists = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        password: hashedPassword,
        isAdmin,
        profile: {
          update: {
            where: {
              userId,
            },
            data: {
              name,
              email,
              phoneNumber: Number(phone),
              address,
            },
          },
        },
      },
      include: {
        profile: true,
        order: true,
        cart: true
      },
    });
    console.log(userExists);
    const token = jwt.sign({ id: userExists.id }, JWT_SECRET);
    delete userExists.password;
    res.status(201).send({ userExists, token });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;

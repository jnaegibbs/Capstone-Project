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

//GET /auth/user/:id
userRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.userId),
      },
      include: {
        profile: true,
        cart: {
          include:{
            cartItem:true,
          }
        },
        review: true,
      },
    });
    delete user.password;
   
    res.send({ user} );
  } catch (error) {
   
    next(error);
  }
});

//POST /auth/user/register
userRouter.post("/register", async (req, res, next) => {
  try {
    const { username, name, password, isAdmin, email, phone, address } = req.body;

    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const userExists = await prisma.user.findUnique({
      where: { username },
    });

    if (userExists) {
      return res.status(401).send({ error: "Username already exists!" });
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
          create: {},
        },
      },
      include: {
        profile: true,
        order: true,
        cart: {
          include:{
            cartItem:true
          }
        },
      },
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    delete user.password;

    res.status(200).send({ user, token });

  } catch (error) {
    console.error(error);
    res.send({message: "Unable to register. Please try again."})
  }
});


//POST /auth/user/login
userRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username: username },
      include: {
        profile: true,
        order: true,
        cart: {
          include:{
            cartItem:true,
          }
        },
      },
    });
    
    console.log(user);

    if (!user) {
     res.status(401).send({ message: "Username not found" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    delete user.password;

    res.status(200).send({ user, token });

  } catch (error) {
    next(error);
  }
});

//POST /auth/user/guest
userRouter.post("/guest", async (req, res, next) => {
  try {
    const { username, name, password, isAdmin, email, phone, address } =
      req.body;

    const userExists = await prisma.profile.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      res.send(userExists);
    }
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
          create: {},
        },
      },
      include: {
        profile: true,
        order: true,
        cart: {
          include:{
            cartItem:true
          }
        },
      },
    });
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
  
    // delete user.password;
    // res.status(201).send({ user, token });
    res.status(201).send({ user, token });
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
        cart:{
          include:{
            cartItem:true
          }
        },
      },
    });
    const token = jwt.sign({ id: userExists.id }, JWT_SECRET);
    delete userExists.password;
    res.status(201).send({ userExists, token });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;

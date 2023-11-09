const authRouter = require("express").Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env
const prisma = require("../db/client");

authRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    if (!auth) {
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
        if (id) {
          req.user = await prisma.user.findUnique({
            where: {id: id}
          });
          next();
        } else {
          next({
            name: 'AuthorizationHeaderError',
            message: 'Authorization token malformed',
          });
        }
      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${prefix}`,
      });
    }
  });

authRouter.use("/user", require('./user'));
authRouter.use("/admin", require("./admin"));


module.exports = authRouter;
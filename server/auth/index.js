const authRouter = require("express").Router();


authRouter.use("/user", require('./user'));
authRouter.use("/admin", require("./admin"));


module.exports = authRouter;
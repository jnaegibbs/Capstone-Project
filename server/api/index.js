

const apiRouter = require("express").Router();

apiRouter.use("/pets/category", require("./category"));
apiRouter.use("/pets/product",require('./product'));
apiRouter.use("/pets/order",require('./order'));
apiRouter.use("/pets/inventory",require('./inventory'));
apiRouter.use("/pets/cartItem",require('./cartItem'));
apiRouter.use("/pets/cart",require("./cart"));

module.exports = apiRouter;
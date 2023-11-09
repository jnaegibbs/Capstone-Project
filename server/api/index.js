

const apiRouter = require("express").Router();

apiRouter.use("/pets/category", require("./category"));
apiRouter.use("/pets/product",require('./product'))
apiRouter.use("/pets/order",require('./order'))
apiRouter.use("/pets/inventory",require('./inventory'))

module.exports = apiRouter;
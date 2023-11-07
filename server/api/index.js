// TODO: add API router here and all API sub-routers

const router = require("express").Router();

router.use("/pets", require("./pets"));

module.exports = router;
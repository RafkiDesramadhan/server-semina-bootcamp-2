const express = require("express");
const { create, index, find, update, destroy } = require("./controller");
const router = express();
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.get("/categories", authenticateUser, index);
router.get("/categories/:id", find);
router.put("/categories/:id", update);
router.delete("/categories/:id", destroy);

router.post("/categories", authenticateUser, create);

module.exports = router;

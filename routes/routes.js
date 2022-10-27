const router = require("express").Router();
const verifyToken = require("../middleware/custom.middleware");
const {
  getItemsController,
  addItemsController,
  deleteItemsController,
  getSingleProductController,
  updateItemController,
  loginJWTController,
} = require("../controller/controller");

router
  .route("/items")
  // items find api
  .get(getItemsController)
  //post/add item item product
  .put(verifyToken, addItemsController)
  //delete/inventory manage items
  .delete(verifyToken, deleteItemsController);
  router
  .route("/items/:id")
  //get single product
  .get(getSingleProductController)
  //update quantity items
  .put(updateItemController);

// login into jwt added api
router.post("/login", loginJWTController);

module.exports = router;

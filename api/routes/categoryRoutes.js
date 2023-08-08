const express = require("express");
const cat_route = express();
const category_controller = require("../controllers/categoryControlller");
const auth = require("../validations/Authentication");

cat_route.get("/test", auth, function (req, res) {
  res.status(200).send({ success: true, msg: "Authenticated" });
});
cat_route.post("/add_category", category_controller.add_category);
cat_route.post("/update_catorgy", category_controller.update_catorgy);
cat_route.post("/get_category", category_controller.view_category);
cat_route.post("/delete_category", category_controller.delete_category);
cat_route.post("/delete_all", category_controller.delete_all);
cat_route.post("/delete_multiple", category_controller.delete_multiple);
cat_route.get("/get_all_category", category_controller.get_category);

module.exports = cat_route;

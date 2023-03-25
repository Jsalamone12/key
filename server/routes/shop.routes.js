const shopController = require("../controllers/shop.controller");

module.exports = (app) => {
    app.post("/api/shops/new", shopController.create);
    app.get("/api/shops/", shopController.getAll);
    app.get("/api/shops/:_id", shopController.getOne);
    app.put("/api/shops/:_id/update", shopController.updateOne);
    app.delete("/api/shops/:_id", shopController.deleteOne);

}

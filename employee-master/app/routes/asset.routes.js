// routes/asset.routes.js
module.exports = app => {
    const assets = require("../controllers/asset.controller.js");

    var router = require("express").Router();

    // Create a new Asset
    router.post("/", assets.create);

    // Retrieve all Assets
    router.get("/", assets.findAll);

    // Retrieve a single Asset by id
    // router.get("/api/assets/:id", assets.findOne);

    // Update an Asset by id
    router.put("/:id", assets.update);

    // Delete an Asset
    router.delete("/:id", assets.delete);



   // Retrieve all assigned assets with employee details
   // router.get("/assigned-assets", assets.getAssignedAssets);

    
    app.use('/api/assets', router);
};


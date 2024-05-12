module.exports = app => {
    const rtnTrx = require("../controllers/rtntrx.controller.js");
    var router = require("express").Router();

    router.post("/", rtnTrx.create);
    router.get("/", rtnTrx.findAll);
    router.put("/:id", rtnTrx.update);
    router.delete("/:id", rtnTrx.delete);

    app.use('/api/rtntrx', router);
};
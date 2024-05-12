module.exports = app => {
    const issueTrx = require("../controllers/issueTrx.controller.js");
    var router = require("express").Router();

    // Create a new Transaction
    router.post("/", issueTrx.create);

    // Retrieve all Transactions
    router.get("/", issueTrx.findAll);

    app.use('/api/issueTrx', router);
};
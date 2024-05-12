const db = require('../models');
const IssueTrx = db.issueTrx;
const Asset = db.assets;

exports.create = async (req, res) => {

    console.log("In server side issue create "+ req.body.assetId + " " + req.body.employeeId + " " + req.body.notes);
    // Validate request
    if (!req.body.assetId || !req.body.employeeId) {
        res.status(400).send({
            message: "Asset ID and Employee ID can not be empty!"
        });
        return;
    }

    // Create a transaction
    const transaction = {
        asset_id: req.body.assetId,  // Use assetId as received from the client
        employee_id: req.body.employeeId,  // Use employeeId as received from the client
        notes: req.body.notes
    };

    // Save Transaction in the database
    IssueTrx.create(transaction)
        .then(data => {
            // Transaction created successfully, now update the asset status
            Asset.update({ status: 'Issued' }, {
                where: { id: req.body.assetId }
            })
            .then(() => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating asset status: " + err.message
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Transaction."
            });
        });
};

exports.findAll = async (req, res) => {
    IssueTrx.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving transactions."
            });
        });
};

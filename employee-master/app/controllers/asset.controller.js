// controllers/asset.controller.js
const db = require('../models');
const Asset = db.assets;
const Employee = db.employees;
const { Op } = require('sequelize');

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.serial_number) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create an asset
    const asset = {
        serial_number: req.body.serial_number,
        make: req.body.make,
        model: req.body.model,
        asset_type: req.body.asset_type,
        description: req.body.description,
        status: req.body.status
    };

    // Save Asset in the database
    Asset.create(asset)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Asset."
            });
        });
};




  exports.findAll = async (req, res) => {
    try {
        const assets = await Asset.findAll();
        res.json(assets);  // Send data as JSON
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving assets."
        });
    }
}; 




exports.findOne = async (req, res) => {
    // Retrieve one asset by id
};

exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        const asset = await Asset.findByPk(id);
        if (!asset) {
            return res.status(404).send({
                message: `Asset not found with id ${id}`
            });
        }

        asset.serial_number = req.body.serial_number || asset.make,
        asset.make = req.body.make || asset.make;
        asset.model = req.body.model || asset.model;
        asset.asset_type = req.body.asset_type || asset.asset_type;
        asset.description = req.body.description || asset.description;
        asset.status = req.body.status || asset.status;

        await asset.save();
        res.send({
            message: "Asset updated successfully!",
            data: asset
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while updating the Asset."
        });
    }
};



exports.delete = async (req, res) => {
    const id = req.params.id;
    console.log("Asset ID to be deleted: " + id);
    try {
        const asset = await db.assets.findByPk(id);
        if (!asset) {
            console.log("Asset not found." + id);
            return res.status(404).send({ message: 'Asset not found.' });
        }

        await asset.destroy();
        res.send({ message: 'Asset deleted successfully.' });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while deleting the asset."
        });
    }
};

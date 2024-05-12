const db = require('../models');
const RtnTrx = db.rtntrx;

exports.create = async (req, res) => {
    const { asset_id, return_notes } = req.body;
    try {
        console.log("asset_id " + asset_id + " return notes " + return_notes);
        const issueTrx = await db.issueTrx.findOne({
            where: { asset_id: asset_id }
        });
        console.log("issueTrx " + issueTrx.employee_id + " " + issueTrx.issue_date + " " + issueTrx.asset_id + " " + issueTrx.notes);
        if (!issueTrx) {
            return res.status(404).send({
                message: `No issue transaction found for asset ID ${asset_id}.`
            });
        }
        
        const rtnTrx = await RtnTrx.create({
            asset_id: asset_id, 
            employee_id: issueTrx.employee_id,
            issue_date: issueTrx.issue_date,
            return_date: new Date(),
            issue_notes: issueTrx.notes,
            return_notes: return_notes
        });
        console.log("rtnTrx " + rtnTrx);
        if (rtnTrx) {
            await db.issueTrx.destroy({
                where: { asset_id: asset_id }
            });
            const asset = await db.assets.findOne({
                where: { id: asset_id }
            });
            if (asset) {
                asset.status = 'Available';
                await asset.save();
                console.log(`Asset status updated to Available for asset ID ${asset_id}`);
            } else {
                console.log(`Asset not found with ID ${asset_id}`);
            }
            res.send(rtnTrx);
        } else {
            res.status(500).send({
                message: "Failed to create return transaction."
            });
        }
    } catch (error) {
        console.error('Error creating return transaction:', error);
        res.status(500).send({
            message: error.message || "Some error occurred while creating the return transaction."
        });
    }
};

exports.findAll = async (req, res) => {
    const assetId = req.query.asset_id; // Get asset_id from query parameters
    try {
        const rtnTrxs = await db.rtntrx.findAll({
            where: { asset_id: assetId }
        });
        if (rtnTrxs.length > 0) {
            res.send(rtnTrxs);
        } else {
            res.status(404).send({
                message: `No return transactions found for asset ID ${assetId}.`
            });
        }
    } catch (error) {
        console.error('Error retrieving return transactions:', error);
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving the return transactions."
        });
    }
};

exports.update = async (req, res) => {
    // Implement update logic
};

exports.delete = async (req, res) => {
    // Implement delete logic
};

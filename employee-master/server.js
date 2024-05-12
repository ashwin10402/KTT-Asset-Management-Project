const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./app/routes/auth.routes');
const session = require('express-session');
const db = require('./app/models/index');
const dbasset = require('./app/models');

const Asset = dbasset.assets;
const IssueTrx = db.issueTrx;



const app = express();
const PORT = process.env.PORT || 3000;

// Session configuration
app.use(session({
    secret: 'ash',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto', maxAge: 3600000 }  // secure: 'auto' will use 'true' on HTTPS
}));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For parsing application/json




app.get('/main', (req, res) => {
    res.sendFile(__dirname + '/public/main.html');
});



// Import routes
require('./app/routes/employee.routes')(app);
require('./app/routes/asset.routes')(app);
require('./app/routes/issueTrx.routes')(app);
require('./app/routes/rtntrx.routes')(app);


app.use(authRoutes);

/* app.get('/api/assetCategories', async (req, res) => {
  try {
    const assetTypes = await db.sequelize.query('SELECT asset_type, COUNT(*) AS quantity FROM assets GROUP BY asset_type', { type: db.Sequelize.QueryTypes.SELECT });
    res.json(assetTypes);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Error retrieving data');
  }
}); */


app.get('/api/assetCategories', async (req, res) => {
  try {
    const assetTypes = await db.sequelize.query(`
      SELECT 
        asset_type,
        COUNT(*) AS quantity,
        SUM(CASE WHEN status = 'Issued' THEN 1 ELSE 0 END) AS active_count,
        SUM(CASE WHEN status = 'Available' THEN 1 ELSE 0 END) AS inactive_count,
        SUM(CASE WHEN status = 'Repair' THEN 1 ELSE 0 END) AS repair_count
      FROM assets 
      GROUP BY asset_type
    `, { type: db.Sequelize.QueryTypes.SELECT });
    res.json(assetTypes);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Error retrieving data');
  }
});


// Express route to fetch data for DataTables
app.get('/api/stockView', async (req, res) => {
  try {
    const stockData = await Asset.findAll({
      where: {
        status: 'Available' // Filter records where status is 'Inactive'
      },
      attributes: ['id', 'serial_number', 'make', 'model', 'asset_type', 'description'] // Specify columns to retrieve
    });
    res.json(stockData);
  } catch (err) {
    console.error('Error retrieving stock data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/session', (req, res) => {
    res.json(req.session.employee || {});
});




app.get('/api/issued-emp', async (req, res) => {
  const employeeId = req.query.employee_id; // Get employee ID from query parameters

  if (!employeeId) {
    console.log('Employee ID is required and must be a valid integer. ' + employeeId);
    return res.status(4000).json({ error: 'Employee ID is required and must be a valid integer.' });
  }
  
  try {
    const issuedTransactions = await IssueTrx.findAll({
      where: { employee_id: employeeId },
      attributes: ['asset_id']
    });
    console.log(issuedTransactions + " issuedTransactions");

    if (issuedTransactions.length > 0) {
      const assetIds = issuedTransactions.map(tx => tx.asset_id);
      if (assetIds.length > 0) {
        const issuedAssets = await Asset.findAll({
          where: { id: assetIds },
          attributes: ['id', 'serial_number', 'asset_type', 'status']
        });
        res.json(issuedAssets);
      } else {
        res.json([]); // Return an empty array instead of a 404 error
      }
    } else {
      res.json([]); // Return an empty array if no issue transactions are found
    }
  } catch (error) {
    console.error('Error fetching issued assets:', error);
    res.status(500).json({ error: 'Failed to retrieve issued assets.' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

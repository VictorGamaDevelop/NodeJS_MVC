const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const farmerRoutes = require('./routes/farmer');
const bodyParser = require('body-parser');
const errorHandler = require('./utils/errorHandler'); 

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    next();
})
app.use(errorHandler);
app.use('/', farmerRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listing on port ${PORT}`);
  });
});

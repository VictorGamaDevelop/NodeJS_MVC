const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');

router.get('/', farmerController.getAll);

router.get('/farmerAdd', (req, res) => {
  res.render('farmerAdd');
});

router.get('/farmerEdit/:id', farmerController.getById);

router.post('/create', farmerController.create);

router.post('/update/:id', farmerController.update);

router.get('/delete/:id', farmerController.delete);

module.exports = router;

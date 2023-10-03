function errorHandler(err, req, res, next) {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: err.message });
    }
    res.status(500).send('Internal server error');
};
  
module.exports = errorHandler;
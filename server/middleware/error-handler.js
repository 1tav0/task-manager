const { CustomAPIError } = require('../errors/custom-errors')
//middleware custom error handler to handle our errors since using the async middleware for trycatch isnt handling them 
const errorHandler = (err, req, res, next) => { //the error that will be coming from the asyncWrapper
  // console.log(err);
  // return res.status(err.status).json({ msg: err.message });
  //way to do it after making custom-error file
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ msg: Object.values(err.errors).map(error => error.message).join(', ') });
  }
  return res.status(500).json({ msg: 'Something went wrong, please try again' });
}

module.exports = errorHandler;
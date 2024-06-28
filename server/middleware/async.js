//middleware to avoid using try catch on all the controller route function
const asyncWrapper = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      next(error); //with next we pass the error to the next middleware
    }
  }
}

module.exports = asyncWrapper;

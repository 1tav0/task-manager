//middleware for custom errors to be resused
//we extend from the error class with name we choose
class CustomAPIError extends Error{
  constructor(message, statusCode) {
    super(message); //since we are passing in a child message aka extending from a parent class we use super which invokes the constructor of the parent class then pass message value as a result we have access to all the methods and properties of the parent
    this.statusCode = statusCode; //allows us to create a statusCode property
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
}

module.exports = {createCustomError, CustomAPIError};
require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const tasks = require('./routes/tasks');

app.use(express.json());

//routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;
const start = async () => {
  try {
    await connectDB(process.env.MongoURI);
    app.listen(port, () => {
      console.log(`server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModels');

dotenv.config();

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connection is successful');
  });

// read json file

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'),
);

// import data into database

const importData = async () => {
  try {
    const data = await Tour.create(tours);
    console.log('🚀 ~ file: import-dev-data.js ~ line 32 ~ importData ~ data', data);
    console.log('data successfully added');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// delete all data from the collection

const deleteData = async () => {
  try {
    const res = await Tour.deleteMany();
    console.log('🚀 ~ file: import-dev-data.js ~ line 44 ~ deleteData ~ res', res);
    console.log('data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);

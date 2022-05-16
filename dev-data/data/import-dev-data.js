const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModels');
const Review = require('../../models/reviewModel');
const User = require('../../models/userModel');

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
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/users.json`, 'utf-8'),
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
);

// import data into database

const importData = async () => {
  try {
    const data = await Tour.create(tours);
    const data1 = await Review.create(reviews);
    const data2 = await User.create(users);
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
    const res2 = await Review.deleteMany();
    const res3 = await User.deleteMany();
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

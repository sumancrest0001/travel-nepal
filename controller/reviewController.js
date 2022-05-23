const Review = require('../models/reviewModel');
const catchAsync = require('../utilities/catchAsync');
const factory = require('./handleFactory');

exports.handleGetReviews = catchAsync(async (req, res) => {
  const filterObj = {};
  if (req.params.tourId) filterObj.tour = req.params.tourId;
  const reviews = await Review.find(filterObj);
  res.status(200).json({
    status: 'success',
    count: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.handleCreateReview = catchAsync(async (req, res) => {
  const review = new Review(req.body);
  const newReview = await review.save();
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

exports.manageReviewId = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.handleDeleteReview = factory.deleteOne(Review, 'review');
exports.handleUpdateReview = factory.updateOne(Review, 'review');

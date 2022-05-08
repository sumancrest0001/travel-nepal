const express = require('express');
const reviewController = require('../controller/reviewController');
const authController = require('../controller/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.handleGetReviews)
  .post(authController.protect, authController.restrictTo('user'), reviewController.manageReviewId, reviewController.handleCreateReview);

router.route('/:id').delete(authController.protect, authController.restrictTo('admin'), reviewController.handleDeleteReview);
router.route('/:id').put(authController.protect, authController.restrictTo('admin'), reviewController.handleUpdateReview);

module.exports = router;

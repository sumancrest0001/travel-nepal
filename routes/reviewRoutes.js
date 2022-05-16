const express = require('express');
const reviewController = require('../controller/reviewController');
const authController = require('../controller/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router
  .route('/')
  .get(reviewController.handleGetReviews)
  .post(authController.restrictTo('user'), reviewController.manageReviewId, reviewController.handleCreateReview);

router.route('/:id').delete(authController.restrictTo('admin', 'user'), reviewController.handleDeleteReview);
router.route('/:id').put(authController.restrictTo('admin', 'user'), reviewController.handleUpdateReview);

module.exports = router;

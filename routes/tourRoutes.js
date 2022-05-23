const express = require('express');

const router = express.Router();
const tourController = require('../controller/tourController');
const authController = require('../controller/authController');
const reviewRouter = require('./reviewRoutes');

router
  .route('/top-5-cheap-tours')
  .get(tourController.aliasTopTour, tourController.handleGetTours);

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);
router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getToursWithin);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(authController.protect, authController.restrictTo('admin', 'guide', 'lead-guide'), tourController.getMonthlyPlan);
router
  .route('/')
  .get(tourController.handleGetTours)
  .post(authController.protect, authController.restrictTo('admin'), tourController.handleCreateTour);
router
  .route('/:id')
  .get(tourController.handleGetTour)
  .patch(authController.protect, authController.restrictTo('admin'), tourController.handleUpdateTour)
  .delete(authController.protect, authController.restrictTo('admin'), tourController.handleDeleteTour);

router.use('/:tourId/reviews', reviewRouter);
module.exports = router;

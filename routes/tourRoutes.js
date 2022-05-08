const express = require('express');

const router = express.Router();
const tourController = require('../controller/tourController');
const authController = require('../controller/authController');
const reviewRouter = require('./reviewRoutes');

router
  .route('/top-5-cheap-tours')
  .get(tourController.aliasTopTour, tourController.handleGetTours);
// router.param('id', tourController.checkValidId);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router
  .route('/')
  .get(authController.protect, tourController.handleGetTours)
  .post(tourController.handleCreateTour);
// .post(tourController.checkTourParameters, tourController.handleCreateTour);
router
  .route('/:id')
  .get(tourController.handleGetTour)
  .patch(tourController.handleUpdateTour)
  .delete(authController.protect, authController.restrictTo('admin'), tourController.handleDeleteTour);

router.use('/:tourId/reviews', reviewRouter);
module.exports = router;

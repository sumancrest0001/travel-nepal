const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);
router.patch(
  '/updateMyPassword',
  authController.updatePassword,
);
router.patch(
  '/updateMe',
  userController.updateMe,
);

router.get(
  '/me',
  userController.getMe,
  userController.handleGetUser,
);

router.delete(
  '/deleteMe',
  userController.deleteMe,
);
router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.handleGetAllUsers)
  .post(userController.handleCreateUser);
router
  .route('/:id')
  .get(userController.handleGetUser)
  .patch(userController.handleUpdateUser)
  .delete(
    userController.handleDeleteUser,
  );

module.exports = router;

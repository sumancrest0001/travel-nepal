const AppError = require('../utilities/appError');
const User = require('../models/userModel');
const catchAsync = require('../utilities/catchAsync');
const factory = require('./handleFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObject = {};
  Object.keys(obj).forEach((ele) => {
    if (allowedFields.includes(ele)) newObject[ele] = obj[ele];
  });
  return newObject;
};

exports.handleGetAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.handleGetUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(500).json({
    status: true,
    message: 'Successfully fetched the user',
    user,
  });
});
exports.handleDeleteUser = factory.deleteOne(User, 'user');
exports.handleUpdateUser = factory.updateOne(User, 'user');
exports.handleCreateUser = factory.createOne(User, 'user');

exports.updateMe = catchAsync(async (req, res, next) => {
  // create errro if user posts password data

  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password update', '400'));
  }

  const filteredBody = filterObj(req.body, 'name', 'email');
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true, runValidators: true });

  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

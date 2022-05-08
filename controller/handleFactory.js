const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

exports.deleteOne = (Model, docName) => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError(`No ${docName} is found with that Id`, 404));
  }

  res.status(204).json({
    status: 'success',
    message: `Successfully deleted the ${docName}`,
    data: null,
  });
});
exports.updateOne = (Model, docName) => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError(`No ${docName} is found with that ID`, '404'));
  }

  res.status(200).json({
    status: 'success',
    message: `Successfully updated the ${docName}`,
    data: {
      doc,
    },
  });
});

exports.createOne = (Model, docName) => catchAsync(async (req, res, next) => {
  const firstDoc = new Model(req.body);
  const newDoc = await firstDoc.save();
  res.status(201).json({
    status: 'success',
    message: `Successfully created a ${docName}`,
    data: {
      tour: newDoc,
    },
  });
});

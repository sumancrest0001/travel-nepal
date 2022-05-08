const excludedFields = ['page', 'sort', 'limit', 'fields'];

exports.excludeBuiltinOptions = (query) => {
  excludedFields.forEach((ele) => delete query[ele]);
  return query;
};

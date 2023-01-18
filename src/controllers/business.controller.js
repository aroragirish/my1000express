const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { businessService } = require('../services');

const createBusiness = catchAsync(async (req, res) => {
  const body = {
    ...req.body,
    image: req.fileName,
  };
  const business = await businessService.createBusiness(body);
  res.status(httpStatus.CREATED).send(business);
});

const getAllBusiness = catchAsync(async (req, res) => {
  const businesses = await businessService.getAllBusiness();
  res.status(200).send(businesses);
});

const approveBusiness = catchAsync(async (req, res) => {
  const businesses = await businessService.approveBusiness(req.body.id);
  res.status(200).send(businesses);
});

const deleteBusiness = catchAsync(async (req, res) => {
  const business = await businessService.getBusinessById(req.params.id);
  if (req.user.role === 'admin') {
    await await businessService.deleteBusinessById(req.params.id);
    res.status(200).send({
      message: 'Business has been deleted',
    });
  } else if (business.email === req.user.email) {
    await await businessService.deleteBusinessById(req.params.id);
    res.status(200).send({
      message: 'Business has been deleted',
    });
  } else {
    res.status(403).send({
      message: 'Unable to delete',
    });
  }
});

const getBusinessesForUser = catchAsync(async (req, res) => {
  if (req.user.role === 'admin') {
    const businesses = await businessService.getAllBusinessIncludingUnapproved();
    res.status(200).send(businesses);
  } else {
    const businesses = await businessService.getAllBusinessByUser(req.user.email);
    res.status(200).send(businesses);
  }
});

const getAllBusinessByCategory = catchAsync(async (req, res) => {
  const { page, perPage = 6 } = req.body;
  const businesses = await businessService.getAllBusinessByCategory(req.params.category, page, perPage);
  res.status(200).send(businesses);
});

const getBusinessById = catchAsync(async (req, res) => {
  const business = await businessService.getBusinessById(req.params.id);
  if (business.approved) {
    res.status(200).send(business);
  } else if (business.email === req.user.email || req.user.role === 'admin') {
    res.status(200).send(business);
  } else {
    res.status(403).send({
      message: 'operation not permitted',
    });
  }
});
// const getUsers = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['name', 'role']);
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await userService.queryUsers(filter, options);
//   res.send(result);
// });

// const getUser = catchAsync(async (req, res) => {
//   const user = await userService.getUserById(req.params.userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   res.send(user);
// });

// const updateUser = catchAsync(async (req, res) => {
//   const user = await userService.updateUserById(req.params.userId, req.body);
//   res.send(user);
// });

// const deleteUser = catchAsync(async (req, res) => {
//   await userService.deleteUserById(req.params.userId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
  createBusiness,
  getAllBusiness,
  getAllBusinessByCategory,
  getBusinessById,
  getBusinessesForUser,
  deleteBusiness,
  approveBusiness,
};

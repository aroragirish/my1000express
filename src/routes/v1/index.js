const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const businessRoute = require('./business.route');
const categoryRoute = require('./category.route');
const ordersRoute = require('./orders.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/business',
    route: businessRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/orders',
    route: ordersRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

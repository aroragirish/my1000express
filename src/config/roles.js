const allRoles = {
  investor: ['getBusinessById', 'addOrder', 'getOrderById', 'deleteOrder', 'addBankDetails'],
  business: ['addBusiness', 'getBusinessesForUser', 'deleteBusiness', 'getBusinessById'],
  admin: [
    'createCategory',
    'deleteBusiness',
    'getBusinessById',
    'getBusinessesForUser',
    'approveBusiness',
    'addBusiness',
    'addOrder',
    'getOrderById',
    'getOrder',
    'deleteOrder',
  ],
  superadmin: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};

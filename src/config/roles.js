const allRoles = {
  investor: ['getBusinessById', 'addOrder', 'getOrderById', 'deleteOrder', 'addBankDetails', 'getUsers'],
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
    'updateKyc',
    'approveOrder',
    'rejectOrder',
    'getUsers',
  ],
  superadmin: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};

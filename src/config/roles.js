const allRoles = {
  investor: ['getBusinessById'],
  business: ['addBusiness', 'getBusinessesForUser', 'deleteBusiness', 'getBusinessById'],
  admin: ['createCategory', 'deleteBusiness', 'getBusinessById', 'getBusinessesForUser', 'approveBusiness', 'addBusiness'],
  superadmin: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};

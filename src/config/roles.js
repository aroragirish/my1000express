const allRoles = {
  investor: [],
  business: ['addBusiness'],
  admin: ['createCategory'],
  superadmin: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};

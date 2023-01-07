const allRoles = {
  investor: [],
  investee: [],
  admin: ['getUsers', 'manageUsers'],
  superadmin: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};

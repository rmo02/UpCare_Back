const { Role } = require('../models');

const createRoles = async () => {
  const roles = ['admin', 'user', 'tec'];

  for (const roleName of roles) {
    await Role.findOrCreate({
      where: { name: roleName },
      defaults: { name: roleName },
    });
  }
};

module.exports = createRoles;

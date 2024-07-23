module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Assegurar que os nomes são únicos
    },
  });

  Role.associate = function(models) {
    Role.belongsToMany(models.User, {
      through: 'UserRoles',
      as: 'users',
      foreignKey: 'roleId',
    });
  };

  return Role;
};

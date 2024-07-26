const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const File = sequelize.define("File", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    arquivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });


  return File;
};

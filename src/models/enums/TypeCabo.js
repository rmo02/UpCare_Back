const { DataTypes } = require('sequelize');

const TypeCabo = {
  C_7_8: 'C_7_8',
  C_15_8: 'C_15_8',
  C_31_8: 'C_31_8'
};

const TypeCaboEnum = DataTypes.ENUM(
  TypeCabo.C_7_8,
  TypeCabo.C_15_8,
  TypeCabo.C_31_8,
);

module.exports = { TypeCabo, TypeCaboEnum };

const { DataTypes } = require('sequelize');

const TypeDps = {
  D_1: 'D_1',
  D_2: 'D_2',
  D_3: 'D_3'
};

const TypeDpsEnum = DataTypes.ENUM(
  TypeDps.D_1,
  TypeDps.D_2,
  TypeDps.D_3,
);

module.exports = { TypeDps, TypeDpsEnum };

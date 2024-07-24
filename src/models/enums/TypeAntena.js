const { DataTypes } = require('sequelize');

const TypeAntena = {
  OMNIDIRECIONAL: 'OMNIDIRECIONAL',
  DIRETIVA: 'DIRETIVA'
};

const TypeAntenaEnum = DataTypes.ENUM(
  TypeAntena.OMNIDIRECIONAL,
  TypeAntena.DIRETIVA
);

module.exports = { TypeAntena, TypeAntenaEnum };

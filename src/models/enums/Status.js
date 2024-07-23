const { DataTypes } = require('sequelize');

const Status = {
  FUNCIONANDO: 'FUNCIONANDO',
  STAND_BY: 'STAND_BY',
  DEFEITO: 'DEFEITO',
  MANUTENCAO: 'MANUTENCAO',
};

const StatusEnum = DataTypes.ENUM(
  Status.FUNCIONANDO,
  Status.STAND_BY,
  Status.DEFEITO,
  Status.MANUTENCAO
);

module.exports = { Status, StatusEnum };

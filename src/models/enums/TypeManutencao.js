const { DataTypes } = require('sequelize');

const TypeManutencao = {
  PREVENTIVA: 'PREVENTIVA',
  CORRETIVA: 'CORRETIVA',
};

const TypeManutencaoEnum = DataTypes.ENUM(
  TypeManutencao.PREVENTIVA,
  TypeManutencao.CORRETIVA,

);

module.exports = { TypeManutencao, TypeManutencaoEnum };

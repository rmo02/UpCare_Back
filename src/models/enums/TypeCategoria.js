const { DataTypes } = require('sequelize');

const TypeCategoria = {
  REFRIGERACAO: 'REFRIGERACAO',
  ELETRICA: 'ELETRICA',
  TELEMETRIA: 'TELEMETRIA',
  IRRADIACAO: 'IRRADIACAO',
};

const TypeCategoriaEnum = DataTypes.ENUM(
  TypeCategoria.REFRIGERACAO,
  TypeCategoria.ELETRICA,
  TypeCategoria.TELEMETRIA,
  TypeCategoria.IRRADIACAO
);

module.exports = { TypeCategoria, TypeCategoriaEnum };

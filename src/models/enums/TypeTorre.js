const { DataTypes } = require('sequelize');

const TypeTorre = {
  AUTOPORTANTE: 'AUTOPORTANTE',
  ESTAIADA: 'ESTAIADA'
};

const TypeTorreEnum = DataTypes.ENUM(
  TypeTorre.AUTOPORTANTE,
  TypeTorre.ESTAIADA
);

module.exports = { TypeTorre, TypeTorreEnum };

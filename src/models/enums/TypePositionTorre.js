const { DataTypes } = require('sequelize');

const TypePositionTorre = {
  TOPO: 'TOPO',
  LATERAL: 'LATERAL'
};

const TypePositionTorreEnum = DataTypes.ENUM(
  TypePositionTorre.TOPO,
  TypePositionTorre.LATERAL
);

module.exports = { TypePositionTorre, TypePositionTorreEnum };

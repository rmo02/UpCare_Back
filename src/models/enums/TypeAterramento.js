const { DataTypes } = require('sequelize');

const TypeAterramento = {
  SIM: 'SIM',
  NAO: 'NAO',
};

const TypeAterramentoEnum = DataTypes.ENUM(
  TypeAterramento.SIM,
  TypeAterramento.NAO
);

module.exports = { TypeAterramento, TypeAterramentoEnum };

const { DataTypes } = require('sequelize');

const TypeEquipamento = {
  ARCONDICIONADO: 'ARCONDICIONADO',
  ANTENA: 'ANTENA',
  CABO: 'CABO',
  COMBINADOR: 'COMBINADOR',
  DISJUNTOR: 'DISJUNTOR',
  DPS: 'DPS',
  EXAUSTOR: 'EXAUSTOR',
  NOBREAK: 'NOBREAK',
  PARABOLICA: 'PARABOLICA',
  QUADRO: 'QUADRO',
  RECEPTOR: 'RECEPTOR',
  SWITCH: 'SWITCH',
  TELEMETRIA: 'TELEMETRIA',
  TORRE: 'TORRE',
  TRANSMISSOR: 'TRANSMISSOR',
};

const TypeEquipamentoEnum = DataTypes.ENUM(
  TypeEquipamento.ARCONDICIONADO,
  TypeEquipamento.ANTENA,
  TypeEquipamento.CABO,
  TypeEquipamento.COMBINADOR,
  TypeEquipamento.DISJUNTOR,
  TypeEquipamento.DPS,
  TypeEquipamento.EXAUSTOR,
  TypeEquipamento.NOBREAK,
  TypeEquipamento.PARABOLICA,
  TypeEquipamento.QUADRO,
  TypeEquipamento.RECEPTOR,
  TypeEquipamento.SWITCH,
  TypeEquipamento.TELEMETRIA,
  TypeEquipamento.TORRE,
  TypeEquipamento.TRANSMISSOR
);

module.exports = { TypeEquipamento, TypeEquipamentoEnum };

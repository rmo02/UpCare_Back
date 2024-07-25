const { DataTypes } = require('sequelize');

const StatusManutencao = {
  AGENDADA: 'AGENDADA',
  EM_EXECUCAO: 'EM_EXECUCAO',
  EM_ESPERA: 'EM_ESPERA',
  FINALIZADA: 'FINALIZADA',
};

const StatusManutencaoEnum = DataTypes.ENUM(
  StatusManutencao.AGENDADA,
  StatusManutencao.EM_EXECUCAO,
  StatusManutencao.EM_ESPERA,
  StatusManutencao.FINALIZADA
);

module.exports = { StatusManutencao, StatusManutencaoEnum };

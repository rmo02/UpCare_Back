const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ManutencaoChecklists = sequelize.define('ManutencaoChecklists', {
    manutencaoId: {
      type: DataTypes.UUID,
      references: {
        model: 'Manutencaos',
        key: 'id',
      },
      allowNull: false,
    },
    checklistId: {
      type: DataTypes.UUID,
      references: {
        model: 'Checklists',
        key: 'id',
      },
      allowNull: false,
    },
  });

  return ManutencaoChecklists;
};

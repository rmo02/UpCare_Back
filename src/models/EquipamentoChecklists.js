const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EquipamentoChecklists = sequelize.define('EquipamentoChecklists', {
    equipamentoId: {
      type: DataTypes.UUID,
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
  }, {
    timestamps: true,
  });

  return EquipamentoChecklists;
};

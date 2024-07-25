const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Manutencao = sequelize.define('Manutencao', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    estacaoId: {
      type: DataTypes.UUID,
      references: {
        model: 'Estacaos',
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
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Manutencao.associate = function(models) {
    Manutencao.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
    Manutencao.belongsTo(models.Checklist, { foreignKey: 'checklistId' });
  };

  return Manutencao;
};

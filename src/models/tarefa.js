const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Tarefa = sequelize.define('Tarefa', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    verificado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fotoObrigatoria: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    checklistId: {
      type: DataTypes.UUID,
      references: {
        model: 'Checklists',
        key: 'id',
      },
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

  Tarefa.associate = function (models) {
    Tarefa.belongsTo(models.Checklist, { foreignKey: 'checklistId' });
  };

  return Tarefa;
};

const { DataTypes } = require('sequelize');
const { StatusManutencaoEnum } = require('./enums/StatusManutencao');

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
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: StatusManutencaoEnum,
      allowNull: false,
    }
  }, {
    timestamps: true,
  });

  Manutencao.associate = function (models) {
    Manutencao.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
    Manutencao.belongsToMany(models.Checklist, {
      through: 'ManutencaoChecklists',
      foreignKey: 'manutencaoId'
    });
  };

  return Manutencao;
};

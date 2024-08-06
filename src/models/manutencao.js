const { DataTypes } = require('sequelize');
const { StatusManutencaoEnum } = require('./enums/StatusManutencao');
const { TypeManutencaoEnum } = require('./enums/TypeManutencao');

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
    tecnicoId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
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
      defaultValue: "AGENDADA",
      allowNull: false,
    },
    tipomanutencao: {
      type: TypeManutencaoEnum,
      allowNull: false,
    }
  }, {
    timestamps: true,
  });

  Manutencao.associate = function (models) {
    Manutencao.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
    Manutencao.belongsTo(models.User, { foreignKey: 'tecnicoId', as: 'tecnico' });
    Manutencao.belongsToMany(models.Checklist, {
      through: 'ManutencaoChecklists',
      foreignKey: 'manutencaoId'
    });
  };

  return Manutencao;
};

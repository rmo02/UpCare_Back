const { StatusEnum } = require('./enums/Status');

module.exports = (sequelize, DataTypes) => {
  const Estacao = sequelize.define('Estacao', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link_grafana: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: StatusEnum,
      allowNull: false,
    },
  });

  Estacao.associate = function(models) {
    Estacao.hasMany(models.Arcondicionado, { foreignKey: 'estacaoId' });
    Estacao.hasMany(models.Quadro, { foreignKey: 'estacaoId' });
    Estacao.hasMany(models.Disjuntor, { foreignKey: 'estacaoId' });
  };

  return Estacao;
};

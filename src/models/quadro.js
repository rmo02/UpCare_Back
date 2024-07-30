const { DataTypes } = require('sequelize');
const { TypeCategoriaEnum } = require('./enums/TypeCategoria');

module.exports = (sequelize) => {
  const Quadro = sequelize.define('Quadro', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    codigo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    categoria: {
      type: TypeCategoriaEnum,
      allowNull: false,
    },
    estacaoId: {
      type: DataTypes.UUID,
      references: {
        model: 'Estacaos',
        key: 'id',
      },
    },
  }, {
    timestamps: true,
  });

  Quadro.associate = function (models) {
    Quadro.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
    Quadro.hasMany(models.Disjuntor, { foreignKey: 'quadroId' });
    Quadro.hasMany(models.Dps, { foreignKey: 'quadroId' });
    Quadro.hasMany(models.File, { foreignKey: 'quadroId' });
  };

  return Quadro;
};

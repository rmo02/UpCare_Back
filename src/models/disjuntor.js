const { DataTypes } = require('sequelize');
const { TypeCategoriaEnum } = require('./enums/TypeCategoria');
const { StatusEnum } = require('./enums/Status');

module.exports = (sequelize) => {
  const Disjuntor = sequelize.define('Disjuntor', {
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
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria: {
      type: TypeCategoriaEnum,
      allowNull: false,
    },
    status: {
      type: StatusEnum,
      allowNull: false,
    },
    corrente_maxima: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quadroId: {
      type: DataTypes.UUID,
      references: {
        model: 'Quadros',
        key: 'id',
      },
    },
    estacaoId: {
      type: DataTypes.UUID,
      references: {
        model: 'Estacaos',
        key: 'id',
      },
    },
  });

  Disjuntor.associate = function(models) {
    Disjuntor.belongsTo(models.Quadro, { foreignKey: 'quadroId' });
    Disjuntor.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
  };

  return Disjuntor;
};

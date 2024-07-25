const { DataTypes } = require('sequelize');
const { TypeCategoriaEnum } = require('./enums/TypeCategoria');
const { StatusEnum } = require('./enums/Status');

module.exports = (sequelize) => {
  const Parabolica = sequelize.define('Parabolica', {
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
    diametro: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    satelite: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estacaoId: {
      type: DataTypes.UUID,
      references: {
        model: 'Estacaos',
        key: 'id',
      },
    },
  });

  Parabolica.associate = function(models) {
    Parabolica.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
    Parabolica.hasMany(models.Receptor, { foreignKey: 'parabolicaId' });
  };

  return Parabolica;
};

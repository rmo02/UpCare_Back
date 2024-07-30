const { DataTypes } = require('sequelize');
const { TypeCategoriaEnum } = require('./enums/TypeCategoria');
const { StatusEnum } = require('./enums/Status');

module.exports = (sequelize) => {
  const Transmissor = sequelize.define('Transmissor', {
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
    programmed: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    canal_fisico: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    canal_virtual: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    acoplador_one: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    acoplador_two: {
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
  }, {
    tableName: 'Transmissores',
    timestamps: true,
  });

  Transmissor.associate = function(models) {
    Transmissor.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
    Transmissor.hasMany(models.Receptor, { foreignKey: 'transmissorId' });
    Transmissor.hasOne(models.Antena, { foreignKey: 'transmissorId' });
    Transmissor.hasMany(models.File, { foreignKey: 'transmissorId' });

  };

  return Transmissor;
};

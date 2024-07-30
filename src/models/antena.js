const { DataTypes } = require('sequelize');
const { TypeCategoriaEnum } = require('./enums/TypeCategoria');
const { StatusEnum } = require('./enums/Status');
const { TypeAntenaEnum } = require('./enums/TypeAntena');
const { TypePositionTorreEnum } = require('./enums/TypePositionTorre');

module.exports = (sequelize) => {
  const Antena = sequelize.define('Antena', {
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
    gain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipos_antena: {
      type: TypeAntenaEnum,
      allowNull: false,
    },
    position_torre: {
      type: TypePositionTorreEnum,
      allowNull: false,
    },
    vr: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    transmissorId: {
      type: DataTypes.UUID,
      references: {
        model: 'Transmissores',
        key: 'id',
      },
    },
    estacaoId: {
      type: DataTypes.UUID,
      references: {
        model: 'Estacaos',
        key: 'id',
      },
    }
  }, {
    timestamps: true
  });

  Antena.associate = function(models) {
    Antena.belongsTo(models.Transmissor, { foreignKey: 'transmissorId' });
    Antena.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
    Antena.hasMany(models.File, { foreignKey: 'antenaId' });
  };

  return Antena;
};

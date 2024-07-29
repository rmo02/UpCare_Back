const { DataTypes } = require('sequelize');
const { TypeCategoriaEnum } = require('./enums/TypeCategoria');
const { StatusEnum } = require('./enums/Status');

module.exports = (sequelize) => {
  const Receptor = sequelize.define('Receptor', {
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
    channel: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    frequencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    symbol_rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vr: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    parabolicaId: {
      type: DataTypes.UUID,
      references: {
        model: 'Parabolicas',
        key: 'id',
      },
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
    },
  });

  Receptor.associate = function(models) {
    Receptor.belongsTo(models.Parabolica, { foreignKey: 'parabolicaId' });
    Receptor.belongsTo(models.Transmissor, { foreignKey: 'transmissorId' });
    Receptor.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
    Receptor.hasMany(models.File, { foreignKey: 'receptorId' });

  };

  return Receptor;
};

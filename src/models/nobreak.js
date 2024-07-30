const { DataTypes } = require('sequelize');
const { TypeCategoriaEnum } = require('./enums/TypeCategoria');
const { StatusEnum } = require('./enums/Status');

module.exports = (sequelize) => {
  const Nobreak = sequelize.define('Nobreak', {
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
    tensao_entrada: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tensao_saida: {
      type: DataTypes.INTEGER,
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
  }, {
    timestamps: true,
  });

  Nobreak.associate = function (models) {
    Nobreak.belongsTo(models.Quadro, { foreignKey: 'quadroId' });
    Nobreak.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
    Nobreak.hasMany(models.File, { foreignKey: 'nobreakId' });
  };

  return Nobreak;
};

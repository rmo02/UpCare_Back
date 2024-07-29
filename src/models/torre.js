const { TypeCategoriaEnum } = require('./enums/TypeCategoria');
const { TypeAterramentoEnum } = require('./enums/TypeAterramento');
const { TypePositionTorreEnum } = require('./enums/TypePositionTorre');
const { StatusEnum } = require('./enums/Status');

module.exports = (sequelize, DataTypes) => {
  const Torre = sequelize.define('Torre', {
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
    tipos_torre: {
      type: TypePositionTorreEnum,
      allowNull: false,
    },
    aterramento: {
      type: TypeAterramentoEnum,
      allowNull: false,
    },
    altura: {
      type: DataTypes.FLOAT,
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

  Torre.associate = function(models) {
    Torre.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
    Torre.hasMany(models.File, { foreignKey: 'torreId' });

  };

  return Torre;
};

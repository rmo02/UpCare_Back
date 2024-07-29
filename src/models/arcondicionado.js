const { DataTypes } = require('sequelize');
const { StatusEnum } = require('./enums/Status');
const { TypeCategoriaEnum } = require('./enums/TypeCategoria');

module.exports = (sequelize) => {
    const Arcondicionado = sequelize.define('Arcondicionado', {
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
        potencia: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        tensao: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: StatusEnum,
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
        });
      
        Arcondicionado.associate = function(models) {
          Arcondicionado.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
          Arcondicionado.belongsTo(models.File, { foreignKey: 'arcondicionadoId' });

        };

    return Arcondicionado;
};

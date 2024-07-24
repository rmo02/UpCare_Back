const { TypeCategoriaEnum } = require('./enums/TypeCategoria');
const { StatusEnum } = require('./enums/Status');

module.exports = (sequelize, DataTypes) => {
    const Exaustor = sequelize.define('Exaustor', {
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
        estacaoId: {
            type: DataTypes.UUID,
            references: {
              model: 'Estacaos',
              key: 'id',
            },
        },
    });

    Exaustor.associate = function(models) {
        Exaustor.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
    };

    return Exaustor;
};

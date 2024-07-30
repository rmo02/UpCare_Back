const { TypeCategoriaEnum } = require('./enums/TypeCategoria');
const { TypeCaboEnum } = require('./enums/TypeCabo');
const { StatusEnum } = require('./enums/Status');

module.exports = (sequelize, DataTypes) => {
    const Cabo = sequelize.define('Cabo', {
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
        tipos_cabo: {
            type: TypeCaboEnum,
            allowNull: false
        },
        tamanho: {
            type: DataTypes.FLOAT,
            allowNull: false
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

    Cabo.associate = function (models) {
        Cabo.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
        Cabo.hasMany(models.File, { foreignKey: 'caboId' });
    };

    return Cabo;
};

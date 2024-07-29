const { TypeCategoriaEnum } = require('./enums/TypeCategoria');
const { StatusEnum } = require('./enums/Status');

module.exports = (sequelize, DataTypes) => {
    const Combinador = sequelize.define('Combinador', {
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

    Combinador.associate = function(models) {
        Combinador.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
        Combinador.hasMany(models.File, { foreignKey: 'combinadorId' });
    };

    return Combinador;
};

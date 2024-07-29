const { TypeCategoriaEnum } = require('./enums/TypeCategoria');
const { StatusEnum } = require('./enums/Status');

module.exports = (sequelize, DataTypes) => {
    const Switch = sequelize.define('Switch', {
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
        qtd_portas: {
            type: DataTypes.INTEGER,
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

    Switch.associate = function(models) {
        Switch.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
        Switch.hasMany(models.File, { foreignKey: 'switchId' });

    };

    return Switch;
};

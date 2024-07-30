const { DataTypes } = require('sequelize');
const { TypeCategoriaEnum } = require('./enums/TypeCategoria');
const { TypeDpsEnum } = require('./enums/TypeDps');
const { StatusEnum } = require('./enums/Status');

module.exports = (sequelize) => {
    const Dps = sequelize.define('Dps', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        codigo: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false
        },
        modelo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categoria: {
            type: TypeCategoriaEnum,
            allowNull: false
        },
        status: {
            type: StatusEnum,
            allowNull: false
        },
        classe_dps: {
            type: TypeDpsEnum,
            allowNull: false
        },
        quadroId: {
            type: DataTypes.UUID,
            references: {
                model: 'Quadros',
                key: 'id'
            }
        },
        estacaoId: {
            type: DataTypes.UUID,
            references: {
                model: 'Estacaos',
                key: 'id'
            }
        }
    }, {
        timestamps: true,
    });

    Dps.associate = function (models) {
        Dps.belongsTo(models.Quadro, { foreignKey: 'quadroId' });
        Dps.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
        Dps.hasMany(models.File, { foreignKey: 'dpsId' });
    };

    return Dps;
}
const { DataTypes } = require('sequelize');
const { TypeEquipamentoEnum } = require('./enums/TypeEquipamento');

module.exports = (sequelize) => {
    const Checklist = sequelize.define('Checklist', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipoEquipamento: {
            type: TypeEquipamentoEnum,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });

    Checklist.associate = function (models) {
        Checklist.hasMany(models.Tarefa, { foreignKey: 'checklistId' });
        Checklist.belongsToMany(models.Manutencao, {
            through: 'ManutencaoChecklists',
            foreignKey: 'checklistId'
        });
    };

    return Checklist;
};

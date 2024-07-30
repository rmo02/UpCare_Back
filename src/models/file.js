const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const File = sequelize.define('File', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ['antenaId', 'caboId', 'arcondicionadoId', 'combinadorId', 'dpsId', 'estacaoId', 'exaustorId', 'nobreakId', 'parabolicaId', 'quadroId', 'receptorId', 'switchId', 'telemetriaId', 'torreId', 'transmissorId', 'disjuntorId'] },
    },
  });

  File.associate = function (models) {
    File.belongsTo(models.Antena, { foreignKey: 'antenaId', as: 'antena' });
    File.belongsTo(models.Cabo, { foreignKey: 'caboId', as: 'cabo' });
    File.belongsTo(models.Arcondicionado, { foreignKey: 'arcondicionadoId', as: 'arcondicionado' });
    File.belongsTo(models.Combinador, { foreignKey: 'combinadorId', as: 'combinador' });
    File.belongsTo(models.Dps, { foreignKey: 'dpsId', as: 'dps' });
    File.belongsTo(models.Estacao, { foreignKey: 'estacaoId', as: 'estacao' });
    File.belongsTo(models.Exaustor, { foreignKey: 'exaustorId', as: 'exaustor' });
    File.belongsTo(models.Nobreak, { foreignKey: 'nobreakId', as: 'nobreak' });
    File.belongsTo(models.Parabolica, { foreignKey: 'parabolicaId', as: 'parabolica' });
    File.belongsTo(models.Quadro, { foreignKey: 'quadroId', as: 'quadro' });
    File.belongsTo(models.Receptor, { foreignKey: 'receptorId', as: 'receptor' });
    File.belongsTo(models.Switch, { foreignKey: 'switchId', as: 'switch' });
    File.belongsTo(models.Telemetria, { foreignKey: 'telemetriaId', as: 'telemetria' });
    File.belongsTo(models.Torre, { foreignKey: 'torreId', as: 'torre' });
    File.belongsTo(models.Transmissor, { foreignKey: 'transmissorId', as: 'transmissor' });
    File.belongsTo(models.Disjuntor, { foreignKey: 'disjuntorId', as: 'disjuntor' });
  };

  return File;
};

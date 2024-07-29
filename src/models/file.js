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
    antenaId: {
      type: DataTypes.UUID,
      references: {
        model: 'Antenas',
        key: 'id',
      },
      allowNull: true,
    },
    caboId: {
      type: DataTypes.UUID,
      references: {
        model: 'Cabos',
        key: 'id',
      },
      allowNull: true,
    },
    arcondicionadoId: {
      type: DataTypes.UUID,
      references: {
        model: 'Arcondicionados',
        key: 'id',
      },
      allowNull: true,
    },
    combinadorId: {
      type: DataTypes.UUID,
      references: {
        model: 'Combinadors',
        key: 'id',
      },
      allowNull: true,
    },
    disjuntorId: {
      type: DataTypes.UUID,
      references: {
        model: 'Disjuntors',
        key: 'id',
      },
      allowNull: true,
    },
    dpsId: {
      type: DataTypes.UUID,
      references: {
        model: 'Dps',
        key: 'id',
      },
      allowNull: true,
    }, 
    estacaoId: {
      type: DataTypes.UUID,
      references: {
        model: 'Estacaos',
        key: 'id',
      },
      allowNull: true,
    },
    exaustorId: {
      type: DataTypes.UUID,
      references: {
        model: 'Exaustors',
        key: 'id',
      },
      allowNull: true,
    },
    nobreakId: {
      type: DataTypes.UUID,
      references: {
        model: 'Nobreaks',
        key: 'id',
      },
      allowNull: true,
    },
    parabolicaId: {
      type: DataTypes.UUID,
      references: {
        model: 'Parabolicas',
        key: 'id',
      },
      allowNull: true,
    },
    quadroId: {
      type: DataTypes.UUID,
      references: {
        model: 'Quadros',
        key: 'id',
      },
      allowNull: true,
    },
    receptorId: {
      type: DataTypes.UUID,
      references: {
        model: 'Receptors',
        key: 'id',
      },
      allowNull: true,
    },
    switchId: {
      type: DataTypes.UUID,
      references: {
        model: 'Switchs',
        key: 'id',
      },
      allowNull: true,
    },
    telemetriaId: {
      type: DataTypes.UUID,
      references: {
        model: 'Telemetrias',
        key: 'id',
      },
      allowNull: true,
    },
    torreId: {
      type: DataTypes.UUID,
      references: {
        model: 'Torres',
        key: 'id',
      },
      allowNull: true,
    },
    transmissorId: {
      type: DataTypes.UUID,
      references: {
        model: 'Transmissores',
        key: 'id',
      },
      allowNull: true,
    },
  });

  File.associate = function(models) {
    File.belongsTo(models.Antena, { foreignKey: 'antennaId' });
    File.belongsTo(models.Cabo, { foreignKey: 'caboId' });
    File.belongsTo(models.Arcondicionado, { foreignKey: 'arcondicionadoId' });
    File.belongsTo(models.Combinador, { foreignKey: 'combinadorId' });
    File.belongsTo(models.Dps, { foreignKey: 'dpsId' });
    File.belongsTo(models.Estacao, { foreignKey: 'estacaoId' });
    File.belongsTo(models.Exaustor, { foreignKey: 'exaustorId' });
    File.belongsTo(models.Nobreak, { foreignKey: 'nobreakId' });
    File.belongsTo(models.Parabolica, { foreignKey: 'parabolicaId' });
    File.belongsTo(models.Quadro, { foreignKey: 'quadroId' });
    File.belongsTo(models.Receptor, { foreignKey: 'receptorId' });
    File.belongsTo(models.Switch, { foreignKey: 'switchId' });
    File.belongsTo(models.Telemetria, { foreignKey: 'telemetriaId' });
    File.belongsTo(models.Torre, { foreignKey: 'torreId' });
    File.belongsTo(models.Transmissor, { foreignKey: 'transmissorId' });
  };

  return File;
};

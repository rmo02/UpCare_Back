'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Importa os modelos
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Define associações
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

async function syncModel(model, transaction) {
  try {
    await model.sync({ alter: true, transaction });
    console.log(`Synchronized ${model.name} successfully`);
  } catch (error) {
    console.error(`Error synchronizing ${model.name}:`, error);
    throw error;
  }
}

async function syncDatabase() {
  const modelsToSync = [
    db.Estacao,
    db.Quadro,
    db.Transmissor,
    db.Parabolica,
    db.Antena,
    db.Receptor,
    db.Arcondicionado,
    db.Cabo,
    db.Combinador,
    db.Disjuntor,
    db.Dps,
    db.Exaustor,
    db.Nobreak,
    db.Switch,
    db.Telemetria,
    db.Torre,
    db.Checklist,
    db.Tarefa,
    db.Manutencao,
    db.ManutencaoChecklists
  ];

  // Divida os modelos em grupos menores
  const groups = [];
  while (modelsToSync.length) {
    groups.push(modelsToSync.splice(0, 2)); // Grupos de 2 modelos
  }

  for (const group of groups) {
    const transaction = await sequelize.transaction();
    try {
      for (const model of group) {
        await syncModel(model, transaction);
      }
      await transaction.commit();
      console.log('Group synchronized successfully');
    } catch (error) {
      await transaction.rollback();
      console.error('Error synchronizing group:', error);
      throw error;
    }

    // Introduza um delay entre as sincronizações dos grupos
    await new Promise(resolve => setTimeout(resolve, 2500)); // 2500ms delay
  }

  console.log('Database synchronized successfully!');
}

syncDatabase();

module.exports = db;

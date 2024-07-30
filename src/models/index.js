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

async function syncModel(model, attempts = 5, delay = 2000) {
  for (let i = 0; i < attempts; i++) {
    try {
      await model.sync();
      console.log(`Synchronized ${model.name} successfully`);
      break;
    } catch (error) {
      if (i === attempts - 1) {
        console.error(`Error synchronizing ${model.name} after ${attempts} attempts:`, error);
        throw error;
      }
      console.warn(`Attempt ${i + 1} to synchronize ${model.name} failed. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

async function syncDatabase() {
  try {
    // Sincroniza os modelos de forma sequencial, respeitando as dependências
    await syncModel(db.Antena);
    await syncModel(db.Arcondicionado);
    await syncModel(db.Torre);
    await syncModel(db.Quadro);
    await syncModel(db.Checklist);
    await syncModel(db.Tarefa);
    await syncModel(db.Manutencao);
    await syncModel(db.ManutencaoChecklists);
    await syncModel(db.Cabo);
    await syncModel(db.Combinador);
    await syncModel(db.Disjuntor);
    await syncModel(db.Estacao);
    await syncModel(db.Dps);
    await syncModel(db.Exaustor);
    await syncModel(db.Nobreak);
    await syncModel(db.Telemetria);
    await syncModel(db.Transmissor);
    await syncModel(db.Parabolica);
    await syncModel(db.Receptor);
    await syncModel(db.Switch);
    await syncModel(db.File);

    console.log('Database synchronized successfully!');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

syncDatabase();

module.exports = db;

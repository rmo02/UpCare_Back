const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

//IMPORT ROTAS
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const createRoles = require('./seeders/createRoles');
const estacaoRoutes = require('./routes/estacaoRoutes');
const arcondicionadoRoutes = require('./routes/arcondicionadoRoutes');

const app = express();

app.use(bodyParser.json());

// Middleware de debug para visualizar as requisições recebidas
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/estacoes', estacaoRoutes);
app.use('/api/arcondicionado', arcondicionadoRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(async() => {
  await createRoles();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

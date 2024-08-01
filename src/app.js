const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');

// IMPORT ROTAS
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const createRoles = require('./seeders/createRoles');
const estacaoRoutes = require('./routes/estacaoRoutes');
const antenaRoutes = require('./routes/antenaRoutes');
const arcondicionadoRoutes = require('./routes/arcondicionadoRoutes');
const combinadorRoutes = require('./routes/combinadorRoutes');
const disjuntorRoutes = require('./routes/disjuntorRoutes');
const dpsRoutes = require('./routes/dpsRoutes');
const exaustorRoutes = require('./routes/exaustorRoutes');
const nobreakRoutes = require('./routes/nobreakRoutes');
const parabolicaRoutes = require('./routes/parabolicaRoutes');
const quadroRoutes = require('./routes/quadroRoutes');
const receptorRoutes = require('./routes/receptorRoutes');
const switchRoutes = require('./routes/switchRoutes');
const telemetriaRoutes = require('./routes/telemetriaRoutes');
const torreRoutes = require('./routes/torreRoutes');
const transmissorRoutes = require('./routes/transmissorRoutes');
const caboRoutes = require('./routes/caboRoutes');
const checklistRoutes = require('./routes/checklistRoutes');
const equipamentosRoutes = require('./routes/equipamentosRoutes');
const manutencaoRoutes = require('./routes/manutencaoRoutes');

const app = express();

// Configure o CORS
app.use(cors({
  origin: 'http://localhost:3001', // Permite apenas solicitações desse domínio
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Permite esses métodos HTTP
  allowedHeaders: ['Content-Type', 'Authorization'] // Permite esses cabeçalhos
}));

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// DEBUGANDO REQ APLICAÇÂO
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// ROTAS
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/estacoes', estacaoRoutes);
app.use('/api/arcondicionado', arcondicionadoRoutes);
app.use('/api/disjuntor', disjuntorRoutes);
app.use('/api/dps', dpsRoutes);
app.use('/api/antena', antenaRoutes);
app.use('/api/combinador', combinadorRoutes);
app.use('/api/exaustor', exaustorRoutes);
app.use('/api/nobreak', nobreakRoutes);
app.use('/api/parabolica', parabolicaRoutes);
app.use('/api/quadro', quadroRoutes);
app.use('/api/receptor', receptorRoutes);
app.use('/api/switch', switchRoutes);
app.use('/api/telemetria', telemetriaRoutes);
app.use('/api/torre', torreRoutes);
app.use('/api/transmissor', transmissorRoutes);
app.use('/api/cabo', caboRoutes);
app.use('/api/checklist', checklistRoutes);
app.use('/api/manutencao', manutencaoRoutes);
app.use('/api/equipamentos', equipamentosRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(async () => {
  await createRoles();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to sync database:', error);
});

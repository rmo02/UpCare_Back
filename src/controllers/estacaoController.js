const { Estacao, Arcondicionado, Disjuntor, Quadro } = require('../models');

// Create a new Estacao
exports.createEstacao = async (req, res) => {
  const { name, latitude, longitude, address, link_grafana, status } = req.body;
  try {
    const estacao = await Estacao.create({ name, latitude, longitude, address, link_grafana, status });
    res.status(201).json(estacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obter todas as Estações
exports.getAllEstacoes = async (req, res) => {
  try {
    const estacoes = await Estacao.findAll({
      include: [
        Arcondicionado, Quadro, Disjuntor
      ]
    });
    res.status(200).json(estacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter Estação por ID
exports.getEstacaoById = async (req, res) => {
  const { id } = req.params;
  try {
    const estacao = await Estacao.findByPk(id, {
      include: [
        Arcondicionado, Quadro, Disjuntor
      ]
    });
    if (!estacao) {
      return res.status(404).json({ error: 'Estação não encontrada' });
    }
    res.status(200).json(estacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Estacao by ID
exports.updateEstacao = async (req, res) => {
  const { id } = req.params;
  const { name, latitude, longitude, address, link_grafana, status } = req.body;
  try {
    const estacao = await Estacao.findByPk(id);
    if (!estacao) {
      return res.status(404).json({ error: 'Estação não encontrada' });
    }
    await estacao.update({ name, latitude, longitude, address, link_grafana, status });
    res.status(200).json(estacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Estacao by ID
exports.deleteEstacao = async (req, res) => {
  const { id } = req.params;
  try {
    const estacao = await Estacao.findByPk(id);
    if (!estacao) {
      return res.status(404).json({ error: 'Estação não encontrada' });
    }
    await estacao.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const { Manutencao } = require('../models');

const createManutencao = async (req, res) => {
  const { estacaoId, checklistId, data } = req.body;

  try {
    const manutencao = await Manutencao.create({ estacaoId, checklistId, data });

    res.status(201).json(manutencao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createManutencao,
};

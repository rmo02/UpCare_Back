const { Dps, Quadro, Estacao } = require('../models');

// Criar um novo Dps
exports.createDps = async (req, res) => {
  try {
    const { codigo, marca, modelo, categoria, status, classe_dps, quadroId, estacaoId } = req.body;

    // Validar entrada
    if (!codigo || !marca || !modelo || !categoria || !status || classe_dps === undefined) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const dps = await Dps.create({
      codigo,
      marca,
      modelo,
      categoria,
      status,
      classe_dps,
      quadroId,
      estacaoId
    });

    return res.status(201).json(dps);
  } catch (error) {
    console.error('Erro ao criar Dps:', error);
    return res.status(500).json({ error: 'Erro ao criar Dps.' });
  }
};

// Obter todos os Dps
exports.getAllDps = async (req, res) => {
  try {
    const dps = await Dps.findAll({
      include: [Quadro, Estacao]
    });
    return res.status(200).json(dps);
  } catch (error) {
    console.error('Erro ao obter Dps:', error);
    return res.status(500).json({ error: 'Erro ao obter Dps.' });
  }
};

// Obter um Dps por ID
exports.getDpsById = async (req, res) => {
  try {
    const { id } = req.params;

    const dps = await Dps.findByPk(id, {
      include: [Quadro, Estacao]
    });
    if (!dps) {
      return res.status(404).json({ error: 'Dps não encontrado.' });
    }

    return res.status(200).json(dps);
  } catch (error) {
    console.error('Erro ao obter Dps:', error);
    return res.status(500).json({ error: 'Erro ao obter Dps.' });
  }
};

// Atualizar um Dps por ID
exports.updateDps = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, marca, modelo, categoria, status, classe_dps, quadroId, estacaoId } = req.body;

    const dps = await Dps.findByPk(id);
    if (!dps) {
      return res.status(404).json({ error: 'Dps não encontrado.' });
    }

    await disjuntor.update({
      codigo,
      marca,
      modelo,
      categoria,
      status,
      classe_dps,
      quadroId,
      estacaoId
    });

    return res.status(200).json(dps);
  } catch (error) {
    console.error('Erro ao atualizar Dps:', error);
    return res.status(500).json({ error: 'Erro ao atualizar Dps.' });
  }
};

// Deletar um Dps por ID
exports.deleteDps = async (req, res) => {
  try {
    const { id } = req.params;

    const dps = await Dps.findByPk(id);
    if (!dps) {
      return res.status(404).json({ error: 'Dps não encontrado.' });
    }

    await dps.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Dps:', error);
    return res.status(500).json({ error: 'Erro ao deletar Dps.' });
  }
};

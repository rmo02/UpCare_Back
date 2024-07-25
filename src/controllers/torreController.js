const { Torre, Estacao } = require('../models');

// Criar uma nova Torre
exports.createTorre = async (req, res) => {
  try {
    const { codigo, marca, modelo, categoria, status, tipos_torre, aterramento, altura, estacaoId } = req.body;

    // Validar entrada
    if (!codigo || !marca || !modelo || !categoria || !status || !tipos_torre || !aterramento || !altura) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const torre = await Torre.create({ codigo, marca, modelo, categoria, status, tipos_torre, aterramento, altura, estacaoId });

    return res.status(201).json(torre);
  } catch (error) {
    console.error('Erro ao criar Torre:', error);
    return res.status(500).json({ error: 'Erro ao criar Torre.' });
  }
};

// Obter todas as Torres
exports.getAllTorres = async (req, res) => {
  try {
    const torres = await Torre.findAll({
      include: [Estacao]
    });
    return res.status(200).json(torres);
  } catch (error) {
    console.error('Erro ao obter Torres:', error);
    return res.status(500).json({ error: 'Erro ao obter Torres.' });
  }
};

// Obter uma Torre por ID
exports.getTorreById = async (req, res) => {
  try {
    const { id } = req.params;

    const torre = await Torre.findByPk(id, {
      include: [Estacao]
    });
    if (!torre) {
      return res.status(404).json({ error: 'Torre não encontrada.' });
    }

    return res.status(200).json(torre);
  } catch (error) {
    console.error('Erro ao obter Torre:', error);
    return res.status(500).json({ error: 'Erro ao obter Torre.' });
  }
};

// Atualizar uma Torre por ID
exports.updateTorre = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, marca, modelo, categoria, status, tipos_torre, aterramento, altura, estacaoId } = req.body;

    const torre = await Torre.findByPk(id);
    if (!torre) {
      return res.status(404).json({ error: 'Torre não encontrada.' });
    }

    await torre.update({ codigo, marca, modelo, categoria, status, tipos_torre, aterramento, altura, estacaoId });

    return res.status(200).json(torre);
  } catch (error) {
    console.error('Erro ao atualizar Torre:', error);
    return res.status(500).json({ error: 'Erro ao atualizar Torre.' });
  }
};

// Deletar uma Torre por ID
exports.deleteTorre = async (req, res) => {
  try {
    const { id } = req.params;

    const torre = await Torre.findByPk(id);
    if (!torre) {
      return res.status(404).json({ error: 'Torre não encontrada.' });
    }

    await torre.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Torre:', error);
    return res.status(500).json({ error: 'Erro ao deletar Torre.' });
  }
};

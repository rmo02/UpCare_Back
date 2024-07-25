const { Combinador, Estacao } = require('../models');

// Criar um novo Combinador
exports.createCombinador = async (req, res) => {
  try {
    const { codigo, marca, modelo, categoria, status, estacaoId } = req.body;

    // Validar entrada
    if (!codigo || !marca || !modelo || !categoria || !status) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const combinador = await Combinador.create({ codigo, marca, modelo, categoria, status, estacaoId });

    return res.status(201).json(combinador);
  } catch (error) {
    console.error('Erro ao criar Combinador:', error);
    return res.status(500).json({ error: 'Erro ao criar Combinador.' });
  }
};

// Obter todos os Combinadores
exports.getAllCombinadores = async (req, res) => {
  try {
    const combinadores = await Combinador.findAll({
      include: [Estacao]
    });
    return res.status(200).json(combinadores);
  } catch (error) {
    console.error('Erro ao obter Combinadores:', error);
    return res.status(500).json({ error: 'Erro ao obter Combinadores.' });
  }
};

// Obter um Combinador por ID
exports.getCombinadorById = async (req, res) => {
  try {
    const { id } = req.params;

    const combinador = await Combinador.findByPk(id, {
      include: [Estacao]
    });
    if (!combinador) {
      return res.status(404).json({ error: 'Combinador não encontrado.' });
    }

    return res.status(200).json(combinador);
  } catch (error) {
    console.error('Erro ao obter Combinador:', error);
    return res.status(500).json({ error: 'Erro ao obter Combinador.' });
  }
};

// Atualizar um Combinador por ID
exports.updateCombinador = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, marca, modelo, categoria, status, estacaoId } = req.body;

    const combinador = await Combinador.findByPk(id);
    if (!combinador) {
      return res.status(404).json({ error: 'Combinador não encontrado.' });
    }

    await combinador.update({ codigo, marca, modelo, categoria, status, estacaoId });

    return res.status(200).json(combinador);
  } catch (error) {
    console.error('Erro ao atualizar Combinador:', error);
    return res.status(500).json({ error: 'Erro ao atualizar Combinador.' });
  }
};

// Deletar um Combinador por ID
exports.deleteCombinador = async (req, res) => {
  try {
    const { id } = req.params;

    const combinador = await Combinador.findByPk(id);
    if (!combinador) {
      return res.status(404).json({ error: 'Combinador não encontrado.' });
    }

    await combinador.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Combinador:', error);
    return res.status(500).json({ error: 'Erro ao deletar Combinador.' });
  }
};

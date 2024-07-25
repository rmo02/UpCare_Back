const { Cabo, Estacao } = require('../models');

// Criar um novo Cabo
exports.createCabo = async (req, res) => {
  try {
    const { codigo, marca, modelo, categoria, status, tipos_cabo, tamanho, estacaoId } = req.body;

    // Validar entrada
    if (!codigo || !marca || !modelo || !categoria || !status || !tipos_cabo || !tamanho) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const cabo = await Cabo.create({ codigo, marca, modelo, categoria, status, tipos_cabo, tamanho, estacaoId });

    return res.status(201).json(cabo);
  } catch (error) {
    console.error('Erro ao criar Cabo:', error);
    return res.status(500).json({ error: 'Erro ao criar Cabo.' });
  }
};

// Obter todos os Cabos
exports.getAllCabos = async (req, res) => {
  try {
    const cabos = await Cabo.findAll({
      include: [Estacao]
    });
    return res.status(200).json(cabos);
  } catch (error) {
    console.error('Erro ao obter Cabos:', error);
    return res.status(500).json({ error: 'Erro ao obter Cabos.' });
  }
};

// Obter um Cabo por ID
exports.getCaboById = async (req, res) => {
  try {
    const { id } = req.params;

    const cabo = await Cabo.findByPk(id, {
      include: [Estacao]
    });
    if (!cabo) {
      return res.status(404).json({ error: 'Cabo não encontrado.' });
    }

    return res.status(200).json(cabo);
  } catch (error) {
    console.error('Erro ao obter Cabo:', error);
    return res.status(500).json({ error: 'Erro ao obter Cabo.' });
  }
};

// Atualizar um Cabo por ID
exports.updateCabo = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, marca, modelo, categoria, status, tipos_cabo, tamanho, estacaoId } = req.body;

    const cabo = await Cabo.findByPk(id);
    if (!cabo) {
      return res.status(404).json({ error: 'Cabo não encontrado.' });
    }

    await cabo.update({ codigo, marca, modelo, categoria, status, tipos_cabo, tamanho, estacaoId });

    return res.status(200).json(cabo);
  } catch (error) {
    console.error('Erro ao atualizar Cabo:', error);
    return res.status(500).json({ error: 'Erro ao atualizar Cabo.' });
  }
};

// Deletar um Cabo por ID
exports.deleteCabo = async (req, res) => {
  try {
    const { id } = req.params;

    const cabo = await Cabo.findByPk(id);
    if (!cabo) {
      return res.status(404).json({ error: 'Cabo não encontrado.' });
    }

    await cabo.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Cabo:', error);
    return res.status(500).json({ error: 'Erro ao deletar Cabo.' });
  }
};

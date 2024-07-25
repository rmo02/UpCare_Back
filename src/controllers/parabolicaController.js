const { Parabolica, Estacao, Receptor } = require('../models');

// Criar uma nova Parabólica
exports.createParabolica = async (req, res) => {
  try {
    const { codigo, marca, modelo, categoria, status, diametro, satelite, estacaoId } = req.body;

    // Validar entrada
    if (!codigo || !marca || !modelo || !categoria || !status || !diametro || !satelite) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const parabolica = await Parabolica.create({ codigo, marca, modelo, categoria, status, diametro, satelite, estacaoId });

    return res.status(201).json(parabolica);
  } catch (error) {
    console.error('Erro ao criar Parabólica:', error);
    return res.status(500).json({ error: 'Erro ao criar Parabólica.' });
  }
};

// Obter todas as Parabólicas
exports.getAllParabolicas = async (req, res) => {
  try {
    const parabolicas = await Parabolica.findAll({
      include: [Estacao, Receptor]
    });
    return res.status(200).json(parabolicas);
  } catch (error) {
    console.error('Erro ao obter Parabólicas:', error);
    return res.status(500).json({ error: 'Erro ao obter Parabólicas.' });
  }
};

// Obter uma Parabólica por ID
exports.getParabolicaById = async (req, res) => {
  try {
    const { id } = req.params;

    const parabolica = await Parabolica.findByPk(id, {
      include: [Estacao, Receptor]
    });
    if (!parabolica) {
      return res.status(404).json({ error: 'Parabólica não encontrada.' });
    }

    return res.status(200).json(parabolica);
  } catch (error) {
    console.error('Erro ao obter Parabólica:', error);
    return res.status(500).json({ error: 'Erro ao obter Parabólica.' });
  }
};

// Atualizar uma Parabólica por ID
exports.updateParabolica = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, marca, modelo, categoria, status, diametro, satelite, estacaoId } = req.body;

    const parabolica = await Parabolica.findByPk(id);
    if (!parabolica) {
      return res.status(404).json({ error: 'Parabólica não encontrada.' });
    }

    await parabolica.update({ codigo, marca, modelo, categoria, status, diametro, satelite, estacaoId });

    return res.status(200).json(parabolica);
  } catch (error) {
    console.error('Erro ao atualizar Parabólica:', error);
    return res.status(500).json({ error: 'Erro ao atualizar Parabólica.' });
  }
};

// Deletar uma Parabólica por ID
exports.deleteParabolica = async (req, res) => {
  try {
    const { id } = req.params;

    const parabolica = await Parabolica.findByPk(id);
    if (!parabolica) {
      return res.status(404).json({ error: 'Parabólica não encontrada.' });
    }

    await parabolica.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Parabólica:', error);
    return res.status(500).json({ error: 'Erro ao deletar Parabólica.' });
  }
};

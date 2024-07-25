const { Antena, Transmissor, Estacao } = require('../models');

// Criar um novo Antena
exports.createAntena = async (req, res) => {
  try {
    const { codigo, marca, modelo, categoria, status, gain, tipos_antena, position_torre, vr, transmissorId, estacaoId } = req.body;

    // Validar entrada
    if (!codigo || !marca || !modelo || !categoria || !status || !gain || !tipos_antena || !position_torre || !vr) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const antena = await Antena.create({ codigo, marca, modelo, categoria, status, gain, tipos_antena, position_torre, vr, transmissorId, estacaoId });

    return res.status(201).json(antena);
  } catch (error) {
    console.error('Erro ao criar Antena:', error);
    return res.status(500).json({ error: 'Erro ao criar Antena.' });
  }
};

// Obter todos os Antenas
exports.getAllAntenas = async (req, res) => {
  try {
    const antenas = await Antena.findAll({
      include: [Transmissor, Estacao]
    });
    return res.status(200).json(antenas);
  } catch (error) {
    console.error('Erro ao obter Antenas:', error);
    return res.status(500).json({ error: 'Erro ao obter Antenas.' });
  }
};

// Obter um Antena por ID
exports.getAntenaById = async (req, res) => {
  try {
    const { id } = req.params;

    const antena = await Antena.findByPk(id, {
      include: [Transmissor, Estacao]
    });
    if (!antena) {
      return res.status(404).json({ error: 'Antena não encontrada.' });
    }

    return res.status(200).json(antena);
  } catch (error) {
    console.error('Erro ao obter Antena:', error);
    return res.status(500).json({ error: 'Erro ao obter Antena.' });
  }
};

// Atualizar um Antena por ID
exports.updateAntena = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, marca, modelo, categoria, status, gain, tipos_antena, position_torre, vr, transmissorId, estacaoId } = req.body;

    const antena = await Antena.findByPk(id);
    if (!antena) {
      return res.status(404).json({ error: 'Antena não encontrada.' });
    }

    await antena.update({ codigo, marca, modelo, categoria, status, gain, tipos_antena, position_torre, vr, transmissorId, estacaoId });

    return res.status(200).json(antena);
  } catch (error) {
    console.error('Erro ao atualizar Antena:', error);
    return res.status(500).json({ error: 'Erro ao atualizar Antena.' });
  }
};

// Deletar um Antena por ID
exports.deleteAntena = async (req, res) => {
  try {
    const { id } = req.params;

    const antena = await Antena.findByPk(id);
    if (!antena) {
      return res.status(404).json({ error: 'Antena não encontrada.' });
    }

    await antena.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Antena:', error);
    return res.status(500).json({ error: 'Erro ao deletar Antena.' });
  }
};

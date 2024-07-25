const { Transmissor, Estacao, Receptor, Antena } = require('../models');

// Criar um novo Transmissor
exports.createTransmissor = async (req, res) => {
  try {
    const { codigo, marca, modelo, categoria, status, programmed, canal_fisico, canal_virtual, acoplador_one, acoplador_two, estacaoId } = req.body;

    // Validar entrada
    if (!codigo || !marca || !modelo || !categoria || !status || !programmed || !canal_fisico || !canal_virtual || !acoplador_one || !acoplador_two) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const transmissor = await Transmissor.create({ codigo, marca, modelo, categoria, status, programmed, canal_fisico, canal_virtual, acoplador_one, acoplador_two, estacaoId });

    return res.status(201).json(transmissor);
  } catch (error) {
    console.error('Erro ao criar Transmissor:', error);
    return res.status(500).json({ error: 'Erro ao criar Transmissor.' });
  }
};

// Obter todos os Transmissores
exports.getAllTransmissores = async (req, res) => {
  try {
    const transmissores = await Transmissor.findAll({
      include: [Estacao, Receptor, Antena]
    });
    return res.status(200).json(transmissores);
  } catch (error) {
    console.error('Erro ao obter Transmissores:', error);
    return res.status(500).json({ error: 'Erro ao obter Transmissores.' });
  }
};

// Obter um Transmissor por ID
exports.getTransmissorById = async (req, res) => {
  try {
    const { id } = req.params;

    const transmissor = await Transmissor.findByPk(id, {
      include: [Estacao, Receptor, Antena]
    });
    if (!transmissor) {
      return res.status(404).json({ error: 'Transmissor não encontrado.' });
    }

    return res.status(200).json(transmissor);
  } catch (error) {
    console.error('Erro ao obter Transmissor:', error);
    return res.status(500).json({ error: 'Erro ao obter Transmissor.' });
  }
};

// Atualizar um Transmissor por ID
exports.updateTransmissor = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, marca, modelo, categoria, status, programmed, canal_fisico, canal_virtual, acoplador_one, acoplador_two, estacaoId } = req.body;

    const transmissor = await Transmissor.findByPk(id);
    if (!transmissor) {
      return res.status(404).json({ error: 'Transmissor não encontrado.' });
    }

    await transmissor.update({ codigo, marca, modelo, categoria, status, programmed, canal_fisico, canal_virtual, acoplador_one, acoplador_two, estacaoId });

    return res.status(200).json(transmissor);
  } catch (error) {
    console.error('Erro ao atualizar Transmissor:', error);
    return res.status(500).json({ error: 'Erro ao atualizar Transmissor.' });
  }
};

// Deletar um Transmissor por ID
exports.deleteTransmissor = async (req, res) => {
  try {
    const { id } = req.params;

    const transmissor = await Transmissor.findByPk(id);
    if (!transmissor) {
      return res.status(404).json({ error: 'Transmissor não encontrado.' });
    }

    await transmissor.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Transmissor:', error);
    return res.status(500).json({ error: 'Erro ao deletar Transmissor.' });
  }
};

const { Switch, Estacao } = require('../models');

// Criar um novo Switch
exports.createSwitch = async (req, res) => {
  try {
    const { codigo, marca, modelo, categoria, status, qtd_portas, estacaoId } = req.body;

    // Validar entrada
    if (!codigo || !marca || !modelo || !categoria || !status || qtd_portas === undefined) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const switchInstance = await Switch.create({ codigo, marca, modelo, categoria, status, qtd_portas, estacaoId });

    return res.status(201).json(switchInstance);
  } catch (error) {
    console.error('Erro ao criar Switch:', error);
    return res.status(500).json({ error: 'Erro ao criar Switch.' });
  }
};

// Obter todos os Switches
exports.getAllSwitches = async (req, res) => {
  try {
    const switches = await Switch.findAll({
      include: [Estacao]
    });
    return res.status(200).json(switches);
  } catch (error) {
    console.error('Erro ao obter Switches:', error);
    return res.status(500).json({ error: 'Erro ao obter Switches.' });
  }
};

// Obter um Switch por ID
exports.getSwitchById = async (req, res) => {
  try {
    const { id } = req.params;

    const switchInstance = await Switch.findByPk(id, {
      include: [Estacao]
    });
    if (!switchInstance) {
      return res.status(404).json({ error: 'Switch não encontrado.' });
    }

    return res.status(200).json(switchInstance);
  } catch (error) {
    console.error('Erro ao obter Switch:', error);
    return res.status(500).json({ error: 'Erro ao obter Switch.' });
  }
};

// Atualizar um Switch por ID
exports.updateSwitch = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, marca, modelo, categoria, status, qtd_portas, estacaoId } = req.body;

    const switchInstance = await Switch.findByPk(id);
    if (!switchInstance) {
      return res.status(404).json({ error: 'Switch não encontrado.' });
    }

    await switchInstance.update({ codigo, marca, modelo, categoria, status, qtd_portas, estacaoId });

    return res.status(200).json(switchInstance);
  } catch (error) {
    console.error('Erro ao atualizar Switch:', error);
    return res.status(500).json({ error: 'Erro ao atualizar Switch.' });
  }
};

// Deletar um Switch por ID
exports.deleteSwitch = async (req, res) => {
  try {
    const { id } = req.params;

    const switchInstance = await Switch.findByPk(id);
    if (!switchInstance) {
      return res.status(404).json({ error: 'Switch não encontrado.' });
    }

    await switchInstance.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Switch:', error);
    return res.status(500).json({ error: 'Erro ao deletar Switch.' });
  }
};

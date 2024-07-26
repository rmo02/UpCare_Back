const { Manutencao, ManutencaoChecklists, Checklist, Tarefa } = require('../models');

exports.createManutencao = async (req, res) => {
  const { estacaoId, checklists, data, status } = req.body;

  try {
    console.log('Recebendo dados:', { estacaoId, checklists, data, status });

    // Verifique se checklists é um array e não é nulo
    if (!Array.isArray(checklists)) {
      return res.status(400).json({ error: 'Checklists must be an array' });
    }

    // Criação da manutenção
    const manutencao = await Manutencao.create({
      estacaoId,
      data,
      status
    });

    console.log('Manutenção criada:', manutencao);

    // Criação das associações com checklists
    if (checklists.length > 0) {
      const manutencaoChecklists = checklists.map(checklistId => ({
        manutencaoId: manutencao.id,
        checklistId
      }));

      console.log('Associações de Manutenção e Checklists:', manutencaoChecklists);

      await ManutencaoChecklists.bulkCreate(manutencaoChecklists);
    }

    res.status(201).json(manutencao);
  } catch (error) {
    console.error('Erro ao criar manutenção:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllManutencoes = async (req, res) => {
  try {
    const manutencoes = await Manutencao.findAll({
      include: {
        model: Checklist,
        include: {
          model: Tarefa,
        },
      },
    });
    res.status(200).json(manutencoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getManutencaoById = async (req, res) => {
  const { id } = req.params;

  try {
    const manutencao = await Manutencao.findByPk(id, {
      include: {
        model: Checklist,
        include: {
          model: Tarefa,
        },
      },
    });
    if (!manutencao) {
      return res.status(404).json({ error: 'Manutenção não encontrada' });
    }
    res.status(200).json(manutencao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateManutencao = async (req, res) => {
  const { id } = req.params;
  const { estacaoId, checklistIds, data, status } = req.body;

  try {
    const manutencao = await Manutencao.findByPk(id);
    if (!manutencao) {
      return res.status(404).json({ error: 'Manutenção não encontrada' });
    }

    // Atualizar os dados da manutenção
    manutencao.estacaoId = estacaoId;
    manutencao.data = data;
    manutencao.status = status; // Corrigido para 'status'
    await manutencao.save();

    // Atualizar checklists associados
    await ManutencaoChecklists.destroy({ where: { manutencaoId: id } }); // Remover associações antigas
    const checklistAssociations = checklistIds.map(checklistId => ({
      manutencaoId: manutencao.id,
      checklistId,
    }));

    await ManutencaoChecklists.bulkCreate(checklistAssociations);

    res.status(200).json(manutencao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteManutencao = async (req, res) => {
  const { id } = req.params;

  try {
    const manutencao = await Manutencao.findByPk(id);
    if (!manutencao) {
      return res.status(404).json({ error: 'Manutenção não encontrada' });
    }

    await manutencao.destroy();

    // Remover associações dos checklists
    await ManutencaoChecklists.destroy({ where: { manutencaoId: id } });

    res.status(200).json({ message: 'Manutenção deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

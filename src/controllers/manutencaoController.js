const { Manutencao, ManutencaoChecklists, Checklist, Tarefa, EquipamentoChecklists } = require('../models');

exports.createManutencao = async (req, res) => {
  const { estacaoId, checklists, data, status, tecnicoId, tipomanutencao } = req.body;

  try {
    console.log('Recebendo dados:', { estacaoId, checklists, data, status, tecnicoId, tipomanutencao });

    // Verifique se checklists é um array e não é nulo
    if (!Array.isArray(checklists)) {
      return res.status(400).json({ error: 'Checklists must be an array' });
    }

    // Criação da manutenção
    const manutencao = await Manutencao.create({
      estacaoId,
      tecnicoId,
      data,
      status,
      tipomanutencao
    });

    console.log('Manutenção criada:', manutencao);

    // Criação das associações com checklists e equipamentos
    if (checklists.length > 0) {
      const manutencaoChecklists = checklists.map(({ checklistId, equipamentoId }) => ({
        manutencaoId: manutencao.id,
        checklistId
      }));

      console.log('Associações de Manutenção e Checklists:', manutencaoChecklists);

      await ManutencaoChecklists.bulkCreate(manutencaoChecklists);

      const equipamentoChecklists = checklists.map(({ checklistId, equipamentoId }) => ({
        equipamentoId,
        checklistId
      }));

      console.log('Associações de Equipamento e Checklists:', equipamentoChecklists);

      await EquipamentoChecklists.bulkCreate(equipamentoChecklists);
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
    res.status (500).json({ error: error.message });
  }
};

exports.updateManutencao = async (req, res) => {
  const { id } = req.params;
  const { estacaoId, checklists, data, status, tecnicoId, tipomanutencao } = req.body;

  try {
    const manutencao = await Manutencao.findByPk(id);
    if (!manutencao) {
      return res.status(404).json({ error: 'Manutenção não encontrada' });
    }

    // Atualizar os dados da manutenção
    manutencao.estacaoId = estacaoId;
    manutencao.tecnicoId = tecnicoId;
    manutencao.data = data;
    manutencao.status = status;
    manutencao.tipomanutencao = tipomanutencao;
    await manutencao.save();

    // Atualizar checklists associados
    await ManutencaoChecklists.destroy({ where: { manutencaoId: id } }); // Remover associações antigas
    const manutencaoChecklists = checklists.map(({ checklistId }) => ({
      manutencaoId: manutencao.id,
      checklistId,
    }));

    await ManutencaoChecklists.bulkCreate(manutencaoChecklists);

    // Atualizar associações dos equipamentos
    await EquipamentoChecklists.destroy({ where: { checklistId: checklists.map(c => c.checklistId) } });
    const equipamentoChecklists = checklists.map(({ checklistId, equipamentoId }) => ({
      equipamentoId,
      checklistId,
    }));

    await EquipamentoChecklists.bulkCreate(equipamentoChecklists);

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

const { Checklist, Tarefa } = require('../models');

exports.createChecklist = async (req, res) => {
  const { nome, tipoEquipamento, tarefas } = req.body;

  if (!nome || !tipoEquipamento) {
    return res.status(400).json({ error: 'Nome e tipoEquipamento são obrigatórios' });
  }

  try {
    const checklist = await Checklist.create({ nome, tipoEquipamento });

    if (tarefas && tarefas.length > 0) {
      const tarefasCriadas = tarefas.map(tarefa => ({
        ...tarefa,
        checklistId: checklist.id,
      }));

      await Tarefa.bulkCreate(tarefasCriadas);
    }

    res.status(201).json(checklist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllChecklists = async (req, res) => {
  try {
    const checklists = await Checklist.findAll({ include: Tarefa });
    res.status(200).json(checklists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getChecklistById = async (req, res) => {
  const { id } = req.params;

  try {
    const checklist = await Checklist.findByPk(id, { include: Tarefa });
    if (!checklist) {
      return res.status(404).json({ error: 'Checklist não encontrado' });
    }
    res.status(200).json(checklist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateChecklist = async (req, res) => {
  const { id } = req.params;
  const { nome, tipoEquipamento, tarefas } = req.body;

  if (!nome || !tipoEquipamento) {
    return res.status(400).json({ error: 'Nome e tipoEquipamento são obrigatórios' });
  }

  try {
    const checklist = await Checklist.findByPk(id);
    if (!checklist) {
      return res.status(404).json({ error: 'Checklist não encontrado' });
    }

    checklist.nome = nome;
    checklist.tipoEquipamento = tipoEquipamento;
    await checklist.save();

    if (tarefas && tarefas.length > 0) {
      await Tarefa.destroy({ where: { checklistId: id } });
      const tarefasCriadas = tarefas.map(tarefa => ({
        ...tarefa,
        checklistId: checklist.id,
      }));
      await Tarefa.bulkCreate(tarefasCriadas);
    }

    res.status(200).json(checklist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteChecklist = async (req, res) => {
  const { id } = req.params;

  try {
    const checklist = await Checklist.findByPk(id);
    if (!checklist) {
      return res.status(404).json({ error: 'Checklist não encontrado' });
    }

    await Tarefa.destroy({ where: { checklistId: id } });
    await checklist.destroy();

    res.status(200).json({ message: 'Checklist deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

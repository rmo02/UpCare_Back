const { Checklist, Tarefa } = require('../models');

const createChecklist = async (req, res) => {
  const { nome, tipoEquipamento, tarefas } = req.body;

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

module.exports = {
  createChecklist,
};

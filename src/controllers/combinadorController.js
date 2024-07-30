const { Combinador, Estacao, File } = require('../models');

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

    await File.destroy({ where: { combinadorId: combinador.id } });

    // Processar e armazenar novos arquivos
    if (req.files) {
      const fileFields = ['files1', 'files2', 'files3'];
      let fileCount = 0;

      for (const field of fileFields) {
        if (req.files[field]) {
          const file = req.files[field][0];
          const filePath = path.join('uploads', file.filename);

          if (fileCount < 3) {
            await File.create({
              filename: file.filename,
              mimetype: file.mimetype,
              size: file.size,
              url: filePath,
              combinadorId: combinador.id
            });
            fileCount++;
          }
        }
      }
    }


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

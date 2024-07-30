const { Quadro, Estacao, File } = require('../models');

// Criar um novo Quadro
exports.createQuadro = async (req, res) => {
  try {
    const { codigo, categoria, estacaoId } = req.body;

    // Validar entrada
    if (!codigo || !categoria) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const quadro = await Quadro.create({ codigo, categoria, estacaoId });

    return res.status(201).json(quadro);
  } catch (error) {
    console.error('Erro ao criar Quadro:', error);
    return res.status(500).json({ error: 'Erro ao criar Quadro.' });
  }
};

// Obter todos os Quadros
exports.getAllQuadros = async (req, res) => {
  try {
    const quadros = await Quadro.findAll({
      include: [Estacao]
    });
    return res.status(200).json(quadros);
  } catch (error) {
    console.error('Erro ao obter Quadros:', error);
    return res.status(500).json({ error: 'Erro ao obter Quadros.' });
  }
};

// Obter um Quadro por ID
exports.getQuadroById = async (req, res) => {
  try {
    const { id } = req.params;

    const quadro = await Quadro.findByPk(id, {
      include: [Estacao]
    });
    if (!quadro) {
      return res.status(404).json({ error: 'Quadro não encontrado.' });
    }

    return res.status(200).json(quadro);
  } catch (error) {
    console.error('Erro ao obter Quadro:', error);
    return res.status(500).json({ error: 'Erro ao obter Quadro.' });
  }
};

// Atualizar um Quadro por ID
exports.updateQuadro = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, categoria, estacaoId } = req.body;

    const quadro = await Quadro.findByPk(id);
    if (!quadro) {
      return res.status(404).json({ error: 'Quadro não encontrado.' });
    }

    await quadro.update({ codigo, categoria, estacaoId });

    // Remover arquivos existentes
    await File.destroy({ where: { quadroId: quadro.id } });

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
              quadroId: quadro.id
            });
            fileCount++;
          }
        }
      }
    }

    return res.status(200).json(quadro);
  } catch (error) {
    console.error('Erro ao atualizar Quadro:', error);
    return res.status(500).json({ error: 'Erro ao atualizar Quadro.' });
  }
};

// Deletar um Quadro por ID
exports.deleteQuadro = async (req, res) => {
  try {
    const { id } = req.params;

    const quadro = await Quadro.findByPk(id);
    if (!quadro) {
      return res.status(404).json({ error: 'Quadro não encontrado.' });
    }

    await quadro.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Quadro:', error);
    return res.status(500).json({ error: 'Erro ao deletar Quadro.' });
  }
};

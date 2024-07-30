const { Exaustor, Estacao, File } = require('../models');

// Criar um novo Exaustor
exports.createExaustor = async (req, res) => {
  try {
    const { codigo, marca, modelo, categoria, status, estacaoId } = req.body;

    // Validar entrada
    if (!codigo || !marca || !modelo || !categoria || !status) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const exaustor = await Exaustor.create({ codigo, marca, modelo, categoria, status, estacaoId });

    return res.status(201).json(exaustor);
  } catch (error) {
    console.error('Erro ao criar Exaustor:', error);
    return res.status(500).json({ error: 'Erro ao criar Exaustor.' });
  }
};

// Obter todos os Exaustores
exports.getAllExaustores = async (req, res) => {
  try {
    const exaustores = await Exaustor.findAll({
      include: [Estacao]
    });
    return res.status(200).json(exaustores);
  } catch (error) {
    console.error('Erro ao obter Exaustores:', error);
    return res.status(500).json({ error: 'Erro ao obter Exaustores.' });
  }
};

// Obter um Exaustor por ID
exports.getExaustorById = async (req, res) => {
  try {
    const { id } = req.params;

    const exaustor = await Exaustor.findByPk(id, {
      include: [Estacao]
    });
    if (!exaustor) {
      return res.status(404).json({ error: 'Exaustor não encontrado.' });
    }

    return res.status(200).json(exaustor);
  } catch (error) {
    console.error('Erro ao obter Exaustor:', error);
    return res.status(500).json({ error: 'Erro ao obter Exaustor.' });
  }
};

// Atualizar um Exaustor por ID
exports.updateExaustor = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, marca, modelo, categoria, status, estacaoId } = req.body;

    const exaustor = await Exaustor.findByPk(id);
    if (!exaustor) {
      return res.status(404).json({ error: 'Exaustor não encontrado.' });
    }

    await exaustor.update({ codigo, marca, modelo, categoria, status, estacaoId });

    await File.destroy({ where: { exaustorId: exaustor.id } });

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
              exaustorId: exaustor.id
            });
            fileCount++;
          }
        }
      }
    }


    return res.status(200).json(exaustor);
  } catch (error) {
    console.error('Erro ao atualizar Exaustor:', error);
    return res.status(500).json({ error: 'Erro ao atualizar Exaustor.' });
  }
};

// Deletar um Exaustor por ID
exports.deleteExaustor = async (req, res) => {
  try {
    const { id } = req.params;

    const exaustor = await Exaustor.findByPk(id);
    if (!exaustor) {
      return res.status(404).json({ error: 'Exaustor não encontrado.' });
    }

    await exaustor.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Exaustor:', error);
    return res.status(500).json({ error: 'Erro ao deletar Exaustor.' });
  }
};

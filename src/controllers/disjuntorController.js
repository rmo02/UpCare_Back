const { Disjuntor, Quadro, Estacao, File } = require('../models');

// Criar um novo Disjuntor
exports.createDisjuntor = async (req, res) => {
  try {
    const { codigo, marca, modelo, categoria, status, corrente_maxima, quadroId, estacaoId } = req.body;

    // Validar entrada
    if (!codigo || !marca || !modelo || !categoria || !status || corrente_maxima === undefined) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const disjuntor = await Disjuntor.create({
      codigo,
      marca,
      modelo,
      categoria,
      status,
      corrente_maxima,
      quadroId,
      estacaoId
    });

    return res.status(201).json(disjuntor);
  } catch (error) {
    console.error('Erro ao criar Disjuntor:', error);
    return res.status(500).json({ error: 'Erro ao criar Disjuntor.' });
  }
};

// Obter todos os Disjuntores
exports.getAllDisjuntores = async (req, res) => {
  try {
    const disjuntores = await Disjuntor.findAll({
      include: [Quadro]
    });
    return res.status(200).json(disjuntores);
  } catch (error) {
    console.error('Erro ao obter Disjuntores:', error);
    return res.status(500).json({ error: 'Erro ao obter Disjuntores.' });
  }
};

// Obter um Disjuntor por ID
exports.getDisjuntorById = async (req, res) => {
  try {
    const { id } = req.params;

    const disjuntor = await Disjuntor.findByPk(id, {
      include: [Quadro, Estacao]
    });
    if (!disjuntor) {
      return res.status(404).json({ error: 'Disjuntor não encontrado.' });
    }

    return res.status(200).json(disjuntor);
  } catch (error) {
    console.error('Erro ao obter Disjuntor:', error);
    return res.status(500).json({ error: 'Erro ao obter Disjuntor.' });
  }
};

// Atualizar um Disjuntor por ID
exports.updateDisjuntor = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, marca, modelo, categoria, status, corrente_maxima, quadroId, estacaoId } = req.body;

    const disjuntor = await Disjuntor.findByPk(id);
    if (!disjuntor) {
      return res.status(404).json({ error: 'Disjuntor não encontrado.' });
    }

    await disjuntor.update({
      codigo,
      marca,
      modelo,
      categoria,
      status,
      corrente_maxima,
      quadroId,
      estacaoId
    });

    await File.destroy({ where: { disjuntorId: disjuntor.id } });

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
              disjuntorId: disjuntor.id
            });
            fileCount++;
          }
        }
      }
    }

    return res.status(200).json(disjuntor);
  } catch (error) {
    console.error('Erro ao atualizar Disjuntor:', error);
    return res.status(500).json({ error: 'Erro ao atualizar Disjuntor.' });
  }
};

// Deletar um Disjuntor por ID
exports.deleteDisjuntor = async (req, res) => {
  try {
    const { id } = req.params;

    const disjuntor = await Disjuntor.findByPk(id);
    if (!disjuntor) {
      return res.status(404).json({ error: 'Disjuntor não encontrado.' });
    }

    await disjuntor.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Disjuntor:', error);
    return res.status(500).json({ error: 'Erro ao deletar Disjuntor.' });
  }
};

const { Dps, Quadro, Estacao, File } = require('../models');

// Criar um novo Dps
exports.createDps = async (req, res) => {
  try {
    const { codigo, marca, modelo, categoria, status, classe_dps, estacaoId } = req.body;

    // Validar entrada
    if (!codigo || !marca || !modelo || !categoria || !status || classe_dps === undefined) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const dps = await Dps.create({
      codigo,
      marca,
      modelo,
      categoria,
      status,
      classe_dps,
      estacaoId
    });

    return res.status(201).json(dps);
  } catch (error) {
    console.error('Erro ao criar Dps:', error);
    return res.status(500).json({ error: 'Erro ao criar Dps.' });
  }
};

// Obter todos os Dps
exports.getAllDps = async (req, res) => {
  try {
    const dps = await Dps.findAll({});
    return res.status(200).json(dps);
  } catch (error) {
    console.error('Erro ao obter Dps:', error);
    return res.status(500).json({ error: 'Erro ao obter Dps.' });
  }
};

// Obter um Dps por ID
exports.getDpsById = async (req, res) => {
  try {
    const { id } = req.params;

    const dps = await Dps.findByPk(id, {
      include: [Quadro, Estacao]
    });
    if (!dps) {
      return res.status(404).json({ error: 'Dps não encontrado.' });
    }

    return res.status(200).json(dps);
  } catch (error) {
    console.error('Erro ao obter Dps:', error);
    return res.status(500).json({ error: 'Erro ao obter Dps.' });
  }
};

// Atualizar um Dps por ID
exports.updateDps = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, marca, modelo, categoria, status, classe_dps, quadroId, estacaoId } = req.body;

    const dps = await Dps.findByPk(id);
    if (!dps) {
      return res.status(404).json({ error: 'Dps não encontrado.' });
    }

    await dps.update({
      codigo,
      marca,
      modelo,
      categoria,
      status,
      classe_dps,
      quadroId,
      estacaoId
    });

    await File.destroy({ where: { dpsId: dps.id } });

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
              dpsId: dps.id
            });
            fileCount++;
          }
        }
      }
    }


    return res.status(200).json(dps);
  } catch (error) {
    console.error('Erro ao atualizar Dps:', error);
    return res.status(500).json({ error: 'Erro ao atualizar Dps.' });
  }
};

// Deletar um Dps por ID
exports.deleteDps = async (req, res) => {
  try {
    const { id } = req.params;

    const dps = await Dps.findByPk(id);
    if (!dps) {
      return res.status(404).json({ error: 'Dps não encontrado.' });
    }

    await dps.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Dps:', error);
    return res.status(500).json({ error: 'Erro ao deletar Dps.' });
  }
};

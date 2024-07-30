const { Telemetria, Estacao, File } = require('../models');

// Criar um novo Telemetria
exports.createTelemetria = async (req, res) => {
  try {
    const { codigo, marca, modelo, categoria, status, estacaoId } = req.body;

    // Validar entrada
    if (!codigo || !marca || !modelo || !categoria || !status) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const telemetria = await Telemetria.create({ codigo, marca, modelo, categoria, status, estacaoId });

    return res.status(201).json(telemetria);
  } catch (error) {
    console.error('Erro ao criar Telemetria:', error);
    return res.status(500).json({ error: 'Erro ao criar Telemetria.' });
  }
};

// Obter todos os Telemetrias
exports.getAllTelemetrias = async (req, res) => {
  try {
    const telemetrias = await Telemetria.findAll({
      include: [Estacao]
    });
    return res.status(200).json(telemetrias);
  } catch (error) {
    console.error('Erro ao obter Telemetrias:', error);
    return res.status(500).json({ error: 'Erro ao obter Telemetrias.' });
  }
};

// Obter um Telemetria por ID
exports.getTelemetriaById = async (req, res) => {
  try {
    const { id } = req.params;

    const telemetria = await Telemetria.findByPk(id, {
      include: [Estacao]
    });
    if (!telemetria) {
      return res.status(404).json({ error: 'Telemetria não encontrada.' });
    }

    return res.status(200).json(telemetria);
  } catch (error) {
    console.error('Erro ao obter Telemetria:', error);
    return res.status(500).json({ error: 'Erro ao obter Telemetria.' });
  }
};

// Atualizar um Telemetria por ID
exports.updateTelemetria = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, marca, modelo, categoria, status, estacaoId } = req.body;

    const telemetria = await Telemetria.findByPk(id);
    if (!telemetria) {
      return res.status(404).json({ error: 'Telemetria não encontrada.' });
    }

    await telemetria.update({ codigo, marca, modelo, categoria, status, estacaoId });

    // Remover arquivos existentes
    await File.destroy({ where: { telemetriaId: telemetria.id } });

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
              telemetriaId: telemetria.id
            });
            fileCount++;
          }
        }
      }
    }

    return res.status(200).json(telemetria);
  } catch (error) {
    console.error('Erro ao atualizar Telemetria:', error);
    return res.status(500).json({ error: 'Erro ao atualizar Telemetria.' });
  }
};

// Deletar um Telemetria por ID
exports.deleteTelemetria = async (req, res) => {
  try {
    const { id } = req.params;

    const telemetria = await Telemetria.findByPk(id);
    if (!telemetria) {
      return res.status(404).json({ error: 'Telemetria não encontrada.' });
    }

    await telemetria.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Telemetria:', error);
    return res.status(500).json({ error: 'Erro ao deletar Telemetria.' });
  }
};

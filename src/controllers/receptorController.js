const { Receptor, Estacao, Parabolica, Transmissor, File } = require('../models');

// Criar um novo Receptor
exports.createReceptor = async (req, res) => {
  try {
    const { codigo, marca, modelo, categoria, status, channel, frequencia, symbol_rate } = req.body;

    // Validar entrada
    if (!codigo || !marca || !modelo || !categoria || !status || !channel || !frequencia || !symbol_rate) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const receptor = await Receptor.create({ codigo, marca, modelo, categoria, status, channel, frequencia, symbol_rate });

    return res.status(201).json(receptor);
  } catch (error) {
    console.error('Erro ao criar Receptor:', error);
    return res.status(500).json({ error: 'Erro ao criar Receptor.' });
  }
};

// Obter todos os Receptores
exports.getAllReceptores = async (req, res) => {
  try {
    const receptores = await Receptor.findAll({
      include: [Estacao, Parabolica, Transmissor]
    });
    return res.status(200).json(receptores);
  } catch (error) {
    console.error('Erro ao obter Receptores:', error);
    return res.status(500).json({ error: 'Erro ao obter Receptores.' });
  }
};

// Obter um Receptor por ID
exports.getReceptorById = async (req, res) => {
  try {
    const { id } = req.params;

    const receptor = await Receptor.findByPk(id, {
      include: [Estacao, Parabolica, Transmissor]
    });
    if (!receptor) {
      return res.status(404).json({ error: 'Receptor não encontrado.' });
    }

    return res.status(200).json(receptor);
  } catch (error) {
    console.error('Erro ao obter Receptor:', error);
    return res.status(500).json({ error: 'Erro ao obter Receptor.' });
  }
};

// Atualizar um Receptor por ID
exports.updateReceptor = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, marca, modelo, categoria, status, channel, frequencia, symbol_rate, parabolicaId, transmissorId, estacaoId } = req.body;

    const receptor = await Receptor.findByPk(id);
    if (!receptor) {
      return res.status(404).json({ error: 'Receptor não encontrado.' });
    }

    await receptor.update({ codigo, marca, modelo, categoria, status, channel, frequencia, symbol_rate, parabolicaId, transmissorId, estacaoId });

    // Remover arquivos existentes
    await File.destroy({ where: { receptorId: receptor.id } });

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
              receptorId: receptor.id
            });
            fileCount++;
          }
        }
      }
    }

    return res.status(200).json(receptor);
  } catch (error) {
    console.error('Erro ao atualizar Receptor:', error);
    return res.status(500).json({ error: 'Erro ao atualizar Receptor.' });
  }
};

// Deletar um Receptor por ID
exports.deleteReceptor = async (req, res) => {
  try {
    const { id } = req.params;

    const receptor = await Receptor.findByPk(id);
    if (!receptor) {
      return res.status(404).json({ error: 'Receptor não encontrado.' });
    }

    await receptor.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Receptor:', error);
    return res.status(500).json({ error: 'Erro ao deletar Receptor.' });
  }
};

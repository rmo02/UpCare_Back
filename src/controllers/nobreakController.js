const { Nobreak, Quadro, Estacao, File } = require('../models');

// Criar um novo Nobreak
exports.createNobreak = async (req, res) => {
  try {
    const { codigo, marca, modelo, categoria, status, tensao_entrada, tensao_saida, } = req.body;

    // Validar entrada
    if (!codigo || !marca || !modelo || !categoria || !status || !tensao_entrada || !tensao_saida) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const nobreak = await Nobreak.create({ codigo, marca, modelo, categoria, status, tensao_entrada, tensao_saida });

    return res.status(201).json(nobreak);
  } catch (error) {
    console.error('Erro ao criar Nobreak:', error);
    return res.status(500).json({ error: 'Erro ao criar Nobreak.' });
  }
};

// Obter todos os Nobreaks
exports.getAllNobreaks = async (req, res) => {
  try {
    const nobreaks = await Nobreak.findAll({
      include: [Quadro]
    });
    return res.status(200).json(nobreaks);
  } catch (error) {
    console.error('Erro ao obter Nobreaks:', error);
    return res.status(500).json({ error: 'Erro ao obter Nobreaks.' });
  }
};

// Obter um Nobreak por ID
exports.getNobreakById = async (req, res) => {
  try {
    const { id } = req.params;

    const nobreak = await Nobreak.findByPk(id, {
      include: [Quadro, Estacao]
    });
    if (!nobreak) {
      return res.status(404).json({ error: 'Nobreak não encontrado.' });
    }

    return res.status(200).json(nobreak);
  } catch (error) {
    console.error('Erro ao obter Nobreak:', error);
    return res.status(500).json({ error: 'Erro ao obter Nobreak.' });
  }
};

// Atualizar um Nobreak por ID
exports.updateNobreak = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, marca, modelo, categoria, status, tensao_entrada, tensao_saida, quadroId, estacaoId } = req.body;

    const nobreak = await Nobreak.findByPk(id);
    if (!nobreak) {
      return res.status(404).json({ error: 'Nobreak não encontrado.' });
    }

    await nobreak.update({ codigo, marca, modelo, categoria, status, tensao_entrada, tensao_saida, quadroId, estacaoId });

    await File.destroy({ where: { nobreakId: nobreak.id } });

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
              nobreakId: nobreak.id
            });
            fileCount++;
          }
        }
      }
    }


    return res.status(200).json(nobreak);
  } catch (error) {
    console.error('Erro ao atualizar Nobreak:', error);
    return res.status(500).json({ error: 'Erro ao atualizar Nobreak.' });
  }
};

// Deletar um Nobreak por ID
exports.deleteNobreak = async (req, res) => {
  try {
    const { id } = req.params;

    const nobreak = await Nobreak.findByPk(id);
    if (!nobreak) {
      return res.status(404).json({ error: 'Nobreak não encontrado.' });
    }

    await nobreak.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Nobreak:', error);
    return res.status(500).json({ error: 'Erro ao deletar Nobreak.' });
  }
};

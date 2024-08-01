const { Antena, Transmissor, Estacao, File } = require('../models');
const path = require('path');

// Criar um novo Antena com upload de arquivos
exports.createAntena = async (req, res) => {
  try {
    const { codigo, marca, modelo, categoria, status, gain, tipos_antena, position_torre, vr } = req.body;

    // Validar entrada
    if (!codigo || !marca || !modelo || !categoria || !status || !gain || !tipos_antena || !position_torre || !vr) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const antena = await Antena.create({ codigo, marca, modelo, categoria, status, gain, tipos_antena, position_torre, vr });

    return res.status(201).json(antena);
  } catch (error) {
    console.error('Erro ao criar Antena:', error);
    return res.status(500).json({ error: 'Erro ao criar Antena.' });
  }
};

// Obter todos os Antenas
exports.getAllAntenas = async (req, res) => {
  try {
    const antenas = await Antena.findAll({
      include: [Transmissor, Estacao, File]
    });
    return res.status(200).json(antenas);
  } catch (error) {
    console.error('Erro ao obter Antenas:', error);
    return res.status(500).json({ error: 'Erro ao obter Antenas.' });
  }
};

// Obter um Antena por ID
exports.getAntenaById = async (req, res) => {
  try {
    const { id } = req.params;

    const antena = await Antena.findByPk(id, {
      include: [Transmissor, Estacao, File]
    });
    if (!antena) {
      return res.status(404).json({ error: 'Antena não encontrada.' });
    }

    return res.status(200).json(antena);
  } catch (error) {
    console.error('Erro ao obter Antena:', error);
    return res.status(500).json({ error: 'Erro ao obter Antena.' });
  }
};

// Atualizar um Antena por ID com upload de arquivos
exports.updateAntena = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, marca, modelo, categoria, status, gain, tipos_antena, position_torre, vr, transmissorId, estacaoId } = req.body;

    const antena = await Antena.findByPk(id);
    if (!antena) {
      return res.status(404).json({ error: 'Antena não encontrada.' });
    }

    // Atualize os campos de dados da antena
    await antena.update({ codigo, marca, modelo, categoria, status, gain, tipos_antena, position_torre, vr, transmissorId, estacaoId });

    // Remover arquivos existentes
    await File.destroy({ where: { antenaId: antena.id } });

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
              antenaId: antena.id
            });
            fileCount++;
          }
        }
      }
    }

    return res.status(200).json(antena);
  } catch (error) {
    console.error('Erro ao atualizar Antena:', error);
    return res.status(500).json({ error: 'Erro ao atualizar Antena.' });
  }
};

// Deletar um Antena por ID
exports.deleteAntena = async (req, res) => {
  try {
    const { id } = req.params;

    const antena = await Antena.findByPk(id);
    if (!antena) {
      return res.status(404).json({ error: 'Antena não encontrada.' });
    }

    await antena.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Antena:', error);
    return res.status(500).json({ error: 'Erro ao deletar Antena.' });
  }
};

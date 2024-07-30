const { Arcondicionado, Estacao, File } = require('../models');
const path = require('path');

// Criar um novo ar-condicionado
exports.createArcondicionado = async (req, res) => {
  try {
    const { codigo, marca, modelo, categoria, status, potencia, tensao, estacaoId } = req.body;

    // Validar entrada
    if (!codigo || !marca || !modelo || !categoria || !status || potencia === undefined || tensao === undefined) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // // Verificar se a estação existe
    // const estacao = await Estacao.findByPk(estacaoId);
    // if (!estacao) {
    //   return res.status(404).json({ error: 'Estação não encontrada.' });
    // }

    const arcondicionado = await Arcondicionado.create({
      codigo,
      marca,
      modelo,
      categoria,
      status,
      potencia,
      tensao,
      estacaoId
    });

    return res.status(201).json(arcondicionado);
  } catch (error) {
    console.error('Erro ao criar ar-condicionado:', error);
    return res.status(500).json({ error: 'Erro ao criar ar-condicionado.' });
  }
};

// Obter todos os ar-condicionados
exports.getAllArcondicionados = async (req, res) => {
  try {
    const arcondicionados = await Arcondicionado.findAll({
      include: [Estacao, File]
    });
    return res.status(200).json(arcondicionados);
  } catch (error) {
    console.error('Erro ao obter ar-condicionados:', error);
    return res.status(500).json({ error: 'Erro ao obter ar-condicionados.' });
  }
};

// Obter um ar-condicionado por ID
exports.getArcondicionadoById = async (req, res) => {
  try {
    const { id } = req.params;

    const arcondicionado = await Arcondicionado.findByPk(id, {
      include: [Estacao] // Inclui estação associada
    });
    if (!arcondicionado) {
      return res.status(404).json({ error: 'Ar-condicionado não encontrado.' });
    }

    return res.status(200).json(arcondicionado);
  } catch (error) {
    console.error('Erro ao obter ar-condicionado:', error);
    return res.status(500).json({ error: 'Erro ao obter ar-condicionado.' });
  }
};

// Atualizar um ar-condicionado por ID
exports.updateArcondicionado = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, marca, modelo, categoria, status, potencia, tensao, estacaoId } = req.body;

    const arcondicionado = await Arcondicionado.findByPk(id);
    if (!arcondicionado) {
      return res.status(404).json({ error: 'Ar-condicionado não encontrado.' });
    }

    // Atualize os campos de dados do ar-condicionado
    await arcondicionado.update({
      codigo,
      marca,
      modelo,
      categoria,
      status,
      potencia,
      tensao,
      estacaoId
    });

    // Remover arquivos existentes
    await File.destroy({ where: { arcondicionadoId: arcondicionado.id } });

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
              arcondicionadoId: arcondicionado.id
            });
            fileCount++;
          }
        }
      }
    }

    return res.status(200).json(arcondicionado);
  } catch (error) {
    console.error('Erro ao atualizar ar-condicionado:', error);
    return res.status(500).json({ error: 'Erro ao atualizar ar-condicionado.' });
  }
};

// Deletar um ar-condicionado por ID
exports.deleteArcondicionado = async (req, res) => {
  try {
    const { id } = req.params;

    const arcondicionado = await Arcondicionado.findByPk(id);
    if (!arcondicionado) {
      return res.status(404).json({ error: 'Ar-condicionado não encontrado.' });
    }

    await arcondicionado.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar ar-condicionado:', error);
    return res.status(500).json({ error: 'Erro ao deletar ar-condicionado.' });
  }
};

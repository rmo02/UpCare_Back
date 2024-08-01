const { Arcondicionado, Antena, Cabo, Combinador, Disjuntor, Dps, Exaustor, Nobreak, Parabolica, Quadro, Receptor, Switch, Telemetria, Torre, Transmissor, Manutencao } = require('../models');

// Obter todos os equipamentos sem incluir as estações
exports.getAllEquipamentos = async (req, res) => {
  try {
    const arcondicionados = await Arcondicionado.findAll();
    const antenas = await Antena.findAll();
    const cabos = await Cabo.findAll();
    const combinadores = await Combinador.findAll();
    const disjuntores = await Disjuntor.findAll();
    const dps = await Dps.findAll();
    const exaustores = await Exaustor.findAll();
    const nobreaks = await Nobreak.findAll();
    const parabolicas = await Parabolica.findAll();
    const quadros = await Quadro.findAll();
    const receptores = await Receptor.findAll();
    const switches = await Switch.findAll();
    const telemetrias = await Telemetria.findAll();
    const torres = await Torre.findAll();
    const transmissores = await Transmissor.findAll();
    const manutencoes = await Manutencao.findAll();

    res.status(200).json({
      arcondicionados,
      antenas,
      cabos,
      combinadores,
      disjuntores,
      dps,
      exaustores,
      nobreaks,
      parabolicas,
      quadros,
      receptores,
      switches,
      telemetrias,
      torres,
      transmissores,
      manutencoes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

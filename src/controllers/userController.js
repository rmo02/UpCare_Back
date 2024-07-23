const { User, Role } = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['name'],
          through: { attributes: [] }
        }
      ]
    });
    console.log("Usuários encontrados:", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: error.message });
  }
};

//apenas admin ou próprio usuário
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['name'],
          through: { attributes: [] }
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const requesterId = req.userId;
    const requesterRoles = req.userRoles;

    if (requesterId !== id && !requesterRoles.includes('admin')) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update user (Admin or the user itself)
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, contato, empresa, contato_empresa, roles } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const requesterId = req.userId;
    const requesterRoles = req.userRoles;

    if (requesterId !== id && !requesterRoles.includes('admin')) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (contato) user.contato = contato;
    if (empresa) user.empresa = empresa;
    if (contato_empresa) user.contato_empresa = contato_empresa;

    if (roles && requesterRoles.includes('admin')) {
      const rolesData = await Role.findAll({
        where: {
          name: roles
        }
      });
      await user.setRoles(rolesData);
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete user (Admin only)
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const requesterRoles = req.userRoles;

    if (!requesterRoles.includes('admin')) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

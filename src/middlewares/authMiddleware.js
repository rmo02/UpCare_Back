const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

exports.verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    const user = await User.findByPk(req.userId, {
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

    req.userRoles = user.roles.map(role => role.name) || [];
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Não autorizado' });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, {
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
      return res.status(404).send({ message: 'User not found' });
    }

    console.log('User roles:', user.roles);

    const hasAdminRole = user.roles.some(role => role.name === 'admin');

    if (hasAdminRole) {
      next();
    } else {
      res.status(403).send({ message: 'Require Admin Role!' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.isTechnician = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, {
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
      return res.status(404).send({ message: 'User not found' });
    }

    console.log('User roles:', user.roles);

    const hasTechnicianRole = user.roles.some(role => role.name === 'tecnico');

    if (hasTechnicianRole) {
      next();
    } else {
      res.status(403).send({ message: 'Require Technician Role!' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

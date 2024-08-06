const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Role } = require('../models');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

exports.register = async (req, res) => {
  const { name, email, password, contato, empresa, contato_empresa, roles } = req.body;
  try {
    const user = await User.create({ name, email, password, contato, empresa, contato_empresa });

    if (roles && roles.length > 0) {
      const rolesData = await Role.findAll({
        where: {
          name: roles
        }
      });
      await user.setRoles(rolesData);
    }

    const token = generateToken(user.id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ 
      where: { email },
      include: [{ model: Role, as: 'roles' }]
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    // Get user roles
    const roles = user.roles.map(role => role.name);

    // Extract user data to return in response
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      contato: user.contato,
      empresa: user.empresa,
      contato_empresa: user.contato_empresa,
      roles
    };

    res.status(200).json({ token, user: userData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

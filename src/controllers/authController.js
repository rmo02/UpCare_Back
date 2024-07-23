const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Role } = require('../models');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

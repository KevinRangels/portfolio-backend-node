const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    // Verificar si el email existe
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: 'User / Password invalids',
      });
    }

    // Si el ususario esta activo

    if (!user.state) {
      return res.status(400).json({
        msg: 'State is false',
      });
    }

    // Verificar la contraseña

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Password is invalid',
      });
    }

    // Generar el JWT
    const token = await generateJWT(user.id);

    return res.json({
      user,
      token,
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({
      msg: 'Talk to the admin',
    });
  }
};

module.exports = {
  login,
};

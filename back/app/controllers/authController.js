const User = require('../models/user');
const { compare } = require('../services/bcryptService');
const jwtService = require('../services/jwtService');

const authController = {
  login: async (request, response) => {
    const { email, password } = request.body;
    try {
      const user = await User.getByEmail(email);

      if (!user) return response.status(400).json('Invalid credentials');
      if (!(await compare(password, user.password)))
        return response.status(400).json('Invalid credentials');
      const token = await jwtService.sign({ id: user.id });
      return response.json({
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        token,
      });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
};

module.exports = authController;

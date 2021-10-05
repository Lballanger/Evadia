const User = require('../models/user');
const { compare, hash } = require('../services/bcryptService');
const jwtService = require('../services/jwtService');
const userBlacklistService = require('../services/userBlacklistService');

const authController = {
  login: async (request, response) => {
    const { email, password } = request.body;
    try {
      const user = await User.getByEmail(email);

      if (!user) return response.status(400).json('Invalid credentials');
      if (!(await compare(password, user.password)))
        return response.status(400).json('Invalid credentials');

      await userBlacklistService.removeFromBlacklist(user.id);

      const accessToken = await jwtService.generateToken({ id: user.id });
      const refreshToken = await jwtService.generateToken(
        { id: user.id },
        true
      );
      return response.json({
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        city: user.city,
        favorites: user.favorites,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
  register: async (request, response) => {
    const { email, password, firstname, lastname, city } = request.body;
    try {
      const user = await User.getByEmail(email);
      if (user) return response.status(400).json('User already exists');
      const hashedPassword = await hash(password);
      const newUser = await new User({
        email,
        password: hashedPassword,
        firstname,
        lastname,
        city,
        role: 'user',
      }).create();
      const accessToken = await jwtService.generateToken({ id: newUser.id });
      const refreshToken = await jwtService.generateToken(
        { id: newUser.id },
        true
      );
      return response.json({
        id: newUser.id,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        role: newUser.role,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
  logout: async (request, response) => {
    const { id } = request.user;
    try {
      if ((await userBlacklistService.addInBlacklist(id)) !== 'OK') {
        throw new Error('Impossible to logged out');
      }
      return response.json({ accessToken: null, success: true });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
  refreshToken: async (request, response) => {
    const { id } = request.user;
    try {
      // All check was made in the authMiddleware and we hava access to the user ID in request.user
      const newToken = await jwtService.generateToken({ id });
      return response.json({ accessToken: newToken });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
  generatePasswordToken: async (request, response) => {
    const { email } = request.body;
    try {
      const user = await User.getByEmail(email);
      if (!user)
        return response
          .status(404)
          .json('User not found with this Email address');
      // TODO: Generate token
      // TODO: Store the token in Redis with expiration time
      // TODO: Send the mail
      return response.json('Email sent');
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
};

module.exports = authController;

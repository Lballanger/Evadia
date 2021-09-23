const User = require('../models/user');
const { compare, hash } = require('../services/bcryptService');
const jwtService = require('../services/jwtService');

const authController = {
  login: async (request, response) => {
    const { email, password } = request.body;
    try {
      const user = await User.getByEmail(email);

      if (!user) return response.status(400).json('Invalid credentials');
      if (!(await compare(password, user.password)))
        return response.status(400).json('Invalid credentials');
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
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
  register: async (request, response) => {
    const { email, password, firstname, lastname } = request.body;
    try {
      const user = await User.getByEmail(email);
      if (user) return response.status(400).json('User already exists');
      const hashedPassword = await hash(password);
      const newUser = await User.create({
        email,
        password: hashedPassword,
        firstname,
        lastname,
        role: 'user',
      });
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
  logout: async (request, response) =>
    // TODO: remove token from db or redis
    // TODO: find a way to revoke token
    response.json('Logged out'),
  refreshToken: async (request, response) => {
    const { token } = request.body;
    try {
      if (token == null) return response.status(401).json('No token provided');
      // TODO: get refreshToken from db or redis and check if exists
      const decoded = jwtService.validateToken(token, true);
      if (decoded == null) return response.status(401).json('Invalid token');
      const newToken = await jwtService.sign({ id: decoded.id });
      // TODO: Store the new token in db or redis
      return response.json({ token: newToken });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
};

module.exports = authController;

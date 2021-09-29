const User = require('../models/user');
const { compare, hash } = require('../services/bcryptService');

const userController = {
  user: async (request, response) => {
    const { id } = request.user;
    try {
      const user = await User.getById(id);
      if (!user) return response.status(404).json('User not found');
      return response.json({
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        city: user.city,
      });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
  update: async (request, response) => {
    const { id } = request.user;
    const { firstname, lastname, email, password, role } = request.body;
    try {
      const user = await User.getById(id);
      if (!user) return response.status(404).json('User not found');
      let hashedPassword = user.password;
      if (!(await compare(password, user.password))) {
        hashedPassword = await hash(password);
      }
      await User.update(id, {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role,
      });
      // TODO: if password changed, revoke/logout user
      return response.json({ firstname, lastname, email, role });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
  delete: async (request, response) => {
    const { id } = request.user;
    try {
      await User.delete(id);
      // TODO: revoke user token
      return response.status(204);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
};

module.exports = userController;

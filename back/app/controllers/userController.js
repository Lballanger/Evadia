const User = require('../models/user');
const Commune = require('../models/commune');
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
        favorites: user.favorites,
      });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
  update: async (request, response) => {
    const { id } = request.user;
    // eslint-disable-next-line no-unused-vars
    const { firstname, lastname, email, password, role } = request.body;

    try {
      const user = await User.getById(id);
      if (!user) return response.status(404).json('User not found');
      let hashedPassword = user.password;
      if (password && !(await compare(password, user.password))) {
        hashedPassword = await hash(password);
      }

      const userRole = user.role;

      delete user.favorites;
      delete user.email_verified_at;

      user.city = user.city.code_insee;

      for (const key in request.body) {
        if (
          user[key] !== request.body[key] &&
          request.body[key] !== undefined
        ) {
          user[key] = request.body[key];
        }
      }

      user.role = userRole;
      user.password = hashedPassword;

      await user.update();
      // TODO: if password changed, revoke/logout user
      return response.json({ firstname, lastname, email, role: userRole });
    } catch (error) {
      console.log(error);
      return response.status(500).json(error.message);
    }
  },
  delete: async (request, response) => {
    const { id } = request.user;
    try {
      const user = await User.getById(id);
      if (!user) return response.status(404).json('User not found');

      await user.delete();
      // TODO: revoke user token
      return response.json('User deleted').status(204);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
  bookmarks: async (request, response) => {
    try {
      const { id } = request.user;
      const commune = await Commune.bookmarks(id);
      response.json(commune);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },
};

module.exports = userController;

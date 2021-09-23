const User = require('../models/user');

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
      });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
};

module.exports = userController;

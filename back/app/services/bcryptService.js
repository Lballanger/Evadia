const bcrypt = require('bcrypt');

exports.hash = async (password) => await bcrypt.hash(password, 10);
exports.compare = async (password, hash) =>
  await bcrypt.compare(password, hash);

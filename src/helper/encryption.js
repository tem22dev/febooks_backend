const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
};

const checkPassword = (password) => {
    const isCheckPass = bcrypt.compareSync(password, hashPassword);
    return isCheckPass;
};

module.exports = { hashPassword, checkPassword };

const findOne = async (Project, where = {}) => {
    const isExist = await Project.findOne({ where: where });
    if (isExist !== null) {
        return true;
    }

    return false;
};

const create = async (Project, data = {}) => {
    await Project.create(data);
};

module.exports = { findOne, create };

// Check is exist
const findOne = async (Project, where = {}) => {
    const isExist = await Project.findOne({ where: where });
    if (isExist !== null) {
        return true;
    }

    return false;
};

// Get data ==> Javascript object
const getData = async (Project, where = {}) => {
    const data = await Project.findOne({ where });
    return data.get({ plain: true });
};

// Create row data
const create = async (Project, data = {}) => {
    await Project.create(data);
};

module.exports = { findOne, create, getData };

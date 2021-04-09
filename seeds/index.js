const userSeeds = require('./user-seeds');
const postSeeds = require('.//post-seeds')
const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true});
    console.log(' Synced!');

    await userSeeds();
    console.log('Users seeded!');

    await postSeeds();
    console.log('Posts seeded!')

    process.exit(0)
};

seedAll();
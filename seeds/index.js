const userSeeds = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true});
    console.log(' Synced!');

    await userSeeds();
    console.log('Users seeded!');
}
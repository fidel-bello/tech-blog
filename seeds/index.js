const userSeeds = require('./user-seeds');
const postSeeds = require('.//post-seeds')
const sequelize = require('../config/connection');
const commentSeeds = require('./comment-seeeds');

const seedAll = async () => {
    await sequelize.sync({ force: true});
    console.log(' Synced!');

    await userSeeds();
    console.log('Users seeded!');

    await postSeeds();
    console.log('Posts seeded!')

    await commentSeeds();
    console.log( 'comments seeded!');

    process.exit(0)
};

seedAll();
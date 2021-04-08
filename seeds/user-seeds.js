const {User} = require('../models');

const userData = [
    {
        username: 'fidel_bello',
        github: 'fidel-bello',
        email: 'fidel_23@live.com',
        password: 'password1'
    },
    {
        username: 'monica_jorge',
        github: 'tba',
        email: 'monix0107@gmail.com',
        password: 'password2'
    }
]
const userSeeds = () => User.bulkCreate(userData);
module.exports = userSeeds;
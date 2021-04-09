const { Post } = require('../models');

const postInfo = [
    {
        title: 'test 1 2',
        post_content: 'test test test test',
        user_id: 2
    },
    {
        title: 'test 3 4',
        post_content: 'test 1 test 2 test 3 ',
        user_id: 1
    }
]

const postSeeds = () => Post.bulkCreate(postInfo);

module.exports = postSeeds;
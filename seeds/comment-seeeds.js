const {Comment} = require('../models');

const commentInfo = [
    {
        user_id: 1,
        post_id: 2,
        comment_text: 'hello test'
    },
    {
        user_id: 2,
        post_id: 1,
        comment_text: 'test hello!'
    }
]

const commentSeeds = () => Comment.bulkCreate(commentInfo);
 module.exports = commentSeeds
const User = require('./user');
const Comment = require('./comment');
const Post = require('./post')

//Table Relationships

Comment.belongsTo(Post, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'user_id'
});

module.exports = {User,Comment, Post}
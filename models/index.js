const User = require('./user');
const Comment = require('./comment');
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
User.hasMany(Comment, {
    foreignKey: 'user_id'
})
module.exports = {User,Comment}
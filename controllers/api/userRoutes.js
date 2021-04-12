const router = require('express').Router();
const { User, Post, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res)=> {
    User.findAll({
        attributes: {exclude: ['password']}
    }).then(dbUserInfo => res.json(dbUserInfo)).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'text', 'created at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
}).then(dbUserInfo => {
    if(!dbUserInfo) {
        res.status(404).json({ message: 'User not found!'});
        return;
    }
    res.json(dbUserInfo)
}).catch(err => {
    console.log(err);
    res.status(500).json(err);
});

router.post('/', (req,res) => {
    User.create({
        username: req.body.username,
        email: req.bosy.email,
        password: req.body.password,
        github: req.body.github
    }).then(dbUserInfo => {
        req.session.save(() => {
            req.session.user_id = dbUserInfo.id;
            req.session.username = dbUserInfo.username;
            req.session.github = dbUserInfo.github;
            req.session.loggedIn = true;
            res.json(dbUserInfo);
        })
    })
})
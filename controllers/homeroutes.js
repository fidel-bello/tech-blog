const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req,res) => {
    console.log(req.session);
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created _at',
            'post_content'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username', 'github']
                }
            },
            {
                model: User,
                attributes: ['username', 'github']
            }   
        ]
    }).then(dbPostinfo => {
        const posts = dbPostinfo.map(post => post.get({ plain: true}));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.get('/', (req, res)=> {
    if(req.session.loggedIn) {
        res.render('login')
    }
});

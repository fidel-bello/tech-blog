const router = require('express').Router();
const { createPool } = require('mysql2/promise');
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

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup')
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'text', 'post_id', 'created_at'],
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
        if(!dbPostinfo) {
            res.status(404).json({ message: 'No post found'});
            return;
        }
        const post = dbPostinfo.get({ plain: true});
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

module.exports = router;




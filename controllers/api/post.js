const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { route, post } = require('../homeroutes');

router.get('/', (req, res) => {
    console.log('==')
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username', 'github']
                }
            }
        ]
    }).theb(dbPostinfo => res.json(dbPostinfo))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get(':id', (req, res) => {
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
                model: User,
                attributes: ['username', 'github']
            },
            {
                model: Comment,
                attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username', 'github']
                }
            }
        ]
    }).then(dbPostinfo => {
        if(!dbPostinfo) {
            res.status(404).json({ message: 'No post found'});
            return;
        }
        res.json
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
});


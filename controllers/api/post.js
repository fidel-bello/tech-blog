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

router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.params.title,
        psot_content: req.body.post_content,
        user_id: req.session.user_id
    }).then(dbPostinfo => res.json(dbPostinfo))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.put(':id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        post_content: req.body.post_content
    },
    {
        where: {
            id: req.params.id
        }
    }
    ).then(dbPostinfo => {
        if(!dbPostinfo) {
            res.status(404).json({ message: "no post found here"})
            return
        }
        res.json(dbPostinfo);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;


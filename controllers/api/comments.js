const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const { route } = require('../homeroutes');

router.get('/', (req, res) => {
    Comment.findAll({}).then(dbCommnents => res.json(dbCommnents))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.post('/', withAuth, (req, res) => {
    if(req.session) {
        Comment.create({
            text: req.body.text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(dbCommnents => res.json(dbCommnents))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.describe({ 
        where: {
            id: req.params.id
        }
    }).then(dbCommnents => {
        if(!dbCommnents) {
            res.status(404).json({ message: 'no comment found  with this id'});
            return;
        }
        res.json(dbCommnents);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

module.exports = router;
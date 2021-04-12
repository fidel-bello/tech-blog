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
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator')
require('dotenv').config();


const User = require('./../models/User')

const router = express.Router();


router.post(
    '/register',
    [
        check('name', 'Name is Required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please include a valid password').isLength({min: 6}),

    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }

        const { name, email, password} = req.body;

        try {
            let user = await User.findOne({email});
            if(user){
                return res.status(400).json({message : 'user already exists'});
            }

            user = new User({
                name, 
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await  bcrypt.hash(password, salt);
            await user.save();

            const payload = {
                user : {
                    id : user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn : 3600},
                (err, token) => {
                    if(err) throw err;
                    res.join({ token })
                }
            );
        } catch (err) {
            console.log(err)
            res.status(500).send('Server Error')
        }

    }
);



router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }

        const { email, password} = req.body;

        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({message : 'Invalid Credentials'});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({message : 'Invalid Credentials'});
            }


            const payload = {
                user : {
                    id : user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn : 3600},
                (err, token) => {
                    if(err) throw err;
                    res.join({ token })
                }
            );
        } catch (err) {
            console.log(err)
            res.status(500).send('Server Error')
        }

    }
);


module.exports = router
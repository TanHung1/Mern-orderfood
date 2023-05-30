const jwt = require('jsonwebtoken');
const Account = require('../models/Account');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const passport = require('passport');

const AuthenticationAccount = async (req, res, next) => {
    const authheader = req.header('Authorization');
    const accessToken = authheader && authheader.split(" ")[1];
    if (!accessToken) {
        return res.status(404).send('Token khong ton tai')
    }

    console.log(accessToken);
    try {
        const record = jwt.verify(accessToken, process.env.jwt_access_token);
        const user = await Account.findOne({ _id: record.userId });

        if (!record) {
            return res.status(403).send('Ban khong co quyen truy cap')
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

passport.use(new GooglePlusTokenStrategy({
    // clientID: process.env.clientID,
    // clientSecret: process.env.clientSecret,
    // passReqToCallback: true
}, async (res, req, accessToken, refreshToken, profile, next) => {
    try {
        // console.log('accessToken', accessToken);
        // console.log('refreshToken', refreshToken);
        // console.log('profile', profile);

        const user = await Account.findOne({
            authGoogleID: accessToken.id,
            loginType: 'google'
        });

        //Already have an account
        if(user) return user;
        
        //no account
        const newUser = new Account({
            loginType: 'google',
            authGoogleID: accessToken.id,
            email: accessToken.emails[0].value
        })
        await newUser.save();
        // console.log(newUser)

    } catch (error) {
        console.log(error);
    }
}));


module.exports = {
    AuthenticationAccount
}

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

function init()
{
    return session({
        name: 'sid',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ url: 'mongodb://localhost/pieme'}),
        cookie: {
            // secure: true,
            // httpOnly: false,
            maxAge: 7200000,
            // domain: '...'
        }
    });
}

module.exports = init;
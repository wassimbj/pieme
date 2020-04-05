const UserModel = require('../models/User');

const userMustBeAuth = async (session, cb) => {
    let user_is_in_db = await UserModel.findById(session.userid);

    if (!user_is_in_db)
    {
        let auth_error = new Error('You must login in first');
            auth_error.code = 'AUTH_ERROR';

        throw auth_error;
    }
    else{
        if(typeof cb == 'function')
            return cb();
        else
            throw new Error('second param must be a function');
    }
}

module.exports = userMustBeAuth;
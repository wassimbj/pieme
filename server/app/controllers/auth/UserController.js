const UserModel = require('../../models/User');
const bcrypt = require('bcrypt');

class User {

    // login the user
    async login(loginData, session)
    {
        // console.log('Login: ', session)

        if(!session.userid)
        {

            const {email, password} = loginData;
    
            let user_by_email = await UserModel.findOne({email});
        
            if (user_by_email)
            {
                // check the password
                let pasword_is_the_same = await bcrypt.compare(password, user_by_email.password);
                if (pasword_is_the_same)
                {
                    session.userid = user_by_email._id;

                    return {
                        error: null,
                        success: true
                    }
                }
            }

            return {
                error: [{field: 'email', msg: 'there is no account with the provided credentials'}],
                success: false
            }
        }else{
           throw new Error('You are already logged-in');
        }

        
    }

    // Register the user
    async register(registerData, session)
    {


        if(!session.userid)
        {

            const { name, email, password } = registerData;
    
            let user_by_email = await UserModel.findOne({email});
    
            if(user_by_email)
            {
                // there is already a user with this email
                let errors = [];
                errors.push({
                    field: 'email',
                    msg: 'email is already taken'
                });
    
                return {error: errors, success: false};
    
            }
            
            // hash the password
            let hashedPassword = await bcrypt.hash(password, 10);
        
            // Create the user
            let newUser = await UserModel.create({
                    name,
                    email,
                    password: hashedPassword
            });
    
            // console.log(newUser);
    
            session.userid = newUser._id; 
    
            return {error: null, success: true};
        }else{
            throw new Error('You are already logged-in')
        }

    }

    // Log him out, destroy the session
    async logout(session)
    {
        // console.log(session);
        session.destroy((err) => {
            if(err)
                console.log('LOGOUT_ERROR: ', err)
        });

        return true;
    }
    
}

module.exports = new User()
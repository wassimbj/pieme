const userMustBeAuth = require('../app/helpers/mustAuth');
const UserController = require('../app/controllers/auth/UserController');
const ProjectController = require('../app/controllers/ProjectController');


const resolvers = {

    Query: {

        // singleUser: (_, args) => {
        //     return { name: 'nameishere', email: 'me@gma.com'}
        // },

        projects: (_, args) => ProjectController.getProjects(args) 

        , isauth: (_, args, {session}) => (
            userMustBeAuth(session, () => (true))
        )

    },


    Mutation: {
        login: (_, { loginData }, { session }) => UserController.login(loginData, session)

        , register: (_, { registerData }, { session }) => UserController.register(registerData, session)
        
        , logout: (_, args, {session}) => UserController.logout(session)

        , submitProject: (_, { projectData }, { session }) => (
            userMustBeAuth(
                session, 
                () => ProjectController.submitProject(projectData, session)
            )
        )
        
    }
}

module.exports = resolvers
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    
    # ################# Queries #################

    type User {
        id: String!
        name: String!
        email: String!
        image: String!
        projects: [Project]!
    }

    type ProjectAuthor {
        name: String!
        image: String
    }
    
    type projectLinks {
        preview: String
        github: String
    }

    type Project {
        id: String!
        title: String!
        links: projectLinks
        description: String!
        tags: [String]!
        category: String! 
        # image: String!
        author: ProjectAuthor!
        created_at: String
    }

    type Query {
        singleUser(id: String!): User!
        projects(skip: Int!): [Project]!
        singleProject(id: String!): Project
        isauth: Boolean!
    }


    # ################# Mutations #################


    # ------- Common ------
    type Error {
        field: String!
        msg: String!
    }

    type MutResponse {
        error: [Error]
        success: Boolean!
    }

    type CustomResponse {
        error: String
        success: Boolean
    }


    # ---- Auth ----
    input loginData {
        email: String!
        password: String!
    }

    input registerData {
        name: String!
        email: String!
        password: String!
    }
    

    # ---- Project ----
    input projectLinksInput {
        preview: String
        github: String
    }

    input projectData {
        title: String!
        links: projectLinksInput
        description: String!
        tags: [String]!
        category: String!
    }


    type Mutation {

        # Auth mutation
        login(loginData: loginData): MutResponse!
        register(registerData: registerData): MutResponse!
        logout: Boolean!

        # Submit project
        submitProject(projectData: projectData): CustomResponse!
    }

`;

module.exports = typeDefs;
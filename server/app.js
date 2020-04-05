require('dotenv').config();
const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const session = require('./config/session');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

// a way to the images storage :)
app.use('/storage', express.static(path.join(__dirname, 'storage')));

// Parse http data
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(express.json({ extended: true, limit: "50kb" }));

const CORS_OPTIONS = {
    origin: 'http://localhost:3000',
    credentials: true
};

app.use(cors(CORS_OPTIONS));

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('DB is connected :)');
})
.catch(e => {
    console.log(`DB ERROR/ ${e}`)
})

// use the session
app.use(session())



// ####### Start the server ########
const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: (integrationCtxt) => ({
        session: integrationCtxt.req.session
    })
});

server.applyMiddleware({
    app,
    cors: CORS_OPTIONS
});

app.listen({port: 7000}, () => {
    console.log(`Server is working on http://localhost:7000${server.graphqlPath}`)
})
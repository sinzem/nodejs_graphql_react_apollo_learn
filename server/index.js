const express = require('express');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema');

const users = [

]

const app = express();

app.use(cors());

const root = {
    getAllUsers: () => {
        return users;
    },
    getUser: ({id}) => {
        return users.find(user => user.id == id);
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true, 
    schema,
    rootValue: root
}))

app.listen(5000, () => console.log(`Server started on port: 5000`));
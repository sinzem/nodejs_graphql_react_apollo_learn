const {buildSchema} = require('graphql');

/* (схема для работы graphql, в формаие строки, типизируем данные(обьекты User и Post, также User принимает постами массив с созданным типом Post), типизируем мутацию(инпуты, примерный аналог post и put, обязательные поля помечаем ! и саму функцию мутации(Mutations), в которую вносим соответствующий инпут и ожидаемый обьект на выходе), типизируем запрос(Query - вернет массив с юзерами или обьект с юзером по ID)) */
const schema = buildSchema(`
    
    type User {
        id: ID
        userName: String
        age: Int
        posts: [Post]
    }
    type Post {
        id: ID
        title: String
        content: String
    }

    input UserInput {
        id: ID
        userName: String!
        age: Int!
        posts: [PostInput]
    }
    input PostInput {
        id: ID
        title: String!
        content: String!
    }

    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }

    type Mutation {
        createUser(input: UserInput): User
    }

`)

module.exports = schema; /* (подключаем в index.js) */
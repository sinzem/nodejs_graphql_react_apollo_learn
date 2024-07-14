const express = require('express');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema');

const users = [
    {id:1, userName:"Vasiliy", age:26}
] /* (вместо БД) */

const app = express();

app.use(cors()); /* (для отправки запросов с клиента на сервер) */

const addIdForUser = (input) => {
    const id = Date.now();
    return {
        id, ...input
    }
} /* (функция добавит id к данным юзера при создании) */

const root = { /* (resolver - помещаем в него запросы из схемы(соответственно названиям) и cb-функции для них) */
    getAllUsers: () => {
        return users; /* (в д.с вместо БД используем встроенный выше массив) */
    },
    getUser: ({id}) => {
        return users.find(user => user.id == id);
    },
    createUser: ({input}) => {
        const user = addIdForUser(input);
        users.push(user);
        return user;
    }
}

app.use('/graphql', graphqlHTTP({ /* (graphql будет работать по данному адресу(localhost:5000/graphql)) */
    graphiql: true,  /* (графическая схема для graphq - интерфейс на странице) */
    schema, /* (подключаем схему) */
    rootValue: root /* (подключаем resolver) */
}))

app.listen(5000, () => console.log(`Server started on port: 5000`));

// localhost:5000/graphql выдает несложный интерфейс, где слева пишем запросы, справа получаем ответы
// query {
//   getAllUsers {
//     id, username, age
//   }
// } - /* запрос на получение всех пользователей - вернул обьект data, вложенный getAllUsers c массивом юзеров с указанными полями(отличается от http запросов тем, что получаем то, что указали, например только имена, а не обязательно все поля) */
// -----
// mutation {
//     createUser(input: {
//         userName: "Petya",
//         age: 31
//     }) {
//         id, userName
//     }
// } - /* (пример созджания пользователя(мутации), вторым обьектом передаем поля, которые вернет нам после создания) */
// -----
// mutation {
//     createUser(input: {
//         userName: "Andrey",
//         age: 31,
//       	posts: [{id:10, title:"Hello", content: "World"}]
//     }) {
//         id, userName
//     }
// }

// query{
//     getAllUsers{
//       id, userName, posts {
//         id
//       }
//     }
//   }
import { gql } from "@apollo/client"; /* (преобразует строку(запрос)) */

export const GET_ALL_USERS = gql`
    query {
        getAllUsers {
            id, userName, age
        }
    }
` /* (пишем запрос, передаем в App.js и навешиваем на кнопку) */

export const GET_ONE_USER = gql`
    query getUser($id: ID) {
        getUser(id: $id) {
            id, userName
        }
    }
`
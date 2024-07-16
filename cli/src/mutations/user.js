import { gql } from "@apollo/client"; /* (преобразует строку(запрос)) */

export const CREATE_USER = gql`
    mutation createUser($input: UserInput) {
        createUser(input: $input) {
            id, userName, age
        }
    }
` /* (пишем запрос для создания пользователя(в mutation строке параметрами пишем название и тип инпута, а в следующей его уже передаем), передаем в App.js и навешиваем на кнопку) */

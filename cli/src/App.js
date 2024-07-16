import { useEffect, useState } from 'react';
import './App.css';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import { CREATE_USER } from './mutations/user';

function App() {
  const {data, loading, error, refetch} = useQuery(GET_ALL_USERS/* , {pollInterval: 500} */); /* (спец.хук apollo(useQuery), в который подключаем свой запрос, data выдаст их состояние, но лучше сохранить отдельно(в users), refetch для переобновления при изменении в БД - запускаем после добавления нового пользователя, pollInterval - частота переобновления в мс) */
  const {data: oneUser, loading: loadingOneUser} = useQuery(GET_ONE_USER, {
    variables: {
        id: 1
    }
  });
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  /* (состояния для инпутов) */
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState('');

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data])
  
  console.log(oneUser);

  const addUser = (e) => {
    e.preventDefault(e);
    newUser({
      variables: {
        input: {
            userName: userName,
            age: age
        }
      }
    }).then(({data}) => {
      console.log(data);
      setUserName('');
      setAge('');
    })
  }

  const getAll = e => {
    e.preventDefault();
    refetch();
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <form>
        <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" />
        <input value={age} onChange={(e) => setAge(Number(e.target.value))} type="number" />
        <div className="btns">
          <button onClick={e => addUser(e)}>Создать</button>
          <button onClick={e => getAll(e)}>Получить</button>
        </div>
      </form>
      <div>
        {users.map(user => 
          <div className='user'>{user.id}. {user.userName} {user.age}</div>
        )}
      </div>
    </div>
  );
}

export default App;

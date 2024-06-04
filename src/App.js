import { useReducer } from "react";

const reducer = (state, action) => {
  switch(action) {
    case "INCREASE":
      return state + 1;
    case "DECREASE":
      return state - 1;
    case "DELETE_ALL":
      return 0;
    default:
      return state;
  }
}

const reducer2 = (state, action) => {
  switch(action.type) {
    case 'ASSIGN_VALUE':
      return action.data;
    default:
      return state;
  }
}

const initState = {
  loading: false,
  data: [],
  error: null
};

const userReducer = (state, action) => {
  switch(action.type) {
    case 'GET_USER_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.data
      }
    case 'GET_USER_ERROR':
      return {
        ...state,
        data: [],
        error: action.data
      }
    default:
  }
};

function App() {
  const [count, dispatch] = useReducer(reducer, 0);
  const [count2, dispatch2] = useReducer(reducer2, 0);
  const [user, userDispatch] = useReducer(userReducer, initState);

  const getUsers = () => {
    userDispatch({ type: 'GET_USER_REQUEST' });

    setTimeout(() => {
      fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(res => {
        userDispatch({
          type: 'GET_USER_SUCCESS',
          data: res
        });
      })
      .catch(err => {
        userDispatch({
          type: 'GET_USER_ERROR',
          data: err
        })
      })
    }, 2000);
  } 

  return (
    <>
      <button onClick={getUsers}>GET USERS</button>
      {user.loading ? <p>Loading...</p> : <p>{JSON.stringify(user)}</p>}

      <p>Count: {count}</p>
      <button onClick={() => dispatch('INCREASE')}>INCREASE</button>
      <button onClick={() => dispatch('DECREASE')}>DECREASE</button>
      <button onClick={() => dispatch('DELETE_ALL')}>DELETE ALL</button>

      <p>Count2: {count2}</p>
      <button onClick={() => dispatch2({
        type: 'ASSIGN_VALUE',
        data: 10
      })}>ASSIGN VALUE</button>
    </>
  );
}

export default App;

/*
  ACTION 'ADD_NEW_ITEM'

  VIEW : Nhan len 1 BUTTON dispatch('ADD_NEW_ITEM')

  REDUCERS (state, action) => {
    switch(action) {
      case 'ADD_NEW_ITEM':
        return state + 1;
      case 'ABC':
    }
  }
*/
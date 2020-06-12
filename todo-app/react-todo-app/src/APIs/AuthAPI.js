import axios from 'axios';
export const API_URL = 'http://localhost:4000/index/';

// Create new user in the database
export async function signUp(obj){
  axios.post(API_URL, obj).then(res => res.status
    /* window.localStorage.setItem('token', res.data.token)  */
  )
    .catch(err => console.log(err.message));
}

export function login(obj){
  const data = {
    email: obj.email,
    password: obj.password
  }
  return axios.post(API_URL + '/login', data, {
    headers: obj.headers
  })
  .then(res => {if(res.status === 200) {
    console.log(res)
    /* localStorage.setItem('user', res.data.user.username);
    window.location = '/todos';  */}})
  .catch(err => console.log(err) )
}

// Delete user account
export function deleteAccount(id) {
    axios.delete(API_URL + id)
    .then( response => console.log(response.data))
    .catch(err => console.log(err.message));
    window.location.reload();
}

// Update user info
export async function updateUserInfo(user){
    axios.put(API_URL + user._id, user)
    .then(console.log(user))
    .then( res => console.log(res))
    .catch(err => console.log(err.response, user._id));
}

import axios from "./axios";

// const apiServerUrl = "http://127.0.0.1:8000"
//const apiServerUrl = process.env.REACT_APP_DJANGO_BACKEND

const usersAPI = axios.create({
  baseURL: `${axios.defaults.baseURL}/usuarios/Usuario`
})
export const getAllUsers = () => usersAPI.get('/');
export const getUserId = (id) => usersAPI.get(`/${id}/`);
export const getUserNick = (nickname) => usersAPI.get(`/nick/${nickname}/`);
export const crearUsuario = (user) => usersAPI.post('/',user);
export const actualizarUsuario = (user) => usersAPI.put(`/${user.user_id}/`, user);
//export const crearUsuario = (user) => usersAPI.post('/create',user);

import axios from 'axios';

const API = axios.create({ 
  baseURL: 'http://localhost:5000'
});


// logowanie
export const signIn = (userData) => API.post('/user/signin', userData);
// rejestracja nowego użytkownika
export const signUp = (userData) => API.post('/user/signup', userData);


// dodanie zadania użytkownikowi
export const addNewTask = (userId, newTask) => API.post(`/user/${userId}`, newTask);
// aktualizacja istniejącego taska
export const updateTask = (userId, taskId, updatedTask) => API.patch(`/user/${userId}/${taskId}`, updatedTask);
// usuwanie taska
export const deleteTask = (userId, taskId) => API.delete(`/user/${userId}/${taskId}`);
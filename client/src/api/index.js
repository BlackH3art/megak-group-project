import axios from 'axios';

const API = axios.create({ 
  baseURL: 'http://localhost:5000'
});


// logowanie
export const signIn = (userData) => API.post('/auth/sign-in', userData);
// rejestracja nowego użytkownika
export const signUp = (userData) => API.post('/auth/sign-up', userData);

// pobieranie wszystkich tasków
export const getTasks = (userId) => API.get(`/user/${userId}/task`);
// dodanie zadania użytkownikowi
export const addNewTask = (userId, newTask) => API.post(`/user/${userId}/task`, newTask);
// aktualizacja istniejącego taska
export const updateTask = (userId, taskId, updatedTask) => API.patch(`/user/${userId}/${taskId}`, updatedTask);
// usuwanie taska
export const deleteTask = (userId, taskId) => API.delete(`/user/${userId}/${taskId}`);
// usuwanie użytkownika
export const deleteUser = (userId) => API.delete(`/user/${userId}`);
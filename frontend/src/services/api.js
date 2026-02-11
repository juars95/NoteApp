import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/notes';

export const getActiveNotes = () => axios.get(API_URL);
export const getArchivedNotes = () => axios.get(`${API_URL}/archived`);
export const createNote = (note) => axios.post(API_URL, note);
export const updateNote = (id, note) => axios.patch(`${API_URL}/${id}`, note);
export const toggleArchiveNote = (id) => axios.patch(`${API_URL}/${id}/archive`);
export const deleteNote = (id) => axios.delete(`${API_URL}/${id}`);

export const getCategories = () => axios.get(`${API_URL}/categories`);
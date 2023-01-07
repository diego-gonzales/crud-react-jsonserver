import { http } from "../interceptors/axiosInterceptor";
const apiUrl = import.meta.env.VITE_API_URL;

export const getCharacters = async () => {
  const { data } = await http.get('characters');
  return data;
};

export const getCharacter = async (id) => {
  const { data } = await http.get(`/characters/${id}`);
  return data;
};

export const createCharacter = async (character) => {
  const { data } = await http.post('/characters', character);
  return data;
};

export const updateCharacter = async (id, character) => {
  const { data } = await http.put(`/characters/${id}`, character);
  return data;
};

export const deleteCharacter = async (id) => {
  const { data } = await http.delete(`/characters/${id}`);
  return data;
};

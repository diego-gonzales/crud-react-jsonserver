const apiUrl = import.meta.env.VITE_API_URL;

export const getCharacters = async () => {
  const url = `${apiUrl}/characters`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
};

export const getCharacter = async (id) => {
  const url = `${apiUrl}/characters/${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
};

export const createCharacter = async (character) => {
  const url = `${apiUrl}/characters`;
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(character),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await resp.json();
  return data;
};

export const updateCharacter = async (id, character) => {
  const url = `${apiUrl}/characters/${id}`;
  const resp = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(character),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await resp.json();
  return data;
};

export const deleteCharacter = async (id) => {
  const url = `${apiUrl}/characters/${id}`;
  const resp = await fetch(url, { method: "DELETE" });
  const data = await resp.json();
  return data;
};

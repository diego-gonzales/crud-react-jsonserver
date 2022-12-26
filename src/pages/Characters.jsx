import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteCharacter, getCharacters } from "../services/characters";

const Characters = () => {
  const [characters, setCharacters] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure to delete this character?");

    if (!confirmDelete) return;

    await deleteCharacter(id);
    const newCharacters = characters.filter((character) => character.id !== id);
    setCharacters(newCharacters);
  };

  useEffect(() => {
    setIsLoading(true);
    getCharacters()
      .then((resp) => setCharacters(resp))
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <div>
        <Link className="btn btn-primary" to="/character/add">
          Add
        </Link>
      </div>
      {isLoading && <p>Loading...</p>}
      {characters && (
        <table className="table text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Anime</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {characters.length ? (
              characters.map((character) => (
                <tr key={character.id}>
                  <td>{character.id}</td>
                  <td>{character.name}</td>
                  <td>{character.anime}</td>
                  <td>
                    <Link
                      className="btn btn-success mx-1"
                      to={`/character/edit/${character.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger mx-1"
                      onClick={() => handleDelete(character.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Characters;

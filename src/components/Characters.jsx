import { useState, useEffect } from "react";
import { deleteCharacter, getCharacters } from "../services/characters";
import Message from "./Message";
import { Link } from "react-router-dom";

const Characters = () => {
  const [characters, setCharacters] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = async (character) => {
    const areYouSure = confirm("Are you sure to delete character?");

    if (!areYouSure) return;

    await deleteCharacter(character.id);
    const newCharacters = characters.filter(element => element.id !== character.id);
    setCharacters(newCharacters);
  }

  useEffect(() => {
    getCharacters()
      .then((resp) => setCharacters(resp))
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <h2>List</h2>
      <div>
        <Link to="/character/add" className="btn btn-primary">
          Add
        </Link>
      </div>
      {isLoading && <Message message="Loading..." type="primary" />}
      {characters && (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Anime</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {characters.length > 0 ? (
              characters.map((element) => (
                <tr key={element.id}>
                  <td>{element.id}</td>
                  <td>{element.name}</td>
                  <td>{element.anime}</td>
                  <td>
                    <Link
                      to={`/character/edit/${element.id}`}
                      className="btn btn-success"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => handleDelete(element)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Characters;

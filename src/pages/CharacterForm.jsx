import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ACTION_TYPES } from "../actions/charactersActions";
import { CharactersDispatchContext } from "../contexts/charactersContext";
import {
  createCharacter,
  getCharacter,
  updateCharacter
} from "../services/characters";

const initialForm = {
  name: "",
  anime: ""
};

const CharacterForm = () => {
  const dispatch = useContext(CharactersDispatchContext);
  const [myForm, setMyForm] = useState(initialForm);
  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMyForm({
      ...myForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!myForm.name || !myForm.anime) return;

    if (!params.id) {
      const newCharacter = await createCharacter(myForm);
      dispatch({
        type: ACTION_TYPES.ADD,
        character: newCharacter
      });
    } else {
      const updatedCharacter = await updateCharacter(params.id, myForm);
      dispatch({
        type: ACTION_TYPES.UPDATE,
        id: params.id,
        character: updatedCharacter
      });
    }

    navigate("/characters");
  };

  useEffect(() => {
    if (!params.id) return;

    getCharacter(params.id)
      .then((resp) => setMyForm(resp))
      .catch(console.log);
  }, []);

  return (
    <div>
      <h2>{params.id ? "Edit character" : "Add character"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={myForm.name}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="anime" className="form-label">
                Anime
              </label>
              <input
                type="text"
                id="anime"
                name="anime"
                className="form-control"
                value={myForm.anime}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-6">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CharacterForm;

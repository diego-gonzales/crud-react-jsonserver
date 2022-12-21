import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createCharacter,
  getCharacter,
  updateCharacter
} from "../services/characters";

const initialForm = {
  name: "",
  anime: ""
};

const CharactersForm = () => {
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
      await createCharacter(myForm);
    } else {
      await updateCharacter(params.id, myForm);
    }
    navigate("/");
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
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                onChange={handleChange}
                value={myForm.name}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="anime" classanime="form-label">
                Anime
              </label>
              <input
                id="anime"
                name="anime"
                type="text"
                className="form-control"
                onChange={handleChange}
                value={myForm.anime}
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

export default CharactersForm;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createCharacter,
  getCharacter,
  updateCharacter
} from "../services/characters";
import { useDispatch } from "react-redux";
import {
  createMyCharacter,
  updateMyCharacter
} from "../store/slices/characterSlice";
import { useForm } from "react-hook-form";

const initialForm = {
  firstname: "",
  lastname: "",
  email: "",
  dni: "",
  age: null
};

const CharactersForm = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: initialForm
  });

  const onSubmit = async (data) => {
    if (!params.id) {
      const createdCharacter = await createCharacter(data);
      dispatch(createMyCharacter(createdCharacter));
    } else {
      const updatedCharacter = await updateCharacter(params.id, data);
      dispatch(updateMyCharacter(updatedCharacter));
    }
    navigate("/");
  };

  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    if (!params.id) return;

    getCharacter(params.id)
      .then((resp) => {
        const { id, ...resto } = resp;
        reset({...resto});
        // setValue("firstname", resp.firstname);
        // setValue("lastname", resp.lastname);
      })
      .catch(console.log);
  }, []);

  return (
    <div>
      <h2>{params.id ? "Edit character" : "Add character"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="firstname" className="form-label">
                Firstname
              </label>
              <input
                id="firstname"
                type="text"
                className="form-control"
                {...register("firstname", { required: true })}
              />
              {errors.firstname && (
                <small className="form-text text-danger">
                  This field is required
                </small>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="lastname" classanime="form-label">
                Lastname
              </label>
              <input
                id="lastname"
                type="text"
                className="form-control"
                {...register("lastname", { required: true })}
              />
              {errors.lastname?.type === "required" && (
                <small className="form-text text-danger">
                  This field is required
                </small>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="email" classanime="form-label">
                Email
              </label>
              <input
                id="email"
                type="text"
                className="form-control"
                {...register("email", { required: true, pattern: regexEmail })}
              />
              {errors.email?.type === "required" && (
                <small className="form-text text-danger">
                  This field is required
                </small>
              )}
              {errors.email?.type === "pattern" && (
                <small className="form-text text-danger">
                  Email is invalid
                </small>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="dni" classanime="form-label">
                DNI
              </label>
              <input
                id="dni"
                type="number"
                className="form-control"
                {...register("dni", {
                  required: true,
                  minLength: 8,
                  maxLength: 8
                })}
              />
              {errors.dni?.type === "required" && (
                <small className="form-text text-danger">
                  This field is required
                </small>
              )}
              {errors.dni?.type === "minLength" && (
                <small className="form-text text-danger">
                  DNI must have 8 characters
                </small>
              )}
              {errors.dni?.type === "maxLength" && (
                <small className="form-text text-danger">
                  DNI must have 8 characters
                </small>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="age" classanime="form-label">
                Age
              </label>
              <input
                id="age"
                type="number"
                className="form-control"
                {...register("age", {
                  required: true,
                  min: 18
                })}
              />
              {errors.age?.type === "required" && (
                <small className="form-text text-danger">
                  This field is required
                </small>
              )}
              {errors.age?.type === "min" && (
                <small className="form-text text-danger">
                  Age must be over 18
                </small>
              )}
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

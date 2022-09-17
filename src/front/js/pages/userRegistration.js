import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const UserRegistration = () => {
  const [info, setInfo] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  console.log(errors);

  const handleInputChange = (event) => {
    //console.log(event.target.value);
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  //form submit
  const onSubmit = (data) => {
    // e.preventDefault();
    addInfo(data);
    if (data) {
      navigate("/registrationValidated");
    }
  };

  //llamada fetch api
  const addInfo = (info) => {
    fetch(process.env.BACKEND_URL + "/api/user", {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
      });
  };

  return (
    <div className="registro">
      <div className="registration col-12 mb-3 mt-5 text-center"></div>

      <div className="row">
        <div className="container_form">
          <form
            className="form"
            onSubmit={handleSubmit(onSubmit)}
            id="registration"
          >
            <div className="col-12 mb-3 mt-1 text-center">
              <p>
                <b>¿No tienes una cuenta?</b>
              </p>
              <input
                className="input-reg mt-1"
                name="name"
                placeholder=" Nombre"
                autoComplete="off"
                type="text"
                {...register("name", {
                  required: "Por favor, introduce un nombre válido",
                  minLength: {
                    value: 3,
                    message: "Por favor, introduce un nombre válido",
                  },
                })}
                onChange={handleInputChange}
              />
              <p>{errors.name?.message}</p>
            </div>

            <div className="col-12  mb-3 text-center">
              <input
                className="input-reg"
                name="lastName"
                placeholder=" Apellido"
                autoComplete="off"
                type="text"
                {...register("lastName", {
                  required: "Por favor, introduce un apellido válido",
                  minLength: {
                    value: 3,
                    message: "Por favor, introduce un apellido válido",
                  },
                })}
                onChange={handleInputChange}
              />
              <p>{errors.name?.message}</p>
            </div>

            <div className="col-12 mb-3 text-center">
              <input
                className="input-reg"
                name="email"
                placeholder=" Email"
                autoComplete="off"
                type="text"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Por favor, introduce un email válido",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Por favor, introduce un email válido",
                  },
                })}
                onChange={handleInputChange}
              />
              <p>{errors.email?.message}</p>
            </div>

            <div className="col-12  mb-5 text-center">
              <input
                className="input-reg"
                name="password"
                placeholder=" Contraseña"
                autoComplete="off"
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Por favor, introduce una contraseña válida",
                  },
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                })}
                onChange={handleInputChange}
              />
              <p>{errors.password?.message}</p>
            </div>

            <div className="col-12  mb-3 text-center">
              <button className="ctaregister">
                <span>Enviar</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

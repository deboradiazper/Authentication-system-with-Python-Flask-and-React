import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();

  console.log("this is your token", store.token);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await actions.login(email, password);
    console.log(result);
    if (result) {
      navigate("/registrationValidated ");
    } else {
      setError("Email o contraseña incorrectos");
    }
  };

  return (
    <div className="logueo registro position-absolute top-50 start-50 translate-middle">
      <div className="col-12 text-center mt-5">
        <div>
          <div className="row">
            <div className="container_form">
              <form onSubmit={handleSubmit} className="form" id="registration">
                <div className="col-12 text-center mt-2 mb-3">
                  <p>
                    <b>Inicia sesión</b>
                  </p>
                  <input
                    className="input-reg mt-1"
                    name="email"
                    value={email}
                    placeholder="Email"
                    autoComplete="off"
                    type="text"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="col-12 text-center mb-5">
                  <input
                    className="input-reg"
                    name="Password"
                    value={password}
                    placeholder="contraseña"
                    autoComplete="off"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  {error ? <p className="error">{error}</p> : ""}
                </div>
                <div className="col-12 text-center mb-3">
                  <button class="ctalogin">
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
      </div>
    </div>
  );
};

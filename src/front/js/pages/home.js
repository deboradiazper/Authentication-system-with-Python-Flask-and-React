import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { UserRegistration } from "./userRegistration";

export const Home = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <UserRegistration />
        </div>
      </div>
    </div>
  );
};

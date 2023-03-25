import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { updateUser } from "../redux/slices/userSlice";
import { User, Response } from "../types";
import { useNavigate } from "react-router-dom";

const useGoogleData = (): void => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  function handleCallbackResponse(response: Response) {
    const userObject: User = jwt_decode(response.credential);
    if (response.credential) {
      localStorage.setItem("token", response.credential);
      if (userObject.email === "abdul.mughees009@gmail.com") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
    dispatch(updateUser(userObject));
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "1096442355869-9ukv8bd315n3sa8lm8jast2tr33ukig7.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    window.google.accounts.id.renderButton(document.querySelector("#signIn"), {
      theme: "outline",
      size: "large",
    });

    window.google.accounts.id.prompt();
  });
};

export default useGoogleData;

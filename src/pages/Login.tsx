import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useGoogleData from "../hooks/useGoogleLogin";
import { clearUser, updateUser } from "../redux/slices/userSlice";
import { AppDispatch, RootState } from "../store";

const Login = () => {
  const user = useSelector((state: RootState) => state.userData.data);
  const dispatch = useDispatch<AppDispatch>();
  const google = useGoogleData();

  console.log(user);

  return (
    <>
      {user[0].family_name === "" ? (
        <div className="bg-yellow flex justify-center items-center h-screen w-screen">
          <button id="signIn"></button>
        </div>
      ) : (
        <div className="bg-yellow flex justify-center items-center h-screen w-screen">
          <a href="/library"></a>
        </div>
      )}
    </>
  );
};

export default Login;

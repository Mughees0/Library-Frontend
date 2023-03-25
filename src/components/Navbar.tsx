import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser, fetchUser } from "../redux/slices/userSlice";
import { AppDispatch, RootState } from "../store";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.userData.data);
  const dispatch = useDispatch<AppDispatch>();
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser());
    const items = localStorage.getItem("token");
    if (items) {
      setToken(items);
    }
  }, [user, token]);

  return (
    <nav className="h-12">
      <ul className="flex justify-between items-center ">
        <li className="flex items-center justify-between w-32">
          <img className="h-12 " src={logo} /> e-Books
        </li>
        <li>
          <a href="/"></a>
        </li>
        <li className="pr-6">
          {!token ? (
            <a href="/login">Login</a>
          ) : (
            <button
              id="signOut"
              onClick={() => {
                dispatch(clearUser());
                localStorage.clear();
                navigate("/login");
              }}
            >
              Sign Out
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

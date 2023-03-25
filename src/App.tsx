import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "./pages/Library";
import Login from "./pages/Login";
import UserLibrary from "./pages/userLibrary";
import Navbar from "./components/Navbar";
import Admin from "./pages/admin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen text-center">
        <div className=" h-screen bg-yellow-100">
          <Routes>
            {/* <Route path="/" element={<Library />} /> */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<UserLibrary />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import LandingPage from './components/LandingPage'
import TossPage from './components/TossPage'
import PlayGroundPage from './components/PlayGroundPage';

function App() {
 

  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "0.2em",
          background: "linear-gradient(40deg,white,pink 40%,orange)"
        }}
      >
        <Link to="/">
        <img
          style={{ borderRadius: "1em",width:"100%",maxWidth:"6em",height:"5em" }}
          src="/virat-kohli-6690366_1280.png"
          alt="logo"
        />
</Link>
        <h4 style={{ fontSize: "3em", color: "purple" }}>Hand Cricket</h4>
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/Toss" element={<TossPage />}></Route>
        <Route path="/Playground" element={<PlayGroundPage/>}></Route>
      </Routes>
      <div className="text-white fs-5 text-center p-1 mt-2">
          Creator :-  @Rakesh_Mandal
      </div>
    </BrowserRouter>
  );
}

export default App
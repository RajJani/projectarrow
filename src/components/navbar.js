/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import logo from "../assets/GLS-logo-white.png";
import { Link } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
// import { Button } from "@mui/material";
import { authProvider } from "../authProvider";
import { AzureAD, AuthenticationState } from "react-aad-msal";
import "../styles/navbar.css";

function navbar() {
  const [openLinks, setopenLinks] = useState(false);
  const togglenavbar = () => {
    setopenLinks(!openLinks);
  };

  return (
    <AzureAD provider={authProvider}>
      {/* forceLogin={true}> */}
      {({ login, logout, authenticationState, error, accountInfo }) => {
        switch (authenticationState) {
          case AuthenticationState.Authenticated:
            return (
              <div className="App">
                <div className="navbar">
                  <div className="leftSide" id={openLinks ? "open" : "close"}>
                    <img src={logo} alt="logo" />
                    <div className="hiddenLinks">
                      <Link to="/"> Home </Link>
                      <Link to="/queues"> Queues </Link>
                      <Link to="/reports"> Reports </Link>
                      <Link to="/" onClick={logout}> Logout </Link>
                    </div>
                  </div>
                  <div className="rightSide">
                    <Link to="/"> Home </Link>
                    <Link to="/queues"> Queues </Link>
                    <Link to="/reports"> Reports </Link>
                    <Link to="/" onClick={logout}> Logout </Link>
                    <button onClick={togglenavbar}>
                      <ReorderIcon />
                    </button>
                  </div>
                </div>
              </div>
            );
          case AuthenticationState.Unauthenticated:
            return (
              <div className="navbar">
                <div className="leftSide" id={openLinks ? "open" : "close"}>
                  <img src={logo} alt="logo" />
                  <div className="hiddenLinks">
                  <Link to='/' onClick={login}>Login</Link>
                  </div>
                </div>
                <div className="rightSide">
                 <Link to='/' onClick={login}>Login</Link>
                  <button onClick={togglenavbar}>
                    <ReorderIcon />
                  </button>
                </div>
              </div>
            );
          default:
            return
        }
      }}
    </AzureAD>
  );
}

export default navbar;

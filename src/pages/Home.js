import React from "react";
// import { Link } from "react-router-dom";
import "../styles/home.css";
import { Button } from "@mui/material";
import { authProvider } from "../authProvider";
import { AzureAD, AuthenticationState } from "react-aad-msal";
import Axios from "axios";

function Home() {
  return (
    <AzureAD provider={authProvider}>
      {/* forceLogin={true}> */}
      {({ login, logout, authenticationState, error, accountInfo }) => {
        switch (authenticationState) {
          case AuthenticationState.Authenticated:
            const getsqldata = () => {
              Axios.get("http://localhost:3001/").then((response) => {
                window.alert(response)
              });
            };
            getsqldata();
            return (
              <div className="headerContainer">
                <h1> Funder Work Action Tool </h1>
                <h2> YOU GOT THIS!! </h2>
                
                <Button size="medium" variant="contained" onClick={logout}>
                  LOGOUT
                </Button>
              </div>
            );
          case AuthenticationState.Unauthenticated:
            return (
              <div className="headerContainer">
                <h1> Funder Work Action Tool </h1>
                <h2> PLEASE LOG IN!! </h2>

                <Button size="medium" variant="contained" onClick={login}>
                  LOGIN
                </Button>
              </div>
            );
          case AuthenticationState.InProgress:
            return <p>Authenticating...</p>;
          default:
            return <p>default</p>;
        }
      }}
    </AzureAD>
  );
}

export default Home;

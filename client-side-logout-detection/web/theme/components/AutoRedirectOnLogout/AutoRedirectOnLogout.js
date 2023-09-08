import React from "react";
import EnhanceAutoRedirectOnLogout from "./EnhanceAutoRedirectOnLogout";

const AutoRedirectOnLogout = (props) => {
  return (
    <div style={{ textAlign: "center", fontSize: "0.8em" }}>
      This component monitors the user login state.
      <br />
      {props.isLoggedIn ? "Logged in" : "Logged out"} - Polling:{" "}
      {props.pollingEnabled ? "enabled" : "disabled"}
    </div>
  );
};

export default EnhanceAutoRedirectOnLogout(AutoRedirectOnLogout);

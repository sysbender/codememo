import React from "react";
import LoginForm from "./LoginForm";
import LoadProjectForm from "./LoadProjectForm";
import Logout from "./Logout";
import { useAuth } from "./AuthContext";
export default function ToolBar({ setCustomSetup }) {
  const { isAuthenticated } = useAuth();
  return (
    <div
      style={{
        display: "flex",
        // flexDirection: "column",
        justifyContent: "space-between",
        height: "42px",
        // paddingTop: "auto",
        // paddingBottom: "auto",
        alignItems: "center",
      }}
    >
      {isAuthenticated ? (
        <>
          <Logout /> <LoadProjectForm setCustomSetup={setCustomSetup} />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

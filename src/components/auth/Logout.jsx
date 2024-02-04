import React from "react";
import { useAuth } from "./AuthContext";
export default function Logout() {
  const { connection, logout } = useAuth();
  return (
    <div>
      <span>{connection.name}</span>
      <button style={{ marginLeft: "8px" }} onClick={logout}>
        Logout
      </button>
    </div>
  );
}

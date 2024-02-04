import React, { useState } from "react";
import { ghConnect } from "../../service/githubService";
import { useAuth } from "./AuthContext";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  const { login } = useAuth();
  async function submitHandler(event) {
    event.preventDefault();

    const loginFormData = new FormData(event.target);
    const loginFormObject = Object.fromEntries(loginFormData.entries());

    await login(loginFormObject.token);
    //const connect = await ghConnect(loginFormObject.token);
    // if (connect ) {
    //   console.log("Connected to Github : ", connect.name);
    // } else {
    //   console.log(" failed to connect to GitHub!!!");
    // }
  }
  return (
    <form onSubmit={submitHandler}>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="token"
          placeholder="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          autoComplete="on"
        />
        <button>Login</button>
      </div>
    </form>
  );
}

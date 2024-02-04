import React, { useReducer, useContext, createContext } from "react";
import { ghConnect } from "../../service/githubService";

const AuthContext = createContext();

const initialState = { connection: null, isAuthenticated: false };

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, connection: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, connection: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action : only login and logout allowed");
  }
}
function AuthProvider({ children }) {
  const [{ connection, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(token) {
    // const fakerUser = {
    //   username: "abc",
    //   token: "abc",
    // };

    const connection = await ghConnect(token);
    if (connection) dispatch({ type: "login", payload: connection });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        connection,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Error : AuthContext was used outside AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };

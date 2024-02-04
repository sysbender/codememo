import React from "react";
import Playground from "./Playground.jsx";
//import AuthUI from "./components/auth/AuthUI.jsx";
import { AuthProvider } from "./components/auth/AuthContext.jsx";
export default function App() {
  return (
    <AuthProvider>
      <Playground />;
    </AuthProvider>
  );

  // return <AuthUI />;
  // return (
  //   <main>
  //     <h1>Hello React</h1>
  //     <button>Click Me!!!</button>
  //   </main>
  // );
}

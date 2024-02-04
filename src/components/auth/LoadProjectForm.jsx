import React from "react";

export default function LoadProjectForm() {
  function submitHandler(event) {
    event.preventDefault();
  }
  return (
    <form onSubmit={submitHandler}>
      <input type="text" name="projectUrl" placeholder="Project URL" />
      <button style={{ marginLeft: "8px" }}>Load</button>
    </form>
  );
}

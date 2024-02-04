import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { getProjectFiles, loadProject } from "../../service/githubService";

export default function LoadProjectForm() {
  const [projectUrl, setProjectUrl] = useState("");
  const { connection } = useAuth();

  /**
   * 
   * https://github.com/sysbender/react-complete-guide-course-resources/tree/main/code/05%20Essentials%20Practice/01-starting-project
   * 
   * 
  const repo = "react-complete-guide-course-resources";
  const p = "code/03 React Essentials/01-starting-project";
  const contentFiles = [],
    externalUrls = [];
  getProjectFiles(owner, repo, p, p, contentFiles, externalUrls);
   */

  async function submitHandler(event) {
    event.preventDefault();
    // await getProjectFiles(
    //   connection.octokit,
    //   connection.login,
    //   repo,
    //   projectRoot,
    //   searchPath,
    //   contentFiles,
    //   externalUrls
    // );
    const { files, urls } = await loadProject(connection.octokit, projectUrl);
    console.log("files, urls", files.length, urls.length);
  }
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        name="projectUrl"
        placeholder="Project URL"
        value={projectUrl}
        onChange={(e) => setProjectUrl(e.target.value)}
      />
      <button style={{ marginLeft: "8px" }}>Load</button>
    </form>
  );
}

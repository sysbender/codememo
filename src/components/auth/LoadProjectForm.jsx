import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { getProjectFiles, loadProject } from "../../service/githubService";

import { customSetupFactory } from "../../service/customSetupFactory";
export default function LoadProjectForm({ setConfig }) {
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
    const custom = customSetupFactory({ files, urls });
    const custom0 = {
      entry: "/src/index.jsx",
      dependencies: {
        react: "^18.0.0",
        "react-dom": "^18.0.0",
      },
    };
    const custom1 = {
      entry: "/src/index.jsx",
      dependencies: {
        react: "^18.0.0",
        "react-dom": "^18.0.0",
      },
    };

    const toRemove = [
      "/package.json",
      "/package-lock.json",
      "/vite.config.js",
      "/vite.config.ts",
    ];

    for (const k of Object.keys(files)) {
      if (toRemove.indexOf(k) !== -1) {
        delete files[k];
      }
      // if (k === "/src/index.jsx") {
      //   const code = { ...files[k] };
      //   delete files[k];
      //   files["/src/index.js"] = code;
      //   custom.entry = "/src/index.js";
      // }
    }

    let config = {
      customSetup: custom,
      files,
      template: "react",
    };

    config["options"] = {
      externalResources: ["https://cdn.tailwindcss.com"],
    };

    console.log("config=", config);
    const files1 = setConfig(config);
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
      <button type="submit" style={{ marginLeft: "8px" }}>
        Load
      </button>
    </form>
  );
}

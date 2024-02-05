import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackConsole,
  SandpackPreview,
  SandpackLayout,
  DirectoryIconClosed,
} from "@codesandbox/sandpack-react";

import { SandpackFileExplorer } from "sandpack-file-explorer";

import Editor from "@monaco-editor/react";

import MonacoEditor from "./MonacoEditor";
import ToolBar from "./components/auth/ToolBar";

export default function Playground() {
  const files0 = {
    "App.js": `import { useState } from "react"
export default function App() {
const foo = useState("")
console.log(foo)
return (
  <>
  <h1>Hello Sandpack!!!</h1>
  </>
)
}`,
  };

  const files1 = {
    "/index.js": `console.log("hello Sand!!!")`,
  };
  const [config, setConfig] = useState({
    customSetup: {
      entry: "/index.js",
      dependencies: {
        react: "^18.0.0",
        "react-dom": "^18.0.0",
      },
    },
    files: files1,
    template: "react",
  }); // include customSetup , files

  const files = {
    "/index.html": {
      code: `<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n        <title>React Essentials</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/index.jsx\"></script>\n  </body>\n</html>\n`,
    },
    "/src/App.jsx": {
      code: `function App() {\n  return (\n    <div>\n      <header>\n        <img src=\"src/assets/react-core-concepts.png\" alt=\"Stylized atom\" />\n        <h1>React Essentials</h1>\n        <p>\n          Fundamental React concepts you will need for almost any app you are\n          going to build!\n        </p>\n      </header>\n      <main>\n        <h2>Time to get started!</h2>\n      </main>\n    </div>\n  );\n}\n\nexport default App;\n`,
    },
    "/src/index.jsx": {
      code: `import ReactDOM from \"react-dom/client\";\n\nimport App from \"./App.jsx\";  \n\nconst entryPoint = document.getElementById(\"root\");\nReactDOM.createRoot(entryPoint).render(<App />);\n`,
    },
  };
  const s = {
    entry: "/src/index.jsx",
    environment: "create-react-app",
    dependencies: {
      react: "^18.0.0",
      "react-dom": "^18.0.0",
    },
  };

  const c = {
    entry: "/src/index.jsx",
    environment: "create-react-app",
    dependencies: {
      react: "^18.0.0",
      "react-dom": "^18.0.0",
    },
  };
  /**
   *  customSetup, files, template
   */
  return (
    <SandpackProvider
      {...config}
      // customSetup={config.customSetup}
      // files={config.files}
      // template={config.template}
      options={{
        externalResources: ["https://cdn.tailwindcss.com"],
      }}
    >
      <SandpackLayout
        style={{
          display: "flex",
        }}
      >
        <SandpackFileExplorer />

        <MonacoEditor />

        <div
          style={{ display: "flex", flexDirection: "column", width: "40vw" }}
        >
          <ToolBar setConfig={setConfig} />
          <SandpackPreview
            style={{
              border: "1px solid #339af0",
              height: "70vh",
              width: "100%",
            }}
          />
          <SandpackConsole
            style={{
              border: "1px solid #fcc419",
              height: "20vh",
              width: "100%",
            }}
          />
        </div>
      </SandpackLayout>
    </SandpackProvider>
  );
}

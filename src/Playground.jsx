import React from "react";
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
  return (
    <SandpackProvider template="react">
      <SandpackLayout
        style={{
          display: "flex",
        }}
      >
        <SandpackFileExplorer />

        <MonacoEditor />

        <div
          style={{ display: "flex", flexDirection: "column", width: "30vw" }}
        >
          <ToolBar />
          <SandpackPreview
            style={{
              border: "1px solid #339af0",
              height: "50vh",
              width: "100%",
            }}
          />
          <SandpackConsole
            style={{
              border: "1px solid #fcc419",
              height: "30vh",
              width: "100%",
            }}
          />
        </div>
      </SandpackLayout>
    </SandpackProvider>
  );
}

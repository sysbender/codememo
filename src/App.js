import { Sandpack } from "@codesandbox/sandpack-react";
import React from "react";
import Editor from "@monaco-editor/react";

import {
  useActiveCode,
  SandpackStack,
  FileTabs,
  useSandpack,
} from "@codesandbox/sandpack-react";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
export default function App() {
  return (
    <MySandpack
      template="react"
      theme="dark"
      options={{
        showConsole: true,
        showLineNumbers: true,
        showTabs: true,
        showNavigator: true,

        // readOnly: true,
      }}
      files={{
        "/App.js": `export default function App() {
        return <h1>Hello Sandpack 111</h1>
      }`,
        "App.css": `h1{color:red;}`,
      }}
    />
  );
}

export function App1() {
  return (
    <Sandpack
      template="react"
      theme="dark"
      options={{
        showConsole: true,
        showLineNumbers: true,
        showTabs: true,
        showNavigator: true,

        // readOnly: true,
      }}
      files={{
        "/App.js": `export default function App() {
        return <h1>Hello Sandpack 111</h1>
      }`,
      }}
    />
  );
}
export function App2() {
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />
  );
}

function MonacoEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  return (
    <SandpackStack style={{ height: "100vh", margin: 0 }}>
      <FileTabs />
      <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}>
        <Editor
          width="100%"
          height="100%"
          language="javascript"
          theme="vs-dark"
          key={sandpack.activeFile}
          defaultValue={code}
          onChange={(value) => updateCode(value || "")}
        />
      </div>
    </SandpackStack>
  );
}
export function MySandpack() {
  return (
    <SandpackProvider template="react" theme="dark">
      <SandpackLayout>
        <MonacoEditor /> // Your Monaco Editor Component
        <SandpackPreview style={{ height: "100vh" }} />
      </SandpackLayout>
    </SandpackProvider>
  );
}

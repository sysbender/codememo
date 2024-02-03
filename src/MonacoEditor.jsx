import React from "react";
import {
  useActiveCode,
  SandpackStack,
  FileTabs,
  useSandpack,
} from "@codesandbox/sandpack-react";

import Editor from "@monaco-editor/react";
import { getLanguageOfFile } from "./utils";

export default function MonacoEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  const language = getLanguageOfFile(sandpack.activeFile);

  return (
    <SandpackStack style={{ width: "30vw", height: "80vh", margin: 0 }}>
      <FileTabs />
      <div
        style={{
          paddingTop: 8,
          background: "#1e1e1e",
          height: "90vh",
        }}
      >
        <Editor
          language={language}
          theme="vs-dark"
          key={sandpack.activeFile}
          defaultValue={code}
          onChange={(value) => updateCode(value || "")}
        />
      </div>
    </SandpackStack>
  );
}

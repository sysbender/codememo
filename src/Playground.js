import {
  //   Sandpack,
  SandpackProvider,
  // ClasserProvider,
  // SandpackFileExplorer,
  //   SandpackCodeEditor,
  SandpackConsole,
  SandpackPreview,
  //   useActiveCode,
  SandpackLayout,
  //   SandpackStack,
  //   FileTabs,
  //   useSandpack,
} from "@codesandbox/sandpack-react";

// import { nightOwl } from "@codesandbox/sandpack-themes";
import { SandpackFileExplorer } from "sandpack-file-explorer";

import Editor from "@monaco-editor/react";
// import { getLanguageOfFile } from "./utils";
import MonacoEditor from "./MonacoEditor";

export default function Playground() {
  return (
    <SandpackProvider template="react">
      <SandpackLayout>
        <SandpackFileExplorer />
        <MonacoEditor />
        <div>
          <SandpackPreview
            style={{
              width: "30vw",
              height: "60%",
              border: "1px solid #339af0",
            }}
          />
          <SandpackConsole
            style={{
              width: "30vw",
              height: "40%",
              border: "1px solid #fcc419",
            }}
          />
        </div>
      </SandpackLayout>
    </SandpackProvider>
  );
}

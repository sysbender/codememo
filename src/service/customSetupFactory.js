// factor function for creating sandpack template for react project

/**
 *     entry: "/index.js",   - find <App /> in files
    environment: "create-react-app",
    dependencies
    files
 */
const indexJs = ({ main }) => `
import React from 'react'
import { createRoot } from 'react-dom/client'
import ${main} from './${main}.js'
	
const container = document.getElementById('app')
const root = createRoot(container)
root.render(<${main} />)
`;

const indexHtml = ({ main }) => `
<!DOCTYPE html>
 <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${main}</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`;

const setupReact = (options) => ({
  customSetup: {
    entry: "/index.js",
    environment: "create-react-app",

    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      "react-scripts": "^5.0.1",
      ...options.dependencies,
    },

    ...options.customSetup,
  },

  files: {
    "/index.js": {
      hidden: true,
      code: indexJs(options),
    },

    "/public/index.html": {
      hidden: true,
      code: indexHtml(options),
    },

    ...options.files,
  },
});

// Location of file as key (always starts with /)
// const files = {
//   "/Main.js": {
//     code: MainJs,
//   },
//   "/Time.js": {
//     code: TimeJs,
//   },
// };
// files -
// urls - external resource url , like img

function getEntry(files) {
  console.log("######files=", files);
  for (const [file, value] of Object.entries(files)) {
    const code = value.code;
    const app = "<App />";
    const app1 = "<App/>";
    // search <APP />
    if (code.indexOf(app) !== -1 || code.indexOf(app1) !== -1) {
      return file;
    }
  }
  return "";
}

function getEnvironment(files) {
  const dependencies = getDependencies(files);
  const packages = Object.keys(dependencies);
  if (packages.indexOf("React")) {
    return "create-react-app";
  }

  return "parcel"; //vanilla
}

function getDependencies(files) {
  // find package.json file
  for (const [file, value] of Object.entries(files)) {
    if (file === "/package.json") {
      const code = value.code;
      return JSON.parse(code).dependencies;
    }
  }
  return {};
}
//construct react custom setup
function customSetupFactory({ files, urls = {} }) {
  let customSetup = {};
  const entry = getEntry(files);
  if (entry) {
    customSetup["entry"] = entry;
  }

  // const environment = getEnvironment(files);
  // if (environment) {
  //   customSetup = {
  //     ...customSetup,
  //     environment,
  //   };
  // }

  const dependencies = getDependencies(files);
  customSetup["dependencies"] = dependencies;

  // customSetup = { ...customSetup, files };
  return customSetup;
}

export default setupReact;
export { customSetupFactory };

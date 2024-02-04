// factor function for creating sandpack template for react project
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

export default setupReact;

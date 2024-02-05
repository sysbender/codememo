import { Octokit } from "octokit";

let counter = 0;
const owner = "sysbender";
const repo = "trygit";
const author = {
  name: "My Name",
  email: "myemail@domain.com",
};

const url = "/repos/{owner}/{repo}/{path}"; // leave this as is
const ref = "heads/master"; // 'master' represents the name of my primary branch

// check user
async function ghConnect(personalToken) {
  const octokit = new Octokit({
    auth: personalToken,
  });

  try {
    const res = await octokit.request("GET /user");
    console.log("=============res:", res);

    const {
      data: { login, name },
    } = res;

    return { login, name, octokit };
    console.log(` auth as ${user.login}  ${user.name}`);
  } catch (error) {
    console.log(` Github connect error `, error.message);
    return null;
  }
}
// ----------------------push
async function pushContents() {
  const commits = await octokit.request("GET /repos/{owner}/{repo}/commits", {
    owner,
    repo,
  });

  const latestCommitSHA = commits.data[0].sha;
  console.log(commits.data[0].sha);

  const files = [
    {
      mode: "100644",
      path: "README.md",
      content: "Hello world 1",
    },
  ];

  const {
    data: { sha: treeSHA },
  } = await octokit.request("POST /repos/{owner}/{repo}/git/trees", {
    owner,
    repo,
    tree: files,
    base_tree: latestCommitSHA,
  });

  const {
    data: { sha: newCommitSHA },
  } = await octokit.request("POST /repos/{owner}/{repo}/git/commits", {
    owner,
    repo,
    message: "commit 1",
    author,
    tree: treeSHA,
  });

  const { data2 } = await octokit.request(
    "PATCH /repos/{owner}/{repo}/git/refs/{ref}",
    {
      owner,
      repo,
      ref,
      sha: newCommitSHA,
      force: true,
    }
  );
}

// util function : https://github.com/octokit/core.js/issues/535

/**
 *  searchpath = a/b/c
 *
 *  {part1}/{part2}/{part3}
 *
 *  {
 *      part1:"a",
 *      part2:"b",
 *      part3:"c"
 *  }
 */
function splitPath(path) {
  let partsName = [];
  let partsObj = {};
  let parts = path.split("/");
  for (const [index, partValue] of Object.entries(parts)) {
    const partName = `part${index}`;
    partsObj[partName] = partValue;
    partsName.push(partName);
  }

  const partsStr = partsName.map((value) => `{${value}}`).join("/");

  return { partsStr, partsObj };
}

// get content of folder

async function getProjectFiles(
  octokit,
  owner,
  repo,
  branch,
  projectRoot,
  searchPath,
  contentFiles,
  externalUrls
) {
  // counter += 1;
  // if (counter > 99) {
  //   throw new Error("over 99 times @@@@@@@@@@@@@@@@@@@@@@@@@@@");
  // }
  const contentFileExtensions = ["html", "js", "css", "jsx", "json"];
  const extternalFileExtensions = ["png", "jpg", "ico"];
  //react-complete-guide-course-resources/code/03 React Essentials/01-starting-project/
  // function btoa(content) {
  //   return Buffer.from(content, "base64").toString();
  // }
  function getExtension(filePath) {
    const index = filePath.lastIndexOf(".");
    if (index > 0) {
      return filePath.substring(index + 1);
    }
    return "";
  }
  try {
    console.log("searchpath = ", searchPath);
    const pathParts = splitPath(searchPath);

    const requestName = "GET /repos/{owner}/{repo}/contents/".concat(
      pathParts.partsStr
    );
    const requestValue = {
      ...pathParts.partsObj,
      owner,
      repo, //: "react-complete-guide-course-resources",
      ref: `refs/heads/${branch}`,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        accept: "application/vnd.github+json",
      },
    };
    const { data } = await octokit.request(requestName, requestValue);
    // console.log(data);
    if (Array.isArray(data)) {
      console.log("data=======", data);
      for (const item of data) {
        console.log("process folder==============", item.path);
        await getProjectFiles(
          octokit,
          owner,
          repo,
          branch,
          projectRoot,
          item.path,
          contentFiles,
          externalUrls
        );
      }
    } else {
      // file
      const { file, path: filePath, download_url, content, encording } = data;
      const ext = getExtension(filePath);
      console.log("ext=============", ext);
      if (contentFileExtensions.indexOf(ext) !== -1) {
        console.log(`relative path from = ${filePath}, to=${projectRoot}`);
        const relative = filePath.substring(projectRoot.length); // start with '/'
        //contentFiles.push({ relative, content: btoa(content) }); //,
        contentFiles[relative] = { code: atob(content) }; //,
      } else if (extternalFileExtensions.indexOf(ext) !== -1) {
        const relative = filePath.substring(projectRoot.length);
        externalUrls[relative] = { url: download_url }; //,
        contentFiles[relative] = { code: "//image placeholder" }; //
      }
    }

    // 1.folder 2. img file 3. other file
  } catch (error) {
    console.error(error.message);
    // console.error(
    //   `Error! Status: ${error.status}. Message: ${error.response.data.message}`
    // );
  }
}

async function loadProject(octokit, url) {
  //   * https://github.com/sysbender/react-complete-guide-course-resources/tree/main/code/05%20Essentials%20Practice/01-starting-project
  const urlObject = new URL(url);
  const pathname = urlObject.pathname;
  const [, owner, repo, tree, branch, ...rest] = pathname
    .split("/")
    .map((value) => decodeURIComponent(value));
  const files = {};
  const urls = {};
  const path = rest.join("/");
  console.log({ octokit, owner, repo, path, path, files, urls });
  await getProjectFiles(octokit, owner, repo, branch, path, path, files, urls);
  console.log("@@@@@@files = ", files);
  return {
    files,
    urls,
  };
}
export { ghConnect, getProjectFiles, loadProject };

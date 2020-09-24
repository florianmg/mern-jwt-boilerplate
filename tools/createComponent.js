const prompts = require("prompts");
const fs = require("fs");
const conf = require("./config.json");

const toPascalCase = (text) => {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
};

const clearAndUpper = (text) => {
  return text.replace(/-/, "").toUpperCase();
};

const createTemplates = (fileName) => {
  const component = `import React from 'react';

  import './${fileName}.scss';
  
  const ${fileName} = () => {
    return (
      <div>
        <p>${fileName} component</p>
      </div>
    );
  };
  
  export default ${fileName};
  `;

  const index = `export {default} from './${fileName}.component';`;

  return {
    component: component,
    index: index,
  };
};

const questions = [
  {
    type: "text",
    name: "folderName",
    message: "component folder name ? (kabab-case)",
  },
];

(async () => {
  try {
    const { folderName } = await prompts(questions);
    const fileName = toPascalCase(folderName);

    if (folderName === undefined) return false;

    const folderPath = conf.folders.components + folderName;
    const exist = await fs.existsSync(folderPath);

    if (exist) {
      console.log(`Component ${folderName} already exist`);
      return false;
    }

    await fs.mkdirSync(folderPath, { recursive: true });

    const { component, index } = createTemplates(fileName);

    await fs.writeFileSync(
      `${folderPath}/${fileName}.component.jsx`,
      component
    );
    await fs.writeFileSync(`${folderPath}/${fileName}.scss`, "");
    await fs.writeFileSync(`${folderPath}/index.js`, index);
  } catch (e) {
    console.log(e.message);
  }
})();

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");


const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the Title of Your Project?"
    },
    {
      type: "input",
      name: "description",
      message: "How Would You Describe Your Project?"
    },
    {
      type: "input",
      name: "installation",
      message: "How Do You Install the Project?",
    },
    {
      type: "input",
      name: "usage",
      message: "What is Your Project Used For?",
    },
    {
        type: "input",
        name: "contributors",
        message: "Enter Your Collaborators and Their Contributions?",
      },
      {
        type: "input",
        name: "tests",
        message: "What are the Test Instructions?",
      },
      {
        type: "input",
        name: "questions",
        message: `Enter Your Github Username`,
      },
      {
        type: "checkbox",
        name: "license",
        message: "What License Would You Like to Use",
        choices: [
            "Apache",
            "MIT",
            "ISC",
            "GNU GPL v3",
        ]
      }
  ]);
}

function generateLicense(license) {
  if(license === "Apache") {
    return `![](https://img.shields.io/badge/license-apache-brightgreen)`
  }
  if(license === "MIT"){
    return `![](https://img.shields.io/badge/license-MIT-yellow)`
  }
  if(license === "ISC"){
    return `![]( https://img.shields.io/badge/license-ISC-blue)`
  }
  if(license === "GNU GPL v3"){
    return `![](https://img.shields.io/badge/license-gnu-green)`
  }
}

function generateReadMe(res){

return `
${res.title}

${res.license}

## **Table of Contents** 

  - [Description](#description)
  - [Installation Instructions](#installation)
  - [Usage](#usage)
  - [Contributors](#contributors)
  - [Tests](#tests)
  - [Questions](#questons)
  - [License](#license)

## **Description**
${res.description}

## Installation Instructions 
${res.installation}

## **Usage** 
${res.usage}

## **Contributors**
${res.contributors}

## **Tests** 
${res.tests}

## **Contact Me**
  Any questions, please contact me at ${res.questions}

This project uses **${res.license}**
`

}

async function init() {

  promptUser()
  .then(function(res) {
    let answers = generateReadMe(res) 
    console.log("Your Responses: ", answers);
    fs.writeFileSync("README.md", answers)
  })
}

init();

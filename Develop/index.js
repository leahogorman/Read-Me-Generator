// Install node dependencies
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");


// Questions for User
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

// generateReadMe inputs the user information into a readMe format
function generateReadMe(res){

return `
![](https://img.shields.io/badge/license-${res.license}-green)

# **${res.title}**

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
  Any questions, please contact me at https://github.com/${res.questions}

This project uses **${res.license}**
`

}

// The async function generates the readme based on the user input after they input all of their information.
async function init() {

  promptUser()
  .then(function(res) {
    let answers = generateReadMe(res) 
    console.log("Your Responses: ", answers);
    fs.writeFileSync("README.md", answers)
  })
}

init();

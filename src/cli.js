const readline = require('readline-sync');
const fs = require('fs');

const { generatePDF } = require('./pdfGenerator');


console.log("Choose a language: (1) English (2) French");
const languageChoise = readline.question('Enter the language number: ');
let languagePath = '';

if (languageChoise === '1'){
    languagePath = './langs/en.json';
}else if(languageChoise === '2'){
    languagePath = './langs/fr.json';
}else{
    console.log('Invalid choise, defaulting to English.');
    languagePath = './langs/en.json';
}

const language = JSON.parse(fs.readFileSync(languagePath));

const company = readline.question('Enter your company name: ');
const siret = readline.question('Enter your company SIRET: ');
const ape = readline.question('Enter your company APE code: ');
const address = readline.question('Enter your company address: ');
const email = readline.question(`Enter your ${language.email}: `);
const phone = readline.question(`Enter your ${language.phone}: `);

const clientName = readline.question('Enter client name: ');
const clientCompany = readline.question('Enter client company: ');
const clientAddress = readline.question('Enter client address: ');
const clientEmail = readline.question(`Enter client ${language.email}: `);
const clientPhone = readline.question(`Enter client ${language.phone}: `);

const projectTitle = readline.question('Enter project title: ');
const projectDetails = readline.question('Enter project details: ');

console.log("Choose a PDF theme: (1) Default (2) Modern");
const themeChoice = readline.question('Enter the theme number: ');
let themePath = '';

if (themeChoice === '1') {
    themePath = './themes/default.json';
} else if (themeChoice === '2') {
    themePath = './themes/modern.json';
} else {
    console.log('Invalid choice, defaulting to Default theme.');
    themePath = './themes/default.json';
}

const theme = JSON.parse(fs.readFileSync(themePath));

console.log('All information collected!');

generatePDF();

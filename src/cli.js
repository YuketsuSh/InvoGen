const readline = require('readline-sync');
const fs = require('fs');

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

console.log(`Language loaded: ${language.pageTitle}`);
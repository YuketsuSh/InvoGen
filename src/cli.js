const readline = require('readline-sync');
const fs = require('fs');

const { generatePDF } = require('./pdfGenerator');

console.log("Choose a language: (1) English (2) French");
const languageChoice = readline.question('Enter the language number: ');
let languagePath = '';

if (languageChoice === '1') {
    languagePath = './langs/en.json';
} else if (languageChoice === '2') {
    languagePath = './langs/fr.json';
} else {
    console.log('Invalid choice, defaulting to English.');
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

const items = [];
let addItem = 'y';

while (addItem.toLowerCase() === 'y') {
    const itemName = readline.question('Enter the item name: ');
    const itemDescription = readline.question('Enter the item description: ');
    const itemQuantity = readline.question('Enter the quantity: ');
    const itemPrice = readline.question('Enter the unit price: ');

    items.push({
        name: itemName,
        description: itemDescription,
        quantity: parseInt(itemQuantity),
        price: parseFloat(itemPrice)
    });

    addItem = readline.question('Do you want to add another item? (y/n): ');
}

console.log("Choose a PDF theme: (1) Default (2) Classic (3) Modern");
const themeChoice = readline.question('Enter the theme number: ');
let themePath = '';

if (themeChoice === '1') {
    themePath = './themes/default.json';
} else if (themeChoice === '2') {
    themePath = './themes/classic.json';
} else if (themeChoice === '3') {
    themePath = './themes/modern.json';
} else {
    console.log('Invalid choice, defaulting to Default theme.');
    themePath = './themes/default.json';
}

const theme = JSON.parse(fs.readFileSync(themePath));

generatePDF({
    company,
    siret,
    ape,
    address,
    email,
    phone,
    clientName,
    clientCompany,
    clientAddress,
    clientEmail,
    clientPhone,
    projectTitle,
    projectDetails,
    items,
    theme,
    language
}).then((fileName) => {
    console.log(`PDF generated successfully: ${fileName}`);
}).catch(err => {
    console.error('Error generating PDF:', err);
});

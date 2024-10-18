const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const fontkit = require('@pdf-lib/fontkit');
const { v4: uuidv4 } = require('uuid');

function savePDF(pdfBytes) {
    const directory = path.join(__dirname, '..', 'pdf');
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
    const uniqueID = uuidv4();
    const fileName = `invoice_${uniqueID}.pdf`;
    const filePath = path.join(directory, fileName);

    fs.writeFileSync(filePath, pdfBytes);
    return fileName;
}

async function loadFont(pdfDoc, fontChoice) {
    let fontBytes;
    switch (fontChoice) {
        case 'NotoSans':
            fontBytes = fs.readFileSync('./fonts/NotoSans-Regular.ttf');
            break;
        case 'DejaVuSans':
            fontBytes = fs.readFileSync('./fonts/DejaVuSans.ttf');
            break;
        case 'LiberationSerif':
            fontBytes = fs.readFileSync('./fonts/LiberationSerif-Regular.ttf');
            break;
        case 'OpenSans':
            fontBytes = fs.readFileSync('./fonts/OpenSans-Regular.ttf');
            break;
        default:
            fontBytes = fs.readFileSync('./fonts/OpenSans-Regular.ttf');
            console.log('Unknown font choice, using Arial as fallback.');
    }
    return pdfDoc.embedFont(fontBytes);
}

function wrapText(text, maxWidth, font, fontSize) {
    const lines = [];
    let line = '';

    for (const word of text.split(' ')) {
        const testLine = line + word + ' ';
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);
        if (testWidth > maxWidth) {
            lines.push(line.trim());
            line = word + ' ';
        } else {
            line = testLine;
        }
    }

    lines.push(line.trim());
    return lines;
}

async function generatePDF(data) {
    const {
        company, siret, ape, address, email, phone,
        clientName, clientCompany, clientAddress, clientEmail, clientPhone,
        projectTitle, projectDetails, items, theme, language
    } = data;

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const page = pdfDoc.addPage([600, 750]);
    const font = await loadFont(pdfDoc, theme.fontFamily);

    const textColor = Array.isArray(theme.textColor) ? theme.textColor : [0, 0, 0];
    const titleColor = Array.isArray(theme.titleColor) ? theme.titleColor : [0, 0.4, 0.8];
    const currency = language.totalAmount === "Montant total" ? '€' : '$';

    const validTextColor = textColor.map(value => value >= 0 && value <= 1 ? value : 0);
    const validTitleColor = titleColor.map(value => value >= 0 && value <= 1 ? value : 0);

    const maxWidth = 500;

    page.drawText(`${language.companyInfoTitle}: ${company}`, { x: 50, y: 700, size: theme.fontSize, font, color: rgb(...validTextColor) });
    page.drawText(`${language.siret}: ${siret}`, { x: 50, y: 680, size: theme.fontSize, font, color: rgb(...validTextColor) });
    page.drawText(`${language.ape}: ${ape}`, { x: 50, y: 660, size: theme.fontSize, font, color: rgb(...validTextColor) });
    page.drawText(`${language.address}: ${address}`, { x: 50, y: 640, size: theme.fontSize, font, color: rgb(...validTextColor) });
    page.drawText(`${language.email}: ${email}`, { x: 50, y: 620, size: theme.fontSize, font, color: rgb(...validTextColor) });
    page.drawText(`${language.phone}: ${phone}`, { x: 50, y: 600, size: theme.fontSize, font, color: rgb(...validTextColor) });

    page.drawText(`${language.clientInfoTitle}: ${clientName}`, { x: 50, y: 560, size: theme.fontSize, font, color: rgb(...validTextColor) });
    page.drawText(`${language.company}: ${clientCompany}`, { x: 50, y: 540, size: theme.fontSize, font, color: rgb(...validTextColor) });
    page.drawText(`${language.address}: ${clientAddress}`, { x: 50, y: 520, size: theme.fontSize, font, color: rgb(...validTextColor) });
    page.drawText(`${language.email}: ${clientEmail}`, { x: 50, y: 500, size: theme.fontSize, font, color: rgb(...validTextColor) });
    page.drawText(`${language.phone}: ${clientPhone}`, { x: 50, y: 480, size: theme.fontSize, font, color: rgb(...validTextColor) });

    page.drawText(`${language.projectDetailsTitle}: ${projectTitle}`, { x: 50, y: 440, size: theme.titleFontSize, font, color: rgb(...validTitleColor) });

    const wrappedProjectDetails = wrapText(projectDetails, maxWidth, font, theme.fontSize);
    wrappedProjectDetails.forEach((line, idx) => {
        page.drawText(line, { x: 50, y: 420 - idx * 16, size: theme.fontSize, font, color: rgb(...validTextColor) });
    });

    let yPosition = 380;
    page.drawText(`${language.itemsServices}:`, { x: 50, y: yPosition, size: theme.fontSize, font, color: rgb(...validTitleColor) });
    yPosition -= 20;

    let total = 0;
    items.forEach(item => {
        const totalItemPrice = item.quantity * item.price;
        total += totalItemPrice;

        const wrappedItemDesc = wrapText(`${item.name}: ${item.description}`, maxWidth, font, theme.fontSize);
        wrappedItemDesc.forEach((line, idx) => {
            page.drawText(line, { x: 50, y: yPosition - idx * 16, size: theme.fontSize, font, color: rgb(...validTextColor) });
        });
        yPosition -= wrappedItemDesc.length * 16 + 20;

        page.drawText(`${language.qty}: ${item.quantity} | ${language.unitPrice}: ${item.price.toFixed(2)}${currency}`, { x: 50, y: yPosition, size: theme.fontSize, font, color: rgb(...validTextColor) });
        yPosition -= 30;
    });

    yPosition -= 20;
    page.drawText(`${language.totalAmount}: ${total.toFixed(2)}${currency}`, { x: 50, y: yPosition, size: theme.titleFontSize, font, color: rgb(...validTitleColor) });

    const pdfBytes = await pdfDoc.save();

    const pdfName = savePDF(pdfBytes);
    return pdfName;
}

module.exports = { generatePDF };

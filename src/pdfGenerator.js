const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');

async function generatePDF(data) {
    const {
        company, siret, ape, address, email, phone,
        clientName, clientCompany, clientAddress, clientEmail, clientPhone,
        projectTitle, projectDetails, theme, language
    } = data;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 750]);

    const font = await pdfDoc.embedFont(StandardFonts[theme.fontFamily]);

    const textColor = Array.isArray(theme.textColor) ? theme.textColor : [0, 0, 0];
    const titleColor = Array.isArray(theme.titleColor) ? theme.titleColor : [0, 0.4, 0.8];

    const validTextColor = textColor.map(value => value >= 0 && value <= 1 ? value : 0);
    const validTitleColor = titleColor.map(value => value >= 0 && value <= 1 ? value : 0);

    page.drawText(`${language.companyInfoTitle}: ${company}`, {
        x: 50, y: 700, size: theme.fontSize, font: font, color: rgb(...validTextColor)
    });
    page.drawText(`SIRET: ${siret}`, { x: 50, y: 680, size: theme.fontSize, font: font, color: rgb(...validTextColor) });
    page.drawText(`APE: ${ape}`, { x: 50, y: 660, size: theme.fontSize, font: font, color: rgb(...validTextColor) });
    page.drawText(`Address: ${address}`, { x: 50, y: 640, size: theme.fontSize, font: font, color: rgb(...validTextColor) });
    page.drawText(`${language.email}: ${email}`, { x: 50, y: 620, size: theme.fontSize, font: font, color: rgb(...validTextColor) });
    page.drawText(`${language.phone}: ${phone}`, { x: 50, y: 600, size: theme.fontSize, font: font, color: rgb(...validTextColor) });

    page.drawText(`${language.clientInfoTitle}: ${clientName}`, {
        x: 50, y: 560, size: theme.fontSize, font: font, color: rgb(...validTextColor)
    });
    page.drawText(`Company: ${clientCompany}`, { x: 50, y: 540, size: theme.fontSize, font: font, color: rgb(...validTextColor) });
    page.drawText(`Address: ${clientAddress}`, { x: 50, y: 520, size: theme.fontSize, font: font, color: rgb(...validTextColor) });
    page.drawText(`${language.email}: ${clientEmail}`, { x: 50, y: 500, size: theme.fontSize, font: font, color: rgb(...validTextColor) });
    page.drawText(`${language.phone}: ${clientPhone}`, { x: 50, y: 480, size: theme.fontSize, font: font, color: rgb(...validTextColor) });

    page.drawText(`${language.projectDetailsTitle}: ${projectTitle}`, {
        x: 50, y: 440, size: theme.titleFontSize, font: font, color: rgb(...validTitleColor)
    });
    page.drawText(projectDetails, { x: 50, y: 420, size: theme.fontSize, font: font, color: rgb(...validTextColor) });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('generated_invoice.pdf', pdfBytes);

    console.log('PDF with company and client information generated!');
}

module.exports = { generatePDF };

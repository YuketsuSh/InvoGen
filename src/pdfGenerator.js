const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');

async function generatePDF(data) {

    const { company, siret, ape, address, email, phone, theme, language } = data;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 750]);

    const font = await pdfDoc.embedFont(StandardFonts[theme.fontFamily]);

    page.drawText(`${language.companyInfoTitle}: ${company}`, { x: 50, y: 700, size: theme.fontSize, font: font, color: rgb(0, 0, 0) });
    page.drawText(`SIRET: ${siret}`, { x: 50, y: 680, size: theme.fontSize });
    page.drawText(`APE: ${ape}`, { x: 50, y: 660, size: theme.fontSize });
    page.drawText(`Address: ${address}`, { x: 50, y: 640, size: theme.fontSize });
    page.drawText(`${language.email}: ${email}`, { x: 50, y: 620, size: theme.fontSize });
    page.drawText(`${language.phone}: ${phone}`, { x: 50, y: 600, size: theme.fontSize });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('generated_invoice.pdf', pdfBytes);

    console.log('PDF with company information generated!');
}

module.exports = { generatePDF };
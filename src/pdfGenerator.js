const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function generatePDF() {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.addPage([600, 750]);

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('generated_invoice.pdf', pdfBytes);

    console.log('Empty PDF successfully generated!');
}

module.exports = { generatePDF };
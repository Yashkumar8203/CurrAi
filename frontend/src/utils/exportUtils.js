import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, HeadingLevel } from 'docx';

export const exportToPDF = (content, filename) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(filename, 15, 20);
  
  // Reset font for content
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  // Split content into sections
  const sections = content.split('\n\n');
  let y = 40;
  
  sections.forEach(section => {
    // Check if it's a heading (starts with #)
    if (section.startsWith('#')) {
      doc.setFont('helvetica', 'bold');
      const heading = section.replace('#', '').trim();
      const lines = doc.splitTextToSize(heading, 180);
      
      lines.forEach(line => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, 15, y);
        y += 10;
      });
      
      doc.setFont('helvetica', 'normal');
    } else {
      // Regular content
      const lines = doc.splitTextToSize(section, 180);
      
      lines.forEach(line => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, 15, y);
        y += 7;
      });
      
      // Add some space after each section
      y += 5;
    }
  });

  doc.save(`${filename}.pdf`);
};

export const exportToWord = async (content, filename) => {
  // Split content into sections based on headings
  const sections = content.split('\n\n');
  
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: sections.map(section => {
          if (section.startsWith('#')) {
            return new Paragraph({
              text: section.replace('#', '').trim(),
              heading: HeadingLevel.HEADING_1,
            });
          }
          return new Paragraph({
            text: section,
          });
        }),
      },
    ],
  });

  // Generate and download the document
  const blob = await Packer.toBlob(doc);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.docx`;
  a.click();
  window.URL.revokeObjectURL(url);
}; 
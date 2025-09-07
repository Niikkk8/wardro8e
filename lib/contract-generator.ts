import jsPDF from 'jspdf';

export interface ContractData {
  brand_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  business_type: string;
  gstin: string;
  pan_number: string;
}

export function generateBrandPartnershipContract(data: ContractData): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const lineHeight = 6;
  let currentY = margin;

  // Helper function to add text with proper wrapping
  const addText = (text: string, fontSize = 11, isBold = false, align: 'left' | 'center' = 'left') => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    if (align === 'center') {
      const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
      const x = (pageWidth - textWidth) / 2;
      doc.text(text, x, currentY);
    } else {
      doc.text(text, margin, currentY);
    }
    currentY += lineHeight;
  };

  const addSpacing = (lines = 1) => {
    currentY += lineHeight * lines;
  };

  // Header
  addText('BRAND PARTNERSHIP AGREEMENT', 16, true, 'center');
  addText('Wardro8e Platform', 12, false, 'center');
  addSpacing(2);

  // Date
  const today = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  addText(`Date: ${today}`, 11, false);
  addSpacing(2);

  // Parties
  addText('PARTIES TO THE AGREEMENT', 14, true);
  addSpacing();

  addText('1. WARDRO8E PRIVATE LIMITED', 12, true);
  addText('   Address: [Company Address]');
  addText('   Email: legal@wardro8e.com');
  addText('   (Hereinafter referred to as "Wardro8e" or "Platform")');
  addSpacing();

  addText('2. BRAND PARTNER', 12, true);
  addText(`   Brand Name: ${data.brand_name}`);
  addText(`   Legal Name: ${data.contact_name}`);
  addText(`   Business Type: ${data.business_type.replace('_', ' ').toUpperCase()}`);
  addText(`   GSTIN: ${data.gstin}`);
  addText(`   PAN: ${data.pan_number}`);
  addText(`   Address: ${data.address_line1}`);
  if (data.address_line2) {
    addText(`            ${data.address_line2}`);
  }
  addText(`            ${data.city}, ${data.state} - ${data.pincode}`);
  addText(`   Email: ${data.contact_email}`);
  addText(`   Phone: ${data.contact_phone}`);
  addText('   (Hereinafter referred to as "Brand Partner" or "Partner")');
  addSpacing(2);

  // Terms and Conditions
  addText('TERMS AND CONDITIONS', 14, true);
  addSpacing();

  const terms = [
    {
      title: '1. PARTNERSHIP SCOPE',
      content: 'The Brand Partner agrees to list and sell products on the Wardro8e platform in accordance with the platform guidelines and policies.'
    },
    {
      title: '2. PRODUCT LISTING',
      content: 'Brand Partner shall provide accurate product information, images, and pricing. All products must comply with applicable laws and regulations.'
    },
    {
      title: '3. COMMISSION STRUCTURE',
      content: 'Wardro8e shall charge a commission as per the agreed rate structure communicated separately. Commission rates may vary by product category.'
    },
    {
      title: '4. PAYMENT TERMS',
      content: 'Payments shall be processed within 7-14 business days after order delivery confirmation, subject to the platform\'s payment policy.'
    },
    {
      title: '5. QUALITY STANDARDS',
      content: 'Brand Partner commits to maintaining high product quality and customer service standards as defined by Wardro8e policies.'
    },
    {
      title: '6. INTELLECTUAL PROPERTY',
      content: 'Brand Partner retains ownership of their brand and product intellectual property while granting Wardro8e limited rights for platform operations.'
    },
    {
      title: '7. TERMINATION',
      content: 'Either party may terminate this agreement with 30 days written notice. Termination terms shall be as per platform policies.'
    },
    {
      title: '8. COMPLIANCE',
      content: 'Brand Partner agrees to comply with all applicable laws, regulations, and Wardro8e platform policies and guidelines.'
    }
  ];

  terms.forEach((term) => {
    addText(term.title, 11, true);
    // Split content into multiple lines if needed
    const words = term.content.split(' ');
    let line = '';
    const maxWidth = pageWidth - 2 * margin;
    
    words.forEach((word) => {
      const testLine = line + (line ? ' ' : '') + word;
      const textWidth = doc.getStringUnitWidth(testLine) * 11 / doc.internal.scaleFactor;
      
      if (textWidth > maxWidth && line) {
        addText(line);
        line = word;
      } else {
        line = testLine;
      }
    });
    
    if (line) {
      addText(line);
    }
    addSpacing();
  });

  // Check if we need a new page
  if (currentY > doc.internal.pageSize.height - 80) {
    doc.addPage();
    currentY = margin;
  }

  addSpacing(2);
  addText('ACCEPTANCE AND SIGNATURES', 14, true);
  addSpacing(2);

  addText('By signing below, both parties agree to the terms and conditions outlined in this agreement.');
  addSpacing(2);

  // Signature blocks
  addText('WARDRO8E PRIVATE LIMITED', 11, true);
  addSpacing(3);
  addText('_________________________');
  addText('Authorized Signatory');
  addText('Date: ___________');
  addSpacing(3);

  addText('BRAND PARTNER', 11, true);
  addSpacing(3);
  addText('_________________________');
  addText(`Name: ${data.contact_name}`);
  addText(`Brand: ${data.brand_name}`);
  addText('Date: ___________');
  addSpacing(2);

  // Footer
  addText('This agreement is governed by the laws of India and subject to the jurisdiction of courts in [City].', 9);
  addText('For any queries, contact: legal@wardro8e.com', 9);

  return doc;
}

export function generateChecklist({ visaType, userType, maritalStatus, financial }) {
  const docs = [
    'Valid Passport (with minimum 6 months validity and 2 blank pages)',
    'Recent Passport-size Photographs (as per specification)',
    'Completed Visa Application Form',
    'Visa Fee Payment Receipt'
  ];

  switch (visaType) {
    case 'Student Visa':
      docs.push(
        'Admission Letter from Accredited Institution',
        'Proof of Funds for Tuition and Living Expenses (bank statements, scholarship letter)',
        'Academic Transcripts and Certificates',
        'Language Proficiency Test (IELTS/TOEFL)',
        'Health Insurance for the Study Period',
        'Statement of Purpose (SOP)'
      );
      break;

    case 'Work Visa':
      docs.push(
        'Job Offer or Employment Contract',
        'Employer Sponsorship Letter',
        'Proof of Qualifications (Degrees, Diplomas)',
        'Resume/CV',
        'Police Clearance Certificate',
        'Medical Examination Report',
        'Work Permit or Labour Market Approval (if applicable)'
      );
      break;

    case 'Tourist Visa':
      docs.push(
        'Travel Itinerary',
        'Hotel Reservations or Invitation Letter from Host',
        'Proof of Sufficient Funds for Stay (bank statements)',
        'Travel Insurance',
        'Return or Onward Ticket',
        'No Objection Certificate (NOC) from employer if employed'
      );
      break;

    case 'Business Visa':
      docs.push(
        'Invitation Letter from Business Partner or Event Organizer',
        'Business Registration Certificate',
        'Company Bank Statements',
        'Proof of Previous International Travel (if any)',
        'Conference/Event Registration (if applicable)',
        'Letter Explaining Business Purpose'
      );
      break;

    case 'Family Visit Visa':
      docs.push(
        'Invitation Letter from Family Member',
        'Proof of Relationship (birth/marriage certificate)',
        'Family Member’s ID and Residence Proof',
        'Accommodation Arrangements',
        'Sponsor’s Financial Documents'
      );
      break;

    case 'Medical Treatment Visa':
      docs.push(
        'Medical Diagnosis Letter from Local Doctor',
        'Appointment or Acceptance Letter from Foreign Hospital',
        'Proof of Payment or Cost Estimate from Hospital',
        'Travel Insurance Covering Medical Treatment',
        'Medical History Documents'
      );
      break;

    case 'Transit Visa':
      docs.push(
        'Confirmed Ticket to Final Destination',
        'Valid Visa for Final Destination (if applicable)',
        'Proof of Layover/Transit Hotel Booking'
      );
      break;

    case 'Permanent Residency Visa':
      docs.push(
        'Proof of Long-Term Stay Purpose (job offer, investment, family ties)',
        'Police Clearance from All Residing Countries',
        'Medical Examination Report',
        'Proof of Financial Stability',
        'Integration or Settlement Plan (in some countries)',
        'Language Proficiency Certificate'
      );
      break;
  }

  if (userType === 'Employed') {
    docs.push(
      'Employment Letter (mentioning position and salary)',
      'Salary Slips (last 3-6 months)',
      'Leave Approval Letter'
    );
  } else if (userType === 'Self-Employed') {
    docs.push(
      'Business Registration Document',
      'Company Tax Returns (last 2 years)',
      'Company Bank Statements'
    );
  } else if (userType === 'Sponsored') {
    docs.push(
      'Sponsor’s Letter of Support',
      'Sponsor’s Passport Copy and Visa Status',
      'Sponsor’s Proof of Income (tax returns, salary slips)',
      'Sponsor’s Bank Statements (last 6 months)'
    );
  }

  if (maritalStatus === 'Married') {
    docs.push('Marriage Certificate (translated if required)');
  } else if (maritalStatus === 'Divorced') {
    docs.push('Divorce Decree or Legal Separation Document');
  } else if (maritalStatus === 'Widowed') {
    docs.push('Death Certificate of Spouse');
  }

  if (financial && typeof financial === 'string') {
    docs.push(`Additional Financial Document: ${financial}`);
  }

  return docs;
}

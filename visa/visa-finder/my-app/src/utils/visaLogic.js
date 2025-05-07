export function getVisaSuggestion(data) {
    const { nationality, destination, purpose, duration, sponsor, age, history } = data;
  
    // Input validation
    if (!nationality || !destination || !purpose || !duration) {
      return {
        visaType: 'Error',
        criteria: ['Please provide all required fields: nationality, destination, purpose, and duration.'],
      };
    }
  
    // Parse duration to days
    let durationDays = 0;
    const durationLower = duration.toLowerCase().trim();
    if (durationLower.includes('month')) {
      durationDays = parseInt(durationLower) * 30;
    } else if (durationLower.includes('day')) {
      durationDays = parseInt(durationLower);
    } else {
      return {
        visaType: 'Error',
        criteria: ['Invalid duration format. Use days or months (e.g., "90 days" or "6 months")'],
      };
    }
  
    const parsedAge = parseInt(age);
    if (isNaN(parsedAge) || parsedAge < 0) {
      return {
        visaType: 'Error',
        criteria: ['Invalid age. Please enter a valid age.'],
      };
    }
  
    let visaType = 'General Visa';
    let criteria = [
      'Valid passport (at least 6 months validity)',
      `Proof of ties to home country (job, family, assets) for ${nationality} citizens`,
    ];
  
    // Visa-free entry examples
    const visaFreePairs = [
      { nationality: 'USA', destination: 'Canada' },
      { nationality: 'Germany', destination: 'Japan' },
    ];
    const isVisaFree = visaFreePairs.some(
      (pair) =>
        pair.nationality.toLowerCase() === nationality.toLowerCase() &&
        pair.destination.toLowerCase() === destination.toLowerCase()
    );
    if (isVisaFree && durationDays <= 90) {
      return {
        visaType: 'Visa-Free Entry',
        criteria: [
          'Valid passport',
          'Proof of onward travel',
          'Sufficient funds',
          `No work or study in ${destination}`,
        ],
      };
    }
  
    const countrySpecific = {
      USA: {
        study: [
          'I-20 form issued by U.S. school',
          'SEVIS fee receipt',
          'F-1 visa application form (DS-160)',
          'Proof of financial ability',
          'Interview at U.S. embassy/consulate',
        ],
        work: [
          'Approved petition from employer (Form I-129)',
          'H-1B visa application',
          'Labor Condition Approval (LCA)',
          'Degree evaluation (if applicable)',
        ],
      },
      Germany: {
        study: [
          'University admission letter',
          'Blocked bank account with €11,208',
          'Health insurance from German provider',
          'Language proficiency (German/English)',
        ],
        work: [
          'Job contract from German employer',
          'Proof of professional qualification recognition',
          'Health insurance and pension registration',
        ],
      },
      UAE: {
        work: [
          'Offer letter from UAE company',
          'Labor contract approved by MOHRE',
          'Medical fitness test',
          'Emirates ID registration',
        ],
      },
      UK: {
        study: [
          'CAS letter from licensed sponsor',
          'Tier 4 student visa application',
          'Tuberculosis test result (if required)',
          'Proof of tuition and living expenses',
        ],
        work: [
          'Certificate of sponsorship (CoS)',
          'Skilled Worker visa application',
          'English language proof (IELTS)',
          'Criminal record certificate',
        ],
      },
    };
  
    const destKey = destination.trim();
    const purpKey = purpose.trim().toLowerCase();
    const countryInfo = countrySpecific[destKey];
  
    if (countryInfo && countryInfo[purpKey]) {
      visaType = `${destination} ${purpose.charAt(0).toUpperCase() + purpose.slice(1)} Visa`;
      criteria.push(...countryInfo[purpKey]);
    } else {
      // fallback general criteria
      if (purpKey === 'study') {
        visaType = durationDays <= 180 ? 'Short-Term Student Visa' : 'Long-Term Student Visa';
        criteria.push(
          `Acceptance letter from an accredited institution in ${destination}`,
          'Proof of financial support',
          'Academic transcripts',
          'Language proficiency test',
          'Health insurance'
        );
      } else if (purpKey === 'work') {
        visaType = durationDays <= 365 ? 'Temporary Work Visa' : 'Skilled Worker Visa';
        criteria.push(
          'Job offer',
          'Proof of qualifications',
          'Sponsorship letter',
          'Police clearance'
        );
      } else if (purpKey === 'tourism') {
        visaType = durationDays <= 90 ? 'Tourist Visa' : 'Extended Tourist Visa';
        criteria.push(
          'Flight tickets',
          'Accommodation proof',
          'Travel insurance',
          'Funds for stay'
        );
      } else if (purpKey === 'business') {
        visaType = 'Business Visa';
        criteria.push(
          'Invitation from host company',
          'Proof of business background',
          'Itinerary and bookings'
        );
      } else if (purpKey === 'medical') {
        visaType = 'Medical Treatment Visa';
        criteria.push(
          'Hospital letter',
          'Proof of diagnosis',
          'Payment arrangements',
          'Accommodation'
        );
        
      } else {
        visaType = 'General Visa';
        criteria.push('Purpose-specific documents');
      }
    }
  
    if (parsedAge < 18) {
      criteria.push('Parental consent letter', 'Birth certificate');
    }
  
    if (history && history.trim() !== '') {
      criteria.push('Past visa stamps and history');
    }
  
    if (durationDays > 365) {
      criteria.push('Proof of financial sustainability', 'Long-term stay reason letter');
    } else if (durationDays > 90) {
      criteria.push('Justification for extended stay');
    }
  
    return { visaType, criteria };
  }
  
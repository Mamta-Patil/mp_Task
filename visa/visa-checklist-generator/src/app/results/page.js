// 'use client';
// import { useSearchParams } from 'next/navigation';
// // import { generateChecklist } from '../../utils/checklistLogic';
// import ChecklistResult from '@/components/ChecklistResult';
// import { generateChecklist } from '@/utils/checklistLogic';
// // import ChecklistResult from '../../components/ChecklistResult';

// // Force dynamic rendering to skip prerendering
// export const dynamic = 'force-dynamic';

// export default function ChecklistPage() {
//   const searchParams = useSearchParams();
//   const form = Object.fromEntries(searchParams.entries());
//   const checklist = generateChecklist(form);

//   return (
//     <ChecklistResult visaType={form.visaType} checklist={checklist} />
//   );
// }

import ChecklistContent from '@/components/ChecklistContent';
import { Suspense } from 'react';
// import ChecklistContent from '../checklist/ChecklistContent';

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading results...</div>}>
      <ChecklistContent />
    </Suspense>
  );
}
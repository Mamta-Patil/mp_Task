// 'use client';
// import { useSearchParams } from 'next/navigation';
// import { generateChecklist } from '../../utils/checklistLogic';
// import ChecklistResult from '@/components/ChecklistResult';

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
// import ChecklistContent from './ChecklistContent';

export default function ChecklistPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading checklist...</div>}>
      <ChecklistContent />
    </Suspense>
  );
}




// import ChecklistForm from '../../components/ChecklistForm';

// // Force dynamic rendering to skip prerendering
// export const dynamic = 'force-dynamic';

// export default function ChecklistPage() {
//   return <ChecklistForm />;
// }




// import ChecklistForm from '../../components/ChecklistForm';

// Force dynamic rendering to skip prerendering

// export const dynamic = 'force-dynamic';

// export default function ChecklistPage() {
//   return <ChecklistForm />;
// }
// import ResultsContent from '@/components/ResultsContent';
// import { Suspense } from 'react';

// export default function ResultsPage() {
//   return (
//     <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading visa suggestions...</div>}>
//       <ResultsContent />
//     </Suspense>
//   );
// }

// import { Suspense } from 'react';
// import ResultsContent from '@/components/ResultsContent';

// export default function ResultsPage() {
//   return (
//     <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading visa suggestions...</div>}>
//       <ResultsContent />
//     </Suspense>
//   );
// }


import { Suspense } from 'react';
import ResultsContent from '@/components/ResultsContent';

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading visa suggestions...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
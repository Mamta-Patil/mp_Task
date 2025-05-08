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
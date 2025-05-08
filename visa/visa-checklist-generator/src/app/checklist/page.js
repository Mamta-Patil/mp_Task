import ChecklistContent from '@/components/ChecklistContent';
import { Suspense } from 'react';

export default function ChecklistPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading checklist...</div>}>
      <ChecklistContent />
    </Suspense>
  );
}
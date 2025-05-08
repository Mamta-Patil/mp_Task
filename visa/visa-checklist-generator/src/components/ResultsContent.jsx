'use client';
import { useSearchParams } from 'next/navigation';
import { generateChecklist } from '../../utils/checklistLogic';
import ChecklistResult from './ChecklistResult';

export default function ResultsContent() {
  const searchParams = useSearchParams();
  const form = Object.fromEntries(searchParams.entries());
  const checklist = generateChecklist(form);

  return <ChecklistResult visaType={form.visaType} checklist={checklist} />;
}
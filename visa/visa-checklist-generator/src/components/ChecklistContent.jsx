'use client';
import { useSearchParams } from 'next/navigation';
import ChecklistResult from './ChecklistResult';
import { generateChecklist } from '@/utils/checklistLogic';
// import { generateChecklist } from '../../utils/checklistLogic';
// import ChecklistResult from '../../components/ChecklistResult';

export default function ChecklistContent() {
  const searchParams = useSearchParams();
  const form = Object.fromEntries(searchParams.entries());
  const checklist = generateChecklist(form);

  return <ChecklistResult visaType={form.visaType} checklist={checklist} />;
}
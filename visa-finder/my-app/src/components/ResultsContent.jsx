// 'use client';
// import { useSearchParams } from 'next/navigation';
// import { getVisaSuggestion } from '../../utils/visaLogic';
// import ResultCard from '../../components/ResultCard';

// export default function ResultsContent() {
//   const searchParams = useSearchParams();
//   const data = Object.fromEntries(searchParams.entries());
//   const { visaType, criteria } = getVisaSuggestion(data);

//   return (
//     <div className="max-w-2xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">Suggested Visa</h2>
//       <ResultCard visaType={visaType} criteria={criteria} />
//       <p>{criteria[0]}</p>
//     </div>
//   );
// }
'use client';
import { useSearchParams } from 'next/navigation';
import { getVisaSuggestion } from '../../utils/visaLogic';
import ResultCard from './ResultCard';
// import ResultCard from '../../components/ResultCard';

export default function ResultsContent() {
  const searchParams = useSearchParams();
  const data = Object.fromEntries(searchParams.entries());
  const { visaType, criteria } = getVisaSuggestion(data);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Suggested Visa</h2>
      <ResultCard visaType={visaType} criteria={criteria} />
      <p>{criteria[0]}</p>
    </div>
  );
}
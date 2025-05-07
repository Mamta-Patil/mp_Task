// export default function ResultCard({ visaType, criteria }) {
//     return (
//       <div className="bg-white p-6 rounded-xl shadow-md">
//         <h3 className="text-xl font-bold mb-3">{visaType}</h3>
//         <ul className="list-disc list-inside text-gray-700 space-y-1">
//           {criteria.map((item, idx) => <li key={idx}>{item}</li>)}
//         </ul>
//         <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
//           Generate Checklist
//         </button>
//       </div>
//     );
//   }
  

export default function ResultCard({ visaType, criteria }) {
    const generateChecklist = () => {
      const checklistContent = `Visa Type: ${visaType}\n\nEligibility Criteria:\n- ${criteria.join('\n- ')}`;
      const blob = new Blob([checklistContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = `${visaType.replace(/\s/g, '_')}_Checklist.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
  
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-3">{visaType}</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {criteria.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
        <button
          onClick={generateChecklist}
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Generate Checklist
        </button>
      </div>
    );
  }
  
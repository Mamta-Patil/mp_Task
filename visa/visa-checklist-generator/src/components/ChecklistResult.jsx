'use client';
import UploadSection from './UploadSection';

export default function ChecklistResult({ visaType, checklist }) {
  const downloadAsText = () => {
    const content = `Visa Type: ${visaType}\n\nChecklist:\n- ${checklist.join('\n- ')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${visaType.replace(/\s/g, '_')}_Checklist.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const printChecklist = () => {
    window.print();
  };

  return (
    <div className="bg-white p-6 mt-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">{visaType} - Document Checklist</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        {checklist.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div className="flex gap-4 flex-wrap">
        <button onClick={downloadAsText} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Download</button>
        <button onClick={printChecklist} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">Print</button>
        <a href="https://calendly.com" target="_blank" rel="noreferrer" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Book Consultation</a>
      </div>

      <UploadSection />
    </div>
  );
}

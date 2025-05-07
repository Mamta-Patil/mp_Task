'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChecklistForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    visaType: '',
    userType: '',
    maritalStatus: '',
    financial: '',
    travelHistory: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(form).toString();
    router.push(`/checklist?${query}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-8 rounded-3xl shadow-2xl space-y-6 animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Visa Document Checklist Generator
        </h2>

        <select
          name="visaType"
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        >
          <option value="">Select Visa Type</option>
          <option value="Student Visa">Student Visa</option>
          <option value="Tourist Visa">Tourist Visa</option>
          <option value="Work Visa">Work Visa</option>
        </select>

        <select
          name="userType"
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        >
          <option value="">User Type</option>
          <option value="Student">Student</option>
          <option value="Employed">Employed</option>
          <option value="Self-Employed">Self-Employed</option>
          <option value="Sponsored">Sponsored</option>
        </select>

        <select
          name="maritalStatus"
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        >
          <option value="">Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
        </select>

        <select
          name="financial"
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        >
          <option value="">Financial Documents</option>
          <option value="Bank Statement">Bank Statement</option>
          <option value="Salary Slips">Salary Slips</option>
        </select>

        <input
          type="text"
          name="travelHistory"
          placeholder="Travel History (Optional)"
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all"
        >
          Generate Checklist
        </button>
      </form>
    </div>
  );
}



// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function ChecklistForm() {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     visaType: '',
//     userType: '',
//     maritalStatus: '',
//     financial: '',
//     travelHistory: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const query = new URLSearchParams(form).toString();
//     router.push(`/checklist?${query}`);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-xl bg-white p-8 rounded-3xl shadow-2xl space-y-6 animate-fade-in"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
//           Visa Document Checklist Generator
//         </h2>

//         <select
//           name="visaType"
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
//         >
//           <option value="">Select Visa Type</option>
//           <option value="Student Visa">Student Visa</option>
//           <option value="Tourist Visa">Tourist Visa</option>
//           <option value="Work Visa">Work Visa</option>
//         </select>

//         <select
//           name="userType"
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
//         >
//           <option value="">User Type</option>
//           <option value="Student">Student</option>
//           <option value="Employed">Employed</option>
//           <option value="Self-Employed">Self-Employed</option>
//           <option value="Sponsored">Sponsored</option>
//         </select>

//         <select
//           name="maritalStatus"
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
//         >
//           <option value="">Marital Status</option>
//           <option value="Single">Single</option>
//           <option value="Married">Married</option>
//         </select>

//         <select
//           name="financial"
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
//         >
//           <option value="">Financial Documents</option>
//           <option value="Bank Statement">Bank Statement</option>
//           <option value="Salary Slips">Salary Slips</option>
//         </select>

//         <input
//           type="text"
//           name="travelHistory"
//           placeholder="Travel History (Optional)"
//           onChange={handleChange}
//           className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all"
//         >
//           Generate Checklist
//         </button>
//       </form>
//     </div>
//   );
// }
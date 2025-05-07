// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Form() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     nationality: '',
//     destination: '',
//     purpose: '',
//     duration: '',
//     sponsor: 'No',
//     age: '',
//     history: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const query = new URLSearchParams(formData).toString();
//     router.push(`/results?${query}`);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
//       {['nationality', 'destination', 'purpose', 'duration', 'age', 'history   (optional)'].map(field => (
//         <input  
//           key={field}
//           name={field}
//           placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//           value={formData[field]}
//           onChange={handleChange}
//           className="w-full border p-2 rounded-md"
//           required={field !== 'history'}
//         />
//       ))}
//       <select name="sponsor" onChange={handleChange} className="w-full border p-2 rounded-md">
//         <option value="No">Do you have a sponsor?</option>
//         <option value="Yes">Yes</option>
//         <option value="No">No</option>
//       </select>
//       <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
//         Find My Visa
//       </button>
//     </form>
//   );
// }


'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Form() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nationality: '',
    destination: '',
    purpose: '',
    duration: '',
    sponsor: 'No',
    age: '',
    history: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    router.push(`/results?${query}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Visa Finder Tool
        </h2>

        {['nationality', 'destination', 'purpose', 'duration', 'age'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        ))}

        <input
          name="history"
          placeholder="Travel History (Optional)"
          value={formData.history}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <select
          name="sponsor"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="No">Do you have a sponsor?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all"
        >
          Find My Visa
        </button>
      </form>
    </div>
  );
}

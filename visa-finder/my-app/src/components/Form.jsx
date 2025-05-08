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

  const validCountries = ['USA', 'Germany', 'UAE', 'UK', 'Canada', 'Australia', 'Japan'];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Visa Finder Tool
        </h2>

        <select
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          required
        >
          <option value="" disabled>Select Nationality</option>
          {validCountries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        <select
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          required
        >
          <option value="" disabled>Select Destination</option>
          {validCountries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        <input
          name="purpose"
          placeholder="Purpose (e.g., Study, Work, Tourism)"
          value={formData.purpose}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="duration"
          placeholder="Duration (e.g., 90 days, 6 months)"
          value={formData.duration}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="history"
          placeholder="Travel History (Optional)"
          value={formData.history}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <select
          name="sponsor"
          value={formData.sponsor}
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
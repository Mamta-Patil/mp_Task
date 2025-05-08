import ChecklistForm from '../components/ChecklistForm';

// Force dynamic rendering to skip prerendering
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div>
      <ChecklistForm />
    </div>
  );
}
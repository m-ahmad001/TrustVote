import { Navbar } from '../components';

export default function AddMember() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl font-bold text-primary">Add Member</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Add members to your campaign
          </p>
        </div>
      </main>
    </div>
  );
}

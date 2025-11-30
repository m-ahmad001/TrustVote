import { Navbar } from '../components';

export default function Voting() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl font-bold text-primary">Voting Interface</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            View and participate in active campaigns
          </p>
        </div>
      </main>
    </div>
  );
}
